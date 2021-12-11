
# advance git

**前提**

- mac
- gitが扱える、理解している
- vimが少しできる

## worktree

1. 任意のリポジトリの中にcdで移動してください

もし、適当なものがない場合こちらをcloneしてみてください

[node-morikenjuku](https://github.com/kenmori/node-morikenjuku)

クローン
`git clone git@github.com:kenmori/node-morikenjuku.git`

移動
`cd node-morikenjuku`

ブランチを切る
`git checkout -b feature/a`

`README.md`を適当に編集

### `git worktree`を使うときってどんな時？

この時、
同僚に今すぐみてほしいバグがあると伝えられました

ブランチは作業中です

どうしますか？

- `commit`する?
-> まだやりかけでコミットしたくない。 `wip`でしちゃうのもアリだけれど、そのようなコミットは後でまとめたい

- `stash`する?
-> 後々どのスタッシュか覚えていなくてはいけない。listが溜まる

このユースケースだけならどちらかにすればいいとおもうのですが

依存パッケージを修正して、`node_modules`などに更新があるブランチで作業していた場合

切り替えるとまたモジュールをinstallし直して大変です

どうにか今のカレントブランチの状態を保ちつつブランチを切り替えて作業をしたい

このような場合 `git worktree`が有効です

続きをやっていきます

構文はこうです

`git worktree add <作業ツリーのパス> <ブランチname>`

実際には

`git worktree add ./worktree/dev master`

上記は`./worktree/dev`というフォルダ階層とその中にmasterブランチを作っています

実際に叩いてみます

```console
❯ git worktree add ./worktree/dev master
Preparing worktree (checking out 'master')
HEAD is now at 420e475 Merge pull request #60 from haru-programming/feature/takeda_task01
```

mainのブランチの状態ををworktree上に作りました

`ls`
で作られたことを確認してください

`git worktree add <既にあるブランチ名>`

でも作れます

こうすると`worktree`のフォルダを既にあるブランチ名で作ってくれます

`cd`で

`git worktree`を作った場所で(`worktree/dev`)

ブランチを切って、編集、コミット、pushしてみてください

git push --set-upstream origin <yourbranchname>

その後
元いた場所に戻り、stashをする必要がなかったことを確認してください

`git status`

同じまま

### hotfixの場合は?

`git worktree add worktree/hotfix -b hotfix1`

```console
Preparing worktree (new branch 'hotfix1')
HEAD is now at 420e475 Merge pull request #60 from haru-programming/feature/takeda_task01
```

どのようにディレクトリを作るかはあなたのgit戦略にお任せします

### その他のユースケース

- 今リモートに上がっているブランチを一時的に参照して、比べてみたりできる。コピペとかできる

- 特定のworktreeを削除
`git worktree remove hotfix`

- ワークツリーの削除
`git worktree prune`

システムから削除され管理する必要がなくなる

- ワークツリーリスト

`git worktree list`


`.gitignore`で設定しておきましょう

```console
worktree/*
```

worktree配下の全てのものを無視します

以上でworktreeは終わりです。

コンフリクトやどこに行ったか分からなくなったり、

ステージングのものもworkingから始まってしまったり、
未追跡ファイルもaddしなくてはならないstashや

不要なコミットを作りたくない場合便利です

## squash

squashはコミットを一つにまとめたいときに便利です。実務の場合一つにまとめることを強制する場所もあります

例えば`wip`など適当なコミットをどんどん積んで行って、

最終的にそれらをまとめて履歴をきれいにしたりします

マージの際にまとめるということもする場合がありますが、github上で緑のmergeボタンのプルダウンを押下してsquashマージできたりします

注意は

**リモートブランチにpushされていて且つshareされたブランチに対してやらないこと**

です。コミット履歴が変わるのでそのブランチを既に誰かが使っていた場合混乱が起きます。
`rebase`の類は誰かがそのブランチを使っていない、変更コミットを積まれていないことを確認しましょう

今回は手動でできるようになるためのハンズオンです

[元記事](https://kenjimorita.jp/git-git-rebase-i-squash/)


1. 任意のブランチでファイルを変更していきます

`README.md`の任意なところに

`1`

という文字列を追加する

`git add .`

`git commit -m "fix: as 1"`

同じことを

`2`としてやる

`git add .`

`git commit -m "fix: as 2"`


同じことを

`3`

としてやる

`git add .`

`git commit -m "fix: as 3"`

同じことを

`4`
としてやる

`git add .`

`git commit -m "fix: as 4"`

確認する

`git log --oneline`

```console
9a1ef59 (HEAD -> feature/b) fix: as 4
0eb9954 fix: as 3
85e7818 fix: as 2
89951d6 fix: as 1
656ca3b fix: hogehoge
```

こうなっているかと思います

`git checkout -b feature/b-2`
後々のためにチェックアウトしておく

2. 次にベースコミットを決めます。

親のコミットに移動する必要があります

移動は以下2つの方法などがあります

`git rebase -i HEAD~3`

or

`git rebase -i 656ca3bc009871d33397d68899bd5228361f6c5e`

git log --onlineで出た、
**変更を含めたいコミットの親**
のコミットです
上記の場合
`656ca3b fix: hogehoge`のコミットです。

今回はコミットハッシュ値の方でやります

```console
  1 pick 67fa7e4 fix: as 123
  2 s 7181a42 fix: as 2↲
  3 s af1e5c9 fix: as 3↲
  4 ↲
  5 # Rebase 656ca3b..af1e5c9 onto 656ca3b (3 commands)↲
  6 #↲
```

このようなエディタが立ち上がります

squashしたいコミットを上記のように`pick`を `s`で書き換えていきます(`squash`でも良いです)
`s`のコミットが上の`pick`のコミットと一緒になるイメージです

`:wq!`

で編集を終了します

このとき
`error: There was a problem with the editor 'vi'.`
と出る場合
gitのデフォルトエディタviを呼び出す時macはvimを使おうとするので

`git config --global core.editor /usr/bin/vim`

`ls /usr/bin/`に`vim`があることを確認して

で設定してみてください

さらにenter押すと

次は実際のコミットメッセージを入力するところに移動します

```console
  1 fix: as combine
  2 # This is a combination of 4 commits.↲
  3 # This is the 1st commit message:↲
  4
  5 fix: as 1
  6
  7 # This is the commit message #2:↲
  8
  9 fix: as 2
 10
 11 # This is the commit message #3:↲
 12
 13 fix: as 3
 14
 15 # This is the commit message #4:↲
 16
 17 fix: as 4↲
 18
```

上記のように一番上にそれらをまとめたコミットメッセージを書いてください
上の場合ですと
`fix: as combine`です

編集を終えます
`:wq!`


`git log --oneline`で確認

```console
773e79d (HEAD -> feature/b-2) fix: as combine
815f106 fix: 123
52d7113 fix: add space
```

まとまりました

### 特定の過去のコミットメッセージを変更したい場合は?

最新のだったら
`git commit --amend`

```console
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

```console
  1 pick 656ca3b fix: space↲
  2 pick 1a19295 fix: 123↲
  3 ↲
  4 # Rebase 420e475..1a19295 onto 420e475 (2 commands)↲
  5 #↲
```

ここではコミットメッセージは変更しない。gitにどんなアクションをしたいかを伝える

```console
  1 reword 656ca3b fix: space↲
  2 pick 1a19295 fix: 123↲
  3 ↲
```

  閉じる

  そうするともう一度エディタが立ち上がる
ここでコミットメッセージを変える

 ```console
 1 fix: add space↲
 ```

 git log --oneline

 ```console
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

## `git reflog`

`git reflog`はgit操作の履歴一覧が見れます
これは何かgit操作でしでかした場合や、戻りたい場合便利です

`git reflog`を叩いてみましょう

自分はこのようになりました

```console
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
の状態まで戻りたい場合

コミットハッシュをブランチ名に続けて打ちます
例えば

`git branch feature/modoritai 0eb9954`
このように

`git branch`
で確認してみて下さい。作られたと思います。

`git checkout feature/modoritai`
でそのブランチを確認しましょう

`git log`

```console
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

戻れているかと思います

このようにある時点の操作に戻りたい場合
そのブランチを作って戻る方法もあります

他にcommitにチェックアウトして戻ることもできます
その場合`detatch状態`(ブランチが宙に浮いているイメージ)になりますのでその状態で新しいブランチを切ってデタッチ状態を解消しなくてはならないです。その方法もやってみてくださいね


ここまでがアドバンスgitです
使い倒して快適に開発を進めていきましょう


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
