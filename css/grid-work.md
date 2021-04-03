# 触って覚えるCSSのgrid

[author](http://kenjimorita.jp/)

[ハンズオンコード](https://codesandbox.io/s/interesting-sea-vmwmk?file=/index.html)

## 基本用語

`display: grid`を指定した箇所はグリッドコンテナと呼ばれます

<img src="https://terracetech.jp/wp-content/uploads/2021/04/grid-P1.png" width="400" />

グリッドコンテナ直下の要素は全てグリッドアイテムと呼ばれます

<img src="https://terracetech.jp/wp-content/uploads/2021/04/grid-P2.png" width="400" />

それぞれのグリッドアイテムの境界線のことをラインと呼びます。

<img src="https://terracetech.jp/wp-content/uploads/2021/04/grid-P3.png" width="400" />


グリッドアイテムをつなげた範囲をエリアと言います

<img src="https://terracetech.jp/wp-content/uploads/2021/04/grid-P4.png" width="400" />


エリアには名前がつけることができます

<img src="https://terracetech.jp/wp-content/uploads/2021/04/grid-P5.png" width="400" />



## display: grid

```html
    <style type="text/css">
      .grid {
        display: grid;
      }
      .grid-item {
        background: pink;
      }
    </style>
  </head>
  <body>
    <div class="grid">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">4</div>
      <div class="grid-item">5</div>
      <div class="grid-item">6</div>
      <div class="grid-item">7</div>
      <div class="grid-item">8</div>
      <div class="grid-item">9</div>
    </div>
  </body>
```

## 3列を作る

`grid-template-columns`

<img src="https://terracetech.jp/wp-content/uploads/2021/04/2.png" width="400" />

```css
.grid {
    display: grid;
    grid-template-columns: 100px 100px 100px;
}
```

### 3行を作る

<img src="https://terracetech.jp/wp-content/uploads/2021/04/3.png" width="400" />

`grid-template-rows`

```css
.grid {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
}
```

## このままだとコンテンツが多い場合溢れてしまいます

<img src="https://terracetech.jp/wp-content/uploads/2021/04/4.png" width="400" />


## autoを指定する

<img src="https://terracetech.jp/wp-content/uploads/2021/04/5.png" width="400" />

```css
.grid {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px auto 100px;
}
```

## 1列目も可変にする

<img src="https://terracetech.jp/wp-content/uploads/2021/04/6-1.png" width="400" />

```css
.grid {
    display: grid;
    grid-template-columns: auto 100px 100px;
    grid-template-rows: 100px auto 100px;
}
```

autoにすると要素が足りない時

<img src="https://terracetech.jp/wp-content/uploads/2021/04/6-2.png" width="400" />

こうなる

そのような場合


## minmax

minmaxで制御する

<img src="https://terracetech.jp/wp-content/uploads/2021/04/6-3.png" width="400" />


```css
.grid {
    display: grid;
    grid-template-columns: auto 100px 100px;
    grid-template-rows: 100px minmax(100px, auto) 100px;
}
```

最小100pxで最大はauto

### 最小の値に最大の値より大きい値は指定できない

```css
100px minmax(200px, 100px) 100px
```

は

```css
grid-template-rows: 100px 200px 100px;
```

と同じ意味になる

### minの値に1fr(後述)は指定できない


## gap

<img src="https://terracetech.jp/wp-content/uploads/2021/04/7.png" width="400" />

一旦こちらの指定にしてください

余白をつけてみましょう

```css
.grid {
    display: grid;
    gap: 10px; /* add */
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px minmax(100px, auto) 100px;
}
```

gap: 10px
grid-gapはoldな書き方
gap: <grid-row-gap> <grid-column-gap>;
なので gap: 10px 10px
と同じ意味


## colum間でgapをつけたい

<img src="https://terracetech.jp/wp-content/uploads/2021/04/8.png" width="400" />

```css
.grid {
    display: grid;
    gap: 10px 5px;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px auto 100px;
}
```

## repeat

`repeat`は(繰り返す数, 幅or高)を指定します

<img src="https://terracetech.jp/wp-content/uploads/2021/04/9.png" width="400" />


```css
.grid {
    display: grid;
    gap: 10px 5px;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: 100px auto 100px;
}
```

## repeatの中で使えるauto-fill

<img src="https://terracetech.jp/wp-content/uploads/2021/04/10.png" width="400" />
のように開発ツールの幅を変えてください

```css
.grid {
    display: grid;
    gap: 10px 5px;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: 100px auto 100px;
}
```
`auto-fill`を使うと親要素の分だけ空のカラムを作ります

<img src="https://terracetech.jp/wp-content/uploads/2021/04/11.png" width="400" />


## repeatの中で使えるauto-fit

```css
.grid {
    display: grid;
    gap: 10px 5px;
    grid-template-columns: repeat(auto-fit, 100px);
    grid-template-rows: 100px auto 100px;
}
```
`auto-fill`を使うと親要素が広がった分だけカラムを作ります

<img src="https://terracetech.jp/wp-content/uploads/2021/04/12.png" width="400" />

少しわかりづらいのでHTMLをこのようにしてください

```html
   <div class="grid">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
    </div>
```

## 1fr

`1fr(1フラクション)`。fractionとは分数。

こちらを指定

```css
.grid {
    display: grid;
    gap: 10px 5px;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-template-rows: 100px auto 100px;
}
```

auto-fillはこのようになり
<img src="https://terracetech.jp/wp-content/uploads/2021/04/13.png" width="400" />

これは 最小は100pxだがそれを越えれば残りの余ったスペースを新たな空のグリッドで埋めて（フィルして）くれます

```css
.grid {
    display: grid;
    gap: 10px 5px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: 100px auto 100px;
}
```

auto-fitはこのようになります

これは 最小は100pxだがそれを越えれば余ったスペースは0になり、それぞれのカラムが1frになります。[仕様](https://drafts.csswg.org/css-grid/#auto-repeat)

<img src="https://terracetech.jp/wp-content/uploads/2021/04/14.png" width="400" />

### grid-template-columns: 1fr 1fr 2fr

```css
.grid {
    display: grid;
    gap: 10px 5px;
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 100px auto 100px;
}
```

とはどんな状態でしょうか
は分母4で、3カラム目が2/4であとは1/4ずつ

<img src="https://terracetech.jp/wp-content/uploads/2021/04/15.png" width="400" />


### repeat(3, 1fr) auto;`の意味は？


```html
   <div class="grid">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">ファ</div>
    </div>
```

上記のようにしてください


```css
.grid {
    display: grid;
    gap: 10px 5px;
    grid-template-columns: repeat(3, 1fr) auto;
    grid-template-rows: 100px auto 100px;
}
```

autoのコンテンツ幅を引いたものを3つに分ける4カラムなもの

<img src="https://terracetech.jp/wp-content/uploads/2021/04/16.png" width="400" />

## align-content: center

```html
   <div class="grid">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">4</div>
    </div>
```

```css
.grid {
    display: grid;
    gap: 10px 5px;
    height: 400px;
    background: #e0e0e0;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: 100px 100px 100px;
}
```

heightとbackgroundを足したあと
さらに
`align-content: center;`
を指定してみてください

<img src="https://terracetech.jp/wp-content/uploads/2021/04/17.png" width="400" />


グリッドコンテナ自体がheightに対して真ん中にきました

## align-item

align-itemをするとグリットアイテム内のコンテンツの位置が変わることに注目してください

<img src="https://terracetech.jp/wp-content/uploads/2021/04/18.png" width="400" />

## justfiy-self

<img src="https://terracetech.jp/wp-content/uploads/2021/04/19.png" width="400" />

グリッドアイテムに指定します。グリッドアイテム内のコンテンツ始まり位置を制御します



## align-self

<img src="https://terracetech.jp/wp-content/uploads/2021/04/20.png" width="400" />

グリッドアイテムに指定します。グリッドアイテム内のコンテンツ始まり位置を制御します

## grid-template

<img src="https://terracetech.jp/wp-content/uploads/2021/04/21.png" width="400" />

`grid-template`は
`grid-template-rows`と`grid-template-columns`のショートハンドです


```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
}
```

は

```css
.grid {
    display: grid;
    grid-template:
        ". . ."100px
        ". . ." 100px
        ". . ." 100px / 100px 100px 100px;
}
```

のように書くことができます。`". . ."`はグリッドアイテムの名前です。`header heafer herfer`でもなんでも良いです(後述)。「エリアには名前がつけることができます」を思い出してください

## 課題

1.
<img src="https://terracetech.jp/wp-content/uploads/2021/04/grid-P6.png" width="400" />


2.
<img src="https://terracetech.jp/wp-content/uploads/2021/04/grid-P7.png" width="400" />

3.

<img src="https://terracetech.jp/wp-content/uploads/2021/04/grid-P8.png" width="400" />