# fukuda_portfolio

福田 祥広のポートフォリオサイト（Astro）。

コンセプト：**「設計から運用まで、一本の線でつなぐ。」**

## コマンド

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に出力
```

## 実績の追加

1. `src/content/works/_template.md` をコピーしてリネーム（例: `example-corp.md`）
2. frontmatter を書き換える（`start` の新しい順に並びます）
3. サムネイルは `src/content/works/images/` に置き、`thumbnail: ./images/xxx.jpg` で指定
   （未指定の場合は番号入りのプレースホルダーが表示されます）
4. `draft: true` で非表示

## 実績一覧ページ

`/works` に全実績の一覧が出ます（1ページ10件、ページ送りあり）。トップ（`src/pages/index.astro` の `FEATURED`）には新しい順に3件だけ表示されます。

## 構成

- `src/pages/index.astro` … ページ本体（文言・数値はファイル冒頭の配列で管理）
- `src/components/WorkCard.astro` … 実績カード
- `src/content.config.ts` … 実績のスキーマ
- `src/styles/global.css` … スタイル（色・フォントは `:root` の変数）
