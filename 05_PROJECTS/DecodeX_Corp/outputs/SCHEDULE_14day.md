# DecodeX 14 天倒排计划表（→ EP1 上线 2026-05-25）

> 倒推目标：EP1「钱到底是什么」**2026-05-25（周一）18:00 UTC+8** 上线 YouTube
> 起点：**2026-05-11（周一，UTC+8）**，已完成战略定稿 + 19 项文件迁移 + Codex 审计反馈落地（2026-05-12）
> 工作日：14 天（含周末，Boss 已确认可工作）
> Boss 投入：每天 ≤ 10h（redteam §10.3 健康约束 candidate，待 Boss 拍板再 hard-cap）
> 时区基准：UTC+8（台北 / 上海）
> 配套文档：`PROJECT_DESIGN_v3.1.md` / `DECISIONS.md`

---

## 总览（甘特图，修正后日历）

```
Day  日期(UTC+8)   阶段                          关键产出
─────────────────────────────────────────────────────────
D0   5/11 周一    ✅ 战略定稿 + 文件迁移         v3.0 → v3.1 + 19 项迁移完成
D1   5/12 周二    Codex 审计落地 + Oracle 首单   v3.1 / DECISIONS 修订 / 小红书首图文 / GitHub 修复
D2   5/13 周三    项目元数据补完 + Trade 联盟    AGENTS 重写 / OKX IB 申请
D3   5/14 周四    Mac 控制台 + Tailscale         Mac AdsPower / Mac↔Buffalo Tailscale
D4   5/15 周五    Windows 上架机房               重装 Ubuntu 24.04 准备
D5   5/16 周六    Docker 全栈部署                n8n+Postgres+Qdrant+Redis+Ollama 拉起
D6   5/17 周日    IB 接入 + 4 SOUL.md 起草       trade.decodex.cc IB 链接 / 4 个 SOUL 初稿
D7   5/18 周一    稿件创作 D1 + 剩余 SOUL        EP1 钩子 5 版 / 结构 3 版 / 3 个 SOUL
D8   5/19 周二    稿件初稿（降规至 1500-2000 字）  6-8 min 中文稿件初稿
D9   5/20 周三    稿件定稿 + 试拍 3 min          终审稿 / 搭档对台词 / 3 min 试拍成片（D5 强制）
D10  5/21 周四    录制 Day 1（6-8 min 中文单版）   主体视频
D11  5/22 周五    补拍 + 配音（中文，砍英文）     补拍 / 配音
D12  5/23 周六    剪辑（中文版）                 中文版剪辑完成
D13  5/24 周日    缩略图 + SEO + 1 小红书图文     缩略图 A/B 3 版 / 标题 / 1 小红书图文
D14  5/25 周一    🎯 EP1 上线 18:00              YouTube 首发 + 私域引流入口
```

**日历校正（vs v3.0 错误）**：
- v3.0 写 5/11=周日 ✗ → 实际 = 周一 ✓
- v3.0 写 5/12=周一 ✗ → 实际 = 周二 ✓
- v3.0 写 5/25=周日 ✗ → 实际 = 周一 ✓
- EP1 黄金时段假设原基于"周日"，已校准为周一 18:00（UTC+8）

---

## D1 — 2026-05-12（周二，UTC+8）：Codex 审计落地 + Oracle 立即变现

### Boss 任务（早 9:00-12:00）
- [ ] 补完 `~/Jack_AI_OS/01_PERSONAL_MEMORY/MASTER_PROFILE.md`（个人详细档案）
- [ ] Oracle 第一单：小红书发首条图文「传统命盘文化解读 + 人生复盘报告 ¥99 起」
  - **合规边界**：禁用「算命/改运/转运」话术；首图加「娱乐与文化参考，不替代法律/医疗/金融/心理咨询」边界声明
  - 用已有 Mingli 项目的批算能力
  - 引流到 微信小号 / Telegram
- [ ] 闲鱼挂 3 个商品：
  1. ¥99「传统八字命盘简批 + 流年提醒」
  2. ¥299「八字+紫微双系统命盘完整文化解读（2000 字报告）」
  3. ¥599「3 月人生复盘陪跑」

### Agent 任务（已在 2026-05-12 本会话完成）
- [x] Codex 三份审计报告落地：DECISIONS 修订 / PROJECT_DESIGN v3.1 / SCHEDULE 日历修正 / EP1 降规
- [x] auto-memory 同步翻墙红线翻转
- [ ] 修复 GitHub push 失败（检查 SSH 密钥 / 远程 URL / push_safe.sh）
- [ ] 检查 OpenClaw Discord Bot LaunchAgent 状态
- [ ] cron 设置：trade.decodex.cc 证书每日检查

### Gate
- [ ] Codex 审计修复完成 + 复审通过
- [ ] MASTER_PROFILE.md 完成（含 UTC+8 时区已写入）
- [ ] Oracle 至少 1 个商品上架

---

## D2 — 2026-05-13（周三）：项目元数据补完 + Trade 联盟

### Boss 任务
- [ ] 决策：Windows 上架机房具体日期（联系机房）
- [ ] **决策：D 线 VPS 选型 + 律师候选**（阻塞项，影响 D 线启动时点）
- [ ] OKX IB 申请（用 Wise + KYC）— **IB 收入按 $0 预算，redteam §1.3 + §6.3**
- [ ] Bitget IB 申请（同上）

### Agent 任务
- [ ] AGENTS.md 重写为 MVP 12（已完成本会话）
- [ ] update_context.sh 修改不覆写 AGENTS.md
- [ ] 启动 docker-compose 草稿（暂存 outputs/）

### Gate
- [ ] 项目六件套齐全（含 CONTEXT_PACK / PROJECT_CORRECTION_LOG / DESIGN_DISPUTES）
- [ ] 2 个 IB 申请已提交（首月 $0 预算）

---

## D3 — 2026-05-14（周四）：Mac 控制台 + Tailscale

### Boss 任务
- [ ] Mac mini 装 AdsPower → 配置 5 个 profile：
  - Profile 1：YT 主频道（家中台湾 ISP，无代理）
  - Profile 2：TikTok Shop US（Buffalo VPS 代理）
  - Profile 3：抖音 KYC（iPhone 蜂窝热点）
  - Profile 4：小红书 KYC（iPhone 蜂窝热点）
  - Profile 5：闲鱼 KYC（同上）
- [ ] Tailscale 三节点：Mac mini ↔ Buffalo VPS 联通测试

### Agent 任务
- [ ] 写 trade.decodex.cc 证书每日检查 cron 脚本
- [ ] 备份现有 OpenClaw + DecodeX 配置到 GitHub

### Gate
- [ ] AdsPower 5 profile 就绪
- [ ] Mac ↔ Buffalo Tailscale 连通

---

## D4 — 2026-05-15（周五）：Windows 上架机房

### Boss 任务
- [ ] 备份 Windows 现有数据到移动硬盘
- [ ] 协调机房上架（具体时间地点）
- [ ] 上架后远程协助：U 盘启动 → 装 Ubuntu Server 24.04 LTS

### Agent 任务
- [ ] 准备 cloud-init 自动化脚本（SSH 密钥 / Docker / Tailscale 自动装）

### Gate
- [ ] Windows 进机房通电
- [ ] Ubuntu 装机完成

---

## D5 — 2026-05-16（周六）：Docker 全栈部署（降载版）

### Agent 任务（Boss 监督）
- [ ] SSH 进托管 Ubuntu，执行 docker-compose（首版）：
  ```yaml
  services:
    postgres:    # 16，mem_limit 1G
    qdrant:     # mem_limit 1G
    redis:      # mem_limit 256M
    n8n:        # 仅内网 Tailscale，禁公网；禁 Execute Command；禁社区节点
    minio:
    ollama:     # qwen2.5:7b，夜间批处理，不与 Playwright/SD 同跑
    sd-webui:   # SD1.5（禁 SDXL）
    grafana:
    loki:
    prometheus:
    caddy:      # 反向代理 + 自动 SSL
  ```
- [ ] Tailscale 加入 Windows 节点
- [ ] 拉取 Qwen2.5-7B-Instruct 模型
- [ ] 拉取 SD1.5 模型（替代 SDXL）
- [ ] 完成 5 项 restore drill（G1 Gate 要求，DECISIONS D8）：
  1. Postgres pg_dump 恢复测试
  2. n8n workflow replay
  3. Telegram token rotate
  4. Cloudflare DNS restore
  5. Playwright 账号冷启动回滚

### Gate
- [ ] 所有容器健康
- [ ] Mac mini 能通过 Tailscale 访问 Windows Postgres
- [ ] 5 项 drill 全部通过（不通过 = G1 Gate 不过）

---

## D6 — 2026-05-17（周日）：IB 接入 + 4 SOUL 起草

### Boss 任务
- [ ] 审批 OKX/Bitget IB 链接（一般 3-5 天审批通过）
- [ ] trade.decodex.cc 嵌入 IB 链接 + **风险提示**（合规要求）
- [ ] 决定 EP1 D10 拍摄具体时间（早 9:00 推荐）

### Agent 任务
- [ ] 起草 4 个 SOUL.md（CCO 主编 / CTO 架构 / COO IT 运维 / CMO 发布专员）
  - 模板沿用 OpenClaw SOUL.md 规范
  - 存入 `~/Jack_AI_OS/05_PROJECTS/OpenClaw/outputs/souls/`（需先建该目录）

### Gate
- [ ] IB 链接已嵌入网站（含风险提示）
- [ ] 4 个 SOUL 初稿完成

---

## D7 — 2026-05-18（周一）：稿件创作 D1 + 剩余 SOUL

### Boss 任务（早 9:00-13:00 + 晚 21:00 与搭档对接）
- [ ] 与路人乙对接：分配 EP1 台词比例（建议 男 80% / 女 20%）
- [ ] 决定 EP1 钩子 1 个 → 通知 agent 写稿
- [ ] 决定结构（沿用 mm.txt 三段式）

### Agent 任务
- [ ] M-Script 流水线：
  - S-Hooker 出 5 版钩子
  - S-Skeleton 出 3 版结构（定义→拆解→钩子）
  - S-AnchorMatcher 配 3 个锚点（降规版，斯多葛 / Minecraft / Elon）
- [ ] 起草剩余 3 个 SOUL（社群客服 / 中文写手 / 技术总监）

### Gate
- [ ] 钩子定稿
- [ ] 结构定稿
- [ ] 7 个 SOUL 初稿全部完成

---

## D8 — 2026-05-19（周二）：稿件初稿（降规至 1500-2000 字）

### Agent 任务
- [ ] Claude Opus 写 **1500-2000 字初稿**（6-8 min 中文单版，降规自 v3.0 4500 字）
- [ ] S-StyleGuard 用 BIBLE.md 校验 + 标红
- [ ] ~~S-Translator 出英文初稿~~ **已砍（D5 决策）**

### Boss 任务（晚）
- [ ] 审稿 → 修改（目标修改率 < 20%）

### Gate
- [ ] 中文稿件初稿（6-8 min 长度）

---

## D9 — 2026-05-20（周三）：稿件定稿 + 试拍 3 min（D5 强制缓冲）

### Boss 任务
- [ ] 终审中文稿件，确认每一段
- [ ] 与路人乙预读对台词 1-2 遍
- [ ] **试拍 3 min 成片**（D5 决策强制；不通过则推迟 D10 / 改 solo 版）
- [ ] 拍摄环境就绪：环形灯 / 麦克风 / 纯色背景 / 朴素服装

### Agent 任务
- [ ] S-Thumbnailer 出 3 版缩略图候选（降自 5 版）
- [ ] S-BRoll 从 `b_roll/素材/` 选取相关素材

### Gate
- [ ] 中文稿件 freeze
- [ ] 试拍 3 min 成片通过（**不通过 = 触发 EP1 Plan B**，见末尾备选）

---

## D10 — 2026-05-21（周四）：录制 Day 1（6-8 min 双人主体）

### Boss + 搭档任务（早 9:00-12:00 状态最佳）
- [ ] 录制 **6-8 min 主体内容**（降自 18 min）
- [ ] NG 不超 5 次/段
- [ ] 录完立即用 Whisper 出粗字幕，检查关键句是否说清

### Gate
- [ ] 6-8 min 主体内容录完
- [ ] 音视频备份（4K + 双 SD + 外置录音笔）

---

## D11 — 2026-05-22（周五）：补拍 + 配音（中文）

### Boss 任务
- [ ] 看 D10 素材，标记需要补拍的段落
- [ ] 补拍（如需）

### Agent 任务
- [ ] S-VoiceCloner 克隆中文音色（ElevenLabs Creator $22 已支付）
- [ ] ~~英文 voice over~~ **已砍（D5 决策）**

### Gate
- [ ] 所有镜头素材完整
- [ ] 中文音轨

---

## D12 — 2026-05-23（周六）：剪辑（中文版）

### Agent 任务
- [ ] S-Editor 剪映批处理：
  - 自动加中文字幕
  - 转场 / 节奏切点
  - BGM（建议轻量电子或氛围）
  - 关键句加强调
- [ ] B-roll 智能插入（每 30s 一处）

### Boss 任务（晚 30 分钟）
- [ ] 审剪辑节奏
- [ ] 选定 BGM

### Gate
- [ ] 中文版剪辑导出 1080p

---

## D13 — 2026-05-24（周日）：缩略图 + SEO + 1 小红书图文（**砍英文版 + 批量切片**）

### Agent 任务
- [ ] S-SEO 出标题 3 版 + 描述 + 标签（仅中文）
- [ ] M-Distribution 准备：
  - **1 篇小红书图文**（核心金句 9 图）
  - ~~9 条抖音切片~~ **已砍（D5 决策）**
  - ~~12 条 X 推文~~ **已砍（D5 决策）**
  - ~~英文版~~ **已砍（D5 决策）**

### Boss 任务
- [ ] 终选缩略图（A/B 3 版）
- [ ] 终选标题

### Gate
- [ ] 中文版上传 YT 后台（**手动发布**，不预约）
- [ ] 1 小红书图文素材打包就绪

---

## D14 — 2026-05-25（周一）：🎯 EP1 上线 18:00 (UTC+8)

### Boss 任务
- [ ] **18:00 UTC+8 手动确认 YouTube 发布**（不用预约功能，手动发更准时）
- [ ] 同步发布 1 篇小红书图文
- [ ] 私域引流：在视频描述 + pinned comment 放 Telegram 群链接
- [ ] 全程在线 4-6 小时回评论（前 6h 是 YT 算法关键期）

### Agent 任务
- [ ] M-Community 24h 监控评论 + 自动回复（敏感问题升级 Boss）
- [ ] B-Auditor 启动首日数据看板：播放 / 时长 / 订阅 / 收入
- [ ] 实时通过 Telegram Bot 推 Boss 每小时数据

### Gate（降规后，硬指标改为数据采集）
- [ ] EP1 中文版全网首发完成
- [ ] 完播率 + CTR + 留存曲线数据采集
- ~~私域 Telegram 群 ≥ 30 人~~ → 改为**采集真实订阅人数**（不设硬目标）

---

## 平行不阻塞 EP1 的赛道

### Oracle 持续放量（D2 → D14）
- 每日小红书 1 条图文（传统命盘文化科普，**禁封建迷信话术**）
- 闲鱼商品维护 + 自动回消息
- **目标 D14：累计成交 5 单 ≥ ¥500**（达不到触发 Week 4 砍线评估）

### D 线灰产试水 — **⛔ 全部冻结，待新 VPS + 律师确认后启动**（v3.0 D7 起的试水条目作废）

### 7 个 SOUL.md 补完（D7-D8 滚动）
- 不阻塞，但是 D7 必须开始
- D8 全部初稿完成

---

## EP1 Plan B（D9 试拍不通过触发）

| 情况 | 备选 |
|---|---|
| 路人乙不可用 | EP1 改 solo 版（旁白 + 字幕模拟提问，Boss 单人出镜） |
| 设备故障 | iPhone 4K + 外接麦 |
| D9 试拍 NG 频繁 | EP1 缩到 3-5 min；再不通过推迟 5/26 周二 |
| 剪辑失败 | 砍 BGM + 砍特效，纯字幕 + B-roll |
| YT 预约/手动发布二选一 | 锁定**手动发布**（D14 18:00 UTC+8） |

---

## Week 4/8/12 砍线表（DECISIONS D6 落地）

| 时间点 (UTC+8) | 触发条件 | 砍掉 | 保留 |
|---|---|---|---|
| Week 4 = 2026-06-08 周一 | 月流水 < $300 或 Oracle < ¥500 | D 线 / 英文版 / 9 抖音切片 / 12 X 推文 / Midjourney / 额外代理 / Trade 付费课录制 | Oracle 手动接单 / Journal 单期 / Trade 免费页 / 账本 |
| Week 8 = 2026-07-06 周一 | 月流水 < $500 或邮箱订阅 < 100 | Trade Pro / Trade Society / AI prompt 包 / Relay 主动获客 / 200+ Agent 扩建 | 最赚钱单条服务线 + 每周一条内容 |
| Week 12 = 2026-08-03 周一 | 月流水 < $2,000 | 5 柱叙事 / D 线 / 复杂 n8n 自动化 / 双语频道 | 经验证付费 offer + 1 分发渠道 + 1 CRM |

**砍线由 B-Auditor 在每个 Gate 日自动计算流水触发，不依赖 Boss 主观判断。**

---

## 路人乙合同化 Gate（DECISIONS D9）

- **G2 = 2026-06-08 周一** 必须重评：固定出镜费 or 频道净收入 % or 退出机制；肖像授权同步成文
- **不重评 = 触发 Week 4 砍线评估**（项目伙伴关系视为高风险未处理项）

---

## 风险与备选（强化版）

| 风险 | 应对 |
|---|---|
| 搭档档期临时变动 | EP1 推迟到 5/26 周二 18:00 (UTC+8)；或改 solo 版 |
| Windows 上架延迟 | 服务部署延后，但不阻塞 EP1（Mac mini 临时跑） |
| OKX/Bitget IB 审批被拒 | 改用 Binance / Bybit IB；首月 IB 按 $0 预算 |
| 录制设备故障 | iPhone 4K + 外接麦 |
| 大陆机房不允许装 Ubuntu | 改用 Windows Server 2022 + WSL2 + Docker Desktop |
| D9 试拍不通过 | EP1 缩到 3-5 min；再不通过推迟 5/26 周二 |
| D 线律师确认延迟 | D 线全部冻结，不影响主线 |
| 5 项 restore drill 失败 | G1 Gate 不过；阻塞 200+ Agent 扩展 |

---

## D14 完成定义（降规版）

到 5/25 23:59 UTC+8，应同时满足：
- [ ] DecodeX 中文版 EP1 全网首发上线
- [ ] Oracle 累计 ¥500+ 现金流
- [ ] 三节点物理基础设施全部联通（D 线 Node 4 不计入此 Gate）
- [ ] 7 个 C-Suite SOUL.md 就位（MVP 12 中的核心 7 个）
- [ ] 私域 Telegram 群有第一批订阅用户（人数采集，不设硬目标）
- [ ] 1 个 IB 链接挂上 trade.decodex.cc（含风险提示）
- [ ] 5 项 restore drill 通过（G1 Gate 强制）

**未达成的，转入 Week 3 任务包重新排期；触发对应砍线评估。**
