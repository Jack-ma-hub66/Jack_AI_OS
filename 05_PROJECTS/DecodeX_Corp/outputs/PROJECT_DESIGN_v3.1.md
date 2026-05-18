# DecodeX 一人 AI 公司 — 完整项目设计方案 v3.1

> 版本：v3.1（基于 Codex 三份审计报告 + 2026-05-12 Boss 拍板修订）
> 上一版：v3.0 Final（2026-05-11，已被本版替代）
> 时区基准：UTC+8（台北 / 上海）
> 修订对照：见 DECISIONS.md §B 与 PROJECT_CORRECTION_LOG.md
> 状态：已 freeze，进入执行（D 线条款除外，待新 VPS + 律师确认）

---

## §0 公司定义

```
公司名：DecodeX
法律实体：暂不注册（2 个月后视现金流定香港 BVI / 美国 LLC）
品牌资产：decodex.cc（Cloudflare 自动续费 ✅）
Boss：Jack（路人甲）
搭档：路人乙（G2 前口头承诺，G2 后必须合同化，见 DECISIONS D9）
财年目标：4 档（保命 $500 / 可持续 $3K / 突破 $10K / Upside $20K — 概率目标）
启动资金：$200（分 3 批注入：Day 1 $80 / Day 30 $60 / Day 60 $60）
最高原则：防漏优先于防错；KYC 物理隔离（D7）；D 线物理隔离（D1）
```

## §1 业务线优先级（含 D 线）

| 优先级 | 柱 | 子域名 | 主品收入模式 | 12 月目标月利（概率） |
|---|---|---|---|---|
| **P1** | **Oracle** | oracle.decodex.cc | 传统命盘文化解读 ¥99-599/单（禁用"算命/改运"话术） | $3-8K |
| **P2** | **Trade** | trade.decodex.cc ✅ | 知识付费 + 交易所 IB（首月按 $0 预算） | $5-15K |
| **P3** | **Journal** | YouTube + journal.decodex.cc | 广告分成 + 私域社群订阅（Week 4 前不背收入目标） | $5-10K |
| **P4** | **Relay** | relay.decodex.cc | AI 代做服务（只接已付款 inbound） | $3-8K |
| **P5** | **AI** | ai.decodex.cc | Prompt 包 / Agent 模板 / 工具教程 | $2-5K |
| **P6** | **D 线** | （收入模式 / 域名 / 资金路径全部待法律审查包定义，见 §6） | **待法律审查包**（律师 + Boss 书面确认前不上线） | （冻结期不预估，redteam 红色） |

**Week 4/8/12 砍线 Gate 见 DECISIONS D6**。

## §2 Trade 阶梯定价漏斗

```
免费：trade.decodex.cc 21 页教学（流量入口）
   ↓ $0：邮箱订阅（CRM 起点）
   ↓ $29：Trade Lite Notion 电子书
   ↓ $199：Trade Pro 视频精讲课
   ↓ $899：Trade Society 年度社群
   ↓ $2999：1-on-1 Mentorship 3 月陪跑（限额 5 人）

目标转化率（待真实样本验证，不作 IB 预算依据）：
免费→$29 = 5% / $29→$199 = 15% / $199→$899 = 8% / $899→$2999 = 3%
```

**G2 Gate（Week 4）触发**：60 天内 Trade 无 10 个真实邮箱订阅 → 暂停 $899/$2999 录制（见 D6）。

## §3 四节点物理拓扑（修订自 v3.0 三节点）

### Node 1：Mac mini M4（家 / 台湾原生 ISP）— Boss 控制台
- **角色**：唯一允许登录 Tier-1 KYC 账号的设备
- **常驻**：AdsPower Tier-1 profile（YT 主频道 / Wise / Bybit / Stripe）/ Mingli 本地推理 / Ollama Qwen2.5-7B / Claude Code / 1Password
- **IP 用途**：主品牌 YT 后台、Wise、Stripe、Shopify

### Node 2：Windows → Ubuntu Server 24.04（中国大陆机房）— 国内业务专用
- **硬件**：i7-11700 / 32G / GTX1060 6G
- **常驻**：Docker / Postgres 16（业务 + 财务）/ Qdrant / Redis / n8n / Playwright Grid（最大 2-3 并发，禁 10+）/ SD1.5（禁 SDXL，6G VRAM 不足）/ Grafana+Loki+Prometheus / MinIO
- **🚫 永不部署**：YT 业务 / 加密钱包 / 翻墙 / 灰产任何文件（D 铁律）
- **Qwen + Playwright + SD 不可同机峰值**：分队列错峰

### Node 3：Buffalo VPS（美国 / 104.168.115.209）— 主品牌跨境出口（职责瘦身，见 DECISIONS D3）
- **配置**：Xeon Gold 5220R × 3 / 3.8G / 50G / Debian 12
- **保留**：
  - Xray 跨境出口（YT/X/TikTok 登录代理）
  - trade.decodex.cc Nginx（已部署）
  - Telegram Bot（**仅主品牌通知**，不含 D 线收单）
- **从此节点迁出**：
  - Postgres 流复制副本 → 改 pg_dump 加密备份到 Backblaze B2
  - Relay 海外单 worker → Mac mini 或新 VPS（按容量评估）
  - 灰产 D 线 worker → 见 Node 4
- **🚫 禁止**：D 线任何资产、Tor 出口、独立钱包

### Node 4：D 线节点 — 待法律审查包（占位，不在主战略列执行细节）
- **状态**：🔴 **冻结** — 三条件（DECISIONS D1）全部满足前不存在任何配置、采购、上架动作
  1. 律师（大陆 + 香港）书面意见到位
  2. Boss 签署「法律风险自担」决策记录
  3. 该独立 VPS 选型完成
- **隔离基本原则**（仅作 high-level 隔离规则，不展开任何执行细节）：与 Buffalo / Mac / Windows / 主品牌 KYC 主体 / 主品牌资金通道 物理隔离；详见 DECISIONS D1 + D7
- **执行细节**：当前主战略**故意不列**节点配置、承载内容、域名、Bot、钱包、代理链路、收单路径等任何操作性字段；这些将在律师审查包内独立成文，并由 CRO 一票否决审批后才能进入 SCHEDULE
- **原因**：遵守 PROJECT_CORRECTION_LOG.md COR-P003（主战略禁止含可执行的高法律风险指令）

### 网络分流（更新代理矩阵）

```
台北静态 ISP SOCKS5 ✅（已续费）+ 5 节点 Reality 链式出口
配置位置：~/Jack_AI_OS/02_TOOL_SYSTEM/proxy_configs/

| 平台 | 出口 IP | 反指纹 profile |
|---|---|---|
| YouTube 主频道 / Wise / Stripe | 家中台湾 ISP（直连） | AdsPower #1 |
| TikTok Shop US / Shopify | Buffalo VPS | AdsPower #2 |
| 抖音/小红书/闲鱼 KYC | iPhone 4G + 家 WiFi | 真机 |
| 抖音/小红书 矩阵号 | Windows 大陆机房出口 | AdsPower #3-#15 |
| X / Twitter 多号 | 住宅代理 / 每号一 IP | AdsPower #16-#30 |
| D 线 | （冻结，三条件满足前无配置） | （冻结，三条件满足前无 profile） |
| 加密钱包 | 仅主品牌合规交易，独立 Brave + 硬件钱包 |
```

## §4 Agent 架构（MVP 12，见 DECISIONS D8）

**MVP 阶段（当前）**：L0 Boss + 11 Agent（详见 AGENTS.md）
**扩展 Gate**：完成 5 项 drill 后才能扩 L4-L6
**200+ 蓝图**：保留为长期目标，不计入 MVP 范围

```
L0 Boss
 ↓
L1 C-Suite + 业务 VP（MVP 12）
 ├── CEO / CRO / CCO / CTO / COO / CMO / B-Auditor
 └── VP-Oracle / VP-Trade / VP-Journal / VP-Relay / VP-AI
 ↓
L2+ Manager / Specialist / Worker（Gate 后扩展）
```

详见 `~/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/AGENTS.md`。

## §5 决策权限矩阵

| 级别 | 含义 | 金额上限 |
|---|---|---|
| P0 | Agent 全权 | < $5 |
| P1 | Manager | < $50 |
| P2 | VP | < $300 |
| P3 | C-Suite | < $1000 |
| P4 | **Boss 拍板** | 任意 |

**CRO 一票否决权**（DECISIONS D8）：法律 / 账号 / KYC / 跨 Tier / D 线启停

## §6 D 线物理隔离铁律（修订 v3.0 §6）

### 主品牌外层（合规壳，不含 D 线）
- DecodeX Trade（交易框架 + 联盟，按 Bitget 联盟规则合规推广）
- DecodeX Relay（AI 代做）
- 收款：Wise / Stripe / 个人收款 / Bybit 卡（**仅主品牌，禁 D 线**）
- 用 KYC 主体

### D 线（待法律审查包 — 主战略不列执行细节）

🔴 **冻结**：DECISIONS D1 三条件（律师 + Boss 签字 + 独立 VPS）全部满足前，D 线**不存在**主战略层面的业务方向描述、域名、身份方案、资金链路、Telegram 配置、Bot/token 安排或任何执行细节。

**主战略此处仅声明高层级隔离要求**（不展开任何操作性字段）：
- 与 Buffalo / Mac / Windows / 主品牌 KYC 主体 / 主品牌资金通道 物理隔离
- 与 .decodex.cc 任何子域 / 任何 Tier-1 KYC 账户 永久无关联
- 任何更细化的方案（业务包装名头、资金路径、身份方案、节点配置）= **法律审查包内单独成文**，由律师 + Boss + CRO 三方签字后才能进入 SCHEDULE

**原因**：遵守 PROJECT_CORRECTION_LOG.md COR-P003；保留 CAND-002 红色风险观察前提下，主战略不留可被执行者直接照搬的操作清单。

### 法律红线（CRO 强制，与原 v3.0 §6 红线合并强化）
- ❌ 国内服务器跑博彩 / 翻墙工具销售 / 涉未成年内容 / 暴力 / 毒品
- ❌ 用 KYC 主体签 D 线合同
- ❌ 国内合规电商 + 灰产共用 KYC
- ❌ 大额 USDT 入境换汇
- ❌ 三跳混币 / Bybit 卡消费 / Wise OTC（v3.0 原文已删除，被 redteam §4.2 标为 AML 规避痕迹）
- ❌ 直接销售翻墙工具 / 代搭建 / 收灰产客户 / 承诺解封
- ❌ 在 Boss + 律师书面确认前执行 SCHEDULE 内 D 线条目

## §7 技术栈（降载版）

| 层 | 组件 | 用途 | 成本 | 变更说明 |
|---|---|---|---|---|
| 编排 | n8n self-host | 工作流引擎 | $0 | 禁公网暴露，走 Tailscale/CF Access；禁 Execute Command；execution data 不留敏感 payload；每周 `n8n audit` |
| 编排 | Claude Code | Boss 主控台 | 已订阅 | — |
| LLM | Claude Pro / Opus 4.7 | 战略 / 长文 / 代码 | 已订阅 | — |
| LLM | GPT Plus / GPT-5 | 翻译 / 反译 / Sora | 已订阅 | — |
| LLM | Ollama + Qwen2.5-7B | 本地批量 | $0 | **改 Mac mini 或夜间批处理**，不与 Playwright/SD 同跑 |
| 存储 | Postgres 16 | 业务 + 财务 | $0 | **每日 pg_dump → B2**（不流复制 Buffalo） |
| 存储 | Qdrant | 向量库 | $0 | mem_limit 必加 |
| 存储 | Redis | 队列 / 缓存 | $0 | — |
| 存储 | MinIO | S3 兼容素材库 | $0 | — |
| 浏览器 | Playwright | 自动化 | $0 | **最多 2-3 并发**（v3.0 写 10+ 被 redteam §7.1 否决） |
| 浏览器 | AdsPower 免费版 | 反指纹 | $0 | — |
| 视觉 | SD1.5（**禁 SDXL**） | 1060 出图 | $0 | GTX1060 6G 不足以稳定跑 SDXL |
| 视觉 | Sora (GPT Plus) | 短视频 B-roll | 已订阅 | — |
| 音频 | ElevenLabs Creator | 中英双语克隆音 | $22/月 | EP1 降规后英文版砍，按需续 |
| 音频 | Whisper | 字幕识别 | $0 | — |
| 剪辑 | CapCut Pro | 批量剪辑 | 180 天试用 | — |
| 监控 | Grafana / Loki / Prometheus | 全栈监控 | $0 | — |
| 通信 | Telegram Bot | 主品牌通知 | $0 | **D 线收单走 D 线独立 Bot，不与主品牌共享** |
| 密钥 | 1Password | 密码管理 | 已订阅 | — |
| 网络 | Cloudflare | DNS / Email / Tunnel | $0 | DNS 每周导出 / Registrar lock |
| 网络 | Tailscale | 三节点组网 | $0 | n8n 仅内网，公网走 webhook relay |
| 代理 | Xray + 台北 ISP + 5 Reality | 已就绪 ✅ | $0 | — |
| 短信 | SMS-Activate / 5sim | 接码 | 按用量 | — |

## §8 数据库 Schema（核心 4 表）

```sql
-- 复式财务账
CREATE TABLE ledger_entries (
  id BIGSERIAL PRIMARY KEY,
  ts TIMESTAMPTZ NOT NULL,
  account VARCHAR(64) NOT NULL,
  amount NUMERIC(20,8) NOT NULL,
  currency VARCHAR(8) NOT NULL,
  business_line CHAR(1) CHECK (business_line IN ('O','T','J','R','A','D','OPS')),
  tier INT CHECK (tier IN (1,2,3)),
  ref_id VARCHAR(128),
  notes TEXT
);

-- 内容流水线
CREATE TABLE content_pipeline (
  id BIGSERIAL PRIMARY KEY,
  business_line CHAR(1),
  platform VARCHAR(32),
  topic_id VARCHAR(64),
  stage VARCHAR(32) CHECK (stage IN ('queued','claimed','running','needs_review','done','failed','cancelled')),
  assignee_agent VARCHAR(64),
  lease_until TIMESTAMPTZ,
  idempotency_key VARCHAR(128),
  retry_count INT DEFAULT 0,
  meta JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent 任务日志
CREATE TABLE agent_tasks (
  id BIGSERIAL PRIMARY KEY,
  agent_id VARCHAR(64),
  task_type VARCHAR(64),
  input JSONB,
  output JSONB,
  tokens_in INT,
  tokens_out INT,
  cost_usd NUMERIC(10,6),
  duration_ms INT,
  status VARCHAR(16),
  ts TIMESTAMPTZ DEFAULT NOW()
);

-- 风险事件
CREATE TABLE risk_events (
  id BIGSERIAL PRIMARY KEY,
  severity VARCHAR(8),
  category VARCHAR(32),
  description TEXT,
  detected_by VARCHAR(64),
  resolution TEXT,
  ts TIMESTAMPTZ DEFAULT NOW()
);
```

**状态机强制**（DECISIONS D8）：`content_pipeline.stage` 五态流转，禁绕过；写入只走 API，Agent 不直改 DB。

## §9 n8n 工作流（首批 8 个，安全前置）

部署前提：n8n 走 Tailscale 内网；公网入口用极薄 webhook relay（签名 + 时间戳 + 防重放 + 速率限制 + schema 校验）；禁 Execute Command 节点；禁社区节点；execution data 不留敏感 payload。

1. **WF-DailyBrief** — 每日 09:00/21:00 (UTC+8) → CEO Agent → Telegram 推 Boss
2. **WF-TopicMining** — 每日 03:00 抓 YT/X/Reddit/HN → Qdrant → 排队
3. **WF-ScriptPipeline** — Boss 选题 trigger → M-Script 全流程 → CCO 审 → Telegram
4. **WF-VideoProduction** — 稿件 approved → 配音 → 剪辑 → 字幕 → 缩略图 → 待发布
5. **WF-CrossPost** — 视频 ready → 切片 → 多平台分发（EP1 砍切片后此 WF 暂停）
6. **WF-OracleListing** — 闲鱼 + 小红书自动上架 + 价格监控 + 自动回消息
7. **WF-FinancialDaily** — 每日 23:00 拉取所有平台 → 入账 → 异常报警
8. **WF-RiskScan** — 每小时扫描 IP / Cookie 一致性 / 异地登录 / 平台警告

## §10 预算分配（$200，分 3 批，刚性现金红线）

| 批次 | 时机 | 项 | $ |
|---|---|---|---|
| **Batch 1** | Day 1-7 ($80) | SMS-Activate 充值 | $20 |
|  |  | ElevenLabs Creator 1 月 | $22 |
|  |  | ~~D 线 .xyz 域名~~ **已从 Batch 1 移除**（DECISIONS D1 三条件未满足前不在预算内） | $0 |
|  |  | Cloudflare 第二域 | $0 |
|  |  | 应急 | $38 |
| **Batch 2** | Day 30 ($60) | ElevenLabs 续 | $22 |
|  |  | 住宅代理（922S5/Bright Data） | $15 |
|  |  | Midjourney Basic | $10 |
|  |  | 应急 | $13 |
| **Batch 3** | Day 60 ($60) | ElevenLabs 续 | $22 |
|  |  | AdsPower 50 profiles | $9 |
|  |  | TG Premium | $5 |
|  |  | 第二批 SMS | $10 |
|  |  | 应急 | $14 |

**现金红线**：余额 < $80 → 禁非直接成交支出；余额 < $40 → 只保留域名 / 收款 / 手动交付。
**自给自足时点**：Day 60。Week 2 Oracle 第一单覆盖 SMS 成本。

## §11 风险与防封

### 平台封号防御
- 指纹独立：每 profile 独立 UA / canvas / WebGL / 字体 / 时区
- 行为节律：worker 强制随机间隔（30-180s），日活动 ≤ 4h
- 冷启动：新号 7 天纯浏览，第 8 天起逐步互动
- IP-Cookie-设备一致性：登录前 CRO 校验三元组哈希
- Tier-1 双因子：YubiKey / TOTP

### 灾备（升级版）
- Postgres 每日 pg_dump 加密 → Backblaze B2（首 10G 免费）；**Buffalo 不再做流复制**
- 关键密钥 Shamir 拆分 3-of-5：1Password + 纸质 + 信任亲属（封存）
- **Restore drill**：G1 Gate 前必须完成 5 项（DECISIONS D8）
- **黑天鹅预案**：托管 Windows 被查封 → 24h Mac mini 临时顶上 → 48h 重租海外服务器恢复（runbook 待补，见"待执行"清单）

## §12 阶段性 Gate（含砍线触发）

| Gate | 时间 | 通过标准 | 不达标砍线（见 D6） |
|---|---|---|---|
| G1 | Week 2 (2026-05-25 周一) | 三节点联通 + 三核心 Agent 跑通 + Oracle 首单 + 5 项 restore drill | — |
| G2 | Week 4 (2026-06-08 周一) | 月流水 ≥ $300 + EP1 上线 + 路人乙合同化重评 | 月流水 < $300 触发砍线 |
| G3 | Week 8 (2026-07-06 周一) | 月流水 ≥ $500 + 自动化覆盖 70% 执行 | 月流水 < $500 触发砍线 |
| G4 | Week 12 (2026-08-03 周一) | 月流水 ≥ $2000 + 5 柱全部跑通 | 月流水 < $2000 触发砍线（v3 失败重写） |

## §13 BIBLE — DecodeX Journal 人设（与 v3.0 §13 一致，未修订）

```yaml
人设:
  男主: Jack（路人甲）真人；立场=升维思考、第一性原理、反智商税
  女主: 路人乙真人搭档；立场=提问者 / 翻译者 / 怀疑论者

口吻禁区:
  - 禁用 "三天爆款 / 月入十万 / 副业风口"
  - 禁用过度情绪化标题
  - 禁用纯结论无论证
  - 禁用 emoji 装饰（除内容需要）

口吻必须:
  - 上帝视角 / 升维 / 第一性原理
  - 用具体例子（搬石头 / 网约车 / Minecraft / 斯多葛 / Elon）
  - 三段式：定义 → 拆解 → 钩子
  - 每期留下钩子衔接下期
  - 直接、主观、不虚伪；夸到底、骂到底

节奏（EP1 降规后）:
  - EP1：中文 6-8 分钟单版（D5 决策）
  - 稳定后：周更 1 期（中文 15-22 分钟）
  - 路人乙每期 2-3 分钟"提问者"切片
```

## §14 EP1 完整生产流（降规版，详见 SCHEDULE_14day.md）

```
1. Boss 在 queue.md 勾选选题 (5min)               ← mm.txt = EP1，已勾
2. M-Research 输出选题数据卡 (auto, 10min)
3. S-Skeleton 出 3 版结构 (auto, 5min) → Boss 选 (3min)
4. S-AnchorMatcher 配锚点 + 例子 (auto, 5min)
5. S-Hooker 出 5 版钩子 (auto, 5min) → Boss 选 (2min)
6. Opus 写 1500-2000 字初稿（**降规后**） (auto, 5min)
7. S-StyleGuard 校验 + 标红 (auto, 3min) → Boss 微调 (10min)
8. CCO 终审 (auto, 5min)
9. D9 试拍 3 分钟成片（**D5 决策强制**）
10. Boss + 搭档录音 / 录像（**6-8 min 主体**）
11. S-BRoll 自动配 B-roll (auto, 10min)
12. S-Editor 剪映批处理：转场 + 字幕 + BGM (auto, 20min)
13. S-Thumbnailer 出 3 版缩略图 (auto, 10min) → Boss 选 (2min)
14. M-Distribution 中文版上传 + 1 小红书图文（**砍英文版 + 9 抖音 + 12 X**）
```

## §15 紧急事项处置状态

| # | 事项 | 状态 |
|---|---|---|
| 🟢1 | 台北静态 ISP 续费 | ✅ 已续费 |
| 🟢2 | Cloudflare decodex.cc 自动续费 | ✅ 已确认 |
| 🟡3 | trade.decodex.cc 证书检查 | 🟡 Agent 自动 cron 检查（D3 部署） |
| 🟡4 | OpenClaw Discord Bot LaunchAgent 验证 | 🟡 D5 验证 |
| 🟡5 | MASTER_PROFILE.md 补完 | 🔴 D1 (2026-05-12 周二) Boss 亲自补完 |
| 🟡6 | GitHub push 失败修复 | 🟡 D1-D2 Agent 修复 |
| 🟡7 | 7 个未完成 SOUL.md | 🟡 D7-D8 滚动产出 |
| 🆕8 | D 线新 VPS 选型 + 律师确认 | 🔴 阻塞项，Boss 决定 |
| 🆕9 | Finance runbook（Beancount 账本结构 / 凭证 / 月审） | 🔴 D11 之前补完 |
| 🆕10 | DR runbook（5 项 restore drill + RPO/RTO + 密钥 + DNS） | 🔴 G1 前完成 |
| 🆕11 | Agent ESCALATION.md（CRO 否决权 / 升级规则） | 🔴 G1 前完成 |
| 🆕12 | Boss unavailable runbook（暂缓写入 DECISIONS，待 Boss 商议） | 🟡 candidate |

---

**文档结束。** 完整执行计划见 `SCHEDULE_14day.md`（同时升级到对应版本）。
