# DESIGN_DISPUTES.md — 系统级 / 跨项目设计分歧

> 记录影响多个项目或 Jack AI OS 本身的设计分歧。
> 项目内分歧放 05_PROJECTS/[项目名]/DESIGN_DISPUTES.md。
> 未由 Jack 裁决前不写成错误，不进入 CORRECTION_LOG。
> 位置：07_ERROR_AND_LESSONS/DESIGN_DISPUTES.md

---

## 归属判断规则

```
分歧只影响单个项目 → 05_PROJECTS/[项目名]/DESIGN_DISPUTES.md
分歧影响多个项目或 Jack AI OS 本身 → 本文件
```

**本文件适用场景示例：**
- Claude Code 和 Codex 对 Jack AI OS 规则有分歧
- 工具职责边界争议
- 全局工作流设计争议
- 是否修改错误判定机制
- 是否调整 CONTEXT_PACK 规则

---

## 争论规则

1. 最多 2 轮来回
2. 每轮必须引用证据（文件路径/命令输出/测试结果/diff/已确认决策）
3. 没有证据的判断只算 opinion
4. 2 轮后仍有分歧，提交 Jack 裁决，不得继续争论
5. Jack 裁决后写入 DECISIONS，本条目标记 resolved

---

## 分歧记录格式

```markdown
### DISP-[编号] [标题]
- 时间：
- 范围：[系统级 / 跨项目]
- 分歧描述：

**Code 立场：**
- 观点：
- 证据：

**Codex 立场：**
- 观点：
- 证据：

**Chat 评估（方案层面）：**
- 评估：

**分歧轮次：** [第 N 轮，最多 2 轮]
**提交 Jack 裁决：** [是/否]
**Jack 裁决结果：** [待裁决 / 裁决内容]
**状态：** [open / resolved / rejected]
```

---

## 分歧列表

<!-- 随使用积累 -->
