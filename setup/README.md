Prettier


- `shift + command + x`で拡張機能を開く

- `Prettier - Code formatter`

- `command + ,`

- `"editor.formatOnSave": true`

#### iTerm2

cmd + ,で設定が開く

もしも何かコマンド打ってアラートマークが出てきたら
KeyBindings -> + マークでキーバインドで登録する


###### 設定

- windows ->　透過にする

- keys -> option + spaceで消えるようにする

- General -> selection -> Applications in terminal may copy -> on

#### 移動

cmd + <- でwindow移動

cmd + shift + h 過去のペーストを呼び出し

cmd + enter 拡大


### shel

zsh (ジーシェル。アメリカではzのことをジーと呼ぶ)
Mac OS Catalinaから標準になった

- `cat /etc/shells`
現在使うことができるshells

- `chsh -s /bin/bash` シェルを変更


### 設定確認

- `screen -v`

- tmux
`brew install tmux`

- `vim --version`

- `nvim --version`
- `brew install neovim`

### NeoVim vs VIM

#### configの場所
- vim
  - ~/.vimrc
- NeoVim
  - ~/.config/nvim/init.vim

  ドキュメントに`.vimrc`などに書かれているものはこちらに書く
  もしくはvim使用者向け`~/.vim/**`みたいなフォルダは置き換える


#### 起動コマンド
- vim
  - vi or vim
- NeoVim
  nvim

#### Viewモードの起動
- vim
  - view
- NeoVim
  - nvim -R

`open -a TextEdit ~/dotfiles2/.zshrc`
でテキストEditを開き以下を設定

shellが`~/.zshrc`を参照していて、

`dotfiles2/zshrc`を参照するように変えたいとき


`ln -s ~/dotfiles2/.zshrc ~/.zshrc`

`~/.zshrc`が存在しているとリンクを作れないので、`~/.zshrcc`など適当にバックアップ的に変更しておく

`mv .zshrc .zshrcc`



```
alias vi="nvim"
alias vim="nvim"
alias view="nvim -R"
```

`dw` 単語を消す
`a` 次の文字にインサート
`ctr+r` アンドゥのリドゥ

`shift + P` 現在いるところにペースト
`3yy` 3行ヤンク
`.` 現在のコマンドを繰り返す


### コマンドモード

ファイルを書いてから書き込み
`:`でコマンドモードにして
`!python3 test.py`
でその場で実行できる
`!!`で前の処理を実行できる
`!ls`でみれたりする

`[[` セクション毎に移動
`]]` セクション毎に移動

`{{` 段落毎に移動
`0` 先頭に移動
`$` 最後に移動
`:set number` 行を表示
`:10` 移動

`ctr + o` で元の位置に戻る


### 検索

`/hello` + `enter`
n or N
`:set nohlsearch`
`:noh` で消す

### 置換

%s/fafa/fa/g 全てを置換
%s/fafa/fa/gc 確認しながら置換

###

O その行にインサート

### 全ての行に何かする

ctr + vで選択して
:norm I #

ctr + vで選択して
:norm A // comment

## 設定

```
mkdir ~/.config
mkdir: /Users/kenjimorita/.config: File exists
```

ある


`mkdir nvim`

cd nvim

vim init.vim

## Vim Plugin managers

[Vim Plugin マネージャー](https://qiita.com/nil2/items/ddcf23f1163d0abd805b)

[vim-plug](https://github.com/junegunn/vim-plug)
Pluginをアンインストールしたいとかもこのドキュメント

- [Neovimはこっち。macもwinも](https://github.com/junegunn/vim-plug#neovim)

インストール場所
`/Users/kenjimorita/.local/share/nvim/site/autoload`

`vim init.vim`


call plug#begin()
/// ここにインストールするpluginを書く
call plug#end()

おすすめプラグイン
[vim-horizon](https://github.com/ntk148v/vim-horizon)

[installation](https://github.com/ntk148v/vim-horizon#installation)
Vim Plugを使っている人はここをコピーして使ってくださいねの意味

:PlugInstall
で書いたらインストールする

:PlugStatus
でプラグインを確認

`cd  ~/.config/nvim/plugged && ls`でプラグインがあることを確認できる

確認したら
Usesで
init.vimに書いていく

## nerdTree

[nerdTree](https://github.com/preservim/nerdtree)

[plugin](https://github.com/preservim/nerdtree/blob/master/plugin/NERD_tree.vim)

[ショートカットを設定。init.vimに書く](https://github.com/preservim/nerdtree#how-can-i-map-a-specific-key-or-shortcut-to-open-nerdtree)



## [fzf](https://github.com/junegunn/fzf)

brewでinstall
https://github.com/junegunn/fzf#using-homebrew


## [vim-fugitive](https://github.com/tpope/vim-fugitive)

こちらのインストールは
[gitでinstallするタイプ](https://github.com/tpope/vim-fugitive#installation)

```
mkdir -p ~/.vim/pack/tpope/start
cd ~/.vim/pack/tpope/start
git clone https://tpope.io/vim/fugitive.git
vim -u NONE -c "helptags fugitive/doc" -c q
```

こちらは`/.vim`の設定フォルダに入っていっているので、nvimの人は変える

```
mkdir -p ~/.config/nvim/pack/tpope/start
cd ~/.config/nvim/pack/tpope/start
git clone https://tpope.io/vim/fugitive.git
vim -u NONE -c "helptags fugitive/doc" -c q
```

## figitive(フギティブ)

gitコマンドをvim上から打てる

git blame fugitive.vim

`:Git Blame`

## vim-gitgutter

差分マークを示してくれる

[vim-gitgutter](https://github.com/airblade/vim-gitgutter)

https://github.com/airblade/vim-gitgutter#installation

Neovimの方


```
mkdir -p ~/.config/nvim/pack/airblade/start
cd ~/.config/nvim/pack/airblade/start
git clone https://github.com/airblade/vim-gitgutter.git
nvim -u NONE -c "helptags vim-gitgutter/doc" -c q
```

### vim-commentary

[vim-commentary](https://github.com/tpope/vim-commentary)

複数コメントが簡単にかける

```
mkdir -p ~/.config/nvim/pack/tpope/start
cd ~/.config/nvim/pack/tpope/start
git clone https://tpope.io/vim/commentary.git
vim -u NONE -c "helptags commentary/doc" -c q
```

vで複数行選択したら、gcと打つとコメントをtoggleする

こちらはPluginInstallとかしない

## [vim-polyglot](https://github.com/sheerun/vim-polyglot)

シンタックスを色でわかりやすくして見栄えが良くなる
## [coc.nvim](https://github.com/neoclide/coc.nvim)

言語補完が効くプラグイン

pluginをinstallしたら
cocが使えるように[cocの言語を指定](https://github.com/neoclide/coc.nvim/wiki/Language-servers)しないといけない

[js-typescript](https://github.com/neoclide/coc-tsserver)

`coc-rls`,`coc-css`, `coc-html`, `coc-tsserver`

```
coc-go
:GoInstallBinaries
```


## Screen, Tmux

Screen vs tmux

tmuxの方が色々できる
tmuxの方が頻繁に更新される

### Screen

- `ctr + a, S` 画面を横に分割
- `ctr + a Tab` 画面移動
- `ctr + a c` プロセス起動
- `ctr + a|` 縦分割
- `ctr + a Q` ペインを閉じる
- `ctr + a d` デタッチ `screen -r [number]`
- `screen -ls` screen画面チェック (まだ残っているセッションを確認する)
- `screen -r` アタッチ

Client <- Screen <- Session <- Windows <- pain

- ターミナル閉じてもセッションは生き続ける
- exit でセッションを抜ける。セッションの数だけ

### Tmux

- Tmux Plugin Managerを入れる
`git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`


[ref](https://girigiribauer.com/tech/20200427/)

Tmux Plugin Managerをインストールすることでプラグインが使えるようになる


`.tmux.conf` tmuxの設定ファイル

- tmux.confを変更したのに反映されない場合は

`tmux kill-server`


[.tmux.confの一例](https://raw.githubusercontent.com/girigiribauer/dotfiles/master/.tmux.conf)

[https://girigiribauer.com/tech/20200427/](https://girigiribauer.com/tech/20200427/)




---------------------------
clientがTmuxサーバー立ち上げる
- Sessonはscreen同様複数立ち上げられる
- Session上にwindowsが複数立ち上げられる

`tmux` - tmuxの起動

- `ctr + b, d` デタッチ
- `tmux ls`セッション一覧
- `tmux a -r セッション名` アタッチ
- `Ctr + bs => 0 or 1` セッション一覧から選択
- `tmux kill-server` tmuxのシャットダウン
- `ctr + b t` 時計を表示

usr/local/bin/zsh
がどうのこうの言われていたら

`vim ~/.tmux.conf`
でパスを設定し直す。


[How can I make tmux use my default shell?](https://superuser.com/a/388243)

`set-option -g default-shell /bin/zsh`

tmuxのセッション立ち上げた状態でtmuxを打ってnestできないよと言われたら
$TMUX='' tmux


https://qiita.com/shin-ch13/items/9d207a70ccc8467f7bab


## go

go mod init [packagename]

Go

## トラブルシューティング

`$GOPATH is not set and `go env GOPATH` returns empty`

なら

``
export GOPATH=$HOME/golang
export PATH=$PATH:$GOPATH/bin
```

vim-goの設定
https://github.com/fatih/vim-go/blob/master/doc/vim-go.txt


## zsh

https://www.zsh.org/

vim ~/.zshrc
ls
!vim (以前やったvimのコマンドを実行)

!! (直近のコマンド)


`setopt no_beep` 音を鳴らさない

setopt auto_pushd

`pushd /tmp/a`

`setopt pushd_ignore_dups` 重複は無視

`setopt auto_cd` cdなしでディレクトリに入れる

`setopt hist_ignore_dups` historyの中で重複を無視する

`setopt share_history` 他のzshrとヒストリーを共有する

### history設定

- 履歴ファイルの保存先
`echo HISTFILE=${$HOME}/.zsh_history`

option
  `https://zsh.sourceforge.io/Doc/Release/Options.html#Options`



- 重複を記録しない
`setopt hist_ignore_dups`

### ohmyz.sh

install
https://ohmyz.sh/

`sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

installすると
zshrcが書き換えられてしまうので
以前までのものを移行する必要がある

`.zshrc.pre-oh-my-zsh` 以前までのもの


`cat ~/.zshrc.pre-oh-my-zsh >> ~/.zshrc` 書き換え


```
alias zshconfig="vim ~/dotfiles2/.zshrc"
alias ohmyzsh="vim ~/.oh-my-zsh"
```


便利なプラグイン郡
`https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins`


これを使うには例えば
https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/z

`z`なら
Setupのところに
`plugins=(... z)`
とある
zshrcのところのdefaultである
plugins=(git)のところに
挿入する
デフォルトpluginはgitが入っている状態

`plugins=(git z)`

`cd ~/.oh-my-zsh/plugins`

jumpしたいときに
`z plug`

??

### autojump

サードパーティ製
https://github.com/wting/autojump

pythonを実行

### websearch

plugins(... web-search)


WIP


### zsh-navigation-tools

https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/zsh-navigation-tools

### zsh-autosuggestions

`git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`

add zsh-autosuggestions to Plugin


### sudo

### zsh-syntax-hightlighting

plugins=(git sudo copydir copyfile copybuffer dirhistory history zsh-autosuggestions fastfile)

### powerlevel10k

[powerlevel10k](https://github.com/romkatv/powerlevel10k)

homebrewでinstall
https://github.com/romkatv/powerlevel10k#homebrew

最後のzshrcの場所は任意で変える

`ZSH_THEME="powerlevel10k/powerlevel10k"`



ダイヤモンド型に見えるならyes
アイコンの表示を
```
Install Meslo Nerd Font -> y
unicode 1
時計 2

y
```

`p10k configure`
で設定を変えられる


### zsh起動と共にtmuxを立ち上げる

`[[ -z "$TMUX" && ! -z "$PS1" ]] && tmux`


###

[backgroundプロセスの本来の使い方](https://qiita.com/kamykn/items/2fd1293c0bb5a8aa5ebd)



## 便利なやつ
`option + command + space`


### history search





## commandがない

`where is [command]`

echo $PATH

