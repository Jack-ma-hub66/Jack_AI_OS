#!/bin/bash
# close_session.sh — 关闭仪式脚本
# 设计原则：工具（Code/Codex）先生成摘要内容，再由本脚本落盘和推送
#
# 用法：
#   完整关闭（A模式，digest + raw transcript）：
#     bash ~/Jack_AI_OS/scripts/close_session.sh myproject \
#       --digest /tmp/digest.md \
#       --raw /tmp/raw_transcript.md
#
#   只保存状态（B模式，仅 digest）：
#     bash ~/Jack_AI_OS/scripts/close_session.sh myproject \
#       --digest /tmp/digest.md
#
#   向后兼容旧用法（内容直接作为参数）：
#     bash ~/Jack_AI_OS/scripts/close_session.sh myproject "$(cat /tmp/session_digest.md)"

PROJECT=$1
ROOT=~/Jack_AI_OS
DATE=$(date '+%Y%m%d_%H%M')
TODAY=$(date '+%Y%m%d')

DIGEST_INPUT=""
DIGEST_FILE_PATH=""
RAW_FILE=""

if [ -z "$PROJECT" ]; then
  echo "用法：close_session.sh [项目名] --digest [摘要文件] [--raw [原始对话文件]]"
  echo ""
  echo "关闭前，请让 Code/Codex 生成摘要内容，格式如下："
  echo "---"
  echo "## 会话摘要"
  echo "- 核心问题/需求："
  echo "- 本次完成："
  echo "- 关键决策："
  echo "- 未完成事项："
  echo "- 新增纠正记录："
  echo "---"
  exit 1
fi

# 解析参数（支持命名参数 + 向后兼容旧位置参数）
shift
while [[ $# -gt 0 ]]; do
  case "$1" in
    --digest)
      DIGEST_FILE_PATH="$2"
      shift 2
      ;;
    --raw)
      RAW_FILE="$2"
      shift 2
      ;;
    *)
      # 向后兼容：将非 -- 参数当作 digest 内容字符串
      if [ -z "$DIGEST_INPUT" ]; then
        DIGEST_INPUT="$1"
      fi
      shift
      ;;
  esac
done

# 从文件读取 digest 内容
if [ -n "$DIGEST_FILE_PATH" ]; then
  if [ ! -f "$DIGEST_FILE_PATH" ]; then
    echo "❌ 摘要文件不存在：$DIGEST_FILE_PATH"
    exit 1
  fi
  DIGEST_INPUT=$(cat "$DIGEST_FILE_PATH")
fi

if [ -z "$DIGEST_INPUT" ]; then
  echo "⚠️  未提供摘要内容。"
  echo "请先让 Code/Codex 生成会话摘要，然后重新运行本脚本。"
  exit 1
fi

# 确定关闭模式：未提供 --raw 时交互询问
if [ -z "$RAW_FILE" ]; then
  echo "请选择关闭模式："
  echo "  A) 完整关闭（保存 digest + raw transcript）"
  echo "  B) 只保存任务状态（仅保存 digest）"
  read -r -p "选择 [A/B]: " MODE_CHOICE
  case "$MODE_CHOICE" in
    A|a)
      echo ""
      echo "⚠️  完整关闭模式需要 raw transcript。"
      echo "提供方式：bash close_session.sh [项目名] --digest [digest文件] --raw [原始对话文件]"
      echo "如不需要 raw 归档，请选择 B 模式（只保存任务状态）。"
      exit 1
      ;;
    B|b)
      echo "→ B 模式：只保存任务状态"
      ;;
    *)
      echo "❌ 无效选择，退出。"
      exit 1
      ;;
  esac
fi

# 1. 写入 digest
DIGEST_ARCHIVE="$ROOT/09_ARCHIVE/sessions/digest/${DATE}_${PROJECT}.md"
mkdir -p "$(dirname "$DIGEST_ARCHIVE")"

cat > "$DIGEST_ARCHIVE" << EOF
# 会话摘要 · $PROJECT · $DATE

$DIGEST_INPUT

---
生成时间：$(date '+%Y-%m-%d %H:%M')
EOF

echo "✅ 会话摘要已写入：$DIGEST_ARCHIVE"

# 2. 归档 raw transcript（A模式）
if [ -n "$RAW_FILE" ]; then
  if [ ! -f "$RAW_FILE" ]; then
    echo "❌ Raw transcript 文件不存在：$RAW_FILE"
    exit 1
  fi
  RAW_ARCHIVE="$ROOT/09_ARCHIVE/sessions/raw_archive/${DATE}_${PROJECT}.md"
  mkdir -p "$(dirname "$RAW_ARCHIVE")"
  cp "$RAW_FILE" "$RAW_ARCHIVE"
  echo "✅ Raw transcript 已归档：$RAW_ARCHIVE"
fi

# 3. 生成 daily digest（追加到当日汇总）
DAILY_FILE="$ROOT/08_DAILY_WEEKLY_REVIEW/daily/daily_${TODAY}.md"
mkdir -p "$(dirname "$DAILY_FILE")"

if [ ! -f "$DAILY_FILE" ]; then
  echo "# Daily Review — $(date '+%Y-%m-%d')" > "$DAILY_FILE"
  echo "" >> "$DAILY_FILE"
fi

echo "" >> "$DAILY_FILE"
echo "## $DATE — $PROJECT" >> "$DAILY_FILE"
echo "$DIGEST_INPUT" >> "$DAILY_FILE"

echo "✅ Daily digest 已更新：$DAILY_FILE"

# 4. 更新 CONTEXT_PACK 并同步三端注入文件
bash "$ROOT/scripts/update_context.sh" "$PROJECT"
for _inject_file in CONTEXT_PACK.md CLAUDE.md AGENTS.md; do
  if [ ! -f "$ROOT/05_PROJECTS/$PROJECT/$_inject_file" ]; then
    echo "⚠️  $_inject_file 未生成，请检查 update_context.sh"
  fi
done

# 5. 安全 push
bash "$ROOT/scripts/push_safe.sh" "close: $PROJECT session $DATE"

echo ""
echo "✅ 关闭仪式完成。"
echo "下次启动：复制 05_PROJECTS/$PROJECT/CONTEXT_PACK.md 粘贴给工具即可继续。"
