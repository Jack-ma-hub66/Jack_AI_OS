# SYSTEM_INDEX.md — Jack AI OS v2 系统总目录

> 9 个编号目录是实际工作目录，不是空导航层。
> 根目录只放入口文件、状态文件、安全规则、脚本。

---

## 根目录文件

| 文件 | 用途 | 读取时机 |
|------|------|----------|
| `00_START_HERE.md` | 系统入口，启动协议 | 每次启动第一个读 |
| `SYSTEM_INDEX.md` | 本文件，系统地图 | 启动时读 |
| `SESSION_STATE.md` | 当前会话状态 | 启动时读，任务后自动更新 |
| `NEXT_ACTIONS.md` | 跨会话下一步行动 | 启动时读，关闭时更新 |
| `FILE_SYSTEM_MAP.md` | 文件保存规则 | 需要保存文件时读 |
| `SENSITIVE_DATA_RULES.md` | 敏感信息规则 | git push 前必读 |
| `.gitignore` | git 忽略规则 | 自动生效 |

---

## 01_PERSONAL_MEMORY/ — Jack 个人记忆

| 文件 | 用途 | 维护者 |
|------|------|--------|
| `MASTER_PROFILE.md` | Jack 是谁，工作风格，技术栈偏好 | Jack 手动，月级 |

---

## 02_TOOL_SYSTEM/ — 工具系统配置

| 文件 | 用途 | 维护者 |
|------|------|--------|
| `TOOL_RULES.md` | 三端行为宪法，所有工具必须遵守 | 手动，月级 |
| `MCP_REGISTRY.md` | MCP 工具注册表（Chrome MCP 等）| Codex 维护 |
| `Chrome_MCP_RULES.md` | Chrome MCP / Browser 使用规范 | 手动 |

---

## 03_PROMPT_OPTIMIZER/ — Prompt 优化系统

| 文件/目录 | 用途 | 维护者 |
|-----------|------|--------|
| `SKILL_REGISTRY.md` | 所有 Skill 完整清单 | Codex 自动追加 |
| `prompt-optimizer/` | Prompt Optimizer 本地文件（待 Jack 迁入）| Jack |
| `README.md` | 说明 Prompt Optimizer 状态和使用方式 | 手动 |

---

## 04_TASK_CENTER/ — 任务中心

| 文件/目录 | 用途 | 维护者 |
|-----------|------|--------|
| `TASK_PACKET_TEMPLATE.md` | 标准任务包模板 | 手动 |
| `global/` | 跨项目任务和优先级总览 | Chat + Code |

---

## 05_PROJECTS/ — 项目目录

所有项目放在此目录下。每个项目结构：

```
05_PROJECTS/[项目名]/
  00_PROJECT_INDEX.md     项目入口，当前阶段，必读文件，下一步
  CONTEXT_PACK.md         注入包，脚本自动聚合，≤1500 词
  PROJECT_POINTERS.md     指向真实代码 repo（AI OS 不存生产代码）
  DECISIONS.md            决策日志，已定不可推翻
  TASK_PACKETS/           任务包目录
  PROJECT_CORRECTION_LOG.md  项目级纠正记录
  DESIGN_DISPUTES.md      项目内设计分歧（只影响本项目的分歧）
  outputs/                AI 生成文档、Prompt（非生产代码）
  validation/             Codex 验证报告
  handoff/                交接文档
```

**分歧归属规则：**
- 分歧只影响单个项目 → `05_PROJECTS/[项目名]/DESIGN_DISPUTES.md`
- 分歧影响多个项目或 Jack AI OS 本身 → `07_ERROR_AND_LESSONS/DESIGN_DISPUTES.md`

---

## 06_VALIDATION_CENTER/ — 验证中心

| 文件/目录 | 用途 | 维护者 |
|-----------|------|--------|
| `VALIDATION_REPORTS/` | 跨项目验证报告汇总 | Codex |
| `VALIDATION_PROTOCOL.md` | 验证标准和报告格式规范 | 手动 |

---

## 07_ERROR_AND_LESSONS/ — 错误与教训

| 文件 | 用途 | 维护者 |
|------|------|--------|
| `CORRECTION_LOG.md` | 行为纠正记录（confirmed）| Jack 确认后写入 |
| `CANDIDATE_LOG.md` | AI 自动写入的候选观察（待审核）| AI 自动 |
| `ERROR_PREVENTION.md` | 已确认错误预防规则 | Jack 确认后写入 |
| `DESIGN_DISPUTES.md` | 系统级/跨项目设计分歧 | Code/Codex 写入 |
| `LESSONS_LEARNED.md` | 长期教训沉淀 | Chat 定期整理 |

---

## 08_DAILY_WEEKLY_REVIEW/ — 日报/周报

| 目录 | 用途 | 生成方式 |
|------|------|----------|
| `daily/` | 每日会话 digest 汇总 | close_session.sh 自动触发 |
| `weekly/` | 每周汇总报告 | weekly_review.sh 自动生成 |

> Daily/Weekly Review 是自动化维护，不需要 Jack 手动写。
> close_session.sh 每次关闭时自动生成 daily digest。
> weekly_review.sh 从 daily 汇总周报，可设定时任务或手动触发。

---

## 09_ARCHIVE/ — 归档

| 目录 | 用途 |
|------|------|
| `sessions/digest/` | 结构化会话摘要（进入 CONTEXT_PACK）|
| `sessions/raw_archive/` | 完整原始对话（必做；按需读；默认不注入；默认不 push）|
| `projects/` | 已结束项目归档 |
| `milestones/` | 里程碑记录 |

---

## scripts/ — 自动化脚本（根目录）

| 脚本 | 用途 |
|------|------|
| `new_project.sh` | 初始化新项目目录 |
| `update_context.sh` | 聚合生成 CONTEXT_PACK（≤1500 词）|
| `close_session.sh` | 关闭仪式：工具生成摘要内容后，脚本落盘推送 |
| `push_safe.sh` | 全量敏感信息检查后再 push |
| `sync.sh` | 双向 git 同步 |
| `weekly_review.sh` | 从 daily digest 汇总周报 |
