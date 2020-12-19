# conflict解消ができるようになるハンズオン

- コンフリクトとは

- 同じファイル且つ、同じ行の変更箇所が
誰か(自分自身の場合もあります)によって違う変更(または削除)になっていて
どちらを採用すればいいかgitがわからない状態


- コードの中での2つのコミット間における違いをgitが自動的に解決できない

これを教えてあげるのがコンフリクト解消



コンフリクト環境を作る

<img src="https://terracetech.jp/wp-content/uploads/2020/12/1-1.gif" />

上記の動画は以下のことをしています

1. `githubのtopページ` ->  `Repositories` -> `new` -> `Repository name`に `test`

(`適当なリポジトリを作る。Repository nameはなんでもいいです。ここでは`test`)

そこの一番最初のコードをコピーしておく

2. ターミナルで、適当なところに `mkdir test`

3. `cd test`(移動)

4. コマンド上で先ほどのをペースト

```
moritakjinoMBP2 :: ~/git/test » echo "# test" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/kenmori/test.git
git push -u origin main

Initialized empty Git repository in /Users/kenjimorita/git/test/.git/
[master (root-commit) d43de1b] first commit
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 214 bytes | 214.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/kenmori/test.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
moritakjinoMBP2 :: ~/git/test »
```

状態を確認 ※skip可能
`ls -la`

```
moritakjinoMBP2 :: ~/git/test » ls -la
total 8
drwxr-xr-x   4 kenjimorita  staff  128 12 16 19:10 .
drwxr-xr-x@ 23 kenjimorita  staff  736 12 16 19:10 ..
drwxr-xr-x  12 kenjimorita  staff  384 12 16 19:10 .git
-rw-r--r--   1 kenjimorita  staff    7 12 16 19:10 README.md
moritakjinoMBP2 :: ~/git/test »
```

リモートリジトリと同期されたローカルリポジトリが作られました。


ここまでを上記動画でしています。


6. `git branch` ※skip可能

```
* main
(END)
```

mainブランチがあって、現在そこで作業していることを確認

5. `git branch feature/a` (ブランチ作るだけのコマンド)

次に `git branch`すると

```

  feature/a
* main
(END)
```
作られただけでmainで作業していることがわかる(`q`で戻る)

6. `echo > index.html`

7. `code .` エディタ上で開く

codeコマンドがない場合

[コマンドを入れる](https://twitter.com/terrace_tech/status/1340088128611078144?s=20)

(できない場合普通にtest/index.htmlをエディタで開いてください)

8. 以下を`text/index.html`にコピペ

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


`git status`で現在の状態を確認

```git
moritakjinoMBP2 :: ~/git/test » git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html

nothing added to commit but untracked files present (use "git add" to track)
```


9. `git add .`

// more
```
※addしたもの取り消したい場合 (全てなら `git reset HEAD` or 特定のファイルなら
`git reset HEAD index.html`)
```

10. `git commit -m "feat: add index.html"`

11. `git push origin head`

```
moritakjinoMBP2 :: ~/git/test » git add .
moritakjinoMBP2 :: ~/git/test »
moritakjinoMBP2 :: ~/git/test » git commit -m "feat: add index.html"
[main 1490d1d] feat: add index.html
 1 file changed, 12 insertions(+)
 create mode 100644 index.html
moritakjinoMBP2 :: ~/git/test » git push origin head
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 12 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 428 bytes | 428.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/kenmori/test.git
   d43de1b..1490d1d  head -> main
moritakjinoMBP2 :: ~/git/test »
```

`github`上ではこのようになっているはず

<img src="https://terracetech.jp/wp-content/uploads/2020/12/2.gif" />

12. `git checkout feature/a`

```
Switched to branch 'feature/a'
```


13. `code .` エディタで開いて`test/index.html`を
つくり以下をコピペ(先ほどのとはbody直下が違うことに注意)


```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Document</title>
</head>
<body>
  これはfeature/aで作られました
  <main>

  </main>
</body>
</html>

```


15. `git add .`

16. `git commit -m "feat: add index.html"`


ここまでで用意ができました

17. `git merge main`

コンフリクト発生!!

```
moritakjinoMBP2 :: ~/git/test 1 » git merge main
CONFLICT (add/add): Merge conflict in index.html <- ①
Auto-merging index.html
Automatic merge failed; fix conflicts and then commit the result.
moritakjinoMBP2 :: ~/git/test 1 »
```

上記①の箇所でcmd押しながらhoverするとリンクになっていて飛べます


```html
<<<<<<< HEAD
=======

>>>>>>> main
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Document</title>
</head>
<body>
<<<<<<< HEAD
  これはfeature/aで作られました
  <main>

  </main>
=======

>>>>>>> main
</body>
</html>
```

このようなコードが現れました(考え方は一緒なので上記と全く同じじゃなくても似ていればいいです)

これは

<<<<<<< HEAD (現在checkoutしているブランチ)
merge先の変更
==========
merge元の変更
>>>>>>>>>>> (merge元のブランチ名)


18. コンフリクトが起きたらどちらかの変更を選びます

現在checkoutしているブランチの変更に合わせる場合

`git checkout --ours index.html`

index.htmlをマージさせたブランチ(今回の場合main)に合わせる場合

`git checkout --theirs index.html`

どちらかを選ぶ
今回は現在checkoutしている方を適応したいと思います

ファイルを確認すると適応した方の変更になっています。

git statusでどういう表示になっているか確認しましょう

```
moritakjinoMBP2 :: ~/git/test » git status
On branch feature/a
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both added:      index.html // ①
```
`Unmerged paths` & ①でbothとなっていることに注意してください

git addします

`git add index.html`


```
moritakjinoMBP2 :: ~/git/test 1 » git status
On branch feature/a
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)
```

全てのconflictは直ったがまだマージされていないと言われています

今の変更をコミットすれば終わりです(本来自動で作られるマージコミットを手動で作っています)

```
moritakjinoMBP2 :: ~/git/test » git commit -m "fix: conflict"
[feature/a d659b6d] fix: conflict
```

`git log`で確認してみてください


 19. どちらとも採用したい場合は？






