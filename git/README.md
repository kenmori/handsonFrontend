### 

git commit -m “hogehoge”

git add .

git status

git log --oneline

git push origin head

git pull master

git branch -D [branch name]

git stash

git stash apply

git reset --soft HEAD^

git checkout -

git push --force-with-lease origin head

git add --all

git branch -m

git branch

git rebase

git  commit --amend

git clone [url] （


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

