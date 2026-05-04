#!/bin/bash
# weekly_review.sh — 从 daily digest 自动汇总周报
# 可手动触发，也可由定时任务在每周一自动运行
# 用法：bash ~/Jack_AI_OS/scripts/weekly_review.sh

ROOT=~/Jack_AI_OS
DATE=$(date '+%Y%m%d')
WEEKLY_DIR="$ROOT/08_DAILY_WEEKLY_REVIEW/weekly"
OUTPUT="$WEEKLY_DIR/weekly_${DATE}.md"

mkdir -p "$WEEKLY_DIR"

# 找最近 7 天的 daily 文件
CUTOFF=$(date -d "7 days ago" '+%Y%m%d' 2>/dev/null || date -v-7d '+%Y%m%d' 2>/dev/null || echo "20000101")

echo "# 周报 — $(date '+%Y年%m月%d日')" > "$OUTPUT"
echo "> 自动从最近 7 天 daily review 生成" >> "$OUTPUT"
echo "" >> "$OUTPUT"

COUNT=0
DAILY_DIR="$ROOT/08_DAILY_WEEKLY_REVIEW/daily"

if [ -d "$DAILY_DIR" ]; then
  while IFS= read -r -d '' f; do
    FNAME=$(basename "$f" .md)
    FILE_DATE=$(echo "$FNAME" | grep -o '^[0-9]\{8\}')
    if [ -n "$FILE_DATE" ] && [ "$FILE_DATE" -ge "$CUTOFF" ] 2>/dev/null; then
      echo "## $(date -d "${FILE_DATE}" '+%Y-%m-%d' 2>/dev/null || echo $FILE_DATE)" >> "$OUTPUT"
      cat "$f" >> "$OUTPUT"
      echo "" >> "$OUTPUT"
      COUNT=$((COUNT + 1))
    fi
  done < <(find "$DAILY_DIR" -name "daily_*.md" -print0 | sort -rz 2>/dev/null)
fi

if [ "$COUNT" -eq 0 ]; then
  echo "本周无 daily review 记录。" >> "$OUTPUT"
fi

echo "## 本周新增 Confirmed 纠正规则" >> "$OUTPUT"
if [ -f "$ROOT/07_ERROR_AND_LESSONS/CORRECTION_LOG.md" ]; then
  grep -c "^### COR-" "$ROOT/07_ERROR_AND_LESSONS/CORRECTION_LOG.md" 2>/dev/null | \
    xargs -I{} echo "当前共 {} 条 confirmed 规则（详见 CORRECTION_LOG.md）" >> "$OUTPUT" || \
    echo "无法统计" >> "$OUTPUT"
fi
echo "" >> "$OUTPUT"

echo "## Candidate 待审阅" >> "$OUTPUT"
if [ -f "$ROOT/07_ERROR_AND_LESSONS/CANDIDATE_LOG.md" ]; then
  CAND_COUNT=$(grep -c "^### CAND-" "$ROOT/07_ERROR_AND_LESSONS/CANDIDATE_LOG.md" 2>/dev/null || echo "0")
  echo "${CAND_COUNT} 条候选观察待 Jack 审阅（详见 CANDIDATE_LOG.md）" >> "$OUTPUT"
fi
echo "" >> "$OUTPUT"

echo "---" >> "$OUTPUT"
echo "自动生成时间：$(date '+%Y-%m-%d %H:%M')" >> "$OUTPUT"

echo "✅ 周报已生成（汇总 $COUNT 天）：$OUTPUT"
