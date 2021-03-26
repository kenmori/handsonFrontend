### 1 環境構築

reactを扱うにはnodeが必要です。

nodeはサーバーサイドで扱う言語でもありコマンドラインツールでもあります。

コマンドを叩くツールとして
nodeをインストールしましょう

ターミナルを開き
`node -v`
で
`v15.7.0`などの数字が返ってきたらokです。 -> その次の課題に移ってください。


### 2 homebrewのインストール

`brew -v`を叩いてください。

[homebrewとは](https://qiita.com/omega999/items/6f65217b81ad3fffe7e6)

「ターミナル上でコマンドを叩いて実行するプログラム」を特定の場所でバージョンなどを管理するツールです。

brewを入れていない方は入れましょう。

[brew](https://brew.sh/index_ja)

[写真1]

ここのコマンドをコピペして[ターミナルを立ち上げて](https://github.com/kenmori/handsonFrontend/tree/master/git/work#2-%E3%82%BF%E3%83%BC%E3%83%9F%E3%83%8A%E3%83%AB%E3%82%92%E9%96%8B%E3%81%8F)Enter実行します。

## 3 anyenvのインストール


`brew install anyenv`

※nodebrewを使っていた人はそこのパスへの参照コマンドをコメントアウトする


MacがM1の場合下記の設定が必要な場合がありそう


### トラブルシューティング

brew installでインストールしようとしたら
`Cannot install under Rosetta 2 in ARM default prefix (/opt/homebrew)`
と出た場合

[こちら](https://www.kzyrepository.com/2020/12/%E8%A7%A3%E6%B1%BA%E6%B3%95cannot-install-in-homebrew-on-arm-processor%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E8%A7%A3%E6%B1%BA%E6%B3%95m1%E3%83%81%E3%83%83%E3%83%97/)をみながら

```text
原因はHomebrewのインストール先が/local/binのためです。

以前のMacOSではHomebrewのインストール推奨先が/local/bin配下でしたが、MacOS ARMからはインストール推奨先がopt/homebrewへ変更になりました。

そのため、インストール先をopt/homebrewへ変更する必要があります。
```

自分は上記の記事内容ではできなかったので

[こちらの情報](https://stackoverflow.com/a/64997047)でやる

`/usr/sbin/softwareupdate --install-rosetta --agree-to-license`

and

`arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

叩く

`brew install anyenv`で解決

インストールしたら初期化

`anyenv init`

.bashrcか.zshrcに
`eval "$(anyenv init -)"`
を記載

sourceすると怒られる

```text
ANYENV_DEFINITION_ROOT(/Users/moritakenji/.config/anyenv/anyenv-install) doesn't exist. You can initialize it by:
> anyenv install --init
```

`anyenv install --init`
して止まったら`y`と答える

`Completed!`とでたらok

```text
Cloning https://github.com/anyenv/anyenv-install.git master to /Users/xxxxxx/.config/anyenv/anyenv-install...
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

このように出たら

`xcode-select --install`

and

`anyenv install --init`
をしてください

`anyenv install nodenv`
で`nodenv`をインストール

最後に

```text
Install nodenv succeeded!
Please reload your profile (exec $SHELL -l) or open a new session.
```

と出たらok

```
Cloning into 'nodenv-vars'...
remote: Enumerating objects: 211, done.
remote: Total 211 (delta 0), reused 0 (delta 0), pack-reused 211
Receiving objects: 100% (211/211), 31.82 KiB | 1.67 MiB/s, done.
Resolving deltas: 100% (76/76), done.
zsh: permission denied: /var/folders/b5/8kyf9x6n21dcwg3jmxv390s80000gn/T/nodenv.20210314000147.49293
```

こんな風に出たら怪しい。もう一度叩いてみて。

成功したら

`Please reload your profile (exec $SHELL -l) or open a new session.`
と言っているように

`exec $SHELL -l`

を叩く
ターミナルが更新されるので

`env`
と叩くと

```text
NODENV_ROOT=/Users/yourname/.anyenv/envs/nodenv
NODENV_SHELL=zsh
_=/usr/bin/env
```

と環境変数が作られていることを確認


### nodeのインストール

インストールできる一覧
`nodenv install -l`

nodeはここの奨励版を使ってください

<img src="https://terracetech.jp/wp-content/uploads/2021/03/スクリーンショット-2021-03-14-0.19.13.png" width="300"/>


### gitフォルダを作る

このReactプロジェクトをgit管理するために適当な場所にフォルダを作りその中をローカルリポジトリとしてください

[ここら辺から](https://github.com/kenmori/handsonFrontend/tree/master/git/work#2-%E3%82%BF%E3%83%BC%E3%83%9F%E3%83%8A%E3%83%AB%E3%82%92%E9%96%8B%E3%81%8F)

みないでも作れる人はいつものやり方で作ってください

### プロジェクトフォルダでnode指定する

作ったローカルプロジェクトの中で下記を実行

`nodenv local {nodeのインストールしたいversion}`

`.node-version`が作られます
これでここのフォルダに移動した際に自動でnodeバージョンが切り替わります

### create-react-appでReactプロジェクトを作成

[create-react-app](https://create-react-app.dev/)

`npx create-react-app my-app`
を叩いてください
止まるので`y`を押す

`Happy hacking!`と出たら成功です

下記を打ってください

`cd myApp`

`yarn start`

`http://localhost:3000`
にアクセスしてください。

これでReactを書く用意ができました

<img src="https://terracetech.jp/wp-content/uploads/2021/03/スクリーンショット-2021-03-14-0.32.06.png" width="300" />
