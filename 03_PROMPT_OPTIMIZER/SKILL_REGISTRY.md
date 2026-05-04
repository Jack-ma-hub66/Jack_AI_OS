# SKILL_REGISTRY.md — 工具与 Skill 完整清单

> 每次启动任何工具前必须读取。
> 执行 Prompt 相关任务前必须先查阅。
> 新增 Skill 由 Codex 自动追加，格式保持一致。

---

## 已注册工具

### Claude Chat
- 用途：需求整理、任务拆解、Prompt 优化、架构评估、方案层争议
- 限制：无法直接读本地文件，依赖 CONTEXT_PACK 注入

### Claude Code
- 用途：项目生产代码执行、本地文件读写、git 操作、状态文件维护
- 能力：完整本地文件系统访问、终端执行、git

### Codex
- 用途：技术审查、AI OS 运维杂活、文件整理、归档维护、验证报告
- 限制：不执行项目生产代码，不自我最终验证

### Chrome MCP / Browser
- 用途：前端 UI 验证、localhost 测试、浏览器交互验证
- 必须使用场景：任何涉及浏览器、前端、UI 的验证任务

---

## Prompt Optimizer

- 位置：`~/Jack_AI_OS/03_PROMPT_OPTIMIZER/prompt-optimizer/`
- 状态：**待 Jack 迁入本地文件**（见 README.md）
- Claude Project Instructions 作只读副本
- 用途：任务编译器，将含糊需求转化为结构化任务理解
- 触发规则：见 `02_TOOL_SYSTEM/TOOL_RULES.md`
- 子 Skill 列表：**待 Jack 补充**

---

## 自定义 Skill 列表

<!-- Codex 自动追加，格式：

### [Skill 名称]
- 位置：[路径]
- 用途：[一句话]
- 调用方式：[具体指令或文件引用]
- 新增时间：
- 新增原因：
-->

---

## 追加规范（Codex 维护）

新增 Skill 追加到本文件末尾，必须包含：位置、用途、调用方式、新增时间、新增原因。
