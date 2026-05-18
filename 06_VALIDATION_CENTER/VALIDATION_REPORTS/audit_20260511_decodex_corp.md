# DecodeX_Corp 初始化与迁移独立审计报告

审计日期：2026-05-11  
审计方：Codex  
范围：Claude Code 在 2026-05-11 会话中完成的 DecodeX_Corp 项目初始化、文件迁移、状态更新、auto-memory 写入。  
执行边界：只读验证被审计文件；未执行生产代码；仅写入本报告。  

## 总评级：🔴 Fail

结构迁移本身基本通过：19 项迁移、删除项、保留原位项、4 个子项目入口都能被文件系统验证。  

但整体不能给 Pass，原因是存在 5 个硬阻断：

1. DecodeX_Corp 不符合 Jack AI OS 项目标准结构：`CONTEXT_PACK.md` 缺失，`handoff/` 为空。标准结构要求每项目有 `CONTEXT_PACK.md`，见 `/Users/jack/Jack_AI_OS/SYSTEM_INDEX.md:61-69` 和 `/Users/jack/Jack_AI_OS/00_START_HERE.md:22-26`。
2. 灰产 D 线“物理隔离”没有真正成立：设计文档把 Buffalo VPS 同时用于 `trade.decodex.cc`、跨境业务、灾备、Telegram Bot 和灰产 worker，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:77-85`。
3. 2026-05-25 被多处写成“周日”，但系统日历验证 2026-05-25 是周一；2026-05-12 也被写成周一，实际是周二。涉及 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:3-6`、`/Users/jack/Jack_AI_OS/NEXT_ACTIONS.md:30-32`、`/Users/jack/Jack_AI_OS/SESSION_STATE.md:48-52`。
4. auto-memory 与新决策冲突：`user_jack_profile.md` 仍写“翻墙教学明确不做”，而 `DECISIONS.md` 写“翻墙业务可做”；`reference_jack_ai_os.md` 仍写 DecodeX_Corp“待初始化”。见 `/Users/jack/.claude/projects/-Users-jack/memory/user_jack_profile.md:45-56`、`/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:31-35`、`/Users/jack/.claude/projects/-Users-jack/memory/reference_jack_ai_os.md:63-67`。
5. 文档含具体高风险执行描述，包括“翻墙包装培训”“Tor”“三跳混币”“Wise OTC”“helpsite legacy 改写为跨境信息检索方法论”。这不是抽象风险分类，而是可执行方向，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:133-146` 和 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:319-323`。

法律提示：本报告不是法律意见。审计时仅用官方公开法律文本作风险触发参考：中国《网络安全法》第二十七条、第四十六条、第六十三条、第六十七条对危害网络安全活动、相关技术支持、违法犯罪网站/通讯群组有明确风险边界（官方来源：工业和信息化部《中华人民共和国网络安全法》全文）。刑法 285/286 风险需中国大陆执业律师最终判断。

---

## A. 文件与迁移完整性

### A1. 迁移日志声称的 19 项逐项验证

评级：🟢 Pass

迁移日志列出 19 项，见 `/Users/jack/Jack_AI_OS/09_ARCHIVE/migration_log_20260511.txt:7-34`。只读 `test/du` 验证结果：19 项源路径均不存在，19 项目的路径均存在。

| # | 日志行 | 源 -> 目的 | 验证结果 |
|---|---:|---|---|
| 1 | 8 | `/Users/jack/proxy_configs` -> `/Users/jack/Jack_AI_OS/02_TOOL_SYSTEM/proxy_configs` | SRC_GONE / DST_EXISTS |
| 2 | 9 | `/Users/jack/trading-framework` -> `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework` | SRC_GONE / DST_EXISTS |
| 3 | 10 | `/Users/jack/资料/YouTube` -> `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Journal/source_materials/YouTube` | SRC_GONE / DST_EXISTS |
| 4 | 11 | `/Users/jack/资料/命理学` -> `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Oracle/source_materials/命理学` | SRC_GONE / DST_EXISTS |
| 5 | 12 | `/Users/jack/域名` -> `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX/handoff/域名` | SRC_GONE / DST_EXISTS |
| 6 | 13 | `/Users/jack/logo` -> `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX/outputs/brand_assets/logo_root` | SRC_GONE / DST_EXISTS |
| 7 | 14 | `/Users/jack/资料/logo` -> `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX/outputs/brand_assets/logo_resources` | SRC_GONE / DST_EXISTS |
| 8 | 15 | `/Users/jack/AGENTS.md` -> `/Users/jack/Jack_AI_OS/02_TOOL_SYSTEM/AGENTS.md` | SRC_GONE / DST_EXISTS |
| 9 | 18 | `/Users/jack/OpenClaw_Handoff_v3.md` -> `/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/handoff/OpenClaw_Handoff_v3.md` | SRC_GONE / DST_EXISTS |
| 10 | 19 | `/Users/jack/OpenClaw_Handoff_v2.md` -> `/Users/jack/Jack_AI_OS/09_ARCHIVE/projects/OpenClaw/OpenClaw_Handoff_v2.md` | SRC_GONE / DST_EXISTS |
| 11 | 20 | `/Users/jack/OpenClaw_Project_交接文档_20260506.md` -> `/Users/jack/Jack_AI_OS/09_ARCHIVE/projects/OpenClaw/OpenClaw_Project_交接文档_20260506.md` | SRC_GONE / DST_EXISTS |
| 12 | 21 | `/Users/jack/Jack_AI_OS_交接文档_20260506.md` -> `/Users/jack/Jack_AI_OS/09_ARCHIVE/projects/AI_OS/Jack_AI_OS_交接文档_20260506.md` | SRC_GONE / DST_EXISTS |
| 13 | 24 | `/Users/jack/open claw files` -> `/Users/jack/Jack_AI_OS/09_ARCHIVE/projects/OpenClaw_legacy/open_claw_files` | SRC_GONE / DST_EXISTS |
| 14 | 25 | `/Users/jack/parking_ppt` -> `/Users/jack/Jack_AI_OS/09_ARCHIVE/projects/parking_legacy/parking_ppt` | SRC_GONE / DST_EXISTS |
| 15 | 26 | `/Users/jack/claude_handoff` -> `/Users/jack/Jack_AI_OS/09_ARCHIVE/sessions/handoffs/claude_handoff` | SRC_GONE / DST_EXISTS |
| 16 | 27 | `/Users/jack/claude_work` -> `/Users/jack/Jack_AI_OS/09_ARCHIVE/sessions/scratch/claude_work` | SRC_GONE / DST_EXISTS，目的目录 0B |
| 17 | 28 | `/Users/jack/资料/ChatGPT` -> `/Users/jack/Jack_AI_OS/09_ARCHIVE/sessions/chatgpt_dump/ChatGPT` | SRC_GONE / DST_EXISTS |
| 18 | 29 | `/Users/jack/helpsite` -> `/Users/jack/Jack_AI_OS/09_ARCHIVE/projects/helpsite_legacy/helpsite` | SRC_GONE / DST_EXISTS |
| 19 | 30 | `/Users/jack/资料/素材` -> `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Journal/b_roll/素材` | SRC_GONE / DST_EXISTS |

### A2. 删除文件确实不在

评级：🟢 Pass

日志记录删除 `/Users/jack/未命名 下午5.41.04.md`，见 `/Users/jack/Jack_AI_OS/09_ARCHIVE/migration_log_20260511.txt:4` 和 `:50-51`。只读 `find` 未发现该文件。

### A3. 保留原位声明确实没动

评级：🟢 Pass

迁移日志声明保留 `/Users/jack/资料/开发区植物园`、`/Users/jack/资料/开鲁项目文件`、`/Users/jack/资料/data`、`/Users/jack/资料/soft`、`/Users/jack/资料/Tampere University`，见 `/Users/jack/Jack_AI_OS/09_ARCHIVE/migration_log_20260511.txt:36-41`。只读验证 5 个路径均存在。

补充风险：项目文档多处写成 `~/jack/...`，该路径在 macOS 上等价于 `/Users/jack/jack/...`，实测 `/Users/jack/jack` 不存在。正确写法应是 `/Users/jack/...` 或 `~/资料/...`。见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/PROJECT_POINTERS.md:61-69`、`/Users/jack/Jack_AI_OS/SESSION_STATE.md:60-62`、`/Users/jack/Jack_AI_OS/NEXT_ACTIONS.md:40-44`。

### A4. DecodeX_Corp 六件套文件完整且非空

评级：🔴 Fail

现有 5 个项目文件非空：`00_PROJECT_INDEX.md`、`DECISIONS.md`、`PROJECT_POINTERS.md`、`AGENTS.md`、`CLAUDE.md`，见用户指定的 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/{00_PROJECT_INDEX,DECISIONS,PROJECT_POINTERS,AGENTS,CLAUDE}.md`。战略与计划输出也非空：`PROJECT_DESIGN_v3.0.md`、`SCHEDULE_14day.md`。

但 Jack AI OS 标准项目结构要求 `CONTEXT_PACK.md`，见 `/Users/jack/Jack_AI_OS/SYSTEM_INDEX.md:61-69` 和 `/Users/jack/Jack_AI_OS/00_START_HERE.md:22-26`。实测 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CONTEXT_PACK.md` 缺失，`/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/handoff/` 为空。不能判定“六件套完整”。

### A5. 4 个子项目 00_PROJECT_INDEX.md 存在且非空

评级：🟢 Pass

4 个入口均存在且非空：

- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Journal/00_PROJECT_INDEX.md`，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Journal/00_PROJECT_INDEX.md:1-14`
- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Oracle/00_PROJECT_INDEX.md`，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Oracle/00_PROJECT_INDEX.md:1-13`
- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/00_PROJECT_INDEX.md`，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/00_PROJECT_INDEX.md:1-13`
- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_AI/00_PROJECT_INDEX.md`，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_AI/00_PROJECT_INDEX.md:1-12`

---

## B. 逻辑一致性

### B1. DECISIONS.md 中 11 条决策互相不矛盾

评级：🟡 Warning

11 条决策本身可读且多数不直接互斥，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:7-67`。但存在两个一致性风险：

- “灰产 D 线物理隔离”被定为铁律，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:31-35`；同一文件又把 Buffalo VPS 定义为“跨境出口 + 灰产”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:43-45`。如果 Buffalo 同时承载合规跨境和灰产，就不是物理隔离。
- `DECISIONS.md` 写“7 层架构”只列 L0-L6，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:49-52`；`AGENTS.md` 图中列到 L7 TOOL/INFRA，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/AGENTS.md:43-47`。这是层级命名不一致。

### B2. SCHEDULE_14day.md 依赖关系合理

评级：🟡 Warning

基础依赖大体合理：D4 Windows 上架后，D5 才部署 Docker，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:98-138`；D8 初稿、D9 定稿、D10 录制、D12 剪辑、D14 发布顺序也合理，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:181-308`。

但有 4 个计划质量问题：

- 日期/星期错误：`2026-05-11` 实际是周一，文档写周日；`2026-05-12` 实际是周二，文档写周一；`2026-05-25` 实际是周一，文档写周日。见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:3-6`、`:34`、`:292`。
- D14 完成定义用了 `[x]`，但这是未来目标，不是已完成事实，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:343-353`。
- D6 要“IB 链接已嵌入网站”，但 D2 申请 OKX/Bitget 一般审批 3-5 天，D6 强依赖外部审批，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:60-73` 和 `:142-156`。
- D14 发布策略冲突：D13 Gate 写“预约 5/25 18:00 发布”，D14 Boss 任务写“不用预约功能，手动发更准时”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:286-288` 和 `:294-296`。

### B3. PROJECT_POINTERS.md 中所有指向位置真实存在

评级：🔴 Fail

核心项目目录与素材目录均存在，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/PROJECT_POINTERS.md:7-19` 和 `:41-58`。但文档中的 `~/jack/...` 指针不真实：实测 `/Users/jack/jack` 不存在。错误出现在：

- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/PROJECT_POINTERS.md:61-69`
- `/Users/jack/Jack_AI_OS/SESSION_STATE.md:60-62`
- `/Users/jack/Jack_AI_OS/NEXT_ACTIONS.md:40-44`

此外，旧 DecodeX 项目的生产代码指针仍指向已被迁移走的 `~/trading-framework/v2/teach_v2/`，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX/PROJECT_POINTERS.md:8-13`。实测该源路径已不存在，真实位置是 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/v2/teach_v2`。

### B4. SESSION_STATE / NEXT_ACTIONS / DECISIONS 状态描述无冲突

评级：🔴 Fail

冲突点：

- `SESSION_STATE.md` 写“创建 DecodeX_Corp 六件套”已完成，见 `/Users/jack/Jack_AI_OS/SESSION_STATE.md:20-23`；但 `CONTEXT_PACK.md` 缺失，不能算标准六件套完成。
- `SESSION_STATE.md` 写“无阻塞”，见 `/Users/jack/Jack_AI_OS/SESSION_STATE.md:54-56`；`NEXT_ACTIONS.md` 同时列出待裁决问题：Windows 上架日期、拍摄设备、D 线域名，见 `/Users/jack/Jack_AI_OS/NEXT_ACTIONS.md:34-39`。这些不一定都是阻塞，但“无阻塞”表述过满。
- `SCHEDULE_14day.md` D2 仍安排“创建 4 个子项目入口”和“更新 SESSION_STATE/NEXT_ACTIONS”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:66-69`；`SESSION_STATE.md` 已写这些完成，见 `/Users/jack/Jack_AI_OS/SESSION_STATE.md:20-23`。如果是提前完成，应在计划中标注“已提前完成”，否则状态冲突。

### B5. memory 文件事实陈述与 Jack AI OS 实际状态一致

评级：🔴 Fail

auto-memory 存在，但内容未完全随 v3.0 和迁移结果更新：

- `project_decodex_corp.md` 标题仍是 v2.0，且“关键决策记录”仍写待 Boss 拍板，见 `/Users/jack/.claude/projects/-Users-jack/memory/project_decodex_corp.md:1-8` 和 `:49-54`；实际 `DECISIONS.md` 已把这些设为已定，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:7-67`。
- `user_jack_profile.md` 写“翻墙教学明确不做”，见 `/Users/jack/.claude/projects/-Users-jack/memory/user_jack_profile.md:45-56`；新决策写“翻墙业务可做”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:31-35`。这是红线翻转，但 memory 没有标注已推翻。
- `reference_jack_ai_os.md` 写 DecodeX_Corp “待初始化”，见 `/Users/jack/.claude/projects/-Users-jack/memory/reference_jack_ai_os.md:63-67`；实际已初始化，见 `/Users/jack/Jack_AI_OS/SESSION_STATE.md:20-23`。

---

## C. 安全 / 合规审查

### C1. 灰产 D 线物理隔离铁律是否一致表述

评级：🔴 Fail

“不挂 DecodeX 子域名”这一点在多处一致：

- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/00_PROJECT_INDEX.md:43-48`
- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:31-35`
- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CLAUDE.md:26-32`

但“物理隔离”没有成立。`PROJECT_DESIGN_v3.0.md` 把同一 Buffalo VPS 同时写成：

- Xray 代理、Telegram Bot、Postgres 灾备、`trade.decodex.cc` Nginx、Relay 海外单执行、灰产 D 线 worker，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:77-85`

这会把合规资产、主品牌站点、灾备和灰产执行放在同一物理节点/同一服务商/同一 IP 风险域。即使域名不挂 `.decodex.cc`，也不满足“物理隔离”。

### C2. 大陆托管 Windows 禁止跑 YT/加密/翻墙/灰产是否三处明确

评级：🟢 Pass

三处均明确：

- `CLAUDE.md`：`/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CLAUDE.md:26-32`
- `PROJECT_DESIGN_v3.0.md`：`/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:63-75`
- `DECISIONS.md`：`/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:37-41`

### C3. 翻墙业务从旧决策翻转到新决策是否清晰记录、风险充分披露

评级：🔴 Fail

`DECISIONS.md` 记录了“旧决策已推翻”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:31-35`。但记录不充分：

- `user_jack_profile.md` 仍写“翻墙教学明确不做”，见 `/Users/jack/.claude/projects/-Users-jack/memory/user_jack_profile.md:45-56`。
- 新决策只有一句“法律风险仍需物理隔离”，没有独立风险评估、触发条件、暂停条件、律师确认、内容边界或 kill switch。
- `SCHEDULE_14day.md` 直接安排 D7 起灰产试水，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:319-323`，没有要求 Jack 重新确认红线翻转。

### C4. 是否有可能违反中国大陆刑法 285/286 / 网络安全法的具体描述

评级：🔴 Fail

存在具体高风险描述：

- “翻墙包装培训 + 加密 Airdrop / TG 频道 / 高风险联盟”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:133-138`
- “资金路径：用户 USDT -> 中转钱包 -> 三跳混币 -> Bybit 卡消费 / Wise OTC”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:139`
- “灰产 D 线 worker（独立 schema + Tor 出口）”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:77-85`
- “D 线灰产试水：注册 .xyz、建 Telegram 频道、helpsite legacy 内容改写为跨境信息检索方法论”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:319-323`
- 业务线表把灰产-D 写为“翻墙包装培训 / 加密 / 博彩 / 金融”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:23-32`

风险判断：这些不是“风险标签”，而是运营、收款、匿名化、内容改写和渠道执行路径。至少应从主战略和日程中移除具体执行指令，转入独立法律审查包；在 Jack 和律师确认前不得进入可执行计划。

### C5. KYC 调用规则是否一致

评级：🔴 Fail

一致部分：

- Mac mini 是唯一允许登录 Tier-1 KYC 账号的设备，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:54-61`
- `CLAUDE.md` 写 Tier-1 KYC 禁止用于灰产，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CLAUDE.md:26-32`
- `00_PROJECT_INDEX.md` 写 Tier-1 KYC 主体永不用于灰产收款，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/00_PROJECT_INDEX.md:43-48`

冲突部分：

- `PROJECT_DESIGN_v3.0.md` 灰产资金路径写到 “Bybit 卡消费 / Wise OTC”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:139`。Bybit/Wise 在同文档被归入 Tier-1/KYC 登录对象或合规收款对象，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:54-61` 和 `:127-131`。
- `project_decodex_corp.md` 把 Relay 写成“灰产 D 线的合规外壳”，见 `/Users/jack/.claude/projects/-Users-jack/memory/project_decodex_corp.md:10-22`。这会诱导 KYC 合规外壳与灰产内层产生业务关联。

结论：KYC 规则有口头铁律，但资金路径和“合规外壳”设计仍有污染风险。

---

## D. 防漏优先于防错审查

### D1. 14 天计划中的单点故障

评级：🟡 Warning

主要单点故障：

- Boss 每天 8-10h 是硬假设，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:5-6`。
- 路人乙档期影响录制，备选仅“推迟一天”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:331-339`。
- Windows 上架与 Ubuntu 装机影响 D5 部署，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:98-138`。
- OKX/Bitget 审批影响 D6 IB 接入，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:60-73` 和 `:142-156`。
- ElevenLabs 克隆音、剪辑脚本、Telegram Bot、OpenClaw LaunchAgent 都是未验证依赖，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:47-50`、`:243-245`、`:300-303`。

### D2. 财务记账方案漏洞

评级：🟡 Warning

`DECISIONS.md` 决定 Beancount 脚本 + B-Auditor 月审，无常驻 CFO，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:63-67`。`AGENTS.md` 也写财务无常驻 Agent，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/AGENTS.md:17-25`。

漏洞：

- 没看到 Beancount 目录、chart of accounts、凭证命名规则、收款渠道导入规则、人民币/USD/USDT 对账规则。
- `SCHEDULE_14day.md` D14 又写“CFO 启动首日数据看板”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:300-303`，与“无常驻 CFO Agent”命名不一致。
- 加密影子账和灰产资金路径没有合规隔离审计模板。

### D3. 灾备方案是否可执行

评级：🔴 Fail

`PROJECT_DESIGN_v3.0.md` 写灾备：Postgres 主从到 Buffalo、Backblaze B2、Shamir、Windows 被查封后 24h/48h 恢复，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:274-278`。

不可执行点：

- 没有 restore drill、RPO/RTO、备份频率、密钥位置、DNS 切换脚本、基础设施重建清单。
- Buffalo 同时承担跨境出口、trade 站、灰产 worker、灾备副本，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:77-85`，本身是集中风险点。
- “24h Mac mini 顶上 / 48h 重租海外服务器”没有依赖清单，不足以执行。

### D4. EP1 上线关键路径断裂时备选方案是否能顶上

评级：🔴 Fail

关键路径有备选，但不够：

- 搭档缺席只写推迟到 5/26，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:331-339`；没有单人版脚本、纯 voice-over 版、无搭档镜头版。
- 设备故障备选只有 iPhone + 外接麦，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:331-339`；没有剪辑延期、字幕失败、英文版失败的降级方案。
- D13 预约发布和 D14 手动发布冲突，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:286-296`。
- 目标日期本身错位：2026-05-25 是周一，不是周日。

---

## E. 与 Jack 既有约定的兼容性

### E1. OpenClaw 12 Agent 体系如何纳入 200+ Agent 架构

评级：🔴 Fail

冲突点：

- `AGENTS.md` 写“详细 SOUL.md 在 OpenClaw”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/AGENTS.md:1-4`；又写存到 `OpenClaw/outputs/souls/`，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/AGENTS.md:71-82`。实测该目录不存在。
- `OpenClaw/00_PROJECT_INDEX.md` 写 OpenClaw 是 14 个角色，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/00_PROJECT_INDEX.md:7-13`；DecodeX_Corp 文档写 OpenClaw 12 Agent SOUL.md 框架，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:49-52`。
- OpenClaw 旧入口仍引用已迁移的家目录旧文件，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/00_PROJECT_INDEX.md:32-35` 和 `/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/CLAUDE.md:21-26`。

结论：纳入关系是口头描述，没有可执行映射表。

### E2. 既有 DecodeX 项目与新 DecodeX_Corp 边界是否清晰

评级：🔴 Fail

边界不清：

- 旧 DecodeX 项目写自己是个人综合类网站和主站建设，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX/00_PROJECT_INDEX.md:7-17`；DecodeX_Corp 也统筹主品牌和 5 柱，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/00_PROJECT_INDEX.md:22-33`。
- 旧 DecodeX 的“当前最高优先级”仍是“回答 1.1 受众定位”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX/00_PROJECT_INDEX.md:41-44`，但同文件上方又写阶段完成，见 `:11-30`。
- 旧 DecodeX `PROJECT_POINTERS.md` 指向已迁移走的 `~/trading-framework/v2/teach_v2/`，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX/PROJECT_POINTERS.md:8-13`。

### E3. Mingli 与 DecodeX_Oracle 是否重复 / 冲突

评级：🟡 Warning

DecodeX_Oracle 写“承接 Mingli 项目的命理批算能力”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Oracle/00_PROJECT_INDEX.md:8-13`。Mingli 本身仍是一个进行中的具体命主批算项目，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/Mingli/00_PROJECT_INDEX.md:7-17`。

风险：Mingli 是个人/案例项目，Oracle 是商业化批命服务。两者缺少边界文件：哪些算法/模板可复用，哪些命主数据不得迁移，哪些 outputs 不能进入商业素材。

### E4. Relay 项目与 “DecodeX_Relay” 称呼是否对应同一个东西

评级：🟡 Warning

DecodeX_Corp 指向现有 `/Users/jack/Jack_AI_OS/05_PROJECTS/Relay/`，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/PROJECT_POINTERS.md:11-19`。但 Relay 项目本身仍是模板占位，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/Relay/00_PROJECT_INDEX.md:7-36`，没有写 DecodeX_Relay、业务定义、边界或灰产隔离规则。

---

## F. 缺漏检查

### F1. Jack 提到的需求中 Claude Code 没做的

评级：🟡 Warning

已做：战略文档、14 天计划、DecodeX_Corp 入口文件、4 个子项目入口、迁移日志、状态文件、auto-memory。

未闭环或只列为待办：

- `MASTER_PROFILE.md` 仍是待补完事项，见 `/Users/jack/Jack_AI_OS/NEXT_ACTIONS.md:10-18` 和 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:352-358`。
- GitHub push 修复、OpenClaw LaunchAgent 验证、证书 cron 仍是 D1 待办，见 `/Users/jack/Jack_AI_OS/SESSION_STATE.md:48-52`。
- D 线域名命名还在待裁决，见 `/Users/jack/Jack_AI_OS/NEXT_ACTIONS.md:34-39`。
- 标准 `CONTEXT_PACK.md` 未创建。

### F2. 应该建但没建的文档

评级：🔴 Fail

缺失清单：

- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CONTEXT_PACK.md`：标准项目启动必读文件。
- `DecodeX_Corp/PROJECT_CORRECTION_LOG.md` 或同类纠错文件：标准模板有，当前项目没有；这次已经有日期错误、路径错误、隔离错误，需要记录。
- `DecodeX_Corp/DESIGN_DISPUTES.md`：红线翻转和灰产隔离属于设计争议，应独立记录。
- D 线法律风险审查包：包含律师确认状态、禁止清单、暂停条件、资金路径禁用项。
- OpenClaw -> DecodeX_Corp Agent 映射表：12/14/200+ 角色如何对应。
- 灾备 runbook：恢复步骤、RPO/RTO、DNS、密钥、演练记录。
- Finance runbook：Beancount 账本结构、凭证规则、月审模板。

### F3. 应该删但没删的

评级：🟡 Warning

没有发现迁移日志明确要求删除但仍存在的文件。已授权删除文件不存在，见 `/Users/jack/Jack_AI_OS/09_ARCHIVE/migration_log_20260511.txt:50-51`。

但有多处“应该更新或标记 stale”的旧引用，不建议直接删：

- OpenClaw 旧入口仍指向家目录旧文件，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/00_PROJECT_INDEX.md:32-35`。
- DecodeX 旧生产路径仍指向已迁移源路径，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX/PROJECT_POINTERS.md:8-13`。
- memory 里 v2.0/待初始化/翻墙不做未更新，见 `/Users/jack/.claude/projects/-Users-jack/memory/project_decodex_corp.md:49-54`、`/Users/jack/.claude/projects/-Users-jack/memory/reference_jack_ai_os.md:63-67`、`/Users/jack/.claude/projects/-Users-jack/memory/user_jack_profile.md:45-56`。

### F4. 14 天结束后到 12 月 $20K/月之间的桥梁是否成立

评级：🔴 Fail

不成立。`PROJECT_DESIGN_v3.0.md` 写 12 月月利 $20K+，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:10-20`；业务线目标收入列在 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:23-32`。阶段 Gate 只到 Week 8 “月流水 ≥ $3K”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:280-288`。

缺失桥梁：

- Week 8 到 12 月的月度里程碑。
- 每条业务线的漏斗假设、CAC、成交数、毛利、交付容量。
- Oracle 从 ¥99-599 到 $3-8K/月的服务产能模型。
- Trade IB 与课程的转化路径、审批失败方案。
- Journal 的广告收入通常不能在首期后快速覆盖 $5-10K/月，缺少订阅/产品承接路径。
- Relay/AI 仍未启动或占位，不能计入 12 月目标。

---

## 红黄绿风险清单

### 🔴 Red

1. D 线物理隔离失败：Buffalo 同时承载合规站点、跨境、灾备和灰产 worker。
2. 具体高风险灰产执行描述进入主战略和 14 天日程。
3. `CONTEXT_PACK.md` 缺失，DecodeX_Corp 不符合 Jack AI OS 标准项目结构。
4. 2026-05-25 周日判断错误，EP1 黄金时段假设失真。
5. auto-memory 与新决策冲突，尤其“翻墙教学明确不做”与“翻墙业务可做”冲突。

### 🟡 Yellow

1. `~/jack/...` 路径写法错误，真实路径应是 `/Users/jack/...` 或 `~/资料/...`。
2. OpenClaw 12/14/200+ Agent 纳入关系没有映射表。
3. Mingli 与 Oracle 的数据/能力边界未定义。
4. Relay 仍是模板项目，未真正变成 DecodeX_Relay。
5. Beancount、灾备、GitHub push、证书 cron、LaunchAgent 都停留在计划或待办层。

### 🟢 Green

1. 迁移日志 19 项文件系统验证通过。
2. 删除文件不存在，授权删除闭环。
3. 保留原位 5 个目录存在。
4. 4 个子项目入口存在且非空。
5. 大陆 Windows 禁止跑 YT/加密/翻墙/灰产在三份核心文档里明确。

---

## Jack 必须本人确认

1. 是否确认推翻 2026-05-05 “翻墙教学明确不做”旧红线？如果确认，必须写成新的 Boss 决策，并同步 memory；如果不确认，D 线计划全部撤回。
2. 是否允许任何灰产相关内容与 Buffalo VPS、trade.decodex.cc、Relay、灾备副本共用节点？按“物理隔离”字面理解，答案应为不允许。
3. EP1 目标到底是“2026-05-25 18:00”还是“周日黄金时段”？2026-05-25 是周一。
4. Bybit/Wise 是否允许出现在 D 线资金路径中？这会冲击 Tier-1 KYC 禁止用于灰产的铁律。
5. DecodeX_Corp 与旧 DecodeX/Mingli/Relay/OpenClaw 的边界：哪些是父项目、哪些是子项目、哪些只是素材/能力来源。

---

## Claude Code 必须修复

1. 补建 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CONTEXT_PACK.md`，并按 Jack AI OS 标准启动文件把确认事实聚合进去；同时补 `PROJECT_CORRECTION_LOG.md` / `DESIGN_DISPUTES.md` 或说明为何该项目例外。
2. 修正所有 `~/jack/...` 为真实路径：`/Users/jack/...` 或 `~/资料/...`；同步修正 `PROJECT_POINTERS.md`、`SESSION_STATE.md`、`NEXT_ACTIONS.md`。
3. 修正所有 2026-05-11 到 2026-05-25 的星期错误；明确 EP1 是按日期还是按周日黄金时段；把未来完成定义 `[x]` 改成 `[ ]`。
4. 把 D 线从主战略和 14 天计划中降级为“待 Jack + 法律确认的隔离议题”；移除可执行的灰产/翻墙/混币/OTC/helpsite 改写指令。
5. 重写灰产隔离方案：不得与 `trade.decodex.cc`、Relay、Postgres 灾备、主品牌 Telegram Bot 共用 Buffalo VPS；如果保留 D 线，必须是独立机器、独立账号、独立域名、独立支付路径、独立日志。
6. 同步 auto-memory：`project_decodex_corp.md` 从 v2.0/pending 更新为 v3.0/已定；`reference_jack_ai_os.md` 移除“DecodeX_Corp 待初始化”；`user_jack_profile.md` 对翻墙红线做“已推翻/未推翻”明确标注。
7. 更新旧项目指针：`DecodeX/PROJECT_POINTERS.md` 的 `~/trading-framework` 已失效；`OpenClaw/00_PROJECT_INDEX.md` 和 `OpenClaw/CLAUDE.md` 仍指向已迁移的家目录旧文件；`Relay/00_PROJECT_INDEX.md` 仍是模板。
8. 补写 OpenClaw -> DecodeX_Corp Agent 映射表，解决 12/14/200+ 角色数量和 SOUL.md 存放路径冲突，并创建或改正 `OpenClaw/outputs/souls/`。
9. 补写 Finance runbook 和 DR runbook：Beancount 账本结构、凭证规则、月审模板、备份 restore drill、RPO/RTO、密钥和 DNS 切换步骤。
10. 给 14 天计划增加真正的降级方案：单人版 EP1、无英文版发布、无搭档拍摄、IB 审批失败、剪辑失败、YouTube 预约/手动发布二选一。

---

## 结论

Claude Code 完成了文件搬迁和项目入口初始化的大部分机械工作，但没有完成“可执行且安全的 DecodeX_Corp 初始化”。当前最严重问题不是文件有没有搬完，而是：标准项目结构缺项、D 线隔离逻辑破裂、日历基础事实错误、memory 与红线翻转冲突。

建议 Jack 不要直接进入 D1 执行。先让 Claude Code 按“必须修复”清单修完，再由 Codex 复审一次。
