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

echo "## 项目背景（00_PROJECT_INDEX.md 完整内容）" >> "$OUT"
# 2026-05-12 修订：head -20 会截断关键禁止清单与子项目映射；改为 cat 完整文件（受 1500 词上限保护）。
if [ -f "$ROOT/05_PROJECTS/$PROJECT/00_PROJECT_INDEX.md" ]; then
  cat "$ROOT/05_PROJECTS/$PROJECT/00_PROJECT_INDEX.md" >> "$OUT"
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

echo "## 最近会话摘要（仅列文件名，不内联内容）" >> "$OUT"
# 2026-05-12 修订（COR-P010）：旧版本 head -15 注入会把已 Deprecated 的旧战略带入 CONTEXT_PACK；
# 改为只列文件名，按需查阅原文件，避免污染 confirmed-only 上下文。
DIGEST_DIR="$ROOT/09_ARCHIVE/sessions/digest"
if [ -d "$DIGEST_DIR" ]; then
  COUNT=0
  while IFS= read -r -d '' f; do
    if [ "$COUNT" -ge 5 ]; then break; fi
    REL=$(basename "$f")
    echo "- \`09_ARCHIVE/sessions/digest/$REL\`" >> "$OUT"
    COUNT=$((COUNT + 1))
  done < <(find "$DIGEST_DIR" -name "*.md" -print0 | sort -rz 2>/dev/null)
fi
if [ "${COUNT:-0}" -eq 0 ]; then
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

echo "## 关键决策标题（全部已定决策；详情查阅 DECISIONS.md）" >> "$OUT"
# 2026-05-12 修订：旧版 grep -A5 会把 v3.0 旧决策细节带入；改为只列标题，避免旧条目污染。
if [ -f "$ROOT/05_PROJECTS/$PROJECT/DECISIONS.md" ]; then
  grep "^### " "$ROOT/05_PROJECTS/$PROJECT/DECISIONS.md" >> "$OUT"
else
  echo "暂无" >> "$OUT"
fi
echo "" >> "$OUT"

# 项目级 DESIGN_DISPUTES（如存在）
if [ -f "$ROOT/05_PROJECTS/$PROJECT/DESIGN_DISPUTES.md" ]; then
  echo "## 当前设计分歧（列标题，详情查 DESIGN_DISPUTES.md）" >> "$OUT"
  grep -E "^## DISP-" "$ROOT/05_PROJECTS/$PROJECT/DESIGN_DISPUTES.md" >> "$OUT"
  echo "" >> "$OUT"
fi

echo "---" >> "$OUT"
echo "**启动指令**：读取后回复确认摘要（见 00_START_HERE.md 格式），然后等待任务指令。" >> "$OUT"

# 同步生成 Claude Code 注入文件（CLAUDE.md）
# 注意：AGENTS.md 是项目级 Agent 设计文档，不再被本脚本自动覆写（2026-05-12 修订，COR-P006）
cp "$OUT" "$ROOT/05_PROJECTS/$PROJECT/CLAUDE.md"
echo "✅ 注入文件已同步：CONTEXT_PACK.md → CLAUDE.md（AGENTS.md 跳过，保留独立设计）"

# 为兼容 Codex 三端注入需求，Codex 启动入口建议读取 CONTEXT_PACK.md 本身
# 如确实需要 AGENTS.md 同步副本，请显式 `cp CONTEXT_PACK.md AGENTS.md.codex_snapshot`

# 词数检查，上限 1500
WORDS=$(wc -w < "$OUT")
echo "✅ CONTEXT_PACK 已生成（约 ${WORDS} 词）：$OUT"

if [ "$WORDS" -gt 1500 ]; then
  echo "⚠️  警告：CONTEXT_PACK 超过 1500 词（当前 ${WORDS} 词），建议精简以下部分："
  echo "   - 缩短 MASTER_PROFILE 摘要"
  echo "   - 减少会话摘要条数"
  echo "   - 精简任务队列描述"
fi
