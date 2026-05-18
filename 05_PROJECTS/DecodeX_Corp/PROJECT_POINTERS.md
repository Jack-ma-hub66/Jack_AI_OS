# DecodeX_Corp — 资源指针

> 指向真实代码 repo、外部服务、子项目目录。本目录不存生产代码。
> 时区基准：UTC+8。

---

## 子项目目录（Jack_AI_OS 内）

| 项目 | 路径 | 角色 |
|---|---|---|
| **DecodeX_Corp** (本) | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Corp/` | 一人公司 umbrella |
| DecodeX 主站 | `~/Jack_AI_OS/05_PROJECTS/DecodeX/` | decodex.cc 5 柱门户网站 |
| **DecodeX_Oracle** | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Oracle/` | 命盘文化解读服务（合并自 Mingli） |
| **DecodeX_Trade** | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/` | 交易框架 + IB 联盟 |
| **DecodeX_Journal** | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Journal/` | YouTube 主品牌 |
| **DecodeX_Relay** | `~/Jack_AI_OS/05_PROJECTS/Relay/`（沿用，待 rename） | AI 代做服务 |
| **DecodeX_AI** | `~/Jack_AI_OS/05_PROJECTS/DecodeX_AI/` | Prompt 包 / Agent 模板 |
| Mingli | `~/Jack_AI_OS/05_PROJECTS/Mingli/` | 命理项目（→ 并入 Oracle，能力源不混素材） |
| OpenClaw | `~/Jack_AI_OS/05_PROJECTS/OpenClaw/` | Agent 体系框架（提供 SOUL.md） |

## GitHub Repos

| Repo | 用途 |
|---|---|
| `Jack-ma-hub66/Jack_AI_OS` | OS 文件系统主仓 |
| `Jack-ma-hub66/decodex-trade` | trade.decodex.cc 源码 |
| `Jack-ma-hub66/openclaw-soul` | OpenClaw Agent SOUL.md |
| 待建：`decodex-corp` | 公司基础设施代码（n8n 工作流 / 脚本） |
| 待建：`decodex-journal` | Journal 频道资产（公开） |

## 物理节点与外部服务

| 类别 | 节点 / 服务 | 用途 / IP / 配置 | 状态 |
|---|---|---|---|
| Node 1 | Mac mini M4 | 家中台湾原生 ISP / Boss 控制台 / Tier-1 KYC 唯一登录设备 | ✅ |
| Node 2 | Windows / Ubuntu | 大陆机房 / 国内业务专用 / 永不跑跨境或灰产 | 待 D4 上架 |
| Node 3 | Buffalo VPS | 104.168.115.209 / ColoCrossing / 主品牌跨境出口 + Telegram + Nginx | ✅（职责瘦身见 DECISIONS D3） |
| **Node 4** | **D 线独立 VPS** | **待选型**（服务商不得与 Buffalo 同 ColoCrossing 或同 AS） | 🔴 阻塞项（DECISIONS D1） |
| DNS | Cloudflare | Mazengxin66@gmail.com / Account 9b6bc5fe4cbbb7218d065bc19d81b94f / decodex.cc 自动续费 ✅ | ✅ |
| 域名 | decodex.cc | 主域，registrar lock 待确认 | ✅ |
| 域名 | D 线 .xyz/.top | 独立购买，独立联系人，**Boss 待补 D 线终定名头** | 🔴 待启动 |
| GitHub | Jack-ma-hub66 | 代码版本（push 修复待 D1-D2 Agent） | 🟡 |
| Discord | OpenClaw bot | 私域通信（LaunchAgent 待 D5 验证） | 🟡 |

## 网络基础设施

| 资源 | 位置 |
|---|---|
| 代理配置 | `~/Jack_AI_OS/02_TOOL_SYSTEM/proxy_configs/`（已迁移） |
| 台北 ISP SOCKS5 | 已续费 ✅ |
| VPS Reality 5 节点 | 已配置 |
| Tailscale | Mac mini ↔ Buffalo ↔ Windows 三节点（待 D3 测试） |
| D 线代理 | 独立 SOCKS5 burner / 独立机房 IP，**禁 Tor 三跳**（v3.1 §6） |

## 内容素材库

| 类型 | 位置 |
|---|---|
| YouTube 稿件源 | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Journal/source_materials/YouTube/` |
| Journal B-roll | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Journal/b_roll/` |
| Trading framework 原稿 | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Trade/source/trading-framework/` |
| 命理学资料 | `~/Jack_AI_OS/05_PROJECTS/DecodeX_Oracle/source_materials/命理学/` |
| 品牌 logo | `~/Jack_AI_OS/05_PROJECTS/DecodeX/outputs/brand_assets/` |

## 待迁移 / 保留原位（路径已统一为 /Users/jack/，移除错误 ~/jack/ 写法）

**用户要求保留原位（`/Users/jack/资料/` 下）**：
- 开发区植物园 / 开鲁项目文件 / data / soft / Tampere University

**暂缓迁移（待决策）**：
- `/Users/jack/Sunlogin/`、`/Users/jack/Sunlogin Files/`（远程协助工具，活跃用）
- `/Users/jack/资料/Google/`（个人 Google 备份）
- `/Users/jack/资料/photo/`、`/Users/jack/资料/video/`、`/Users/jack/资料/正片/`
- `/Users/jack/资料/X/`（空目录）
