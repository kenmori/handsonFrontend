# nodenv 設定ハンズオン

<img src="https://terracetech.jp/wp-content/uploads/2021/05/無題220.png" width="400px" />

[author](https://kenjimorita.jp/)

[スター頂けるとやる気出ます](https://github.com/kenmori/handsonFrontend/stargazers)


[nodenvドキュメント](https://github.com/nodenv/nodenv#basic-github-checkout)

※windowsの人は[nodebrew](https://site-builder.wiki/posts/28784)を入れるといいかもです。nodenv対応していないかも
## なぜnodenvを設定するか、作業の流れ

フロントエンド開発では`node`バージョンがプロジェクトごとに変わっていると頻繁に手動で変えなくてはならない or バージョン管理をしなくてはならない

nodeの管理は`nvm` とか `nodebrew`とかあるけれど、

これらは`node`を使っているプロジェクトをまたぐときに手動で切り替えないといけない(多分)

`nodenv`はそれを自動的に切り替えてくれる便利なもの & 流行り出している & 乗り換える人が多くなってきているのでお勧めしている

### nodenvを使うには？ざっくり流れ

`nodenv`コマンドをinstallする(後述)
-> PATHを通す
-> 初期化する

### ここから開発者共通の話

-> コマンドをインストールしたらPATHを通す
`echo $PATH`で現在のPATHが通っているものが確認できる
`PATH`を通すの意味はコマンドが使えるよう環境変数($PATH or $HOME, $SHELLとか)に書き込むこと

じゃあどこにそれが書き込まれるかっていうと
`echo $SHELL`
で表示されたご自身の `zsh` , `bash`
の設定ファイル。人によってここは違います(以後ここではzshにします。置き換えてください)

-> `cd ~ && ls -la`(不可視ファイル)
見れば出てきます

### ターミナルからVSCodeを立ち上げる方法

ちょっと話は逸れます

`code` VSCodeで立ち上がるコマンドで立ち上げられます
 -> もしないって言われたらそのコマンドが使えるようにPATHを通します -> `cmd + shift + p` -> `codeで検索`  -> `path通すって書いてあるやつをクリック` -> ターミナル再起動 -> 使えるようなる

`code .zshrc`

で設定ファイルをVSCodeで開く


ではやっていきましょう

## nodenv install

`$ git clone git://github.com/nodenv/nodenv.git ~/.nodenv`

```js
Cloning into '/Users/moritakenji/.nodenv'...
remote: Enumerating objects: 4021, done.
remote: Counting objects: 100% (18/18), done.
remote: Compressing objects: 100% (17/17), done.
remote: Total 4021 (delta 5), reused 4 (delta 1), pack-reused 4003
Receiving objects: 100% (4021/4021), 732.74 KiB | 1.10 MiB/s, done.
Resolving deltas: 100% (2636/2636), done.
```

## 実行可能な状態にする

`cd ~/.nodenv && src/configure && make -C src`

## [shellにパスを通す](https://qiita.com/282Haniwa/items/a764cf7ef03939e4cbb1#path%E3%82%92%E9%80%9A%E3%81%99)

`echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.zshrc`
`echo 'eval "$(nodenv init -)"' >> ~/.zshrc`

## 初期化

初期化。

`$ ~/.nodenv/bin/nodenv init`

## シェルを起動し直す

`exec $SHELL -l`

## 確認

`curl -fsSL https://github.com/nodenv/nodenv-installer/raw/master/bin/nodenv-doctor | bash`

`nodenv --version`

## update nodenv

`cd ~/.nodenv`
`mkdir plugins`

## node バージョンの確認

`nodenv install --list`

## ltsを確認

nodeを確認します
[node](https://nodejs.org/ja/)

奨励版を使いましょう

## globalのnodeにバージョンを指定

globalに設定するということはマシンに設定するということ

`nodenv global 14.8.0`

## localにnodeバージョンを指定する

localに設定するということは特定のフォルダ内を特定のnodeバージョンにするということ

`nodenv install 14.16.0`

`mkdir ~/Desktop/test`

`cd test`


`nodenv local 14.16.0`


`ls -la`して

```
moritakenji@moritaknjinoMBP testnode % ls -la
-rw-r--r--   1 moritakenji  staff     8  5 29 18:55 .node-version
```

`node-version`
なものができたらokです

一度シェルを立ち上げ直す

```
exec $SHELL -l
```

`node -v`で確認

globalとlocalでバージョンが違うことを確認してください

`cd ~/Desktop`

で
`node -v`をやるとglobalで設定したバージョンが

`cd ~/Desktop/test`

で
`node -v`をやるとlocalで設定したバージョンが

### トラブルシューティング

※これで違う人は

`curl -fsSL https://github.com/nodenv/nodenv-installer/raw/master/bin/nodenv-doctor | bash`

でチェックしてみてください
何か言われてませんか

ref:
[nodenvの環境構築](https://qiita.com/282Haniwa/items/a764cf7ef03939e4cbb1#path%E3%82%92%E9%80%9A%E3%81%99)
