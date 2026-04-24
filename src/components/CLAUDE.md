[根目录](../../../CLAUDE.md) > [src](../../CLAUDE.md) > **components**

# src/components/ 模块文档

## 变更记录 (Changelog)

### 2026-02-08 02:53:52
- 初始化 components 模块文档
- 记录可复用组件结构与接口

---

## 模块职责

`src/components/` 包含可复用的 Astro 组件，提供通用 UI 元素和自定义图标。组件设计遵循单一职责原则，易于维护和扩展。

## 入口与启动

### 组件导入方式
```typescript
import Footer from '../components/Footer.astro';
import Pagination from '../components/Pagination.astro';
import QQ from '../components/icons/QQ.astro';
```

### 使用示例
```astro
<Footer showHomeLink={true} />
<Pagination current={1} total={5} nextUrl="/page/2" />
```

## 对外接口

### 1. Footer 组件 (Footer.astro)

#### Props 接口
```typescript
interface Props {
  class?: string;          // 自定义 CSS 类名（默认 "mt-24"）
  showHomeLink?: boolean;  // 是否显示"返回首页"链接（默认 false）
}
```

#### 功能
- 显示版权信息
- 显示技术栈链接（Astro + Intten-paper）
- 显示 ICP 备案号
- 提供 RSS 和 Sitemap 链接
- 可选的"返回首页"链接

#### 使用示例
```astro
<!-- 默认样式 -->
<Footer />

<!-- 自定义样式 + 显示返回首页 -->
<Footer class="mt-16" showHomeLink={true} />
```

### 2. Pagination 组件 (Pagination.astro)

#### Props 接口
```typescript
interface Props {
  current: number;         // 当前页码（必填）
  total: number;           // 总页数（必填）
  prevUrl?: string;        // 上一页 URL（可选）
  nextUrl?: string;        // 下一页 URL（可选）
}
```

#### 功能
- 显示当前页码和总页数
- 提供上一页/下一页导航
- 自动禁用不可用的导航按钮
- 响应式设计，支持移动端

#### 使用示例
```astro
<!-- 首页分页 -->
<Pagination
  current={1}
  total={5}
  nextUrl="/page/2"
/>

<!-- 中间页分页 -->
<Pagination
  current={3}
  total={5}
  prevUrl="/page/2"
  nextUrl="/page/4"
/>

<!-- 最后一页分页 -->
<Pagination
  current={5}
  total={5}
  prevUrl="/page/4"
/>
```

### 3. 自定义图标组件 (icons/)

#### QQ.astro
- **功能**: 渲染 QQ 图标 SVG
- **尺寸**: 继承父元素的 `width` 和 `height`
- **颜色**: 使用 `currentColor`，跟随文本颜色

#### WeChat.astro
- **功能**: 渲染微信图标 SVG
- **尺寸**: 继承父元素的 `width` 和 `height`
- **颜色**: 使用 `currentColor`，跟随文本颜色

#### Codeforces.astro
- **功能**: 渲染 Codeforces 图标 SVG
- **尺寸**: 继承父元素的 `width` 和 `height`
- **颜色**: 使用 `currentColor`，跟随文本颜色

#### LinuxDo.astro
- **功能**: 渲染 Linux.Do 图标 SVG
- **尺寸**: 继承父元素的 `width` 和 `height`
- **颜色**: 使用 `currentColor`，跟随文本颜色

#### 使用示例
```astro
import QQ from '../components/icons/QQ.astro';

<a href="#" class="text-accent">
  <QQ class="w-5 h-5" />
</a>
```

## 关键依赖与配置

### 外部依赖
```typescript
import { siteConfig } from '../config';  // Footer 组件使用
```

### 内部依赖
- 无组件间依赖，所有组件独立使用

### 样式依赖
- Tailwind CSS 工具类
- 自定义颜色变量（paper, ink, night, moon, accent）

## 数据模型

### Footer 数据源
```typescript
// 从 siteConfig 读取
{
  copyright: string;       // 版权年份
  author: string;          // 作者名
}
```

### Pagination 计算逻辑
```typescript
// 页面组件中计算
const totalPosts = posts.length;
const totalPages = Math.ceil(totalPosts / PAGE_SIZE);
const currentPage = 1;
const prevUrl = currentPage > 1 ? `/page/${currentPage - 1}` : undefined;
const nextUrl = currentPage < totalPages ? `/page/${currentPage + 1}` : undefined;
```

## 测试与质量

### 组件测试建议
1. **Props 验证**: 测试必填和可选 props
2. **条件渲染**: 测试 `showHomeLink` 和分页边界条件
3. **样式测试**: 验证响应式布局
4. **无障碍测试**: 检查 ARIA 标签和键盘导航

### 质量检查清单
- [ ] 所有 props 有明确的类型定义
- [ ] 组件支持自定义 class 属性
- [ ] 使用语义化 HTML 标签
- [ ] 外部链接包含 `rel="noopener noreferrer"`
- [ ] 图标 SVG 使用 `currentColor` 支持主题切换
- [ ] 组件无副作用，可安全复用

## 常见问题 (FAQ)

### Q: 如何添加新组件？
A: 在 `src/components/` 创建新的 `.astro` 文件，定义 Props 接口和模板。

### Q: 如何自定义 Footer 样式？
A: 通过 `class` prop 传入自定义 Tailwind 类名。

### Q: 如何添加新图标？
A:
1. 在 `src/components/icons/` 创建新的 `.astro` 文件
2. 复制 SVG 代码，替换颜色为 `currentColor`
3. 在页面中导入并使用

### Q: Pagination 组件如何处理单页情况？
A: 当 `total = 1` 时，上一页和下一页按钮都会被禁用。

### Q: 如何修改 Footer 的链接？
A: 直接编辑 `Footer.astro` 文件，修改 `<a>` 标签的 `href` 属性。

### Q: 图标组件如何改变颜色？
A: 通过父元素的 `class` 设置文本颜色，图标会自动继承：
```astro
<div class="text-accent">
  <QQ class="w-5 h-5" />
</div>
```

## 相关文件清单

### 核心组件 (2 个)
- `Footer.astro` - 页脚组件（31 行）
- `Pagination.astro` - 分页组件（39 行）

### 图标组件 (4 个)
- `icons/QQ.astro` - QQ 图标
- `icons/WeChat.astro` - 微信图标
- `icons/Codeforces.astro` - Codeforces 图标
- `icons/LinuxDo.astro` - Linux.Do 图标

### 依赖配置
- `../config.ts` - 站点配置（Footer 组件使用）

---

**文档更新时间**: 2026-02-08 02:53:52
**组件总数**: 6 个（2 个核心组件 + 4 个图标组件）
