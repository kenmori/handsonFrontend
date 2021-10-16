# npm ハンズオン

課題を始める前にここの右上の[star☆](https://github.com/kenmori/handsonFrontend/stargazers)を押下していただけるとやる気出ます。
[作成者](http://kenjimorita.jp/)


フロント開発のざっくり理解

フロント開発は以下のことをします

- `npm`を使ってパッケージを管理する。その為には`node`を使う。`node`のバージョン管理をするために`nvm`を使う。`nvm`を使う為に`brew`などを使ってコマンドツール管理する

- フロントは`webpack`というバンドルツールを利用するのが一般的 (複数のJSを一本に束ねる役割。これをビルドという)。`webpack`で束ねる際に`loader`というものを使ってリソース(imageやCSS)などをjsに変換する
- `webpack`でビルド中に`loader`という`js`に変換する工程があり、もし`TypeScript`で書きたいなら`.js`に出力するため変換する必要がある。その際に`ES2015`(`ES6`。現代のjsの新しい記述)を`ES5`(古いブラウザ向けに書かれたjs)にするために`webpack`の`babel-loader`(以下`babel`)を使う。
(以前までは`ts-loader`が`typescript`を`js`に変換して、さらに`js`を`babel`が変換していたが、`babel 7`以降は`babel-loader`だけでよくなった。
- `babel`では`typescript`の型チェックできないので`typescript`が持っている`tsc`というコマンドを使ってチェックをする
- `webpack`ビルド時にコードを検証(チェク)するローダーもある。`eslint-loader`は.`.eslintrc`などで設定された書き方に沿っているか検証してくれる
- `typescript`を使うには`.tsconfig`という設定ファイルが必要でそれに書かれたルールで書く
- コードスタイルを修正するために`pritter`が必要。

まとめると

- `Babel(webpackのbabel-loader)`で`TypeScript`から`js`へ変換(トランスパイル) <- webpackの設定
- `tsc`で型チェック <- コマンドで実行
- `TypeScript ESLint`と`Prettier(プリティア。コードフォーマッター（ソースコード を整形してくれるツール))`を併用した状態で`ESLint`の実行 <- コードスタイルやルールに沿っているかのコード品質チェック

をして`.js`を生成する

開発のためのこれらをやる為に`npm`を入れる必要があり、
上記のビルドまでの開発工程を実行するために都度それに応じたライブラリをインストールしていく

`npm`はそのプロジェクトのライブラリを管理するものです。
また`npm`と同じような働きをする`yarn`がある

## プロジェクトを作ります

`npm init`でプロジェクトの中に`package.json`を作ります。

`node`で動かすために、`node`のバージョン

npmとは何か
 [Doc](https://docs.npmjs.com/about-npm)

- ソフトウェアレジストリ
- Webサイト

## installation of the NPM
- install package in the project
- install Semver package
- install Semver Pakage

## Dependencies vs Development Dependencies

dependencies
- npm install --save react

devDependencies
- パッケージを作る時、testツール、ビルドツール、バンドルツール、タスクツール等開発時に使うパッケージはここ
- エンドユーザーとしてアプリを作る分にはdependenciesでもdevDependencesでもどちらでも構わないが、できるだけ分けた方いい
- 誰かのをクローンして開発するとき(そのライブラリのルートでインストールするとき)にnpm iするとnode_modulesに入るもの
- devDependencesに入っているパッケージはライブラリを使用する分にはインストールされない







## NPM pakcages version and package-lock.json file

## Updating NPM-Node.js package Manager

SE

## NPM Script

## Executable scripts in the NPM



レジストリ
レジストリにパッケージを公開する
CLI(コマンとラインインターフェース)
通常npmと言った時はこのcliをいう


package.json
プロジェクトげ使われるライブラリの管理

npm init --yes

セマンティックバージョニング

メジャーバージョン - 以前のバージョンと互換性のない破壊的な変更を加えた時
マイナーバージョン - 互換性を保ったまま機能を追加した時
パッチバージョン - 互換性を保ったまま不具合を修正した時




# npmしてみる

node -v
`v14.15.4`

npm -v
`6.14.10`

- ディレクトリを作る
`mkdir test`

- 移動
`cd test`

- 初期化
`npm init`
とりあえずenterをずーと押す

`ls`

```
package.json
```

`cat pa`まで打って`tab`、enter

```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

パッケージのインストール

`npm install rimraf`

確認

`ls`


`node_modules`というのができている

`node_modules`

cat package.json

```json
"dependencies": {
    "rimraf": "^3.0.2"
  }
```

dependenciesに`rimraf`が入っている


WIP

[peerDependencies](https://indepth.dev/posts/1187/npm-peer-dependencies)

