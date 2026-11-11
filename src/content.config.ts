import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 実績（Works）
 * src/content/works/ に Markdown を1ファイル追加すると、トップの WORKS に1件追加されます。
 * 「_」で始まるファイル（_template.md など）は読み込まれません。
 */
const works = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(), // 案件名
      client: z.string().optional(), // クライアント名
      category: z.string().optional(), // 例: コーポレートサイト
      start: z.string().optional(), // 'YYYY-MM'（並び順にも使用・新しい順）。省略可（年月なしで表示）
      end: z.string().optional(), // 'YYYY-MM'。start があるときだけ有効。省略すると「現在」
      order: z.number().optional(), // 表示順（小さい順）。未指定の案件は最後に start の新しい順
      role: z.string().optional(), // 役割
      team: z.string().optional(), // 体制
      stack: z.array(z.string()).default([]), // 使用技術
      tasks: z.array(z.string()).default([]), // 担当業務
      highlights: z.array(z.string()).default([]), // 工夫した点
      outcomes: z.array(z.string()).default([]), // 成果
      url: z.string().url().optional(), // 公開URL
      thumbnail: image().optional(), // サムネイル（このファイルからの相対パス）
      thumbnailAlt: z.string().optional(),
      draft: z.boolean().default(false), // true で非表示
    }),
});

export const collections = { works };
