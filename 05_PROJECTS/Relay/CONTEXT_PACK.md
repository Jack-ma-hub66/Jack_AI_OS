# CONTEXT_PACK — Relay · 2026-05-06 02:24
> 自动生成。只包含 confirmed 信息。≤1500 词。
> 直接复制粘贴给任意工具使用。

## 系统身份
# MASTER_PROFILE.md — Jack 个人档案

## 基本信息
- 姓名：Jack
- 地区：台湾
- 工作领域：金融与科技交叉领域
- 工作语言：繁体中文（主要沟通），英文（代码/文档）

## 工作风格
- 顶层思维者，系统性抽象能力强，对本质问题有直觉
- 决策快，跟进细节的耐心有限，需要工具把决策落地到执行层
- 对「开始」的热情远高于对「完成」的执着
  → 每次启动需主动检查：上次说要做的事做了吗？
- 对敷衍零容忍，对真实的对等高度重视


## 当前项目状态
# SESSION_STATE.md — 当前会话状态

> 由 Claude Code / Codex 在每次任务结束后自动覆写。不要手动编辑。

---

最后更新：2026-05（初始化）
更新者：Claude Code
当前项目：无
当前阶段：Jack AI OS v2 初始化完成，待开始第一个项目

## 上次完成

Jack AI OS v2 系统文件全量初始化（目录结构 + 核心文件 + 脚本）。

## 下一步（Next Action）

1. Jack 填写 `01_PERSONAL_MEMORY/MASTER_PROFILE.md`
2. Jack 将 Prompt Optimizer 文件迁入 `03_PROMPT_OPTIMIZER/prompt-optimizer/`
3. Jack 补充 `03_PROMPT_OPTIMIZER/SKILL_REGISTRY.md` 子 Skill 列表
4. 在 GitHub 创建 Private 仓库 `Jack_AI_OS`，本地 git init 并连接
5. 运行 `bash ~/Jack_AI_OS/scripts/new_project.sh [第一个项目名]` 初始化第一个项目

## 阻塞项

无

## 未完成任务

- [ ] MASTER_PROFILE.md 内容待 Jack 填写
- [ ] Prompt Optimizer 子 Skill 待登记
- [ ] GitHub 远程仓库待连接

## 项目背景
# Relay — 项目入口

> 工具读取后必须知道：项目是什么、当前阶段、必读文件、下一步。

---

## 项目概述

[一句话描述]

## 当前阶段

[阶段描述]

## 真实代码仓库

见 `PROJECT_POINTERS.md`（AI OS 不存生产代码）

## 必读文件（按顺序）


## 可用工具和 Skill
### Claude Chat
- 用途：需求整理、任务拆解、Prompt 优化、架构评估、方案层争议
- 限制：无法直接读本地文件，依赖 CONTEXT_PACK 注入
### Claude Code
- 用途：项目生产代码执行、本地文件读写、git 操作、状态文件维护
### Codex
- 用途：技术审查、AI OS 运维杂活、文件整理、归档维护、验证报告
- 限制：不执行项目生产代码，不自我最终验证
### Chrome MCP / Browser
- 用途：前端 UI 验证、localhost 测试、浏览器交互验证
- 用途：任务编译器，将含糊需求转化为结构化任务理解，主动补漏、纠错、扩展scope
### 触发条件（满足一个即触发）
### 不触发条件
### 子Skill列表
### 行为规范
### [Skill 名称]
- 用途：[一句话]

## Confirmed 禁止清单
- ❌ 禁止行为：[不能做什么]

## 最近会话摘要（最近 3 条）
---
# 会话摘要 · testproject · 20260505_0259

测试摘要内容

---
生成时间：2026-05-05 02:59

## 当前任务队列
暂无活跃任务

## 关键决策（最近 3 条）
### [日期] [决策标题]
- 决策：[具体内容]
- 原因：[为什么]
- 否决方案：[考虑过但放弃的选项及原因]
- 状态：已定
```

---
**启动指令**：读取后回复确认摘要（见 00_START_HERE.md 格式），然后等待任务指令。
