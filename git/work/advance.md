
# advance git

**前提**

- mac
- gitが扱える、理解している
- vimが少しできる

## worktree

## squash

[元記事](https://kenjimorita.jp/git-git-rebase-i-squash/)


### worktree


## ハンズオン

任意のリポジトリの中で作業してみる

[node-morikenjuku](https://github.com/kenmori/node-morikenjuku)

この時mainブランチに変更がありました

`git clone git@github.com:kenmori/node-morikenjuku.git`

`git checkout -b feature/a`

でブランチを切って

`README.md`を編集した状態にします


この時、
同僚に今すぐみてほしいバグがあると伝えられました
ブランチは作業中です
どうしますか

- commitする?
 -> まだやりかけでコミットしたくない
- stashする?
　-> 後々どのスタッシュか覚えていなくてはいけない

これだけならどちらかにすればいいとおもうのですが
依存パッケージを修正して、node_modulesなどに更新があるブランチで作業していた場合
切り替えるとまたモジュールをinstallし直して大変です

この状態を保ちつつブランチを切り替えて作業をしたい、
この場合 `git worktree`が有効です

`git worktree add 作業ツリーのパス ブランチname`


`git worktree add ./worktree/dev master`

```
❯ git worktree add ./worktree/dev master
Preparing worktree (checking out 'master')
HEAD is now at 420e475 Merge pull request #60 from haru-programming/feature/takeda_task01
```

- mainのブランチの状態ををworktree上に作る

git worktree add <既にあるブランチ名>

で、worktreeのフォルダを既にあるブランチ名で作ってくれる

git worktreeがある今作った場所で
ブランチを切って、pushしてみてください

その後
元いた場所に戻り、stashをする必要がなかったことを確認してください

git status

同じまま

## hotfix

`git worktree add worktree/hotfix -b hotfix1`

Preparing worktree (new branch 'hotfix1')
HEAD is now at 420e475 Merge pull request #60 from haru-programming/feature/takeda_task01


#### その他usecase

- 今リモートに上がっているブランチを一時的に参照して、比べてみたりできる。コピペとか

`git worktree remove hotfix`


ワークツリーの削除
`git worktree prune`

システムから削除され管理する必要がなくなる


ワークツリーリスト

`git worktree list`


gitignoreで設定しておきましょう

```
worktree/*
```

### interactive rebase

リモートブランチにpushされていて且つshareされたブランチに対してやらないこと

#### ハンズオン
何かファイルを変更する

README.mdの任意なところに
`1`
という文字列を追加する

git add .
git commit -m "fix: as 1"
同じことを
`2`
としてやる
git add .
git commit -m "fix: as 2"
同じことを
`3`
としてやる
git add .
git commit -m "fix: as 3"
同じことを
`4`
としてやる
git add .
git commit -m "fix: as 4"

git log --oneline

```
9a1ef59 (HEAD -> feature/b) fix: as 4
0eb9954 fix: as 3
85e7818 fix: as 2
89951d6 fix: as 1
```
こうなっているはず

`git checkout -b feature/b-2`
後々のためにチェックアウトしておく

ベースコミットを決める。親のコミットに移動する必要がある

`git rebase -i HEAD~3`
or
`git rebase -i 656ca3bc009871d33397d68899bd5228361f6c5e`

Rebase 656ca3b..af1e5c9 onto 656ca3b (3 commands)↲


```sh
 1 pick 67fa7e4 fix: as 123↲                                                             
  2 s 7181a42 fix: as 2↲
  3 s af1e5c9 fix: as 3↲
  4 ↲
  5 # Rebase 656ca3b..af1e5c9 onto 656ca3b (3 commands)↲
  6 #↲

`:wq!`

で

`error: There was a problem with the editor 'vi'.`
と出る場合
gitのデフォルトエディタviを呼び出す時macはvimを使おうとする
`git config --global core.editor /usr/bin/vim`

enter押すと

```
  1 fix: as combine↲                                                                          
  2 # This is a combination of 4 commits.↲
  3 # This is the 1st commit message:↲
  4 ↲
  5 fix: as 1↲
  6 ↲
  7 # This is the commit message #2:↲
  8 ↲
  9 fix: as 2↲
 10 ↲
 11 # This is the commit message #3:↲
 12 ↲
 13 fix: as 3↲
 14 ↲
 15 # This is the commit message #4:↲
 16 ↲
 17 fix: as 4↲
 18 ↲
```

`:wq!`

```
773e79d (HEAD -> feature/b-2) fix: as combine
815f106 fix: 123
52d7113 fix: add space
```

まとまりました

`git checkout -`


### 特定の過去のコミットメッセージを変更する

最新のだったら
`git commit --amend`

```
commit 1a1929510ea46e8d2df36a417b9c2e9894bbb2c3 (HEAD -> feature/b)
Author: 森田賢二 <kenjimorita@moritakenjinoMacBook-Pro.local>
Date:   Sat Dec 11 14:16:05 2021 +0900

    fix: 123

    fix: as 2

    fix: as 3

commit 656ca3bc009871d33397d68899bd5228361f6c5e
Author: 森田賢二 <kenjimorita@moritakenjinoMacBook-Pro.local>
Date:   Sat Dec 11 11:23:14 2021 +0900

    fix: space
```

`git rebase HEAD~2`

```
  1 pick 656ca3b fix: space↲
  2 pick 1a19295 fix: 123↲
  3 ↲
  4 # Rebase 420e475..1a19295 onto 420e475 (2 commands)↲
  5 #↲
```

ここではコミットメッセージは変更しない。gitにどんなアクションをしたいかを伝える

```
  1 reword 656ca3b fix: space↲
  2 pick 1a19295 fix: 123↲
  3 ↲
  ```


  閉じる

  そうするともう一度エディタが立ち上がる
ここでコミットメッセージを変える

 ```
 1 fix: add space↲
 ```

 git log --oneline

 ```
 commit 815f106aef3999ca6548e7c8fa9cb20693e4773c (HEAD -> feature/b)
Author: 森田賢二 <kenjimorita@moritakenjinoMacBook-Pro.local>
Date:   Sat Dec 11 14:16:05 2021 +0900

    fix: 123

    fix: as 2

    fix: as 3 // 最新

commit 52d71137897c386a1fd1c6f79364d6055a6c09c1
Author: 森田賢二 <kenjimorita@moritakenjinoMacBook-Pro.local>
Date:   Sat Dec 11 11:23:14 2021 +0900

    fix: add space
```

変更されています

### 操作を間違ってしまいました。以前の状態に戻りたい

git reset HEAD --hard
などの方法もあるが


`git reflog`を使う方法



```
773e79d (HEAD -> feature/b-2) HEAD@{0}: checkout: moving from feature/b to feature/b-2
9a1ef59 (feature/b) HEAD@{1}: checkout: moving from feature/b-2 to feature/b
773e79d (HEAD -> feature/b-2) HEAD@{2}: rebase (finish): returning to refs/heads/feature/b-2
773e79d (HEAD -> feature/b-2) HEAD@{3}: rebase (squash): fix: as combine
38d850b HEAD@{4}: rebase (squash): # This is a combination of 3 commits.
b76a65d HEAD@{5}: rebase (squash): # This is a combination of 2 commits.
89951d6 HEAD@{6}: rebase (start): checkout 815f106
9a1ef59 (feature/b) HEAD@{7}: rebase (abort): updating HEAD
815f106 HEAD@{8}: rebase (start): checkout 815f106
9a1ef59 (feature/b) HEAD@{9}: rebase (finish): returning to refs/heads/feature/b-2
9a1ef59 (feature/b) HEAD@{10}: rebase (start): checkout 89951d6
9a1ef59 (feature/b) HEAD@{11}: checkout: moving from feature/b to feature/b-2
9a1ef59 (feature/b) HEAD@{12}: commit: fix: as 4
0eb9954 HEAD@{13}: commit: fix: as 3
```

例えばこれで、
`0eb9954 HEAD@{13}: commit: fix: as 3`
の状態まで戻りたい


git branch feature/modoritai 0eb9954

git branch

git checkout feature/modoritai

git log
```
commit af1e5c9a5d0b82ecc52b40c078851b964508510d (HEAD -> feature/modoritai, modoritai)
Author: 森田賢二 <kenjimorita@moritakenjinoMacBook-Pro.local>
Date:   Sat Dec 11 14:16:30 2021 +0900

    fix: as 3

commit 7181a42747668d2a78c9230e42c88678b947968c
Author: 森田賢二 <kenjimorita@moritakenjinoMacBook-Pro.local>
Date:   Sat Dec 11 14:16:21 2021 +0900

    fix: as 2

commit 67fa7e4823e7360518833cc05da9d2ef0cd92d6d
Author: 森田賢二 <kenjimorita@moritakenjinoMacBook-Pro.local>
Date:   Sat Dec 11 14:16:05 2021 +0900

    fix: as 1
```

戻れている


---
WIP


### submodules

`git submodule add <githuburl>`

- リポジトリがネストされた状態のこと
- サブモジュールの実際のコンテンツはメインプロジェクト(親リポジトリ)に保存されない。親リポジトリの一部ではない
- `cat .gitmodules`で見れる
- submoduleはブランチではなく特定のコミットにcheckoutする


既にsubmodulesを採用しているリポジトリを見る
`git clone https://github.com/apache/airflow.git`

.github直下に空のフォルダだけがある。submodulesの構成だけを表している状態
これを
`git submodule update --init --recursive`

### search

1. by day: --before, --after
2. by message: --grep
3. by author: --author
4. by file: -- <filename>
5. by branch: -- branch



