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





## commandがない

`where is [command]`

echo $PATH

