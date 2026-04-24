[根目录](../../../CLAUDE.md) > [src](../../CLAUDE.md) > **content**

# src/content/ 模块文档

## 变更记录 (Changelog)

### 2026-02-08 02:53:52
- 初始化 content 模块文档
- 记录内容集合结构与 schema 定义

---

## 模块职责

`src/content/` 是 Astro Content Collections 的数据目录，负责管理所有 Markdown 内容文件。通过 Zod schema 验证内容格式，提供类型安全的内容查询 API。

## 入口与启动

### 内容集合定义
在 `src/content/config.ts` 中定义三个内容集合:
1. **posts** - 博客文章
2. **thoughts** - 随笔/碎碎念
3. **pages** - 静态页面

### 使用方式
```typescript
import { getCollection } from 'astro:content';

// 获取所有文章
const posts = await getCollection('posts');

// 过滤草稿
const publishedPosts = await getCollection('posts', ({ data }) => {
  return !data.draft;
});

// 渲染内容
const { Content } = await post.render();
```

## 对外接口

### Content Collections API

#### getCollection(collection)
获取指定集合的所有条目。

```typescript
// 获取所有文章
const posts = await getCollection('posts');

// 获取所有随笔
const thoughts = await getCollection('thoughts');

// 获取所有页面
const pages = await getCollection('pages');
```

#### getEntry(collection, slug)
获取指定集合中的单个条目。

```typescript
const aboutPage = await getEntry('pages', 'about');
```

#### 条目对象结构
```typescript
interface CollectionEntry {
  id: string;              // 文件路径（相对于集合目录）
  slug: string;            // URL slug（文件名去除扩展名）
  body: string;            // Markdown 原始内容
  collection: string;      // 集合名称
  data: T;                 // frontmatter 数据（类型由 schema 定义）
  render: () => Promise<{
    Content: AstroComponent;  // 渲染后的组件
    headings: Array<{         // 标题列表
      depth: number;
      slug: string;
      text: string;
    }>;
    remarkPluginFrontmatter: Record<string, any>;
  }>;
}
```

## 关键依赖与配置

### 外部依赖
```typescript
import { defineCollection, z } from 'astro:content';
```

### Schema 定义

#### Posts Schema (文章)
```typescript
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),           // 必填，文章标题
    date: z.string(),            // 必填，发布日期 (YYYY-MM-DD)
    description: z.string(),     // 必填，文章摘要
    draft: z.boolean().optional(), // 可选，是否草稿（默认 false）
    tags: z.array(z.string()).optional(), // 可选，标签数组
  }),
});
```

#### Thoughts Schema (随笔)
```typescript
const thoughtsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),            // 必填，发布日期 (YYYY-MM-DD)
  }),
});
```

#### Pages Schema (静态页面)
```typescript
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),           // 必填，页面标题
    description: z.string().optional(), // 可选，页面描述
  }),
});
```

## 数据模型

### 内容统计
- **文章 (posts)**: 42 篇
- **随笔 (thoughts)**: 2 篇
- **页面 (pages)**: 1 篇 (about.md)

### 文章分类
根据标签统计，主要分类包括:
- 算法竞赛题解 (Codeforces, Luogu)
- 学习笔记 (递归、DFS/BFS、二分、前缀和、差分)
- 数据结构 (树状数组、平衡树、树形 DP)
- 算法专题 (动态规划、最小生成树)
- 技术教程 (PVE9 安装、HomeLab 配置)
- 竞赛游记 (CSP2023、NOIP 模拟赛)

### 文件命名规范
- **文章**: `标题.md` 或 `CF题号-题目名-题解.md`
- **随笔**: `YYYY-MM-DD-标题.md`
- **页面**: `页面名.md`

## 测试与质量

### Schema 验证
Astro 在构建时自动验证所有内容文件的 frontmatter 是否符合 schema 定义。

### 验证规则
1. **必填字段**: 缺少必填字段会导致构建失败
2. **类型检查**: 字段类型不匹配会报错
3. **日期格式**: 虽然 schema 定义为 `string`，但建议使用 `YYYY-MM-DD` 格式

### 常见错误
```
Error: Invalid frontmatter in posts/example.md
- title: Required
- date: Required
- description: Required
```

### 质量检查清单
- [ ] 所有文章包含 title, date, description
- [ ] 日期格式统一为 YYYY-MM-DD
- [ ] 标签使用一致的命名（避免大小写不一致）
- [ ] 草稿文章设置 `draft: true`
- [ ] Markdown 语法正确，无渲染错误

## 常见问题 (FAQ)

### Q: 如何添加新文章？
A: 在 `src/content/posts/` 创建新的 `.md` 文件，包含必需的 frontmatter。

### Q: 如何设置文章为草稿？
A: 在 frontmatter 中添加 `draft: true`。

### Q: 如何修改 schema？
A: 编辑 `src/content/config.ts`，修改对应集合的 schema 定义。

### Q: 如何添加新的内容集合？
A:
1. 在 `src/content/` 创建新目录
2. 在 `config.ts` 中定义新集合的 schema
3. 在 `collections` 对象中导出新集合

### Q: 如何在文章中使用图片？
A:
- 将图片放在 `src/content/posts/images/` 目录
- 在 Markdown 中使用相对路径引用: `![描述](./images/图片名.png)`

### Q: 如何排序文章？
A: 在页面组件中使用 `.sort()` 方法:
```typescript
const posts = (await getCollection('posts'))
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
```

### Q: 如何过滤特定标签的文章？
A:
```typescript
const posts = await getCollection('posts', ({ data }) => {
  return data.tags?.includes('算法');
});
```

## 相关文件清单

### 配置文件
- `config.ts` - 内容集合 schema 定义（34 行）

### 内容文件
- `posts/*.md` - 42 篇文章
  - 算法题解: 30+ 篇
  - 学习笔记: 8 篇
  - 技术教程: 2 篇
  - 竞赛游记: 2 篇
- `thoughts/*.md` - 2 篇随笔
  - `2026-01-05-blog-organization.md`
  - `2026-01-06-first-thought.md`
- `pages/about.md` - 关于页面

### 图片资源
- `posts/images/*.png` - 文章配图（6 张）
- `posts/images/*.svg` - 算法图示（2 张）

---

**文档更新时间**: 2026-02-08 02:53:52
**内容统计**: 42 篇文章 + 2 篇随笔 + 1 个页面 = 45 个内容文件
