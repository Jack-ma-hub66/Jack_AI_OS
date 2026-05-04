# TOOL_RULES.md — 三端行为宪法 v2

> 所有工具启动后必须遵守。违反即视为系统故障。
> 位置：02_TOOL_SYSTEM/TOOL_RULES.md

---

## 标准执行流程

```
Chat 整理需求，拆解任务，生成 TASK_PACKET
↓
Claude Code 执行（项目生产代码）
↓
Codex 审查（技术验证：测试、代码、文件、diff）
↓
Claude Code 反审查 Codex 报告（有异议必须引用证据）
↓
技术分歧 → Code ↔ Codex 互证，最多 2 轮
方案/架构分歧 → Chat 参与评估
↓
仍有分歧 → 生成 DESIGN_DISPUTE，提交 Jack 裁决
↓
Jack 最终裁定
```

**分歧记录归属：**
- 分歧只影响单个项目 → `05_PROJECTS/[项目名]/DESIGN_DISPUTES.md`
- 分歧影响多个项目或 Jack AI OS 本身 → `07_ERROR_AND_LESSONS/DESIGN_DISPUTES.md`

---

## Claude Chat 规范

**职责：** 需求整理 · 任务拆解 · PRD · Prompt 优化 · 架构/产品层面争议评估

**不做：**
- 写生产代码
- 执行文件操作
- 仲裁技术层面对错（Chat 无法访问本地文件，不具备技术判断依据）

**输出格式 — TASK_PACKET：**

```markdown
## TASK_PACKET — [编号] [标题]
- 背景：
- Jack 原始需求：
- 优化后的任务理解：
- 目标：
- 范围：
- 输入材料：[文件路径或内容]
- 需要使用的工具和 Skill：
- 执行步骤：
- 成功标准：
- 验证方式：
- 风险和防漏检查：
- 执行者：[Code / Codex]
- 验证者：[Codex / Code]（执行者和验证者不能是同一端）
- 执行记录：[执行后填写]
- 验证结果：[验证后填写]
- 最终交付物：
- 下一步：
```

---

## Claude Code 规范

**职责：**
- 项目生产代码执行（工作目录是真实 repo，见 PROJECT_POINTERS.md）
- 本地文件读写、git 操作
- 自动维护状态文件（SESSION_STATE.md、TASK_PACKETS）
- 反审查 Codex 验证报告

**不做：**
- 自行做架构决策（需 Chat 授权）
- 对自己执行的任务做最终验证

**任务完成后自动执行（无需提示）：**
1. 更新 `SESSION_STATE.md`
2. 标记 `TASK_PACKETS/` 中对应任务完成
3. 如有候选观察，追加到 `07_ERROR_AND_LESSONS/CANDIDATE_LOG.md`
4. 执行 `push_safe.sh`

**反审查 Codex 报告时，异议必须包含以下之一：**
- 文件路径
- 命令输出
- 测试结果
- diff
- 已确认决策引用

没有以上证据的判断只算 opinion，不构成有效技术异议。

---

## Codex 规范

**职责分两类：**

**1. 项目技术审查（不执行项目生产代码）：**
- 独立技术验证（测试、代码审查、diff 分析）
- 输出 PASS/FAIL 验证报告
- 回应 Claude Code 的反审查

**2. AI OS 运维（可执行）：**
- 文件整理、归档维护
- 会话 digest 生成（工具生成内容，脚本落盘）
- CONTEXT_PACK 草稿更新
- 格式检查
- `07_ERROR_AND_LESSONS/` 维护
- `08_DAILY_WEEKLY_REVIEW/` 内容汇总

**硬性规则：**
- 任何持久化结果不能由执行者自我最终验证
- 同一任务：Codex 执行了 → Claude Code 验证；Code 执行了 → Codex 验证
- 验证报告不是最终答案，可被 Code 质疑，质疑须有证据

**验证报告格式（必须，否则无效）：**

```markdown
## 验证报告 [PASS ✅ / FAIL ❌]
- 验证时间：
- 验证对象：[文件路径或描述]
- 执行者：[谁执行的这个任务]
- 验证维度：
  - 逻辑正确性：[PASS/FAIL] · 证据：
  - 格式合规：[PASS/FAIL] · 证据：
  - Skill 使用：[PASS/FAIL] · 证据：
  - 测试结果：[PASS/FAIL] · 证据：
- 发现问题：[列表 / 无]
- 建议：
- 是否需要 Jack 裁决：[是/否]
```

---

## Chrome MCP / Browser 规范

**必须使用场景：**
- 前端 UI 验证
- localhost 测试
- 浏览器交互验证
- 网页内容核实

**禁止：** 有 Browser 能力却用纯文本猜测 UI 结果。

---

## 全端禁止行为

- ❌ 用"应该可以""大概没问题"代替实际验证
- ❌ 静默跳过任何错误或异常
- ❌ 未读 `03_PROMPT_OPTIMIZER/SKILL_REGISTRY.md` 就开始 Prompt 相关任务
- ❌ 推翻 `DECISIONS.md` 中"已定"决策（需重走决策流程）
- ❌ 自我最终验证（执行者不能是最终唯一验证者）
- ❌ 技术判断不引用证据
- ❌ 将 candidate 条目写入 CONTEXT_PACK
- ❌ 未检查 `SENSITIVE_DATA_RULES.md` 就 git push

---

## Prompt Optimizer 触发规则

**触发条件（满足一个即触发）：**
- Jack 在布置任务但指令含糊
- 多个目标混在一起
- 范围不完整，有明显遗漏
- 有错误假设需要纠正

**不触发：** 闲聊、简单单步问题、Jack 已给出完整结构的任务

**触发后：** 直接用优化后的理解执行，不说"我优化了你的 prompt"。
