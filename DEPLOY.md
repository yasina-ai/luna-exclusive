# 部署到 Netlify（全栈：前端 + Functions + Supabase 数据库）

本项目可直接部署到 **Netlify**：

| 层级 | 技术 |
|------|------|
| 前端 | Vue 3 → `dist/` 静态托管 |
| 后端 API | Netlify Functions（`netlify/functions/api.js`） |
| 数据库 / 登录 / 存储 | **Supabase**（Postgres + Auth，免费档可用） |

> Netlify 本身不托管传统长期运行的 Node 服务器或本地 SQLite；Functions + 外部 Postgres（Supabase）是官方推荐组合。

---

## 1. 创建 Supabase 项目

1. 打开 [https://supabase.com](https://supabase.com) 注册并 **New project**
2. 进入 **SQL Editor**，粘贴并执行仓库内 `db/schema.sql`（建表 + RLS + 示例数据）
3. **Project Settings → API** 复制：
   - Project URL
   - `anon` `public` key
   - `service_role` key（保密，仅服务端）

4. **Authentication → Providers**：启用 Email  
5. （可选）关闭 “Confirm email” 方便测试

---

## 2. 连接 GitHub 并部署 Netlify

1. 把本仓库推到 GitHub  
2. [Netlify](https://app.netlify.com) → **Add new site → Import from Git**  
3. Build settings（一般会读 `netlify.toml`）：
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

4. **Site settings → Environment variables** 添加：

| Key | Value |
|-----|--------|
| `VITE_SUPABASE_URL` | Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | anon public key |
| `SUPABASE_URL` | 同上 URL |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key |
| `VITE_API_BASE` | `/api` |

5. **Trigger deploy**

---

## 3. 验证

- 打开站点 → 注册/登录 `/auth`  
- `/api?path=health` 应返回 `"db": true`  
- 会员页登录后点「立即订阅」→ 写入 `memberships` 表（演示开通，非真实支付）  
- 定制表单提交 → `custom_requests` / `business_inquiries` 表  

---

## 4. 本地开发

```bash
cp .env.example .env   # 填入密钥
npm install
npm run dev            # 仅前端；API 需 netlify dev
npx netlify dev        # 前端 + Functions 本地联调
```

---

## 5. 生产必做（仍需你自行完成）

- 接入 **Stripe / Lemon Squeezy** 等支付，用 Webhook 写 `memberships`（替换演示版 `membership/activate`）  
- 锁定媒体放 **Supabase Storage 私有桶**，仅会员返回 **signed URL**  
- 按地区完成真实年龄核验与 §2257 记录保管人信息  
- 限制 CORS 为你的正式域名  

---

## API 一览

| path | 方法 | 说明 |
|------|------|------|
| `health` | GET | 健康检查 |
| `gallery` | GET | 写真列表 |
| `videos` | GET | 视频列表 |
| `blog` | GET | 动态 |
| `me` | GET | 当前用户与会员状态（需 JWT） |
| `membership/activate` | POST | 演示开通会员（需登录） |
| `custom` | POST | 粉丝定制入库 |
| `business` | POST | 商务合作入库 |
