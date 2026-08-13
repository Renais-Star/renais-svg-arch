# light-tech

亮色科技风格 SVG 架构图，基于 dark-tech 调色方案，仅将背景切换为白色，其余保持一致。

## 设计系统

### 色彩方案

| 类别 | 填充 | 描边 | 用途 |
|------|------|------|------|
| Primary | `#e0f7fa` | `#00acc1` (cyan) | 前端/用户层 |
| Secondary | `#e8f5e9` | `#2ecc71` (emerald) | 后端/服务层 |
| Tertiary | `#ede7f6` | `#7e57c2` (violet) | 数据/存储层 |
| Accent | `#fff8e1` | `#f9a825` (amber) | 基础设施/云 |
| Alert | `#fce4ec` | `#e53935` (rose) | 安全/警告 |
| Connector | `#fff3e0` | `#fb923c` (orange) | 总线/中间件 |
| Neutral | `#f1f5f9` | `#94a3b8` (slate) | 外部/通用 |
| Highlight | `#e3f2fd` | `#42a5f5` (blue) | 高亮/当前 |

### 背景

白色背景 + 网格纹理：

```svg
<defs>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" stroke-width="0.5"/>
  </pattern>
</defs>
<rect width="100%" height="100%" fill="#ffffff"/>
<rect width="100%" height="100%" fill="url(#grid)"/>
```

### 字体

```svg
<style>
  text { font-family: 'JetBrains Mono', 'Noto Sans SC', 'SF Mono', monospace; }
</style>
```

### 字号

| 角色 | 字号 | 字重 | 颜色 |
|------|------|------|------|
| 标题 | 16px | 700 | `#1e293b` |
| 组件名 | 11-12px | 600 | `#1e293b` |
| 子标签 | 9px | 400 | `#64748b` |
| 箭头标签 | 7-8px | 400 | `#64748b` |

### 组件模式

**标准盒子：**
```svg
<rect x="X" y="Y" width="160" height="60" rx="6" fill="#ffffff"/>
<rect x="X" y="Y" width="160" height="60" rx="6" fill="FILL" stroke="STROKE" stroke-width="1.5"/>
<text x="CX" y="Y+24" fill="#1e293b" font-size="11" font-weight="600" text-anchor="middle">名称</text>
<text x="CX" y="Y+40" fill="#64748b" font-size="9" text-anchor="middle">Description</text>
```

**区域边界：**
```svg
<rect x="X" y="Y" width="W" height="H" rx="12" fill="none" stroke="#f9a825" stroke-width="1" stroke-dasharray="8,4"/>
<text x="X+12" y="Y+16" fill="#f9a825" font-size="9" font-weight="600">区域名</text>
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
4. 不透明遮罩矩形（与组件同位，`fill="#ffffff"`）
5. 组件盒子（填充 + 描边）
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
| `<filter>` / `feDropShadow` | 用偏移矩形 `fill="#000000" fill-opacity="0.06"` 模拟阴影（亮色底阴影更浅） |
| `<marker>` / `marker-end` | 用 `<line>` + `<polygon>` 显式画箭头：线段到终点前 9px，三角 `points="cx-6,y2-11 cx,y2 cx+6,y2-11"` |
| `@import url(...)` | 只用 `font-family` 声明本地字体栈：`'JetBrains Mono', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif` |
| `opacity` (元素级) | 用 `fill-opacity` / `stroke-opacity` 分别控制 |

渐变必须显式声明 `gradientUnits="objectBoundingBox"`。

## 适用场景

- 可编辑的技术架构图
- 系统组件关系图
- 精确的数据流/流程图
- 需要矢量可缩放的图表
- 需要打印或白底文档嵌入的场景
