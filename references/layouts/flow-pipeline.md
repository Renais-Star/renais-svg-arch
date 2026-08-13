# flow-pipeline

左右流水线布局，适用于数据管道、请求流、ETL、CI/CD 这类**有方向、有先后**的架构。

## 结构

从左到右分列，每列代表一个处理阶段，列内可垂直堆叠多个同类组件，列间用水平箭头表示数据/请求流向。

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Source   │───▶│ Ingest   │───▶│ Process  │───▶│  Sink    │
│  数据源   │    │ 接入层    │    │ 处理层    │    │ 存储层    │
├──────────┤    ├──────────┤    ├──────────┤    ├──────────┤
│ • Kafka  │    │ • Flink  │    │ • Spark  │    │ • MySQL  │
│ • File   │    │ • Flume  │    │ • Flink  │    │ • Hive   │
│ • API    │    │ • Beats  │    │ • Python │    │ • Click  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

## 与 layered-stack 的区别

| 维度 | layered-stack | flow-pipeline |
|------|---------------|---------------|
| 方向 | 上 → 下 | 左 → 右 |
| 语义 | 分层依赖（上层依赖下层） | 流向（上游流向下游） |
| 列/行 | 横向铺开同层模块 | **纵向**堆叠同阶段组件 |
| 典型 | 云架构、技术栈 | 数据管道、请求流、CI/CD |
| 箭头方向 | 向下 | 向右 |

## 典型阶段（数据管道）

| 阶段 | 英文 | 典型内容 |
|------|------|----------|
| 数据源 | Source | 业务库 Binlog、日志文件、API、IoT |
| 接入 | Ingest | Kafka、Flume、Beats、Filebeat |
| 处理 | Process | Flink、Spark、Python Job |
| 存储 | Storage | Hive、ClickHouse、HDFS、S3 |
| 应用 | Application | BI 报表、API 服务、推荐系统 |

## 列数

- **最少**：2 列（简化流）
- **典型**：3-5 列（标准管道）
- **最多**：6 列（再宽建议换行或拆图）

## 间距规则

| 元素 | 间距 | 说明 |
|------|------|------|
| 列间距 | 90-120px | 列与列之间的水平距离（含箭头空间） |
| 组件间距 | 30-40px | 同列组件之间的垂直距离 |
| 列内边距 | 16px | 列容器内四周留白 |
| 箭头空间 | 列间距 - 20px | 箭头水平占用，两侧各留 10px |

## 列布局

### 标准列（单阶段，多组件堆叠）

```
┌─────────────┐
│  阶段标题    │   ← 列标题（顶部或左上角）
├─────────────┤
│  ┌───────┐  │
│  │ Comp1 │  │   ← 组件 1
│  └───────┘  │
│  ┌───────┐  │
│  │ Comp2 │  │   ← 组件 2
│  └───────┘  │
└─────────────┘
```

- 列宽：固定（建议 180-220px，按最宽组件 + padding）
- 列高：自适应内容（组件数 × 组件高 + 间距 + padding）

### 单组件整列（横跨型）

适用于网关、消息总线这类单一中间节点：

```
┌──────────────────┐
│  Message Bus     │
│  (Kafka)         │
└──────────────────┘
```

## 箭头类型（PPT 安全写法，禁用 `<marker>`）

### 标准向右箭头 `(x1, cy)→(x2, cy)`

线段到终点前 9px，三角顶点对齐终点：

```svg
<line x1="x1" y1="cy" x2="x2-9" y2="cy" stroke="#fb923c" stroke-width="1.5"/>
<polygon points="x2-11,cy-6 x2,cy x2-11,cy+6" fill="#fb923c"/>
```

公式：
- 线段 `x2_attr = 终点-9`
- 三角 `points="终点-11,cy-6 终点,cy 终点-11,cy+6"`

### 多入一出 / 一出多入

当多组件汇入下一列单个组件（或反过来），用 **L 形折线**（`<path>`）+ 终点三角：

```svg
<!-- 从 (x1, y1) 折到 (x2, y2)，水平到中点再垂直 -->
<path d="M x1,y1 L midX,y1 L midX,y2 L x2-9,y2" fill="none" stroke="#fb923c" stroke-width="1.5"/>
<polygon points="x2-11,y2-6 x2,y2 x2-11,y2+6" fill="#fb923c"/>
```

### 双向数据流 `(x1, cy)↔(x2, cy)`

两端各一个三角：

```svg
<line x1="x1+11" y1="cy" x2="x2-11" y2="cy" stroke="#fb923c" stroke-width="1.5"/>
<polygon points="x1+11,cy x1,cy-6 x1,cy+6" fill="#fb923c"/>
<polygon points="x2-11,cy x2,cy-6 x2,cy+6" fill="#fb923c"/>
```

### 带标签的箭头

标签盒放在线段中点，**写在箭头之后**（保证不被三角遮挡）：

```svg
<line x1="x1" y1="cy" x2="x2-9" y2="cy" stroke="#fb923c" stroke-width="1.5"/>
<polygon points="x2-11,cy-6 x2,cy x2-11,cy+6" fill="#fb923c"/>
<rect x="midX-18" y="cy-9" width="36" height="16" rx="3" fill="#0f172a"/>
<text x="midX" y="cy+2" font-size="8" text-anchor="middle" fill="#94a3b8">stream</text>
```

## 顶部条带 / 底部说明

### 顶部阶段标题条（可选）

横跨整图顶部，标注各阶段名：

```svg
<rect x="0" y="0" width="W" height="28" fill="#1e293b"/>
<text x="col1CX" y="18" font-size="11" font-weight="600" fill="#22d3ee" text-anchor="middle">SOURCE</text>
<text x="col2CX" y="18" font-size="11" font-weight="600" fill="#34d399" text-anchor="middle">PROCESS</text>
```

### 底部数据流标注（可选）

```svg
<text x="W/2" y="H-12" font-size="10" fill="#94a3b8" text-anchor="middle">
  数据流方向：左 → 右  |  延迟 < 5s  |  吞吐 10万 TPS
</text>
```

## 列容器样式

每列用半透明色块表示，颜色按阶段区分：

```svg
<!-- 列容器 -->
<rect x="X" y="Y" width="200" height="H" rx="10" fill="FILL" fill-opacity="0.3" stroke="STROKE" stroke-width="1.5"/>
<!-- 列标题（左上角） -->
<text x="X+12" y="Y+18" font-size="11" font-weight="700" fill="STROKE">阶段名 · Stage</text>
```

## viewBox 计算

```
viewBox = "0 0 [total-width] [total-height]"

total-width = 左右 padding (60px)
            + 所有列宽之和
            + 所有列间距之和

total-height = 上下 padding (60px)
             + 顶部标题条高度（如有，28px）
             + max(各列高度)
             + 底部说明高度（如有，24px）
```

## 多泳道变体

如果管道有多条并行流（如实时流 + 离线流），用横向泳道：

```
实时流 │ Source ─▶ Stream Proc ─▶ Realtime Sink
       │
离线流 │ Source ─▶ Batch Proc   ─▶ Batch Sink
```

- 泳道之间用淡分隔线（`stroke-opacity="0.3"`）
- 每个泳道左侧标注流类型
- 共用阶段的列在视觉上对齐

## 最佳实践

1. **流向清晰**：永远从左到右，不要反向画
2. **阶段 ≤ 5**：再多就拆图或合并
3. **同列同类**：一列内的组件应该是同一阶段的等价物
4. **颜色分阶段**：每个阶段用不同色系，但同列内颜色统一
5. **箭头要少**：列间箭头表示主流向，不要画每个组件到下个组件的连线（太乱）
6. **双语规范**：中文为主，英文辅助
