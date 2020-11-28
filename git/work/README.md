
# git初心者が手を動かして覚えるgitハンズオン

前提

## 対象

- `mac`の方
- unixがある程度操作できる人
- `brew install git`している方
- `git help`でなんか出てくること


※以下今今じゃなくていいけど後々問題になる物
- `git config --global user.name "GitHubのユーザ名"`
-  `git config --global user.email <GitHubに登録したメルアド>`
でgithubと紐づけてあること
- [githubのSSHキー登録](https://qiita.com/shizuma/items/2b2f873a0034839e47ce)
[【解決方法(画像付き)】急に。git pushしたら「Please make sure you have the correct access rights and the repository exists.」](https://kenjimorita.jp/please-make-sure-you-have-the-correct-access-rights-and-the-repository-exists/)


## 1.ハンズオンのスタート

github登録して`new Repogitory`からリポジトリ`test`を作りましょう

<img src="https://terracetech.jp/wp-content/uploads/2020/11/0.png" width="400">


<img src="https://terracetech.jp/wp-content/uploads/2020/11/0-1.png" width="400">

## 2. ターミナルを開く


ターミナルは
Macの場合
アプリケーション -> ユーティリティ -> ターミナルを押下
すると立ち上がります。
しておいてください

`cd ~/Desktop`

でフォルダをダウンロードしたいところに移動します

移動できたかどうかは`pwd`で確認できます

`pwd`

で~/Desktopという文字が表示されていることを確認したら以下をEnterします

`git clone https://github.com/kenmori/test.git`

`https:`であることに注意してください。(git@~~)ではなく

そこまで行ったら

そのごここの部分をコピペ

<img src="https://terracetech.jp/wp-content/uploads/2020/11/1.png" width="400">


<img src="https://terracetech.jp/wp-content/uploads/2020/11/2.png" width="400">


## 3. リポジトリ内に移動する

`pwd`でデスクトップにいることを確認したら

`cd test`

リポジトリ内に移動します



## 4. `open .` で確認(飛ばしてもいいです)

openはFinderを立ち上げてくれます。
覚えておくとよいです。
test直下に`.git`があることを確認
ない場合リポジトリが作られていません。

## 5. コマンドでVSCode立ち上げてみよう(飛ばしてもいいです)

VSCode内で

`Command + Shift + P`でコマンドパレット開く。

`Shell`と入力して検索

`インストール`

その後ターミナル上で

`code .`

はVSCodeを立ち上げてくれます

## 6. testディレクトリの中でindex.htmlを作る

test(.gitがあるところ)の中でindex.htmlを作ります。

ファイルを作るだけで内容は空で良いです。

まずコマンド実行されるカレントディレクトリを確認しましょう

`pwd`

`~/Desktop/test`が出てくると思います。出てこない場合(`cd ~/Desktop/test`で移動移動してください)


今gitはどのような状態でしょうか?

## 7. `git status`

`git status`は`.git`があるディレクトリ以下のファイルが変更がどのような状態かを示してくれます

`Untraced files`と書かれていて
今新規で作ったindex.htmlファイルが示されています。

<img src="https://terracetech.jp/wp-content/uploads/2020/11/6.png" width="400">

この`Untraced files`はgit上で管理されていない(`commit`されていない)ファイルのことです

これをインデックスさせます。インデックスとは履歴に残すかどうかを判定する場所だと思ってください

## 8. `git add .`

それをするには`git add .`を叩きます

<img src="https://terracetech.jp/wp-content/uploads/2020/11/7.png" width="400">

`git stqtus`

`new`とされました。Gitが初めて知ったファイル(新規で作られたファイル)です。

これでよければ履歴に残してバージョン管理します。

## 9. `git commit`

`git commit`を実行するとエディタが立ち上がります

<img src="https://terracetech.jp/wp-content/uploads/2020/11/8.png" width="400">


```
エディタが立ち上がらない人は
git commit -m "test"をして11へ
```

立ち上がった人は

ここのtitleに何を変更したかを簡潔に書く
bodyには詳しく書く

```
// 1行目にタイトルを書く

// 3行目にbody本文を書く
# Please enter the commit message for your changes. Lines starting↲
# with '#' will be ignored, and an empty message aborts the commit.↲
#↲
# On branch master↲
#↲
# Initial commit↲
#↲
# Changes to be committed:↲
#»------new file:   index.html↲
 ```

## 10. 例えば

<img src="https://terracetech.jp/wp-content/uploads/2020/11/9.png" width="400">

このように
viが立ち上がっているなら
`esc`キーを押した後
`:`を押して
`wq!`
タイプしてエディタを閉じます
`vi`が何をしているかは別途検索してください

ターミナルはコミットが実行されたことを示しています


<img src="https://terracetech.jp/wp-content/uploads/2020/11/10.png" width="400">


ではgitコマンドでどのようになったか確認しましょう

## 11. git log

gitlogはコミットしたものを示しています。

<img src="https://terracetech.jp/wp-content/uploads/2020/11/11.png" width="400">

こちらをリモートmasterブランチに反映させましょう。

## 12. git push origin head

<img src="https://terracetech.jp/wp-content/uploads/2020/11/12.png" width="400">


pushされました

<img src="https://terracetech.jp/wp-content/uploads/2020/11/13.png" width="400">

そこに書かれている
`https://github.com/kenmori/test.git`

## 13. リンクを訪れる

するとgithubに遷移します

<img src="https://terracetech.jp/wp-content/uploads/2020/11/13_2.png" width="400">

今やったコミットを見てみましょう

<img src="https://terracetech.jp/wp-content/uploads/2020/11/13_3.png" width="400">

titleとbodyが書かれている


## 14. `git reflog`

<img src="https://terracetech.jp/wp-content/uploads/2020/11/14.png" width="400">

自分が打ったコマンドがわかる

もどるときは`q`

いまローカルリポジトリの変更はどのような状態でしょうか
## 15. `git status`

commit後このブランチに変更がないので`working tree clean`が出る

```
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

<img src="https://terracetech.jp/wp-content/uploads/2020/11/15.png" width="400">

では新たにmasterから派生したブランチを切りましょう。どうすればいいでしょうか

## 16. `git checkout -b feature/a`

<img src="https://terracetech.jp/wp-content/uploads/2020/11/16.png" width="400">

masterブランチから派生された`feature/a`ブランチが作られ、そこに移動した

確認してみます

## 17. `git branch` で自分のいるブランチを確認する

<img src="https://terracetech.jp/wp-content/uploads/2020/11/17.png" width="400">

米印がついているところが自分がいるブランチ

```
* feature/a
  master
```

※`git rev-parse --abbrev-ref @`や`git branch --contains HEAD`でもできます。違いは後者は今いるコミットを含むブランチです。なのでここのブランチだけではない可能性があります

では移動してみましょう
`q`を押下してターミナルに戻る

ブランチ間を移動するには？
## 18. `git checkout master`

<img src="https://terracetech.jp/wp-content/uploads/2020/11/18.png" width="400">

移動しました。

`git branch`で現在地を確認

```
  feature/a
* master
```

米印が移動してmasterにいることを確認。
では戻りましょう
`q`を押下してターミナルに戻る

`git checkout feature/a`

移動する時は`git checkout`、新たにブランチを切って、移動したい`git checkout -b [作りたいブランチ名]`
です

## 19. `ファイルに変更を加える`

 こちらをコピペしてindex.html内を変更してください

```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Document</title>
</head>
<body>
</body>
</html>
```

現在のファイルの差分を見るには？

## 20. `git diff`

<img src="https://terracetech.jp/wp-content/uploads/2020/11/19.png" width="400">
現在の差分を見る

`\ No newline at end of file`があったら最後の行に一行追加しましょう

では状態を確認しましょう
## 20. `git status`

`modified`となっていることに注意してください。

既にgit管理されている(commit済みのファイル)が変更された場合の表示(先ほどはnewでしたね)


<img src="https://terracetech.jp/wp-content/uploads/2020/11/21-2.png" width="400">


こちらの変更をインデックスしましょう

## 21. `git add .`

`git add .` したら

その後 `git status`で確認してみてください。

indexされました。staging


<img src="https://terracetech.jp/wp-content/uploads/2020/11/21-2.png" width="400">


その後commitで履歴としたいのですが、
今度は
git commitではなくcommitのtitleだけ書いてコミットしましょう

どうすればいいでしょうか
## 22. `git commit -m "fix: added htm"`

<img src="https://terracetech.jp/wp-content/uploads/2020/11/22.png" width="400">

```
[feature/a b8eb4b0] fix: added html
 1 file changed, 11 insertions(+)
 ```

では自分が叩いたgitコマンドのlogを確認しましょう
## 23. `git log`

このような形になっていると思います

<img src="https://terracetech.jp/wp-content/uploads/2020/11/23-2.png" width="400">


ここであなたはコミットメッセージを間違えてしまったことに気付いたり

何かファイルに変更を加えるのを忘れてしまいました

どうすればいいでしょうか？


## 23. `git reset --soft HEAD^`

を実行してください

どうなっているでしょうか？

`git status`で確認

1つ前のコミットがなくなり、

stagingされた状態に戻っています


<img src="https://terracetech.jp/wp-content/uploads/2020/11/24-2.png" width="400">

試しに

`git log`で確認してみましょう

<img src="https://terracetech.jp/wp-content/uploads/2020/11/25.png" width="400">

戻っていることが確認できました

`git reflog`で自分が打ったコマンドを確認しましょう

<img src="https://terracetech.jp/wp-content/uploads/2020/11/26.png" width="400">

## 24. `正しいhtml or コミットメッセージにする`

エディタを立ちあげましょう

`vim index.html`

or

普通に`code .`

で。


```html
<body>
 <main>a</main>↲
</body>↲
```

このように編集しなおす


現在ファイル全体ではこのような状態

<img src="https://terracetech.jp/wp-content/uploads/2020/11/27.png" width="400">

git status で確認しましょう

これはどういうことでしょうか？

```
moritakjinoMBP2 :: ~/git/test » git status
On branch feature/a
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   index.html

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html
```

softでindex上に戻したファイルの変更と

今mainの中を変えた変更がworking treeの中にあります

差分はなんでしょうか？

## 25. `git diff`

まだaddしていないインデックスとワーキングツリーの差分がみたい時は

`git diff`

使います。叩いてください

```
diff --git a/index.html b/index.html
index 68dc795..029c65a 100644
--- a/index.html
+++ b/index.html
@@ -6,6 +6,6 @@
   <title>Document</title>
 </head>
 <body>
-
+  <main>a</main>
 </body>
 </html>
 ```
このようになったと思います

`+` が今回追加された行。

`-`が今回削除された行です

`git status` してみてください

```
moritakjinoMBP2 :: ~/git/test » git status
On branch feature/a
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   index.html

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html
```

<img src="https://terracetech.jp/wp-content/uploads/2020/11/29.png" width="400">

確認したら
`git add -u` してワーキングツリーとインデックスの差分をなくしましょう


## 26 `git add -u`

変更された全ての差分をインデックスに上げる `-u`オプション

この変更されたというのは
`git status`で`modified`になっているものです。(もし`new`がある場合インデックスには上がりません。それも含める場合`git add --all`を使います)

叩いたら
`git status`で確認しましょう

```
moritakjinoMBP2 :: ~/git/test » git status
On branch feature/a
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   index.html
```

<img src="https://terracetech.jp/wp-content/uploads/2020/11/30.png" width="400">

インデックス上に上がりました

`git diff`を叩いてくださいdiffは当然ありません。何も表示されていないはずです。

<img src="https://terracetech.jp/wp-content/uploads/2020/11/31.png" width="400">
なぜならインデックスとワーキングツリーの差分は今インデックス上に取り込んだからです。

`q`でターミナルに戻る

では次のコミットと一つ前のコミットの差分を見る場合は
どうしたらいいでしょうか

## 27. `git diff --cached`

実際叩いてみましょう


```
diff --git a/index.html b/index.html
index e69de29..029c65a 100644
--- a/index.html
+++ b/index.html
@@ -0,0 +1,11 @@
+<!DOCTYPE html>
+<html lang='en'>
+<head>
+  <meta charset='UTF-8'>
+  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
+  <title>Document</title>
+</head>
+<body>
+  <main>a</main>
+</body>
+</html>
```

<img src="https://terracetech.jp/wp-content/uploads/2020/11/32.png" width="400">

これで何が取り込まれるかわかりますね

それではコミットしましょう

`git commit -m "fix: addd html"`と打ってください(`addd`になっているのはわざとです)

ちょっとまって

commitを実行する前に...

<img src="https://terracetech.jp/wp-content/uploads/2020/11/33.png" width="400">

ちなみにカーソルが後ろの状態で

- `ctr`を押したまま`a`押してください

一番先頭に戻ります

- `ctr`を押したまま`e`押してください

一番最後尾に移動します

- `ctr`を押したまま`f`押してください

一文字づつ進みます

- `ctr`を押したまま`b`押してください

一文字づつ戻ります

- `ctr`を押したまま`w`押してください

一単語分削除します

- `ctr`を押したまま`u`押してください

全部消します

- `ctr`を押したまま`p`たくさん押してください

今まで打ったコマンドの履歴がでます。そのまま打てます

- `ctr`を押したまま`r`押してください

コマンド検索してくれて、gitまで打つと補完が効いてコマンドをレコメンド
してくれます。選ばれたら`Enter`

こういうのも知っておくと良いですね

画面がみづらくなったので`ctr`押しながら`l`を押してください。すっきりします。

脱線しました。

では
`git commit -m "fix: addd html"`と打ってください(`addd`になっているのはわざとです)

を実行しましょう

あなたはコミットメッセージだけ直したいと思います(`addd`)

先ほど`git reset --soft HEAD^`はコミットしたファイルをインデックスまで戻しました

今回はそれをせず、コミットメッセージだけ変えたいのです。

`git log --oneline`で一行単位でlogを見てみましょう。`git logとの違いに注意`。ハッシュを短縮して、一行で表示します

```
39eec13 (HEAD -> feature/a) fix: addd html
beab421 (origin/master, master) feat: create index.html
```

`fix: addd html`を修正したいです。

## 28 `git commit --amend -m "fix: add html"`

こちらを叩くとそれが可能です。

commit bodyも修正したいなら`git commit --amend`です。エディタが立ち上がるので編集して`qw!`で終えます。

```
moritakjinoMBP2 :: ~/git/test » git commit --amend -m "fix: add html"
[feature/a 30e9829] fix: add html
 Date: Sat Nov 21 20:18:20 2020 +0900
 1 file changed, 11 insertions(+)
 ```
<img src="https://terracetech.jp/wp-content/uploads/2020/11/36.png" width="400">

`git log --oneline`で直っているのを確認しましょう

```
30e9829 (HEAD -> feature/a) fix: add html
beab421 (origin/master, master) feat: create index.html
```

ok

これをリモートブランチに反映させましょう。この変更を他の開発者と共有するために。

## 29. `git push origin head`

`origin`はリモートブランチのアドレスです。
`head`はブランチのHEADの位置(多くの場合ブランチの先頭コミットを指しています)

`git push origin head`はカレントブランチ(現在チェックアウトしているブランチ)を同じ名前のリモートブランチに反映させるコマンドです。リモートにそのブランチがなければ作られます

実行してください

```
moritakjinoMBP2 :: ~/git/test » git push origin head
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 12 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 401 bytes | 401.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'feature/a' on GitHub by visiting:
remote:      https://github.com/kenmori/test/pull/new/feature/a
remte:
To https://github.com/kenmori/test.git
 * [new branch]      head -> feature/a
 ```

<img src="https://terracetech.jp/wp-content/uploads/2020/11/37.png" width="400">


`* [new branch]      head -> feature/a`
をみてください

 `[new branch]`としてリモートにブランチが作られました。ローカルの`head`をリモートブランチ`feature/a`として

`remote: Create a pull request for 'feature/a' on GitHub by visiting:`
とあります。
多くの場合`push`した後プルリクエストを出します。
そこのリンクを押すとgithub上のそこに飛びます

<img src="https://terracetech.jp/wp-content/uploads/2020/11/38.png" width="400">

押してみてください

するとここに移動します。

<img src="https://terracetech.jp/wp-content/uploads/2020/11/39.png" width="400">

こちらの通り、デフォルトではmasterに対して今pushしたブランチがmergeされようとしています。

masterと該当ブランチのコミット履歴が比較され、mergeするべきか差分を検証します

では`プルリクエスト(以下PR)`を出してみましょう

<img src="https://terracetech.jp/wp-content/uploads/2020/11/41.png" width="400">

のところを押下


するとこうなりました。

画像赤い矢印のところはコミット番号(変更の履歴を識別する番号)です

<img src="https://terracetech.jp/wp-content/uploads/2020/11/42.png" width="400">


押してみてください

<img src="https://terracetech.jp/wp-content/uploads/2020/11/43.png" width="400">

このコミットでのファル変更の差分がわかります。これは当然targetブランチであるmasterが持っている同じファイルとの比較です


ではこの変更がなぜこうなったかをコードレビュする人に対してメッセージをのこしておきましょう

動画のように説明したい行の左をクリックするとエディタが現れます

<img src="https://terracetech.jp/wp-content/uploads/2020/11/43.gif" width="400">

説明に「mainを作る必要があった」と書き「add comment」を押下してみましょう

ブラウザバックでPRページに戻ってみてください

<img src="https://terracetech.jp/wp-content/uploads/2020/11/44.png" width="400">

コメントとして表示されています。

これに対してレビューは
なるほどそういうことがあったのか
や、そこに対して疑問があれば、質問したりコミニュケーションをとります。


またこちらも変更しておきます

<img src="https://terracetech.jp/wp-content/uploads/2020/11/46.png" width="400">

変更箇所を確認して問題なさそうなら取り込みますが、

取り込まれたら今ブランチがどうなっているか確認しましょう

## 30. git log --graph

<img src="https://terracetech.jp/wp-content/uploads/2020/11/45.png" width="400">

ブラフを見ると①のところが②のmasterよりも進んでいることがわかります。

1つ分の変更コミット(リビジョン)があるかです

これをmasterが取り込んだらどうなるでしょうか

masterはそのコミットを取り込み。同じ位置になるはずです。つまり変更の差分がなくなるということです。

ではGitHub上でPRを取り込みましょう

## 31. github上でPRを取り込む

押す

<img src="https://terracetech.jp/wp-content/uploads/2020/11/47.png" width="400">

マージはマージコミットというコミットを一つ追加します。

これはマージコミットの名前を変更できるものです。

個人開発の場合は特に問題なければそのままcomfirm mergeを押す

<img src="https://terracetech.jp/wp-content/uploads/2020/11/48.png" width="400">

このようにmasterブランチにfeature/aブランチの変更がマージされました

<img src="https://terracetech.jp/wp-content/uploads/2020/11/49.png" width="400">

確認しましょう。

<img src="https://terracetech.jp/wp-content/uploads/2020/11/50.png" width="400">

リポジトリのトップぺーじからcommitsを選択してください

<img src="https://terracetech.jp/wp-content/uploads/2020/11/51.png" width="400">

今マージしたマージコミットが追加されて

変更が取り込まれているのがわかります
マージコミットは先ほどmergeボタンを押した時に自動で作られたものです。

gitコマンドで確認してみましょう

## 32. git log

ローカルリポジトリ先ほどリモート上でmergeされたことを知りません。

リモートmasterブランチが更新されたので
ローカルのmasterブランチを更新する必要があります

移動します

## git checkout master

```
moritakjinoMBP2 :: ~/git/test » git checkout master
Switched to branch 'master'
Your branch is behind 'origin/master' by 2 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)
```

するとこのようにでます。
あなたのブランチは2コミット遅れている。git pullを使ってローカルブランチをアップデートしてください

と出ます。2コミットというのは`fix: add html`のコミットと`マージコミット`のことです。

<img src="https://terracetech.jp/wp-content/uploads/2020/11/52.png" width="400">

## 33. git pull(git fetch + git merge)

`git pull`すると更新されました

```
Updating beab421..3756d15
Fast-forward
 index.html | 11 +++++++++++
 1 file changed, 11 insertions(+)
```


git log --graphで確認しましょう

## git log --graph

<img src="https://terracetech.jp/wp-content/uploads/2020/11/53.png" width="400">

緑の`feature/a`ブランチが`master`に合流したことがわかります

この後はまた
ファイルを編集する前に

`git checkout -b [branchname]`

ブランチを切って繰り返していきます

---
## git branch -b feature/b

その後覚えるコマンド
## ファイル内を変更する

git stash

–git cherry-pick

–—=git rebase master

git checkout 91ffa82ee9897

## masterにバグが見つかり、変更された。or masterに誰かのPRが入った。状態を作る

git =0=checkout master

## ファイル内を変更する

## git commit -m "fix: bug"



wip


```
git config -l 設定確認

`git log --graph --pretty=format:'%x09%C(auto) %h %Cgreen %ar %Creset%x09by"%C(cyan ul)%an%Creset" %x09%C(auto)%s %d'`
```

