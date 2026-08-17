# renais-svg-arch · AI 生成可编辑 SVG 架构图 / 流程图（Microsoft PowerPoint 可编辑）

> 为**产品经理、售前 / 解决方案专家**打造：用 AI 对话生成专业**技术架构图、系统架构图、云架构图、数据流程图、业务流程图、泳道图**，输出纯 SVG，可直接粘进 **PowerPoint** 并**转换为可编辑形状**继续修改。几分钟把方案梳理成能见客户的配图。

**English**: An AI-powered skill (works with ZCode / Claude Code / Codex / WorkBuddy) that generates professional **SVG architecture diagrams, flowcharts, and swimlane diagrams** via conversation. Output is pure SVG, **PowerPoint-compatible**, and can be converted to editable Office shapes. Supports layered architecture, data pipeline, hub-spoke, and swimlane layouts in 4 visual styles.

一个 AI 编码工具 skill（兼容 **ZCode / Claude Code / Codex / 腾讯 WorkBuddy / CodeBuddy**）：**输入架构描述（文字 / Markdown / 文档），输出可直接粘进 PPT 并继续编辑的专业 SVG 架构图。** 纯 SVG 代码生成，不依赖外部 API。

最大的特点不是"画得好看"，而是**画出来的 SVG 在 PowerPoint 里能转换为可编辑形状**——不是一张死图，每个模块、每根线、每个字都能在 PPT 里继续改。

---

## 🔍 关键词 / Keywords

> 以下关键词供搜索检索用。

**中文**：SVG 架构图 · 技术架构图 · 系统架构图 · 云架构图 · 分层架构 · 数据流程图 · 业务流程图 · 泳道图 · 时序图 · 流程图生成 · AI 画架构图 · 自动生成架构图 · PowerPoint 架构图 · SVG 转形状 · 可编辑架构图 · PPT 矢量图 · 微服务架构图 · 数据中台架构 · SaaS 架构图 · 政务架构图 · 投标方案图 · Office 形状 · ZCode skill · Claude Code skill · Codex · 腾讯 WorkBuddy · CodeBuddy · AI agent

**English**: SVG architecture diagram · technical architecture · system architecture · cloud architecture · layered diagram · data pipeline · flowchart · swimlane · sequence diagram · AI diagram generator · PowerPoint SVG · convert SVG to shape · editable diagram · vector diagram for PPT · microservices architecture · data platform · SaaS architecture · Office shapes · ZCode skill · Claude Code skill · Codex · WorkBuddy · CodeBuddy · AI agent · agent skills

---

## 🎯 为产品 & 售前岗位打造

> **把脑子里的方案，几分钟变成能见客户的专业配图。** 不用学 Visio / Figma / draw.io，对话描述需求即可，画完直接进 PPT，见客户时还能现场改。

### 产品经理 / PM
- 写 PRD、产品方案时，快速产出产品架构图、功能模块图、业务流程图
- 向上汇报产品全貌、横向对齐研发 / 设计的功能边界
- 把脑中的产品想法立刻可视化，不用等设计师排期

### 售前 / 解决方案专家
- **客户拜访前临场出图**：下午要见客户，中午把方案架构梳理成专业配图
- 投标文档、项目申报书里的技术架构图
- **见客户时现场调整**：客户说"能不能加个数据中台"，当场在 PPT 里改给他看
- 同一套方案秒切风格：政府 / 国企客户出政务蓝版，互联网客户出科技风版

### 为什么适合这两个岗位
- ⚡ **零画图门槛**：对话式生成，不用打开专业工具，几分钟出图
- ✏️ **现场可改**：图进 PPT 转形状后，客户提意见当场调，不用回去重画再约下次
- 🎨 **多风格适配客户**：一套描述换 4 种视觉，匹配不同客户气质
- 📋 **架构 + 流程都能画**：技术架构、数据流程、业务审批、SOP 全覆盖

---

## 它能做什么

| 维度 | 能力 |
|------|------|
| **4 种风格** | dark-tech（暗色科技）/ light-tech（亮色清爽）/ civic-blue（政务商务）/ minimal-mono（黑白论文）|
| **4 种布局** | layered-stack（分层）/ flow-pipeline（流水线）/ hub-spoke（中心辐射）/ swimlane（泳道，支持横向+纵向）|
| **图标库** | 20 个高频架构图标（数据库 / 服务器 / 云 / 网关 / 缓存 / 队列 / 锁 / 监控 …）|
| **流程图元素** | 矩形步骤 / 菱形决策 / 椭圆起止 / 圆点汇聚 / 并行网关 / 回环虚线 |
| **引导式提问** | 根据输入完整度走 3 种模式（空白 / 模糊 / 详细），逐步问清需求，不会一上来就要一大段描述 |
| **流程细节追问** | 画流程图时主动追问判断分支 / 异常回退 / 阈值 / 起止，避免只画出"快乐路径"主线 |
| **PPT 兼容校验** | 内置校验脚本，生成后自动检查禁用特性 + 几何遮挡 + 线条溢出，不通过不交付 |

**组合能力**：4 风格 × 4 布局 = 16 种组合，覆盖绝大多数架构图场景。

---

## 📸 示例效果

以下示例均由本 skill 对话生成，通过 `validate-svg.ts` 校验，可直接粘进 PowerPoint 转形状编辑。SVG 源文件见 `arch-diagram/` 对应目录。

### 架构图

**电商技术架构** · `layered-stack`（分层）+ `dark-tech`（暗色科技）
<p><img src="arch-diagram/ecommerce-platform/diagram@1.5x.png" width="640" alt="电商技术架构"></p>

**实时数据管道** · `flow-pipeline`（流水线）+ `light-tech`（亮色清爽）
<p><img src="arch-diagram/realtime-data-pipeline/diagram@1.3x.png" width="640" alt="实时数据管道"></p>

**统一身份认证中心** · `hub-spoke`（中心辐射）+ `civic-blue`（政务商务）
<p><img src="arch-diagram/iam-center/diagram@1.3x.png" width="520" alt="统一身份认证中心"></p>

### 流程图（swimlane 泳道）

> 💡 **流程图不只是"快乐路径"主线**。本 skill 画流程图时会主动追问判断分支、异常回退、阈值、起止，把完整业务逻辑都画出来：
> - **菱形决策节点**（是/否分流、条件判断）
> - **异常回退**（驳回重试、补材料的回环虚线）
> - **多结束状态**（成功完成 / 失败终止 / 超时关闭）
> - **并行与汇聚**（同时进行的分支与合流）
>
> 这得益于 skill 的流程细节追问机制——你说"退款流程"，它会问清"风控不过怎么办""小额是不是不用退货"。

**海外电商退款流程** · 纵向泳道 + `light-tech`，含菱形决策、回环虚线、多结束状态
<p><img src="arch-diagram/overseas-refund/diagram.png" width="360" alt="海外退款流程"></p>

**SaaS 注册流程** · 纵向泳道 + `light-tech`，含查重拦截、验证码重试锁定、异常结束
<p><img src="arch-diagram/saas-signup/diagram.png" width="340" alt="SaaS注册流程"></p>

---

## 适用场景

- **toB / 商务汇报**：方案汇报、客户演示、投标文档、售前材料、商业计划书、项目申报书（用 civic-blue 显专业）
- **toC / 产品运营**：产品介绍、运营物料、对外宣发、App 上架截图、官网配图（用 dark-tech / light-tech 显科技感）
- **技术文档 / 内部协作**：技术评审、架构文档、设计说明、API 文档、专利附图、论文配图、白皮书（用 minimal-mono 显严谨）
- **数据 & 流程**：数据中台架构、ETL 数据管道、微服务拓扑、业务审批流程、工单流转、SOP 标准作业流程
- **嵌入 PPT 后微调**：转成形状后改文字、换配色、调位置，再发给客户或领导

> 核心价值：**生成 → 放进 PPT → 转形状 → 继续编辑**，全程不脱离 Office，交付物是"可二改的形状"，不是"死图片"。


---

## ★ 在 PPT 中转换为可编辑形状

这是本 skill 区别于普通画图工具的关键。生成的 SVG 放进 PowerPoint 后，能转换成原生 Office 形状，每个元素都可独立编辑。

### 操作步骤

**第 1 步：插入 SVG**
打开 PPT →「插入」→「图片」→ 选择生成的 `.svg` 文件。

![插入 SVG](arch-diagram/ppt-shapes/1-insert-svg.png)

**第 2 步：转换为形状**
选中图片 → 右键 →「**转换为形状**」(Convert to Shape)。PPT 会弹出确认框"是否转换为 Microsoft Office 绘图对象？"，点「是」。

![转换为形状](arch-diagram/ppt-shapes/2-convert-to-shape.png)

**第 3 步：变为可编辑状态**
转换完成后，SVG 变成由多个子形状组成的组合。可以双击任意模块改文字、换颜色、调整大小；右键「组合 → 取消组合」可拆开逐个编辑。

![可编辑状态](arch-diagram/ppt-shapes/3-editable.png)

### 为什么能做到

本 skill 生成 SVG 时**严格回避了 PPT 不支持的特性**（不用 `<marker>` 箭头、不用 `<filter>` 阴影、不用 `rgba()`、不用 `@import` 外部字体），全部用 PPT 能识别为形状的写法（显式 `<line>`+`<polygon>` 画箭头、偏移矩形模拟阴影、本地字体栈）。所以转换后形状不丢失、不错位。内置校验脚本会强制保证这一点。

### ⚠️ 流程图（泳道）在 PPT 中编辑难度较大

**分层架构 / 流水线 / 中心辐射**这三种布局，形状数量适中（5-15 个模块），转形状后在 PPT 里微调文字、配色、位置很方便。

但**泳道流程图**元素多（动辄 10+ 步骤 + 多个菱形决策 + 椭圆起止 + 连接线 + 图标 + 回环虚线），转换后形状数量大，在 PPT 里逐个手动调整（比如加一个步骤、改一个分支）非常费劲，还容易把连接线挪乱。

**建议**：
- 微调（改文字、换颜色）→ 在 PPT 里直接做
- **结构调整（加减步骤、改分支、改流程）→ 回到对话里重新描述需求，让 skill 重新生成**，比在 PPT 里硬改高效得多

---

## 优点

1. **PPT 可编辑**：转形状后每个元素可独立改，不是死图——这是最大卖点
2. **纯 SVG、零依赖**：生成的是文本代码，不依赖任何外部服务/API，可版本管理
3. **PPT 兼容有机器保证**：校验脚本拦在交付前，不会出现"粘进 PPT 箭头消失/阴影没了"的问题
4. **引导式交互**：不懂技术的人也能用，提问分模式、给选项，不用自己组织架构描述
5. **流程图会主动追问细节**：不只画主线，会把判断分支、异常路径、阈值问出来，图更完整
6. **多风格多布局**：一套描述能出不同视觉，适配商务/科技/论文等不同场合
7. **几何错误有兜底**：箭头遮挡、线条溢出这类"语法对但视觉错"的 bug，有专门的几何检测抓

## 不足

1. **复杂流程图 PPT 编辑难**：如上所述，泳道图元素多，转形状后手改费劲，建议对话重生成
2. **视觉效果有限**：为了 PPT 兼容，放弃了渐变阴影、发光、模糊等高级效果，视觉不如 Figma/Sketch 炫
3. **纯静态**：无交互、无动画、无悬停，只适合文档/演示，不适合做可交互原型
4. **需要 bun 环境**：校验脚本和 PNG 导出依赖 bun + sharp，纯生成 SVG 不需要
5. **图标库有限**：目前 20 个，遇到特殊组件（如 K8s pod、特定云服务）可能没有对应图标
6. **自动布局非完美**：复杂图（多回环、多跨道）偶尔仍会出现线条贴近、需要微调，校验能抓大部分但不保证 100%
7. **不支持从图片反向重画**：目前只能从文字描述生成，不能丢一张现有架构图截图让它重画

---

## 快速开始

本 skill 由一组文档（`SKILL.md` + `references/`）和脚本（`scripts/`）组成，核心是**让 AI 读取规范后按流程生成 SVG**——这套机制在主流 AI 编码工具上都能用。根据你用的工具选一种安装方式：

### ZCode

把本目录放到 ZCode 的 skills 路径下，直接对话：

```
画个架构图
```

### Claude Code

本 skill 的结构（`SKILL.md` 带 YAML frontmatter + `references/` 渐进式披露）与 Claude Code 的 Agent Skills 格式一致。clone 到 Claude 的 skills 目录即可自动加载：

```bash
# 个人级（所有项目可用）
git clone https://github.com/Renais-Star/renais-svg-arch.git ~/.claude/skills/renais-svg-arch

# 或项目级（仅当前项目）
git clone https://github.com/Renais-Star/renais-svg-arch.git .claude/skills/renais-svg-arch
```

加载后直接对话："画个架构图"，Claude 会按 `SKILL.md` 流程引导。

### Codex（OpenAI Codex CLI）

Codex 通过项目根目录的 `AGENTS.md` 加载指令。本仓库已附带 [`AGENTS.md`](AGENTS.md)（指向 `SKILL.md`），clone 后在仓库目录内启动 Codex 即可自动识别：

```bash
git clone https://github.com/Renais-Star/renais-svg-arch.git
cd renais-svg-arch
codex   # Codex 会自动读取 AGENTS.md
```

或者在任意 Codex 对话里手动引用：`@SKILL.md 画个架构图`。

### WorkBuddy / CodeBuddy（腾讯）

本 skill 采用 Agent Skills 标准格式（`SKILL.md` + `references/` + `scripts/`），与 WorkBuddy / CodeBuddy 的技能体系同源，可直接导入：

- **WorkBuddy（网页端）**：技能市场 → 「上传技能」→ 导入本仓库目录（如需打包，压缩为 zip 上传），系统自动配置后即可对话使用
- **CodeBuddy（IDE）**：clone 到项目 `.codebuddy/skills/renais-svg-arch/`，或在设置管理页点「导入 Skill」

> 校验脚本（`validate-svg.ts`）依赖 bun 运行环境；若运行环境无 bun，生成 SVG 的核心流程不受影响，仅跳过自动校验。

### 通用

无论哪个平台，AI 都会引导你选布局、给内容、选风格，然后生成 SVG。更具体的流程见 [`SKILL.md`](SKILL.md)。

> ⚠️ 校验脚本（`validate-svg.ts`）和 PNG 导出（`svg2png.ts`）需要 [bun](https://bun.sh/) 运行环境；纯生成 SVG 不依赖任何运行时。

### 校验 & 导出 PNG（可选）

```bash
# 校验 SVG 的 PPT 兼容性（生成后必做）
bun scripts/validate-svg.ts arch-diagram/{你的图}/diagram.svg

# 导出 PNG（仅当需要图片格式时）
bun scripts/svg2png.ts arch-diagram/{你的图}/diagram.svg --scale 2 --output diagram@2x.png
```

---

## 文件结构

```
renais-svg-arch/
├── README.md                           # 本文件
├── SKILL.md                            # Skill 主流程（AI 读取）
├── references/                         # 设计规范 & 方法论
│   ├── styles/                         # 4 种视觉风格
│   │   ├── dark-tech.md
│   │   ├── light-tech.md
│   │   ├── civic-blue.md
│   │   └── minimal-mono.md
│   ├── layouts/                        # 4 种布局
│   │   ├── layered-stack.md
│   │   ├── flow-pipeline.md
│   │   ├── hub-spoke.md
│   │   └── swimlane.md                 # 含 6 种流程图节点形状
│   ├── icons.md                        # 20 个图标库
│   ├── structuring.md                  # 从自由文本抽取结构的方法
│   ├── interaction.md                  # 引导式提问闭环（3 模式）
│   ├── flow-detail.md                  # 流程图细节追问方法
│   └── svg/architecture.md             # 通用布局算法
├── scripts/
│   ├── validate-svg.ts                 # PPT 兼容 + 几何校验
│   └── svg2png.ts                      # SVG → PNG
└── arch-diagram/                       # 示例输出
    ├── ecommerce-platform/             # 分层架构 + 暗色科技
    ├── realtime-data-pipeline/         # 流水线 + 亮色
    ├── iam-center/                     # 中心辐射 + 政务蓝
    ├── order-flow/                     # 横向泳道 + 黑白论文
    ├── loan-approval/                  # 纵向泳道 + 亮色
    ├── overseas-refund/                # 退款流程（含菱形/回环）
    ├── saas-signup/                    # 注册流程（含多结束状态）
    ├── icon-preview/                   # 图标库预览
    └── ppt-shapes/                     # PPT 编辑步骤截图
```

---

## 技术依赖

- **生成 SVG**：无依赖，AI 直接写 SVG 代码
- **校验脚本**：[bun](https://bun.sh/)（运行 validate-svg.ts）
- **PNG 导出**：bun + [sharp](https://sharp.pixelplumbing.com/)

## License

MIT
