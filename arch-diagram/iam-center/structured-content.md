# Architecture: 统一身份认证中心 (IAM Center)

## Layout

- 类型:hub-spoke(中心辐射)
- 风格:civic-blue(政务商务蓝)
- 图标:启用

## Hub (中心)

- **IAM 中心 (Identity & Access Management)**:统一身份认证、权限管理、令牌签发

## Spokes (外围,8 个,围绕中心辐射)

顺时针从正上方开始:

1. **用户目录 (User Directory)** — 上 — LDAP/AD,组织架构与账号源
2. **SSO 门户 (SSO Portal)** — 右上 — 单点登录,统一登录入口
3. **业务系统 A (ERP)** — 右 — 企业资源计划
4. **业务系统 B (CRM)** — 右下 — 客户关系管理
5. **业务系统 C (OA)** — 下 — 办公自动化
6. **业务系统 D (BI)** — 左下 — 数据报表
7. **审计日志 (Audit Log)** — 左 — 操作留痕
8. **风控引擎 (Risk Engine)** — 左上 — 异常登录检测

## Relationships

- 用户目录 → IAM:账号同步(单向)
- IAM ↔ SSO 门户:双向(令牌签发 / 会话校验)
- IAM → 各业务系统(ERP/CRM/OA/BI):单向,签发 token 下发
- IAM → 审计日志:单向,操作上报
- 风控引擎 ↔ IAM:双向(风险评估 / 策略同步)

## 关键能力

- SSO 单点登录:一次登录,全系统通行
- RBAC 角色权限:基于角色的访问控制
- MFA 多因子认证:短信/OTP/生物识别
- 风险自适应:异常登录触发二次认证
