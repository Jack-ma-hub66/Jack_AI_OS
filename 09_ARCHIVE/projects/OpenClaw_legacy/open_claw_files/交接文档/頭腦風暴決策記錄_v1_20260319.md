# OpenClaw 頭腦風暴決策記錄 v1.0
**日期**：2026-03-19
**來源**：Jack × Claude 深度頭腦風暴，secretary 角色重設計討論
**狀態**：已確認的決策，供下一個對話窗口直接繼承

---

## 一、secretary 角色的最終裁決

### 核心結論：secretary 的原始定位已被廢棄

原始定位「信息中樞 / 聚合所有 Agent 匯報再推送給 Jack」被明確否定。

原因：
- 信息聚合會造成單點故障，secretary 出錯則 Jack 什麼都收不到
- 過濾標準模糊，幻覺風險集中在 secretary 這個節點
- Jack 的核心需求是「確保重要信息不遺漏」，而不是「減少消息數量」

### 確認的推送模式

**各 Agent 原始簡報直接推送給 Jack，保留細節，不經 secretary 聚合。**

- Jack 接受每天收到多條來自不同 Agent 的消息
- 前提是每條消息精準，只在真正需要 Jack 注意時才發
- 推送時機待後續討論確定

### secretary 新定位：系統守衛（已完成重設計）

從「信息中樞」改為「系統守衛」，職責從聚合變為監控。
SOUL.md 已於 2026-03-19 完成重寫，本地和 GitHub 已同步，CHANGELOG 升至 v2.0.0。

---

## 二、信息優先級機制

### 確認方案：發送方定義優先級標籤

每個 Agent 在匯報時強制帶優先級標籤：
- 🔴 P0：系統崩潰、安全紅線、資金風險 → 直接 @Jack，不經 secretary
- 🟠 P1：工作流中斷、重要任務延誤、數據異常 → 直接 @Jack，secretary 事後記錄
- 🟡 P2：一般異常、需要決策但不緊急 → 匯報 secretary，納入每日記錄
- 🟢 P3：常規進度更新、信息通報 → 匯報 secretary，納入每日記錄

secretary 不做主觀判斷，只按標籤路由。

### 防虛報機制

**結構性限制，不用懲罰機制**（Agent 沒有求生本能，懲罰無效）：
- 每個 Agent 每日標 🔴 上限為 2 個，超過自動降級為 🟠
- chief-architect 週度評審各 Agent 的優先級標注記錄
- 誤報率超過閾值觸發 SOUL.md 修訂

---

## 三、矛盾信息處理

### 事實矛盾
讓產生矛盾的兩個 Agent 提供原始數據來源，沒有原始來源的結論直接標「不可信」，有來源的讓 Jack 自行判斷。secretary 不做裁判，只做「矛盾識別器」和「來源收集器」。

### 優先級矛盾
執行問題一律按緊急事件直接發給 Jack，由 Jack 決策。

### 時間矛盾
區分兩種情況：
- **業務規則的改變**：必須上報 Jack，獲批後才能更改
- **客觀事實的更新**：允許自動更新，但必須標注變更說明和來源

---

## 四、備份機制

### 確認方案：一主兩輔，三條路同步更新

- **主路（本地文件系統）**：日常工作的讀寫來源，filesystem MCP 零成本支撐
- **輔路一（外部數據庫）**：長期歸檔，不作為日常查詢源
- **輔路二（OpenClaw memory）**：當日快速索引，容量小但查詢快

三條路同步更新，維護成本疊加 Jack 可接受。

---

## 五、日程提醒職責重分配

**從 secretary 移出，分配給：**
- researcher：科技圈發布會、行業重大事件日程
- asset-director：宏觀經濟數據日曆（美聯儲議息、非農、PPI、CPI 等）

secretary 不再承擔任何日程管理職責。

---

## 六、緊急事件處理

### 確認等級劃分

| 等級 | 定義 | 路徑 |
|------|------|------|
| 🔴 P0 | 系統崩潰、安全紅線、資金風險 | 直接 @Jack，不經 secretary |
| 🟠 P1 | 工作流中斷、重要延誤、數據異常 | 直接 @Jack，secretary 事後記錄 |
| 🟡 P2 | 一般異常、需決策但不緊急 | secretary 記錄，納入每日彙整 |
| 🟢 P3 | 常規更新、信息通報 | secretary 記錄，納入每日彙整 |

**核心原則：secretary 是信息整合層，不是緊急響應層。P0/P1 不經過 secretary。**

---

## 七、系統設計哲學（已確認）

**防漏優先於防錯。**

錯誤可以被發現和改正，遺漏永遠不會被發現。這是整個系統設計的最高原則，所有架構決策在兩者衝突時優先保證不遺漏。

---

## 八、agent 間通信機制

**待確認的前置問題**：OpenClaw 是否支持 Agent-to-Agent 直接通信？

這個問題的答案直接決定推模式/拉模式的可行性。Jack 傾向推模式（更省 token）。待 tech-lead 評估後確認。

---

## 九、下一步任務清單

按優先級排列：

1. ~~**secretary SOUL.md 重新設計**~~（✅ 已完成，2026-03-19）
2. **security-lead** — 「監控」是誤導性描述，需修正
3. **asset-director** — 加入 Bitget API 未就緒的限制標注
4. **publisher** — 明確當前只有 Discord 可用
5. **it-ops** — 補全備份指令和監控路徑
6. **chief-architect** — 補全輸入來源定義
7. **確認 OpenClaw Agent-to-Agent 通信能力**
8. **secretary / it-ops / chief-architect 配置 cron**
9. **community-support 知識庫方案設計**

---

## 十、關於 Jack 的認知（供 Claude 繼承）

以下是跨對話需要保持的對 Jack 的理解，用於確保每個新對話窗口能立即進入正確的合作模式。

**思維方式**：頂層思維者，系統性抽象能力強，習慣從本質問題出發。會自然問出元問題（「這個角色存不存在的邏輯是什麼」而不是「怎麼配置這個角色」）。

**溝通方式**：直接，不需要鋪墊，不需要溫和的包裝。對敷衍和附和有極高敏感度，會立即糾正。接受直接的反對，不防禦。

**決策風格**：結果導向，對無意義的摩擦零容忍。做決策快，但跟進細節的耐心有限。

**需要的合作模式**：
- 不要附和，要真實的對等
- 不要只執行，要有獨立判斷
- 發現問題直接說，不需要先誇再批
- 遇到他說錯的地方直接指出，他不會因此不高興

**致命弱點**（需要主動幫他對抗的）：對「開始」的熱情遠高於對「完成」的執著。設計的系統比跑起來的系統多。需要在每個對話裡主動追蹤「上次說要做的事做了嗎」。

**不需要做的事**：不需要在每次回答前說「好的」「明白了」「當然」，直接進入正題。

---

## 十一、外部工具與資源情報（供 Claude 繼承）

### 6551Team MCP 項目（2026-03-19 發現）

**daily-news**（`github.com/6551Team/daily-news`）
- 輕量版，通過 6551 API 按分類拉取新聞和熱門推文
- 每條新聞帶 AI 評分（0-100）、交易信號（bullish/bearish/neutral）、中英雙語摘要
- 適合：按主題訂閱的定時掃描場景

**opennews-mcp**（`github.com/6551Team/opennews-mcp`）
- 重量版，數據源覆蓋 Bloomberg、Reuters、CoinDesk、Cointelegraph、The Block 等幾十個媒體
- 支持關鍵詞搜索、按幣種篩選、按信號篩選、按分數閾值篩選
- 有 **WebSocket 實時推送**（事件驅動，不是輪詢）
- **已有 OpenClaw Skill 目錄**（`openclaw-skill/opennews/`），一條命令即可接入
- 需要先到 `https://6551.io/mcp` 申請 API Token

**與現有系統的關係**：
- asset-director：可替代手動追蹤 @WallStreetAiBot 等 KOL，直接用 API 拿 Bloomberg/CoinDesk 級別的信號
- researcher：可替代部分 web_fetch 掃描（繞開 Clash TUN + SSRF 的問題），直接拉 AI/科技類新聞

---

### Agent Skill 設計模式（Google Cloud Tech，2026-03-19）

來源：Google Cloud Tech 官方動態「5 Agent Skill design patterns every ADK developer should know」

**五個模式：**

**1. Tool Wrapper（工具包裝器）**
把特定技術庫的規範打包成 skill，只在需要時加載，不常駐 system prompt。SKILL.md 監聽關鍵詞觸發，從 `references/` 動態加載文檔。OpenClaw 的 SKILL.md 機制就是這個模式。

**2. Generator（生成器）**
強制輸出格式一致性。SKILL.md 只做協調，按固定步驟加載各資源文件，確保每次輸出結構相同。CEO 每日機會簡報的格式設計本質上是這個模式的手動實現。

**3. Reviewer（審查器）**
把「檢查什麼」和「怎麼檢查」分離。規則存在獨立的 `references/review-checklist.md`，換文件就能切換審查類型。security-lead 可以按這個模式重構。

**4. Inversion（反轉）**
Agent 不立刻執行，先充當提問者收集完整需求，設置硬性門禁「所有階段完成前絕對不開始執行」。適合需求複雜容易跑偏的任務，對 CEO 拆解複雜任務前的需求澄清有參考價值。

**5. 第五個模式**（搜索結果截斷，未獲取到完整內容）

**對 OpenClaw 的啟示**：
各 Agent 的 SOUL.md 目前把規則和協調邏輯混在一起。未來可以考慮把規則文件抽出來放到各 Agent workspace 的 `references/` 目錄，SOUL.md 只做協調。chief-architect 週度評審時改規則文件，粒度更細，版本控制更清晰。
