# ディレクトリ構成

## 全体像

```text
react-gantt-flow/
├─ .storybook/         // Storybook の設定を置く
├─ docs/               // ドキュメントを置く
├─ src/
│  ├─ assets/          // アセットを置く
│  │  └─ styles/       // スタイルの共通設定を置く(Style Dictionaryの出力物もここに置く)
│  │      ├─ _variables.scss // 変数
│  │      ├─ _mixins.scss    // ミックスイン
│  │      ├─ _functions.scss // 関数
│  │      └─ ...
│  ├─ components/      // コンポーネント群をディレクトリ単位で管理
│  │  └─ gantt-flow/
│  │      ├─ GanttFlow.tsx
│  │      ├─ GanttFlow.stories.tsx  // Storybook用ファイル
│  │      ├─ index.ts            // コンポーネントをエクスポートするエントリ
│  ├─ hooks/           // React Hooks（カスタムフック）を格納
│  ├─ utils/           // 汎用的なユーティリティ関数を格納
│  ├─ types/           // 型定義や共通の型エイリアスなどを管理（必要に応じて）
│  ├─ index.ts         // ライブラリとして外部にエクスポートする総合エントリ
│  └─ ...              // 他に必要に応じてファイルやディレクトリを追加
├─ .commitlintrc       // Commitlint の設定ファイル
├─ .biome.json         // Biome の設定ファイル
├─ knip.json           // Knip の設定ファイル
├─ lefthook.yml        // Lefthook の設定ファイル
├─ renovate.json       // Renovate の設定ファイル
├─ package.json
├─ tsconfig.json       // TypeScript の設定ファイル
├─ tsconfig.node.json  // TypeScript の設定ファイル（Node.js 向け）
├─ tsconfig.app.json   // TypeScript の設定ファイル（アプリケーション向け）
├─ tsconfig.build.json // TypeScript の設定ファイル（ビルド向け）
├─ vite.config.ts      // Vite の設定ファイル
├─ README.md           // プロジェクトの説明
├─ LICENSE             // ライセンスファイル
└─ pnpm-lock.json   // パッケージロックファイル
```

---
