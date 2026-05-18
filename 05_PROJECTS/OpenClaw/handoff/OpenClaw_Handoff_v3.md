---
版本: v3.0
更新日期: 2026-05-02
路径校正: 2026-05-12（trading-framework 已迁至 DecodeX_Trade/source/，详见下文修订）
项目: Trading Framework 教学网页 + DecodeX 基础设施
状态: 历史快照（trade.decodex.cc 已上线；最新状态见 ~/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/）
---

> ⚠️ **2026-05-12 路径校正说明**：原 `~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/` 路径已于 2026-05-11 迁至 `~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/`。本文件 §1.2 / §1.7 / §2.1 / §五 引用的旧路径请加上 `~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/` 前缀。

# OpenClaw 交接文档 v3.0

---

## 一、Trading Framework 教学网页

### 1.1 项目背景
合约交易完整教学网页，从零基础到实战框架。
基于四位实盘交易员（实盘A/B/C/D）的逐笔数据，原始框架文件 `trading_framework_v2.md`（v2.0-final）。

### 1.2 文件位置
| 文件 | 路径 | 说明 |
|---|---|---|
| 教学网页（当前版本） | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/v2/teach_v2/index.html` | v2.2+，493K |
| 交易框架原文 | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/v2/trading_framework_v2.md` | v2.0-final |
| HTTP Server 脚本 | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/v2/server.py` | Python HTTP server，含 ngrok header |
| v2.1 备份 | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/v2/teach_v2/index_v21_backup.html` | 109K，干净备份 |

### 1.3 版本记录
| 版本 | 大小 | 核心变化 |
|---|---|---|
| v2.1 | 109K | 基础版，20页，无动画 |
| v2.2 | 365K | 8个SVG动画场景、8个实盘案例标注图、page-b5新页、手机响应式 |
| v2.2+ | 493K | 新增顾比均线/趋势线/维加斯通道讲解、p2/p3动画、金叉死叉动画、所有动画速度放慢 |

### 1.4 当前页面结构（21页）
```
基础知识（6页）
  b0 K线的构成
  b1 均线工具（已更新：顾比均线、趋势线、维加斯通道，各含SVG动画）
  b2 趋势的定义       ← 含：趋势动画 + 黄金实盘案例
  b3 支撑位与压力位   ← 含：角色转换动画 + BTC实盘案例
  b4 成交量怎么读
  b5 触及点位预测     ← FIB/VWAP/VPVR 三维度，各含动画+实盘案例

形态库（4页）
  p0 单根K线形态
  p1 多根组合形态     ← 含：穿头破脚双向清算动画 + 黄金实盘案例
  p2 结构形态         ← 已加：上升三角形、下降旗形、头肩顶 SVG动画
  p3 指标形态         ← 含：MACD顶背离动画 + 金叉/死叉动画（MACD+均线）

核心框架（7页）
  f0 核心哲学
  f1 市场分析框架     ← 含：假突破vs真突破动画 + 对比实盘案例
  f2 入场信号系统     ← 含：RSI+FIB动画 + 五步确认动画
  f3 建仓系统         ← 含：计数器A→B→C动画
  f4 止盈管理
  f5 止损系统
  f6 仓位计算

实战应用（4页）
  a0 市场环境应对
  a1 交易心理与纪律
  a2 核心Checklist
  a3 四位交易员数据（实盘A/B/C/D）
```

### 1.5 动画速度规范
所有动画统一间隔 1000–1300ms，有重播按钮。具体：
- 一般动画步骤：`(i+1)*1000ms`
- 复杂场景（假突破/真突破）：`(i+1)*1200ms`
- 五步确认：每步 1000ms，总时长约 6.8s

### 1.6 已知待完善事项
- [ ] p0 单根K线（8种）目前只有静态图，无动画
- [ ] f4 止盈管理、f5 止损系统 内容较精简
- [ ] 网站文字需从繁体转简体（用 opencc 批量转换）
- [ ] 手机响应式：基础适配完成，复杂SVG在极小屏幕可能溢出

### 1.7 开发规范
```bash
# 修改前必须验证 div 平衡（必须为 0）
python3 -c "
with open('~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/v2/teach_v2/index.html') as f:
    h = f.read()
print('div balance:', h.count('<div') - h.count('</div>'))
print('size:', len(h)//1024, 'K')
"
```
- 不要用字符串替换拼接 div，每次注入后必须验证 div balance = 0
- 注入位置找错会导致多个页面同时显示（已踩过这个坑）
- 每加新页面同步更新 pages[]、titles{}、nav HTML

---

## 二、服务架构

### 2.1 本地服务（Mac Mini M4）
```
类型: Python SimpleHTTPRequestHandler（自定义，禁用缓存）
脚本: ~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/v2/server.py
Port: 8765
服务目录: ~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/v2/teach_v2/
launchd: ~/Library/LaunchAgents/com.jack.trading-server.plist
Cache-Control: no-cache, no-store, must-revalidate（已配置，外网用户刷新即获最新版）
```

### 2.2 ngrok 公网访问（临时）
```
固定 URL: https://snottily-unfeminine-hubert.ngrok-free.dev
authtoken: 已配置（~/Library/Application Support/ngrok/ngrok.yml）
launchd: ~/Library/LaunchAgents/com.jack.ngrok.plist
```

### 2.3 开机自启动
两个 launchd 服务均设定 `RunAtLoad + KeepAlive`，Mac Mini 重启后自动恢复。

手动重启：
```bash
pkill -f "server.py"
launchctl unload ~/Library/LaunchAgents/com.jack.trading-server.plist
launchctl load   ~/Library/LaunchAgents/com.jack.trading-server.plist

launchctl unload ~/Library/LaunchAgents/com.jack.ngrok.plist
launchctl load   ~/Library/LaunchAgents/com.jack.ngrok.plist
```

---

## 三、DecodeX 基础设施（新）

### 3.1 品牌信息
- 品牌名：**DecodeX**
- Logo：两个版本（彩色渐变版用于网页/社媒，黑底白字版用于深色背景/印刷）
- 主域名：**decodex.cc**（已购买，$8/年，Cloudflare 管理，状态：活动）

### 3.2 域名规划（子域名）
| 子域名 | 用途 | 状态 |
|---|---|---|
| `trade.decodex.cc` | 交易教学网站（当前项目） | ✅ 已上线，HTTP/2 200，Cloudflare CDN 生效 |
| `help.decodex.cc` | 帮助中心（现有 helpsite） | 待迁移 |
| `docs.decodex.cc` | 文档中心 | 规划中 |
| `blog.decodex.cc` | 博客 | 规划中 |
| `shop.decodex.cc` | 购买中心 | 规划中 |

### 3.3 VPS 信息
```
IP:     104.168.115.209
系统:   Debian 12 (Bookworm)，内核 6.1
CPU:    Xeon Gold 5220R × 3 核
RAM:    3.8 GB
SWAP:   4.5 GB
硬盘:   59 GB（已用 5.8G）
用户:   root
SSH:    密钥登录（~/.ssh/id_ed25519 已推送）
机房:   美国（延迟约 200ms，建议套 Cloudflare CDN 改善）
```

### 3.4 Cloudflare 账号
```
邮箱:       Mazengxin66@gmail.com
Account ID: 9b6bc5fe4cbbb7218d065bc19d81b94f
子域:       mazengxin66.workers.dev
```

### 3.5 Workers & Pages 现状
| 名称 | 状态 | 说明 |
|---|---|---|
| helpsite | ✅ 保留 | 帮助中心，helpsite-4ia.pages.dev，10天前更新 |
| jackfree | ❌ 已删除 | - |
| jackmafree1 | ❌ 已删除 | - |
| jackmafree | ❌ 已删除 | - |
| morning-bush-9fe8 | ❌ 已删除 | - |
| cold-tooth-e5f7 | ❌ 已删除 | 原绑定 jackma666.us.kg（域名已失效） |

### 3.6 下一步：VPS 部署
Claude Code 执行以下任务（SSH 用密钥登录）：
```
1. 安装 Nginx
2. 将 index.html 及相关文件 scp 到 VPS /var/www/decodex/trade/
3. 配置 Nginx，让 trade.decodex.cc 指向该目录
4. 用 Certbot 申请 Let's Encrypt HTTPS 证书
5. 在 Cloudflare 添加 A 记录：trade.decodex.cc → 104.168.115.209
6. 套上 Cloudflare CDN 降低用户访问延迟
```

---

## 四、作者名称规范
四位实盘交易员统一使用匿名：**实盘A、实盘B、实盘C、实盘D**

---

## 五、快速排错

```bash
# 服务是否正常
launchctl list | grep "com.jack"
lsof -i :8765 | grep LISTEN
curl -I http://127.0.0.1:8765/ | grep -i cache

# ngrok 是否在线
curl -s http://127.0.0.1:4040/api/tunnels | python3 -c "import sys,json;[print(t['public_url']) for t in json.load(sys.stdin)['tunnels']]"

# 文件健康检查
python3 -c "
with open('~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/v2/teach_v2/index.html') as f:
    h = f.read()
import re
pages = re.findall(r\"id='page-(\w+)'\", h) or re.findall(r'id=\"page-(\w+)\"', h)
print('pages:', len(pages), pages)
print('div balance:', h.count('<div') - h.count('</div>'))
print('size:', len(h)//1024, 'K')
"
```

---

## 2026-05-02 更新记录

### trade.decodex.cc 完成事项
- Cloudflare SSL 从「完整」改为「灵活」，trade.decodex.cc HTTP/2 200 ✅
- 全站改版：深色金融风 → 浅色 Apple 设计语言（白底、#0071e3 蓝、pill按钮、毛玻璃header）
- 欢迎页：DecodeX 品牌 logo（真实JPG）、标题渐变、数据亮点、开始学习按钮
- Header：CT文字 → DecodeX SVG logo，去掉 v2.1 版本号，品牌名 DecodeX
- 深浅色切换：手动按钮（🌙/☀️）+ 跟随系统 prefers-color-scheme，三档循环
- title 改为「DecodeX · 金融交易基础」
- K线下影线修复：110处脱离问题全部修复（b0/b1/b2/p0/p1/f1/f2）
- 动画任意点击播放：.anim-card-body/.anim-v2/.anim-stage 全部支持
- VPVR 动画拆分：page-b5 拆成上升趋势（卡片A）和下降趋势（卡片B）独立播放
- 实盘案例动画：b2/b3/p1/f1 静态图改为 800ms 逐帧SVG动画
- p1 穿头破脚K线坐标修复（上影线方向、下影线断缝）
- 全屏展开按钮：已完全删除
- 登录/注册系统：已完全删除，欢迎页恢复单个「开始学习」按钮

### 当前待办
- [ ] DNSSEC 开启（Cloudflare 一键）
- [ ] CAA 记录添加
- [ ] index.html GitHub 备份
- [ ] robots.txt（上线前）
- [ ] p0 单根K线加动画
- [ ] f4/f5 内容补充
