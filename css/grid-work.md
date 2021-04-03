# 触って覚えるCSSのgrid

[ハンズオンコード](https://codesandbox.io/s/interesting-sea-vmwmk?file=/index.html)

## 基本用語



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

2.png

```css
.grid {
    display: grid;
    grid-template-columns: 100px 100px 100px;
}
```

### 3行を作る

3.png
`grid-template-rows`

```css
.grid {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
}
```

## このままだとコンテンツが多い場合溢れてしまいます

4.png

## autoを指定する

5.png

```css
.grid {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px auto 100px;
}
```

## 1列目も可変にする

6-1.png

```css
.grid {
    display: grid;
    grid-template-columns: auto 100px 100px;
    grid-template-rows: 100px auto 100px;
}
```

autoにすると要素が足りない時

6-2.png
こうなる

そのような場合


## minmax

minmaxで制御する

6-2.png

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

7.png

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

8.png

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

9.png

```css
.grid {
    display: grid;
    gap: 10px 5px;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: 100px auto 100px;
}
```

## repeatの中で使えるauto-fill

10のように開発ツールの幅を変えてください

```css
.grid {
    display: grid;
    gap: 10px 5px;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: 100px auto 100px;
}
```
`auto-fill`を使うと親要素の分だけ空のカラムを作ります

11.png


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

12.png

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
13

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

14.png

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

15.png


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

16.png

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

17.png

グリッドコンテナ自体がheightに対して真ん中にきました

## align-item

align-itemをするとグリットアイテム内のコンテンツの位置が変わることに注目してください

18.png

## justfiy-self


グリッドアイテムに指定します。グリッドアイテム内のコンテンツ始まり位置を制御します

19.png

## align-self

グリッドアイテムに指定します。グリッドアイテム内のコンテンツ始まり位置を制御します

## grid-template

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

のように書くことができます。`". . ."`はグリッドアイテムの名前です。`header heafer herfer`でもなんでも良いです(後述)

