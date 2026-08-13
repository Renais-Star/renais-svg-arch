# Architecture: 电商技术架构 (E-commerce Platform)

## Layout

- 类型:layered-stack(上下分层)
- 层数:5 层 + 双侧栏(左:安全保障 / 右:运维监控)+ 底部基座(标准规范)
- 风格:dark-tech

## Layers (top to bottom)

### Layer 1: 用户接入层 (Access Layer)
- Web App (Web 端):PC 网页商城
- Mobile App (移动端):iOS/Android App
- Mini Program (小程序):微信/支付宝小程序
- H5 Store (H5 商城):营销/分享落地页
- Open API (开放 API):供第三方/ISV 接入

### Layer 2: 接入网关层 (Gateway Layer) — 单模块横跨
- API Gateway (API 网关):路由、限流、鉴权、协议转换
- Load Balancer (负载均衡):多机房流量调度
- WAF (Web 应用防火墙):防注入/防 CC

### Layer 3: 业务服务层 (Business Service Layer)
- User Svc (用户服务):注册/登录/会员
- Product Svc (商品服务):SPU/SKU/搜索
- Order Svc (订单服务):下单/履约
- Payment Svc (支付服务):微信/支付宝/银联
- Coupon Svc (营销服务):优惠券/促销
- Inventory Svc (库存服务):扣减/预占

### Layer 4: 中间件层 (Middleware Layer) — 单模块横跨
- Message Queue (消息队列):异步解耦/RocketMQ
- Distributed Cache (分布式缓存):Redis Cluster
- Search Engine (搜索引擎):Elasticsearch
- Job Scheduler (任务调度):XXL-Job

### Layer 5: 数据存储层 (Data Storage Layer)
- MySQL Cluster (关系型数据库):订单/用户/商品主数据
- MongoDB (文档数据库):商品详情/评价
- Object Storage (对象存储):图片/视频/OSS
- ClickHouse (分析型数据库):埋点/报表

## Side Columns

### Left: 安全保障体系 (Security)
- 身份认证 (IAM)
- 数据加密 (Encryption)
- 风控反欺诈 (Risk Control)
- 审计日志 (Audit)

### Right: 运维监控体系 (Operations)
- 链路追踪 (Tracing)
- 指标监控 (Metrics)
- 日志聚合 (Logging)
- 告警通知 (Alerting)

### Bottom: 标准规范体系 (Standards)
- 数据规范 (Data Spec)
- 接口规范 (API Spec)
- 安全规范 (Security Spec)
- 部署规范 (Deploy Spec)

## Relationships

- 用户接入层 → 接入网关层:HTTPS 请求下行
- 接入网关层 → 业务服务层:RPC 调用
- 业务服务层 ↔ 中间件层:缓存读写 / 消息收发 / 全文检索
- 中间件层 → 数据存储层:持久化
- 安全保障体系 → 所有层:横切(虚线连接)
- 运维监控体系 → 所有层:横切(虚线连接)
- 标准规范体系 → 所有层:底部基座
