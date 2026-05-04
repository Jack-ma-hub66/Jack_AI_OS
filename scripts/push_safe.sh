#!/bin/bash
# push_safe.sh — 全量敏感信息检查后再 push
# 修复：先检查所有文件（staged + unstaged + untracked），再 git add -A
# 用法：bash ~/Jack_AI_OS/scripts/push_safe.sh [commit message]

ROOT=~/Jack_AI_OS
MSG=${1:-"auto: session update $(date '+%Y-%m-%d %H:%M')"}

echo "🔍 全量扫描敏感信息（staged + unstaged + untracked）..."

SENSITIVE_PATTERNS=(
  "api_key" "API_KEY"
  "secret" "SECRET"
  "password" "PASSWORD"
  "private_key" "PRIVATE_KEY"
  "access_token" "ACCESS_TOKEN"
  "credential" "CREDENTIAL"
)

FOUND=0

# 检查 staged 文件
STAGED_DIFF=$(git -C "$ROOT" diff --cached 2>/dev/null)
# 检查 unstaged 修改
UNSTAGED_DIFF=$(git -C "$ROOT" diff 2>/dev/null)
# 检查 untracked 新文件内容
UNTRACKED=$(git -C "$ROOT" ls-files --others --exclude-standard 2>/dev/null)

ALL_CONTENT="$STAGED_DIFF
$UNSTAGED_DIFF"

for f in $UNTRACKED; do
  if [ -f "$ROOT/$f" ]; then
    ALL_CONTENT="$ALL_CONTENT
$(cat "$ROOT/$f" 2>/dev/null)"
  fi
done

for pattern in "${SENSITIVE_PATTERNS[@]}"; do
  MATCHES=$(echo "$ALL_CONTENT" | grep -i "$pattern" | grep -v "^-" | grep -v "#" | head -2)
  if [ -n "$MATCHES" ]; then
    echo "⚠️  发现敏感关键词 '$pattern'："
    echo "$MATCHES" | head -2
    FOUND=1
  fi
done

if [ "$FOUND" -eq 1 ]; then
  echo ""
  echo "❌ 检测到可能的敏感信息，已阻断 push。"
  echo "请处理步骤："
  echo "  1. 检查并移除或加密上述敏感内容"
  echo "  2. 将敏感文件路径加入 .gitignore（如适用）"
  echo "  3. 处理完成后重新运行：bash ~/Jack_AI_OS/scripts/push_safe.sh"
  echo "  ⚠️  不要手动 git add -A && git push，否则会绕过安全检查。"
  exit 1
fi

echo "✅ 敏感信息检查通过"

# 同步：先 pull rebase，再 add/commit/push
echo "🔄 同步 GitHub..."
git -C "$ROOT" pull --rebase 2>/dev/null || echo "提示：pull 失败（首次 push 或无网络）"
git -C "$ROOT" add -A
git -C "$ROOT" commit -m "$MSG" 2>/dev/null || echo "提示：无新变更"
git -C "$ROOT" push 2>/dev/null || echo "提示：push 失败，请检查 GitHub 连接"

echo "✅ push_safe.sh 完成"
