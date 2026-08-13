# swimlane

泳道布局，每个角色/系统占一条泳道，流程步骤在泳道间按顺序流转。适用于**业务流程、时序、责任划分**场景。

## 结构

把画布按角色切成平行的"泳道"(lane)，每个流程步骤放在对应角色的泳道里，步骤之间用箭头连接。箭头跨泳道 = 责任交接。

### 横向泳道（推荐，默认）

泳道纵向堆叠(每条占一行)，流程从左到右推进:

```
       步骤1    步骤2    步骤3    步骤4    步骤5
       ──────→ ──────→ ──────→ ──────→
┌─────┬────────┬────────┬────────┬────────┬────────┐
│ 用户 │  提交   │        │        │        │  收货   │  ← 泳道1
│     │  订单   │        │        │        │  确认   │
├─────┼────────┼────────┼────────┼────────┼────────┤
│ 订单 │        │  校验   │        │  发货   │        │  ← 泳道2
│ 中心 │        │  库存   │        │  通知   │        │
├─────┼────────┼────────┼────────┼────────┼────────┤
│ 仓储 │        │        │  拣货   │        │        │  ← 泳道3
│     │        │        │  打包   │        │        │
└─────┴────────┴────────┴────────┴────────┴────────┘
       步骤1    步骤2    步骤3    步骤4    步骤5
```

### 纵向泳道（垂直版，适合移动端阅读 / 长流程 / 步骤多角色少）

泳道横向排列（每个角色占一列），流程从上往下推进：

```
     角色A      角色B      角色C
   ┌───────┐ ┌───────┐ ┌───────┐
   │       │ │       │ │       │
   │ 步骤1  │ │       │ │       │  ← 步骤1
   │  ↓    │ │       │ │       │
   │       │ │ 步骤2  │ │       │  ← 步骤2(跨道)
   │       │ │  ↓    │ │       │
   │       │ │       │ │ 步骤3  │  ← 步骤3(跨道)
   │       │ │       │ │  ↓    │
   │       │ │ 步骤4  │ │       │  ← 步骤4(跨道回来)
   │       │ │  ↓    │ │       │
   │ 步骤5  │ │       │ │       │  ← 步骤5(跨道)
   │  ↓    │ │       │ │       │
   │       │ │       │ │ 步骤6  │  ← 步骤6(跨道)
   │       │ │       │ │       │
   └───────┘ └───────┘ └───────┘
       ↓         ↓         ↓
```

#### 何时选纵向而非横向

| 选纵向 | 选横向 |
|--------|--------|
| 步骤多(>6)、角色少(2-4) | 角色多(>4)、步骤少 |
| 移动端 / 竖屏阅读 | PC / 横屏阅读 |
| 长生命周期流程(审批链) | 短流程(单次请求) |
| 嵌入窄长容器(侧栏、文档栏) | 嵌入宽容器(PPT、横版报告) |

**经验**：横向是默认；当横向画出来太宽(列数 × 列宽 > 1600)或要在手机/竖版文档里展示时，转纵向。

## 与其他布局的区别

| 维度 | layered-stack | flow-pipeline | hub-spoke | swimlane |
|------|---------------|---------------|-----------|----------|
| 核心问题 | 谁依赖谁 | 数据怎么流 | 谁连到中心 | **谁负责哪一步** |
| 维度 | 1 维(层) | 1 维(阶段) | 2 维(中心+辐射) | **2 维(角色 × 步骤)** |
| 箭头含义 | 依赖 | 流向 | 交互 | **流程顺序 + 责任交接** |

## 典型场景

| 场景 | 泳道角色 |
|------|----------|
| 电商下单 | 用户 / 订单中心 / 仓储 / 支付 |
| 贷款审批 | 申请人 / 风控 / 信贷员 / 放款 |
| DevOps 流程 | 开发 / 代码评审 / CI / CD / 监控 |
| 工单流转 | 提交人 / 一线 / 二线 / 审核 |

## 关键参数

### 横向泳道

| 元素 | 尺寸 | 说明 |
|------|------|------|
| 泳道标题列宽 | 130-160px | 最左侧角色名 |
| 泳道高度 | 100-140px | 单条泳道纵向占位 |
| 步骤列宽 | 160-200px | 每个步骤的横向占位 |
| 步骤框尺寸 | 列宽-20 × 泳道高-30 | 框四周留 10px |
| 步骤间距(横向) | = 步骤列宽 | 步骤按列对齐 |
| 同道箭头 | 水平 | 同一泳道内的步骤流转 |
| 跨道箭头 | 折线(L 形) | 跳到另一泳道 |

### 纵向泳道

| 元素 | 尺寸 | 说明 |
|------|------|------|
| 泳道标题行高 | 40-50px | 顶部角色名横条 |
| 泳道宽度 | 180-220px | 单条泳道横向占位 |
| 步骤行高 | 100-130px | 每个步骤的纵向占位 |
| 步骤框尺寸 | 泳道宽-30 × 行高-25 | 框四周留 12-15px |
| 步骤间距(纵向) | = 步骤行高 | 步骤按行对齐 |
| 同道箭头 | 垂直向下 | 同一泳道内的步骤流转 |
| 跨道箭头 | 折线(L 形) | 跳到另一泳道，先水平后垂直 |

#### 步骤网格(纵向核心)

每个步骤在二维网格上有确定位置：

```
设：
  laneTitleH = 44      泳道标题行高
  stepRowH   = 120      步骤行高
  laneW      = 200      泳道宽
  leftX      = 30       左 padding
  topY       = 60       顶部标题区起点

第 j 条泳道(从 0 开始)：
  laneX_j = leftX + j * laneW
  泳道中心 x = laneX_j + laneW/2

第 i 个步骤行(从 0 开始)：
  stepY_i = topY + laneTitleH + i * stepRowH
  步骤框中心 y = stepY_i + stepRowH/2
```

步骤框尺寸：宽 `laneW − 30`、高 `stepRowH − 25`。
步骤框左上角：`(laneX_j + 15, stepY_i + 12)`。

#### 泳道容器(纵向)

```svg
<!-- 顶部泳道标题行 -->
<rect x="leftX" y="topY" width="totalW" height="laneTitleH" fill="HEADER_FILL"/>
<text x="laneX_j+laneW/2" y="topY+laneTitleH/2+4" font-size="12" font-weight="700" fill="HEADER_TEXT" text-anchor="middle">角色 j</text>

<!-- 泳道 j 主体(从标题行下到底部) -->
<rect x="laneX_j" y="topY+laneTitleH" width="laneW" height="stepsH" fill="LANE_FILL" fill-opacity="0.04"/>
<!-- 泳道纵向分隔线 -->
<line x1="laneX_j+laneW" y1="topY" x2="laneX_j+laneW" y2="topY+laneTitleH+stepsH" stroke="STROKE" stroke-width="0.5" stroke-opacity="0.3"/>
<!-- 步骤行横向分隔线(可选，辅助对齐) -->
<line x1="leftX" y1="stepY_i" x2="leftX+totalW" y2="stepY_i" stroke="STROKE" stroke-width="0.5" stroke-opacity="0.2" stroke-dasharray="3,3"/>
```

#### 箭头(纵向，PPT 安全，禁用 `<marker>`)

> ⚠️ **强制:终点 y2 必须是【目标节点框的顶边】,不是框中心!**
>
> 步骤框高 H,中心 cy,则 **框顶 = cy − H/2,框底 = cy + H/2**。
> 箭头起点 y1 用源框**底**,终点 y2 用目标框**顶**。
> 如果误把 y2 写成框中心 cy,三角会伸入框内,被白色框覆盖 → **用户看不到箭头**。
>
> 这是纵向泳道最常犯的错。务必用框边坐标。

**同泳道内流转(垂直向下)** 从源框底 `(cx, y1)` 到目标框顶 `(cx, y2)`：

```svg
<!-- y1 = 源框底 (cy源 + H/2),  y2 = 目标框顶 (cy目标 - H/2) -->
<line x1="cx" y1="y1" x2="cx" y2="y2-9" stroke="ARROW" stroke-width="1.5"/>
<polygon points="cx-6,y2-11 cx,y2 cx+6,y2-11" fill="ARROW"/>
```

**跨泳道流转(折线 L 形)** 从泳道 A 的步骤到泳道 B 的步骤，先水平后垂直：

```svg
<!-- 从 (x1, y1) 折到 (x2, y2)，先水平到目标列再垂直向下 -->
<path d="M x1,y1 L x2,y1 L x2,y2-9" fill="none" stroke="ARROW" stroke-width="1.5"/>
<polygon points="x2-6,y2-11 x2,y2 x2+6,y2-11" fill="ARROW"/>
```

**反向回退(虚线，向上)** `(cx, y1)→(cx, y2)` 且 y2 < y1：

```svg
<line x1="cx" y1="y1" x2="cx" y2="y2+9" stroke="WARN" stroke-width="1.5" stroke-dasharray="5,4"/>
<polygon points="cx-6,y2+11 cx,y2 cx+6,y2+11" fill="WARN"/>
```

#### viewBox 计算(纵向)

```
totalW = laneCount * laneW + leftPadding(30) + rightPadding(20)
totalH = topPadding(60) + laneTitleH + stepCount * stepRowH + bottomPadding(30) + caption(如有，40)

viewBox = "0 0 totalW totalH"
```

## 步骤网格(横向泳道核心)

每个步骤在**二维网格**上有确定位置：

```
设：
  laneTitleW = 150     泳道标题列宽
  stepColW   = 180      步骤列宽
  laneH      = 120      泳道高
  topY       = 60       顶部步骤号区起点
  leftX      = 20       左 padding

第 i 条泳道(从 0 开始)：
  laneY_i = topY + i * laneH
  泳道中心 y = laneY_i + laneH/2

第 j 个步骤列(从 0 开始)：
  stepX_j = leftX + laneTitleW + j * stepColW
  步骤框中心 x = stepX_j + stepColW/2
```

步骤框尺寸：宽 `stepColW − 20`、高 `laneH − 30`。
步骤框左上角：`(stepX_j + 10, laneY_i + 15)`。

## 泳道容器

每条泳道用半透明色块区分，相邻泳道交替深浅：

```svg
<!-- 泳道 i (偶数，浅) -->
<rect x="leftX" y="laneY_i" width="totalW" height="laneH" fill="#FFFFFF" fill-opacity="0.04"/>
<!-- 泳道 i+1 (奇数，略深) -->
<rect x="leftX" y="laneY_i+1" width="totalW" height="laneH" fill="#FFFFFF" fill-opacity="0.08"/>
<!-- 泳道分隔线 -->
<line x1="leftX" y1="laneY_i+laneH" x2="leftX+totalW" y2="laneY_i+laneH" stroke="#STROKE" stroke-width="0.5" stroke-opacity="0.3"/>
<!-- 泳道标题列背景 -->
<rect x="leftX" y="laneY_i" width="laneTitleW" height="laneH" fill="LANE_COLOR" fill-opacity="0.3"/>
<!-- 泳道标题(垂直居中) -->
<text x="leftX+laneTitleW/2" y="laneY_i+laneH/2+4" font-size="12" font-weight="700" fill="LANE_TEXT" text-anchor="middle">角色名</text>
```

> 交替深浅要明显但不刺眼：偶数 `fill-opacity="0.04"`，奇数 `fill-opacity="0.08"`。

## 节点类型（流程图元素）

流程图不只是"方框 + 箭头"。复杂流程需要不同的**节点形状**表达不同语义（开始/结束、判断、汇聚、并行）。所有形状 PPT 安全（polygon/ellipse/rect，无 marker/filter）。

⚠️ **每种节点的连接点都用【形状边缘】**，不是中心。菱形连顶点/左/右，椭圆连上下切点，胶囊连圆弧端。详见下文每种节点的"连接点"说明。

### 1. 步骤框（Activity，矩形）— 最常用

普通任务/活动。圆角矩形 + 编号 + 名称 + 描述。

```svg
<!-- 步骤框 (中心 cx, cy, 160×90) -->
<rect x="cx-80" y="cy-45" width="160" height="90" rx="8" fill="STEP_FILL" stroke="STEP_STROKE" stroke-width="1.5"/>
<circle cx="cx-65" cy="cy-30" r="10" fill="STEP_STROKE"/>
<text x="cx-65" y="cy-26" font-size="10" font-weight="700" fill="white" text-anchor="middle">1</text>
<text x="cx" y="cy-2" font-size="11" font-weight="600" fill="TEXT" text-anchor="middle">步骤名称</text>
<text x="cx" y="cy+16" font-size="9" fill="SUBTEXT" text-anchor="middle">简短说明</text>
```

**连接点**：上下左右边中点（cx, cy±45）、（cx±80, cy）。

### 2. 开始/结束节点（Event，胶囊形）

标志流程的起点和终点。**胶囊形（pill）**：两端半圆，用 `<rect rx="H/2">` 实现（rx 等于高度一半即为胶囊）。

```svg
<!-- 开始节点 (中心 cx, cy, 120×44) — 绿色系 -->
<rect x="cx-60" y="cy-22" width="120" height="44" rx="22" fill="#2ecc71" stroke="#27ae60" stroke-width="1.5"/>
<text x="cx" y="cy+4" font-size="12" font-weight="700" fill="white" text-anchor="middle">开始 · Start</text>

<!-- 结束节点 (中心 cx, cy, 120×44) — 灰色或红色系 -->
<rect x="cx-60" y="cy-22" width="120" height="44" rx="22" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>
<text x="cx" y="cy+4" font-size="12" font-weight="700" fill="white" text-anchor="middle">结束 · End</text>
```

- **rx = 高度/2**（如高 44 → rx=22）才能形成标准胶囊。rx 太小就是普通圆角矩形
- 颜色：开始用绿（`#2ecc71`），结束用灰（`#94a3b8`）或红（`#e53935`），跟步骤框区分
- 尺寸比步骤框小（120×44），不写编号
- **连接点**：胶囊是水平横躺的，进出线一般走上下（cx, cy±22）

### 3. 决策菱形（Gateway XOR，互斥判断）⭐ 核心

流程的"分岔口"，表示一个判断，输出多条互斥分支（是/否，或多选一）。

```svg
<!-- 决策菱形 (中心 cx, cy, 100×80) -->
<polygon points="cx,cy-40 cx+50,cy cx,cy+40 cx-50,cy" fill="#FFFFFF" stroke="#f9a825" stroke-width="1.8"/>
<text x="cx" y="cy+4" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">通过？</text>
```

- **形状**：菱形 polygon，4 个顶点 `(cx, cy±H/2)` 和 `(cx±W/2, cy)`
- **尺寸**：比步骤框小（如 100×80），里面只放一个判断短句（"通过？""金额<50？"）
- **颜色**：用警示色（amber 橙 `#f9a825`）描边 + 白底，视觉上跟普通步骤区分，提醒"这里是判断点"
- **出线条件标注**：从菱形引出的每条线，在起点附近标注条件：

```svg
<!-- 菱形 → 是分支（右出） -->
<text x="cx+58" y="cy-4" font-size="9" font-weight="700" fill="#2ecc71">是</text>
<!-- 菱形 → 否分支（下出） -->
<text x="cx+8" y="cy+50" font-size="9" font-weight="700" fill="#e53935">否</text>
```

- **连接点**：4 个顶点。上顶点 `(cx, cy-H/2)` 通常是入线，左/右/下顶点 `(cx±W/2, cy)`、`(cx, cy+H/2)` 是出线
- ⚠️ 菱形的入线箭头终点 = 上顶点 `(cx, cy-H/2)`，**不是中心**！否则三角扎进菱形被遮挡

### 4. 汇聚节点（Merge，小圆点）

多条分支汇合成一条（多进一出）。与菱形相反：菱形是"一进多出"（分流），圆点是"多进一出"（合流）。

```svg
<!-- 汇聚圆点 (中心 cx, cy, r=8) -->
<circle cx="cx" cy="cy" r="8" fill="#64748b" stroke="#FFFFFF" stroke-width="2"/>
```

- **形状**：实心小圆（r=6-8），比步骤框小很多
- **语义**：纯合流，不做判断。多条入线指向它，一条出线离开
- **颜色**：中性灰 `#64748b`
- **连接点**：圆周。入线从上方/侧面进，出线从下方出
- ⚠️ 入线箭头终点 = 圆周（不是圆心）。从上方进，终点 `(cx, cy-r-?)`... 实际上箭头指向圆边缘 `(cx, cy-r)`，三角顶点在那里
- **何时用**：退款流程里"仅退款"和"退货退款"两条路最终都到"财务退款"，用圆点汇聚后再连到财务框，避免两条线直接打架

### 5. 并行网关（Gateway AND，菱形 + ∧）

表示"同时执行所有分支"（AND-split）或"等待所有分支完成"（AND-join）。

```svg
<!-- 并行网关 (中心 cx, cy, 100×80) — 菱形带 ∧ 符号 -->
<polygon points="cx,cy-40 cx+50,cy cx,cy+40 cx-50,cy" fill="#FFFFFF" stroke="#42a5f5" stroke-width="1.8"/>
<text x="cx" y="cy+8" font-size="22" font-weight="700" fill="#42a5f5" text-anchor="middle">∧</text>
```

- **形状**：菱形 + 中间一个大号 `∧`（AND-split）或 `×`（XOR，与决策菱形区分）
- **颜色**：蓝色 `#42a5f5` 描边，区别于决策菱形（橙）
- **语义**：AND-split 后所有分支并行；AND-join 要等所有分支到齐才继续
- **连接点**：同决策菱形（4 顶点）
- **何时用**：退款同时触发"通知买家"+"财务对账"两个并行动作；或多个前置任务都完成后才进入下一步

### 6. 循环回环（连接规则，非新节点）

驳回/重试/补件——流程回到前面的步骤。不是新形状，而是**专门的连线画法**。

```svg
<!-- 回环虚线：从步骤 A 绕外侧回到步骤 B，避开中间节点 -->
<!-- 关键：走左/右边缘外（x 在所有节点框之外），垂直长距离，标注回环原因 -->
<path d="M x1,y1 L outerX,y1 L outerX,y2 L x2,y2" 
      fill="none" stroke="#e53935" stroke-width="1.5" stroke-dasharray="6,4"/>
<polygon points="..." fill="#e53935"/>
<text x="outerX+8" y="midY" font-size="9" fill="#e53935" font-style="italic">驳回 · 重试</text>
```

**回环路径规则**（防乱）：
1. **走泳道外框【内】的空白列，不是外框外的 viewBox 边缘**：`outerX` 必须在所有节点框之外，但**仍在包围所有泳道的外框矩形之内**。⚠️ 常见错误：把 outerX 写成外框左/右边界之外的值（如外框左边 x=30，却写 x=25）→ 线溢出边框。正确：找出某条泳道内的空白列（节点框之间的间隙）走线。
2. **垂直长距离**：回环本质是"向上/向下跨多行"，垂直段要直，不要斜
3. **虚线 + 警示色**：用红色虚线 `stroke-dasharray="6,4"` 区别于主流程实线
4. **必标原因**：线上写"驳回/重试/补件"，否则读者不知道为什么回头
5. **多条绕行线分走两侧**：当一个图有多条需要绕行的线（如"决策=是"绕行线 + 回环），**必须分走左/右两侧，每侧最多一条**，不能挤在同一侧空白列。否则两条平行竖线只差几像素，糊成一团，视觉上像"虚线莫名其妙冒出来"。
6. **与节点框保持 ≥15px 间距**：绕行线不要贴着菱形/矩形边缘走，否则看起来像从节点身上长出来的。

> 这两条规则来自真实 bug：①绕行线走到外框外（溢出边框）②两条绕行线挤同一侧（视觉糊成一团）。validate-svg.ts 的"路径溢出外框"检测会机器兜底规则 1。

## 顶部步骤号条(可选但推荐)

横向泳道顶部加一条"步骤序号 + 简称"横条，让流程顺序一目了然：

```svg
<!-- 顶部条 -->
<rect x="leftX+laneTitleW" y="topY-40" width="stepsW" height="32" rx="6" fill="#HEADER_FILL"/>
<!-- 每列标题 -->
<text x="stepCX_j" y="topY-20" font-size="11" font-weight="700" fill="HEADER_TEXT" text-anchor="middle">
  ① 步骤名
</text>
```

## 箭头类型(PPT 安全，禁用 `<marker>`)

> ⚠️ **强制:箭头起止点必须用【节点框的边缘】,不是框中心!**
>
> 横向泳道:水平箭头起点 x1 = 源框**右边**,终点 x2 = 目标框**左边**。
> 跨道折线终点 y2 = 目标框**顶边或底边**(看箭头朝向)。
> 如果误用框中心坐标,三角会伸入框内被白色框覆盖 → **用户看不到箭头**。
> 这是泳道图最常犯的错,务必用框边坐标。
>
> 框边算法:框宽 W、中心 cx → 左边 = `cx − W/2`,右边 = `cx + W/2`;
> 框高 H、中心 cy → 顶 = `cy − H/2`,底 = `cy + H/2`。

### 同泳道内流转(水平)

从步骤 A 右边到步骤 B 左边，水平向右：

```svg
<line x1="x1" y1="cy" x2="x2-9" y2="cy" stroke="ARROW" stroke-width="1.5"/>
<polygon points="x2-11,cy-6 x2,cy x2-11,cy+6" fill="ARROW"/>
```

### 跨泳道流转(折线 L 形)

从一个泳道的步骤到另一个泳道的步骤，用两段折线 + 终点三角：

```svg
<!-- 从 (x1, y1) 折到 (x2, y2)，先水平后垂直 -->
<path d="M x1,y1 L midX,y1 L midX,y2-9" fill="none" stroke="ARROW" stroke-width="1.5"/>
<polygon points="midX-6,y2-11 midX,y2 midX+6,y2-11" fill="ARROW"/>
```

> 折点 midX 取 `(x1 + x2) / 2`，或取目标步骤框左边/右边 x。

### 反向回退(虚线)

流程有时会回退(如审批驳回)，用虚线 + 反向三角：

```svg
<line x1="x1" y1="cy" x2="x2+9" y2="cy" stroke="WARN" stroke-width="1.5" stroke-dasharray="5,4"/>
<polygon points="x2+11,cy-6 x2,cy x2+11,cy+6" fill="WARN"/>
```

### 分叉(一对多)

一个步骤触发多个后续步骤，从起点向多个终点画折线：

```svg
<!-- 从 (x1, y1) 分叉到 (x2a, y2a) 和 (x2b, y2b) -->
<path d="M x1,y1 L midX,y1 L midX,y2a L x2a-9,y2a" fill="none" stroke="ARROW" stroke-width="1.5"/>
<polygon points="x2a-11,y2a-6 x2a,y2a x2a-11,y2a+6" fill="ARROW"/>
<!-- 同理画到 (x2b, y2b) -->
```

## viewBox 计算(横向)

```
totalW = laneTitleW + stepCount * stepColW + rightPadding(20)
totalH = topY(顶部步骤条，60) + laneCount * laneH + bottomPadding(30) + 图例(如有，40)

viewBox = "0 0 totalW totalH"
```

## 跨道连接路由建议

1. **优先直角折线**：跨道箭头用水平+垂直两段，不要斜线
2. **折点错开**：多条折线共用一列时，折点 x 错开 5-10px 避免重叠
3. **同列只画一道**：同一对起止点之间只画一条线，不要重复
4. **回退显式标注**：用虚线 + 红色 + "驳回/回退"文字标签

## 最佳实践

1. **泳道数 ≤ 5**：再多就拆图(纵向只能画 3-4 条)
2. **步骤数 ≤ 8**：再多横向溢出，考虑拆子流程
3. **角色名简洁**：泳道标题 ≤ 4 字，副标题英文 ≤ 12 字符
4. **步骤框统一尺寸**：同图所有步骤框大小一致
5. **箭头方向严格遵循时序**：左→右为主，回退用虚线明确标注
6. **步骤编号**：左上角小圆带数字，帮助阅读顺序
7. **交替底色要克制**：泳道区分靠位置和分隔线，底色只是辅助
