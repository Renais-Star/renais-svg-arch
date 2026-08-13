# Architecture: 实时数据管道 (Real-time Data Pipeline)

## Layout

- 类型:flow-pipeline(左→右流水线)
- 阶段数:5 列
- 风格:light-tech(白底)
- 图标:启用

## Stages (left to right)

### Stage 1: 数据源 (Source)
- MySQL Binlog (业务库变更)
- Kafka Log (应用日志)
- IoT Sensor (设备上报)
- API Webhook (第三方回调)

### Stage 2: 接入采集 (Ingest)
- Filebeat (日志采集)
- Flume (事件聚合)
- MQTT Broker (IoT 接入)

### Stage 3: 消息总线 (Message Bus) — 单组件整列
- Kafka Cluster (高吞吐消息队列,3 broker,分区并行)

### Stage 4: 流处理 (Stream Process)
- Flink (实时计算 ETL)
- Python Job (规则引擎)
- Enrichment (维度关联)

### Stage 5: 落地应用 (Sink & Serve)
- ClickHouse (OLAP 分析)
- Redis (实时大盘)
- Alert Service (告警)
- BI Report (报表)

## Relationships

- 数据源 → 接入采集:多源并发采集
- 接入采集 → 消息总线:统一汇入 Kafka
- 消息总线 → 流处理:订阅消费
- 流处理 → 落地应用:多路分发(写库/缓存/告警/报表)

## 注解

- 端到端延迟 < 5 秒
- 峰值吞吐 10 万 TPS
- 数据流方向:左 → 右
