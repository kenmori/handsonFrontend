# grid


なぜ`flex`ではだめなのか
使い所はどこか

## grid使い方

### 考え方

まずは

```css
display: grid
```

と書いたら
どのような形の連続にすればいいかを考える

- `column(カラム)列` (縦の線で作られるグリッドトラック)
- `row(ロー)行` (横の線で作られるグリッドトラック)



3列の

```css
header header header
content content content
footer  footer footer
```

だとしたら
3カラム(3列)
の
3ロー(3行)
と表せます

これをどのくらいの横幅と縦幅にしたいのかを考えます


### 横幅と縦幅を指定する

```css
header header header
content content content
footer  footer footer
```

#### カラムの幅指定

まずカラムの幅を指定します
指定するときは
例えば全ての列同じ幅で100pxにしたいなら

```css
grid-template-columns: 100px 100px 100px
```

とします
3列あるから100pxを3つ書きました

これは

```css
grid-template-columns: repeat(3, 100px)
```

とも書けます。
3列を100pxで繰り返すという意味です。
(この場合4列になった場合4つ目のグリッドトラックは下に落ちます)

では
次に行の高さ指定をしましょう

#### ローの幅指定

