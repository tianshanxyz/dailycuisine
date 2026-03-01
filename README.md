# 每天家常菜

智能菜谱规划与采购管理应用 - 让每一餐都营养均衡、轻松美味

## 🌟 功能特性

### 核心功能
- **周菜谱规划** - 预排最多一周的早、中、晚餐菜谱，拖拽式操作
- **AI智能推荐** - 基于营养均衡、厨房设备、地域特色的智能菜谱推荐
- **智能采购清单** - 自动生成食材清单，包含价格估算和储存建议
- **采购费用统计** - 可视化图表展示，支持CSV/Excel导出

### 搜索与发现
- **多维度搜索** - 支持关键词、分类、食材等多种搜索方式
- **搜索历史** - 记录用户搜索习惯，快速访问
- **热门推荐** - 基于用户偏好和季节的智能推荐

### 用户系统
- **多渠道注册** - 支持手机号、微信、支付宝登录
- **个性化设置** - 城市选择、厨房设备配置
- **数据安全** - 完善的隐私保护和数据加密

## 🛠 技术栈

### 前端
- **React 18** - 现代化UI框架
- **TypeScript** - 类型安全
- **Vite** - 快速构建工具
- **Tailwind CSS** - 原子化CSS框架
- **shadcn/ui** - 高质量UI组件库
- **React Router v6** - 路由管理
- **Zustand** - 轻量级状态管理
- **React Query** - 数据请求管理
- **Recharts** - 数据可视化

### 后端与服务
- **Supabase** - 数据库、认证、存储、实时订阅
- **百度AI API** - 图像识别、智能推荐
- **PWA** - 离线支持、安装到主屏幕

### 部署
- **Vercel** - 前端部署
- **Cloudflare** - CDN加速和安全防护
- **GitHub** - 版本控制

## 📦 安装与运行

### 环境要求
- Node.js >= 18
- npm >= 9

### 安装依赖
```bash
npm install --cache /tmp/npm-cache
```

### 配置环境变量
复制 `.env.example` 为 `.env` 并填写配置：
```bash
cp .env.example .env
```

需要配置的环境变量：
- `VITE_SUPABASE_URL` - Supabase项目URL
- `VITE_SUPABASE_ANON_KEY` - Supabase匿名密钥
- `VITE_BAIDU_AI_API_KEY` - 百度AI API密钥
- `VITE_BAIDU_AI_SECRET_KEY` - 百度AI密钥

### 运行开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
```

## 📱 PWA功能

应用支持PWA特性：
- 离线访问已保存的菜谱和采购清单
- 添加到主屏幕
- 推送通知（需配置）

## 🗄️ 数据库结构

主要数据表：
- `users` - 用户信息
- `dishes` - 菜品信息
- `weekly_plans` - 周计划
- `shopping_lists` - 采购清单
- `purchase_records` - 采购记录
- `search_history` - 搜索历史
- `kitchen_equipment` - 厨房设备
- `cities` - 城市数据

详细结构请查看 [数据库迁移文件](./supabase/migrations/001_initial_schema.sql)

## 🎨 项目结构

```
dailycuisine/
├── src/
│   ├── components/        # 可复用组件
│   │   ├── ui/           # shadcn/ui组件
│   │   ├── Layout.tsx    # 布局组件
│   │   └── ...
│   ├── pages/            # 页面组件
│   │   ├── Home.tsx
│   │   ├── Planning.tsx
│   │   ├── Shopping.tsx
│   │   ├── SearchPage.tsx
│   │   ├── PurchaseAnalytics.tsx
│   │   └── ...
│   ├── hooks/            # 自定义Hooks
│   ├── stores/           # Zustand状态管理
│   ├── services/         # API服务
│   │   ├── supabase.ts
│   │   ├── baiduAIService.ts
│   │   └── dishDataService.ts
│   ├── types/            # TypeScript类型定义
│   ├── lib/              # 工具函数
│   └── data/             # 静态数据
├── public/               # 静态资源
├── supabase/            # 数据库迁移文件
└── tests/               # 测试文件
```

## 🔒 安全与隐私

- HTTPS强制加密
- 敏感数据加密存储
- 行级安全策略(RLS)
- 用户隐私权限管理
- 符合国家数据安全法规

## 🚀 部署

### Vercel部署
1. 连接GitHub仓库到Vercel
2. 配置环境变量
3. 自动部署

### Cloudflare配置
1. 添加域名到Cloudflare
2. 配置CDN缓存规则
3. 启用安全防护

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📧 联系方式

如有问题或建议，请提交Issue或发送邮件至项目维护者。
