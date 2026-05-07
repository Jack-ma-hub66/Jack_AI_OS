# CANDIDATE_LOG.md — 候选观察记录

> AI 自动写入区。所有条目均为"待 Jack 确认"状态。
> 不得进入 CONTEXT_PACK。
> Jack 定期审阅，决定升级 confirmed / rejected / disputed。
> 位置：07_ERROR_AND_LESSONS/CANDIDATE_LOG.md

---

## 写入规则（AI 必须遵守）

- 只能写候选观察，不能写成规则
- 每条必须标注"待 Jack 确认"
- 只能追加，不能修改已有条目
- 不能将本文件内容注入 CONTEXT_PACK

---

## 候选条目格式

```markdown
### CAND-[编号] [标题]
- 记录时间：
- 记录者：[Chat / Code / Codex]
- 观察描述：[发生了什么，待 Jack 确认]
- 建议处理：[升级 confirmed / rejected / 写入 DESIGN_DISPUTES]
- 状态：待 Jack 确认
```

---

## 待审阅列表

### CAND-001 会话启动时未执行读取协议
- 记录时间：2026-05-06
- 记录者：Code
- 观察描述：Jack 进入新会话后，Claude Code 未主动读取 5 个启动文件并回复确认格式，而是直接处理用户消息内容。Jack 指出后才补读。待 Jack 确认。
- 建议处理：升级 confirmed（写入禁止清单：收到第一条消息必须先执行启动协议）
- 状态：待 Jack 确认
