#!/bin/bash
# sync.sh — 双向 git 同步
# 在 GitHub 直接编辑后使用，或切换设备后使用
# 用法：bash ~/Jack_AI_OS/scripts/sync.sh

ROOT=~/Jack_AI_OS

echo "🔄 双向同步..."
git -C "$ROOT" pull --rebase

if [ $? -ne 0 ]; then
  echo "❌ pull rebase 失败，可能有冲突。请手动处理：git -C ~/Jack_AI_OS rebase --abort 或解决冲突后继续。"
  exit 1
fi

git -C "$ROOT" push 2>/dev/null || echo "提示：push 失败，请检查 GitHub 连接"
echo "✅ 同步完成"
