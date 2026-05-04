# FILE_SYSTEM_MAP.md — 文件保存规则

> 需要保存任何文件时，先查此文件确认保存位置。

---

## 核心原则

- 生产代码 → 真实项目 repo（通过 PROJECT_POINTERS.md 找路径）
- AI 生成文档/Prompt/报告 → `05_PROJECTS/[项目名]/outputs/`
- 会话摘要（digest）→ `09_ARCHIVE/sessions/digest/`
- 原始对话（raw）→ `09_ARCHIVE/sessions/raw_archive/`（必须保存；按需读取；默认不注入；默认不 push）
- 项目验证报告 → `05_PROJECTS/[项目名]/validation/`
- 跨项目验证 → `06_VALIDATION_CENTER/VALIDATION_REPORTS/`
- 结束项目 → 整体迁入 `09_ARCHIVE/projects/`

---

## raw_archive 说明

```
sessions/raw_archive/
  保存：必做（每次会话结束时保存完整原始对话）
  读取：按需，可选，不是每次启动必读
  CONTEXT_PACK：默认不注入
  GitHub push：默认不 push（已在 .gitignore 中排除）
  用途：查证历史决策，复盘，审计
```

---

## 文件命名规范

| 类型 | 格式 |
|------|------|
| 任务包 | `TASK_PACKETS/TP_[编号]_[标题].md` |
| 验证报告 | `validation/VR_[日期]_[描述].md` |
| 会话摘要 | `09_ARCHIVE/sessions/digest/[YYYYMMDD_HHMM]_[项目].md` |
| 原始对话 | `09_ARCHIVE/sessions/raw_archive/[YYYYMMDD_HHMM]_[项目].md` |
| 日报 | `08_DAILY_WEEKLY_REVIEW/daily/daily_[YYYYMMDD].md` |
| 周报 | `08_DAILY_WEEKLY_REVIEW/weekly/weekly_[YYYYMMDD].md` |
| 交接文档 | `handoff/HO_[日期]_[描述].md` |

---

## 更新频率参考

| 文件 | 更新频率 | 更新者 |
|------|----------|--------|
| SESSION_STATE.md | 每次任务后 | Code/Codex 自动 |
| CONTEXT_PACK.md | 关闭会话时 | 脚本自动 |
| CORRECTION_LOG.md | Jack 确认时 | Jack 确认 + AI 写入 |
| CANDIDATE_LOG.md | 随时 | AI 自动 |
| SKILL_REGISTRY.md | 新增 Skill 时 | Codex 自动追加 |
| DECISIONS.md | 决策确定时 | Chat 写入 |
| MASTER_PROFILE.md | 月级 | 手动 |
| TOOL_RULES.md | 月级 | 手动 |
