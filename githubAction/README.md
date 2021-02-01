
# github action

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