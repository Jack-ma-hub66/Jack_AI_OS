#!/bin/bash
# new_project.sh — 初始化新项目目录
# 修复：路径对齐新目录结构，push 走 push_safe.sh
# 用法：bash ~/Jack_AI_OS/scripts/new_project.sh [项目名]

PROJECT=$1
ROOT=~/Jack_AI_OS
TEMPLATE="$ROOT/05_PROJECTS/_template"
DEST="$ROOT/05_PROJECTS/$PROJECT"

if [ -z "$PROJECT" ]; then echo "用法：new_project.sh [项目名]"; exit 1; fi
if [ -d "$DEST" ]; then echo "⚠️  项目已存在：$DEST"; exit 1; fi

mkdir -p "$DEST/TASK_PACKETS"
mkdir -p "$DEST/outputs"
mkdir -p "$DEST/validation"
mkdir -p "$DEST/handoff"

# 从模板复制
for f in 00_PROJECT_INDEX.md CONTEXT_PACK.md PROJECT_POINTERS.md DECISIONS.md DESIGN_DISPUTES.md PROJECT_CORRECTION_LOG.md; do
  if [ -f "$TEMPLATE/$f" ]; then
    cp "$TEMPLATE/$f" "$DEST/$f"
  fi
done

# 替换项目名占位符（兼容 macOS 和 Linux）
find "$DEST" -name "*.md" | while read f; do
  sed -i '' "s/\[项目名\]/$PROJECT/g" "$f" 2>/dev/null || \
  sed -i "s/\[项目名\]/$PROJECT/g" "$f"
done

echo "✅ 项目 $PROJECT 已创建：$DEST"
echo "下一步："
echo "  1. 填写 $DEST/00_PROJECT_INDEX.md"
echo "  2. 填写 $DEST/PROJECT_POINTERS.md（指向真实代码 repo）"
echo "  3. 运行 bash ~/Jack_AI_OS/scripts/update_context.sh $PROJECT 生成 CONTEXT_PACK"

# 安全 push
bash "$ROOT/scripts/push_safe.sh" "init: 新建项目 $PROJECT"
