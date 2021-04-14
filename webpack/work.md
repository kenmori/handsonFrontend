# Webpack(モジュールバンドラー)ハンズオン

ここではwebpackについてハンズオンしていきます

[Webpackは依存関係を考慮してそれぞれのjsを一本にまとめてくれるバンドルツールです](https://webpack.js.org/concepts/)

Webpackを理解するためにまずはこれらを理解しましょう

- Entry・・・依存関係の解析を始めるファイル
- Output・・・出力設定。出力するファイルやパスを設定する
- Loaders
- Plugins・・・バンドル時に実行されるさまざまなタスク
- Mode
- Browser Compatibility

Webpackがどのように動くか

`yarn add -D webpack`

`yarn add -D webpack-cli`


ローカルにインストールしたwebpackが使えるようにパスを通す

`export PATH=$PATH:./node_modules/.bin`

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

## watchモード



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
  "dev": "webpack --mode development --watch",
  "build": "webpack --mode production"
}
```



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

