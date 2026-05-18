# PROJECT_POINTERS.md — 真实代码仓库指针

> AI OS 不存放项目生产代码。
> 本文件指向真实代码所在位置。
> 时区基准：UTC+8。

---

## 主代码仓库（**已迁移，路径校正 2026-05-12**）

- 本地路径：`~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/v2/teach_v2/`
  - （旧路径 `~/trading-framework/v2/teach_v2/` 已于 2026-05-11 迁移）
- GitHub URL：https://github.com/Jack-ma-hub66/decodex-trade（私有）
- 主分支：main
- VPS 路径：`/var/www/decodex/trade/`（root@104.168.115.209，Buffalo）

## 与 DecodeX_Corp 的关系

- 本项目（DecodeX）= decodex.cc 主站建设（v2/main/index.html）
- DecodeX_Corp = 一人公司 umbrella，统筹 5 柱业务线（含 Trade 在内）
- trade.decodex.cc 源码已纳入 DecodeX_Trade 项目 source/ 目录
- 路径修订记录见 `DecodeX_Corp/PROJECT_CORRECTION_LOG.md COR-P001`

## 重要说明

- `outputs/` 只存 AI 生成的文档、Prompt、验证报告，不存生产代码
- Claude Code 执行代码任务时，工作目录是真实 repo，不是 AI OS 目录
- 修改生产代码必须在真实 repo 中进行
