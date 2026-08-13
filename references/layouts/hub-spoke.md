# hub-spoke

中心辐射布局，适用于**以一个核心组件为中心，多个外围组件与之交互**的场景。

## 结构

一个中心节点（Hub）放在画布正中，N 个外围节点（Spoke）围绕在四周，每个 Spoke 与 Hub 用连线（单向或双向）相连。

```
        ┌──────────┐
        │  Client  │
        └─────┬────┘
              │
   ┌──────────┼──────────┐
   │          │          │
┌──┴───┐  ┌──┴───┐  ┌───┴──┐
│ Auth │◀▶│ Core │─▶│ Data │
└──────┘  │ Hub  │  └──────┘
          └──┬───┘
   ┌──────────┼──────────┐
   │          │          │
┌──┴───┐  ┌──┴───┐
│ Log  │  │Monitr│
└──────┘  └──────┘
```

## 适用场景

| 场景 | Hub | Spokes |
|------|-----|--------|
| API 网关中心 | API Gateway | 各微服务 |
| 事件驱动 / 消息总线 | Message Bus | Producer / Consumer |
| 搜索引擎 | Search Engine | 数据源、索引器、查询端 |
| 身份认证中心 | IAM / SSO | 各业务系统 |
| 微服务 API 聚合 | BFF / Aggregator | 下游服务 |

## 与其他布局的区别

| 维度 | layered-stack | flow-pipeline | hub-spoke |
|------|---------------|---------------|-----------|
| 拓扑 | 树（层级） | 链（线性） | 星（辐射） |
| 关系 | 依赖 | 流向 | 交互（多对一） |
| 适合 | 平台架构 | 数据管道 | 中心化系统 |

## 核心几何：极坐标定位 Spoke

**所有 Spoke 围绕 Hub 均匀分布**，用极坐标算位置：

```
设：
  cx, cy     = 中心 Hub 的中心坐标
  R          = 辐射半径（Hub 中心到 Spoke 中心的距离）
  n          = Spoke 总数
  i          = Spoke 序号 (0, 1, 2, ..., n-1)
  startAngle = 起始角度（度），默认 -90°（正上方）

则第 i 个 Spoke 的中心坐标：
  angle = startAngle + (360 / n) * i        （度）
  rad   = angle * π / 180                    （弧度）
  x_i   = cx + R * cos(rad)
  y_i   = cy + R * sin(rad)
```

### 预算好的常用坐标（R=1，cx=cy=0）

| n | 角度分布 | 坐标（x, y）|
|---|---------|------------|
| 3 | -90°, 30°, 150° | (0,-1), (0.87,0.5), (-0.87,0.5) |
| 4 | -90°, 0°, 90°, 180° | (0,-1), (1,0), (0,1), (-1,0) |
| 5 | -90° 起，每 72° | (0,-1), (0.95,-0.31), (0.59,0.81), (-0.59,0.81), (-0.95,-0.31) |
| 6 | -90° 起，每 60° | (0,-1), (0.87,-0.5), (0.87,0.5), (0,1), (-0.87,0.5), (-0.87,-0.5) |
| 8 | -90° 起，每 45° | (0,-1), (0.71,-0.71), (1,0), (0.71,0.71), (0,1), (-0.71,0.71), (-1,0), (-0.71,-0.71) |

**乘以实际 R 后加 (cx, cy) 偏移即得 Spoke 中心。**

## 尺寸规则

| 元素 | 尺寸 | 说明 |
|------|------|------|
| Hub（中心） | 160×80 ~ 200×100 | 比 Spoke 大 30-50%，突出中心地位 |
| Spoke（外围） | 110×60 ~ 140×70 | 统一尺寸，保持对称 |
| 辐射半径 R | ≥ Spoke 宽 + 80px | 确保箭头有足够空间 |
| Hub 中心到画布边 | ≥ R + Spoke 半高 + 30px padding | 防止溢出 |

**经验值**：
- 3-4 个 Spoke：R = 220-260
- 5-6 个 Spoke：R = 280-320
- 7-8 个 Spoke：R = 340-400

## 连线（PPT 安全写法，禁用 `<marker>`）

### Hub → Spoke（单向，Hub 发起）

从 Hub 边缘到 Spoke 边缘，**不要画到中心点**（会被节点遮挡）。

```svg
<!-- 从 (x1,y1) 到 (x2,y2)，箭头在 Spoke 端 -->
<!-- 缩短两端各 25px，避免覆盖节点 -->
<line x1="x1" y1="y1" x2="x2-9" y2="y2" stroke="#fb923c" stroke-width="1.5"/>
<polygon points="x2-11,y2-6 x2,y2 x2-11,y2+6" fill="#fb923c"/>
```

> 注：辐射连线通常不是水平/垂直，三角的角度要跟着线段方向。
> 简化做法：**三角固定朝右**（视觉上能看出方向即可），或用 4 个三角模板（朝右、朝左、朝上、朝下）按象限选。

### Hub ↔ Spoke（双向交互）

两端各一个三角：

```svg
<line x1="x1+11" y1="y1" x2="x2-11" y2="y2" stroke="#fb923c" stroke-width="1.5"/>
<polygon points="x1+11,y1 x1,y1-6 x1,y1+6" fill="#fb923c"/>
<polygon points="x2-11,y2 x2,y2-6 x2,y2+6" fill="#fb923c"/>
```

### 朝向不同方向的箭头三角模板

根据 Spoke 相对 Hub 的象限，选对应方向的三角：

| Spoke 位置 | 三角朝向 | polygon 模板（终点 (x2,y2)） |
|-----------|---------|----------------------------|
| 上方 | 朝上 | `points="x2-6,y2+11 x2,y2 x2+6,y2+11"` |
| 下方 | 朝下 | `points="x2-6,y2-11 x2,y2 x2+6,y2-11"` |
| 左方 | 朝左 | `points="x2+11,y2-6 x2,y2 x2+11,y2+6"` |
| 右方 | 朝右 | `points="x2-11,y2-6 x2,y2 x2-11,y2+6"` |
| 右上 | 朝右上 | 近似朝右，视觉可接受 |
| 左下 | 朝左下 | 近似朝左，视觉可接受 |

### 计算连线端点（避免穿入节点）

为了不让连线穿入 Hub 或 Spoke 内部，端点要在节点边缘上：

```
设：
  Hub 中心 (cx, cy)，Hub 半宽 hw、半高 hh
  Spoke 中心 (sx, sy)，Spoke 半宽 sw、半高 sh
  dx = sx - cx, dy = sy - cy

Hub 边缘点（沿 dx/dy 方向出边）：
  缩放因子 t_hub = min(hw/|dx|, hh/|dy|)
  hub_edge = (cx + dx * t_hub, cy + dy * t_hub)

Spoke 边缘点（沿 -dx/-dy 方向入边）：
  t_spoke = min(sw/|dx|, sh/|dy|)
  spoke_edge = (sx - dx * t_spoke, sy - dy * t_spoke)
```

> 简化：如果不想算，直接把两端各缩短固定值（如 50px），视觉上接近。精确做法见上。

## 节点样式

Hub 用强调色 + 加粗描边，Spoke 用次级色。

### ⚠️ 居中公式（强制，防止图标/文字偏移）

复合节点（图标 + 多行文字）必须按下式居中，**不要凭直觉填坐标**：

```
节点中心 (sx, sy)，框尺寸 W×H

图标（24×24 viewBox，外层 scale=s）：
  实占像素 = 24 × s
  水平居中：transform 的 x = sx − (24 × s) / 2
  垂直顶点：transform 的 y = sy − 内容总高/2 + 上留白
            （经验：文字 3 行时 y ≈ sy − 32；2 行时 y ≈ sy − 32）

文字（text-anchor="middle"，x 固定 = sx）：
  baseline 从图标底部往下排，行间距经验值：
    标题 11px：baseline = sy − 2
    副标题 9px：baseline = sy + 12
    描述  8px：baseline = sy + 24
  （只有 2 行时：标题 = sy − 2，副标题 = sy + 12，去掉描述）
```

**反例**（常见错误）：图标 `transform` 的 x 写成"框左 + 小常数"（如 `translate(sx-68, ...)`）——
这是水平不居中的根因。必须用 `sx − (24×s)/2`。

### Hub 模板（中心，强调，220×110）

```svg
<!-- 阴影（civic-blue 风格用，dark/light 不用） -->
<rect x="cx-110+1" y="cy-55+3" width="220" height="110" rx="14" fill="#000000" fill-opacity="0.08"/>
<!-- 主体 -->
<rect x="cx-110" y="cy-55" width="220" height="110" rx="14" fill="HUB_FILL"/>
<!-- 图标（scale 1.3，居中） -->
<g transform="translate(cx-15.6,cy-45) scale(1.3)" color="ICON_COLOR">
  <!-- 图标 path -->
</g>
<text x="cx" y="cy-5" font-size="15" font-weight="700" fill="white" text-anchor="middle">核心服务名</text>
<text x="cx" y="cy+12" font-size="10" fill="white" fill-opacity="0.85" text-anchor="middle">Core Hub</text>
<text x="cx" y="cy+26" font-size="8" fill="white" fill-opacity="0.7" text-anchor="middle">简短描述</text>
```

### Spoke 模板（外围，160×80）

```svg
<rect x="sx-80" y="sy-40" width="160" height="80" rx="8" fill="SPOKE_FILL" stroke="SPOKE_STROKE" stroke-width="1.5"/>
<!-- 图标（scale 0.8，水平居中：x = sx - 9.6） -->
<g transform="translate(sx-9.6,sy-32) scale(0.8)" color="ICON_COLOR">
  <!-- 图标 path -->
</g>
<!-- 3 行版 -->
<text x="sx" y="sy-2" font-size="11" font-weight="600" fill="white" text-anchor="middle">节点名</text>
<text x="sx" y="sy+12" font-size="9" fill="white" fill-opacity="0.85" text-anchor="middle">English Name</text>
<text x="sx" y="sy+24" font-size="8" fill="white" fill-opacity="0.7" text-anchor="middle">描述</text>
```

2 行版（无描述）：删掉第 3 行，标题/副标题位置不变。

## viewBox 计算

```
viewBox = "0 0 [W] [H]"

正方形画布（推荐，对称）：
  margin = 30px
  W = H = 2 * (R + max(Spoke 半宽, Spoke 半高)) + 2 * margin

非正方形（Spoke 数量少时省空间）：
  按实际 Spoke 坐标的 min/max + margin 算
```

## 变体

### 双层 Hub（Hub + Sub-hub）

适合大型系统，一个主 Hub 下挂多个二级 Hub，每个二级 Hub 再辐射：

```
        Main Hub
       /    |    \
    Sub1  Sub2  Sub3
    / \    |     \
  S1  S2  S3    S4
```

- Sub-hub 用中等强调色
- 主连线（Main→Sub）比子连线（Sub→Spoke）粗一档

### 半圆辐射（适合 Hub 在边缘）

Hub 放在画布左侧或下方，Spoke 只在半圆内分布：

```
Hub ────  Spoke1
  \   ── Spoke2
   \ ── Spoke3
    \── Spoke4
```

- 起始角度和分布角度按可用扇区算
- 适合"对外暴露的网关 + 内部服务"

## 最佳实践

1. **Spoke ≤ 8**：再多视觉太挤，考虑双层 Hub 或换 layered-stack
2. **Hub 突出**：比 Spoke 大、色更深、字更粗
3. **连线简洁**：所有连线统一颜色/线宽，方向用三角表示
4. **对称优先**：Spoke 均匀分布，不要手动微调位置破坏对称
5. **箭头朝向**：辐射连线斜向时，三角用最近的主方向（上/下/左/右），视觉上可接受
6. **避免交叉**：如果 Spoke 之间也要连线，建议改用 layered-stack 或加区域分组
