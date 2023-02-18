# `Astro`を初めて触る方のハンズオン

<img src="https://terracetech.jp/wp-content/uploads/2023/02/astro.png">

[astro](https://astro.build/)
<img src="https://terracetech.jp/wp-content/uploads/2023/02/a3.png">

※この資料は[もりけん塾](https://twitter.com/search?q=%23%E3%82%82%E3%82%8A%E3%81%91%E3%82%93%E5%A1%BE)で`Astro`を初めて触れる方へ向けたハンズオンです。`Astro`を初めて触る方向けになります。
ドキュメントのチュートリアルをやることを奨励しますが、ざっと触れたい方に向けて書いています。

※手探りで作っているのと概念を都度学ぶだけのコードなので書き方等最適化されていないのですがご了承ください。

※正確に伝えるため一部ドキュメント日本語訳を使っています。

※ 最新情報や詳細は常にドキュメントを参照ください。

## 前提

- node >=16.12.0
- githubアカウントを持っている

## 使用するもの

- [netlify](https://www.netlify.com/)を使用
- [stackblitz](https://stackblitz.com/)を使用する

---

index
- ハンズオン
  - 環境構築
    - リポジトリを作るためgithubと繋げる
    - 不要なコードを削除する
    - Netlifyを使う
  - `Astro`に触れる
    - コンポーネントスクリプト
    - コンポーネントテンプレート
    - コンポーネントプロップス
    - Dynamic Tags
    - スロット
    - ネームドスロット
    - はまりポイント
    - スロットのフォールバックコンテンツ
    - page
    - CSS
      - スタイルのスコープ
      - グローバルスタイルシートの追加
      - tailwindを使いたい場合
      - scssを使いたい場合
    - scriptタグを使用する
      - inlineで書く
      - scriptsからjsを読み込む
      - scriptsからtsを読み込む
      - CDNを読み込む
    - tailwindを使いたい場合
- Astroの特徴
  - Astro vs JSX
- トラブルシューティング
  - stackblitz
    - ブランチ名を制御する
    - 変更が反映されない場合

**ざっくり要約**

- スピード重視の設計
  - JavaScriptランタイムゼロ
    - サーバー上でHTMLをレンダリングし、残った未使用のJavaScriptを削除します。
  - 島の力
    - 個々のコンポーネントアイランドをノンブロッキングで並列にロードします。
  - レイジーロードアイランド
    - コンポーネントは、ビューにスクロールしたときにのみハイドレートされます。表示されない場合は、`Astro`はそれを読み込みません。
- コンテンツに合わせたデザイン
  - fa
- 好きなライブラリを選べて設定が楽に始められる
  - solid⁠-⁠js, react, preact, vue
- 自由なデプロイ先
  - `Astro`は、静的出力（SSG）とライブサーバー出力（SSR）の両方をサポートしています。どのような構築を選択しても、`Astro`の柔軟なアダプターシステムにより、デプロイのセットアップと構成が簡単になります。

## ハンズオン

`stackblitz`と`github`と`Netlify`を連携して`Astro`を触っていきます

各課題にはその回答一例としてコード差分へのリンクを示します
(`code`となっているところ)ご活用くださいませ


### 環境構築

[getting start](
https://docs.astro.build/en/getting-started/)

<img src="https://terracetech.jp/wp-content/uploads/2023/02/a1.png">

`stackblitz`

<img src="https://terracetech.jp/wp-content/uploads/2023/02/a2.png">


#### リポジトリを作るためgithubと繋げる

#### 不要なコードを削除する

[参考](https://github.com/kenmori/astro-example/commit/4761910075068cd605e7c72d0521642350f96382)

※この変更に加えて
`Card.astro`も削除すること

#### Netlifyを使う

[参照](https://docs.astro.build/ja/tutorial/1-setup/5/#create-a-new-netlify-site)

<img src="https://terracetech.jp/wp-content/uploads/2023/02/a4.png">

<img src="https://terracetech.jp/wp-content/uploads/2023/02/1.png">
<img src="https://terracetech.jp/wp-content/uploads/2023/02/2.png">
<img src="https://terracetech.jp/wp-content/uploads/2023/02/4.png">
<img src="https://terracetech.jp/wp-content/uploads/2023/02/5.png">
<img src="https://terracetech.jp/wp-content/uploads/2023/02/6.png">
<img src="https://terracetech.jp/wp-content/uploads/2023/02/7.png">

8.
<img src="https://terracetech.jp/wp-content/uploads/2023/02/8.png">


これでmainにマージされたら自動でnetlifyにもデプロイされるようになりました。


### `Astro`に触れる

#### コンポーネントスクリプト

`---` コードフェンスを使用する

コンポーネントを実行するための任意のJavaScriptコードを書くところ

フロントのコードになることはない

ユーザーには見えない

> - 他のAstroコンポーネントのインポート
> - Reactのような他のフレームワークのコンポーネントをインポートする
> - JSONファイルのようなデータのインポート
> - APIやデータベースからコンテンツを取得する
> - テンプレートで参照する変数の作成


#### コンポーネントテンプレート

> コンポーネントテンプレートは、コンポーネントのHTML出力を決定します。
> ここにプレーンなHTMLを書くと、そのコンポーネントはインポートして使用されるすべてのAstroページでそのHTMLをレンダリングします。

コードフェンスの下から書き始めます

```js
---

---
// here
```

```js
---

---
<h1>blog</h1>
{blog.map(b => <li><h3>{b.title}</h3></li>)}
```

このようにblogsをmapで回し出力してみます

下記コードを参考にしてください

[code](https://github.com/kenmori/astro-example/pull/1)

#### コンポーネントプロップス

Reactのように書ける

```js
---
import Item from "./item.astro"
const posts = [{ title: "my life" }, {title: "my life2"}, {title: "my life 3"}]
---

<ul>
  <Item posts={posts} />
</ul>
```

[code](https://github.com/kenmori/astro-example/pull/2)

#### Dynamic Tags

`Astro`はタグを動的にすることができます

```js
---
const Ul = "ul" //　最初の文字は大文字でなくてはいけないです
---

<Ul>
  <Item posts={posts} />
</Ul>
```

何かのロジックによって

```js
---
const Element = isList ? "ul" : "div" //　最初の文字は大文字でなくてはいけないです
---

<Element>
  <Item posts={posts} />
</Element>
```

ここではulをUlに書き換えてください

[code](https://github.com/kenmori/astro-example/pull/3)

#### スロット

> 他のファイルからコンポーネントテンプレートに子要素を注入（または「スロット」）することを可能にします。

Reactでいうchildren

現在`Layout.astro`は

```js
  <body>
  <slot />
  </body>
```

このようなところがあります
Layout.astroを呼び出しているところはどこでしょう

`pages/index.astro`です

```js
<Layout title="template">
  <main>
    <h1>Welcome to <span class="text-gradient">もりけん塾<span></h1>
    <Lists />
  </main>
</Layout>
```

ここの`Layout` componentsの子供として指定している`main`の内容が
`Layout.astro`の`slot`になります

```js
<body>
  <main>
  <h1>Welcome to <span class="text-gradient">もりけん塾<span>
  </h1>
  <Lists />
  </main>
</body>
```

こんな感じです

では`lists.astro`を下のように書き換えて

```js
<Ul>
  <slot>
</Ul>
```

同じ表示になるように完成させてください

[code](https://github.com/kenmori/astro-example/pull/4)

#### ネームドスロット

ネームドスロットはスロットされる位置を指定するものです

これを利用することで同じコンポーネントテンプレート上に何個もslotを作ることが可能です

**1.**

`components/list.astro`をこのようにし、同じ表示にしてください

```js
<Ul>
  <slot name="item" />
</Ul>
```

[code](https://github.com/kenmori/astro-example/pull/5)

**2.**

`components/list.astro`内にさらに
slotを置き、
`https://terracetech.jp/wp-content/uploads/2023/02/astro.png`
こちらのリソースを使い、imgとして表示させてください

完成系
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-10.01.59.png" width="300">

[code](https://github.com/kenmori/astro-example/pull/6)

##### ハマりポイント

1.同じコンポーネントテンプレート内にslotが重複する場合named slotを使わないと表示されない

from

```js
<Ul>
  <slot /> // ここが表示されない
  <slot name="header-image">what happen</slot>
</Ul>
```

to

```js
//work!!
<Ul>
  <slot name="item" />
  <slot name="header-image">what happen</slot>
</Ul>
```

2.閉じタグ忘れると以降のslotは表示されない

```js
<Ul>
  <slot name="item"> // 閉じタグがない
  <slot name="header-image">what happen</slot> // 表示されない。
</Ul>
```

#### スロットのフォールバックコンテンツ

slotがうまく出力されない場合に備えて
代替のものを表示することができます。

ここではslotにフォールバックコンテンツを設定して、コンテンツの出力を確認してください

```js
  <slot name="header-image">Fallback Content for Slots [header-image]</slot>
```

として、呼び出し時にnameを間違えてみましょう

完成系
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-10.10.16.png" />

[code](https://github.com/kenmori/astro-example/pull/7)

#### page

個別ページを作ります
Astroでは `/page`直下に含めることでルーティングさせることができます

基本スタイルの中でページ固有のコンテンツを出力するためにLayoutを使うのが基本です

新たにpagesの直下に`page.astro`を作り、
共通コンポーネントであるLayoutを読み込み
その中でそのページ特有のコンテンツを作ります

```js
// pages/page.astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="page">
  <main>
    <h1>Welcome to <span class="text-gradient">Page<span></h1>
    page
  </main>
</Layout>
```

このページに遷移させる為にlinkを作りましょう

完成系
<img src="https://terracetech.jp/wp-content/uploads/2023/02/page-1.gif">

[code](https://github.com/kenmori/astro-example/pull/8)


#### CSS

##### スタイルのスコープ

pageのbackgroundを`#fff3f3`

```css
/* page.astro*/
<style>
  main {
    margin: auto;
    padding: 1.5rem;
    max-width: 60ch;
    background: #fff3f3; // change
  }
```

完成系
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-13.57.33.png" width="300">

同じ`index.astro` の`main`に影響が出ていないことがわかります

> スタイルのスコープ
> AstroのstyleCSSルールは、デフォルトで自動的にスコープされます。スコープされたスタイルは、その同じコンポーネントの内部に書かれたHTMLにのみ適用されるように内部でコンパイルされます。Astroコンポーネント内に記述したCSSは、自動的にそのコンポーネントの中にカプセル化されます。

同じmainタグへの指定でもコンポーネント内のスコープに閉じられています

<img src="https://terracetech.jp/wp-content/uploads/2023/02/style.png" width="300">


##### グローバルスタイルシートの追加

コンポーネント内にだけ適用されるスタイルを知ることができました
ここでは共通で使いたいcssを作成します

`src/styles/global.css`を作成します。stylesというフォルダを作る必要があります。

<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-14.19.14.png" width="300">

`index.astro`, `page.astro`に適用します。コードフェンス内で

```js
---
import '../styles/global.css';
---
```
を追加します

NOTE:
先ほどのpage.astroのmainに付与したbackgroundは取っ払ってください

```css
/* background: #e3e3e3; */
```

global.cssには共通で使うCSSを記述します。
以下をコピペして適用させます。

```css
html {
  background-color: #f1f5f9;
  font-family: sans-serif;
}

body {
  margin: 0 auto;
  width: 100%;
  max-width: 80ch;
  padding: 1rem;
  line-height: 1.5;
}

* {
  box-sizing: border-box;
}
```

また、各ページ内の
```css
<style>
main {
  margin: auto;
  padding: 1.5rem;
  max-width: 60ch;
}
h1 {
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
}
.text-gradient {
  background-image: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400%;
  background-position: 0%;
}
</style>
```

も同じはずなのでglobal.cssに移動させます

完成系
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-14.28.23.png" width="300">

<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-14.32.13.png" width="300">

global指定はstyle内でもできることも併せて確認します

```css
<style is:global>
  h1 {
    color: red;
  }
</style>
```
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-14.36.40.png" width="300">

これは確認のみで大丈夫です。最後は消してください

### scriptタグを使用する

`pages/page.astro`にscriptタグを書いてみます

```js
---
~省略~
---
~省略~

<script>
  console.log("page")
</script>
```

pageに遷移した時だけ実行されることを確認してください

追加したスクリプトはすべてAstroで処理されて束ねられ、
ページの`<head>`に`type="module"`で注入されます。

スクリプトのバンドルを避けたい場合は、
外部ファイルをインポート時など、
`is:inline`ディレクティブを使用することができます

ここでは

1. `scripts/page.js` を読み`head`に追加されたことを確認しましょう。page.astroに含まれているscriptを`scripts`フォルダ、その中に`page.js`を作り、移動させてください

```js
// scripts/page.js
console.log("page")
```

開発ツールでNetworkを確認します
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-17.29.02.png" width=300>

Elementタブでheadに含まれていることを確認します

<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-17.30.09.png" width=300>


2. `script/page.ts`を読み込み`head`に追加されたことを確認しましょう
コードは適当に

```ts
export function add(a: number, b: number) {
  console.log(a + b);
}
add(1, 2);
```
とします

できたら`/page`で実行されていることを確認します
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-17.43.23.png" width=300>

NetWrorkでも確認します
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-17.43.07.png" width=300>

Elementタブでも確認します
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-17.43.32.png" width=300>

```js
// pages/page.astro
---
---

~省略~

<script src="../scripts/page.js" />
<script src="../scripts/page.ts" />
```


3. `is:inline`ディレクティブを使用して含まれていないことを確認しましょう

ここでは`date-fns`を読み込むことにします

```js
// pages/page.js
<script is:inline src="https://cdn.jsdelivr.net/npm/date-fns@2.29.3/+esm"></script>
```

書けたら確認してください

NetWorkタブから確認
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-18.25.33.png" width=300>

bodyタグ直前で読み込まれている様子
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-18.25.48.png" width=300>


[code](https://github.com/kenmori/astro-example/pull/10)

#### tailwindを使いたい場合

[ドキュメント](https://docs.astro.build/en/guides/integrations-guide/tailwind/#manual-install)

[tailwind/font-size](https://tailwindcss.com/docs/font-size)


astroで使うための｀@astrojs/tailwind`と実際の`tailwind-css`
をインストールする

 npm install @astrojs/tailwind tailwind-css

 `tailwind.config.cjs`をroot直下に作って以下をコピペ

 ```cjs
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
  },
};
 ```

astro.config.mjsに統合させる

 ```js
 // astro.config.mjs
 import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
});
```

これで使えるようになったはず

h1に `text-sm`を付与する

 ```js
 // index.astro, page.astro
  <h1 class="text-sm">Welcome to <span class="text-gradient">もりけん塾<span></h1>
```


[参照](https://docs.astro.build/en/guides/integrations-guide/tailwind/)

#### scssを使いたい場合

WIP

[参照](https://dev.to/askrodney/astro-js-sass-styling-scss-astro-setup-52l7)

#### classをlistで連結させる

WIP

### fetch API

WIP

### event

WIP


お疲れ様でした。
ハンズオンとしてはここまでです
別途ドキュメントを読みましょう

---

### 陥りやすいところ

- AstroではElementが入っている変数は大文字始まりでなくてはいけない

  - ```astro
    ---
    o const Element = <MyComponent />

    x const element = <MyComponent />
    ---
    <MyComponent>
    ```

### Astro vs JSX

```diff
- <div  className="box" dataValue="3"  />
+ <div  class="box" data-value="3"  />
```

## Astroの特徴

[ドキュメント](https://docs.astro.build/ja/concepts/islands/)

- 静的なHTML上で動的な部分(アイランド)をかける
- 並列ロード。優先順位の高いものから作られる
- [クライアントディレクション](https://docs.astro.build/ja/reference/directives-reference/#client-directives)
  - カルーセルなど表示に遅くなっているものは指示を出してスクロールされたらロードする、みたいに遅らせることができる

## トラブルシューティング

### stackblitz

#### ブランチ名を制御する

新たにブランチを切ってコミットをする際は、ファイル編集をする前に
ブランチを切って、その上で作業することをお勧めします
ブランチを切らずに作業をし「汚れた状態」からブランチを切ると
そのブランチは名前を決めることができず

このような名前
<img src="https://terracetech.jp/wp-content/uploads/2023/02/スクリーンショット-2023-02-18-10.45.48.png" width="300" />
で作られます
これを避ける為には、ブランチを切ってから作業をします


#### 変更が反映されない場合

- `stackblitz`上でやるとファイル名をリネームしたりすると、その後変更を検知してくれなくなり、ずーとエラーになる。効いてくれなくなる。その場合はsaveしたりcommitしたりしてリロードすると良い


- `stackblitz`上からブランチを切ると、選択肢が現れます。何も気にしないのであれば
現在の変更をstashとしてリモートブランチにpushすることを選択してそのままマージします
