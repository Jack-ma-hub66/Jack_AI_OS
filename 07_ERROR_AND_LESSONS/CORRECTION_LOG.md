# CORRECTION_LOG.md — 行为纠正记录

> 只有 confirmed 条目才能进入 CONTEXT_PACK 禁止清单。
> Jack 是唯一有权将 candidate 升级为 confirmed 的人。
> 位置：07_ERROR_AND_LESSONS/CORRECTION_LOG.md

---

## 四级状态

| 状态 | 含义 | 进 CONTEXT_PACK | 写入者 |
|------|------|-----------------|--------|
| `candidate` | AI 候选观察，未验证 | 否 | AI 自动写入 CANDIDATE_LOG.md |
| `confirmed` | Jack 明确确认，成为规则 | 是 | Jack 确认后 AI 写入本文件 |
| `disputed` | 有分歧，等 Jack 裁决 | 否 | 写入 DESIGN_DISPUTES.md |
| `rejected` | Jack 否决，保留记录不再提示 | 否 | Jack 否决后标记 |

---

## 触发机制

当 Jack 纠正任何工具行为时，工具立刻询问：

```
检测到行为纠正。请选择处理方式：
1. 写入 confirmed 规则（进入禁止清单）
2. 记为 candidate 观察（不注入，待后续决定）
3. 记为方案分歧（写入 DESIGN_DISPUTES）
4. 不记录（临时纠正）
```

---

## AI 写入 candidate 的硬性规则

- 只能写候选观察，不能写成规则
- 格式必须包含"待 Jack 确认"字样
- 不能进入 CONTEXT_PACK
- 存放在 `CANDIDATE_LOG.md`，不在本文件

---

## Confirmed 记录格式

```markdown
### COR-[编号] [标题]
- 确认时间：
- 错误类型：[事实/流程/判断/偏好/工具使用]
- 触发端：[Chat / Code / Codex]
- 行为描述：[具体发生了什么]
- ❌ 禁止行为：[不能做什么]
- ✅ 正确做法：[应该怎么做]
- 适用范围：[仅此项目 / 所有项目]
- 状态：confirmed
```

---

## 错误类型定义

| 类型 | 定义 |
|------|------|
| 事实错误 | 与文件、代码、测试结果、Jack 确认事实冲突 |
| 流程错误 | 违反 Jack AI OS 规则（没读入口、没保存、没验证、没 handoff）|
| 判断错误 | 方案逻辑不成立、风险评估错误、把不确定当确定 |
| 偏好错误 | 违反 Jack 明确偏好（附和、废话、误用历史项目）|
| 工具使用错误 | 有 MCP/Browser/本地文件能力却没使用 |

---

## 错误成立条件（满足一个即成立）

1. Jack 明确指出这是错误
2. 与已确认文件冲突
3. 测试或验证失败
4. 导致任务返工
5. 违反系统已写明规则
6. Claude Code 与 Codex 审查后确认

> 方案分歧不属于错误，进入 DESIGN_DISPUTES.md。

---

## Confirmed 记录列表

<!-- 随使用积累 -->
