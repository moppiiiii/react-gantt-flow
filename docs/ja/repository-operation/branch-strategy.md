# ブランチ戦略

## 1. 概要

- GitHub Flow ベースのリリースブランチを使用して、サポートされているバージョンに修正を組み込む

### 1.1 ブランチの概要

```mermaid

%%{init: { 'theme': 'base' } }%%
gitGraph
    commit id: " "
    branch feature/1 order: 20
    commit
    switch main
    merge feature/1

    branch release/1.x order: 10
    commit tag: "v1.0.0"

    switch main
    branch feature/2 order: 21
    commit
    commit
    switch main
    merge feature/2

    branch release/2.x order: 11
    commit tag: "v2.0.0"

    branch fix/1 order: 30
    commit id: "fix"
    switch release/2.x
    merge fix/1

    switch release/1.x
    branch fix/2 order: 31
    cherry-pick id:"fix"
    switch release/1.x
    merge fix/2

    switch main
    branch fix/3 order: 32
    cherry-pick id:"fix"
    switch main
    merge fix/3

```

### 1.2 ブランチの種類

| Branch Type | Role | Lifecycle | Naming Rule |
| ----------- | ---- | --------- | ------------ |
| **メインブランチ** | | | |
| main        | 次のメジャーバージョンアップのためのブランチ。<br/> Git Flow の develop ブランチに似ている。 | 常に存在 | `main` |
| release     | 各メジャーバージョンのメンテナンスブランチ | メジャーバージョンアップ時に作成 | `release-{major_version}.x.x` |
| feature     | 機能実装ブランチ | 基本的に main ブランチから派生し、main にマージされる。<br/> バック互換性のある変更の場合は、リリースブランチから派生し、リリース（マイナーバージョンアップ）にマージできる。 | `feature/{feature_name}` |
| fix         | バグ修正ブランチ | バグがある最新バージョンのリリースまたは main ブランチから派生し、リリースまたは main ブランチにマージされる。<br/> 他のバージョンにチェリーピックしてマージする。 | `fix/{summary}` |
| **あまり使用されないブランチ** | | | |
| renovate    | renovate によって生成されたブランチ | renovate によって自動生成される | `renovate/{branch_name}` |
| chore         | ツールの実装や設定の変更などのその他のブランチ | feature ブランチと同じ | `chore/{summary}` |
| refactor         | リファクタリングブランチ | feature ブランチと同じ。<br/> 必要に応じてリリースブランチでチェリーピックする。 | `refactor/{summary}` |
| docs         | ドキュメント更新および作成ブランチ | feature ブランチと同じ | `docs/{summary}` |
| **その他** | | | |
| backport         | サポートされている下位バージョンに反映するブランチ | サポートされている下位バージョンに反映する内容がある場合に作成される。 | `backport/{version}/{summary}` |
