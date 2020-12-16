# conflict解消ができるようになるハンズオン

- コンフリクトとは

同じファイル且つ、同じ行の変更箇所が
誰かによって違う変更になっていてどちらを採用すればいいかgitがわからない状態

コンフリクト環境を作る

1. `適当なリポジトリを作る`

2. mkdir test


3. cd test

4. コマンド上でそのままコピペ

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

`git branch` ※skip可能

```
* main
(END)
```

5. `git branch feature/a` (作るだけ)


6. `echo > index.html`

7. `open .` エディタ上で開く

openコマンドがない場合も普通にtest/index.htmlをエディタで開いてください

8. 以下をコピペ

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


現在の状態を確認

```git
moritakjinoMBP2 :: ~/git/test » git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html

nothing added to commit but untracked files present (use "git add" to track)
```


9. `git add`

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


12. `git checkout feature/a`

```
Switched to branch 'feature/a'
```


13. `echo index.html`


14. `open .` エディタで開く。以下をコピペ(先ほどのとはbody直下が違うことに注意)

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

17. `git merge master`

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
</body>
</html>
=======

</body>
</html>
>>>>>>> main
```

もういうのが現れました

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




