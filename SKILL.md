---
name: renais-svg-arch
description: Generate professional SVG architecture diagrams with multiple visual styles (dark-tech, light-tech, civic-blue, minimal-mono) and multiple layouts (layered-stack, flow-pipeline, hub-spoke, swimlane). Creates editable, PPT/Office-compatible SVG files with optional PNG export. Supports bilingual labels, icon library, and built-in validation. Use when user asks to create "architecture diagram", "架构图", "SVG架构图", "技术架构", "cloud architecture", "分层架构", "数据流", "流程图", "泳道图", "时序", "论文图", or "架构设计".
version: 1.1.0
---

# SVG Architecture Diagram Generator

Generate professional, PPT-compatible SVG architecture diagrams with multiple visual styles and layouts. Pure SVG code generation — no external APIs required.

## Capabilities

- **Pure SVG generation**: AI writes SVG code directly, fully editable
- **4 styles**: dark-tech (暗色科技), light-tech (亮色科技), civic-blue (政务商务), minimal-mono (黑白论文)
- **4 layouts**: layered-stack (分层), flow-pipeline (流水线), hub-spoke (中心辐射), swimlane (泳道)
- **Icon library**: 20 high-frequency architecture icons (database, server, cloud, gateway, etc.)
- **PPT/Office safe**: all SVG output follows strict compatibility rules, enforced by validator
- **Built-in validation**: `scripts/validate-svg.ts` checks PPT compatibility before reporting done
- **PNG export on demand**: via `scripts/svg2png.ts` (requires `bun` + `sharp`) — only when user explicitly requests PNG
- **Bilingual support**: Chinese + English labels

## Quick Start

The flow is **adaptive** — how you question depends on how much the user gave. ⛔ **Read [references/interaction.md](references/interaction.md) first** for the full questioning protocol. Summary:

1. **Judge input completeness** → route to one of 3 modes (see interaction.md §0):
   - **A. Blank** ("画个架构图" with no specifics) → **Guided mode**: AskUserQuestion to pick layout type → text-ask for content
   - **B. Vague topic** ("画个电商架构") → **Supplement mode**: one AskUserQuestion with 3 questions (scope + style + icons)
   - **C. Detailed material** (text/markdown/file with module enumeration) → **Extract mode**: extract per structuring.md → confirm structure → ask style+icons
2. **Every question is mandatory** — if the user's answer is empty/vague/contradictory, **pause** and re-ask. Never fall back to defaults to force generation.
3. **Structure confirmed** → read references → generate SVG → validate.
4. **Save SVG** (PNG export only if user explicitly requests it).

> Use `AskUserQuestion` for all choice-type questions (layout/scope/style/icons). Use **plain text** only for open-ended content requests (mode A step 2, or asking user to describe their system) — long text doesn't fit AskUserQuestion's input box.

## Script Directory

Determine this SKILL.md file's directory path as `{baseDir}`. All scripts are in `{baseDir}/scripts/`.

Resolve `${BUN_X}` runtime: if `bun` is installed → `bun`; if `npx` is available → `npx -y bun`. Only used when user explicitly requests PNG export.

## Style Gallery

### dark-tech
Dark-themed with cyan/emerald/violet accents, semi-transparent components, grid background. Cyberpunk feel.
→ [references/styles/dark-tech.md](references/styles/dark-tech.md)

### light-tech
Light-themed (white background) version of dark-tech — same color accents, bright clean feel. Ideal for printing and white-background documents.
→ [references/styles/light-tech.md](references/styles/light-tech.md)

### civic-blue
Government/enterprise standard — blue gradient layers, white sub-modules, 3D shadow simulation. Professional business feel.
→ [references/styles/civic-blue.md](references/styles/civic-blue.md)

### minimal-mono
Pure black-and-white line-frame style, no color, no gradient. Levels expressed via grayscale + stroke width. Ideal for academic papers, whitepapers, patent figures, print.
→ [references/styles/minimal-mono.md](references/styles/minimal-mono.md)

## Layout

| Layout | Description | Best For |
|--------|-------------|----------|
| `layered-stack` | Vertical layered stack with arrows between layers | Cloud architecture, tech stack, platform layers |
| `flow-pipeline` | Horizontal left-to-right pipeline with arrows between stages | Data pipelines, request flows, ETL, CI/CD |
| `hub-spoke` | Central hub with surrounding spoke nodes | API gateway, message bus, IAM center, aggregator |
| `swimlane` | Parallel lanes per role, steps flow across lanes | Business process, sequence, responsibility split |

→ [references/layouts/layered-stack.md](references/layouts/layered-stack.md)
→ [references/layouts/flow-pipeline.md](references/layouts/flow-pipeline.md)
→ [references/layouts/hub-spoke.md](references/layouts/hub-spoke.md)
→ [references/layouts/swimlane.md](references/layouts/swimlane.md)

### How to choose layout

- 用户提到「分层 / 架构 / 技术栈 / 平台 / 上层下层」 → `layered-stack`
- 用户提到「管道 / 流 / ETL / 数据流 / CI/CD / 上游下游」 → `flow-pipeline`
- 用户提到「中心 / 辐射 / 网关 / 总线 / 一对多 / 聚合」 → `hub-spoke`
- 用户提到「流程 / 泳道 / 时序 / 角色 / 责任 / 审批 / 工单流转」 → `swimlane`
- 不确定 → `layered-stack`（默认）

## Icons (optional)

If the diagram benefits from visual icons (e.g., product-facing or educational), use the icon library:

→ [references/icons.md](references/icons.md) — 20 high-frequency architecture icons (database, server, cloud, gateway, cache, queue, lock, monitor, etc.), all pure `<path>`, PPT-safe.

**Usage rule:** copy the icon's `<g>` content into the target SVG, wrap with `<g transform="translate(X,Y) scale(s)" color="#xxx">`. Never use `<use href="#id">` (PPT drops it).

## Workflow

```
User triggers skill (any message)
        │
        ▼
┌─ Step 0: Judge Input ──────────────────┐
│  How much did the user give?            │
│  (see interaction.md §0 for criteria)   │
└───────┬──────────┬──────────┬──────────┘
     A 空白      B 模糊       C 详细
       │          │            │
       ▼          ▼            ▼
┌─ Guided ─┐ ┌─ Supplement ─┐ ┌─ Extract ─┐
│ AskUserQ │ │ AskUserQ ×1  │ │ extract    │
│ pick     │ │ (scope+style │ │ (silent)   │
│ layout   │ │ +icons)      │ └─────┬──────┘
│ then     │ └──────┬───────┘       │
│ text-ask │        │               ▼
│ content  │        ▼        ┌─ Confirm ──┐
│ (必答)    │   [extract]     │ structure  │
└────┬─────┘        │        │ (AskUserQ) │
     │              │        └─────┬──────┘
     │              │              │ OK
     │              │              ▼
     │              │       ┌─ Ask style ─┐
     │              │       │ + icons     │
     │              │       │ (AskUserQ)  │
     │              │       └─────┬───────┘
     ▼              ▼              ▼
┌─────────────────────────────────────────┐
│  structured-content.md (confirmed)       │
└──────────────────┬──────────────────────┘
                   │
                   ▼
        ┌─ Read references ⛔ ─┐
        │  style + layout +    │
        │  icons (if used)     │
        └──────────┬───────────┘
                   ▼
        ┌─ Generate SVG ───────┐
        └──────────┬───────────┘
                   ▼
        ┌─ Validate ⛔ ────────┐
        │  validate-svg.ts     │
        │  (fix until PASS)    │
        └──────────┬───────────┘
                   ▼
              Done ✓
       (PNG only if user asks)
```

⛔ **At any AskUserQuestion: if the user's answer is empty / "随便" / contradictory → PAUSE and re-ask. Never fall back to defaults.** See interaction.md "暂停规则".

### Step 1: Judge Input & Route to Mode ⛔

⛔ **MUST read [references/interaction.md](references/interaction.md) first.** It has the exact judgment criteria, AskUserQuestion templates, and pause rules. This section is a summary.

Look at the user's message and classify into **A / B / C**:

| Mode | Trigger | What to do |
|------|---------|-----------|
| **A. Blank** | No specific business words, only "画个架构图" / "/renais-svg-arch" | **Guided mode** — see §1.1 |
| **B. Vague topic** | Has ≥1 business word (电商/订单/SaaS...) but no module enumeration | **Supplement mode** — see §1.2 |
| **C. Detailed** | Module/layer enumeration, or attached file/markdown/long text | **Extract mode** — see §1.3 |

When A vs B is ambiguous, treat as **B** (supplement mode is friendlier).

#### 1.1 Guided mode (A) — user gave nothing

User doesn't know what they want. Help them figure out the shape, then get content.

**Round 1 — AskUserQuestion (pick layout):**

```
question: "你想画哪种架构？"
header: "架构类型"
options:
  - label: "分层架构"   description: "上层依赖下层。适合技术栈、云平台、系统分层（接入层→服务层→数据层）"
  - label: "流程管道"   description: "数据/请求从左到右流。适合 ETL、数据管道、请求链路（采集→处理→存储）"
  - label: "中心辐射"   description: "一个核心连接多个节点。适合 API 网关、消息总线、IAM 中心"
  - label: "角色流程"   description: "谁负责哪一步。适合审批流、工单流转、业务时序（用户→审核→执行）"
```

Layout mapping (internal): 分层→`layered-stack`, 流程→`flow-pipeline`, 中心→`hub-spoke`, 角色→`swimlane`.

**Round 2 — plain text (ask for content, NOT AskUserQuestion — content is long open text):**

> 好，那就用 [布局名]。请告诉我具体画什么——可以是任意形式：一段文字描述、Markdown、或直接贴一段文档。越具体越好，不知道怎么组织也没关系，我会帮你整理。

⛔ **This is mandatory.** If the user gives no real content ("随便"/"你看着办") → **PAUSE** (see interaction.md "暂停规则"). Do not fabricate a system.

#### 1.2 Supplement mode (B) — has topic, needs scope + form

Topic is clear, fill in scope + style + icons in **one AskUserQuestion** (3 questions):

Before asking, tell the user your layout inference: "从你说的「[主题]」看，这更像 [布局]（因为 [理由]）。"

Then AskUserQuestion with 3 questions (full templates in interaction.md §"补充模式"):
- **Q1 范围** (mandatory): 全链路 / 只画某层 / 突出某模块
- **Q2 风格** (mandatory): 暗色科技 / 亮色清爽 / 政务商务 / 黑白论文
- **Q3 图标** (mandatory): 不要图标 / 要图标

All 3 are mandatory. If layout can't be inferred from topic, fold it into Q1.

#### 1.3 Extract mode (C) — has detailed material

Material is enough. Two steps (user decision: step-by-step is OK):

**Step 1.3a — extract silently, then confirm structure:**

Extract per [structuring.md](structuring.md) (the mandatory method doc). Then AskUserQuestion:

```
question: "我抽出了这样的结构，对吗？
  - 布局：[X]（[理由]）
  - [N] 层：[列出]
  - 关系：[列出，标 (默认推断)]
  - 侧栏：[如有]"
header: "结构确认"
options:
  - label: "结构没问题"   description: "按这个继续画"
  - label: "有地方要改"   description: "我会告诉你改哪里"
```

If "有地方要改" → text-ask what to change, re-confirm. **Do not proceed until structure is confirmed.**

**Step 1.3b — ask form (after structure confirmed):**

One AskUserQuestion (2 questions): 风格 (4 options) + 图标 (要/不要). Layout already decided in 1.3a.

### Step 2: Extract & Structure → `structured-content.md`

⛔ **MUST read [references/structuring.md](references/structuring.md) first.** It contains the deterministic method for extracting structure from messy input — signal words, decision trees, self-check checklist, common errors. Skipping it leads to missed layers or fabricated modules.

Once you have the content, follow structuring.md:

1. **Identify input type** (structured Markdown / free text / doc fragment / meeting notes) — see structuring.md §1
2. **Extract layers** via signal words (§2) — only what the user explicitly said, never fabricate
3. **Extract modules** within each layer (§3)
4. **Extract relationships** — explicit first, then mark inferred ones as `(默认)` (§4)
5. **Classify side columns** — security / monitoring / standards go to side columns, not main layers (§4.3)
6. **Decide layout** via the decision tree (§5) — confirm with user, don't decide silently
7. **Detect language** and mark missing translations as `[需补 EN]`
8. **Run the self-check checklist** (§"抽取后自检清单") — every box must pass before output
9. **Flowchart deepening (swimlane only)** ⛔ — if layout is swimlane, read [flow-detail.md](references/flow-detail.md) and run the batch questioning to fill in decision branches / fallbacks / thresholds / start-end. Do NOT generate a flowchart with only the happy-path main line. See flow-detail.md §0 for when to skip.

Output template (field order fixed):

```markdown
# Architecture: [Topic] ([English Topic])

## Layout

- 类型: [layered-stack|flow-pipeline|hub-spoke|swimlane] [横向|纵向]
- 风格: [待用户选 / 建议]
- 图标: [启用/不启用]
- 选这个布局的理由: [一句话]

## Layers (top to bottom) / Stages (left to right) / Hub & Spokes

### Layer 1: [层名] ([English])
- Module A ([EN]): [描述]
- Module B ([EN]): [描述]

## Side Columns (optional)

### Left: [Column Name]
- Sub items...

### Right: [Column Name]
- Sub items...

### Bottom: [Bar Name]
- Sub items...

## Relationships

- A → B: [关系说明] [(默认)/用户明说]
- A ↔ B: [关系说明]

## Notes

- [任何需要用户确认的假设]
- [任何缺失的信息]
```

Save to output directory: `arch-diagram/{topic-slug}/structured-content.md`

Slug: 2-4 words kebab-case from topic.

> Note: in **extract mode (1.3)**, structure confirmation happens via AskUserQuestion *before* you finalize this file — adjust the file based on user's confirmation/corrections. In **guided/supplement mode (1.1/1.2)**, the content comes together through the Q&A, so write this file once the answers are in, then proceed.

### Step 3: Read References ⛔ BLOCKING

**MUST read these files before generating any SVG code:**

1. **Chosen style**: `references/styles/{style}.md` — color palette, component patterns, spacing, PPT compatibility rules
2. **Chosen layout**: `references/layouts/{layout}.md` — structure, arrow types, spacing, viewBox calculation for that topology
3. **Layout algorithm**: `references/svg/architecture.md` — TTB/LTR layout, connection routing, multi-region nesting
4. **Icons (only if user wants icons)**: `references/icons.md` — pick the relevant icons, copy their `<g>` content

### Step 4: Generate SVG → `diagram.svg`

Write SVG code following the style's design system precisely.

**Mandatory SVG rules:**

- Add `xmlns="http://www.w3.org/2000/svg"` on root `<svg>`
- Set `viewBox` to fit content + 30-40px padding; no fixed `width`/`height`
- Place all `<defs>` (gradients, patterns) and `<style>` at the top
- Draw in the z-order specified by the style
- For Chinese labels: use wider boxes for CJK characters

**PPT/Office compatibility (strict — every rule must be followed):**

| ❌ Forbidden | ✅ Use Instead |
|-------------|---------------|
| `rgba(r,g,b,a)` | `fill="#RRGGBB" fill-opacity="0.xx"` / `stroke="#RRGGBB" stroke-opacity="0.xx"` |
| `<filter>` / `feDropShadow` | Offset rect before target: `fill="#000000" fill-opacity="0.08"` |
| `<marker>` / `marker-end="url(#arrow)"` | Explicit `<line>` + `<polygon>` for arrows |
| `@import url(...)` | Local font-family stack only |
| Element-level `opacity` | `fill-opacity` / `stroke-opacity` |
| `<linearGradient>` without `gradientUnits` | Always add `gradientUnits="objectBoundingBox"` |

**Arrow pattern (PPT-safe):**

```svg
<!-- Down arrow from (cx, y1) to (cx, y2) -->
<line x1="cx" y1="y1" x2="cx" y2="y2-9" stroke="COLOR" stroke-width="1.5"/>
<polygon points="cx-6,y2-11 cx,y2 cx+6,y2-11" fill="COLOR"/>
```

**Shadow pattern (PPT-safe):**

```svg
<!-- Place BEFORE the target element -->
<rect x="X+1" y="Y+3" width="W" height="H" rx="R" fill="#000000" fill-opacity="0.08"/>
<rect x="X" y="Y" width="W" height="H" rx="R" fill="FILL"/>
```

**Side column layout (anti-overlap, mandatory):**

When a side column contains both a rotated title and horizontal detail text, they MUST occupy separate zones:

```
┌──────────────────────────┐
│ Title │ Detail Text      │
│ Zone  │ Zone             │
│(rotat │ (horizontal)     │
│ ed -90│                  │
│ °)    │  • Item 1        │
│       │  • Item 2        │
│       │  • Item 3        │
└──────────────────────────┘
```

Rules:
1. **Split the column** into two zones with a subtle divider line
2. **Rotated title** occupies the outer strip (~45px wide), centered at ~x+25
3. **Detail text** occupies the inner portion, centered at ~x+100
4. **Never** place rotated and horizontal text at the same x coordinate
5. Minimum column width for dual-zone: **150px**
6. If column is narrower than 150px, use rotated title only (no detail text)

Example (left column, width=158, x=35):
```svg
<!-- Divider between zones -->
<line x1="80" y1="70" x2="80" y2="730" stroke="COLOR" stroke-width="0.5" stroke-opacity="0.2"/>
<!-- Rotated title in outer strip -->
<text x="58" y="400" text-anchor="middle" font-size="13" font-weight="700" fill="COLOR" transform="rotate(-90 58 400)">标题</text>
<!-- Detail text in inner zone -->
<text x="137" y="120" text-anchor="middle" font-size="9" fill="COLOR">内容项</text>
```

Save to: `arch-diagram/{topic-slug}/diagram.svg`

### Step 5: Validate ⛔ BLOCKING

**After writing the SVG, run the validator before reporting done.** If it fails, fix the violations and re-validate until it passes.

```bash
${BUN_X} {baseDir}/scripts/validate-svg.ts arch-diagram/{slug}/diagram.svg
```

- Exit code 0 = PASS → proceed to output summary
- Exit code 1 = FAIL → read the violations, fix the SVG, re-run

This guarantees PPT/Office compatibility. **Do not skip this step.**

Output summary:

```
SVG Architecture Diagram Generated!

Topic: [topic]
Style: [style] | Layout: [layout] | Language: [lang]
Location: [directory path]
Validation: ✓ PASS

Files:
✓ structured-content.md
✓ diagram.svg
```

### PNG Export (only when explicitly requested)

If the user later says "导出 PNG" or "我要 PNG":

```bash
${BUN_X} {baseDir}/scripts/svg2png.ts arch-diagram/{slug}/diagram.svg --scale 1 --output arch-diagram/{slug}/diagram.png
${BUN_X} {baseDir}/scripts/svg2png.ts arch-diagram/{slug}/diagram.svg --scale 2 --output arch-diagram/{slug}/diagram@2x.png
```

## Output Structure

```
arch-diagram/{topic-slug}/
├── source-{slug}.{ext}        # Source content (if provided)
├── structured-content.md      # Structured architecture data
└── diagram.svg                # SVG output (primary, always generated)
# Below files only generated when user explicitly requests PNG:
# ├── diagram.png                # PNG 1x
# └── diagram@2x.png             # PNG 2x
```

## File Index

```
renais-svg-arch/
├── SKILL.md                              # This file
├── references/
│   ├── styles/
│   │   ├── dark-tech.md                  # Dark cyberpunk style
│   │   ├── light-tech.md                 # Light tech style (white bg)
│   │   ├── civic-blue.md                 # Government/enterprise style
│   │   └── minimal-mono.md               # Black-and-white academic style
│   ├── layouts/
│   │   ├── layered-stack.md              # Vertical layered stack
│   │   ├── flow-pipeline.md              # Horizontal left-to-right pipeline
│   │   ├── hub-spoke.md                  # Central hub + radiating spokes
│   │   └── swimlane.md                   # Parallel lanes per role
│   ├── svg/
│   │   └── architecture.md               # Layout algorithm (TTB/LTR, routing)
│   ├── icons.md                          # 20 high-frequency architecture icons
│   ├── structuring.md                    # Method: extract structure from free text
│   ├── interaction.md                    # Adaptive questioning protocol (3 modes)
│   └── flow-detail.md                    # Flowchart completeness questioning (swimlane)
└── scripts/
    ├── svg2png.ts                        # SVG → PNG converter (needs sharp)
    └── validate-svg.ts                   # PPT-compatibility validator
```
