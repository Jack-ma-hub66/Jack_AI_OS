# OpenClaw 項目配置

## 項目上下文

每次對話開始時，請先讀取以下文件了解項目狀態：
1. `~/Jack_AI_OS/05_PROJECTS/OpenClaw/HANDOFF.md` — 當前主交接文檔
2. `~/Jack_AI_OS/05_PROJECTS/OpenClaw/AGENTS.md` — 角色設計現況

每完成一個重要操作後，主動更新 HANDOFF.md。

---

## 思考模式規則（OpenClaw 專屬追加）

遇到以下情況時，自動使用 ultrathink 深度推理：
- 修改 openclaw.json 配置
- 設計或修改任何 SOUL.md

---

## 運行時系統位置

- CLI 配置：`~/.openclaw/openclaw.json`
- 角色工作區：`~/.openclaw/workspace-*/`
- 系統服務：`~/Library/LaunchAgents/ai.openclaw.gateway.plist`
- 原始文檔：`~/open claw files/`（歷史歸檔保留原位）
