# civic-blue

政务 / 企业级标准技术架构图风格，整体呈现「专业商务、层次分明、视觉友好」的视觉效果。采用蓝色系渐变分层、浅色背景、3D 立体容器，适合正式汇报和文档交付场景。

## 设计系统

### 色彩方案

| 类别 | 填充 | 描边 | 用途 |
|------|------|------|------|
| Layer1-Primary | `linear-gradient(#0F4C81, #1E6BB8)` | `#0D3F6B` | 核心业务层（最顶层） |
| Layer2-Secondary | `linear-gradient(#1E6BB8, #3A8BDB)` | `#185A9A` | 应用支撑层 |
| Layer3-Tertiary | `linear-gradient(#3A8BDB, #6AB0F0)` | `#2E78C4` | 数据资源层 |
| Layer4-Accent | `linear-gradient(#6AB0F0, #A0D0FF)` | `#5A9DE0` | 基础设施层（最底层） |
| Security | `#E63946` | `#C1303C` | 信息安全保障（红色系） |
| Ops | `#2A9D8F` | `#1F7A6F` | 运维服务体系（绿色系） |
| Standards | `#7B61FF` | `#634FE0` | 标准规范体系（紫色系） |
| SubModule | `#FFFFFF` | `#D1D5DB` | 子模块内容区（白底灰边） |
| Arrow | `#1E6BB8` | — | 层级间连接箭头 |
| NewMarker | `#F59E0B` | — | ★新建标记 |

### 渐变定义

所有渐变从上到下（y1="0%" y2="100%"）：

```svg
<defs>
  <!-- Layer 1: 核心业务层 -->
  <linearGradient id="grad-layer1" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0%" stop-color="#0F4C81"/>
    <stop offset="100%" stop-color="#1E6BB8"/>
  </linearGradient>
  <!-- Layer 2: 应用支撑层 -->
  <linearGradient id="grad-layer2" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0%" stop-color="#1E6BB8"/>
    <stop offset="100%" stop-color="#3A8BDB"/>
  </linearGradient>
  <!-- Layer 3: 数据资源层 -->
  <linearGradient id="grad-layer3" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0%" stop-color="#3A8BDB"/>
    <stop offset="100%" stop-color="#6AB0F0"/>
  </linearGradient>
  <!-- Layer 4: 基础设施层 -->
  <linearGradient id="grad-layer4" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0%" stop-color="#6AB0F0"/>
    <stop offset="100%" stop-color="#A0D0FF"/>
  </linearGradient>
  <!-- 3D 立体阴影：禁用 SVG 滤镜，改用偏移矩形模拟（见下方"阴影模拟"） -->
  <!-- 箭头：禁用 marker 定义，改用 line+polygon 显式画法（见下方"箭头安全写法"） -->
</defs>
```

### 背景

浅灰色纯色背景，干净专业：

```svg
<rect width="100%" height="100%" fill="#F8FAFC"/>
```

### 字体

只用本地字体栈（PPT 无法加载 `@import` 外部字体）：

```svg
<style>
  text { font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif; }
</style>
```

### 字号

| 角色 | 字号 | 字重 | 颜色 |
|------|------|------|------|
| 总标题 | 18px | 700 | `#1E293B` |
| 层级标题（中文） | 13px | 700 | `#FFFFFF` |
| 层级副标题（英文） | 10px | 400 italic | `#FFFFFF` + `fill-opacity="0.8"` |
| 模块标题 | 11px | 600 | `#1E293B` |
| 子模块文字 | 10px | 400 | `#374151` |
| 侧栏标题 | 12px | 600 | `#FFFFFF` |
| 侧栏子项 | 10px | 400 | `#FFFFFF` + `fill-opacity="0.9"` |
| 箭头标签 | 8px | 400 | `#64748B` |

### 组件模式

**主层容器（带 3D 立体效果）：**
```svg
<!-- 阴影底层：偏移矩形，放在主元素前面（禁用 SVG 滤镜） -->
<rect x="X+1" y="Y+3" width="W" height="H" rx="14" fill="#000000" fill-opacity="0.08"/>
<!-- 主层 -->
<rect x="X" y="Y" width="W" height="H" rx="14" fill="url(#grad-layerN)"/>
<!-- 高光：顶部 1px 浅色线 -->
<line x1="X+14" y1="Y+1" x2="X+W-14" y2="Y+1" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1"/>
<!-- 高光：右侧 1px 浅色线 -->
<line x1="X+W-1" y1="Y+14" x2="X+W-1" y2="Y+H-14" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>
```

**子模块盒子（白色卡片）：**
```svg
<rect x="X" y="Y" width="W" height="H" rx="8" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="1"/>
<text x="CX" y="CY" fill="#374151" font-size="10" font-weight="400" text-anchor="middle" dominant-baseline="central">名称</text>
```

**子区域分组容器：**
```svg
<rect x="X" y="Y" width="W" height="H" rx="8" fill="#FFFFFF" fill-opacity="0.5" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="1"/>
<text x="CX" y="Y+16" fill="#FFFFFF" fill-opacity="0.9" font-size="10" font-weight="500" text-anchor="middle">区域名</text>
```

**侧栏容器：**
```svg
<!-- 信息安全保障（红色） -->
<rect x="X" y="Y" width="W" height="H" rx="8" fill="#E63946"/>
<text x="CX" y="Y+20" fill="#FFFFFF" font-size="12" font-weight="600" text-anchor="middle">信息安全保障</text>

<!-- 运维服务体系（绿色） -->
<rect x="X" y="Y" width="W" height="H" rx="8" fill="#2A9D8F"/>
<text x="CX" y="Y+20" fill="#FFFFFF" font-size="12" font-weight="600" text-anchor="middle">运维服务体系</text>
```

**底部基座条（紫色）：**
```svg
<rect x="X" y="Y" width="W" height="H" rx="8" fill="#7B61FF"/>
<text x="CX" y="CY" fill="#FFFFFF" font-size="12" font-weight="600" text-anchor="middle" dominant-baseline="central">标准规范体系</text>
```

**层级间连接箭头（蓝色实心双向，PPT 安全写法）：**

双向箭头 `(cx, y1)↔(cx, y2)` —— 上下各一个三角：

```svg
<!-- 中间线段 -->
<line x1="cx" y1="y1+11" x2="cx" y2="y2-11" stroke="#1E6BB8" stroke-width="2"/>
<!-- 上三角（顶点在 y1） -->
<polygon points="cx-6,y1+11 cx,y1 cx+6,y1+11" fill="#1E6BB8"/>
<!-- 下三角（顶点在 y2） -->
<polygon points="cx-6,y2-11 cx,y2 cx+6,y2-11" fill="#1E6BB8"/>
```

**侧栏虚线连接：**
```svg
<!-- 信息安全保障 → 各层（红色虚线） -->
<line x1="X1" y1="Y1" x2="X2" y2="Y2" stroke="#E63946" stroke-width="1" stroke-dasharray="6,4" stroke-opacity="0.5"/>

<!-- 运维服务体系 → 各层（绿色虚线） -->
<line x1="X1" y1="Y1" x2="X2" y2="Y2" stroke="#2A9D8F" stroke-width="1" stroke-dasharray="6,4" stroke-opacity="0.5"/>
```

**★新建标记：**
```svg
<rect x="X" y="Y" width="W" height="H" rx="8" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.5"/>
<text x="CX" y="CY-4" fill="#1E293B" font-size="10" font-weight="500" text-anchor="middle">名称 ★新建</text>
<text x="CX" y="CY+8" fill="#F59E0B" font-size="8" font-weight="600" text-anchor="middle">NEW</text>
```

### 层叠顺序

1. 浅色背景填充
2. 侧栏容器（左侧红色 + 右侧绿色）
3. 侧栏虚线连接到各层
4. 主层容器（从上到下，带阴影和高光）
5. 子区域分组容器
6. 层级间连接箭头
7. 子模块白色卡片
8. 所有文字标签
9. 底部标准规范条
10. 图例
11. 总标题块

### 间距规则

- 主层容器高度：100-160px（根据内容）
- 主层间距：20px（含箭头空间）
- 子模块尺寸：80-100px 宽 × 32-36px 高
- 子模块间距：8-10px（水平），8px（垂直）
- 侧栏宽度：140-160px
- 侧栏与主区域间距：20px
- 区域边界内边距：16px
- 底部基座高度：50-60px
- viewBox：所有内容 + 40px padding

### 中英文支持

中文标签使用 `font-family: 'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', 'Inter', sans-serif`。中英文双语标注时，中文在上、英文在下用斜体，字号差 2-3px。

### PPT 兼容性规则（强制）

生成 SVG 时**必须**遵循以下规则，确保在 Microsoft PowerPoint 中正确渲染并支持「转换为形状」：

#### 禁止使用的特性

| 禁止 | 原因 | 替代方案 |
|------|------|----------|
| `rgba(r,g,b,a)` | PPT 不识别 CSS rgba 语法 | `fill="#RRGGBB" fill-opacity="0.xx"` 或 `stroke="#RRGGBB" stroke-opacity="0.xx"` |
| `<filter>` / `feDropShadow` | PPT 完全不支持 SVG 滤镜 | 用偏移矩形模拟阴影：`<rect x+1 y+2 ... fill="#000000" fill-opacity="0.08"/>` |
| `<marker>` / `marker-end` | PPT 转换为形状时丢弃 marker | 用 `<line>` + `<polygon>` 显式画箭头（见下方示例） |
| `@import url(...)` | PPT 无法加载外部资源 | 只用 `font-family` 声明本地字体栈 |
| `opacity` (元素级) | 会影响整个元素包括子内容 | 用 `fill-opacity` / `stroke-opacity` 分别控制 |

#### 渐变安全写法

```svg
<!-- validate:ignore-block-start -->
<!-- ✅ 正确：显式声明 gradientUnits -->
<linearGradient id="grad-layer1" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
  <stop offset="0%" stop-color="#0F4C81"/>
  <stop offset="100%" stop-color="#1E6BB8"/>
</linearGradient>

<!-- ❌ 错误：缺少 gradientUnits -->
<linearGradient id="grad-layer1" x1="0" y1="0" x2="0" y2="1">
<!-- validate:ignore-block-end -->
```

#### 半透明填充安全写法

```svg
<!-- validate:ignore-block-start -->
<!-- ✅ 正确：hex + fill-opacity -->
<rect x="212" y="100" width="380" height="140" rx="8" fill="#FFFFFF" fill-opacity="0.12" stroke="#FFFFFF" stroke-opacity="0.35"/>

<!-- ❌ 错误：rgba() -->
<rect x="212" y="100" width="380" height="140" rx="8" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)"/>
<!-- validate:ignore-block-end -->
```

#### 阴影模拟

```svg
<!-- validate:ignore-block-start -->
<!-- ✅ 正确：偏移矩形模拟阴影，放在主元素前面 -->
<rect x="201" y="69" width="800" height="185" rx="14" fill="#000000" fill-opacity="0.08"/>
<rect x="200" y="66" width="800" height="185" rx="14" fill="url(#grad-layer1)"/>

<!-- ❌ 错误：filter -->
<rect x="200" y="66" width="800" height="185" rx="14" fill="url(#grad-layer1)" filter="url(#shadow)"/>
<!-- validate:ignore-block-end -->
```

#### 字体安全写法

```svg
<!-- validate:ignore-block-start -->
<!-- ✅ 正确：本地字体栈，不依赖网络 -->
<style>
  text { font-family: 'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', 'Inter', sans-serif; }
</style>

<!-- ❌ 错误：@import 外部字体 -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=...');
  text { font-family: 'Inter', 'Noto Sans SC', ...; }
</style>
<!-- validate:ignore-block-end -->
```

#### 箭头安全写法

```svg
<!-- validate:ignore-block-start -->
<!-- ✅ 正确：显式 line + polygon，PPT 转为形状后保留箭头 -->
<!-- 向下箭头：从 (600,253) 到 (600,275) -->
<line x1="600" y1="253" x2="600" y2="266" stroke="#1E6BB8" stroke-width="1.5"/>
<polygon points="594,264 600,275 606,264" fill="#1E6BB8"/>

<!-- ❌ 错误：marker 在 PPT 转为形状时被丢弃，箭头变直线 -->
<marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
  <polygon points="0 0, 10 3.5, 0 7" fill="#1E6BB8"/>
</marker>
<line x1="600" y1="253" x2="600" y2="275" stroke="#1E6BB8" stroke-width="1.5" marker-end="url(#arrow)"/>
<!-- validate:ignore-block-end -->
```

**向下箭头公式**（从 `(cx, y1)` 到 `(cx, y2)`）：
- 线段：`<line x1="cx" y1="y1" x2="cx" y2="y2-9" .../>`
- 三角：`<polygon points="cx-6,y2-11 cx,y2 cx+6,y2-11" fill="color"/>`

## 适用场景

- 政务信息化项目架构图
- 企业级平台技术架构图
- 正式汇报/PPT/文档交付
- 需要商务专业感的架构展示
- 多层分级、双侧支撑的标准架构
