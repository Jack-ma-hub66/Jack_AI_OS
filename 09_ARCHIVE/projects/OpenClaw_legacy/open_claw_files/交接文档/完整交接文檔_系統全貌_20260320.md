# OpenClaw 完整交接文檔
**版本**：2026-03-20 最終版（含糾錯指南）
**覆蓋範圍**：從 Phase 0 到當前（Phase 3 完成 + cron 測試完成 + 停止推送）
**狀態**：系統暫停自動推送，等待角色設計完善後全面啟動

> 新對話窗口開始時，讀這一份文件即可獲得完整上下文，不需要再讀其他文件。

---

## 零、如何在 Claude 工作時糾正它

這是最重要的一節，放在最前面。

### Claude 常見的失誤模式

**1. 跑偏方向，做了沒被要求的事**
直接說：「停，我要的是 X，不是 Y。」不需要解釋為什麼，Claude 會立刻修正。

**2. 把簡單問題複雜化**
直接說：「你想太多了，直接做就行。」或「這件事很簡單，一步解決。」

**3. 在問題已解決的情況下繼續找解法**
這次對話的真實案例：cron 工作流已成功投遞（Discord 收到消息），Claude 還在用 `openclaw agent` 指令做連通性測試，得到 block 結果後繼續找解法。Jack 截圖說「我已經收到消息了」，Claude 才停下來。
**糾正方式**：「問題已經解決了，停止當前操作。」

**4. 工具掉線時繞圈子，不直接說**
長對話末段工具會掉線。Claude 如果在試了幾次後還在兜圈，直接說：「開新窗口」，不要等它想辦法。

**5. 附和而不是直接指出問題**
如果 Claude 沒有指出你方案的問題，說：「你有沒有發現這個方案的漏洞？」或「直接告訴我這樣做有什麼風險。」

**6. 交接文件遺漏**
如果你覺得 Claude 的總結不完整，說：「你遺漏了 X，補上去。」它會直接更新文件，不需要你重新描述。

### 幾條實用原則

- **隨時打斷**：Claude 在執行長任務時，任何時候說「停」它都會停。
- **不需要解釋理由**：「不對，重來」就夠了，不需要說為什麼。
- **直接指令優於問句**：「把第三節刪掉」比「你覺得第三節需要嗎？」更有效率。
- **工具掉線就開新窗口**：這個對話窗口的工具掉了就是掉了，不能恢復，不要浪費時間。
- **Claude 不記得上一個窗口的對話**：每個新窗口必須讀交接文件，這是硬性要求，不是建議。

### Claude 在這次對話中的主要失誤（供參考）

| 失誤 | 描述 | Jack 如何糾正 |
|------|------|--------------|
| 忘記驗證 cron | cron 配置完但沒有在 09:00 後主動確認是否跑成功 | Jack 主動提問 |
| 問題解決後繼續找解法 | Discord 已收到消息，還在做連通性測試 | Jack 截圖指出 |
| 生成交接文件時遺漏 | 只總結了當前對話，沒包含所有歷史對話 | Jack 直接指出 |
| 工具掉線時沒有直接說 | 在工具掉線後繼續嘗試，沒有立刻告訴 Jack 要開新窗口 | Jack 指出後才解決 |
| 停止 cron 時兜圈 | Jack 說停掉推送，Claude 說要開新窗口或讓 Jack 自己執行，沒有先嘗試用現有工具解決 | Jack 說「有什麼辦法你來想」 |

---

## 一、系統當前狀態總覽

### 已完成
- Phase 0 ✅ 環境搭建（OpenClaw 安裝、Gateway、Discord 接入）
- Phase 1 ✅ 5個 Agent 部署（secretary、security-lead、ceo、community-support、it-ops）
- Phase 2 ✅ 8個 Agent 部署（chief-architect、editor-chief、writer-cn、tech-lead、researcher、data-analyst、publisher、asset-director）
- Phase 3 ✅ SOUL.md Git 版本控制、每日商業機會工作流設計與測試、secretary 重設計
- cron 工作流 ✅ 已測試兩天（2026-03-19/20），功能正常，**現已暫停**（等系統完善後重啟）
- Project Instructions ✅ claude.ai「Prompt Optimizer」Project 已更新，包含 OpenClaw 完整上下文

### 當前系統狀態
- Gateway：運行中，Discord 連接正常
- 13 個 Agent：全部部署（含 main 共 14 個）
- cron 每日推送：**已停止**（`enabled: false`）
- SOUL.md 版本控制：GitHub `Jack-ma-hub66/openclaw-soul`，當前 v2.0.0

---

## 二、硬件與環境

| 項目 | 規格 |
|------|------|
| 機器 | Mac Mini M4，16GB，macOS 26.x (arm64) |
| Node | 25.6.1 |
| IP | 10.1.6.57 |
| OpenClaw | 2026.3.13 |
| 網路代理 | Clash Verge v1.19.20，TUN 模式開啟，HTTP 端口 7897 |

---

## 三、完整 Agent 架構（13個 + 1個擱置）

### 直屬線（3個）
| Agent ID | 名稱 | 模型 | Discord 頻道 ID |
|----------|------|------|----------------|
| secretary | 秘書（系統守衛）| claude-haiku-4-5 | 1482282914921185381 |
| chief-architect | 首席架構師 | claude-opus-4-6 | 1483426457568153620 |
| security-lead | 安全主管 | claude-haiku-4-5 | 1482282917605675038 |

### 業務線（CEO 統轄，9個）
| Agent ID | 名稱 | 模型 | Discord 頻道 ID |
|----------|------|------|----------------|
| ceo | CEO | claude-sonnet-4-6 | 1482282919547633715 |
| editor-chief | 主編 | claude-sonnet-4-6 | 1483426460092858379 |
| writer-cn | 中文寫手 | claude-sonnet-4-6 | 1483426476056641653 |
| tech-lead | 技術總監 | claude-sonnet-4-6 | 1483426478984265818 |
| researcher | 研究員 | claude-sonnet-4-6 | 1483426715828224090 |
| data-analyst | 數據分析師 | claude-sonnet-4-6 | 1483426688938414230 |
| publisher | 發佈專員 | claude-haiku-4-5 | 1483426599574704269 |
| community-support | 社群客服 | claude-haiku-4-5 | 1482282922277994588 |
| it-ops | IT運維員 | claude-haiku-4-5 | 1482282924723142677 |

### 資產管理線（1個）
| Agent ID | 名稱 | 模型 | Discord 頻道 ID |
|----------|------|------|----------------|
| asset-director | 資產總監 | claude-sonnet-4-6 | 1483426602976149614 |

### 擱置
| Agent ID | 啟用條件 |
|----------|---------|
| writer-en | 英文需求 > 每週 2-3 次時啟用 |

---

## 四、重要配置記錄

### openclaw.json 關鍵設定
```json
gateway.port: 18789
agents.defaults.maxConcurrent: 4
sandbox.mode: off
requireMention: false（guild 層級）
env.HTTP_PROXY: http://127.0.0.1:7897   ← 解決 SSRF/TUN 衝突的關鍵
env.HTTPS_PROXY: http://127.0.0.1:7897
env.NO_PROXY: 127.0.0.1,localhost,10.0.0.0/8
```

### Clash 規則文件（rFsdh1bJC1fC.yaml）已配置走主代理的域名
```
discord.com / discordapp.com / discord.gg / cloudflare.com / anthropic.com
github.com / producthunt.com / x.com / twitter.com / reddit.com
venturebeat.com / techcrunch.com / news.ycombinator.com
trends.google.com / apps.apple.com / ycombinator.com
```
注意：Clash 規則文件的修改對 cron 無直接效果，真正起作用的是 openclaw.json 的 HTTP_PROXY。

### Claude Desktop MCP（4個，均運行中）
| MCP | 用途 |
|-----|------|
| filesystem | 讀寫本地文件（根目錄 /Users/jack）|
| github | 操作 GitHub 倉庫 |
| brave-search | 網絡搜索 |
| bash | 執行終端命令 |

### MCP 使用原則
- 有工具能做的事，先做再說，不要請求 Jack 提供文件或口述
- Jack 提到文件有更新時，直接用 filesystem MCP 讀取本地最新版本
- 沒試過就說「不行」是錯誤行為

---

## 五、cron 工作流記錄

### 每日商業機會提案
- **Job ID**：2849eede-8368-48c3-a0fe-44037790595c
- **排程**：每日 08:50 Asia/Shanghai（**現已停止，enabled: false**）
- **流程**：researcher 四方向掃描 → data-analyst 評估 → ceo 產出 Top3 簡報 → Discord #ceo @Jack
- **重啟命令**：`openclaw cron enable 2849eede-8368-48c3-a0fe-44037790595c`
- **停止原因**：測試兩天完成，等所有角色 SOUL.md 優化完畢後重啟

### cron 調試過程關鍵記錄

**問題一：Clash TUN + OpenClaw SSRF 衝突**（已解決）
- 現象：researcher 的 web_fetch 被 SSRF 防護封鎖，researcher 無法訪問任何外部域名
- 根本原因：TUN 模式讓 DNS 解析返回虛擬 IP，SSRF 防護誤判為私有地址——兩個系統各自正確，互相衝突
- 解法：openclaw.json env 加入 HTTP_PROXY=http://127.0.0.1:7897
- HTTP_PROXY 對 cron isolated session 有效，但對 `openclaw agent` 直接指令無效（兩種執行路徑不同）
- TUN 模式必須保持開啟，否則 Discord 投遞會被 403 拒絕
- 修改 openclaw.json 後必須執行 `openclaw gateway restart`

**問題二：sub-agent 投遞超時**（已理解，暫時接受）
- 現象：cron 跑完但 Discord 收到的是中間輸出（`capabilities=none`）而不是最終格式簡報
- 原因：Mac 安全更新重啟後，Gateway 啟動時間比 cron 觸發晚，sub-agent 嘗試投遞時 Gateway 未就緒
- 實際結果：`lastDeliveryStatus: delivered`，簡報還是送到了，只是多一條中間輸出消息
- 解法：確保 Mac 在 08:50 前完全啟動即可，不需要調整 cron 時間

**調試過程的教訓**：
- cron 配置完要在下一個觸發時間後主動確認是否成功，不能配置完就算結束
- `openclaw agent` 指令的網絡路徑與 cron isolated session 不同，不能用前者的結果判斷後者的狀態

---

## 六、SOUL.md 設計狀態

### 版本控制
- **倉庫**：`github.com/Jack-ma-hub66/openclaw-soul`（private）
- **當前版本**：v2.0.0
- **修改原則**：本地先改，GitHub 後同步

### 角色設計狀態

| 角色 | 狀態 | 說明 |
|------|------|------|
| secretary | ✅ 重設計完成 | 從「信息中樞」改為「系統守衛」|
| researcher | ✅ 已修正 | 每日觸發邏輯（原為每週）|
| data-analyst | ✅ 已修正 | 每日觸發邏輯（原為每週）|
| ceo | ✅ 已修正 | 每日觸發邏輯（原為每週）|
| security-lead | 🔴 待修正 | 「監控」是誤導描述，沒有主動監控能力 |
| asset-director | 🔴 待修正 | Bitget API 未就緒，需加限制標注防止捏造數據 |
| publisher | 🔴 待修正 | 只有 Discord 可用，需明確標注 |
| it-ops | 🔴 待修正 | 備份指令和監控路徑缺失，核心職責無法自動執行 |
| chief-architect | 🔴 待修正 | 輸入來源空白，評審是空轉；沒有 cron |
| community-support | 🟡 待設計 | 知識庫方案未確定 |
| editor-chief | 🟢 暫時合理 | 暫無需大改 |
| writer-cn | 🟢 暫時合理 | 暫無需大改 |
| tech-lead | 🟢 暫時合理 | 暫無需大改 |

### secretary 新設計核心
- 各 Agent 原始簡報直接推送 Jack，不經 secretary 聚合
- 強制優先級標籤：🔴P0/🟠P1/🟡P2/🟢P3
- P0/P1 直接 @Jack，不經 secretary；每日 P0 上限 2 個，超過自動降級
- secretary 只做監控、記錄、矛盾識別，不做聚合和裁決

### 角色修改標準流程
1. 讀本地 `~/.openclaw/workspace-{agent}/SOUL.md`
2. 分析缺陷
3. 寫入新版到本地（本地先改）
4. 同步 GitHub
5. 更新 CHANGELOG

---

## 七、系統設計原則（已確認，不需重新討論）

- **防漏優先於防錯**——最高原則，所有架構決策的優先依據
- 各 Agent 原始簡報直接推送 Jack，不經 secretary 聚合
- 每個 Agent 匯報強制帶優先級標籤，P0/P1 直接 @Jack
- 每日 P0 上限 2 個，防虛報用結構性限制不用懲罰
- 事實矛盾：要求兩方提供原始來源，secretary 做矛盾識別器，Jack 裁決
- 業務規則變更必須上報 Jack；客觀事實更新可自動但需標注來源
- 日程提醒：宏觀經濟數據 → asset-director；科技發布會 → researcher
- 絕對財務紅線：任何 Agent 不得執行任何財務交易，包括 CEO
- Agent-to-Agent 通信能力待確認（決定 secretary 推模式能否落地）

---

## 八、Phase 4 待辦

1. **Bitget 只讀 API**：供 asset-director 查詢，嚴禁交易權限
2. **飛書頻道接入**：openclaw.json → `channels.feishu`
3. **微信可行性評估**：確認 OpenClaw 2026.3.13 是否支持
4. **重啟每日 cron**：角色優化完成後執行 `openclaw cron enable 2849eede-8368-48c3-a0fe-44037790595c`
5. **配置 secretary / it-ops / chief-architect 的 cron**

---

## 九、外部工具情報（未安裝，供參考）

### 6551Team MCP（2026-03-19 發現）

**opennews-mcp**（`github.com/6551Team/opennews-mcp`）——重點
- 數據源：Bloomberg、Reuters、CoinDesk、Cointelegraph 等幾十個媒體 + Twitter/X + 鏈上事件
- 功能：關鍵詞搜索、按幣種/信號/分數篩選、WebSocket 實時推送
- 有 OpenClaw Skill 目錄，一條命令接入；需先到 `https://6551.io/mcp` 申請 Token
- 對 asset-director：可替代手動追蹤 KOL，拿 Bloomberg/CoinDesk 級別信號
- 對 researcher：可替代部分 web_fetch，繞開 SSRF 問題

**daily-news**（`github.com/6551Team/daily-news`）——輕量版
- 按分類拉取新聞和熱門推文，帶 AI 評分和雙語摘要

### Agent Skill 設計模式（Google Cloud Tech，2026-03-19）
來源：「5 Agent Skill design patterns every ADK developer should know」

- **Tool Wrapper**：按需加載技術規範，不常駐 system prompt
- **Generator**：強制輸出格式一致性，SKILL.md 只做步驟協調
- **Reviewer**：把「檢查什麼」和「怎麼檢查」分離，規則存獨立文件
- **Inversion**：Agent 先問問題再執行，強制門禁收集完整需求
- 第五個模式：未獲取

啟示：SOUL.md 未來可把規則抽到各 workspace 的 `references/` 目錄，SOUL.md 只做協調，chief-architect 改規則文件粒度更細。

---

## 十、重要憑證位置

| 憑證 | 存放位置 |
|------|---------|
| Anthropic API Key | ~/.openclaw/openclaw.json → env.ANTHROPIC_API_KEY |
| Discord Bot Token | ~/.openclaw/openclaw.json → channels.discord.token |
| HTTP_PROXY | ~/.openclaw/openclaw.json → env.HTTP_PROXY（已配置）|
| GitHub Token | ~/Library/Application Support/Claude/claude_desktop_config.json |
| Brave Search API Key | ~/Library/Application Support/Claude/claude_desktop_config.json |
| Brave 帳號 | mazengxin66@gmail.com |
| Bitget 只讀 API Key | 待配置（Phase 4）|
| 飛書 Bot Token | 待配置（Phase 4）|

---

## 十一、常用維運指令

```bash
# 狀態確認
openclaw gateway call health

# cron 管理
openclaw cron list
openclaw cron enable 2849eede-8368-48c3-a0fe-44037790595c   # 重啟每日推送
openclaw cron disable 2849eede-8368-48c3-a0fe-44037790595c  # 停止每日推送
openclaw cron run 2849eede-8368-48c3-a0fe-44037790595c      # 手動觸發一次
openclaw cron runs --id 2849eede-8368-48c3-a0fe-44037790595c # 查看執行歷史

# Gateway 重啟（修改 openclaw.json 後必須執行）
openclaw gateway restart

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
```

---

## 十二、已知問題（不影響運作，持續觀察）

1. `openclaw status` 顯示 unreachable — CLI bug，用 `openclaw gateway call health` 確認實際狀態
2. Gateway 啟動時 `deploy-rest:put:error fetch failed` — slash commands 無法更新，不影響消息路由
3. cron 在 Gateway 啟動後短時間內觸發可能出現 sub-agent 投遞超時 — 確保 Mac 在 08:50 前完全啟動即可
4. `openclaw cron run --name` 無效，必須用 `--id` 或直接帶 ID 參數

---

## 十三、關於 Jack 的認知（供 Claude 繼承）

**身份**：台灣，金融與科技交叉。真實資產倉位在運作，同時建立 AI 內容基礎設施，兩條線並行。

**思維**：頂層思維者，系統性抽象能力強，習慣問元問題。跨域連接直覺強，元認知清晰。

**溝通**：直接，對敷衍零容忍，接受直接反對不防禦。情緒不外露，藏在邏輯背後。

**致命弱點**：對「開始」的熱情遠高於對「完成」的執著——每個對話需要主動追蹤「上次說要做的事做了嗎」。

**合作模式**：
- 不要附和，不要在回答前說「好的」「明白了」，直接進入正題
- 發現 Jack 說錯的地方直接指出，他不會因此不高興
- 有 MCP 工具能做的事，先做再說，不要請求用戶提供文件或口述
- 遇到設計問題優先問「這個東西存不存在的邏輯是什麼」而不是「怎麼配置它」
- 所有破壞性操作（刪除、覆蓋、重啟）必須先獲 Jack 確認
- Jack 對細節跟進耐心有限，需要幫他把決策落地到執行層

---

## 十四、新對話窗口起點

讀完本文件後：

**角色設計優化線**（當前最高優先）：
從 security-lead 的 SOUL.md 修正開始，按第六節待處理清單逐一執行。

**部署執行線**（待角色優化完成後）：
Phase 4 從 Bitget 只讀 API 配置開始。

**重啟每日推送**（所有角色優化完成後）：
`openclaw cron enable 2849eede-8368-48c3-a0fe-44037790595c`

---

*生成時間：2026-03-20 | 覆蓋從 Phase 0 至 Phase 3 完成 + cron 測試停止 + 糾錯指南*
