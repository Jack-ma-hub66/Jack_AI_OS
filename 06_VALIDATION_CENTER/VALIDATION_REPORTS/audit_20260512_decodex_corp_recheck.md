# DecodeX_Corp 修复后复审报告

复审日期：2026-05-12  
复审方：Codex  
范围：用户列出的 v3.1 修复产出、项目元数据、状态文件、旧项目指针、系统脚本、auto-memory、candidate/dispute 记录。  
方法：沿用前次审计的四维框架：文件与迁移完整性、逻辑一致性、安全/合规、防漏与可执行性；附红黄绿清单与必须修复项。  

## 总评级：🔴 Fail

本轮修复不是无效。大量前次问题已经闭环：`CONTEXT_PACK.md` 已创建，v3.0 已标 Deprecated，主日历多数日期已校正，auto-memory 旧冲突已同步，VR_20260505 的 `--raw` / MCP 占位 / `push_safe.sh` 提示基本闭环。

但不能给 Pass。仍有 4 个阻断级问题：

1. `CONTEXT_PACK.md` 仍把 v3.0 旧摘要注入为 confirmed 上下文，且 `CLAUDE.md` 与 `CONTEXT_PACK.md` 完全相同，导致旧的 “Buffalo VPS 美国/跨境+灰产” 进入启动包。见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CONTEXT_PACK.md:1-3`、`:151-166`，以及 `cmp -s CLAUDE.md CONTEXT_PACK.md` 返回 0。
2. v3.1 主战略仍含 D 线可执行结构：独立 USDT 链路、独立 Telegram Bot、D 线 worker、一次性身份 Telegram 频道、SOCKS5 burner 等。它删除了 “Tor/三跳混币/Wise OTC”，但仍没有做到 `PROJECT_CORRECTION_LOG.md` 要求的 “主战略仅描述待 Boss + 律师确认的隔离议题”。见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.1.md:33`、`:78-86`、`:143-148`，对照 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/PROJECT_CORRECTION_LOG.md:31-38`。
3. `SCHEDULE_14day.md` 把多个未来 Gate 写成 ✅ 已完成，包括 “Codex 复审通过”、Oracle 商品上架、IB 申请、未来 D3-D14 Gate。见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:62-65`、`:82-85`、`:103-106`、`:153-156`、`:313-316`。
4. 全局路径/日历仍不一致：`DecodeX_Journal/00_PROJECT_INDEX.md` 仍写 2026-05-25 是周日，并指向 v3.0；OpenClaw 当前 handoff 仍指向已不存在的 `/Users/jack/trading-framework`；OpenClaw `AGENTS.md` 仍指向已不存在的 `/Users/jack/open claw files`。见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Journal/00_PROJECT_INDEX.md:10-19`、`/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/00_PROJECT_INDEX.md:23-27`、`/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/handoff/OpenClaw_Handoff_v3.md:18-24`、`/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/AGENTS.md:8-13`。

---

## A. 文件与迁移完整性：🟡 Warning

### A1. DecodeX_Corp 标准项目结构

评级：🟡 Warning

已创建并非空：

- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CONTEXT_PACK.md`，231 行
- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/PROJECT_CORRECTION_LOG.md`，106 行
- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DESIGN_DISPUTES.md`，90 行
- `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/AGENTS.md`，144 行

`SYSTEM_INDEX.md` 要求的项目结构也基本齐：`00_PROJECT_INDEX.md / CONTEXT_PACK.md / PROJECT_POINTERS.md / DECISIONS.md / TASK_PACKETS / PROJECT_CORRECTION_LOG.md / DESIGN_DISPUTES.md / outputs / validation / handoff`，见 `/Users/jack/Jack_AI_OS/SYSTEM_INDEX.md:61-75`。  

残留问题：`handoff/` 和 `TASK_PACKETS/` 仍为空。前次 5 个硬阻断里用户本轮重点列的是 `CONTEXT_PACK 缺失`，所以这项不再判红，但项目级交接闭环仍未建立。

### A2. v3.0 归档状态

评级：🟢 Pass

`PROJECT_DESIGN_v3.0.md` 已在文件头标明被 v3.1 替代，并写 `状态：Deprecated`，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.0.md:1-10`。

### A3. 旧项目指针

评级：🟡 Warning

旧 DecodeX 指针已改到新迁移路径，且实测新路径存在、旧路径不存在。见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX/PROJECT_POINTERS.md:9-15`。

OpenClaw 入口和 Claude 配置已从家目录旧 handoff 改到 AI OS 路径，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/00_PROJECT_INDEX.md:23-42`、`/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/CLAUDE.md:5-8`。  

但 OpenClaw 当前 handoff 本体仍含旧生产路径 `/Users/jack/trading-framework/...`，且该旧路径实测不存在。见 `/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/handoff/OpenClaw_Handoff_v3.md:18-24`。OpenClaw `AGENTS.md` 仍要求读取 `/Users/jack/open claw files/...`，该目录实测不存在，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/OpenClaw/AGENTS.md:8-13`。

---

## B. 逻辑一致性：🔴 Fail

### B1. CONTEXT_PACK confirmed-only 规则被破坏

评级：🔴 Fail

`CONTEXT_PACK.md` 文件头写 “只包含 confirmed 信息”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CONTEXT_PACK.md:1-3`。但它后半段注入了 2026-05-11 会话摘要，把 v3.0 旧设计写为：

- “灰产 D 线独立 .xyz 域名 + Tier-3 一次性身份隔离”
- “三节点物理拓扑：Mac mini + Windows + Buffalo VPS（美国/跨境+灰产）”

见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CONTEXT_PACK.md:151-167`。这与 v3.1 的四节点隔离和 Buffalo 瘦身直接冲突。

根因在脚本：`update_context.sh` 无过滤地把最近 3 个 digest 的前 15 行写入 CONTEXT_PACK，见 `/Users/jack/Jack_AI_OS/scripts/update_context.sh:76-86`。这会持续复发。

### B2. 状态文件与真实状态不一致

评级：🟡 Warning

`SESSION_STATE.md` 写 auto-memory、MASTER_PROFILE、update_context、旧项目指针仍 “进行中”，见 `/Users/jack/Jack_AI_OS/SESSION_STATE.md:27-34`。实际 auto-memory 已更新，`MASTER_PROFILE.md` 至少已写入 UTC+8 行，`update_context.sh` 也已修订不覆写 AGENTS。状态表述需要拆成 “已完成基础修复 / 仍需补完内容”。

`SCHEDULE_14day.md` 更严重：Gate 项大量使用 ✅，但这些是未来完成条件，不是已完成事实，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/SCHEDULE_14day.md:62-65`、`:82-85`、`:103-106`、`:153-156`、`:313-316`。

### B3. 未采纳 redteam B4 未进入 DESIGN_DISPUTES / CANDIDATE

评级：🟡 Warning

Boss 决定不接受 “60 天只跑 Oracle/Journal/Trade” 的冻结建议，已经写入 `DECISIONS.md D4`，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:78-84`。  

但 `DESIGN_DISPUTES.md` 只记录 D 线、Agent、OpenClaw、Mingli、EP1 日期，没有记录 “5 柱不冻结 vs redteam 2+1” 这个战略分歧，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DESIGN_DISPUTES.md:9-89`。`CANDIDATE_LOG.md` 也没有对应条目，见 `/Users/jack/Jack_AI_OS/07_ERROR_AND_LESSONS/CANDIDATE_LOG.md:41-79`。用户明确要求未采纳项不能简单忽略，所以这里未闭环。

B10 暂不写 runbook 已进入 candidate，见 `/Users/jack/Jack_AI_OS/07_ERROR_AND_LESSONS/CANDIDATE_LOG.md:53-58`，并在 `DECISIONS.md` 暂缓区登记，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:147-152`。此项基本合格。

---

## C. 安全 / 合规：🔴 Fail

### C1. D 线物理隔离

评级：🟡 Warning

核心修复已做：`DECISIONS.md D1` 写 D 线独立新 VPS，与 Buffalo/Mac/Windows/主品牌资产隔离，三条件满足前冻结，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md:49-55`。`PROJECT_DESIGN_v3.1.md` 也把 Buffalo 改为主品牌跨境出口，并明确禁止 D 线资产、Tor 出口、独立钱包在 Buffalo，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.1.md:66-76`。

但 `CONTEXT_PACK.md` 仍注入 v3.0 “Buffalo VPS（美国/跨境+灰产）”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CONTEXT_PACK.md:162-166`。启动包层面仍会污染后续执行。

### C2. 主战略仍含高风险执行结构

评级：🔴 Fail

v3.1 删除了最明显的 “三跳混币 / Wise OTC / Bybit 卡消费 / Tor 出口 / helpsite 改写” 文本，这是进步。  

但当前主战略仍保留：

- D 线收入模式为 “独立 USDT 链路”，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.1.md:33`
- Node 4 承载 D 线 worker、网络知识内容站、一次性身份 Telegram 频道，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.1.md:78-86`
- D 线身份、SOCKS5 burner、独立 USDT 钱包、一次性 Telegram 收单、独立 Bot/token，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.1.md:143-148`
- D 线域名预算仍在 Batch 1，虽然标冻结，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.1.md:261-268`

这与 `PROJECT_CORRECTION_LOG.md COR-P003` 的正确做法冲突：D 线执行细节应单独放法律审查包，主战略只描述 “待 Boss + 律师确认” 的隔离议题，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/PROJECT_CORRECTION_LOG.md:31-38`。

### C3. CAND-002 处理

评级：🟢 Pass with caution

我同意 CAND-002 保持 candidate，不升级 confirmed。该条明确写 “D 线即使物理隔离 + 包装网络知识普及仍属红色法律风险”，并建议律师意见前任何 D 线执行视为越权，见 `/Users/jack/Jack_AI_OS/07_ERROR_AND_LESSONS/CANDIDATE_LOG.md:41-51`。  

`DESIGN_DISPUTES.md` 也保留了 Codex redteam 立场，见 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DESIGN_DISPUTES.md:18-27`。  

但这个 candidate 与 v3.1 主战略中的执行结构同时存在，所以 “观察记录正确” 不等于 “主战略安全”。

---

## D. 防漏与可执行性：🟡 Warning

### D1. VR_20260505 P1-P3 闭环

评级：🟢 Pass with residual risk

- P1 `close_session --raw`：已支持 `--raw` 参数并归档到 `raw_archive/`，见 `/Users/jack/Jack_AI_OS/scripts/close_session.sh:5-16`、`:108-118`。`raw_archive/` 已有真实归档文件，见 `/Users/jack/Jack_AI_OS/09_ARCHIVE/sessions/raw_archive/20260511_2119_DecodeX_Corp.md`。
- P2 MCP 占位：`MCP_REGISTRY.md` 和 `Chrome_MCP_RULES.md` 已存在，见 `/Users/jack/Jack_AI_OS/02_TOOL_SYSTEM/MCP_REGISTRY.md:1-5`、`/Users/jack/Jack_AI_OS/02_TOOL_SYSTEM/Chrome_MCP_RULES.md:1-3`。
- P3 push_safe 提示：已改为提示重新运行 `push_safe.sh`，并明确不要手动 `git add -A && git push`，见 `/Users/jack/Jack_AI_OS/scripts/push_safe.sh:48-56`。

残余风险：`close_session.sh` 未提供 `--raw` 时会从所有 `~/.claude/projects` 找最新 jsonl，见 `/Users/jack/Jack_AI_OS/scripts/close_session.sh:79-91`。这能闭环保存 raw，但可能抓到别的项目/窗口的最新 jsonl。建议完整关闭仍优先显式传 `--raw`。

### D2. 脚本语法

评级：🟢 Pass

执行 `bash -n /Users/jack/Jack_AI_OS/scripts/update_context.sh /Users/jack/Jack_AI_OS/scripts/close_session.sh /Users/jack/Jack_AI_OS/scripts/push_safe.sh` 通过，返回 0。

### D3. update_context 仍会制造错误上下文

评级：🔴 Fail

`update_context.sh` 已修复不覆写 `AGENTS.md`，见 `/Users/jack/Jack_AI_OS/scripts/update_context.sh:121-127`。但它仍会：

- 无过滤注入最近 digest 前 15 行，见 `/Users/jack/Jack_AI_OS/scripts/update_context.sh:76-86`
- 把 `CONTEXT_PACK.md` 复制成 `CLAUDE.md`，见 `/Users/jack/Jack_AI_OS/scripts/update_context.sh:121-124`

在当前文件里，`CLAUDE.md` 与 `CONTEXT_PACK.md` 完全相同，且二者都含 v3.0 旧拓扑。这是可复现的系统性错误。

---

## 5 个原硬阻断闭环状态

| 原阻断 | 本轮结论 | 证据 |
|---|---|---|
| CONTEXT_PACK 缺失 | 🟡 文件已建，但内容污染 | `CONTEXT_PACK.md:1-3`、`:151-166` |
| D 线物理隔离失败 | 🟡 核心文档已拆分，启动包仍冲突 | `DECISIONS.md:49-55`、`PROJECT_DESIGN_v3.1.md:66-86`、`CONTEXT_PACK.md:162-166` |
| 日历错位 | 🟡 主线已修，Journal 子项目未修 | `SCHEDULE_14day.md:3-38`、`DecodeX_Journal/00_PROJECT_INDEX.md:10-19` |
| memory 冲突 | 🟢 已同步旧红线推翻和待初始化状态 | `user_jack_profile.md:55-58`、`reference_jack_ai_os.md:65-73` |
| 主战略含高风险执行指令 | 🔴 未完全闭环 | `PROJECT_DESIGN_v3.1.md:33`、`:78-86`、`:143-148` |

---

## 12 个 redteam P0 落地状态

| 项 | 结论 |
|---|---|
| D 线 | 🔴 隔离规则写了，但主战略仍有执行结构 |
| 5 柱降级 | 🟡 Boss 不冻结已写 DECISIONS；未进入 DESIGN_DISPUTES/CANDIDATE |
| EP1 降规 | 🟢 6-8 min 中文单版、试拍、Plan B、砍英文/切片已落地 |
| 技术栈降载 | 🟢 SDXL 禁用、Playwright 2-3、n8n 安全前置、pg_dump 替代流复制已落地 |
| Agent 降级 | 🟢 MVP 12、状态机、CRO 否决、5 drill 已落地；OpenClaw 映射仍 open 但已记录 |
| 砍线 Gate | 🟢 Week 4/8/12 表已落地 |
| 路人乙 | 🟡 G2 重评已写，但 EP1 前无合同仍是 Boss 接受的风险 |
| Boss runbook | 🟡 CAND-003 记录，暂不写 DECISIONS，符合 Boss 暂缓基准 |
| KYC 污染 | 🟢 Bybit/Wise/Stripe/个人收款禁入 D 线已写 |
| Buffalo SPOF | 🟡 主文档已瘦身，CONTEXT_PACK 仍有旧摘要污染 |
| Finance/DR runbook | 🟡 已列 D11/G1 待办，尚未建文件 |
| n8n/webhook 风险 | 🟢 禁公网、禁 Execute Command、webhook relay、audit 已写 |

---

## 红黄绿清单

### 🔴 Red

1. `CONTEXT_PACK.md` 和 `CLAUDE.md` 注入 v3.0 旧拓扑，把 Buffalo 写回 “跨境+灰产”。
2. v3.1 主战略仍含 D 线 USDT、Telegram、worker、SOCKS5 burner、一次性身份等执行结构。
3. `SCHEDULE_14day.md` 大量未来 Gate 写成 ✅，包括 “Codex 复审通过”。
4. `update_context.sh` 的 digest 注入机制会继续把旧摘要带入 confirmed CONTEXT_PACK。

### 🟡 Yellow

1. `DecodeX_Journal/00_PROJECT_INDEX.md` 仍写 2026-05-25 周日，并引用 v3.0。
2. OpenClaw 当前 handoff / AGENTS 仍有已不存在旧路径。
3. B4 “5 柱不冻结” 未进入 DESIGN_DISPUTES/CANDIDATE。
4. `SESSION_STATE.md` 把若干已完成基础修复仍写 “进行中”，状态粒度不清。
5. `close_session.sh` 自动找最新 jsonl 有归档错会话风险。

### 🟢 Green

1. v3.0 已 Deprecated，v3.1 成为当前版。
2. 主线日历和 Week 4/8/12 日期经系统 `date` 验证正确。
3. auto-memory 旧冲突基本已修正。
4. VR_20260505 P1/P2/P3 基本闭环。
5. `AGENTS.md` 已恢复为 MVP 12，不再被 update_context 覆写。

---

## 必须修复

1. 重写 `update_context.sh` 的 digest 注入逻辑：不得把旧 session 摘要原样进入 CONTEXT_PACK；至少过滤 Deprecated/v3.0/D 线旧拓扑；更稳妥是只从明确 confirmed 的当前文件抽取。
2. 重新生成 `CONTEXT_PACK.md` 和 `CLAUDE.md`，删除 `/Users/jack/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/CONTEXT_PACK.md:151-167` 这类旧摘要污染。
3. 将 `PROJECT_DESIGN_v3.1.md` 中 D 线执行结构降级为 “法律审查包占位”，从主战略移除 USDT/Telegram/worker/SOCKS5 burner/一次性身份等操作性字段。
4. 把 `SCHEDULE_14day.md` 所有未来 Gate 的 ✅ 改为 `[ ]` 或 “通过标准”，尤其 `:63-65`、`:83-84`、`:104-105`、`:154-156`、`:314-315`。
5. 修正 `DecodeX_Journal/00_PROJECT_INDEX.md:11` 为 2026-05-25 周一 18:00 UTC+8，并把 `:19` 的 v3.0 引用改 v3.1。
6. 修正 OpenClaw 当前 handoff / AGENTS 里的旧路径，或明确标 Deprecated；否则 OpenClaw 入口已修，实际必读文件仍会误导。
7. 给 “5 柱不冻结 vs redteam 2+1” 补 `DESIGN_DISPUTES.md` 条目，必要时同步 CANDIDATE，保留 residual risk 和 Gate 触发条件。

结论：本轮修复从 “大量硬缺失” 进步到 “核心文档大体有了，但上下文包和 D 线主战略仍不安全”。复审不通过。修完上述 7 项后可以重跑一次窄范围复审。
