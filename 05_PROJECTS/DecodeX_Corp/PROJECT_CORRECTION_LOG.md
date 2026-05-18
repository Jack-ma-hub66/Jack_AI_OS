# DecodeX_Corp — 项目级纠正记录

> 项目内 confirmed 行为纠正。系统级纠正在 `07_ERROR_AND_LESSONS/CORRECTION_LOG.md`。
> 进入 CONTEXT_PACK 禁止清单的，必须先在此文件登记。
> 时区基准：UTC+8。

---

## COR-P001 路径写法错误：`~/jack/...` 不存在
- 确认时间：2026-05-12
- 错误类型：事实错误
- 触发端：Code
- 行为描述：v3.0 多处使用 `~/jack/资料/...`，但 macOS 上 `~/jack` = `/Users/jack/jack`，该目录不存在；正确路径应为 `/Users/jack/资料/...` 或 `~/资料/...`
- ❌ 禁止行为：再使用 `~/jack/...` 写法引用 Boss 家目录文件
- ✅ 正确做法：统一用 `/Users/jack/...` 或 `~/资料/...`，禁止 `~/jack/`
- 适用范围：所有项目
- 来源：audit_20260511_decodex_corp.md A3 / B3
- 状态：confirmed

## COR-P002 日历错位：5-11 周日 / 5-12 周一 / 5-25 周日（错）
- 确认时间：2026-05-12
- 错误类型：事实错误
- 触发端：Code
- 行为描述：v3.0 SCHEDULE / NEXT_ACTIONS / SESSION_STATE 多处把 2026-05-11 写成周日（实为周一）、5-12 写周一（实为周二）、5-25 写周日（实为周一）。EP1 "周日黄金时段"假设失真
- ❌ 禁止行为：不使用 `date` 命令或日历核对就写星期；引用未明示时区的时间
- ✅ 正确做法：所有日期 + 星期前先 `date -d "YYYY-MM-DD" +%A`（UTC+8）；deadline 必须标 (UTC+8)
- 适用范围：所有项目
- 来源：audit_20260511_decodex_corp.md B2 / 红色清单 #4
- 状态：confirmed

## COR-P003 主战略不得含可执行的高法律风险指令
- 确认时间：2026-05-12
- 错误类型：判断错误
- 触发端：Code
- 行为描述：v3.0 §6 + SCHEDULE D7 含"翻墙包装培训 / Tor 出口 / 三跳混币 / Wise OTC / Bybit 卡消费 / helpsite 改写为跨境信息检索方法论"等可执行话术，属于运营/收款/匿名化执行路径，不是风险标签
- ❌ 禁止行为：在 DECISIONS / PROJECT_DESIGN / SCHEDULE 写可执行的灰产 / 翻墙 / 混币 / OTC 执行指令
- ✅ 正确做法：D 线相关执行细节单独放法律审查包；主战略仅描述"待 Boss + 律师确认"的隔离议题
- 适用范围：DecodeX_Corp
- 来源：audit_20260511 C4 / redteam §4.1
- 状态：confirmed

## COR-P004 D 线 KYC 资金路径污染禁止
- 确认时间：2026-05-12
- 错误类型：流程错误
- 触发端：Code
- 行为描述：v3.0 §6 把灰产资金路径写成"用户 USDT → 中转钱包 → 三跳混币 → Bybit 卡消费 / Wise OTC"，与 Tier-1 KYC 禁用于灰产的铁律直接冲突
- ❌ 禁止行为：D 线资金路径出现 Bybit / Wise / Stripe / 支付宝 / 微信 / 任何 KYC 主体或合规支付通道
- ✅ 正确做法：D 线只走独立 USDT 钱包 + 一次性 Telegram 收单；具体方案待律师书面确认
- 适用范围：DecodeX_Corp
- 来源：audit C5 / redteam §4.2 / DECISIONS D7
- 状态：confirmed

## COR-P005 Buffalo VPS 不得同时承载合规 + 灰产
- 确认时间：2026-05-12
- 错误类型：判断错误
- 触发端：Code
- 行为描述：v3.0 §3 把 Buffalo VPS 写成同时承载 Xray / Telegram Bot / Postgres 流复制 / trade.decodex.cc / Relay 海外单 / D 线 worker，违反"物理隔离"
- ❌ 禁止行为：Buffalo 上跑 D 线 worker / Postgres 流复制 / Relay 海外单 / Tor 出口
- ✅ 正确做法：Buffalo 只保留 Nginx + trade.decodex.cc + Telegram 主品牌通知 + Xray 跨境出口；D 线独立 VPS 见 DECISIONS D1
- 适用范围：DecodeX_Corp
- 来源：audit C1 / redteam SPOF #7 / DECISIONS D3
- 状态：confirmed

## COR-P006 update_context.sh 不得覆写 AGENTS.md 为 CONTEXT_PACK 内容
- 确认时间：2026-05-12
- 错误类型：工具使用错误
- 触发端：Codex（脚本作者）/ Code（未发现）
- 行为描述：`scripts/update_context.sh:122-123` 把 CONTEXT_PACK.md 内容同时 cp 到 CLAUDE.md 和 AGENTS.md，导致 DecodeX_Corp 项目原始 AGENTS 设计文档丢失
- ❌ 禁止行为：脚本自动覆写设计类文件 AGENTS.md
- ✅ 正确做法：CLAUDE.md 作为三端注入复制可保留；AGENTS.md 是独立设计文档，脚本必须跳过
- 适用范围：所有项目（脚本级修复）
- 来源：本次会话 Code 自查
- 状态：confirmed（脚本待 A9 修复）

## COR-P007 SDXL 在 GTX1060 6G 上跑不稳定
- 确认时间：2026-05-12
- 错误类型：判断错误
- 触发端：Code
- 行为描述：v3.0 §3 / §7 把 SDXL-Turbo 列为 GTX1060 6G 出图方案，redteam §7.1 指出 SDXL 实际舒适入口 8-12GB VRAM，6G 不可稳定生产
- ❌ 禁止行为：在 GTX1060 6G 上跑 SDXL；Playwright 超过 3 并发；Qwen + Playwright + SD 同机峰值
- ✅ 正确做法：改 SD1.5；Playwright 最多 2-3 并发；Qwen 走 Mac mini 或 Windows 夜间错峰
- 适用范围：DecodeX_Corp
- 来源：redteam §7.1
- 状态：confirmed

## COR-P008 Oracle 商品话术合规约束
- 确认时间：2026-05-12
- 错误类型：偏好错误（合规）
- 触发端：Code
- 行为描述：v3.0 商品名直写"八字简批 / 紫微批算"，redteam §4.3 指出闲鱼禁止封建迷信，小红书广告规则同样敏感
- ❌ 禁止行为：商品名 / 标题 / 描述使用「算命 / 改运 / 转运 / 化太岁 / 开光 / 改命」；恐吓式 upsell；保证结果
- ✅ 正确做法：改用「传统命盘文化解读 / 人生复盘报告 / 性格职业复盘」；首页加「娱乐与文化参考，不替代法律/医疗/金融/心理咨询」边界声明
- 适用范围：DecodeX_Oracle / DecodeX_Corp
- 来源：redteam §4.3 / §6.2 / DECISIONS Oracle 补充
- 状态：confirmed

## COR-P009 n8n 公网暴露 / Execute Command / 社区节点禁止
- 确认时间：2026-05-12
- 错误类型：流程错误
- 触发端：Code
- 行为描述：v3.0 §9 未明确 n8n 安全前置；redteam §7.3 + n8n 官方安全文档要求多层防护
- ❌ 禁止行为：n8n 公网暴露 / 启用 Execute Command / 启用社区节点 / execution data 保存敏感 payload
- ✅ 正确做法：n8n 走 Tailscale / CF Access；公网入口用极薄 webhook relay（签名 + 时间戳 + 防重放 + 速率 + schema）；每周 `n8n audit`
- 适用范围：DecodeX_Corp（n8n 部署）
- 来源：redteam §7.3
- 状态：confirmed
