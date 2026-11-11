import type { CollectionEntry } from 'astro:content';

type Work = CollectionEntry<'works'>;

/**
 * 並び順：order の小さい順（未指定は最後）。
 * order が同じ（または両方未指定）の場合は start の新しい順。start もなければ入力順。
 */
export const sortWorks = (a: Work, b: Work) => {
  const oa = a.data.order ?? Infinity;
  const ob = b.data.order ?? Infinity;
  if (oa !== ob) return oa < ob ? -1 : 1;
  const sa = a.data.start;
  const sb = b.data.start;
  if (sa && sb) return sb.localeCompare(sa);
  if (sa) return -1;
  if (sb) return 1;
  return 0;
};
