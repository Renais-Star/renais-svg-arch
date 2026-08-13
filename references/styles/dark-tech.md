# dark-tech

暗色科技风格 SVG 架构图，精确的代码级控制，适合可编辑的技术图表。

## 设计系统

### 色彩方案

| 类别 | 填充 | 描边 | 用途 |
|------|------|------|------|
| Primary | `rgba(8, 51, 68, 0.4)` | `#22d3ee` (cyan) | 前端/用户层 |
| Secondary | `rgba(6, 78, 59, 0.4)` | `#34d399` (emerald) | 后端/服务层 |
| Tertiary | `rgba(76, 29, 149, 0.4)` | `#a78bfa` (violet) | 数据/存储层 |
| Accent | `rgba(120, 53, 15, 0.3)` | `#fbbf24` (amber) | 基础设施/云 |
| Alert | `rgba(136, 19, 55, 0.4)` | `#fb7185` (rose) | 安全/警告 |
| Connector | `rgba(251, 146, 60, 0.3)` | `#fb923c` (orange) | 总线/中间件 |
| Neutral | `rgba(30, 41, 59, 0.5)` | `#94a3b8` (slate) | 外部/通用 |
| Highlight | `rgba(59, 130, 246, 0.3)` | `#60a5fa` (blue) | 高亮/当前 |

### 背景

暗色背景 + 网格纹理：

```svg
<defs>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.5"/>
  </pattern>
</defs>
<rect width="100%" height="100%" fill="#0f172a"/>
<rect width="100%" height="100%" fill="url(#grid)"/>
```

### 字体

只用本地字体栈（PPT 无法加载 `@import` 外部字体）：

```svg
<style>
  text { font-family: 'JetBrains Mono', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif; }
</style>
```

### 字号

| 角色 | 字号 | 字重 | 颜色 |
|------|------|------|------|
| 标题 | 16px | 700 | `white` |
| 组件名 | 11-12px | 600 | `white` |
| 子标签 | 9px | 400 | `#94a3b8` |
| 箭头标签 | 7-8px | 400 | `#94a3b8` |

### 组件模式

**标准盒子：**
```svg
<rect x="X" y="Y" width="160" height="60" rx="6" fill="#0f172a"/>
<rect x="X" y="Y" width="160" height="60" rx="6" fill="FILL" stroke="STROKE" stroke-width="1.5"/>
<text x="CX" y="Y+24" fill="white" font-size="11" font-weight="600" text-anchor="middle">名称</text>
<text x="CX" y="Y+40" fill="#94a3b8" font-size="9" text-anchor="middle">Description</text>
```

**区域边界：**
```svg
<rect x="X" y="Y" width="W" height="H" rx="12" fill="none" stroke="#fbbf24" stroke-width="1" stroke-dasharray="8,4"/>
<text x="X+12" y="Y+16" fill="#fbbf24" font-size="9" font-weight="600">区域名</text>
```

**箭头（PPT 安全写法，禁用 `<marker>`）：**

向下箭头 `(cx, y1)→(cx, y2)`——线段到终点前 9px，三角顶点在终点：

```svg
<line x1="cx" y1="y1" x2="cx" y2="y2-9" stroke="#64748b" stroke-width="1.5"/>
<polygon points="cx-6,y2-11 cx,y2 cx+6,y2-11" fill="#64748b"/>
```

水平向右箭头 `(x1, cy)→(x2, cy)`：

```svg
<line x1="x1" y1="cy" x2="x2-9" y2="cy" stroke="#64748b" stroke-width="1.5"/>
<polygon points="x2-11,cy-6 x2,cy x2-11,cy+6" fill="#64748b"/>
```

### 层叠顺序

1. 背景填充 + 网格
2. 区域/组边界
3. 连接箭头和线条
4. 不透明遮罩矩形（与组件同位，`fill="#0f172a"`）
5. 组件盒子（半透明填充 + 描边）
6. 文字标签
7. 图例
8. 标题块

### 间距规则

- 组件高度：50-70px（标准），80-120px（大型）
- 最小间距：40px 垂直，30px 水平
- 箭头标签间隙：10px
- 区域边界内边距：20px
- viewBox：所有内容 + 30px padding

### 中英文支持

中文标签时使用 `font-family: 'JetBrains Mono', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif`，盒子宽度需加宽（CJK 字符更宽）。

### PPT 兼容性规则（强制）

生成 SVG 时**必须**遵循以下规则，确保在 Microsoft PowerPoint 中正确渲染并支持「转换为形状」：

| 禁止 | 替代方案 |
|------|----------|
| `rgba(r,g,b,a)` | `fill="#RRGGBB" fill-opacity="0.xx"` 或 `stroke="#RRGGBB" stroke-opacity="0.xx"` |
| `<filter>` / `feDropShadow` | 不使用阴影（暗色风格无需阴影），或用偏移矩形 `fill="#000000" fill-opacity="0.08"` 模拟 |
| `<marker>` / `marker-end` | 用 `<line>` + `<polygon>` 显式画箭头：线段到终点前 9px，三角 `points="cx-6,y2-11 cx,y2 cx+6,y2-11"` |
| `@import url(...)` | 只用 `font-family` 声明本地字体栈：`'JetBrains Mono', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif` |
| `opacity` (元素级) | 用 `fill-opacity` / `stroke-opacity` 分别控制 |

渐变必须显式声明 `gradientUnits="objectBoundingBox"`。

## 适用场景

- 可编辑的技术架构图
- 系统组件关系图
- 精确的数据流/流程图
- 需要矢量可缩放的图表
