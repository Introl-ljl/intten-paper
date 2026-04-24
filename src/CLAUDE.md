[根目录](../../CLAUDE.md) > **src**

# src/ 模块文档

## 变更记录 (Changelog)

### 2026-02-08 02:53:52
- 初始化 src 模块文档
- 记录源码目录结构与职责划分

---

## 模块职责

`src/` 目录是项目的核心源码目录，包含所有 Astro 组件、页面路由、内容集合、布局模板和配置文件。采用分层架构设计，职责清晰分离。

## 入口与启动

### 开发模式
```bash
npm run dev
# Astro 启动开发服务器，监听文件变化，热重载
# 默认地址: http://localhost:4321
```

### 生产构建
```bash
npm run build
# Astro 执行静态站点生成 (SSG)
# 输出目录: dist/
# 构建流程:
# 1. 读取 src/pages/ 生成路由
# 2. 处理 src/content/ 内容集合
# 3. 渲染组件和布局
# 4. 生成静态 HTML/CSS/JS
```

## 对外接口

### 页面路由 (src/pages/)
| 路由 | 文件 | 功能 |
|------|------|------|
| `/` | index.astro | 首页（文章列表，分页显示前 10 篇） |
| `/posts/:slug` | posts/[slug].astro | 文章详情页（动态路由） |
| `/page/:page` | page/[page].astro | 分页路由（第 2 页起） |
| `/archive` | archive.astro | 归档页（标签云+时间线） |
| `/thoughts` | thoughts.astro | 随笔页（时间线布局） |
| `/about` | about.astro | 关于页 |
| `/friends` | friends.astro | 友链页 |
| `/rss.xml` | rss.xml.ts | RSS feed |

### 内容集合 API (src/content/)
```typescript
// 获取所有文章
import { getCollection } from 'astro:content';
const posts = await getCollection('posts');

// 获取所有随笔
const thoughts = await getCollection('thoughts');

// 获取静态页面
const pages = await getCollection('pages');
```

### 配置导出 (src/config.ts)
```typescript
export const PAGE_SIZE = 10;  // 分页大小

export const siteConfig = {
  title: string;           // 站点标题
  author: string;          // 作者名
  description: string;     // 站点描述
  url: string;             // 站点 URL
  avatar: string;          // 头像路径
  nav: Array<{name, href}>; // 导航菜单
  social: Array<{name, href, icon, label}>; // 社交链接
  friends: Array<{name, url, avatar, description}>; // 友链
  startTime: string;       // 建站时间
  copyright: string;       // 版权年份
};
```

## 关键依赖与配置

### 外部依赖
- `astro:content`: Astro 内容集合 API
- `lucide-astro`: 图标库
- `marked`: Markdown 解析器（用于首页简介渲染）
- `zod`: Schema 验证库

### 内部依赖关系
```
pages/ → layouts/ → components/
  ↓         ↓           ↓
  └─────→ config.ts ←──┘
  ↓
content/config.ts
```

### 配置文件
- `src/content/config.ts`: 定义内容集合 schema
- `src/config.ts`: 站点全局配置

## 数据模型

### Posts Schema (文章)
```typescript
{
  title: string;           // 必填，文章标题
  date: string;            // 必填，发布日期 (YYYY-MM-DD)
  description: string;     // 必填，文章摘要
  draft?: boolean;         // 可选，是否草稿（默认 false）
  tags?: string[];         // 可选，标签数组
}
```

### Thoughts Schema (随笔)
```typescript
{
  date: string;            // 必填，发布日期 (YYYY-MM-DD)
}
```

### Pages Schema (静态页面)
```typescript
{
  title: string;           // 必填，页面标题
  description?: string;    // 可选，页面描述
}
```

## 测试与质量

### 当前状态
- **无自动化测试**: 未配置测试框架
- **类型检查**: TypeScript 编译时检查
- **内容验证**: Zod schema 运行时验证

### 质量保证措施
1. **构建验证**: `npm run build` 检查编译错误
2. **类型安全**: 使用 TypeScript 严格模式
3. **Schema 验证**: 内容集合自动验证 frontmatter
4. **手动测试**: 本地预览和生产环境验证

## 常见问题 (FAQ)

### Q: 如何添加新页面？
A: 在 `src/pages/` 创建 `.astro` 文件，Astro 自动生成对应路由。

### Q: 如何修改导航菜单？
A: 编辑 `src/config.ts` 的 `siteConfig.nav` 数组。

### Q: 如何自定义文章详情页样式？
A: 编辑 `src/pages/posts/[slug].astro`，修改 Tailwind 类名或添加自定义样式。

### Q: 内容集合如何排序？
A: 在页面组件中使用 `.sort()` 方法，通常按日期降序排列。

### Q: 如何添加新的内容类型？
A:
1. 在 `src/content/` 创建新目录
2. 在 `src/content/config.ts` 定义 schema
3. 创建对应的页面路由

## 相关文件清单

### 核心文件
- `src/config.ts` - 站点全局配置
- `src/content/config.ts` - 内容集合 schema

### 页面文件 (8 个)
- `src/pages/index.astro` - 首页
- `src/pages/posts/[slug].astro` - 文章详情页
- `src/pages/page/[page].astro` - 分页路由
- `src/pages/archive.astro` - 归档页
- `src/pages/thoughts.astro` - 随笔页
- `src/pages/about.astro` - 关于页
- `src/pages/friends.astro` - 友链页
- `src/pages/rss.xml.ts` - RSS feed

### 布局文件 (1 个)
- `src/layouts/BaseLayout.astro` - 基础布局

### 组件文件 (6 个)
- `src/components/Footer.astro` - 页脚
- `src/components/Pagination.astro` - 分页
- `src/components/icons/QQ.astro` - QQ 图标
- `src/components/icons/WeChat.astro` - 微信图标
- `src/components/icons/Codeforces.astro` - Codeforces 图标
- `src/components/icons/LinuxDo.astro` - LinuxDo 图标

### 内容文件 (45 个)
- `src/content/posts/*.md` - 42 篇文章
- `src/content/thoughts/*.md` - 2 篇随笔
- `src/content/pages/about.md` - 关于页内容

---

**文档更新时间**: 2026-02-08 02:53:52
