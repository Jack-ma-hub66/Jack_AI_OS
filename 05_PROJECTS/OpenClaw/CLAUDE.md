# OpenClaw 項目配置

## 項目上下文

每次對話開始時，請先讀取以下文件了解項目狀態：
1. `~/Jack_AI_OS/05_PROJECTS/OpenClaw/00_PROJECT_INDEX.md` — 項目入口
2. `~/Jack_AI_OS/05_PROJECTS/OpenClaw/handoff/OpenClaw_Handoff_v3.md` — 當前主交接文檔
3. `~/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/AGENTS.md` — DecodeX_Corp MVP 12 體系（沿用 OpenClaw SOUL.md 框架）

每完成一個重要操作後，主動更新 handoff/。

---

## 思考模式規則（OpenClaw 專屬追加）

遇到以下情況時，自動使用 ultrathink 深度推理：
- 修改 openclaw.json 配置
- 設計或修改任何 SOUL.md

---

## 運行時系統位置（路徑校正 2026-05-12）

- CLI 配置：`~/.openclaw/openclaw.json`
- 角色工作區：`~/.openclaw/workspace-*/`
- 系統服務：`~/Library/LaunchAgents/ai.openclaw.gateway.plist`
- 歷史原始文檔（已遷至歸檔，2026-05-11）：`~/Jack_AI_OS/09_ARCHIVE/projects/OpenClaw_legacy/open_claw_files/`
- SOUL.md 存放位置（**待 D6 創建**）：`~/Jack_AI_OS/05_PROJECTS/OpenClaw/outputs/souls/`
