# DecodeX_Corp — 项目内设计分歧

> 仅记录影响 DecodeX_Corp 单项目的分歧。
> 系统级 / 跨项目分歧在 `07_ERROR_AND_LESSONS/DESIGN_DISPUTES.md`。
> 时区基准：UTC+8。

---

## DISP-P001 D 线翻墙业务保留 vs 全砍
- 时间：2026-05-12
- 范围：项目级
- 分歧描述：Codex redteam §1.2 + §4.1 + 总体判定建议 **直接砍 D 线**（法律 / 资金 / KYC / 主品牌污染连带风险）。Boss 决策 **保留 D 线 + 独立 VPS 物理隔离 + 包装"网络知识普及"**。

**Code 立场**：
- 观点：执行 Boss 决策，保留 D 线但加铁律隔离（DECISIONS D1 / D7）
- 证据：DECISIONS D1 已写明三条件（新 VPS / 律师书面确认 / Boss 签字），SCHEDULE 已冻结 D 线试水条目

**Codex（redteam）立场**：
- 观点：D 线即使隔离 + 包装，链上资金 + KYC + 大陆 IDC 备案锚仍会回到 Boss；法律风险红色
- 证据：Chainalysis 2024 报告 / FinCEN CVC mixing / 计算机信息网络国际联网规定 / 最高法司法解释（redteam §4.1 / §4.2 引用）

**Chat 评估**：本会话未参与（属于方案层但 Boss 已拍板）

**分歧轮次**：第 1 轮（Code 接受 Boss 拍板执行，redteam 立场写入 CANDIDATE 长期观察）
**提交 Jack 裁决**：已裁决
**Jack 裁决结果**：保留 D 线 + 独立 VPS + 包装；三条件全部满足前冻结执行
**状态**：resolved（注：redteam 风险评估保留为 candidate 观察，三条件触发前任何 D 线行为视为越权）

---

## DISP-P002 200+ Agent 蓝图 vs MVP 12
- 时间：2026-05-12
- 范围：项目级
- 分歧描述：v3.0 写 7 层 200+ Agent；redteam §8 指出无状态机 / 无审计 / 无 chaos drill 会复刻 Knight Capital / GitLab 事故。Boss 拍板 **接受 MVP 12 + 5 项 drill 后扩展**。

**Code 立场**：
- 观点：MVP 12（CEO + CRO + CCO + CTO + COO + CMO + B-Auditor + 5 VP），200+ 蓝图保留为目标
- 证据：DECISIONS D8 + AGENTS.md §1 / §4 / §5

**Codex（redteam）立场**：
- 观点：必须先建状态机 / lease / idempotency / human escalation 才能扩展；状态机 30 天零越权写入后才可扩 L4-L6
- 证据：redteam §8.1 / §8.3

**Jack 裁决结果**：接受 MVP 12 + 完成 5 项 restore drill 作为扩展 Gate（DECISIONS D8）
**状态**：resolved

---

## DISP-P003 OpenClaw 12 SOUL vs 14 角色命名冲突
- 时间：2026-05-12
- 范围：项目级（影响 AGENTS.md ↔ OpenClaw 入口）
- 分歧描述：DecodeX_Corp DECISIONS / AGENTS 写"沿用 OpenClaw 12 Agent SOUL.md 框架"；但 `~/Jack_AI_OS/05_PROJECTS/OpenClaw/00_PROJECT_INDEX.md:9` 写 OpenClaw 是 14 个角色

**Code 立场**：需要 G1 前给出 14 角色 ↔ 12 SOUL ↔ DecodeX_Corp MVP 12 三方映射表
**Codex 立场**：audit E1 已指出该冲突
**Jack 裁决**：待裁决（不阻塞 D1-D7，但 G1 Gate 前必须落定）
**状态**：open

---

## DISP-P004 Mingli ↔ DecodeX_Oracle 数据边界
- 时间：2026-05-12
- 范围：项目级
- 分歧描述：Mingli 是个人/案例命主项目；Oracle 是商业化解读服务。两者缺少边界文件

**Code 立场**：Oracle 复用 Mingli 算法 / skill；命主真实数据禁迁入商业素材；模板可复用
**Codex 立场**：audit E3 标 yellow，建议建边界文件
**Jack 裁决**：待裁决
**状态**：open

---

## DISP-P006 5 柱 + D 不冻结（Boss）vs redteam 2+1 60 天聚焦建议
- 时间：2026-05-12
- 范围：项目级
- 分歧描述：Codex redteam §1.2 + §11 + §12 建议 **60 天内只跑 2+1（Oracle 现金 + Journal 分发 + Trade 被动页），Relay/AI/D 冻结**，理由 = Boss 时间是唯一燃料，多线并发违反反脆弱。Boss 决策 **不接受冻结建议，5 柱 + D 线全部铺排，按优先级先后启动**。

**Code 立场**：
- 观点：执行 Boss 决策，DECISIONS D4 写明 5 柱 + D 优先级；D 线由 DECISIONS D1 三条件锁定，Relay 由 DECISIONS（项目级）锁定"只接已付款 inbound"被动模式，AI 由 PROJECT_DESIGN v3.1 §1 P5 锁定"内部工具沉淀 G3 前不独立运营"
- 证据：DECISIONS.md:78-84 / 00_PROJECT_INDEX.md:24-32 / Relay/00_PROJECT_INDEX.md（被动承接 G3 前）

**Codex redteam 立场**：
- 观点：Boss 时间作为单一燃料，5 线并发实际上 = 多个未验证风险共享同一注意力；CB Insights 失败样本里"过早扩张"是主要原因；Week 4/8/12 砍线 Gate 是必要补丁但不能替代主动收敛
- 证据：redteam §1.2 / §11 / §12 引用 SCORE / BLS / Indie Hackers Stripe 验证项目中位月收入 $169

**Chat 评估**：本会话未参与

**风控补丁（已落地，缓解但未消除分歧）**：
- DECISIONS D6 砍线表（Week 4/8/12）= 流水触发自动砍线，由 B-Auditor 计算，不依赖 Boss 主观判断
- DECISIONS D5 EP1 降规 = 减少 Journal D1-D14 期间对 Boss 时间的吃量
- DECISIONS D8 Agent MVP 12 = 减少基础设施层占用
- VP-Relay / VP-AI 在 G3 前均为被动 / 冻结产品化状态

**分歧轮次**：第 1 轮（Boss 已拍板执行 5 柱不冻结，redteam 风控由砍线 Gate + 被动模式实现"等效收敛"，但未达 redteam 期望的硬冻结）
**提交 Jack 裁决**：已裁决
**Jack 裁决结果**：5 柱 + D 不冻结，按 Oracle > Trade > Journal > Relay > AI > D 优先级铺排；Week 4/8/12 砍线表 + Relay/AI 被动模式作为 redteam 风控的折中实现
**状态**：resolved（含 residual risk 观察 — Week 4 砍线 Gate 触发时若 Boss 时间显著恶化，本条可重新打开评估"硬冻结 Relay/AI"）

**Residual risk 追踪**：见 [CAND-007]（本轮新增）

---

## DISP-P005 EP1 周日黄金时段 vs 周一 18:00（UTC+8）
- 时间：2026-05-12
- 范围：项目级
- 分歧描述：v3.0 把 EP1 定 "周日黄金时段"但 2026-05-25 实际是周一；redteam 不直接质疑日期，但 audit 指出日历错位

**Code 立场**：日历校正后 EP1 = 2026-05-25 周一 18:00 UTC+8；YT 周一晚黄金时段虽次优，但避免再延期
**Boss 拍板**：保留 5-25（周一）18:00
**状态**：resolved

---

## 待 Boss 裁决（不阻塞 D1-D7，但 G1 / G2 前必须落定）

- DISP-P003 OpenClaw 14 vs 12 vs MVP 12 映射
- DISP-P004 Mingli ↔ Oracle 数据边界
- D 线包装名头终定（候选：网络知识普及 / 跨境信息安全教育 / 数字隐私入门）
- D 线 VPS 服务商终定
- 大陆 + 香港律师候选名单
