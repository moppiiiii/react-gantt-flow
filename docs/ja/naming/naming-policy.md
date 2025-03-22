# 命名規則

## 言語

- **英語**を基本とし、ファイル名・ディレクトリ名・変数名・関数名などは**英単語**で表現する。
- コメントやドキュメンテーションは日本語でもよい。

## 大文字・小文字の使い分け

| 種別                         | 記法・例                             |
| ---------------------------- | ------------------------------------ |
| ディレクトリ名               | すべて小文字 (kebab-case を推奨) \*1 |
| ファイル名                   | すべて小文字 (kebab-case を推奨) \*2 |
| React コンポーネント         | **パスカルケース** (PascalCase)      |
| 変数・関数                   | **キャメルケース** (camelCase)       |
| クラス・型・インターフェース | **パスカルケース** (PascalCase)      |

> \*1: コンポーネント直上のディレクトリ名は、コンポーネント名と同じにする。(例: `src/components/Grid/Grid.tsx` の場合、`src/components/Grid/` ディレクトリ名は `Grid` とする。)

> \*2: 一部例外として、ライブラリ特有のファイル（例: `index.ts`, `index.d.ts`）はそのままの記名とする。

## 単語の区切り記法

- **kebab-case**: `example-file.ts`, `my-tokens.json` のように単語をハイフンで繋ぐ。
- **camelCase**: `myFunction`, `myVariable` のように 2 つ目の単語の先頭を大文字にする。
- **PascalCase**: `MyComponent`, `MyClass` のように各単語の先頭を大文字にする。

---

## ディレクトリ命名規則

- **kebab-case**で命名し、ディレクトリ名がその役割を示すようにする。
- 例:
  - `src/assets/styles/`
  - `src/components/`
  - `scripts/`
  - `tokens/`

---

## ファイル命名規則

### React コンポーネント (.tsx)

- **PascalCase** + `.tsx`
- コンポーネント名とファイル名を揃える。
  - 例: `Grid.tsx`, `GanttFlow.tsx`
- ディレクトリパターン例:

  ```markdown
  src/
   └ components/
       └ Grid/
           ├─ Grid.tsx
           ├─ Grid.stories.tsx
           ├─ Grid.test.tsx
           └ index.ts
  ```

### Storybook ファイル (.stories.tsx)

- **コンポーネント名** + `.stories.tsx`
- 例: `Grid.stories.tsx`, `GanttFlow.stories.tsx`

### テストファイル (.test.tsx / .spec.tsx)

- **コンポーネント名** + `.spec.tsx`
- 例: `Grid.spec.tsx`, `GanttFlow.spec.tsx`

### スクリプトファイル (.ts/.js)

- **kebab-case**で命名し、**目的が分かりやすい名前**をつける。
- 例:
  - `generate-styles-from-tokens.ts`
  - `figma-token-fetch.ts`
  - `build-library.ts`
- `scripts/` ディレクトリなどにまとめて配置する。

### 設定ファイル (tsconfig.json など)

- 既定・慣例的な名称 (.gitignore, tsconfig.json, package.json 等) は**そのまま**使用する。
- ESLint, Prettier なども `.eslintrc.js`, `.prettierrc` のように標準を踏襲する。

---

## コードレベル（変数・関数・クラス等）の命名規則

### 変数

- **camelCase**を使用。
- 例: `const userName = 'Alice'`, `let isLoading = false`
- 定数（変更されない値）には `UPPER_CASE` + アンダースコア区切りを使う場合もあるが、TypeScript では一般的に `camelCase` のまま使用してもよい。
  - 例: `const MAX_RETRY_COUNT = 3`

### 関数

- **camelCase**を使用。
- 動詞 + 名詞の組み合わせなど、**処理内容**がわかる名前にする。
- 例: `fetchUserData()`, `handleButtonClick()`

### クラス / 型 / インターフェース

- **パスカルケース** (PascalCase)
- クラス: `class UserController {}`
- 型 / インターフェース: `interface User {}`, `type MyCustomType = {...}`

---

## コンポーネントの命名規則

### 方針

- ファイルの命名規則と同様、**PascalCase**を使用。
- 例: `Grid`, `GanttFlow`

---
