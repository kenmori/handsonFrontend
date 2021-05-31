# nodeenv

[nodeenv](https://github.com/nodenv/nodenv#basic-github-checkout)


## install
$ git clone git://github.com/nodenv/nodenv.git ~/.nodenv

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

``cd ~/.nodenv && src/configure && make -C src`

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

cd ~/Desktop

で
node -vをやるとglobalで設定したバージョンが

cd ~/Desktop/test

で
node -vをやるとlocalで設定したバージョンが

※これで違う人は

`curl -fsSL https://github.com/nodenv/nodenv-installer/raw/master/bin/nodenv-doctor | bash`

でチェックしてみてください
何か言われてませんか


ref:
[nodenvの環境構築](https://qiita.com/282Haniwa/items/a764cf7ef03939e4cbb1#path%E3%82%92%E9%80%9A%E3%81%99)

