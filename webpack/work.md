# Webpack(モジュールバンドラー)ハンズオン

課題を始める前にここの右上の[star☆](https://github.com/kenmori/handsonFrontend/stargazers)を押下していただけるとやる気出ます。
[作成者](http://kenjimorita.jp/)

ここではwebpackについてハンズオンしていきます

[Webpackは依存関係を考慮してそれぞれのjsを一本にまとめてくれるバンドルツールです](https://webpack.js.org/concepts/)

ざっくり概要。

webpackというものを使って、一つのjsを作ります。
一つのjsというのは

```html
<script src="jquery.js"></script>
<script src="2.js"></script>
<script src="3.js"></script>
```

というのがあったとして

`jquery.js`と`2.js`, `3.js`はそれぞれ読み込まれる順番や内部で参照している変数に依存しています


```html
<script src="3.js"></script>
<script src="jquery.js"></script>
<script src="2.js"></script>
```

これだと動かないケースがあります。3がjqueryが読み込まれているのを期待して書かれている場合などです。

また、上記の場合httpリクエストを3回する必要があり(roundtrip problem)、パフォーマンスコストが掛かります。

このような問題を1つのjsとして依存関係(どのファイルがどのライブラリの読み込んで作られているか)を解決する為に
バンドル(一つに束ねる)必要があります。この束ねる過程をビルドと言います。


```html
<script src="bundle.js"></script>
```

webpackはCSSやHTML,画像などのリソースをjsにすることができます。
これをトランスパイル(変換)と言います。

webpackは記述されたjsがプロジェクトで決められたコーディングルールで書かれているか、
また、新しいJavaScript記述で書かれたものを古いブラウザでも解析できるようにしたりできます。
それらの設定をwebpackの中の`loader`でします。

一本のjsが出力された後にそのjsを圧縮したりする`plugin`もwebpackで設定することができます。


webpackはローカルサーバーを立ち上げることができます。
ファイル変更を検知して、ビルド、ブラウザをリロードして最新をそこに反映します。

ざっくりですがそれが概要です。

Webpackを理解するためにまずはこれらを理解しましょう

- Entry・・・依存関係の解析を始めるファイル。上記説明でいう「どれが最初に読み込まれるjsか」です。上記の場合`1.js`です
- Output・・・バンドルされたjsの出力設定。出力するファイル名やパスを設定する
- [Loaders](https://webpack.js.org/loaders/)・・・バンドルする前や生成中に変換や検証。(任意のローダーを使い画像を文字列にしたり、lessをコンパイルしたcssにしたりする。)。個々のファイルレベルで機能する。

下記は基本的なloaderです

```text
style-loader、css-loader、sass-loader、babel-loader、postcss-loader、file-loader、url-loader
```

- [Plugins](https://webpack.js.org/plugins/)・・・プラグインは、バンドルまたはチャンクレベルで機能する。webpackビルドシステム内にフックを登録し、Compilation（最適化されたバンドルモジュール）に機能を追加します。バンドル自体の作成方法の変更や、html内にstylesheet
を追加したり、ライブラリを変数として開発時使えるようにしたり、さまざまな機能を持つプラグインがある

下記は一般的なplugindです

```text
html-webpack-plugin、mini-css-extract-plugin、extract-text-webpack-plugin
```

プラグインやローダー

[webpack-contrib](https://github.com/webpack-contrib)

- Mode・・・バンドルされたjsを開発 or 製品としてビルドするか
- Browser Compatibility・・・ブラウザ互換

Webpackがどのように動くか


- エントリファイルを見つけて、その内容をメモリにロードします
- コンテンツ内の特定のテキストを照合し、それらを評価します（@importなど）
- 以前の評価に基づいて依存関係を見つけ、それらで同じことを行います
- それらすべてをメモリ内のバンドルにステッチします
- 結果をファイルシステムに書き込む



`yarn add -D webpack`

`yarn add -D webpack-cli`


ローカルにインストールしたwebpackが使えるようにパスを通す

## パスを通す

`export PATH=$PATH:./node_modules/.bin`

[参照](https://qiita.com/soarflat/items/09be6ab9cd91d366bf71)

`webpack`

と叩く

webpackを利用するために`webpack.config.js`を作る


```js
// 絶対パスを指定する必要があるので
const path = require('path');

module.exports = {
  // モードの設定。v4以降はmodeを指定する。
  mode: 'development',
  // エントリーポイントの設定
  entry: './src/js/app.js',
  // 出力設定
  output: {
    // 出力ファイル名
    filename: 'bundle.js',
    // 出力先パス(絶対パス)
    path: path.join(__dirname, 'public/js')
  }
};
```

設定を書いたらhtmlを作りましょう

```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Document</title>
  <script src='./js/bundle.js'></script>
</head>
<body>
</body>
</html>
```

scriptにバンドル下結果のjsを読み込んでいることに注意してください。

次に何かjsを書いてみて、
フォルダを作って以下を書いてみましょう

```js
// ./src/js/app.js

const a = "a"
console.log(a)
```

`webpack`を実行する

```js
moritakenji@moritaknjinoMBP webpack % webpack
asset bundle.js 1.19 KiB [compared for emit] (name: main)
./src/js/app.js 13 bytes [built] [code generated]
webpack 5.31.0 compiled successfully in 51 ms
```

できたと思います。
そしてhtmlをブラウザで見てみましょう。

VSCodeのhtml上で右クリック。ここを押してください

<img src="https://terracetech.jp/wp-content/uploads/2021/04/スクリーンショット-2021-04-09-19.16.37.png" width="400">


これだけじゃ束になるという理解にはならないので

jsを2つ作って一つにまとめてみましょう

```js
- src
  |- js
     |-app.js
     |-findUser.js
     |-getUser.js
```

というファイルを作ってみましょう

app.jsはエントリーポイントです。

以下は `findUser.js`です。
`findUser.js`は`name`と`users`を引数にとって、`name`が`users`の中にあるかを検査して結果を返す関数です

```js
// findUser.js
export const findUser = (name, users) => {
  return users.find((user) => name === user.name)
}
```

`getUser.js`は登録されているユーザー (ここでは固定値)を返す関数です。

```js
// getUser.js
export const getUser = () => {
  return [{name: "a", age: 20}, {name: "b", age: 19}]
}
```

この二つを`app.js`から使います。

```js
// app.js
import * as moduleA from "./findUser"
import * as moduleB from "./getUser"

// userを取得
const users = moduleB.getUser()

// 検索結果を取得
const result = moduleA.findUser("a", users)

// 出力
console.log(result.name)
```

開発ツールで`a`が出てきたらokです。

`public/js`でビルド(webpackが設定通り実行して一つのjsを生成)されたものをみてください

つまり
開発はsrc配下のjsを編集していって、
開発後はどこかのサーバーにあげる際にビルドをしてjsを生成し、それを配置、htmlを返すという方法が一般的です。


Webpackはこのように

- 機能ごとに開発を進めていくことができる
- モジュール毎に名前空間があり、グローバル汚染を防ぐ
- テストしやすい
- ファイルを一本にまとめてくれてリクエスト数を減らせる
- node_modulesから外部モジュールを参照できる
- 面倒なタスクを設定で実行してくれる

などフロントエンド開発では欠かせない存在になっています。

## ローカルサーバーを立ち上げる

ローカルサーバーを立ち上げましょう。

`yarn add -D webpack-dev-server`

```json
 "scripts": {
    "dev": "webpack serve" // webpack 4からはこのように書く
  }
```


## npm scriptsにコマンドを書く


```js
mode: 'development'
```

modeには`development` `production`等があります。
違いはビルドの結果等です。

`development`・・・エラー表示、デバッグのしやすいファイルを出力
`production`・・・ファイル圧縮、モジュールの最適化


今`webpack.config.js`に直接書いちゃっているので、製品として世に出すときと開発時で書き換えなくてはいけなくなっています。

コマンドを書いて、どちらの時も実行できるようにしましょう

```json
// package.json
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```

## ビルドしたら更新する

```json
  contentBase: path.join(__dirname, 'public'),
  compress: true,
  open: true, // ブラウザを立ち上げる
  port: 9000,
  // ルートディレクトリのファイルを監視
  watchContentBase: true,
  //バンドルされたファイルを出力する（実際に書き出す）
  writeToDisk: true,
```

## localhostをスマホからアクセスできるようにする

<img src="https://terracetech.jp/wp-content/uploads/2021/04/1-2.png" width="400px" />
PC上のこちらにあるipアドレスを

```json
  devServer: {
    host: '103.239.20.10', // ここに貼り付ける。
    port: 8080,
    disableHostCheck: true
  },
```

サーバーを起動して画面をスマホからQRコードアクセスする。


- [Manually Bundling an Application](https://www.youtube.com/watch?v=UNMkLHzofQI)
- [Live Coding a Simple Module Bundler](https://www.youtube.com/watch?v=Gc9-7PBqOC8)
- [Detailed Explanation of a Simple Module Bundler](https://github.com/ronami/minipack)



Webpackが最初に解析するjsをエントリーポイントと言います。

エントリーポイントにある依存関係を解析していきます。

```js
// webpack.config.js

module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

[EntryPoint構文](https://webpack.js.org/concepts/entry-points/)

配列にするとマルチエントリーになります

> "multi-main entry". This is useful when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".


設定ファイルには他の作業も加えることができます。



例えば
CSSやHTMLなどもバンドルして欲しいとか

このjs以外のバンドルする際のことを
ローダーと言います

`Loader`
Loaders are transformations that are applied to the source code of a module.

`Plugin`

ローダーは他の言語からjsに変換します。例えばTypeScriptから

`npm install --save-dev css-loader ts-loader`

webpack+Babelの構成

### 関連ツールをインストールする

```schell
npm install -D webpack webpack-cli babel-loader @babel/core  @babel/preset-env @babel/preset-react
```

- webpack
- webpack-cli
- babel-loader
- @babel/core
- @babel/preset-env
- @babel/preset-react

and

```
npm install react react-dom
```

[Webpack Loaders and Plugins](https://imranhsayed.medium.com/webpack-loaders-and-plugins-e13f79fe6b32)