# ERROR_PREVENTION.md — 已确认错误预防规则

> 系统级流程错误和工具使用错误的预防清单。
> 只有 confirmed 条目在此。candidate 在 CANDIDATE_LOG.md。
> 位置：07_ERROR_AND_LESSONS/ERROR_PREVENTION.md

---

## 预防规则格式

```markdown
### EP-[编号] [标题]
- 错误类型：[流程错误 / 工具使用错误]
- 描述：[曾经发生了什么]
- 预防规则：[每次必须做什么]
- 检查方式：[如何验证]
- 适用工具：[Chat / Code / Codex / 全部]
- 状态：active
```

---

## 预置规则

### EP-001 未读入口文件就开始工作
- 错误类型：流程错误
- 描述：工具跳过 00_START_HERE.md 直接开始任务
- 预防规则：每次启动第一件事读 00_START_HERE.md 并回复确认摘要
- 检查方式：确认摘要中含"Jack AI OS v2 已载入"
- 适用工具：全部
- 状态：active

### EP-002 有 Browser/MCP 能力却不使用
- 错误类型：工具使用错误
- 描述：涉及前端/UI/localhost 的任务用纯文本猜测结果
- 预防规则：凡涉及浏览器交互的任务必须使用 Chrome MCP
- 检查方式：验证报告确认使用了 Browser 工具
- 适用工具：全部
- 状态：active

### EP-003 任务结束后未更新状态文件
- 错误类型：流程错误
- 描述：任务完成但 SESSION_STATE.md 未更新
- 预防规则：每次任务完成后必须自动更新 SESSION_STATE.md
- 检查方式：SESSION_STATE.md 的"最后更新"时间戳
- 适用工具：Code / Codex
- 状态：active

### EP-004 将 candidate 写入 CONTEXT_PACK
- 错误类型：流程错误
- 描述：未经 Jack 确认的候选观察被注入 CONTEXT_PACK
- 预防规则：只有 confirmed 条目才能进 CONTEXT_PACK
- 检查方式：update_context.sh 只从 CORRECTION_LOG confirmed 区提取
- 适用工具：全部
- 状态：active

---

<!-- confirmed 后继续追加 -->
