# VALIDATION_PROTOCOL.md — 验证标准和报告格式

> 所有验证报告必须遵守本协议。
> 位置：06_VALIDATION_CENTER/VALIDATION_PROTOCOL.md

---

## 验证触发条件

以下情况必须触发独立验证：
- 核心算法实现
- 重要架构变更
- 关键 Prompt 优化
- 生产代码合并前
- 任何 TASK_PACKET 中标注"需要验证"的任务

## 验证者分配规则

```
Code 执行的任务 → Codex 验证
Codex 执行的任务 → Code 验证
同一端不能自我最终验证
```

## 标准验证报告格式

```markdown
## 验证报告 [PASS ✅ / FAIL ❌]
- 验证时间：
- 验证对象：[文件路径或描述]
- 对应 TASK_PACKET：[TP编号]
- 执行者：
- 验证者：

### 验证维度
- 逻辑正确性：[PASS/FAIL] · 证据：[文件/命令/测试结果]
- 格式合规：[PASS/FAIL] · 证据：
- Skill 使用合理性：[PASS/FAIL] · 证据：
- 测试结果：[PASS/FAIL] · 证据：

### 发现问题
[列表 / 无]

### 建议
[具体建议]

### 是否需要 Jack 裁决
[是 / 否，原因]
```

## 反审查流程

Code 对 Codex 报告有异议时：
1. 明确列出"第N条我不同意"
2. 必须附上证据（文件路径/命令输出/测试结果/diff）
3. 最多 2 轮来回
4. 仍有分歧 → 写入 DESIGN_DISPUTES.md → 提交 Jack

## 验证报告存放

- 项目内验证：`05_PROJECTS/[项目名]/validation/VR_[日期]_[描述].md`
- 跨项目验证：`06_VALIDATION_CENTER/VALIDATION_REPORTS/`
