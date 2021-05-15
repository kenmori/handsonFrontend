
# Github Actions

[doc](https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions)


- Workflow
  githubのリポジトリ内に定義するもの
  - イベントによってトリガーされるアクションを定義する
- Job
  - workflow内に定義されるもの
  - 順番をstepに書く
- Step
  - Job内に定義されるもの
- Action
  - Step内に定義するもの


- 複数のJobは並列で実行可能

## イベント

[Events that trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)



### 1.

リポジトリに
`.github/workflows/`
を作成する

### 2.

その中に`learn-github-actions.yml`を作成

### 3.

```yml
name: learn-github-actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
      - run: npm install -g bats
      - run: bats -v
```


