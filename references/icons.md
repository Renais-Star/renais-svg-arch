# Icons · 架构图图标库

20 个高频架构图标，纯 `<path>` 实现，PPT/Office 兼容（禁用 `<symbol>` / `<use>` / `<filter>`）。

## 使用规则（强制）

1. **每个图标都是 24×24 单位**，viewBox 内绘制，原点在 (0,0)
2. **复制整组 `<g>` 内容到目标 SVG**，外层包一个 `<g transform="translate(X,Y) scale(s)">` 来定位/缩放
3. **颜色由调用方控制**：图标内部用 `stroke="currentColor"` 或具体颜色；引用时在外层 `<g>` 上设 `color="#xxx"`（或直接替换 stroke/fill）
4. **不要用 `<use href="#id">`** —— PPT 转形状后会丢引用，必须把 path 实体复制过去
5. **默认 stroke 风格**（线条图标）：`fill="none" stroke="COLOR" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`
6. **缩放建议**：架构图里常用 `scale(0.8)`~`scale(1.0)`（即 19~24px 显示尺寸）

## 引用模板

```svg
<!-- 把图标放在 (X, Y)，缩放 0.9，颜色 cyan -->
<g transform="translate(X,Y) scale(0.9)" color="#22d3ee">
  <!-- 此处粘贴对应图标的 <g> 内容 -->
</g>
```

> 注：`color` 属性配合图标内的 `stroke="currentColor"` / `fill="currentColor"` 生效。
> 若担心目标渲染器不支持 `currentColor`，可直接把图标内 `currentColor` 全局替换为目标颜色。

---

## 图标目录

| # | 名称 | 关键词 | 类型 |
|---|------|--------|------|
| 1 | database | 数据库 | stroke |
| 2 | server | 服务器 | stroke |
| 3 | cloud | 云 | stroke |
| 4 | api-gateway | API 网关 | stroke |
| 5 | cache | 缓存 | stroke |
| 6 | message-queue | 消息队列 | stroke |
| 7 | load-balancer | 负载均衡 | stroke |
| 8 | container | 容器 | stroke |
| 9 | function | 函数/Serverless | stroke |
| 10 | security-lock | 安全锁 | stroke |
| 11 | monitoring | 监控 | stroke |
| 12 | log | 日志 | stroke |
| 13 | user | 用户 | stroke |
| 14 | browser | 浏览器 | stroke |
| 15 | mobile | 手机 | stroke |
| 16 | ai-chip | AI/ML | stroke |
| 17 | storage-disk | 存储 | stroke |
| 18 | network | 网络 | stroke |
| 19 | cdn | CDN | stroke |
| 20 | firewal | 防火墙 | stroke |

---

## 1. database · 数据库

圆柱体，三条横线表示分层。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="5" rx="8" ry="2.5"/>
  <path d="M4,5 L4,19 C4,20.4 7.6,21.5 12,21.5 C16.4,21.5 20,20.4 20,19 L20,5"/>
  <path d="M4,10 C4,11.4 7.6,12.5 12,12.5 C16.4,12.5 20,11.4 20,10"/>
  <path d="M4,15 C4,16.4 7.6,17.5 12,17.5 C16.4,17.5 20,16.4 20,15"/>
</g>
```

## 2. server · 服务器

机箱，两个机架。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="4" width="18" height="7" rx="1.5"/>
  <rect x="3" y="13" width="18" height="7" rx="1.5"/>
  <line x1="6.5" y1="7.5" x2="6.5" y2="7.5"/>
  <circle cx="6.5" cy="7.5" r="0.4" fill="currentColor" stroke="none"/>
  <line x1="10" y1="7.5" x2="14" y2="7.5"/>
  <circle cx="6.5" cy="16.5" r="0.4" fill="currentColor" stroke="none"/>
  <line x1="10" y1="16.5" x2="14" y2="16.5"/>
</g>
```

## 3. cloud · 云

标准云朵轮廓。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7,18 C4.2,18 2,15.8 2,13 C2,10.5 3.8,8.5 6.2,8.1 C7,5.7 9.3,4 12,4 C15.2,4 17.8,6.5 18,9.6 C20.2,10.1 22,12.1 22,14.5 C22,17.5 19.5,20 16.5,20 L7,20 C6.7,20 7.2,18 7,18 Z"/>
</g>
```

## 4. api-gateway · API 网关

门/闸门造型（突出"网关=入口"的语义），中间圆点表示请求转发。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <!-- 左侧入口箭头（细，弱化） -->
  <path d="M2,12 L5,12" stroke-opacity="0.7"/>
  <path d="M4,11 L5,12 L4,13" stroke-opacity="0.7"/>
  <!-- 门框（主体，突出） -->
  <path d="M6,4 L6,20"/>
  <path d="M18,4 L18,20"/>
  <path d="M6,4 L18,4"/>
  <path d="M6,20 L18,20"/>
  <!-- 顶部横梁加粗感（双线） -->
  <path d="M6,7 L18,7"/>
  <!-- 中间请求转发圆点 -->
  <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>
  <!-- 上下通道线 -->
  <line x1="12" y1="8" x2="12" y2="11"/>
  <line x1="12" y1="13" x2="12" y2="16"/>
  <!-- 右侧出口箭头（细，弱化） -->
  <path d="M19,12 L22,12" stroke-opacity="0.7"/>
  <path d="M20,11 L22,12 L20,13" stroke-opacity="0.7"/>
</g>
```

## 5. cache · 缓存

闪电 + 圆角框，表示快速访问。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2.5" y="4" width="19" height="16" rx="2"/>
  <path d="M13,7 L8.5,13 L11.5,13 L10.5,17 L15.5,11 L12.5,11 L13,7 Z" fill="currentColor" stroke="none"/>
</g>
```

## 6. message-queue · 消息队列

三个方框串联，表示队列。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="9" width="5" height="6" rx="0.8"/>
  <rect x="9.5" y="9" width="5" height="6" rx="0.8"/>
  <rect x="17" y="9" width="5" height="6" rx="0.8"/>
  <path d="M7,12 L9.5,12"/>
  <path d="M14.5,12 L17,12"/>
</g>
```

## 7. load-balancer · 负载均衡

一进三出，分发图标。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="5" cy="12" r="2.2"/>
  <circle cx="19" cy="5" r="2"/>
  <circle cx="19" cy="12" r="2"/>
  <circle cx="19" cy="19" r="2"/>
  <path d="M7,12 L11,12"/>
  <path d="M11,12 L17,5"/>
  <path d="M11,12 L17,12"/>
  <path d="M11,12 L17,19"/>
  <circle cx="11" cy="12" r="0.5" fill="currentColor" stroke="none"/>
</g>
```

## 8. container · 容器

立方体（六面体投影），表示 Docker/容器。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12,2.5 L21,7.5 L21,16.5 L12,21.5 L3,16.5 L3,7.5 Z"/>
  <path d="M3,7.5 L12,12.5 L21,7.5"/>
  <path d="M12,12.5 L12,21.5"/>
  <path d="M7.5,5 L16.5,10"/>
</g>
```

## 9. function · 函数 / Serverless

λ（lambda）符号，函数式/Serverless 的经典视觉。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <!-- λ 主体 -->
  <path d="M7,5 L11,13 L16,5"/>
  <path d="M11,13 L16,20"/>
  <path d="M13.5,15.5 L17,20"/>
</g>
```

## 10. security-lock · 安全锁

挂锁。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4.5" y="11" width="15" height="10" rx="2"/>
  <path d="M7.5,11 L7.5,7.5 C7.5,5 9.5,3 12,3 C14.5,3 16.5,5 16.5,7.5 L16.5,11"/>
  <line x1="12" y1="14.5" x2="12" y2="17.5"/>
  <circle cx="12" cy="14.5" r="1.4"/>
</g>
```

## 11. monitoring · 监控

折线图 + 坐标轴。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3,3 L3,20 L21,20"/>
  <path d="M6,16 L10,12 L13,14 L18,7"/>
  <circle cx="10" cy="12" r="0.6" fill="currentColor" stroke="none"/>
  <circle cx="13" cy="14" r="0.6" fill="currentColor" stroke="none"/>
  <circle cx="18" cy="7" r="0.6" fill="currentColor" stroke="none"/>
</g>
```

## 12. log · 日志

文档 + 横线。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5,2.5 L15,2.5 L19,6.5 L19,21.5 L5,21.5 Z"/>
  <path d="M15,2.5 L15,6.5 L19,6.5"/>
  <line x1="8" y1="11" x2="16" y2="11"/>
  <line x1="8" y1="14" x2="16" y2="14"/>
  <line x1="8" y1="17" x2="13" y2="17"/>
</g>
```

## 13. user · 用户

人像。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="8" r="4"/>
  <path d="M4,21 C4,16.5 7.5,13 12,13 C16.5,13 20,16.5 20,21"/>
</g>
```

## 14. browser · 浏览器

窗口 + 地址栏。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2.5" y="4" width="19" height="16" rx="2"/>
  <line x1="2.5" y1="8" x2="21.5" y2="8"/>
  <circle cx="5.5" cy="6" r="0.5" fill="currentColor" stroke="none"/>
  <circle cx="7.5" cy="6" r="0.5" fill="currentColor" stroke="none"/>
  <circle cx="9.5" cy="6" r="0.5" fill="currentColor" stroke="none"/>
  <path d="M6,14 L10,14"/>
  <path d="M6,17 L14,17"/>
</g>
```

## 15. mobile · 手机

竖直手机框。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6.5" y="2.5" width="11" height="19" rx="2"/>
  <line x1="10" y1="18.5" x2="14" y2="18.5"/>
  <line x1="9" y1="5.5" x2="15" y2="5.5" stroke-opacity="0.5"/>
</g>
```

## 16. ai-chip · AI / ML

方形芯片 + 中心神经网络节点。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="6" width="12" height="12" rx="1.5"/>
  <line x1="9" y1="3" x2="9" y2="6"/>
  <line x1="12" y1="3" x2="12" y2="6"/>
  <line x1="15" y1="3" x2="15" y2="6"/>
  <line x1="9" y1="18" x2="9" y2="21"/>
  <line x1="12" y1="18" x2="12" y2="21"/>
  <line x1="15" y1="18" x2="15" y2="21"/>
  <line x1="3" y1="9" x2="6" y2="9"/>
  <line x1="3" y1="12" x2="6" y2="12"/>
  <line x1="3" y1="15" x2="6" y2="15"/>
  <line x1="18" y1="9" x2="21" y2="9"/>
  <line x1="18" y1="12" x2="21" y2="12"/>
  <line x1="18" y1="15" x2="21" y2="15"/>
  <circle cx="10.5" cy="10.5" r="1" fill="currentColor" stroke="none"/>
  <circle cx="13.5" cy="10.5" r="1" fill="currentColor" stroke="none"/>
  <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none"/>
</g>
```

## 17. storage-disk · 存储

磁盘/硬盘。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <circle cx="12" cy="12" r="3"/>
  <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none"/>
  <path d="M16.5,7.5 L14,10"/>
</g>
```

## 18. network · 网络

四个节点互联。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="5" r="2"/>
  <circle cx="5" cy="18" r="2"/>
  <circle cx="19" cy="18" r="2"/>
  <circle cx="12" cy="13" r="1.4" fill="currentColor" stroke="none"/>
  <line x1="12" y1="7" x2="12" y2="11.5"/>
  <line x1="10.5" y1="11" x2="6.5" y2="16"/>
  <line x1="13.5" y1="11" x2="17.5" y2="16"/>
  <line x1="7" y1="18" x2="17" y2="18" stroke-opacity="0.4"/>
</g>
```

## 19. cdn · CDN

地球 + 边缘节点。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <ellipse cx="12" cy="12" rx="4" ry="9"/>
  <line x1="3" y1="12" x2="21" y2="12"/>
  <path d="M5,8 L19,8" stroke-opacity="0.5"/>
  <path d="M5,16 L19,16" stroke-opacity="0.5"/>
  <circle cx="20" cy="5" r="1.2" fill="currentColor" stroke="none"/>
  <circle cx="4" cy="19" r="1.2" fill="currentColor" stroke="none"/>
</g>
```

## 20. firewal · 防火墙

砖墙 + 火焰。

```svg
<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2.5" y="5" width="19" height="14" rx="1"/>
  <line x1="2.5" y1="9.5" x2="21.5" y2="9.5"/>
  <line x1="2.5" y1="14.5" x2="21.5" y2="14.5"/>
  <line x1="8.5" y1="5" x2="8.5" y2="9.5"/>
  <line x1="15.5" y1="5" x2="15.5" y2="9.5"/>
  <line x1="5" y1="9.5" x2="5" y2="14.5"/>
  <line x1="12" y1="9.5" x2="12" y2="14.5"/>
  <line x1="19" y1="9.5" x2="19" y2="14.5"/>
  <line x1="8.5" y1="14.5" x2="8.5" y2="19"/>
  <line x1="15.5" y1="14.5" x2="15.5" y2="19"/>
</g>
```

---

## 配色建议

图标颜色应与所在层 / 模块的描边色一致，保持视觉统一：

| 风格 | 接入层 | 网关层 | 业务层 | 中间件 | 存储层 | 安全 | 运维 |
|------|--------|--------|--------|--------|--------|------|------|
| dark-tech | `#22d3ee` | `#fb923c` | `#34d399` | `#a78bfa` | `#a78bfa` | `#fb7185` | `#34d399` |
| light-tech | `#00acc1` | `#fb923c` | `#2ecc71` | `#7e57c2` | `#7e57c2` | `#e53935` | `#2ecc71` |
| civic-blue | `#1E6BB8` | `#1E6BB8` | `#1E6BB8` | `#1E6BB8` | `#1E6BB8` | `#E63946` | `#2A9D8F` |

## 模块内布局

图标 + 文字有两种标准组合，**按布局选择**：

### 模式 A：图标在左 + 文字左对齐（适合列表式模块，如 layered-stack / flow-pipeline）

```
┌─────────────────────┐
│  [ICON]  模块名      │
│          描述        │
└─────────────────────┘
```

```svg
<!-- 模块盒子 (180×60)，中心 (cx, cy) -->
<rect x="X" y="Y" width="180" height="60" rx="6" fill="FILL" stroke="STROKE" stroke-width="1.5"/>
<!-- 图标，固定在左侧 -->
<g transform="translate(X+12,Y+18) scale(0.9)" color="STROKE">
  <!-- 图标 path -->
</g>
<!-- 文字，左对齐图标右侧 -->
<text x="X+44" y="Y+26" fill="white" font-size="11" font-weight="600">模块名</text>
<text x="X+44" y="Y+42" fill="#94a3b8" font-size="9">描述</text>
```

### 模式 B：图标在上 + 文字居中（适合卡片式节点，如 hub-spoke）

```
┌─────────────────────┐
│       [ICON]        │
│       模块名        │
│       描述          │
└─────────────────────┘
```

```svg
<!-- 模块盒子 (W×H)，中心 (cx, cy) -->
<rect x="cx-W/2" y="cy-H/2" width="W" height="H" rx="8" fill="FILL" stroke="STROKE" stroke-width="1.5"/>
<!-- 图标，水平居中：x = cx - (24*scale)/2 -->
<g transform="translate(cx-9.6,cy-32) scale(0.8)" color="STROKE">
  <!-- 图标 path -->
</g>
<!-- 文字，text-anchor="middle"，x = cx -->
<text x="cx" y="cy-2" font-size="11" font-weight="600" fill="white" text-anchor="middle">模块名</text>
<text x="cx" y="cy+12" font-size="9" fill="#94a3b8" text-anchor="middle">Description</text>
```

⚠️ **居中陷阱**：模式 B 里图标 `transform` 的 x **不要**写"框左 + 常数"，
必须用 `cx − (24 × scale) / 2`（scale=0.8 时即 `cx − 9.6`）。
否则图标会偏左，与居中的文字错位。
