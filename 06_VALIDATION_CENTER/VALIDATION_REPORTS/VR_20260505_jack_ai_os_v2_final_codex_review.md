# 验证报告 [FAIL]

- 验证时间：2026-05-05
- 验证对象：`/Users/jack/Jack_AI_OS/`
- 对应 TASK_PACKET：无，系统定稿包验证
- 执行者：Claude Code
- 验证者：Codex

## 验证维度

- 目录结构合规：[PASS]  
  证据：`SYSTEM_INDEX.md` 明确 9 个编号目录是实际工作目录；根目录不再保留并列的 `core/ projects/ sessions/ archive/` 运行层。

- 裁决落地：[PARTIAL PASS]  
  证据：生产代码指向真实 repo、Code/Codex 互证、Chat 只评估方案层面、candidate/confirmed/disputed/rejected 状态、Daily/Weekly 自动化方向均已写入规则文件。

- 脚本语法：[PASS]  
  证据：`bash -n /Users/jack/Jack_AI_OS/scripts/*.sh` 通过。

- 安全 push 顺序：[PASS]  
  证据：`scripts/push_safe.sh` 在 `git add -A` 前扫描 staged、unstaged、untracked。

- raw archive 闭环：[FAIL]  
  证据：`FILE_SYSTEM_MAP.md` 声明 raw archive 每次会话结束必做，但 `scripts/close_session.sh` 只接收并写入 digest，没有 raw transcript 参数或 raw_archive 落盘步骤。

## 发现问题

### P1 — raw_archive 规则已写入，但执行流程未闭环

`FILE_SYSTEM_MAP.md` 规定：

- 原始对话保存位置：`09_ARCHIVE/sessions/raw_archive/`
- 保存：必做
- 读取：按需
- 默认不注入
- 默认不 push

但 `scripts/close_session.sh` 当前只支持：

- 写入 `09_ARCHIVE/sessions/digest/`
- 追加 `08_DAILY_WEEKLY_REVIEW/daily/`
- 更新 `CONTEXT_PACK`
- 执行 `push_safe.sh`

缺少：

- raw transcript 输入参数
- raw transcript 文件落盘
- 若无法自动获取全文时的强制提示

建议修复：

```bash
bash ~/Jack_AI_OS/scripts/close_session.sh [项目名] --digest [digest_file] --raw [raw_file]
```

或至少在无 `--raw` 时阻断 A 类完整关闭，并提示：

```text
完整关闭需要 raw transcript。请提供 raw 文件路径，或选择 B 只保存状态 / C 直接关闭。
```

### P2 — SYSTEM_INDEX 列出 MCP_REGISTRY.md 和 Chrome_MCP_RULES.md，但文件不存在

`SYSTEM_INDEX.md` 在 `02_TOOL_SYSTEM/` 下列出：

- `MCP_REGISTRY.md`
- `Chrome_MCP_RULES.md`

但实际 `/Users/jack/Jack_AI_OS/02_TOOL_SYSTEM/` 只有：

- `TOOL_RULES.md`

建议修复：

- 补两个占位文件；或
- 从 `SYSTEM_INDEX.md` 删除这两项，保留在 `TOOL_RULES.md` 和 `SKILL_REGISTRY.md` 中。

考虑到 Chrome MCP 遗忘是 Jack 的核心痛点，建议补占位文件。

### P3 — push_safe.sh 阻断后的提示会诱导绕过安全流程

`push_safe.sh` 检出敏感信息后提示手动运行：

```text
git -C ~/Jack_AI_OS add -A && git -C ~/Jack_AI_OS push
```

这容易绕过 commit 和二次安全检查。

建议改成：

```text
请移除或脱敏后重新运行 push_safe.sh。
如 Jack 明确确认例外，先记录到 SENSITIVE_DATA_RULES.md 的例外日志，再手动 git 操作。
```

## 建议

当前 v2 final 不能定稿为 PASS。  
建议 Claude Code 修复 P1 后重新打包；P2/P3 可同轮修掉。

## 是否需要 Jack 裁决

否。

这些是执行闭环和一致性问题，不是方案方向分歧。
