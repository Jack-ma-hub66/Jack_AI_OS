#!/bin/bash
# update_context.sh — 聚合生成 CONTEXT_PACK（≤1500 词）
# 修复：路径对齐新目录结构，find 改为安全循环，词数上限统一为 1500
# 用法：bash ~/Jack_AI_OS/scripts/update_context.sh [项目名]

PROJECT=$1
ROOT=~/Jack_AI_OS
OUT="$ROOT/05_PROJECTS/$PROJECT/CONTEXT_PACK.md"
DATE=$(date '+%Y-%m-%d %H:%M')

if [ -z "$PROJECT" ] || [ ! -d "$ROOT/05_PROJECTS/$PROJECT" ]; then
  echo "用法：update_context.sh [项目名]，项目必须已存在于 05_PROJECTS/"
  exit 1
fi

cat > "$OUT" << HEADER
# CONTEXT_PACK — $PROJECT · $DATE
> 自动生成。只包含 confirmed 信息。≤1500 词。
> 直接复制粘贴给任意工具使用。

HEADER

echo "## 系统身份" >> "$OUT"
if [ -f "$ROOT/01_PERSONAL_MEMORY/MASTER_PROFILE.md" ]; then
  head -15 "$ROOT/01_PERSONAL_MEMORY/MASTER_PROFILE.md" >> "$OUT"
else
  echo "[待填写 MASTER_PROFILE.md]" >> "$OUT"
fi
echo "" >> "$OUT"

echo "## 当前项目状态" >> "$OUT"
if [ -f "$ROOT/SESSION_STATE.md" ]; then
  cat "$ROOT/SESSION_STATE.md" >> "$OUT"
else
  echo "[SESSION_STATE.md 不存在]" >> "$OUT"
fi
echo "" >> "$OUT"

echo "## 项目背景" >> "$OUT"
if [ -f "$ROOT/05_PROJECTS/$PROJECT/00_PROJECT_INDEX.md" ]; then
  head -20 "$ROOT/05_PROJECTS/$PROJECT/00_PROJECT_INDEX.md" >> "$OUT"
else
  echo "[待填写 00_PROJECT_INDEX.md]" >> "$OUT"
fi
echo "" >> "$OUT"

echo "## 可用工具和 Skill" >> "$OUT"
if [ -f "$ROOT/03_PROMPT_OPTIMIZER/SKILL_REGISTRY.md" ]; then
  grep -E "^### |^- 用途|^- 限制|^- 状态" "$ROOT/03_PROMPT_OPTIMIZER/SKILL_REGISTRY.md" >> "$OUT"
else
  echo "[SKILL_REGISTRY.md 不存在]" >> "$OUT"
fi
echo "" >> "$OUT"

echo "## Confirmed 禁止清单" >> "$OUT"
FOUND_CORRECTIONS=0
if [ -f "$ROOT/07_ERROR_AND_LESSONS/CORRECTION_LOG.md" ]; then
  CORRECTIONS=$(grep "❌ 禁止" "$ROOT/07_ERROR_AND_LESSONS/CORRECTION_LOG.md" 2>/dev/null)
  if [ -n "$CORRECTIONS" ]; then
    echo "$CORRECTIONS" >> "$OUT"
    FOUND_CORRECTIONS=1
  fi
fi
if [ -f "$ROOT/05_PROJECTS/$PROJECT/PROJECT_CORRECTION_LOG.md" ]; then
  PROJ_CORRECTIONS=$(grep "❌ 禁止" "$ROOT/05_PROJECTS/$PROJECT/PROJECT_CORRECTION_LOG.md" 2>/dev/null)
  if [ -n "$PROJ_CORRECTIONS" ]; then
    echo "$PROJ_CORRECTIONS" >> "$OUT"
    FOUND_CORRECTIONS=1
  fi
fi
if [ "$FOUND_CORRECTIONS" -eq 0 ]; then
  echo "暂无" >> "$OUT"
fi
echo "" >> "$OUT"

echo "## 最近会话摘要（最近 3 条）" >> "$OUT"
DIGEST_DIR="$ROOT/09_ARCHIVE/sessions/digest"
if [ -d "$DIGEST_DIR" ]; then
  COUNT=0
  while IFS= read -r -d '' f; do
    if [ "$COUNT" -ge 3 ]; then break; fi
    echo "---" >> "$OUT"
    head -15 "$f" >> "$OUT"
    COUNT=$((COUNT + 1))
  done < <(find "$DIGEST_DIR" -name "*.md" -print0 | sort -rz 2>/dev/null)
fi
if [ "$COUNT" -eq 0 ] 2>/dev/null; then
  echo "暂无会话摘要" >> "$OUT"
fi
echo "" >> "$OUT"

echo "## 当前任务队列" >> "$OUT"
TASK_DIR="$ROOT/05_PROJECTS/$PROJECT/TASK_PACKETS"
FOUND_TASKS=0
if [ -d "$TASK_DIR" ]; then
  while IFS= read -r -d '' f; do
    STATUS=$(grep "^- \[状态\]" "$f" 2>/dev/null | head -1)
    if echo "$STATUS" | grep -qiE "待开始|进行中|验证中"; then
      TITLE=$(grep "^## TASK_PACKET" "$f" | head -1)
      echo "- $TITLE" >> "$OUT"
      FOUND_TASKS=1
    fi
  done < <(find "$TASK_DIR" -name "*.md" -print0 2>/dev/null)
fi
if [ "$FOUND_TASKS" -eq 0 ]; then
  echo "暂无活跃任务" >> "$OUT"
fi
echo "" >> "$OUT"

echo "## 关键决策（最近 3 条）" >> "$OUT"
if [ -f "$ROOT/05_PROJECTS/$PROJECT/DECISIONS.md" ]; then
  grep -A5 "^### " "$ROOT/05_PROJECTS/$PROJECT/DECISIONS.md" | head -24 >> "$OUT"
else
  echo "暂无" >> "$OUT"
fi
echo "" >> "$OUT"

echo "---" >> "$OUT"
echo "**启动指令**：读取后回复确认摘要（见 00_START_HERE.md 格式），然后等待任务指令。" >> "$OUT"

# 词数检查，上限 1500
WORDS=$(wc -w < "$OUT")
echo "✅ CONTEXT_PACK 已生成（约 ${WORDS} 词）：$OUT"

if [ "$WORDS" -gt 1500 ]; then
  echo "⚠️  警告：CONTEXT_PACK 超过 1500 词（当前 ${WORDS} 词），建议精简以下部分："
  echo "   - 缩短 MASTER_PROFILE 摘要"
  echo "   - 减少会话摘要条数"
  echo "   - 精简任务队列描述"
fi
