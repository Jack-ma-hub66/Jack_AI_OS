# OpenClaw — 項目入口

> 工具讀取後必須知道：項目是什麼、當前階段、必讀文件、下一步。
> 時區基準：UTC+8。

---

## 項目概述

OpenClaw 是 Jack 構建的 AI 多角色協作系統，由 14 個專職 AI 角色組成（含 12 個 SOUL.md 框架，7 個待補完）。覆蓋 CEO、架構師、技術主管、編輯、社群支持等職能。

**與 DecodeX_Corp 的關係**：OpenClaw 為 DecodeX_Corp 提供 SOUL.md 框架。DecodeX_Corp 當前 MVP 12 = L0 Boss + 11 Agent，與 OpenClaw 14 角色的映射表待 G1 Gate 前落定（見 `DecodeX_Corp/DESIGN_DISPUTES.md DISP-P003`）。

## 當前階段

角色設計優化線進行中；7 個 SOUL.md 待補（CCO 主編 / CTO 架構 / COO IT 運維 / CMO 發布 / 社群客服 / 中文寫手 / 技術總監）。

## 真實運行時位置

- CLI 系統：`~/.openclaw/`（不在 AI OS 内，工具自管理）
- GitHub：`Jack-ma-hub66/openclaw-soul`

## 必讀文件（按順序）

1. 本文件
2. `handoff/OpenClaw_Handoff_v3.md` — 當前主交接文檔（**已遷移自家目錄 `~/OpenClaw_Handoff_v3.md`，2026-05-11**）
3. `CONTEXT_PACK.md` — 系統全貌完整記錄
4. `DECISIONS.md` — 架構決策與頭腦風暴記錄

## outputs/

- `OpenClaw_AI_Team_Architecture_v2_1.docx` — AI 團隊架構設計文檔
- `souls/` — **待 D6 (2026-05-17 周日) 創建**，用於存放 12 個 SOUL.md（含 DecodeX_Corp MVP 12 沿用模板）

## 歷史文檔（已遷移統一位置，2026-05-11）

- `handoff/OpenClaw_Handoff_v3.md`（原 `~/OpenClaw_Handoff_v3.md`）
- `~/Jack_AI_OS/09_ARCHIVE/projects/OpenClaw/OpenClaw_Handoff_v2.md`（原 `~/OpenClaw_Handoff_v2.md`）
- `~/Jack_AI_OS/09_ARCHIVE/projects/OpenClaw/OpenClaw_Project_交接文档_20260506.md`（原 `~/OpenClaw_Project_交接文档_20260506.md`）
- `~/Jack_AI_OS/09_ARCHIVE/projects/OpenClaw_legacy/open_claw_files/`（原 `~/open claw files/`）

家目錄舊文件 `~/OpenClaw_Handoff_*.md` 與 `~/open claw files/` 均已不存在；如腳本/工具仍引用，須改向上述新位置。
