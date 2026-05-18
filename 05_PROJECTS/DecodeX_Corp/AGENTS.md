# DecodeX_Corp — Agent 架构（MVP 12）

> 版本：v2（2026-05-12，基于 Codex audit E1 + redteam §8 修订）
> 决策依据：`DECISIONS.md D8`（200+ 蓝图保留为长期目标，MVP 限 12 个）
> 沿用框架：OpenClaw SOUL.md 规范（位于 `~/Jack_AI_OS/05_PROJECTS/OpenClaw/outputs/souls/` — 该目录待 D6 创建）
> ⚠️ 本文件不得被 `update_context.sh` 自动覆写（脚本已修订）。

---

## §1 MVP 阶段 Agent 清单（12 = L0 Boss + 11 Agent）

| Agent | 角色 | 主要职责 | SOUL.md 状态 |
|---|---|---|---|
| L0 Boss | Jack（人） | P4 决策 / 法律 / KYC / D 线启停 / 跨 Tier | 不适用 |
| CEO | 战略 + 现金流 | Daily Brief 触发 / 砍线 Gate 监控 / 与 Boss 同步 | 🟡 D6 起草 |
| CRO | 风险 + 合规 | **一票否决权**：法律 / 账号 / KYC / 跨 Tier / D 线启停 | 🟡 D6 起草 |
| CCO | 内容主编 | EP 选题 / 终审 / 风格守门 / BIBLE.md 校验 | 🟡 D6 起草 |
| CTO | 技术架构 | 基础设施 / Schema / API / 状态机 / 5 项 restore drill | 🟡 D6 起草 |
| COO | IT 运维 | n8n / 监控 / 备份 / DNS / 证书 cron | 🟡 D7 起草 |
| CMO | 发布 + 分发 | 分发节奏 / SEO / 缩略图 A/B / 评论运营 | 🟡 D7 起草 |
| B-Auditor | 财务 + 审计 | Beancount 月审 / 砍线 Gate 流水计算 / 风险事件归类 | 🟡 D7 起草 |
| VP-Oracle | Oracle 业务负责 | 命盘文化解读 / 闲鱼 / 小红书 / 合规话术守护 | 🟡 D8 起草 |
| VP-Trade | Trade 业务负责 | 课程定价 / IB 合规推广 / 邮箱列表 / 风险提示 | 🟡 D8 起草 |
| VP-Journal | Journal 业务负责 | EP 生产流 / 数据采集 / 路人乙协调 | 🟡 D8 起草 |
| VP-Relay | Relay 业务负责 | 只接已付款 inbound / 不主动获客（G3 前） | 🟡 D8 起草 |
| VP-AI | AI 业务负责 | 内部工具沉淀 / 不独立运营（G3 前冻结产品化） | 🟡 D8 起草 |

**总计：11 个 Agent（L0 Boss 不计入）+ Jack 共 12 个角色单位**。

---

## §2 状态机（强制，DECISIONS D8）

所有 Agent 任务必须遵循五态流转：

```
queued → claimed → running → needs_review → done
                              ↓
                              failed
                              ↓
                              cancelled
```

**强制字段（DB schema 见 PROJECT_DESIGN_v3.1 §8）**：

- `lease_until` — 任务租约时限，超时自动回 queued
- `idempotency_key` — 幂等键，重复 claim 同 key 禁止
- `retry_count` — 最大 retry = 3，超出升级 human escalation
- `assignee_agent` — 任务所有者，写入只能由该 Agent 触发

**写入规则**：
- Agent 不允许直接改数据库
- 写入必须走 API（FastAPI / n8n webhook relay）
- 两个 Agent 同时改同一 row 时，后写者必须 reject 并写 risk_event

---

## §3 ESCALATION（CRO 一票否决权）

| 议题类型 | 一票否决 | 决策时间 | 升级路径 |
|---|---|---|---|
| 法律 / 合规 | CRO | 即时 | → Boss（P4） |
| KYC / 账号 | CRO | 即时 | → Boss |
| 跨 Tier 业务关联 | CRO | 即时 | → Boss |
| D 线启停 | CRO（且需 Boss 签字） | 24h 内 | 必须 Boss |
| 内容风格 | CCO | 4h | → Boss（仅意见冲突） |
| 技术安全 | CTO | 即时 | → Boss（重大） |
| 现金流 / 预算 | CEO + B-Auditor | 24h | → Boss（> $1000 = P4） |
| 跨业务线冲突 | CEO 调度 | 24h | 24h 未决 → Boss |

**双人规则**：CRO + CEO 联合可暂停任何业务 24h；Boss 24h 内必须复审。

**所有一票否决**：必须写入 `risk_events`（不可口头）。

**默认暂停**：争议任务在仲裁前默认暂停，不允许两个 Agent 分头执行。

---

## §4 扩展 Gate（L4-L6 必须先通过的 5 项 Drill）

DECISIONS D8 强制：MVP 12 跑通 5 项 restore drill 后才能扩展到 200+ 蓝图。

| # | Drill | 通过标准 | 演练频率 |
|---|---|---|---|
| 1 | Postgres pg_dump → restore | 完整恢复 < 30 min；数据零丢失 | 每周一次 chaos drill |
| 2 | n8n workflow replay | 主流 8 个 WF 全部回放成功 | 每月一次 |
| 3 | Telegram token rotate | 新 token 推送验证 + 旧 token 失效检查 | 每月一次 |
| 4 | Cloudflare DNS restore | 从导出文件恢复全部记录 | 每月一次 |
| 5 | Playwright 账号冷启动回滚 | 账号被风控后 24h 内换号继续 | 触发式 |

**每周一次 chaos drill**（轮换演练）：关掉 VPS 30 min / 关掉 Windows Docker / 吊销一个测试 token。

**Gate 失败**：保持 MVP 12，不得扩展；同时进入 `risk_events` 红色级。

---

## §5 200+ 蓝图（长期目标，G1 Gate 后视情况启动）

```
L0 Boss
 ↓
L1 董事会（3）       ← MVP 不启用
 ↓
L2 C-Suite（7）     ← MVP 启用 7 个 + B-Auditor
 ↓
L3 业务 VP（5）     ← MVP 启用 5 个
 ↓
L4 Manager（~22）   ← Gate 后扩展
 ↓
L5 Specialist（~70）← Gate 后扩展
 ↓
L6 Worker（动态 100+）← Gate 后扩展
 ↓
L7 Tools / Infra    ← Gate 后扩展
```

**扩展条件**：
1. 5 项 restore drill 全部通过
2. 状态机连续 30 天零越权写入
3. CRO escalation 流转无积压
4. Boss 明确批准（P4）

---

## §6 SOUL.md 存放与命名

- 位置：`~/Jack_AI_OS/05_PROJECTS/OpenClaw/outputs/souls/`（**D6 必须先创建该目录**）
- 命名：`{ROLE}_SOUL_v{N}.md`（例 `CRO_SOUL_v1.md`）
- 模板：沿用 OpenClaw 12 Agent SOUL.md 规范（**14 角色 vs 12 SOUL 框架的命名冲突**已记录到 `DESIGN_DISPUTES.md`）

---

## §7 与既有项目的 Agent 映射

| 既有项目 | Agent 数量 | 与 MVP 12 的关系 |
|---|---|---|
| OpenClaw | 14 角色 / 12 SOUL 框架 | 沿用 SOUL.md 模板规范，**角色数量映射差异**记录到 `DESIGN_DISPUTES.md`，G1 前给出对应表 |
| DecodeX_Corp 长期蓝图 | 200+ | 见 §5，G1 后启动 |

---

## §8 审计追溯

本文件因 2026-05-11 `update_context.sh` 误覆写丢失原 §1-§7 内容；2026-05-12 基于 v3.1 + DECISIONS D8 重写。脚本已修订为不再自动覆写 AGENTS.md。
