# AGENTS.md

本仓库是一个 AI 编码工具 skill：**用对话生成可编辑的 SVG 架构图 / 流程图**（PowerPoint 可转形状）。

## 给 AI 的指令

当用户要求生成架构图、流程图、系统架构、数据流、泳道图等时，**必须读取并严格遵循 [`SKILL.md`](SKILL.md) 的流程**：

1. 先读 `SKILL.md` 了解完整工作流
2. 按 `SKILL.md` 指引，在需要时读取 `references/` 下的对应文档：
   - `references/interaction.md` — 提问引导（先读）
   - `references/structuring.md` — 结构抽取
   - `references/flow-detail.md` — 流程图细节追问（画流程图时读）
   - `references/styles/{风格}.md` — 选定风格的规范
   - `references/layouts/{布局}.md` — 选定布局的规范
   - `references/icons.md` — 图标库（需要图标时读）
3. 生成 SVG 后，运行校验脚本确认 PPT 兼容性：
   ```bash
   bun scripts/validate-svg.ts arch-diagram/{slug}/diagram.svg
   ```

## 能力概览

- **4 种风格**：dark-tech / light-tech / civic-blue / minimal-mono
- **4 种布局**：layered-stack（分层）/ flow-pipeline（流水线）/ hub-spoke（中心辐射）/ swimlane（泳道）
- **输出**：纯 SVG，PPT/Office 兼容，可在 PowerPoint 中「转换为形状」继续编辑
- **校验**：内置 `scripts/validate-svg.ts` 检查禁用特性 + 几何遮挡 + 线条溢出

详细规范见 `SKILL.md` 与 `references/`，示例输出见 `arch-diagram/`。
