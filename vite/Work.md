# 次世代フロントエンドツールViteを触るためのハンズオン(Next generation frontend tooling with Vite HandsOn)

<img src="https://terracetech.jp/wp-content/uploads/2021/08/無題237.png" width="600">

## この学習の流れ

### viteの理解
### ローカルで動かしてみる
### viteを使ってdeployしてみる

## Vite

Viteとは最近きているフロントビルドツール

同じビルドツールではViteの他に

- Rollup,
- Parcel,
- snowpack,
- webpack

などがあります

[2020年buld-toolsの満足度や使用率アンケート結果](https://2020.stateofjs.com/en-US/technologies/build-tools/)

- 急に現れた`snowpack`と[`esbuld`](https://css-tricks.com/comparing-the-new-generation-of-build-tools/#use-cases)が人気になってきている

> ビルドツールについてはWebpackの優位性が議論の結論になったように見えましたが、SnowpackやESBuildのような新参者によって再び爆発的に発展して、2017年以来初めての局面に突入しました。

- [SveltekitがViteに切り替えた](https://svelte.dev/blog/sveltekit-beta#From_Snowpack_to_Vite)

それらのbuildtoolsの違いは?
こちらがわかりやすいです([Comparing the New Generation of Build Tools](https://css-tricks.com/comparing-the-new-generation-of-build-tools/#vite))


### Viteを必要としない動機

- ビルドにRollupを使用したくない場合
- Babel、eslint、およびwebpackローダーのエコシステムをすぐに利用できるようにしたい場合
- Next.jsなどを使っている(viteはまだ実験的)
- Snowpackのようなストリーミングインポートをサポートしていない。npmで依存関係をインストールします。

### Viteが解決するものは何でしょうか

- サーバーの起動を速くする
ブラウザに配信するJSはバンドルツールを使って、全ての依存関係にあるJSを束ねていた

> Viteは、最初にアプリケーション内のモジュールを依存関係とソースコードの **2つのカテゴリ**に分割することにより、開発サーバーの起動時間を改善している

従来のバンドルツール

**依存関係**

開発中は変更のない依存関係に再ビルドは不要ですよね
- Viteは[esbuild](https://esbuild.github.io/)を採用して依存関係を事前にビルドします
esbuildはGoで書かれていてJSベースのバンドラーより10~100倍速いことが言われています

- 依存モジュールのファイルは強力にキャッシュされる(`Cache-Control: max-age=31536000,immutable`)。
依存モジュールを足した場合はサーバーを起動しなおします


**ソースコード**

頻繁に変更されるコード
Viteは[ネイティブESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)を介してソースコードを提供する
これはブラウザーがバンドラーの仕事をするという意味です
リクエストに変更がなければ `304 Not Modified`を返す


WIP

- [Multi-Page Suport](https://vitejs.dev/guide/build.html#multi-page-app)
- [Library-Mode](https://vitejs.dev/guide/build.html#library-mode)
- [Automatic CSS Code-Splitting](https://vitejs.dev/guide/features.html#css-code-splitting)
- [Optimized Async Chunk Loading](https://vitejs.dev/guide/features.html#async-chunk-loading-optimization)
チャンクAがチャンクCに依存している場合、ビルドを戻ってチャンクCを単独で生成する(?)
- [Dynamic Import Polyfill](https://vitejs.dev/config/#build-polyfillmodulepreload)
- [Faster Dependency Pre-building](https://vitejs.dev/guide/comparisons.html#comparisons-with-other-no-bundler-solutions)
依存関係の事前構築、構築にはロールアップではなくesビルドで高速
- [Monorepo support](https://vitejs.dev/guide/comparisons.html#snowpack) ※遷移先のMonorepo Supportを参照
- [CSS Pre-Processer](https://vitejs.dev/guide/comparisons.html#snowpack) ※遷移先のCSS Pre-Processor Supportを参照

viteがしないこと

- リンティング
- 開発時の型チェック※ビルドでは行う
- テストの実行
- 書式設定コード

## 早速いじってみましょう

1. `npm init @vitejs/app`


2. `vite-js`

3. `vanilla`

4. `vanilla`

5. 作られているのを確認

6. `cd vite-js`

7. `npm i`

8. 作られる

9. `npm run dev`

10. `http://localhost:3000/`

11. `npm run build`

`dist`が作られる

12. `npm run serve`

buildプレビュー
`http://localhost:5000/`


## 課題

### test用のリポジトリを作って最初から作り直してみてください

1. cd ~/Desktop デスクトップに移動

2. `npm init @vitejs/app`

3. vite-site

4. vanilla [enter]

5. vanilla [enter]

6. cd vite-site

7. npm install

8. npm run dev

9. githubにリポジトリを作る。リポジトリ名(vite-site)

<img src="https://terracetech.jp/wp-content/uploads/2021/08/スクリーンショット-2021-08-21-15.06.28.png" width="400">

10. git remote add origin https://github.com/kenmori/vite-site.git (ご自身のに変えてください)

11. git branch -M main

12. git push -u origin main

<img src="https://terracetech.jp/wp-content/uploads/2021/08/スクリーンショット-2021-08-23-22.22.52.png" width="400">

<img src="https://terracetech.jp/wp-content/uploads/2021/08/スクリーンショット-2021-08-23-21.58.47.png" width="400">


13. shを作る([公式のこちらと同じことをやります](https://vitejs.dev/guide/static-deploy.html#github-pages))

`deploy.sh`を作って下記内容をコピペ

`下記、自分のgithubアカウント名と作ったリポジトリ名に置き換えてください`
の下を変更

```js
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
########下記、自分のgithubアカウント名と作ったリポジトリ名に置き換えてください########
git push -f git@github.com:kenmori/vite-site.git master:gh-pages

cd -
```

14. `vite.config.js`を作って下記内容をコピペ

[詳しくは公式のこちら](https://vitejs.dev/config/#config-file-resolving)

```js
import { defineConfig } from 'vite'

export default defineConfig({
  base: "/vite-site/" //こちらはgithubで作ったリポジトリ名です
})
```

現状
<img src="https://terracetech.jp/wp-content/uploads/2021/08/スクリーンショット-2021-08-23-21.53.51.png" width="400" />


15. 今作った`sh deploy.sh`をプロジェクト直下(package.jsonがある場所)で叩く


16. githubで確認する

`gh-pages`にブランチを切り替える

<img src="https://terracetech.jp/wp-content/uploads/2021/08/1-1.png" width="400">


17. リポジトリの右の方にある `setting` -> 左ペインにある `pages`を開く

<img src="https://terracetech.jp/wp-content/uploads/2021/08/スクリーンショット-2021-08-21-15.30.58.png" width="400">


18. リンクを訪れる

<img src="https://terracetech.jp/wp-content/uploads/2021/08/スクリーンショット-2021-08-21-15.31.33.png" width="400">


表示できていたら変更して再度deployしてみましょう


19. 何かhtmlに変更を加えて deployしてみる

20. 変わったか確認する。キャッシュが効いている可能性があるのでその場合はスーパーリロードしてみてください


## 用語説明

WIP


[ref](https://www.bookstack.cn/read/vitejs-2.2-en/8296be5a82c4a7f0.md#1d1ja6)

## ref

- [vite](https://vitejs.dev/guide/why.html#slow-server-start)
- [file-system-cache](https://vitejs.dev/guide/dep-pre-bundling.html#file-system-cache)
- [codeSTACKr](https://www.youtube.com/watch?v=LQQ3CR2JTX8)
- [ABEMAにesbuildを導入してWebのバンドル処理を69倍高速化した話](https://developers.cyberagent.co.jp/blog/archives/26336/)
- [Introducing Vite.js — An Opinionated Frontend Build Tool](https://medium.com/habilelabs/introducing-vite-js-an-opinionated-frontend-build-tool-484385701245)
- [Vite 2.2 GitHub Pages](https://www.bookstack.cn/read/vitejs-2.2-en/8296be5a82c4a7f0.md#1d1ja6)
- [Comparing the New Generation of Build Tools](https://css-tricks.com/comparing-the-new-generation-of-build-tools/#vite)
- [what-is-esbuild-2ofc](https://dev.to/zaydek/what-is-esbuild-2ofc)
