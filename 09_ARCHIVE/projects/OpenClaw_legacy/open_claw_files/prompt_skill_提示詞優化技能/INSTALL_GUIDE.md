# 如何給 OpenClaw Agent 安裝 Prompt Optimizer Skill

## 適用 Agent
只需安裝到直接接收你原始指令的 Agent：
- ✅ 秘書 (secretary)
- ✅ CEO (ceo)
- ❌ 其他 Agent 不需要（它們接收的是已被上級處理過的明確指令）

## 安裝方法

OpenClaw 的每個 Agent 都有自己的 SOUL.md 文件（相當於人格和指令文件）。
安裝 skill 就是把 skill 的核心規則寫進 SOUL.md。

### 方法 A：直接寫入 SOUL.md（推薦）

把 `project-instructions.txt` 的內容加到秘書和 CEO 的 SOUL.md 尾部。

具體步驟：

1. 找到秘書的 SOUL.md 文件
   ```
   路徑通常在：~/.openclaw/agents/secretary/SOUL.md
   ```

2. 在文件末尾添加一個新段落，把 project-instructions.txt 的完整內容貼進去

3. 同樣的操作對 CEO 的 SOUL.md 重複一次
   ```
   路徑通常在：~/.openclaw/agents/ceo/SOUL.md
   ```

### 方法 B：作為 Skill 文件安裝

如果你的 OpenClaw 版本支持 Skill 目錄：

1. 在 Agent 的工作區創建 skill 目錄
   ```bash
   mkdir -p ~/.openclaw/agents/secretary/skills/prompt-optimizer/
   mkdir -p ~/.openclaw/agents/ceo/skills/prompt-optimizer/
   ```

2. 把 SKILL.md 複製進去
   ```bash
   cp SKILL.md ~/.openclaw/agents/secretary/skills/prompt-optimizer/
   cp SKILL.md ~/.openclaw/agents/ceo/skills/prompt-optimizer/
   ```

3. 在對應 Agent 的 SOUL.md 中添加引用：
   ```
   You have access to a skill called "prompt-optimizer" in your skills directory.
   When receiving task instructions from the user, consult this skill
   and follow its workflow.
   ```

### 注意事項

- 安裝前先備份原有的 SOUL.md
- 安裝後測試：直接對秘書或 CEO 發一條模糊指令，看回答質量是否有變化
- 如果出現過度優化（簡單問題也被複雜處理），檢查觸發規則是否正確
- 路徑可能因 OpenClaw 版本不同而略有差異，以你實際安裝的為準
