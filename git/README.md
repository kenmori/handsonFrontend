



### git

- git commit -m “hogehoge”

- git add .

- git status

- git log --oneline

- git push origin head

- git pull master

- git branch -D [branch name]

- git stash

- git stash apply

- git reset --soft HEAD^

- git checkout -

- git push --force-with-lease origin head

- git add --all

- git branch -m

- git branch

- git rebase

- git  commit --amend

- git clone [url] （


### stash

- git stash show stash@{<stash no.>} -p

- git stash clear

- git stash drop stash@{<stash no.>}

- git stash -u
新規ファイルを含むstash

- git branch -r
リモートブランチ一覧

- git commit --amend -m "<commit coments>"
直前のコミット名を変更

### git add

- git add -p
明示的にステージングエリアに上げるファイルを指定


- [git HEAD^とHEAD~の違い](https://yu8mada.com/2018/05/30/the-difference-between-head-caret-and-head-tilde-in-git/)

- [Pretty git branch graphs](https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs)

- [gitで便利なエイリアス達](https://qiita.com/peccul/items/90dd469e2f72babbc106)




----

WIP


<h3>【git】遊びながら覚える「git real」と今まで書き溜めてきたgit commandメモ</h3>
git playgroundで検索したら

<a href="https://kenjimorita.jp/wp-content/uploads/2016/06/2cb0b7b6454ea48ec2dca00b845626f01.png"><img class="alignnone size-full wp-image-10779" src="https://kenjimorita.jp/wp-content/uploads/2016/06/2cb0b7b6454ea48ec2dca00b845626f01.png" alt="スクリーンショット 2016-06-19 17.09.19" width="1215" height="663" /></a>

<a href="https://try.github.io/levels/1/challenges/1">こういうの</a>でてきて、ただただ言われたとおりしていたら

ステージが変わって、
こういうの出てきたよ
<a href="https://kenjimorita.jp/wp-content/uploads/2016/06/751ae3af169720c5a7488d3e14703658.png"><img class="alignnone size-full wp-image-10776" src="https://kenjimorita.jp/wp-content/uploads/2016/06/751ae3af169720c5a7488d3e14703658.png" alt="スクリーンショット 2016-06-19 17.06.06" width="1267" height="678" /></a>

<a href="https://gitreal.codeschool.com/levels/1">https://gitreal.codeschool.com/levels/1</a>

言われたとおりやるのではなくて自分で考えながらコマンド打ちなさいってことみたいですね


以下今まで自分がEvernoteに書き溜めながらメモしていた奴。


------------------------------
git log —oneline master..feature(今居るブランチ) masterに含まれていないリビジョンを調べる

git status -s
git l

git config の使い方
https://transitive.info/article/git/command/config/

git config -l gitの設定を表示

git reset —soft HEAD^
git commit —amend

git diff master:fafa.txt dev:fafa.txt 特定のブランチ間のファイル差分
git diff master fafa.txt masterブランチのfafa.txtと現在のブランチのfafa.txtの差分
git diff —name-status 変更されたファイル名だけ取得
git diff HEAD^ HEAD 直前のcommitによる変更表示
git diff —cached 次のcommitで反映されるindexとHEADの差分
git diff まだaddしていないインデックスとワーキングツリーの差分
git diff master post/0124
git diff —name-only master dev — some-file
git diff —staged
git diff —unified=1 HEAD~ HEAD

誤って削除したstashを復活させる
https://www.d-wood.com/blog/2015/02/12_7407.html

インデックスに対しての作業ツリーのdiffを破棄する
https://d.hatena.ne.jp/perlcodesample/20090702/1246679588
特定のファイルを元に戻す
git checkout ファイル名

全て元に戻す
git checkout .

※checkoutは新しく追加したファイルは削除されない

log
log --graph --all --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset' --abbrev-commit --date=relative

<strong>コンフリクト対応</strong>
git checkout —ours [home.md]
git add home.md

相手側
git checkout —theirs home.md

リモートリポジトリのブランチを削除
git push origin :

直前の作業ブランチに戻る
git checkout -

git rebase -i HEAD~3 (HEADから3つ分のコミットを編集)

pickをsquashに変更すると上のコミットに統合される

git stash save "メッセージ"
git stash pop 取り出して適用
git stash list

clone ローカルリポジトリにリモートリポジトリを取り込む
git clone
(localでgit init したと同様にローカルリポジトリが作られる)

originの意味
git push origin = git push : urlというリポジトリに対してローカルブランチをリモートブランチにプッシュするという意

トラッキングブランチを参照
git log origin/lesson

<strong>fetch</strong>
リモートリポジトリの情報をローカルリポジトリのトラッキングブランチに反映させる
git fetch
git pulとの違いはpulは作業ブランチ状態もリモートの状態で更新されましたがfetchはトラッキングブランチが同期されるだけ。作業ブランチはそのまま

git reset —hard origin/ 作業ブランチの状態をトラッキングブランチと同期

<strong>rebase</strong>
git checkout lesson
git rebase master(masterの変更を取り込んだ上で自分の変更コミットをHEADにする)

git rebase —abort (リベース失敗した場合戻したいとき)

https://gist.github.com/yatemmma/6486028
別ブランチで作業中masterの変更を取り込む際
master最新コミットから派生したブランチにする。その際コチラの変更コミットが先頭だがことなるコミット番号として反映される
mergeは変更を取り込んだmergeコミットを先頭に作る

別ブランチの特定のコミットだけ取り込みたい場合
git cherry-pick

git log —oneline(端的に表示) —graph(線で表示) —decorate(ブランチ名も表示)

mergeする場合(masterに移動してmerge)
git checkout master
git merge

git push origin git branch -m ブランチ名変更

fast-foward
masterから新しいブランチ作成した時点でそのブランチがmasterのcommit全て引き継いでいる状態のこと

git reset 特定のリビジョンまで戻す(HEADが先頭になる)
git checkout 特定のリビジョンまで(HEAD)を移動
→detach状態(浮いた状態)　変更を加えてgit checkout -b か git checkout masterか決める
https://devlights.hatenablog.com/entry/20130417/p1

git commit —amend -m “コミットメッセージを変える"
git revert ある特定のリビジョンの修正を打ち消すコミット。プラマイ0
git revert —no commit 上は自動でコミットされるが、コミットしたくないばあいは--no commit
git reset —soft HEAD^

git config —global user.name kenji merit

git rebase -i HEAD~2
:q(vimの終了)

git fetch --all

eho fafafa &gt; fafa2.html (今のフォルダ内にファイルを生成)

git mv fafa.html fafa2.html (ファイルの名前変更)
git show —pretty=fulley (詳しいログ情報)
git reset HEAD^ 一つ前に戻る

git log -1(コミット１つだけ)　 -p（コミットによる差分）

<strong>rm</strong>
git rm —cached fafa.html (addされているファイルを作業ツリーにもどす)

<strong>log</strong>
git log
git log -p -2 (変更内容 , 直近の2つ)
git log --graph
git log —since=2.weeks
git log —abbrev-commit —abbrev=4 —pretty=oneline -10
⑩の短いリビジョン
最後に —author=“kenji merita"
とすると自分のが出てくる

git log --graph --name-status --pretty=format:"%C(red)%h %C(green)%an %Creset%s %C(yellow)%d%Creset"

<strong>status</strong>
git status
git status -s　状況調査の短縮（出力がなければリポジトリはクリーン）
git status -b現在のブランチについての情報

<strong>branch</strong>
git branch　表示
git branch —contains (現在のブランチ)

<strong>checkout</strong>
git checkout [branch]
git checkout -b 0411 origin/master
git checkout -b 0411_2 (現在居るブランチから新たに派生したブランチを作る)

<strong>add</strong>
git add *** ***
git add -A
git add -u (変更された全てのファイルをステージング)

<strong>commit</strong>
git commit -m “*****"
git commit —amend -m “修正コミットメッセージ” (quite)、追加したいファイルをindexにaddして実行すると直前のコミットを変更できる
●コミット名変更
git commit —amend→スペース E→編集→ecp→shift ZZ
^(カレット)
~(チルダ)

<strong>push</strong>
git push origin 0408
git push origin 0411

<strong>reset</strong>
git reset ステージングされたファイルをアンステージング
git reset —hard (コミット前の全ての変更をなかったものにする)
リビジョンの復元
①git reset -hard [REVISION]
SHA-1名が分からない場合 git reflog

今戻したリビジョンをやっぱりやめて最新状態
git reset —hard [REVISION]

<strong>stash</strong>
git stash save
git stash show
git stash list -p
git stash apply スタッシュ名[stash@{0}](stash は残る)
git stash pop(stash は破棄)
stash@{1} のように引数を指定することによって、特定の作業を復元することができます。
git stash drop
git stash clear

[fix]refs #110 削除フラグが更新されない不具合の修正
レッドマインと紐付けられる
gitk
git diff

4/10
git diff 0408 master

git log —no-merges
git branch -a (リモートとローカルブランチの確認)

git reflog コミット一覧
git logのおすすめコマンド

git log --graph --name-status --pretty=format:"%C(red)%h %C(green)%an %Creset%s %C(yellow)%d%Creset"

git reset —hard [commit no] 現在のブランチをここコミットまで戻して作業も戻す

git diff 183080c d34ef9c
(コミットとコミットの差分)

git revert

git log --pretty=oneline --since="2014-12-20" --until="2015-01-01" -5
期間指定

git log --pretty=format:"%an --- %H"

Gitリポジトリの作成
git init 0301(file name) リポジトリを初期化、作業フォルダを指定

リポジトリ内に移動、ファイル作成
vi kennjimorita.txt

②git checkoutでリビジョンを復元する
git checkout [REVISION]
git status -sb →##HEAD (no branch)
git logで確かめる

されに最新に戻すには
git checkout master

git status -sb
↓
リポジトリ内がクリーンかダーティか
detached HEAD状態か通常の状態か
調べることができる

新たなリポジトリ
git init 04-01
cd 04-01
echo new &gt; new.txt (新ファイル)
echo [Some other Txt] &gt; new.txt (中身を記述)
ls (確認)

ステージングエリアから下げる
git rm —cached — [fileName]
git reset — [fileName]

------------------------------

-------
0418
-------
git log —oneline —graph —all —decorate
git branch -a -vv (「通常のブランチ。追跡ローカルブランチ追跡リモートブランチ」が見れる)

git remote rm origin リモートブランチ
git remote -v
git reset --soft HEAD^
直前のコミットを取り消し(index,ワーキングツリーはママ)

(リモートリポジトリのチェック)

reset　を　なかったことにして最新のHEADまで戻す
git reset --hard ORIG_HEAD
git reset --hard dbbd342
git reset　は未追跡のものには何もしない
git clean -f(全ての未追跡ファイルを削除)
git clean -n(削除ファイル予定のリストを表示)

git branch -d [branchname]
git branch -D [branchneme](失われるリビジョンを含むため強制削除)

index,working treeがdirty状態だとreset —hard　で戻るとそれらは消える stash かcommitしてからresetすること

detached HEAD状態になったら
https://d.hatena.ne.jp/nishiohirokazu/20110513/1305290792

git status -sb
現在の状態が簡潔に見れる

git show doc:m1.txt

別ブランチのファイルをcheckoutする
git show [REVISION]:[FILENAME]
別ブランチのファイルをcheckoutして他のファイル名に変更する
git show [REVISION]:[FILENAME] &gt; [new-file-name]

git clone-with-branches 06-01 06-02

ブランチも同時に新しいクローンを作る

gitk —all &amp;
↓
カレントとそれ以外のダイヤグラムがみれる
GUI立ち上げる

git log —oneline —graph —decorate —all
でもみれる
CUIの中で表示

—decorate (info,master,doc,HEAgit Dなどのシンボルリファレンスを表示)
—oneline (SHA-1を7行、コミット毎の出力を1行に)
—all (リポジトリ内全てのブランチに格納されているリビジョンを表示)
-------------------------------
いちいちブランチを切り替えてlsでファイルを表示させない方法
git show [branchName]^{tree}

git branch -v
(全てのブランチと最新リビジョン)

git pack-refs —all
.git/packed-refsファイルに全てのブランチのリファレンスを格納

open -a TextEdit ~/.gitconfig

コマンドラインでファイル指定してOPEN

<strong>.gitconfigのエイリアス設定</strong>
[core]
excludesfile = /Users/No51/.gitignore_global
quotepath = false
[difftool "sourcetree"]
cmd = opendiff \"$LOCAL\" \"$REMOTE\"
path =
[mergetool "sourcetree"]
cmd = /Applications/SourceTree.app/Contents/Resources/opendiff-w.sh \"$LOCAL\" \"$REMOTE\" -ancestor \"$BASE\" -merge \"$MERGED\"
trustExitCode = true
[user]
name = Kenji Morita
email = kennjimoritata@yahoo.co.jp
[filter "media"]
required = true
clean = git media clean %f
smudge = git media smudge %f

# ===[ALIAS-START]===

[alias]
c = config -l
s = status -sb
l = log --pretty=oneline --abbrev-commit --abbrev=4 --decorate -25
ll = log --pretty=oneline --abbrev-commit --abbrev=4 --decorate
g = log --pretty=oneline --abbrev-commit --abbrev=4 -25 --graph --decorate
gg = log --pretty=oneline --abbrev-commit --abbrev=4 --graph --decorate
rp = rev-parse --short=4
b = branch
ss = !git snapshot
save = !git snapshot

# General purpose aliases:
# snapshot
# backup
# stat
# days
#
# Educational aliases:
# create-file
# simple-commit
# multiple-commit
# simple-loop
# simple-loop2
# clear
# branches

# Alias: snapshot
# Example:
#
# git snapshot This is my very important commit...
# git snapshot "This is my very important commit...
# git snapshot
#
snapshot = "!snapshot() { COMMENT=wip; if [ \"$*\" ]; then COMMENT=\"$*\"; fi; git add -A; git commit -m \"$COMMENT\"; }; snapshot"

# Alias: backup
# Example:
#
# git backup This is my very important commit...
# git backup "This is my very important commit..."
#
backup = "!backup() { git snapshot \"$*\"; git push; }; backup"

# Alias: days
# Example:
#
# git days
#
days = "!days() { git log --pretty=format:%cd --date=short | uniq; }; days"

# Alias: stat
# Example:
#
# git stat
#
stat = "!stat() { echo -n Number of revisions:; git log --oneline | wc -l; echo -n Number of developers:; git shortlog -s | wc -l; echo -n Number of days:; git days | wc -l; echo -n The working directory:; du -h -s --exclude=.git; echo -n The git directory:; du -h -s .git; echo -n Number of files in the working dir:; git ls-files | wc -l; }; stat"

# Alias: create-file
# Example:
#
# git create-file lorem
# git create-file lorem ipsum dolor
#
create-file = "!createFile() { for name in \"$@\"; do echo $name&gt;$name.txt; done; }; createFile"

# Alias: simple-commit
# Example:
#
# git simple-commit a
# git simple-commit a b c
#
simple-commit = "!simpleCommit() { for name in \"$@\"; do git create-file \"$name\"; git snapshot $name; done; }; simpleCommit"

# Alias: multiple-commit
# Example:
#
# git multi-commit lorem
# git multi-commit lorem ipsum dolor
#
multi-commit = "!multiCommit() { for name in \"$@\"; do git create-file $name; done; git snapshot \"$*\"; }; multiCommit"

# Alias: simple-loop
# Example:
#
# git simple-loop lorem 5
#
simple-loop = "!simpleLoop() { NAME=$1; i="1"; while [ $i -le $2 ]; do git simple-commit $NAME$i; i=$[$i+1]; done; }; simpleLoop"

# Alias: simple-loop2
# Example:
#
# git simple-loop2 lorem 7 13
#
simple-loop2 = "!simpleLoop2() { NAME=$1; i=$2; while [ $i -le $3 ]; do git simple-commit $NAME$i; i=$[$i+1]; done; }; simpleLoop2"

# Alias: branches
# Example:
#
# git branches lorem ipsum dolor
#
branches = "!branches() { for name in \"$@\"; do git branch $name; done; }; branches"

# Clonning with remote branches
#
# Command to list remote branches:
#
# git branch -r | sed "/-&gt;/d; s/ origin\///g"
#
list-remote-branches = "!listRemoteBranches() { git branch -r | sed \"/-&gt;/d; s/ origin\\///g\"; }; listRemoteBranches"
checkout-remote-branches = "!checkoutRemoteBranches() { for name in `git list-remote-branches`; do git checkout $name; done; }; checkoutRemoteBranches"
#
# Example:
#
# git clone-with-branches dirSrc dirDest
#
clone-with-branches = "!cloneWithBranches() { git clone $1 $2; cd $2; git checkout-remote-branches; git remote rm origin; }; cloneWithBranches"

#@todo: check parameters:
# git clone-with-branches URL

# Example:
#
# git checkout beta
# git set-version 0.1.0
#
# assumptions:
# - clean repo
#
# @git get-version === cat version.txt

set-version = "!setVersion() { echo $1 &gt; version.txt; git snapshot Version $1; git tag -a v$1 -m \"Release $1\"; }; setVersion"
get-version = "!getVersion() { cat version.txt; }; getVersion"

# Remove old commits
#
# git clear-reflog-now
#
clear-reflog-now = "!clearReflogNow() { git reflog expire --all --expire=now; }; clearReflogNow"
remove-old-commits = "!removeOldCommits() { git clear-reflog-now; git prune; }; removeOldCommits"

#
# ===[ALIAS-STOP]===


## commitizen

質問形式でcommitを作ってくれる
`npm install commitizen -g`



