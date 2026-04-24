[根目录](../../../CLAUDE.md) > [src](../../CLAUDE.md) > **pages**

# src/pages/ 模块文档

## 变更记录 (Changelog)

### 2026-02-08 02:53:52
- 初始化 pages 模块文档
- 记录页面路由结构与功能

---

## 模块职责

`src/pages/` 是 Astro 的文件系统路由目录，每个 `.astro` 或 `.ts` 文件自动映射为对应的 URL 路由。负责定义站点的页面结构、数据获取逻辑和页面渲染。

## 入口与启动

### 路由映射规则
- `index.astro` → `/`
- `about.astro` → `/about`
- `posts/[slug].astro` → `/posts/:slug` (动态路由)
- `page/[page].astro` → `/page/:page` (动态路由)
- `rss.xml.ts` → `/rss.xml` (端点路由)

### 构建时行为
1. Astro 扫描 `src/pages/` 目录
2. 对于静态路由，直接生成 HTML
3. 对于动态路由，调用 `getStaticPaths()` 获取所有路径
4. 渲染每个页面并输出到 `dist/`

## 对外接口

### 页面列表

#### 1. 首页 (index.astro)
- **路由**: `/`
- **功能**: 显示最新 10 篇文章列表，支持分页
- **数据源**: `getCollection('posts')`
- **特性**:
  - 一言 API 集成 (hitokoto.cn)
  - 社交链接展示
  - 主题切换按钮
  - 分页导航

#### 2. 文章详情页 (posts/[slug].astro)
- **路由**: `/posts/:slug`
- **功能**: 渲染单篇文章内容
- **数据源**: `getCollection('posts')`
- **特性**:
  - Markdown 内容渲染
  - KaTeX 数学公式支持
  - Pangu 中英文排版优化
  - 代码高亮
  - CC BY-NC 4.0 许可声明
  - 返回首页链接

#### 3. 分页路由 (page/[page].astro)
- **路由**: `/page/:page` (从第 2 页开始)
- **功能**: 显示分页后的文章列表
- **数据源**: `getCollection('posts')`
- **特性**:
  - 每页 10 篇文章
  - 上一页/下一页导航
  - 页码显示

#### 4. 归档页 (archive.astro)
- **路由**: `/archive`
- **功能**: 按时间线展示所有文章，支持标签筛选
- **数据源**: `getCollection('posts')`
- **特性**:
  - 标签云（字体大小反映标签热度）
  - 按月份分组的时间线
  - 标签筛选功能
  - 文章计数统计

#### 5. 随笔页 (thoughts.astro)
- **路由**: `/thoughts`
- **功能**: 时间线布局展示随笔内容
- **数据源**: `getCollection('thoughts')`
- **特性**:
  - 垂直时间线设计
  - 日期格式化显示
  - 响应式布局（桌面/移动端不同样式）

#### 6. 关于页 (about.astro)
- **路由**: `/about`
- **功能**: 展示关于页面内容
- **数据源**: `getCollection('pages')` 中的 `about.md`
- **特性**:
  - Markdown 内容渲染
  - 使用 BaseLayout 布局

#### 7. 友链页 (friends.astro)
- **路由**: `/friends`
- **功能**: 展示友情链接列表
- **数据源**: `siteConfig.friends`
- **特性**:
  - 卡片式布局
  - 头像、名称、描述展示
  - 外部链接跳转

#### 8. RSS Feed (rss.xml.ts)
- **路由**: `/rss.xml`
- **功能**: 生成 RSS 2.0 格式的订阅源
- **数据源**: `getCollection('posts')`
- **特性**:
  - 支持中文日期格式解析
  - 按日期降序排列
  - 包含文章标题、描述、链接、发布日期

## 关键依赖与配置

### 外部依赖
```typescript
import { getCollection } from 'astro:content';  // 内容集合 API
import { marked } from 'marked';                // Markdown 解析
import Moon from 'lucide-astro/Moon';           // 月亮图标
import Sun from 'lucide-astro/Sun';             // 太阳图标
import { siteConfig, PAGE_SIZE } from '../config'; // 站点配置
```

### 内部依赖
- `../config.ts` - 站点配置
- `../components/Footer.astro` - 页脚组件
- `../components/Pagination.astro` - 分页组件
- `../layouts/BaseLayout.astro` - 基础布局
- `../components/icons/*` - 自定义图标

### 配置项
- `PAGE_SIZE = 10` - 每页文章数量
- `siteConfig.nav` - 导航菜单
- `siteConfig.social` - 社交链接
- `siteConfig.friends` - 友情链接

## 数据模型

### 文章列表数据结构
```typescript
interface Post {
  slug: string;           // URL slug
  data: {
    title: string;        // 标题
    date: string;         // 日期
    description: string;  // 摘要
    draft?: boolean;      // 草稿标记
    tags?: string[];      // 标签
  };
  render: () => Promise<{ Content: AstroComponent }>;
}
```

### 分页数据结构
```typescript
interface PaginationProps {
  current: number;        // 当前页码
  total: number;          // 总页数
  prevUrl?: string;       // 上一页 URL
  nextUrl?: string;       // 下一页 URL
}
```

### RSS 数据结构
```typescript
interface RSSItem {
  title: string;          // 文章标题
  pubDate: Date;          // 发布日期
  description: string;    // 文章摘要
  link: string;           // 文章链接
}
```

## 测试与质量

### 测试建议
1. **路由测试**: 验证所有路由可访问
2. **动态路由测试**: 确保 `getStaticPaths()` 返回所有有效路径
3. **内容渲染测试**: 检查 Markdown 渲染正确性
4. **分页逻辑测试**: 验证分页边界条件
5. **RSS 格式测试**: 使用 RSS 验证器检查输出

### 质量检查清单
- [ ] 所有页面无 TypeScript 错误
- [ ] 动态路由生成所有必要路径
- [ ] 内容集合数据正确获取
- [ ] 响应式布局在移动端正常显示
- [ ] 主题切换功能正常工作
- [ ] 外部链接使用 `target="_blank"` 和 `rel="noopener noreferrer"`

## 常见问题 (FAQ)

### Q: 如何添加新页面？
A: 在 `src/pages/` 创建新的 `.astro` 文件，Astro 自动生成对应路由。

### Q: 如何修改分页大小？
A: 修改 `src/config.ts` 中的 `PAGE_SIZE` 常量。

### Q: 动态路由如何工作？
A: 使用 `[slug]` 语法定义动态参数，在 `getStaticPaths()` 中返回所有可能的路径。

### Q: 如何自定义 RSS feed？
A: 编辑 `src/pages/rss.xml.ts`，修改 `rss()` 函数的参数。

### Q: 如何禁用某个页面？
A: 删除或重命名对应的 `.astro` 文件（如添加 `.bak` 后缀）。

### Q: 如何添加新的动态路由？
A:
1. 创建 `[param].astro` 文件
2. 导出 `getStaticPaths()` 函数
3. 返回包含 `params` 和 `props` 的对象数组

## 相关文件清单

### 页面文件 (8 个)
- `index.astro` - 首页（233 行）
- `posts/[slug].astro` - 文章详情页（246 行）
- `page/[page].astro` - 分页路由
- `archive.astro` - 归档页（287 行）
- `thoughts.astro` - 随笔页（98 行）
- `about.astro` - 关于页
- `friends.astro` - 友链页
- `rss.xml.ts` - RSS feed（46 行）

### 依赖组件
- `../components/Footer.astro`
- `../components/Pagination.astro`
- `../layouts/BaseLayout.astro`

### 依赖配置
- `../config.ts`
- `../content/config.ts`

---

**文档更新时间**: 2026-02-08 02:53:52
