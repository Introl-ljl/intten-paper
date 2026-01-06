import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config';

const CN_DATE_RE = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/;

function parsePostDate(value: unknown): Date | null {
  if (value instanceof Date) return value;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  const match = CN_DATE_RE.exec(trimmed);
  if (match) {
    const [, year, month, day] = match;
    const iso = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00+08:00`;
    const parsed = new Date(iso);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export async function GET(context) {
  const posts = (await getCollection('posts'))
    .map((post) => {
      const pubDate = parsePostDate(post.data.date);
      if (!pubDate) {
        throw new Error(`Invalid post date: ${post.data.date}`);
      }
      return { post, pubDate };
    })
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: siteConfig.title,
    description: 'Introl 的博客更新',
    site: context.site,
    items: posts.map(({ post, pubDate }) => ({
      title: post.data.title,
      pubDate,
      description: post.data.description || '',
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
