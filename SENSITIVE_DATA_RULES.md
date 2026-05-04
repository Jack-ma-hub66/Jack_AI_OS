# SENSITIVE_DATA_RULES.md — 敏感信息规则

> push_safe.sh 在 git push 前自动检查本规则。
> Private 仓库不是保险箱。

---

## 禁止 push 的内容

- API 密钥、Token、Secret
- 账户密码、私钥
- 交易信息、财务数据
- 身份证、护照等个人身份信息
- 他人私人信息（未授权）
- 任何明文存储的认证凭据

---

## .gitignore 强制规则

以下内容已在 .gitignore 中排除，不会被 push：

```
.env / .env.* / *.key / *.pem
*_secret* / *credentials*
09_ARCHIVE/sessions/raw_archive/*
```

---

## push 前检查清单（push_safe.sh 自动执行）

push_safe.sh 会在 git add -A 之前全量扫描：
- staged 文件
- unstaged 修改
- untracked 新文件

发现敏感关键词时阻断 push，要求 Jack 手动确认。

---

## 如果不确定

不 push。先问 Jack。
