#!/usr/bin/env bun
/**
 * validate-svg.ts — PPT/Office 兼容性校验
 *
 * 两种用法：
 *   1) 校验 SVG 输出文件（默认）
 *      bun validate-svg.ts path/to/diagram.svg
 *
 *   2) 校验 references/ 目录下的 .md 文件（扫描其中 ```svg 代码块）
 *      bun validate-svg.ts --check-refs [references-dir]
 *
 * 校验以下 PPT 兼容规则（与 SKILL.md / 各 style.md 一致）：
 *   - 禁止 rgba()/rgb()                → 用 #RRGGBB + fill-opacity / stroke-opacity
 *   - 禁止 <filter> / feDropShadow     → 用偏移矩形 fill="#000" fill-opacity="0.08"
 *   - 禁止 <marker> / marker-end/start → 用 <line> + <polygon> 显式画箭头
 *   - 禁止 @import url(...)            → 只用本地 font-family 字体栈
 *   - 禁止元素级 opacity="..."         → 用 fill-opacity / stroke-opacity
 *   - <linearGradient> 必须有 gradientUnits="objectBoundingBox"
 *   - <svg> 根节点必须有 xmlns，且使用 viewBox（不带固定 width/height）
 *
 * 退出码：0 = PASS，1 = FAIL
 */
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { basename, extname, join, resolve } from "path";

interface Violation {
  rule: string;
  line: number;   // 1-based
  snippet: string;
}

interface CheckResult {
  file: string;
  violations: Violation[];
}

// ────────────────────────────────────────────────────────────────
// 几何检测：箭头三角是否被节点框遮挡
// ────────────────────────────────────────────────────────────────

interface RectBox { x: number; y: number; w: number; h: number; line: number; }
interface PolyBox { minX: number; minY: number; maxX: number; maxY: number; line: number; }

/** 从属性字符串里提取数值属性 */
function numAttr(attrs: string, name: string, def: number): number {
  const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*["']?([\\d.]+)`, "i"));
  return m && !isNaN(Number(m[1])) ? Number(m[1]) : def;
}

/** 从属性字符串里提取字符串属性 */
function strAttr(attrs: string, name: string, def: string): string {
  const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m ? m[1] : def;
}

/** 提取所有「可能遮挡三角的节点框」rect */
function extractNodeRects(content: string): RectBox[] {
  const out: RectBox[] = [];
  const re = /<rect\b([^>]*?)(?:\/\s*)?>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const attrs = m[1];
    const x = numAttr(attrs, "x", 0);
    const y = numAttr(attrs, "y", 0);
    const w = numAttr(attrs, "width", 0);
    const h = numAttr(attrs, "height", 0);
    const fill = strAttr(attrs, "fill", "");
    const fillOpacity = numAttr(attrs, "fill-opacity", 1);

    // 过滤：渐变填充（层容器背景，不会遮挡）
    if (/url\(/i.test(fill)) continue;
    // 过滤：fill="none"（只有描边的框）
    if (fill.toLowerCase() === "none") continue;
    // 过滤：太透明（阴影 rect fill-opacity≈0.08，不会遮挡）
    if (fillOpacity < 0.3) continue;
    // 过滤：太大（背景/层容器，不是节点框）
    if (w > 400 || h > 400) continue;
    // 过滤：太小（装饰点/编号圆等）
    if (w < 10 || h < 10) continue;
    // 过滤：0 尺寸（占位符 X/Y/W/H 解析失败）
    if (w === 0 || h === 0) continue;

    const line = content.slice(0, m.index).split(/\r?\n/).length;
    out.push({ x, y, w, h, line });
  }
  return out;
}

/** 提取所有「箭头三角」polygon（排除图标内部的小 polygon） */
function extractArrowPolygons(content: string): PolyBox[] {
  const out: PolyBox[] = [];
  const re = /<polygon\b([^>]*?)(?:\/\s*)?>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const attrs = m[1];
    const pointsStr = strAttr(attrs, "points", "");
    if (!pointsStr) continue;
    const nums = pointsStr.split(/[\s,]+/).map(Number).filter((n) => !isNaN(n));
    // polygon 至少 3 个点 = 6 个数
    if (nums.length < 6 || nums.length % 2 !== 0) continue;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let i = 0; i < nums.length; i += 2) {
      if (nums[i] < minX) minX = nums[i];
      if (nums[i + 1] < minY) minY = nums[i + 1];
      if (nums[i] > maxX) maxX = nums[i];
      if (nums[i + 1] > maxY) maxY = nums[i + 1];
    }

    // 过滤：图标内部 polygon（坐标值都 < 30，图标在 24×24 空间内）
    if (maxX < 30 && maxY < 30) continue;

    const line = content.slice(0, m.index).split(/\r?\n/).length;
    out.push({ minX, minY, maxX, maxY, line });
  }
  return out;
}

/** 检测箭头三角是否被节点框遮挡 */
function checkArrowOcclusion(content: string): Violation[] {
  const rects = extractNodeRects(content);
  const polys = extractArrowPolygons(content);
  if (rects.length === 0 || polys.length === 0) return [];

  const violations: Violation[] = [];
  const margin = 1; // 1px 容差

  for (const poly of polys) {
    for (const rect of rects) {
      // polygon 包围盒完全在 rect 内部 → 三角被遮挡
      const contained =
        poly.minX >= rect.x - margin &&
        poly.maxX <= rect.x + rect.w + margin &&
        poly.minY >= rect.y - margin &&
        poly.maxY <= rect.y + rect.h + margin;
      if (contained) {
        violations.push({
          rule: "箭头三角落在节点框内部（被遮挡，用户看不到）。三角顶点应指向框边缘（框顶/底/左/右），不是框中心。",
          line: poly.line,
          snippet: `polygon bbox (${poly.minX.toFixed(0)},${poly.minY.toFixed(0)})-(${poly.maxX.toFixed(0)},${poly.maxY.toFixed(0)}) 在 rect (L${rect.line}: ${rect.x},${rect.y} ${rect.w}×${rect.h}) 内`,
        });
        break; // 一个 polygon 只报一次
      }
    }
  }
  return violations;
}

/** 检测连接线（path/line/polygon）是否溢出泳道外框 */
function checkPathOverflow(content: string): Violation[] {
  // 1) 找最大的 rect 作为外框（包围所有泳道的大矩形）
  const allRects: RectBox[] = [];
  const rectRe = /<rect\b([^>]*?)(?:\/\s*)?>/gi;
  let rm: RegExpExecArray | null;
  while ((rm = rectRe.exec(content)) !== null) {
    const attrs = rm[1];
    const x = numAttr(attrs, "x", 0);
    const y = numAttr(attrs, "y", 0);
    const w = numAttr(attrs, "width", 0);
    const h = numAttr(attrs, "height", 0);
    if (w > 0 && h > 0) allRects.push({ x, y, w, h, line: 0 });
  }
  if (allRects.length === 0) return [];
  // 面积最大的 rect = 外框
  const frame = allRects.reduce((a, b) => (a.w * a.h > b.w * b.h ? a : b));
  // 阈值：外框必须大到像架构图（宽高都 >250）才检测。
  // 图标(24×24)、参考文档里的小示例代码块，外框很小，不是"泳道外框"，跳过避免误报。
  if (frame.w < 250 || frame.h < 250) return [];

  const violations: Violation[] = [];
  const tol = 2; // 2px 容差，避免坐标精度误报
  const xMin = frame.x - tol;
  const xMax = frame.x + frame.w + tol;
  const yMin = frame.y - tol;
  const yMax = frame.y + frame.h + tol;

  const report = (line: number, x: number, y: number, tag: string) => {
    violations.push({
      rule: `连接线坐标 (${x.toFixed(0)},${y.toFixed(0)}) 超出泳道外框 [${frame.x},${frame.y} ${frame.w}×${frame.h}]。绕行线/回环必须走【外框内】的空白列，不能绕到外框外的 viewBox 边缘。`,
      line,
      snippet: `${tag} 含越界点 (${x.toFixed(0)},${y.toFixed(0)})`,
    });
  };

  // 2) 解析 path 的 d 属性折点
  const pathRe = /<path\b([^>]*?)(?:\/\s*)?>/gi;
  let pm: RegExpExecArray | null;
  while ((pm = pathRe.exec(content)) !== null) {
    const attrs = pm[1];
    const d = strAttr(attrs, "d", "");
    if (!d) continue;
    const lineNo = content.slice(0, pm.index).split(/\r?\n/).length;
    // 提取 d 里所有数字（M/L/H/V/C 等命令的坐标）
    const nums = d.match(/-?\d+(?:\.\d+)?/g);
    if (!nums) continue;
    // 按 M/L 命令成对解析（简化：所有数字两两配对为 x,y）
    // 注意 H/V 是单坐标，但架构图路径基本都是 L x,y，两两配对够用
    for (let i = 0; i + 1 < nums.length; i += 2) {
      const px = Number(nums[i]);
      const py = Number(nums[i + 1]);
      if (px < xMin || px > xMax || py < yMin || py > yMax) {
        report(lineNo, px, py, `<path>`);
        break; // 一条 path 只报一次
      }
    }
  }

  // 3) 解析 line 的 x1/y1/x2/y2
  const lineRe = /<line\b([^>]*?)(?:\/\s*)?>/gi;
  let lm: RegExpExecArray | null;
  while ((lm = lineRe.exec(content)) !== null) {
    const attrs = lm[1];
    const coords = [
      [numAttr(attrs, "x1", 0), numAttr(attrs, "y1", 0)],
      [numAttr(attrs, "x2", 0), numAttr(attrs, "y2", 0)],
    ];
    const lineNo = content.slice(0, lm.index).split(/\r?\n/).length;
    for (const [px, py] of coords) {
      if (px < xMin || px > xMax || py < yMin || py > yMax) {
        report(lineNo, px, py, `<line>`);
        break;
      }
    }
  }

  return violations;
}

// ────────────────────────────────────────────────────────────────
// 规则定义：每条规则针对「单行」做检查（多行跨标签的规则用状态机）
// ────────────────────────────────────────────────────────────────
const LINE_RULES: { re: RegExp; rule: string }[] = [
  // rgba() / rgb() —— 出现在任何属性里都算违规
  { re: /\brgba?\(\s*\d+/i, rule: "禁用 rgba()/rgb()，用 #RRGGBB + fill-opacity/stroke-opacity" },
  // <filter ...> / feDropShadow
  { re: /<filter\b/i, rule: "禁用 <filter>，用偏移矩形模拟阴影" },
  { re: /<feDropShadow\b/i, rule: "禁用 feDropShadow，用偏移矩形模拟阴影" },
  // marker 定义 / 引用
  { re: /<marker\b/i, rule: "禁用 <marker>，用 <line>+<polygon> 显式画箭头" },
  { re: /\bmarker-(end|start|mid)\s*=/i, rule: "禁用 marker-end/start/mid，用 <line>+<polygon> 显式画箭头" },
  // @import 外部字体
  { re: /@import\s+url/i, rule: "禁用 @import url()，只用本地 font-family 字体栈" },
  // 元素级 opacity（但允许 fill-opacity / stroke-opacity / stop-opacity）
  // 注意：要在 fill-opacity 之类之后才匹配裸 opacity
  { re: /(?<![a-z-])opacity\s*=\s*["']/i, rule: "禁用元素级 opacity，用 fill-opacity / stroke-opacity" },
];

// ────────────────────────────────────────────────────────────────
// 检查函数
// ────────────────────────────────────────────────────────────────

/** 检查 SVG 文件全文 */
function checkSvgContent(content: string, file: string): Violation[] {
  const violations: Violation[] = [];
  const lines = content.split(/\r?\n/);

  // 守卫：validate:ignore-block 标记的块整体跳过（用于"❌ 错误写法"对比教学块）
  // 也可单行用 validate:ignore-next-line 忽略下一行
  let skipBlock = false;

  lines.forEach((line, i) => {
    // 块级跳过控制
    if (/validate:ignore-block\b/.test(line)) {
      if (/validate:ignore-block-start/.test(line)) skipBlock = true;
      else if (/validate:ignore-block-end/.test(line)) skipBlock = false;
      else skipBlock = true; // 单行守卫 = 从此行到块尾跳过（同一代码块内）
      return;
    }
    if (skipBlock) return;

    for (const { re, rule } of LINE_RULES) {
      if (re.test(line)) {
        violations.push({ rule, line: i + 1, snippet: line.trim().slice(0, 120) });
      }
    }
  });

  // 重置（结构性规则走全文匹配，需要重新算跳过区间）
  skipBlock = false;
  const ignoredLineRanges: [number, number][] = [];
  let blockStart = -1;
  lines.forEach((line, i) => {
    if (/validate:ignore-block\b/.test(line)) {
      if (/validate:ignore-block-start/.test(line)) { skipBlock = true; blockStart = i + 1; }
      else if (/validate:ignore-block-end/.test(line)) {
        if (skipBlock) ignoredLineRanges.push([blockStart, i + 1]);
        skipBlock = false;
      } else {
        // 单行守卫：标记此行（注释本身所在行），后续教学行需要另行处理
        // 单行守卫语义不强，这里主要靠 start/end
      }
    }
  });

  const isLineIgnored = (ln: number) =>
    ignoredLineRanges.some(([a, b]) => ln >= a && ln <= b);

  // 多行 / 结构性规则
  // 1) linearGradient 必须带 gradientUnits
  const gradRe = /<linearGradient\b([^>]*)>/gi;
  let m: RegExpExecArray | null;
  while ((m = gradRe.exec(content)) !== null) {
    const attrs = m[1];
    if (!/gradientUnits\s*=/.test(attrs)) {
      const offset = m.index;
      const lineNo = content.slice(0, offset).split(/\r?\n/).length;
      if (isLineIgnored(lineNo)) continue;
      violations.push({
        rule: "<linearGradient> 必须声明 gradientUnits=\"objectBoundingBox\"",
        line: lineNo,
        snippet: m[0].trim().slice(0, 120),
      });
    }
  }

  // 2) <svg> 根节点：必须有 xmlns，建议有 viewBox
  const svgOpen = content.match(/<svg\b([^>]*)>/i);
  if (svgOpen) {
    const rootAttrs = svgOpen[1];
    const rootLine = content.slice(0, svgOpen.index!).split(/\r?\n/).length;
    if (!isLineIgnored(rootLine)) {
      if (!/xmlns\s*=/.test(rootAttrs)) {
        violations.push({
          rule: "<svg> 根节点缺少 xmlns=\"http://www.w3.org/2000/svg\"",
          line: rootLine,
          snippet: svgOpen[0].trim().slice(0, 120),
        });
      }
      if (!/viewBox\s*=/.test(rootAttrs)) {
        violations.push({
          rule: "<svg> 根节点缺少 viewBox（PPT 缩放依赖 viewBox）",
          line: rootLine,
          snippet: svgOpen[0].trim().slice(0, 120),
        });
      }
    }
  }

  // 3) 几何检测：箭头三角是否被节点框遮挡
  violations.push(...checkArrowOcclusion(content));

  // 4) 几何检测：连接线是否溢出泳道外框
  violations.push(...checkPathOverflow(content));

  return violations;
}

/** 从 Markdown 中提取 ```svg ... ``` 代码块并逐块检查 */
function checkMarkdownContent(content: string, file: string): CheckResult[] {
  const results: CheckResult[] = [];
  const lines = content.split(/\r?\n/);

  let inBlock = false;
  let blockLang = "";
  let blockStartLine = 0;
  let buffer: string[] = [];

  const flush = () => {
    if (!inBlock) return;
    // 只检查 svg 代码块（也检查没标语言的代码块如果含 <svg>，但这里保守只看 svg）
    if (blockLang === "svg" || buffer.some((l) => /<svg\b/i.test(l))) {
      const blockContent = buffer.join("\n");
      const violations = checkSvgContent(blockContent, file);
      if (violations.length > 0) {
        // 修正行号：相对块内 → 绝对文件行号
        const absViolations = violations.map((v) => ({
          ...v,
          line: v.line + blockStartLine,
        }));
        results.push({ file, violations: absViolations });
      }
    }
    inBlock = false;
    blockLang = "";
    buffer = [];
  };

  lines.forEach((line, i) => {
    const fence = line.match(/^\s*```\s*([\w-]+)?\s*$/);
    if (!inBlock) {
      if (fence) {
        inBlock = true;
        blockLang = fence[1] ?? "";
        blockStartLine = i + 1; // 代码块内容从下一行开始
      }
    } else {
      if (fence) {
        flush();
      } else {
        buffer.push(line);
      }
    }
  });
  flush(); // 文件末尾未闭合的块

  return results;
}

/** 递归收集目录下所有 .md 文件 */
function collectMarkdown(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...collectMarkdown(full));
    else if (extname(full).toLowerCase() === ".md") out.push(full);
  }
  return out;
}

// ────────────────────────────────────────────────────────────────
// CLI
// ────────────────────────────────────────────────────────────────

function printHelp() {
  console.log(`Usage: bun validate-svg.ts <file.svg>          校验单个 SVG 文件
       bun validate-svg.ts --check-refs [dir]   校验目录下 .md 中的 svg 代码块

Options:
  --check-refs        切换到 references 扫描模式（默认扫 references/）
  --json              JSON 输出
  -h, --help          显示帮助

Exit code: 0 = PASS，1 = 有违规`);
}

function parseArgs(args: string[]) {
  const opts = { checkRefs: false, json: false, target: "" };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "-h" || a === "--help") { printHelp(); process.exit(0); }
    else if (a === "--check-refs") opts.checkRefs = true;
    else if (a === "--json") opts.json = true;
    else if (!a.startsWith("-")) opts.target = a;
  }
  return opts;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.checkRefs) {
    // references 扫描模式
    const refsDir = opts.target
      ? resolve(opts.target)
      : resolve(__dirname, "..", "references");

    if (!existsSync(refsDir)) {
      console.error(`Error: references dir not found: ${refsDir}`);
      process.exit(1);
    }

    const mdFiles = collectMarkdown(refsDir);
    let totalViolations = 0;
    const allResults: CheckResult[] = [];

    for (const f of mdFiles) {
      const content = readFileSync(f, "utf-8");
      const results = checkMarkdownContent(content, f);
      for (const r of results) totalViolations += r.violations.length;
      allResults.push(...results);
    }

    if (opts.json) {
      console.log(JSON.stringify({ refsDir, totalViolations, results: allResults }, null, 2));
    } else {
      if (totalViolations === 0) {
        console.log(`✓ PASS — ${mdFiles.length} markdown files in ${refsDir}, 0 violations`);
      } else {
        console.log(`✗ FAIL — ${totalViolations} violation(s) in ${refsDir}\n`);
        for (const r of allResults) {
          console.log(`  ${r.file}`);
          for (const v of r.violations) {
            console.log(`    L${v.line}  ${v.rule}`);
            console.log(`           | ${v.snippet}`);
          }
          console.log("");
        }
      }
    }
    process.exit(totalViolations === 0 ? 0 : 1);
  }

  // 单 SVG 文件模式
  if (!opts.target) {
    console.error("Error: 需要 SVG 文件路径，或用 --check-refs 扫描 references");
    printHelp();
    process.exit(1);
  }

  const file = resolve(opts.target);
  if (!existsSync(file)) {
    console.error(`Error: ${file} not found`);
    process.exit(1);
  }
  if (extname(file).toLowerCase() !== ".svg") {
    console.error(`Error: ${file} 不是 .svg 文件`);
    process.exit(1);
  }

  const content = readFileSync(file, "utf-8");
  const violations = checkSvgContent(content, file);

  if (opts.json) {
    console.log(JSON.stringify({ file, violations }, null, 2));
  } else if (violations.length === 0) {
    console.log(`✓ PASS — ${file}`);
  } else {
    console.log(`✗ FAIL — ${violations.length} violation(s) in ${file}\n`);
    for (const v of violations) {
      console.log(`  L${v.line}  ${v.rule}`);
      console.log(`         | ${v.snippet}`);
    }
  }

  process.exit(violations.length === 0 ? 0 : 1);
}

main();
