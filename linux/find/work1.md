# 20後には`find`コマンドが使いこなせるようになるハンズオン

<img src="https://terracetech.jp/wp-content/uploads/2021/10/linux.png" width="600" />

こちらは`find`コマンドが使えるようになるハンズオンです[スター](https://github.com/kenmori/handsonFrontend/stargazers)をお願いします

> findはファイルやディレクトリを検索するコマンド
> どこにあるかわからなくなってしまった時に使う

## 前提

- Mac(Windowsの方は置き換えてください)
- コマンドがある程度使える方。
## 下準備と確認

1. iTerm.app(or ターミナル.app)を立ち上げてください。vscodeのTERMINALでもいいです

2. testfindというディレクトリを作り、その中にindex.htmlを作ります。
それをコマンドで検索してみます

### 1.ディレクトリを作ります

`mkdir testfind`

### 2.作ったディレクトリに移動します

`cd testfind`

### 3. index.htmlを作り文字を書き込みます

`echo "test" > index.html`

### 4. 現在のディレクトリ内容を確認

`ls`

`index.html`
と出力される

### 5. 先ほど作ったindex.htmlを見ます

`cat index.html`

`test`という内容が出力される

### 6. 一つ上に移動します

`cd ../`

## find

### 1. findを使う

findの構文

`find testfind`

```unix
testfind
testfind/index.html
```

ディレクトリと下のファイルがfindされる

### 2. `-name`(name判別式)で特定の拡張子を持ったものを探す

`find testfind -name \*.html`

`testfind`ディレクトリの中にある拡張子が`html`のものだけ見つけて`testfind/index.html`と出力される。

※`\`は`*`をエスケープさせるものです

### 3. Downloadsディレクトリ内で練習

`Downloads`の中を使います

Dowonloadsの中を見るには

`ls ~/Downloads`

です
その中で任意の拡張子を検索してみましょう

例えば、

その中の`pdf`だけを抽出したい場合

`find ~/Downloads -name \*pdf`

or

`find $HOME/Downloads -name \*pdf`

とか
多すぎて検索が止まらない場合
`ctr + c`で止めます

結果が出てきたかと思います

このように拡張子を指定して見つけ出す事ができます。
また絶対パスを使うとカレント(現在のコマンド位置。`pwd`で出てくる場所)がどこにあっても実行できます

### -typeで指定する

1. `-type f`でファイルを検索する

現在の位置(`.`)でファイルのものを検索してみます

**構文**

```unix
find [パス] -type f
```

例えば先ほど作ったものを`-type`で探し出しましょう

```unix
find ~/Downloads/*test* -type f
```

`./testfind/index.html`と出てきました

このように特定の位置からtestが含まれるパスにあるファイルを見つけ出します

2. `-type d`で特定の配下にあるディレクトリを検索する

**構文**

```unix
find [パス] -type d
```

それでは

```unix
find ~/Downloads/*test* -type d
```

`./testfind`と出ます

このように特定の位置にある`test`が含まれるディレクトリを検索できます

## -name vs -type -d

これらの違いはなんでしょうか

1
```unix
find . -name tesfind
```

vs

2
```unix
find . -type d -name tesfind
```

1は`testfind`という名前のディレクトリとファイルを全て
2は `testfind`という名前のディレクトリ全て


あまりにもディレクトリやそのディレクトリの中が多い時は検索が重くなります。

止めるときは
`ctr + c`

### ダウンロードディレクトリの中でディレクトリの名前がtestfindのそれを見つけてください

答えは一番下

### Advance

findで見つけたあとそれに対してアクション(`-exec`)を実行しましょう

#### -exec練習1

testfind内のindex.htmlを同じフォルダの同階層にzipで圧縮する

`find ./testfind -name \*.html -exec zip ./testfind/test.zip {} \;`

.htmlを zipすることを実行する(-exec部分)。どこに？ `./testfind/test.zip`に

```unix
./testfind/test.zip {} \;
  adding: testfind/index.html (stored 0%)
```

確認してみましょう

`ls testfind`
※今いる場所が違う場合はカレント(`testfind`があるディレクトリ)まで`cd`移動してください


```unix
index.html test.zip
```

となっている

つまりこれで、GUIを使わずにコマンドで探して、圧縮できるようになりました
例えばこれで、画像を全てあるコマンドを通して圧縮するとかまとめるとか、削除するとかできそうです

## 所で先ほどの`{} \;`てなに？

`{} \;`
てなんですか?

- `{}`は見つかったファイル名を展開する為のもの
- `\`は`;`をエスケープしている。(`\`を使わず`";"`でもいいらしい)
- `;`は`exec`コマンドを終わる為のもの

[詳細](https://askubuntu.com/questions/339015/what-does-mean-in-the-find-command)

## 60分以内に変更されたファイルを探す

`find . -cmin -60`

.
./testfind
./testfind/index.html
./testfind/test.zip
./testping.zip

## 60分以内に変更されたファイルを探す

`find / -mmin -60`

## 60分以内にアクセスしたファイルを探す

`find / -amin -60`

お疲れ様でした!


### 課題

1. Donwloadsディレクトリの中に新たに`testfind`というディレクトリを作って、カレントから検索してみてください。
作るところから全てコマンドを使ってやること

2. Downloadsにディレクトリtestfind2を作って、カレントからディレクトリ名`testf`以下は任意の文字列で検索をしてください
作るところから全てコマンドを使ってやること

3. -typeを使ってDownloads内にあるtestfindのディレクトリを全て検索してください

4. Downloadsにある`png`ファイルを全て探して出力してください

5. 今探し出したpngファイルの中でその中で好きな文字列を含むpngファイルをzipしてください。zipディレクトリ名は`testping.zip`です

6. 今作った`zip`ディレクトリをfindで探してください


7. findとexecを使ってこの課題で作ったindex.htmlを削除してください(削除コマンド。`rm -f`)

8. 他のfindで条件検索できる判別式を使ってマスターしてください

 - `-size`を使って50M以上のファイルを出力してみる
 - `-size`を使って100M以内のファイルを出力してみる
 - `-size`を使って50M以上、100M以内のファイルを出力してみる
 - `-size`を使って100M以上の名前にaがつくpngファイルを探して削除してみる
 - `-perm`を使って特定のファイルの権限を変えてみる
 - `-empty`を使って空なファイル・ディレクトリを探して本当に空かコマンドで調べる
 - `-mtime`を使って100日前に変更されたファイルを見つけてみる
 - `-atime`を使って50日前にアクセスされたファイルを見つける

これには答えは出しませんので調べてみてください

### トラブルシューティング

#### `find: exec: unknown primary or operator`

`exec`が`-exec`となっていないとか

#### `find: -exec: no terminating ";" or "+"`

- `-exec rm -f{}\;`っているとか
- `-exec rm -f {}\;`っているとか
- `-exec rm -f{} \;`っているとか

正しくは
`-exec rm -f {} \;`

- `rm index.html {}`になっていて`exec`を忘れているとか

#### find: *.png: unknown primary or operator

- `-name`, `-type`など、何か判別式をつけ忘れてないですか

### このページの答え

- ダウンロードディレクトリの中でディレクトリの名前がtestfindのそれを見つけてください

`find ~/Downloads -type d -name testfind`
