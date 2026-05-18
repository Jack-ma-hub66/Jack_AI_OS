> ⚠️ 本文檔為系統主參考文件。Claude Code 不得自行修改角色設計、職責描述或架構決策，如需更新請向 Jack 確認後執行。

# OpenClaw 多 Agent 系統交接文件 v2

**文件版本**：2026-03-18（Phase 2 完成 + MCP 擴展版）
**系統版本**：OpenClaw 2026.3.13
**狀態**：Phase 0 + Phase 1 + Phase 2 已完成，Phase 3 進行中

---

## 1. 硬件環境

### 主控機（Mac Mini M4）
| 項目 | 規格 |
|------|------|
| 機型 | Mac Mini M4 |
| 系統 | macOS 26.x (arm64) |
| Node | 25.6.1 |
| 角色 | OpenClaw Gateway 主機，運行 Anthropic API Agent |
| IP | 10.1.6.57 |
| 網路代理 | Clash Verge v1.19.20 Mihomo，TUN 模式，HTTP 端口 7897 |

**Clash TUN 排除網段**（已設定，勿移除）：
- `10.0.0.0/8` — 保留局域網直連規則（Windows 機器 10.1.4.183 備用，勿移除）

**Clash 規則補全**（2026-03-17 新增，文件：`rFsdh1bJC1fC.yaml`）：
- `discord.com` / `discordapp.com` / `discord.gg` → 主代理
- `cloudflare.com` / `anthropic.com` → 主代理
- 解決了 Discord REST API `fetch failed` 問題（Bot 能接收但無法發送回覆）

---

## 2. 系統架構總覽

```
Discord Guild (1480807292248133684)
         │
         ▼
OpenClaw Gateway (Mac Mini, port 18789)
         │
    bindings 路由
         │
    ┌────┴─────────────────────┐
    │                         │
直屬老闆線（3個）         業務線 CEO 統轄（9個）
secretary                    ceo
chief-architect              editor-chief
security-lead                writer-cn
                             tech-lead
                             researcher
                             data-analyst
                             publisher
                             community-support
                             it-ops

資產管理線（1個）
asset-director
```

所有 Agent 一律使用 **Anthropic API**（廢除本地模型 Ollama 方案）。

---

## 3. 完整 Agent 架構設計（共 13 個 + 1 個擱置）

### 3.1 三線架構總覽

#### 【直屬老闆，3個】

| Agent ID | 名稱 | 模型 | 角色定位 |
|----------|------|------|---------|
| secretary | 秘書 📋 | claude-haiku-4-5 | 信息中樞、日程管理、行政協調 |
| chief-architect | 首席架構師 🏗️ | claude-opus-4-6（週度冷備）| 團隊進化、SOUL.md 迭代、性能評審 |
| security-lead | 安全主管 🔒 | claude-haiku-4-5 | 安全策略、合規審核、資金紅線 |

#### 【業務線，CEO 統轄，9個】

| Agent ID | 名稱 | 模型 | 角色定位 |
|----------|------|------|---------|
| ceo | CEO 👔 | claude-sonnet-4-6 | 任務拆解、ROI 評估、跨部門協調 |
| editor-chief | 主編 ✍️ | claude-sonnet-4-6 | 內容方向、審稿、內容日曆 |
| writer-cn | 中文寫手 🖊️ | claude-sonnet-4-6 | 中文內容創作 |
| tech-lead | 技術總監 💻 | claude-sonnet-4-6 | 方案設計、Code Review、基礎設施 |
| researcher | 研究員 🔍 | claude-sonnet-4-6 | 市場掃描、機會發現、每週機會簡報 |
| data-analyst | 數據分析師 📊 | claude-sonnet-4-6 | 定量分析、週月報 |
| publisher | 發佈專員 📤 | claude-haiku-4-5 | 多渠道發佈 |
| community-support | 社群客服 💬 | claude-haiku-4-5 | 群內問答、知識庫 |
| it-ops | IT運維員 🖥️ | claude-haiku-4-5 | Gateway 監控、token 追蹤、備份 |

#### 【資產管理線，1個】

| Agent ID | 名稱 | 模型 | 角色定位 |
|----------|------|------|---------|
| asset-director | 資產總監 💰 | claude-sonnet-4-6 | 監控 Bitget、追蹤博主動態、行情提醒 |

#### 【擱置】

| Agent ID | 名稱 | 啟用條件 |
|----------|------|---------|
| writer-en | 英文寫手 | 英文需求 > 每週 2-3 次時啟用 |

---

### 3.2 已部署 Agent（Phase 1 + Phase 2，共 14 個）

| Agent ID | 名稱 | 模型 | Discord 頻道 ID |
|----------|------|------|----------------|
| main | （預設）| claude-haiku-4-5 | 所有其他頻道 |
| secretary | 秘書 📋 | claude-haiku-4-5 | 1482282914921185381 |
| security-lead | 安全主管 🔒 | claude-haiku-4-5 | 1482282917605675038 |
| ceo | CEO 👔 | claude-sonnet-4-6 | 1482282919547633715 |
| community-support | 社群客服 💬 | claude-haiku-4-5 | 1482282922277994588 |
| it-ops | IT運維員 🖥️ | claude-haiku-4-5 | 1482282924723142677 |
| chief-architect | 首席架構師 🏗️ | claude-opus-4-6 | 1483426457568153620 |
| editor-chief | 主編 ✍️ | claude-sonnet-4-6 | 1483426460092858379 |
| writer-cn | 中文寫手 🖊️ | claude-sonnet-4-6 | 1483426476056641653 |
| tech-lead | 技術總監 💻 | claude-sonnet-4-6 | 1483426478984265818 |
| researcher | 研究員 🔍 | claude-sonnet-4-6 | 1483426715828224090 |
| data-analyst | 數據分析師 📊 | claude-sonnet-4-6 | 1483426688938414230 |
| publisher | 發佈專員 📤 | claude-haiku-4-5 | 1483426599574704269 |
| asset-director | 資產總監 💰 | claude-sonnet-4-6 | 1483426602976149614 |

---

## 4. 核心機制設計

### 4.1 幻覺控制四層防線

| 層級 | 機制 | 實施狀態 |
|------|------|---------|
| 第一層 | SOUL.md 明確角色邊界，超出範圍拒絕回應 | ✅ 已實施（各 Agent 完整版 SOUL.md，2026-03-18 更新）|
| 第二層 | 安全主管 Agent 對高風險請求進行二次審核 | ✅ 已部署（security-lead）|
| 第三層 | CEO Agent 跨部門協調時要求提供來源依據 | ✅ 已部署（ceo SOUL.md）|
| 第四層 | it-ops Agent 定期備份工作區，異常上報秘書 | ✅ 已部署（it-ops SOUL.md）|

### 4.2 安全紅線四層機制

| 層級 | 規則 | 負責 Agent |
|------|------|-----------|
| 第一層 | 嚴禁執行任何資金操作（轉帳/交易/授權）| ceo、security-lead SOUL.md |
| 第二層 | 新 Skill 上線必須首席架構師 + 安全主管雙人審核 | chief-architect + security-lead |
| 第三層 | gateway.nodes.denyCommands 硬性封鎖危險命令 | openclaw.json 已配置 |
| 第四層 | Bitget 等交易所接口僅開放只讀 API，不配置交易權限 | Phase 4 待實施 |

> **Skill 雙人審核**：chief-architect 已於 Phase 2 部署，雙人審核機制現已生效。

### 4.3 API 模型策略

- 所有 Agent 一律使用 **Anthropic API**，不使用本地模型
- chief-architect 為週度冷備（按需啟動），使用最高階模型 claude-opus-4-6
- 業務線核心 Agent 使用 claude-sonnet-4-6
- 高頻低複雜度任務使用 claude-haiku-4-5

### 4.4 Token 預算機制

> **重要**：OpenClaw 2026.3.13 **不支持 `agents.defaults.budget` 字段**。
> **替代方案**：在 Anthropic Console 設定帳號級別的用量提醒；由 it-ops Agent 定期查詢 token 用量並回報。

### 4.5 每週商業機會提案工作流

researcher + data-analyst 已於 Phase 2 部署完成，此工作流現已可用。Phase 3 正式啟動設計。

### 4.6 Claude Code 技術工作流

**原則**：Claude Code 不主動 push 到遠端、不重啟服務（除非 Jack 明確指示）、所有破壞性操作需 Jack 確認。

---

## 5. Discord 頻道路由對應表

**伺服器 ID**：`1480807292248133684`

| 頻道名稱 | 頻道 ID | 路由 Agent | 備註 |
|---------|---------|-----------|------|
| 秘書 | 1482282914921185381 | secretary | |
| 安全主管 | 1482282917605675038 | security-lead | |
| ceo | 1482282919547633715 | ceo | |
| 社群客服 | 1482282922277994588 | community-support | |
| it運維 | 1482282924723142677 | it-ops | |
| 首席架構師 | 1483426457568153620 | chief-architect | |
| 主編 | 1483426460092858379 | editor-chief | |
| 中文寫手 | 1483426476056641653 | writer-cn | |
| 技術總監 | 1483426478984265818 | tech-lead | |
| 研究員 | 1483426715828224090 | researcher | |
| 數據分析師 | 1483426688938414230 | data-analyst | |
| 發佈專員 | 1483426599574704269 | publisher | |
| 資產總監 | 1483426602976149614 | asset-director | |
| 其他所有頻道 | — | main | 預設路由 |

**重要**：`requireMention: false` 設定在 `channels.discord.guilds.1480807292248133684`，頻道內直接發訊息即可觸發 Agent。

---

## 6. 當前 openclaw.json 關鍵配置

### Agent 模型
```
main              → anthropic/claude-haiku-4-5（繼承 defaults）
secretary         → anthropic/claude-haiku-4-5
security-lead     → anthropic/claude-haiku-4-5
ceo               → anthropic/claude-sonnet-4-6
community-support → anthropic/claude-haiku-4-5
it-ops            → anthropic/claude-haiku-4-5
chief-architect   → anthropic/claude-opus-4-6
editor-chief      → anthropic/claude-sonnet-4-6
writer-cn         → anthropic/claude-sonnet-4-6
tech-lead         → anthropic/claude-sonnet-4-6
researcher        → anthropic/claude-sonnet-4-6
data-analyst      → anthropic/claude-sonnet-4-6
publisher         → anthropic/claude-haiku-4-5
asset-director    → anthropic/claude-sonnet-4-6
```

### 核心參數
- `gateway.port`: 18789，`bind`: loopback
- `agents.defaults.maxConcurrent`: 4
- `sandbox.mode`: off
- `requireMention`: false（guild 層級）
- `streaming`: off

---

## 7. SOUL.md 系統提示（各 Agent 人格）

> **重要**：所有 SOUL.md 已於 2026-03-18 更新為完整版，包含：身份、核心職責、行為邊界、匯報關係、幻覺控制規則、輸出格式六個模塊。

| Agent | SOUL.md 路徑 |
|-------|-------------|
| secretary | `~/.openclaw/workspace-secretary/SOUL.md` |
| chief-architect | `~/.openclaw/workspace-chief-architect/SOUL.md` |
| security-lead | `~/.openclaw/workspace-security-lead/SOUL.md` |
| ceo | `~/.openclaw/workspace-ceo/SOUL.md` |
| editor-chief | `~/.openclaw/workspace-editor-chief/SOUL.md` |
| writer-cn | `~/.openclaw/workspace-writer-cn/SOUL.md` |
| tech-lead | `~/.openclaw/workspace-tech-lead/SOUL.md` |
| researcher | `~/.openclaw/workspace-researcher/SOUL.md` |
| data-analyst | `~/.openclaw/workspace-data-analyst/SOUL.md` |
| publisher | `~/.openclaw/workspace-publisher/SOUL.md` |
| community-support | `~/.openclaw/workspace-community-support/SOUL.md` |
| it-ops | `~/.openclaw/workspace-it-ops/SOUL.md` |
| asset-director | `~/.openclaw/workspace-asset-director/SOUL.md` |

---

## 8. Claude Desktop MCP 配置

> 配置文件位置：`~/Library/Application Support/Claude/claude_desktop_config.json`

### 已啟用的 MCP Server（4個，2026-03-18 配置完成）

| MCP Server | 用途 | 狀態 |
|-----------|------|------|
| filesystem | 直接讀寫 Mac 本地文件（根目錄：/Users/jack）| ✅ running |
| github | 操作 GitHub 倉庫、issue、PR | ✅ running |
| brave-search | 網絡搜索（每月 $5 免費額度）| ✅ running |
| bash | 直接執行 Mac 終端命令 | ✅ running |

### bash MCP Server 本地文件位置
```
~/.mcp-servers/bash-server/
├── index.js      # server 主程式
└── package.json  # 依賴配置
```

### MCP 能力說明
有了這 4 個 MCP，在 claude.ai 對話窗口中可以直接：
- 讀寫任何本地文件（SOUL.md、openclaw.json 等）
- 執行任意 shell 命令（重啟 Gateway、查看日誌等）
- 操作 GitHub 倉庫（版本控制、commit、push）
- 主動搜索最新網絡信息

**實際效果**：Jack 布置任務後可直接離開，Claude 自主完成所有操作，無需手動 copy-paste 指令。

### 重要憑證（MCP 相關）
| 憑證 | 存放位置 |
|------|---------|
| GitHub Token | claude_desktop_config.json → mcpServers.github.env |
| Brave API Key | claude_desktop_config.json → mcpServers.brave-search.env |

---

## 9. 已知問題

### 9.1 openclaw status 顯示「unreachable」
- **現象**：`openclaw status` 顯示 `Gateway unreachable (missing scope: operator.read)`
- **實際狀態**：Gateway 正常運作，Discord 連線 OK
- **原因**：OpenClaw 2026.3.13 CLI 顯示 bug
- **臨時確認方式**：`openclaw gateway call health`

### 9.2 Discord native commands 部署失敗
- **現象**：每次 Gateway 啟動時 `deploy-rest:put:error fetch failed`
- **影響**：slash commands 無法更新，但不影響消息路由和 Agent 回覆
- **狀態**：持續觀察中

### 9.3 Security Audit 警告
- `sandbox.mode=off` 下使用小模型（需 Docker 才能開啟 sandbox）
- Discord slash commands 無 allowlist（不影響 allowFrom 用戶）

---

## 10. 下一步待辦

### Phase 2（✅ 已完成，2026-03-18）
- [x] 部署 8 個新 Agent：chief-architect、editor-chief、writer-cn、tech-lead、researcher、data-analyst、publisher、asset-director
- [x] 為每個新 Agent 建立 workspace、完整版 SOUL.md、agentDir
- [x] 在 Discord 建立對應頻道並更新 bindings
- [x] 所有 13 個 Agent SOUL.md 升級為完整版（身份/職責/邊界/匯報/幻覺控制/輸出格式）
- [x] 配置 Claude Desktop MCP（filesystem + github + brave-search + bash）

### Phase 3（進行中）
- [ ] 建立 SOUL.md Git 版本控制倉庫
- [ ] 設計並啟動每週商業機會提案工作流（researcher → data-analyst → CEO → Jack）

### Phase 4
- [ ] 配置 Bitget 只讀 API（僅查詢資產，嚴禁交易權限，asset-director 使用）
- [ ] 接入飛書頻道（`channels.feishu`）
- [ ] 接入微信頻道（評估技術可行性）

### 長期基礎設施
- [ ] 建立 it-ops Agent 的週報自動化流程
- [ ] chief-architect 主導 SOUL.md 系統迭代評審（週度啟動）

---

## 11. 重要憑證清單

> **安全提示**：以下憑證的實際值存放在指定位置，請勿以明文傳輸或分享。

| 憑證名稱 | 存放位置 | 用途 |
|---------|---------|------|
| Anthropic API Key | `~/.openclaw/openclaw.json` → `env.ANTHROPIC_API_KEY` | Anthropic Claude API 認證 |
| Discord Bot Token | `~/.openclaw/openclaw.json` → `channels.discord.token` | Discord Bot 連線認證 |
| Gateway Auth Token | `~/.openclaw/openclaw.json` → `gateway.auth.token` | CLI → Gateway 本地認證 |
| Device Operator Token | `~/.openclaw/identity/device-auth.json` → `tokens.operator.token` | 設備配對認證 |
| GitHub Token | `~/Library/Application Support/Claude/claude_desktop_config.json` | Claude Desktop MCP GitHub 操作 |
| Brave Search API Key | `~/Library/Application Support/Claude/claude_desktop_config.json` | Claude Desktop MCP 網絡搜索 |
| Bitget 只讀 API Key | 待配置 | 資產查詢（Phase 4，嚴禁交易權限）|
| 飛書 Bot Token | 待配置 | 飛書頻道接入（Phase 4）|
| Brave 帳號 | mazengxin66@gmail.com | Brave Search API Dashboard 登入 |

---

## 12. 常用維運指令

```bash
# 狀態檢查
openclaw gateway call health

# 日誌查看
tail -n 50 /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log

# 過濾錯誤日誌
tail -n 100 /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | python3 -c "
import sys,json
for line in sys.stdin:
    line=line.strip()
    if not line: continue
    try:
        d=json.loads(line)
        level=d.get('_meta',{}).get('logLevelName','')
        if level in ('ERROR','WARN'):
            msg=' '.join(str(d.get(str(i),'')) for i in range(3) if d.get(str(i)))
            print(f\"{d.get('time','')}  {level}  {msg[:120]}\")
    except: pass
"

# 配置驗證
openclaw config validate

# Gateway 重啟
openclaw gateway restart

# 確認 Agent 模型配置
cat ~/.openclaw/openclaw.json | python3 -c "import sys,json; cfg=json.load(sys.stdin); [print(a['id'], a.get('model','')) for a in cfg['agents']['list']]"
```

---

## 13. 目錄結構

```
~/.openclaw/
├── openclaw.json
├── identity/
│   └── device-auth.json
├── agents/
│   ├── main/agent/
│   ├── secretary/agent/
│   ├── security-lead/agent/
│   ├── ceo/agent/
│   ├── community-support/agent/
│   ├── it-ops/agent/
│   ├── chief-architect/agent/
│   ├── editor-chief/agent/
│   ├── writer-cn/agent/
│   ├── tech-lead/agent/
│   ├── researcher/agent/
│   ├── data-analyst/agent/
│   ├── publisher/agent/
│   └── asset-director/agent/
├── workspace/                        # main agent 工作區
├── workspace-secretary/SOUL.md       ✅ 完整版
├── workspace-chief-architect/SOUL.md ✅ 完整版
├── workspace-security-lead/SOUL.md   ✅ 完整版
├── workspace-ceo/SOUL.md             ✅ 完整版
├── workspace-editor-chief/SOUL.md    ✅ 完整版
├── workspace-writer-cn/SOUL.md       ✅ 完整版
├── workspace-tech-lead/SOUL.md       ✅ 完整版
├── workspace-researcher/SOUL.md      ✅ 完整版
├── workspace-data-analyst/SOUL.md    ✅ 完整版
├── workspace-publisher/SOUL.md       ✅ 完整版
├── workspace-community-support/SOUL.md ✅ 完整版
├── workspace-it-ops/SOUL.md          ✅ 完整版
└── workspace-asset-director/SOUL.md  ✅ 完整版

~/.mcp-servers/
└── bash-server/
    ├── index.js      # bash MCP server 主程式
    └── package.json

~/Library/Application Support/Claude/
└── claude_desktop_config.json   # Claude Desktop MCP 配置（4個 server）

~/Library/Application Support/io.github.clash-verge-rev.clash-verge-rev/
├── profiles.yaml
└── profiles/
    ├── RwUvFUV5QQs1.yaml   # 主訂閱配置
    └── rFsdh1bJC1fC.yaml   # 規則覆蓋（discord/anthropic 域名）
```

---

## 14. 渠道擴展計劃

| 渠道 | 狀態 | Phase | 備註 |
|------|------|-------|------|
| Discord | ✅ 已接入 | Phase 1 | 主要操作渠道 |
| 飛書 | 計劃中 | Phase 4 | `channels.feishu` 配置 |
| 微信 | 評估中 | Phase 4+ | 需評估技術可行性 |

---

## 15. Claude Code 使用技巧

### 15.1 ultrathink 深度推理模式

| 關鍵詞 | 強度 |
|--------|------|
| `ultrathink` | 最高 |
| `think harder` | 次級 |
| `think` | 基礎 |

**適用場景**：複雜架構決策、SOUL.md 設計、安全策略審查、難以復現的 Bug 診斷

### 15.2 新對話上下文整理

**每次對話開始**：讀取 `~/OpenClaw_Handoff_v2.md`
**每完成重要操作**：更新本文件並複製到桌面

```bash
cp ~/OpenClaw_Handoff_v2.md ~/Desktop/OpenClaw_Handoff_v2.md
```

---

*文件生成時間：2026-03-17 | 最後更新：2026-03-18（Phase 2 完成 + 13個SOUL.md完整版 + MCP配置完成）| OpenClaw 2026.3.13*
