# dotfilesについて

homeディレクトリにdotfilesディレクトリを作成し
## cd ~


## mkdir dotfiles
## mv .bash_profile dotfiles

dotfilesに移したファイルのシンボリックリンクを張る

`setup.sh`というファイルをdotfile内に作って、初期化してくれるshを置いておく

その中にこれを追加

`ln -s dotfiles/.bash_profile .bash_profile`

## cd dotfiles
## git init

## git add .
## git commit -m "first dotfile"

## git remote add origin git@github.com:[yourUserName]/dotfiles.git

githubのリポジトリをoriginという名前で登録

## git push -u origin main

push

## 他のデバイスからcloneして持ってくる

```
$ cd ~/ # if windows use this > cd %HOMEPATH%
$ git clone https://github.com/your_name/dotfiles.git
$ sh dotfilesLink.sh # if windows use this > mklink.bat
```
