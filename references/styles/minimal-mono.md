# minimal-mono

极简黑白线框风格，无彩色、无渐变。通过灰度阶梯、描边粗细、填充留白来表达层级。适合**学术论文、白皮书、技术评审、专利图、印刷文档**。

## 设计哲学

- **零彩色**：只用黑/白/灰，不引入任何色相
- **零渐变**：纯色填充，靠 `fill-opacity` 制造层次
- **线框为主**：组件用矩形描边而非实心填充
- **印刷友好**：高对比度，黑白打印机输出不丢信息
- **信息密度优先**：去掉一切装饰，让结构和文字成为主角

## 设计系统

### 灰度方案(5 档 + 黑白)

| 类别 | 填充 | 描边 | 用途 |
|------|------|------|------|
| Primary(最强) | `#FFFFFF` | `#000000` stroke-width 2 | 核心节点 / Hub |
| Secondary | `#FFFFFF` | `#000000` stroke-width 1.5 | 普通节点 |
| Tertiary | `#F5F5F5` | `#333333` stroke-width 1 | 次要节点 / 分组背景 |
| Quaternary | `#E8E8E8` | `#666666` stroke-width 1 | 边框 / 容器 |
| Muted | `#FFFFFF` | `#999999` stroke-width 1 dashed | 区域边界 / 可选元素 |
| Ink(文字主) | `#000000` | — | 标题、主文字 |
| Sub(文字副) | `#555555` | — | 描述、副标题 |
| Faint(文字弱) | `#888888` | — | 箭头标签、注释 |

> 关键：**层级靠描边粗细区分**(2 / 1.5 / 1)，不靠颜色。

### 背景

纯白背景，**无网格、无纹理**：

```svg
<rect width="100%" height="100%" fill="#FFFFFF"/>
```

> 不要画网格纹理，会破坏论文图的干净感。

### 字体

衬线 + 等宽组合，匹配学术论文气质：

```svg
<style>
  text { font-family: 'Times New Roman', 'SimSun', 'STSong', serif; }
</style>
```

> 中文用宋体(STSong / SimSun)，英文用 Times New Roman，对齐论文排版习惯。
> 若需更现代感，可换 `'Georgia', 'Source Han Serif SC', serif`。

### 字号

| 角色 | 字号 | 字重 | 颜色 |
|------|------|------|------|
| 总标题 | 16px | 700 | `#000000` |
| 副标题 | 11px | 400 italic | `#555555` |
| 层/组标题 | 12px | 700 | `#000000` |
| 组件名 | 11px | 600 | `#000000` |
| 子标签 | 9px | 400 | `#555555` |
| 箭头标签 | 8px | 400 italic | `#888888` |
| 图注 | 9px | 400 | `#555555` |

### 组件模式

**标准节点(线框):**
```svg
<rect x="X" y="Y" width="160" height="60" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="1.5"/>
<text x="CX" y="Y+24" fill="#000000" font-size="11" font-weight="600" text-anchor="middle">名称</text>
<text x="CX" y="Y+42" fill="#555555" font-size="9" text-anchor="middle">Description</text>
```

> `rx="0"` 直角(不用圆角)，呼应论文/专利图的严谨感。
> 若想柔和一点可用 `rx="2"`，但不要超过 4。

**核心节点(加粗强调):**
```svg
<rect x="X" y="Y" width="200" height="80" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="2.5"/>
<text x="CX" y="CY-2" fill="#000000" font-size="13" font-weight="700" text-anchor="middle">核心名称</text>
<text x="CX" y="CY+16" fill="#555555" font-size="10" text-anchor="middle">Core Description</text>
```

**实心节点(黑白反转，用于关键步骤):**
```svg
<rect x="X" y="Y" width="160" height="60" rx="0" fill="#000000" stroke="#000000" stroke-width="1.5"/>
<text x="CX" y="Y+24" fill="#FFFFFF" font-size="11" font-weight="600" text-anchor="middle">名称</text>
<text x="CX" y="Y+42" fill="#CCCCCC" font-size="9" text-anchor="middle">Description</text>
```

> 实心节点要节制使用，一图最多 1-2 个，否则失去强调效果。

**分组容器(虚线边界):**
```svg
<rect x="X" y="Y" width="W" height="H" rx="0" fill="none" stroke="#999999" stroke-width="1" stroke-dasharray="6,4"/>
<text x="X+8" y="Y+16" fill="#000000" font-size="10" font-weight="700">区域名</text>
```

**分组容器(实线 + 浅底):**
```svg
<rect x="X" y="Y" width="W" height="H" rx="0" fill="#F5F5F5" stroke="#666666" stroke-width="1"/>
<text x="X+10" y="Y+18" fill="#000000" font-size="11" font-weight="700">区域名</text>
```

### 层叠顺序

1. 白色背景
2. 分组容器(虚线或浅底)
3. 连接线和箭头
4. 节点框(线框)
5. 文字标签
6. 图例和图注

> 跟彩色风格不同：**箭头画在节点之下**，让节点线框覆盖箭头端点，视觉更干净。
> 这意味着箭头三角要稍微伸入节点框内一点(或正好抵到边)，靠节点遮挡避免溢出。

### 间距规则

- 节点高度：50-70px(标准)，80-100px(核心)
- 最小间距：40px 垂直，30px 水平
- 箭头标签间隙：12px
- 分组边界内边距：20px
- viewBox：所有内容 + 40px padding(论文图留白要充足)

### 中英文支持

中文标签用 `font-family: 'Times New Roman', 'SimSun', 'STSong', serif`。
论文场景常需中英双语标注，中文在上、英文斜体在下，字号差 2px。

## 箭头(PPT 安全，禁用 `<marker>`)

黑白风格箭头统一用黑色实心三角，**描边粗细随连接重要性变化**：

```svg
<!-- 水平向右 (x1,cy)→(x2,cy)，主线 -->
<line x1="x1" y1="cy" x2="x2-9" y2="cy" stroke="#000000" stroke-width="1.5"/>
<polygon points="x2-11,cy-6 x2,cy x2-11,cy+6" fill="#000000"/>

<!-- 次要连接(细线) -->
<line x1="x1" y1="cy" x2="x2-9" y2="cy" stroke="#555555" stroke-width="1"/>
<polygon points="x2-10,cy-5 x2,cy x2-10,cy+5" fill="#555555"/>

<!-- 辅助/可选(虚线) -->
<line x1="x1" y1="cy" x2="x2-9" y2="cy" stroke="#888888" stroke-width="1" stroke-dasharray="4,3"/>
<polygon points="x2-10,cy-5 x2,cy x2-10,cy+5" fill="#888888"/>
```

向下/折线箭头同理，三角方向按终点朝向调整(参考 hub-spoke.md 的 4 方向三角模板)。

## 区分层级的 4 种手段(无彩色时的核心技巧)

彩色风格靠色相区分，黑白风格只能靠这 4 种：

| 手段 | 强 | 中 | 弱 |
|------|----|----|-----|
| 描边粗细 | 2.5px | 1.5px | 1px |
| 填充 | `#000000`(实心反转) | `#FFFFFF`(白底) | `#F5F5F5`(浅灰底) |
| 字重 | 700 | 600 | 400 |
| 边界 | 实线 | 实线 | 虚线 `stroke-dasharray="6,4"` |

**组合示例**：
- 核心节点 = 实心黑底 + 白字 + 700
- 主要节点 = 白底 + 2px 描边 + 600
- 次要节点 = 白底 + 1.5px 描边 + 600
- 分组容器 = 无填充 + 1px 虚线 + 700 标题
- 辅助说明 = 浅灰底 + 1px 实线 + 400

## PPT 兼容性规则(强制)

跟其他风格一致，禁用所有 PPT 不支持的特性：

| 禁止 | 替代 |
|------|------|
| `rgba(r,g,b,a)` | `fill="#RRGGBB" fill-opacity="0.xx"` |
| `<filter>` / `feDropShadow` | **不用阴影**(黑白风格本来就靠线框不靠阴影) |
| `<marker>` / `marker-end` | `<line>` + `<polygon>` 显式画箭头 |
| `@import url(...)` | 本地 `font-family` 栈 |
| 元素级 `opacity` | `fill-opacity` / `stroke-opacity` |
| `<linearGradient>` | **不用渐变**(黑白风格的定义) |

> 黑白风格的 PPT 兼容性天然最好——不用渐变、不用阴影、不用滤镜，本身就避开了大部分坑。

## 图注(论文图标配)

论文图必须有图注(figure caption)，放在图底部：

```svg
<text x="W/2" y="H-20" font-size="10" fill="#555555" text-anchor="middle" font-style="italic">
  Figure 1. 系统架构总览。虚线表示可选依赖，实线表示强依赖。
</text>
```

## 适用场景

- 学术论文、会议 paper 的系统图
- 白皮书、技术方案评审
- 专利申请附图(要求黑白)
- 印刷品、报告、书籍插图
- 需要严谨、克制、去营销感的场合
- 黑白打印机输出场景

## 不适合的场景

- 营销材料、对外宣发(太素)
- 需要快速区分多层的复杂架构(色相更高效)
- 演示动画、视频(缺乏视觉冲击)
