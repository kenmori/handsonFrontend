# 「tailwindCSS初学者の為の使い方　・チートシート」ハンズオン

<img src="https://kenjimorita.jp/wp-content/uploads/2022/07/twailwindcss.png" width=400 />

[tailwind](https://tailwindcss.com/)とは

HTMLから離れることなく、モダンなウェブサイトを迅速に構築できるもの

flex, pt-4, text-center, rotate-90 などのクラスを備えたユーティリティ優先の CSSフレームワークで、

マークアップに直接組み込んで、あらゆるデザインを構築することができます。


[tailwindcss github](https://github.com/tailwindlabs/tailwindcss)
[tailwind document](https://tailwindcss.com/)
[tailwind-css](https://flowbite.com/tools/tailwind-cheat-sheet/)

ユーティリティCSSに至る考えが分かる資料

[CSS Utility Classes and "Separation of Concerns"
](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)


[ユーティリティファーストの基礎](https://tailwindcss.com/docs/utility-first)
概要
- 今まではクラスをあてていた
- クラス名を考える(発明する)エネルギーを浪費しない
- 新しいCSSを追加する必要はない。
- 変更を加える方が安全

インラインスタイルを当てないのはなぜ
- 値がマジックナンバーになる
- インラインではレスポンシブデザインができない
- インラインではホバー、フォーカス、およびその他の状態をスタイルできない

にしても醜くない？保守性は？
- 
# 1

npm create vite@latest


```
❯ npm create vite@latest

Need to install the following packages:
  create-vite@latest
Ok to proceed? (y) y
✔ Project name: … vite-project
✔ Select a framework: › vanilla
✔ Select a variant: › vanilla

Scaffolding project in /Users/kenjimorita/git/handsonFrontend/tailwindcss/vite-project...

Done. Now run:

  cd vite-project
  npm install
  npm run dev
```

## 2

cd vite-project

npm i


npm run dev

ドキュメント

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init



## 3

`postcss.config.cjs`を作成

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

## 4

tailwind.config.js

```
module.exports = {
  content: [
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```


## stylecss

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

baseレイヤー・・・リセットルールやプレーンHTML要素に適用されるデフォルトスタイルなどのためのものです。
componentsレイヤー・・・ユーティリティでオーバーライドできるようにするクラスベースのスタイル用です。
utilitiesレイヤー・・・他のスタイルよりも常に優先される、小さな単一目的のクラス用です。

## main.jsを編集

```js
import './style.css'
```

## html

```html
    <div class="bg-red-500">
      hello
    </div>
```

```html
    <div class="text-3xl font-bold underline">
      hello
    </div>
```

advance

## カスタムCSSをスタイルシート

@layerディレクティブ・・・実際のコードを好きなように整理しながら、最終的な宣言の順序を制御できます。

知っておくとより理解が深まること

[](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer)


## 課題

1.

このhtmlをflexを与え、itemのwidthは画面3等分にしてください
```html
  <div class="text-3xl font-bold underline">
      <div class="">1</div>
      <div class="">2</div>
      <div class="">3</div>
    </div>
```

2.

hoverしたらopacityが20になるように指定してください

3.

```html

<ul role="list">
  <li>1</li>
  <li>2</li>
  <li class="[&:nth-child(3)]:underline">3</li>
</ul>
```


4. メディアクエリを使ってモバイルの時はflex-directionをrowにする。それ以外はcolumnにする

```html

<ul role="list" class="">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

5. 設定ファイルのthemeをいじってブレイクポイントを設定しましょう




4.
独自のクラスを作りましょう



## playgorund

[playground](https://play.tailwindcss.com/9iY0s9qJ98?size=540x720)

# 1

```html
<div class="flex text-3xl font-bold underline">
      <div class="w-1/3">1</div>
      <div class="w-1/3">2</div>
      <div class="w-1/3">3</div>
    </div>
```

## 2

```html
<div class="flex text-3xl font-bold underline">
      <div class="w-1/3 hover:opacity-20">1</div>
      <div class="w-1/3">2</div>
      <div class="w-1/3">3</div>
    </div>
```


###4

```js
 theme: {
    screens: {
      small: '500px',
      medium: '800px',
      large: '1024px',
    },
  },
```