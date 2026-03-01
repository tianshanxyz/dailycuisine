# 账号配置指南

本文档将指导你完成 Supabase、Vercel 和百度 AI 的账号设置。

## 📋 目录

1. [Supabase 配置](#1-supabase-配置)
2. [Vercel 配置](#2-vercel-配置)
3. [百度 AI 配置](#3-百度-ai-配置)
4. [环境变量配置](#4-环境变量配置)

---

## 1. Supabase 配置

### 1.1 创建 Supabase 账号

1. 访问 [Supabase 官网](https://supabase.com)
2. 点击右上角 **"Start your project"** 按钮
3. 选择使用 GitHub 账号登录（推荐）或使用邮箱注册
4. 如果使用 GitHub 登录，授权 Supabase 访问你的 GitHub 账号

### 1.2 创建新项目

1. 登录后，点击 **"New Project"** 按钮
2. 填写项目信息：
   - **Name**: `dailycuisine`（或你喜欢的名称）
   - **Database Password**: 设置一个强密码（请妥善保存）
   - **Region**: 选择 `Northeast Asia (Tokyo)` 或 `Southeast Asia (Singapore)`（离中国最近）
   - **Pricing Plan**: 选择 `Free`（免费套餐）
3. 点击 **"Create new project"** 按钮
4. 等待项目初始化完成（约 2-3 分钟）

### 1.3 获取 API 密钥

1. 项目创建完成后，进入项目仪表板
2. 点击左侧菜单的 **"Settings"**（齿轮图标）
3. 点击 **"API"** 选项
4. 在 **"Project API keys"** 部分，你可以看到：
   - **Project URL**: `https://xxxxxx.supabase.co`
   - **anon public**: 这是一个公开的密钥，用于客户端访问
   - **service_role secret**: 这是服务端密钥，请妥善保管，不要泄露

5. 复制以下信息到 `.env` 文件：
   ```
   VITE_SUPABASE_URL=https://xxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=你的anon_public密钥
   ```

### 1.4 执行数据库迁移

1. 在 Supabase 项目仪表板中，点击左侧菜单的 **"SQL Editor"**
2. 点击 **"New Query"** 按钮
3. 打开本项目的 `supabase/migrations/001_initial_schema.sql` 文件
4. 复制所有 SQL 代码并粘贴到查询编辑器中
5. 点击 **"Run"** 按钮执行 SQL
6. 确认所有表都已创建成功

### 1.5 配置认证

1. 点击左侧菜单的 **"Authentication"** → **"Providers"**
2. 确保 **"Email"** 已启用
3. 如需启用手机号登录：
   - 点击 **"Phone"** 选项卡
   - 启用 Phone provider
   - 配置短信服务商（需要额外费用）

4. 如需启用微信登录：
   - 点击 **"Auth Providers"**
   - 找到 **"WeChat"** 并启用
   - 填写微信开放平台的 App ID 和 App Secret
   - 配置回调 URL: `https://xxxxxx.supabase.co/auth/v1/callback`

### 1.6 配置存储（可选）

1. 点击左侧菜单的 **"Storage"**
2. 点击 **"Create a new bucket"**
3. 创建名为 `dish-images` 的存储桶
4. 设置为公开访问（Public bucket）

---

## 2. Vercel 配置

### 2.1 创建 Vercel 账号

1. 访问 [Vercel 官网](https://vercel.com)
2. 点击右上角 **"Sign Up"** 按钮
3. 选择使用 GitHub 账号登录（推荐）
4. 授权 Vercel 访问你的 GitHub 账号

### 2.2 导入项目

**方式一：从 GitHub 导入（推荐）**

1. 首先将项目推送到 GitHub：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/dailycuisine.git
   git push -u origin main
   ```

2. 在 Vercel 仪表板中，点击 **"Add New"** → **"Project"**
3. 选择你的 GitHub 仓库 `dailycuisine`
4. 点击 **"Import"** 按钮

**方式二：直接部署**

1. 在本地项目目录运行：
   ```bash
   npm install -g vercel
   vercel
   ```
2. 按照提示登录并部署

### 2.3 配置环境变量

1. 在项目导入页面，找到 **"Environment Variables"** 部分
2. 添加以下环境变量：

   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | 你的 Supabase Project URL |
   | `VITE_SUPABASE_ANON_KEY` | 你的 Supabase anon public 密钥 |
   | `VITE_BAIDU_AI_API_KEY` | 你的百度 AI API Key |
   | `VITE_BAIDU_AI_SECRET_KEY` | 你的百度 AI Secret Key |

3. 选择应用的环境：
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### 2.4 部署设置

1. **Framework Preset**: Vercel 会自动检测为 `Vite`
2. **Root Directory**: `./`（默认）
3. **Build Command**: `npm run build`（默认）
4. **Output Directory**: `dist`（默认）
5. 点击 **"Deploy"** 按钮

### 2.5 配置自定义域名（可选）

1. 部署成功后，进入项目仪表板
2. 点击 **"Settings"** → **"Domains"**
3. 添加你的自定义域名
4. 按照提示配置 DNS 记录

---

## 3. 百度 AI 配置

### 3.1 创建百度智能云账号

1. 访问 [百度智能云官网](https://cloud.baidu.com)
2. 点击右上角 **"登录"** 或 **"注册"**
3. 可以使用百度账号直接登录，或注册新账号
4. 完成实名认证（需要上传身份证）

### 3.2 开通图像识别服务

1. 登录后，访问 [图像识别产品页](https://cloud.baidu.com/product/imagerecognition)
2. 点击 **"立即使用"** 或 **"控制台"**
3. 首次使用需要开通服务：
   - 选择 **"菜品识别"** 服务
   - 点击 **"开通服务"**
   - 确认开通（有免费额度）

### 3.3 创建应用并获取密钥

1. 进入 [百度 AI 控制台](https://console.bce.baidu.com/ai/#/ai/imagerecognition/overview/index)
2. 点击左侧菜单的 **"应用列表"**
3. 点击 **"创建应用"** 按钮
4. 填写应用信息：
   - **应用名称**: `dailycuisine`
   - **应用描述**: 每天家常菜菜品识别
   - **选择服务**: 勾选 `图像识别` → `菜品识别`
5. 点击 **"立即创建"** 按钮
6. 创建成功后，在应用列表中找到你的应用
7. 点击 **"查看详情"**，你可以看到：
   - **API Key**: 你的 API 密钥
   - **Secret Key**: 你的密钥

8. 复制以下信息到 `.env` 文件：
   ```
   VITE_BAIDU_AI_API_KEY=你的API_Key
   VITE_BAIDU_AI_SECRET_KEY=你的Secret_Key
   ```

### 3.4 了解免费额度

- **菜品识别**: 每月 1000 次免费调用
- 超出免费额度后按次计费
- 建议在开发阶段使用 Mock 数据，避免消耗额度

---

## 4. 环境变量配置

### 4.1 创建本地环境变量文件

1. 在项目根目录创建 `.env` 文件：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，填入你的配置：
   ```env
   # Supabase 配置
   VITE_SUPABASE_URL=https://xxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=你的anon_public密钥

   # 百度 AI 配置
   VITE_BAIDU_AI_API_KEY=你的API_Key
   VITE_BAIDU_AI_SECRET_KEY=你的Secret_Key
   ```

### 4.2 验证配置

运行以下命令启动开发服务器：

```bash
npm run dev -- --cache /tmp/npm-cache
```

访问 http://localhost:3000，检查应用是否正常运行。

---

## 5. 完整配置清单

### ✅ Supabase
- [ ] 创建 Supabase 账号
- [ ] 创建新项目
- [ ] 获取 Project URL 和 anon public 密钥
- [ ] 执行数据库迁移脚本
- [ ] 配置认证方式（可选）

### ✅ Vercel
- [ ] 创建 Vercel 账号
- [ ] 导入 GitHub 项目
- [ ] 配置环境变量
- [ ] 部署项目
- [ ] 配置自定义域名（可选）

### ✅ 百度 AI
- [ ] 创建百度智能云账号
- [ ] 完成实名认证
- [ ] 开通菜品识别服务
- [ ] 创建应用并获取密钥

### ✅ 本地环境
- [ ] 创建 `.env` 文件
- [ ] 填入所有配置信息
- [ ] 启动开发服务器验证

---

## 6. 常见问题

### Q1: Supabase 数据库迁移失败？
**A**: 确保你使用的是 SQL Editor 而不是其他工具，并且完整复制了所有 SQL 代码。

### Q2: Vercel 部署失败？
**A**: 检查 Build Logs，常见问题：
- 环境变量未配置
- 依赖安装失败
- 构建命令错误

### Q3: 百度 AI 调用失败？
**A**: 
- 检查 API Key 和 Secret Key 是否正确
- 确认服务已开通
- 查看是否超出免费额度
- 应用已提供了 Mock 数据，可在没有 API Key 时使用

### Q4: 本地开发时环境变量不生效？
**A**: 
- 确保文件名是 `.env` 而不是 `.env.example`
- 重启开发服务器
- 环境变量必须以 `VITE_` 开头才能在客户端访问

---

## 7. 安全提示

⚠️ **重要安全提醒**：

1. **永远不要**将 `.env` 文件提交到 Git 仓库
2. **永远不要**在客户端代码中暴露 `service_role` 密钥
3. **永远不要**在公开场合分享你的 API 密钥
4. 定期轮换（更换）你的 API 密钥
5. 使用 Supabase 的 RLS（行级安全）保护数据

---

## 8. 下一步

配置完成后，你可以：

1. 🎨 自定义应用主题和样式
2. 📱 测试 PWA 功能
3. 🚀 部署到生产环境
4. 📊 监控应用性能
5. 🔧 根据需求添加新功能

祝你使用愉快！🎉
