# conflict解消ができるようになるハンズオン

- コンフリクトとは

同じファイル且つ同じ行の変更箇所が誰かによって違う変更(または削除)になっていて
どちらの変更を採用すればいいかgitがわからない状態

- mergeとrebaseのおさらい

このようなグラフがあるとします

<img src="https://terracetech.jp/wp-content/uploads/2020/12/381711A7-008E-429A-8D64-462031E335B6.png" width="500" />


画像左はmergeで、merge時にマージコミットをつくります

右のrebaseは真ん中の作業ブランチをmainブランチでrebaseした状態


<img src="https://terracetech.jp/wp-content/uploads/2020/12/51734221-F5B5-4F30-A103-B6DE3748F2FE.png" />

一番左のブランチのコミット履歴の中で
同じファイル&同じ行に対して違う変更がある場合
真ん中のブランチでそのファイルを編集していたらコンフリクト発生します

<img src="https://terracetech.jp/wp-content/uploads/2020/12/CDE20698-49A7-4C1F-982E-1E31556B4BEF.png" />

mergeしようとするとコンフリクトがおきます

<img src="https://terracetech.jp/wp-content/uploads/2020/12/A0010471-DBC2-47E5-8CDD-8875AAC6529C.png" />


どちらを採用すればいいか教えてあげるのがコンフリクト解消
## mergeコンフリクト解消をしてみる

<img src="https://terracetech.jp/wp-content/uploads/2020/12/131B7847-77A2-463D-BCCA-9EABDF8F9724.png" />


まずコンフリクト環境を作る

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

このようなコードが現れました(考え方は一緒なので上記と全く同じじゃなくても似ていればいいです)

<img src="https://terracetech.jp/wp-content/uploads/2020/12/conflict1.png" />


これは

`<<<<<<< HEAD`

merge先の変更 (現在checkoutしているブランチ)

`==========`

merge元の変更箇所

`>>>>>>>>>>> (merge元のブランチ名)`

こう説明できます。


18. 対応

コンフリクトが起きたら
「現在のチェックアウトしている変更箇所」か「取り込む先の変更箇所」の変更を選びます。
(もしくは二つの変更を生かすようにします。これは後ほど教えます)


- 現在checkoutしているブランチの変更に合わせる場合
つまり上記で言う

`<<<<<<< HEAD`

merge先の変更 (現在checkoutしているブランチ)

`==========`

この変更を反映させる場合(`<<<`と`===`の間の変更)

`git checkout --ours index.html`

- index.htmlをマージさせたブランチ(今回の場合main)に合わせる場合
つまり上記で言う


`==========`

merge元の変更箇所

`>>>>>>>>>>> (merge元のブランチ名)`

この変更を反映させる場合(`===`と`>>>`の間の変更)

`git checkout --theirs index.html`


このどちらかを選ぶということです。
もちろんコマンドで解決しなくても手作業で消すこともできます

今回は現在checkoutしている方を適応したいと思うので

つまり、これを

`<<<<<<< HEAD`

merge先の変更 (現在checkoutしているブランチ)

`==========`

merge元の変更箇所

`>>>>>>>>>>> (merge元のブランチ名)`


こうなるようにする

```
merge先の変更 (現在checkoutしているブランチ)
```

手動の際印は消してください

下記はこれらのことをしている動画

<img src="https://terracetech.jp/wp-content/uploads/2020/12/3.gif">

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

そこに書いてあるように
変更をコミットしましょう(本来自動で作られるマージコミットを手動で作っています)


`git commit -m "fix: conflict"`

`git log`で確認してみてください

```git
commit 845d83c0e23e0ddb82cfee8ac5e66eb165a18942 (HEAD -> feature/a)
Merge: 1c416b5 92391c7
Author: kenjimorita <kenjimoritata@gmail.com>
Date:   Sat Dec 19 10:38:26 2020 +0900

    fix: conflict

commit 1c416b5ee7533a757402cdf041340c8a438f4d45
Author: kenjimorita <kenjimoritata@gmail.com>
```


(`q`でコマンドに戻る)


`git push origin head`


github上で確認できます

<img src="https://terracetech.jp/wp-content/uploads/2020/12/4.gif" />

##　github上でコンフリクトしていることに気づいた場合

どういうときなるでしょうか?

- merge先ブランチの変更が自分のリモートブランチのどこかのコミット(リビジョン)内の変更箇所と被っている場合

`git checkout main`
して
`index.html`を

```

<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Document</title>
</head>
<body>
  <div>main変更箇所</div>
</body>
</html>
```

にしてください

`git add .`

`git commit -m "fix: index.html"`

`git push origin head`

でmasterを進めます

次に
`git checkout -` で一つ前にcheckoutしていたブランチに戻ります

このブランチはmasterの変更を知りません

```
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Document</title>
</head>
<body>
<p>feature/aの修正</p>
</body>
</html>
```

`git add .`
`git commit -m "fix: add p tag"`
`git push origin head`

するとgithub上ではどうなっているでしょうか

<img src="https://terracetech.jp/wp-content/uploads/2020/12/スクリーンショット-2020-12-19-11.10.03.png" />


これはmainが誰かの変更を取り入れて更新されたのに
そこの該当ブランチはその変更箇所とバッティングしていて、
gitはどちらを生かすが分からず(コンフリクト)
解決を求めている状態です。

これを解決するためには
ローカルでmainブランチを最新にして(`git pull`して)

自分のPRを出しているブランチにcheckoutして

`git merge main`
もしくは
`git rebase main`
で変更を取り込み、前述の通り解決して
pushし直します

※今回は自分自身でのローカルブランチであるmainで
リモートmainを更新したのでpullの必要ないですが現場ではpullします


以下WIP
## git rebase で解決する

`git merge main`
では前述の通り解決できると思います。

`git rebase main`

```
moritakjinoMBP2 :: ~/git/test » git rebase master
fatal: invalid upstream 'master'
moritakjinoMBP2 :: ~/git/test 128 » git rebase main
CONFLICT (add/add): Merge conflict in index.html
Auto-merging index.html
error: could not apply 1c416b5... feat: add index.html
Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".
Could not apply 1c416b5... feat: add index.html
```

こうなるはずです

<img src="https://terracetech.jp/wp-content/uploads/2020/12/スクリーンショット-2020-12-19-11.43.14.png" />


`HEAD`がmainブランチ
の変更になっていて、
`1c416b5... feat: add index.htm`
は
こちらのブランチの
コミットであることに注目してください。


以前の`git merge main`の時は`HEAD`は`カレントブランチ`で
`===`以下は`main`の変更でした

これが`rebase`する時と`merge`するときの挙動の違いです

イラストで見てみましょう
<img src="https://terracetech.jp/wp-content/uploads/2020/12/7E9447AB-229F-4374-AB14-DD119CBF4AC3.png" />

<img src="https://terracetech.jp/wp-content/uploads/2020/12/5D5B39DA-EBA2-44B9-AC26-6F851652E507.png" />


今回は両方とも生かすようにしましょう。
つまり、masterで更新された変更を取り込みつつ自分の変更を加える

<img src="https://terracetech.jp/wp-content/uploads/2020/12/4-1.gif" />


```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Document</title>
</head>
<body>
  <main>
    <div>main変更箇所</div>
    これはfeature/aで作られました
  </main>
</body>
</html>
```

このようにしてみましょう

分からなくなってしまったら

`git rebase --abort`

で中止していいです。(`git merge`でわかりやすく解決するか、その他の解決方法 -> 後述)

コンフリクトを解消したら

`git add .`

することを忘れないでください

`git rebase --continue`
で`rebase`を前に進めます(画像でいう次のコミットまで)

`git rebase --continue`するとエディタが立ち上がります

その内容でよければ
`:wq!`

でこのコミットのコンフリトは終了。

その後さらに積み上げていたコミットとHEAD比較が行われます

もしそこでもコンフリクトがあったら
対応します。なければsuccessと出ます

この表示はまた起きた時の表示です


```
[detached HEAD b75affe] feat: add index.html
 1 file changed, 4 insertions(+), 2 deletions(-)
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
error: could not apply 6fb108e... fix: add p tag
Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".
Could not apply 6fb108e... fix: add p tag
```

<img src="https://terracetech.jp/wp-content/uploads/2020/12/4-1.gif" />

今回もどちらの変更も取り込みます。このように修正してください

```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Document</title>
</head>
<body>
  <main>
    <div>main変更箇所</div>
    これはfeature/aで作られました
    <p>feature/aの修正</p>
  </main>
</body>
</html>
```

終えたら
`git add .`

`git rebase --continue`

`:wq!`

で終えます


もし失敗して

rebaseをやめたい場合は

`git rebase --abort`

すれば以前の状態に戻ります


コミット比較が終わりrebaseが終了しました。

```
[detached HEAD 42e0185] fix: add p tag
 1 file changed, 1 insertion(+)
Successfully rebased and updated refs/heads/feature/a.
```

このあとrebaseの場合は強制的にpushする必要があります。

## rebaseを終えたブランチの強制push

これからrebaseした変更をpushしてリモートブランチを上書きます。


```
rebaseするとコミット番号も変わり、
該当のリモートブランチで他の人がもし何か変更をpushしていたら影響が出ます。

rebaseしたものをリモートにpushする際は

必ず強制pushする必要がありますので

その際に

誰かの変更コミットが該当リモートブランチにプッシュされているのに

`git push --force origin head`

すると全部書き換わってしまうので他の開発者は困ります。

そのコマンドは使わないようにしましょう。

代わりに

何か該当リモートブランチに変更があった場合「気づきを得るために」(他人の作業を上書きしないようにしたいとき)

`git push --force-with-lease origin head`

を使うと良いです

 `[rejected] dev -> dev (stale info)`
 このような

 その際、rejectされた表示がされた場合そのリモートブランチに変更がないか確認してください。

 その変更を取り込んで対応する必要があります
```


 では

`git push --force-with-lease origin head`

を実行してください(大丈夫です。何かあった場合のみrejectされます。)

```
moritakjinoMBP2 :: ~/git/test 129 » git push --force-with-lease origin head
Enumerating objects: 8, done.
Counting objects: 100% (8/8), done.
Delta compression using up to 12 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 818 bytes | 818.00 KiB/s, done.
Total 6 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), done.
To https://github.com/kenmori/test.git
 + 6fb108e...42e0185 head -> feature/a (forced update)
```

うまく行きました。

上のgithubリンクからどうなっているかみてください

<img src="https://terracetech.jp/wp-content/uploads/2020/12/1.png" />

コンフリクトが解消されてmergeできる状態になっています

強制pushされたことが記述されていることに注意してください


以上でrebase時のコンフリクト解消の方法の終わりです。


## おしまい

疲れましたね。慣れですので。いろいろコンフリクトを起こして何度も壊してくださいね。

---

### その他よく起きるコンフリクト

- git stash apply時にコンフリクト
- git cherry-pick次のコンフリクト

これらはそれぞれ

HEAD(--ours)の方が現在のブランチになるので迷わないでしょう。

### rebaseのコンフリクト対応が辛い時

どうしてもrebaseでのコンフリクト解決が難しくなった場合

自分はよく
mainブランチから切り直して、現在のブランチのコミットをcherry-pickで積んで行って解決したりします

### 用語
よくコンフリクトに出会すとこのような名前があります
```
- Current Change
- Incoming Change
```

これは次の通りです

```
Current Change 自分(上に表示されているもの)
Incoming Change 相手(下に表示されている変更)
```

### VSCodeで簡単コンフリクト解決

VSCode上のコンフリクト時の見え方と意味を説明します

<img src="https://terracetech.jp/wp-content/uploads/2020/12/11.png" />

### 一人開発でコンフリクトの起こし方

1. AとBのブランチを作って
2. Aでファイルを更新してcommit、pushする
3. Bに移動して同じファイルの同じ行を編集、commitして
4. Aをmerge、もしくはrebaseする(`git merge A` or `git rebase A`)

rebaseの勉強をする時はBのコミットを増やしてみるとよいです。ずーっとコンフリクトを解消してcontinueをして、を繰り返しやります。(上記でハンズオンした例です)

### コンフリクト解消クイズ

1.

mainブランチを`merge`した際のコンフリクトが発生しました。現在のブランチの方を採用して解消してください

`<<<<<<<<<<<<HEAD`

`<div>aaa</div>`

`=================`

`<div>bbb</div>`

`>>>>>>>>>>>>>>>>>main`

2.

作業ブランチをmasterブランチでrebaseした際にコンフリクトが発生しました。

`<<<<<<<<<<<<HEAD`

`<div>aaa</div>`

`=================`

`<div>bbb</div>`

`>>>>>>>>>>>>>>>>>1c416b5... feat: add index.htm`

作業ブランチのコミットの方を採用してください

3. rebaseした際にコンフリクトが起きて、解消した後しなくてはいけないことを教えてください

4. rebaseが成功したあとしなくてはいけないことを教えてください

### コンフリクト解消クイズ答え

1.

`<div>aaa</div>`

2.

`<div>bbb</div>`

3.

`git add .` でコンフリクト解消したものをaddします

`git rebase --continue` 現在はrebase中にコンフリクトが発生した状態なので続けます

4.

`git push --force-with-lease origin head`

rebaseしたブランチを`安全にpush`します

## 参照
- [Git Rebase Explained Simply](https://dev.to/jacobherrington/git-rebase-explained-simply-k0a)

## me

- [author](https://kenjimorita.jp/aboutme)
- [twitter](https://twitter.com/terrace_tech)
