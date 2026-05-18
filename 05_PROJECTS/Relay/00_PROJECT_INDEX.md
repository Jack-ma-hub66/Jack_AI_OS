# DecodeX_Relay — 项目入口（原 Relay）

> AI 代做服务（P4 业务线）。沿用既有 Relay 目录名，未来可 rename 为 DecodeX_Relay。
> 时区基准：UTC+8。

---

## 项目概述

DecodeX 5 柱业务线之一（P4）。承接付费 AI 代做需求：App / 网站 / 落地页 / 数据清洗 / 自动化脚本。
- 子域名：relay.decodex.cc
- 收款：仅 Tier-1 KYC（Wise / Stripe / 个人收款），**禁与 D 线产生任何资金 / 账户 / 设备关联**
- 不主动获客（G3 Gate 前），只接已付款 inbound

## 当前阶段

模板占位 → **待 D2 (2026-05-13 周三 UTC+8) 创建落地页 + 报价表 + 已付款工作流**。

按 DECISIONS.md D4：5 柱全部铺排，按优先级先后启动；DecodeX_Relay 在 Oracle / Trade / Journal 之后启动，G3 Gate 前为被动承接模式。

## 真实代码仓库

- 落地页代码：待建（计划于 `decodex-corp` 仓库 monorepo 子目录）
- 子域 DNS：Cloudflare（待 D2 配置 relay.decodex.cc CNAME）

## 必读文件（按顺序）

1. 本文件
2. `~/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/DECISIONS.md`（5 柱优先级 / 合规边界）
3. `~/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/outputs/PROJECT_DESIGN_v3.1.md §1 P4 行`
4. `DECISIONS.md`（项目级，待建）
5. `TASK_PACKETS/` 当前活跃任务

## 当前最高优先级

- D2：建立 relay.decodex.cc 落地页（仅服务清单 + 报价 + 联系入口，不主动获客）
- G2 (2026-06-08 周一)：评估第一笔已付款 inbound 是否出现，触发砍线 Gate 评估

## 关键上下文（合规边界）

- **不是 D 线合规外壳**（原 v2.0 memory 错误描述「Relay 是 D 线的合规外壳」已废）
- Relay 完全独立合规服务，与 D 线无业务、资金、客户、设备关联
- 仅接 KYC 合规客户付费需求；不签 D 线相关合同

## 下一步

按 SCHEDULE_14day D2 任务执行。VP-Relay 由 DecodeX_Corp MVP 12 体系提供（见 AGENTS.md）。
