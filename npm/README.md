# npm ハンズオン

npm はそのプロジェクトのライブラリを管理するものです。

`npm init`でプロジェクトの中に`package.json`を作ります。

nodeで動かすために、nodeのバージョン

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
