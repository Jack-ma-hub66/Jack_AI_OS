# DecodeX_Corp — 项目入口

> 一人 AI 公司 umbrella 项目。统筹 5 柱业务线 + 1 条 D 线。
> Boss：Jack。Agent MVP 12（200+ 为长期蓝图，扩展需通过 G1 Gate）。
> 时区基准：UTC+8（台北 / 上海）。

---

## 项目状态

- **当前阶段**：Phase 0（战略定稿 ✅）→ Phase 1（物理底盘 + Oracle 立即变现 + Codex 审计落地 ✅ 2026-05-12）
- **战略文档**：`outputs/PROJECT_DESIGN_v3.1.md`（**当前版本，2026-05-12**；v3.0 已被替代）
- **倒排计划**：`outputs/SCHEDULE_14day.md`（→ EP1 上线 2026-05-25 周一 18:00 UTC+8）
- **关键决策**：见 `DECISIONS.md`（含 2026-05-12 新增 B 区 9 条修订）
- **审计追溯**：`PROJECT_CORRECTION_LOG.md` + `DESIGN_DISPUTES.md`

## 必读文件（按顺序）

1. `outputs/PROJECT_DESIGN_v3.1.md` — 公司架构最终版（v3.1）
2. `outputs/SCHEDULE_14day.md` — 14 天倒排计划
3. `DECISIONS.md` — 已定决策
4. `AGENTS.md` — Agent MVP 12 体系
5. `PROJECT_POINTERS.md` — 子项目 / 仓库 / 外部服务位置
6. `PROJECT_CORRECTION_LOG.md` — 项目级纠正记录
7. `DESIGN_DISPUTES.md` — 项目内设计分歧

## 子项目映射

| 柱 | 优先级 | 子项目目录 | 子域名 |
|---|---|---|---|
| Oracle | P1 | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Oracle/`（+ Mingli/） | oracle.decodex.cc |
| Trade | P2 | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/` | trade.decodex.cc ✅ |
| Journal | P3 | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Journal/` | YouTube + journal.decodex.cc |
| Relay | P4 | `~/Jack_AI_OS/05_PROJECTS/Relay/`（沿用，待重命名 DecodeX_Relay） | relay.decodex.cc |
| AI | P5 | `~/Jack_AI_OS/05_PROJECTS/DecodeX_AI/` | ai.decodex.cc |
| D 线 | P6 | **不在 Jack_AI_OS** — 独立 .xyz/.top 域名 + 新购 VPS（待选型） | 独立（不挂 .decodex.cc） |
| DecodeX 主站 | — | `~/Jack_AI_OS/05_PROJECTS/DecodeX/` | decodex.cc |
| OpenClaw Agent 体系 | — | `~/Jack_AI_OS/05_PROJECTS/OpenClaw/` | — |

## 下一步（Next Action）

按 `outputs/SCHEDULE_14day.md` 执行。**今日（2026-05-12 周二 UTC+8）任务**：
1. Boss 补完 MASTER_PROFILE.md（个人档案）
2. Oracle 启动第一单（小红书发图文 + 闲鱼挂 ¥99 文化解读，**禁用算命话术**）
3. Boss 决策 D 线 VPS 选型 + 律师候选
4. Agent: 修复 GitHub push
5. Agent: Codex 审计 100% 落地后申请复审

## Confirmed 禁止清单

- ❌ 中国大陆托管 Windows 节点 **永不** 部署：YT 业务 / 加密钱包 / 灰产 / 翻墙
- ❌ D 线 **永不** 挂 .decodex.cc 任何子域名
- ❌ D 线资金路径 **永不** 出现：Bybit / Wise / Stripe / 支付宝 / 微信 / 任何 Tier-1 KYC 主体
- ❌ Buffalo VPS **不再** 承载：Postgres 流复制 / Relay 海外单 / D 线 worker
- ❌ D 线 SCHEDULE 条目在新 VPS + 律师书面确认 + Boss 签字前 **冻结**，不得执行
- ❌ 主战略 / SCHEDULE / DECISIONS 含「三跳混币 / Wise OTC / 翻墙包装培训 / Tor 出口」等可执行话术 — **已从 v3.1 删除**
- ❌ Oracle 商品名禁用「算命 / 改运 / 转运 / 化太岁 / 开光 / 改命」 — 改用「传统命盘文化解读 / 人生复盘」
- ❌ Agent 不允许直接改数据库，写入只走 API；状态机五态强制
- ❌ n8n 公网暴露 / 启用 Execute Command / 启用社区节点
- ❌ Playwright Windows 节点超过 3 并发；SDXL 在 GTX1060 6G 上跑
- ❌ 单笔加密变现金额 **不超过** $1000（合规线下分散，**且仅主品牌合规交易，禁 D 线**）
