# DecodeX — 项目入口

> 工具读取后必须知道：项目是什么、当前阶段、必读文件、下一步。

---

## 项目概述

个人综合类网站，主域名 decodex.cc 做简介与导航，子域名按内容板块拆分（金融知识、教程、日常分享、视频文案等），目标是把 Jack 所有内容整合到同一品牌下呈现。

## 当前阶段

**阶段一：基础定义（✅ 完成）**
- ✅ 1.1 受众定位：英文优先 + 内置中文切换
- ✅ 1.2 内容地图：5 个内容柱（见下方）
- ✅ 1.3 子域名架构：已定（见下方）
- ✅ 品牌化原则：统一「DecodeX [Name]」格式

**阶段二：现有内容收尾（✅ 完成）**
- ✅ p0 单根K线动画（8 种形态，已部署）
- ✅ robots.txt（屏蔽 AI 爬虫，已部署）
- ✅ DNSSEC（Cloudflare 已开启，24h 内生效）
- ✅ CAA 记录（0 issue letsencrypt.org）
- ✅ GitHub 备份（decodex-trade 私有仓库）

**阶段三：主站建设（✅ 完成）**
- ✅ decodex.cc 主站上线（Hero + Verticals + Values + 双语切换）
- ✅ Cloudflare A 记录已配（已代理）
- ✅ GitHub 已推送

## 真实代码仓库

见 `PROJECT_POINTERS.md`

## 必读文件（按顺序）

1. 本文件
2. `CONTEXT_PACK.md`
3. `DECISIONS.md`（了解已定决策）

## 当前最高优先级

回答 1.1 受众定位 → 解锁框架设计主线

## 内容地图（已定）

| 子域名 | 品牌名 | 内容定位 | 语言 | 状态 |
|--------|--------|----------|------|------|
| decodex.cc | DecodeX | 主站：About + 导航 + 内容聚合 | 英文优先 | 待建 |
| trade.decodex.cc | DecodeX Trade | 金融教学，交易框架，市场分析 | 英文优先 | ✅ 已上线 |
| ai.decodex.cc | DecodeX AI | AI 教程，工具演示，Agent 案例 | 英文优先 | 待建 |
| blog.decodex.cc | DecodeX Journal | 日常分享，市场观点，生活思考 | 英文优先 | 待建 |
| relay.decodex.cc | DecodeX Relay | 服务接单，帮人做产品的入口 | 英文优先 | 待建（等 Relay 方向定） |
| oracle.decodex.cc | DecodeX Oracle | 玄学基础，AI 八字紫薇，预测入口 | 英文优先 | 待建 |

**语言规则（全站统一）：** 英文为默认，每个板块右上角切换按钮 → 简体中文

## 关键上下文

- 品牌化原则：所有命名统一「DecodeX [Name]」格式，品牌认知优先
- trade.decodex.cc 已上线，是所有板块的模板参考
- relay.decodex.cc 待 Relay 商业方向确认后再建

## 下一步

**阶段三：主站建设**
第一步：decodex.cc 主站（About + 导航页）
