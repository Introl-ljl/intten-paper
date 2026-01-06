# Intten-Paper

基于 Astro 和 Tailwind CSS 的个人博客。

## 特性
- 极简风格
- Markdown 内容集合：文章、随笔、页面
- RSS 与站点地图
- 标签归档与分页
- 浅色/深色主题切换

## 技术栈
- Astro 5
- Tailwind CSS + Typography
- Marked、Pangu、KaTeX（CDN）

## 快速开始
1. 安装依赖：
   npm install
2. 启动开发服务器：
   npm run dev
3. 构建生产版本：
   npm run build
4. 预览生产构建：
   npm run preview

## 目录结构
- src/config.ts：站点信息、导航、社交链接、友链
- src/content/posts：文章
- src/content/thoughts：随笔
- src/content/pages：静态页面（about）
- src/pages：Astro 路由
- src/components：通用组件

## 内容前置字段
文章：
```
---
title: "Title"
date: "YYYY-MM-DD"
description: "Short summary"
draft: false
tags: ["tag1", "tag2"]
---
```

随笔：
```
---
date: "YYYY-MM-DD"
---
```

页面：
```
---
title: "About"
description: "Optional description"
---
```

## 配置
- 修改 `astro.config.mjs` 中的站点地址。
- 修改 `src/config.ts` 中的站点信息与链接。

## 部署
`astro build` 输出到 `dist/`。

## 许可证
ISC
