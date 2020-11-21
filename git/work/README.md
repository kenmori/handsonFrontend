


前提

0.
- `brew install git`
- `git help`でなんか出てくる
- `git config --global user.name "GitHubのユーザ名"`
-  `git config --global user.email <GitHubに登録したメルアド>`
でgithubと紐づける
- [githubのSSHキー登録](https://qiita.com/shizuma/items/2b2f873a0034839e47ce)



2. `git clone https://github.com/kenmori/test.git`

3. cd test

4. `open .` で確認

5. `code .` でVSCode立ち上げる

6. index.htmlを作る

7. `git status`

6.png

8. `git add .`

7.png
new は Gitが初めて知ったファイル(新規で作られたファイル)

9. `git commit`


8png

ここのtitleに何を変更したかを簡潔に書く
bodyには詳しく書く

```
// title

// body
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

10. 例えば

9.png

コミットが実行された
10. png


11. git log

11.png

12. git push origin head

12.png pushされました

13.png
そこに書かれている
`https://github.com/kenmori/test.git`
リンクを訪れる

13_2.png
コミットを見てみましょう

13_3
titleとbodyが書かれている


14. `git reflog`

14.png
自分が打ったコマンドがわかる

15. `git status`

commit後このブランチに変更がないので`working tree clean`が出る

```
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

15.png

16. `git checkout -b feature/a`

16.png

masterブランチから派生された`feature/a`ブランチが作られ、そこに移動した


17. `git branch` で自分のいるブランチを確認する

17.png

米印がついているところが自分がいるブランチ

```
* feature/a
  master
```
では移動してみましょう
`q`を押下してターミナルに戻る

18. `git checkout master`

18.png

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

19. `ファイルに変更を加える`

 `html:5` emmet

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

20. `git diff`

19.png
現在の差分を見る

`\ No newline at end of file`があったら最後の行に一行追加しましょう

20. `git status`

`modified`となっていることに注意。既にgit管理されている(commit済みのファイル)が変更された場合の表示(先ほどはnewでしたね)

20.png

21. `git add .`

その後 `git status`

indexされました。staging
21.png

22. `git commit -m "fix: added htm"`

titleだけでコミットしましょう

22.png

```
[feature/a b8eb4b0] fix: added html
 1 file changed, 11 insertions(+)
 ```

23. `git log`

このような形になっていると思います

23.png

ここでコミットメッセージを間違えてしまいました or 何かファイルに変更を加えるのを忘れてしまいました

戻しましょう

23. `git reset --soft HEAD^`

を実行後
どうなっているか
`git status`で確認
1つ前のコミットがなくなり、stagingされた状態に戻っています

24.png

試しに

`git log`で確認

25.png

戻っています

`git reflog`で自分が打ったコマンドを確認しましょう

26.png

24. `正しいhtml or コミットメッセージにする`

`vim index.html`

or

普通に`code .`

```html
<body>
 <main>a</main>↲
</body>↲
```

このように編集しなおす


現在ファイル全体ではこのような状態

27.png

git status で確認しましょう

これはどういうことでしょうか

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

25. `git diff`

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

28.png

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

29.png

確認したら
`git add -u` してワーキングツリーとインデックスの差分をなくしましょう


26 `git add -u`

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

30.png

インデックス上に上がりました

`git diff`を叩いてくださいdiffは当然ありません。何も表示されていないはずです。

31.png
なぜならインデックスとワーキングツリーの差分は今インデックス上に取り込んだからです。

`q`でターミナルに戻る

では次のコミットと一つ前のコミットの差分を見る場合は
どうしたらいいでしょうか

27. `git diff --cached`

実際叩いてみましょう

32.png

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

32.png

これで何が取り込まれるかわかりますね

それではコミットしましょう

`git commit -m "fix: addd html"`と打ってください(`addd`になっているのはわざとです)

ちょっとまって

commitを実行する前に...

33.png

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

28 `git commit --amend -m "fix: add html"`

こちらを叩くとそれが可能です。

commit bodyも修正したいなら`git commit --amend`です。エディタが立ち上がるので編集して`qw!`で終えます。

```
moritakjinoMBP2 :: ~/git/test » git commit --amend -m "fix: add html"
[feature/a 30e9829] fix: add html
 Date: Sat Nov 21 20:18:20 2020 +0900
 1 file changed, 11 insertions(+)
 ```
36.png

`git log --oneline`で直っているのを確認しましょう

```
30e9829 (HEAD -> feature/a) fix: add html
beab421 (origin/master, master) feat: create index.html
```

ok

これをリモートブランチに反映させましょう。この変更を他の開発者と共有するために。

29. `git push origin head`

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

37.png


`* [new branch]      head -> feature/a`
をみてください

 `[new branch]`としてリモートにブランチが作られました。ローカルの`head`をリモートブランチ`feature/a`として

`remote: Create a pull request for 'feature/a' on GitHub by visiting:`
とあります。
多くの場合`push`した後プルリクエストを出します。
そこのリンクを押すとgithub上のそこに飛びます

38.png

押してみてください

39.png




ここでパスワードなど聞かれる場合は

```
- `git config --global user.name "GitHubのユーザ名"`
-  `git config --global user.email <GitHubに登録したメルアド>
```



WIP
`git log --graph --pretty=format:'%x09%C(auto) %h %Cgreen %ar %Creset%x09by"%C(cyan ul)%an%Creset" %x09%C(auto)%s %d'`