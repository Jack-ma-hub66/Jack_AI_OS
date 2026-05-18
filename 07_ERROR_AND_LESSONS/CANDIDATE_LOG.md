# CANDIDATE_LOG.md — 候选观察记录

> AI 自动写入区。所有条目均为"待 Jack 确认"状态。
> 不得进入 CONTEXT_PACK。
> Jack 定期审阅，决定升级 confirmed / rejected / disputed。
> 位置：07_ERROR_AND_LESSONS/CANDIDATE_LOG.md

---

## 写入规则（AI 必须遵守）

- 只能写候选观察，不能写成规则
- 每条必须标注"待 Jack 确认"
- 只能追加，不能修改已有条目
- 不能将本文件内容注入 CONTEXT_PACK

---

## 候选条目格式

```markdown
### CAND-[编号] [标题]
- 记录时间：
- 记录者：[Chat / Code / Codex]
- 观察描述：[发生了什么，待 Jack 确认]
- 建议处理：[升级 confirmed / rejected / 写入 DESIGN_DISPUTES]
- 状态：待 Jack 确认
```

---

## 待审阅列表

### CAND-001 会话启动时未执行读取协议
- 记录时间：2026-05-06
- 记录者：Code
- 观察描述：Jack 进入新会话后，Claude Code 未主动读取 5 个启动文件并回复确认格式，而是直接处理用户消息内容。Jack 指出后才补读。待 Jack 确认。
- 建议处理：升级 confirmed（写入禁止清单：收到第一条消息必须先执行启动协议）
- 状态：待 Jack 确认

### CAND-002 D 线即使物理隔离 + 包装"网络知识普及"仍属红色法律风险
- 记录时间：2026-05-12
- 记录者：Code（来源 Codex redteam §4.1 / §4.2 / 总体判定）
- 观察描述：DECISIONS D1 + D2 Boss 拍板 D 线保留 + 独立 VPS + 包装"网络知识普及"；但 Codex redteam 给出红色等级风险评估，原因是：
  1. 链上资金（USDT / 桥 / 交易所）仍可分析（Chainalysis 2024 报告）
  2. FinCEN 已把 CVC mixing 列重点洗钱风险
  3. 大陆 IDC 备案 = 实名锚
  4. KYC 交易所一旦触及，关联回到 Boss
  5. 翻墙包装培训 + 工具 + 灰产客户组合仍可能被解释为最高法 285/286 司法解释"情节严重"
- 建议处理：保留为长期观察。在 Boss 与大陆 + 香港律师书面意见达成前，任何 D 线 SCHEDULE 执行视为越权；律师确认到位后才有可能升级为 confirmed 或写入 DESIGN_DISPUTES 重新评估
- 状态：待 Jack 确认（不阻塞主线 D1-D7 主品牌任务）

### CAND-003 Boss unavailable runbook + 每周工作上限 + 健康约束
- 记录时间：2026-05-12
- 记录者：Code（来源 Codex redteam §9 / §10.3）
- 观察描述：redteam 提出 48h 无 Boss 确认自动暂停新发布/新接单/新付款；每周工作上限 55h；连续 2 天睡眠不足时禁 KYC / 法律 / 资金决策。Boss 决策（B10）= 暂不写入 DECISIONS，具体方案再商议
- 建议处理：保留 candidate。Boss 何时商议 = 由 Boss 决定；G2 Gate（2026-06-08 周一）前若 Boss 健康 / 时间风险出现，自动触发再次议程
- 状态：待 Jack 确认

### CAND-004 OpenClaw 14 角色 vs 12 SOUL vs DecodeX_Corp MVP 12 三方命名映射
- 记录时间：2026-05-12
- 记录者：Code（来源 audit E1）
- 观察描述：OpenClaw 项目入口写 14 角色（00_PROJECT_INDEX.md:9），但 SOUL.md 框架是 12 个；DecodeX_Corp DECISIONS D8 写"沿用 OpenClaw 12 Agent SOUL.md"且 MVP 12 = L0 Boss + 11 Agent。三方数量未对齐
- 建议处理：G1 Gate (2026-05-25 周一)前由 Code 给出映射表草案；交 Codex 审；Boss 拍板归类（升级 DECISIONS or 标 stale）
- 状态：待 Jack 确认

### CAND-005 Mingli ↔ DecodeX_Oracle 数据边界
- 记录时间：2026-05-12
- 记录者：Code（来源 audit E3）
- 观察描述：Mingli 是个人/案例命主项目；Oracle 是商业化解读服务。两者无明确边界文件（哪些算法/模板可复用，哪些命主真实数据禁迁入商业素材，哪些 outputs 不能进入商业渠道）
- 建议处理：D6 (2026-05-17 周日) 前由 VP-Oracle 起草边界文件草案；交 CRO 审；Boss 拍板
- 状态：待 Jack 确认

### CAND-006 D 线包装名头需 Boss 终定
- 记录时间：2026-05-12
- 记录者：Code（来源 DECISIONS D2 TODO）
- 观察描述：B2 决策推翻翻墙红线，新方向"包装成网络知识普及或其他名头"。Boss 未给出终定名头。Code 候选：网络知识普及 / 跨境信息安全教育 / 数字隐私入门
- 建议处理：D 线 SCHEDULE 执行前由 Boss 终定；Code 暂用占位
- 状态：待 Jack 确认

### CAND-007 5 柱不冻结 vs redteam 2+1 收敛建议 — residual risk 长期观察
- 记录时间：2026-05-12（Codex 复审 audit B3 指出原修复未把该分歧入 candidate/dispute）
- 记录者：Code（来源 Codex audit_20260512_recheck B3）
- 观察描述：Boss 拍板 5 柱 + D 全部铺排（DECISIONS D4），redteam 建议 60 天 2+1 收敛。两端均有理：Boss 视角 = 业务线多元防失败，redteam 视角 = Boss 时间稀缺 + 过早扩张是首要失败原因。已通过 Week 4/8/12 砍线 + Relay/AI 被动模式部分缓解，但未达 redteam 期望
- 触发条件：Week 4 (2026-06-08 周一) Gate 触发时，若除流水砍线之外 Boss 时间显著恶化（每周 > 60h / 健康警示）→ 重新评估硬冻结 Relay/AI
- 建议处理：保留 candidate 长期观察；G2 Gate 由 B-Auditor 自动评估流水 + Boss 自评时间负荷；触发条件成立时 DISP-P006 重新打开
- 状态：待 Jack 确认（不阻塞执行）
