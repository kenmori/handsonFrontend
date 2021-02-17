# 【鍛えよう】reduceの使い方。reduceに強くなる記事。how to use reduce

reduceって何？

- `reduce`とは`Array`が持つメソッド

[reduce仕様書](https://262.ecma-international.org/9.0/#sec-array.prototype.reduce)

使い方は?

```js
["a", "b"]
```

配列に対して

```js
["a", "b"].reduce(f, initValue)
```

このように使います。

`f`は`関数`です。
`initValue`は`初期値`です。初期値はOption(なしでもいい)です。

配列の中身、この場合

`a`と `b`
に対して

`f`

で書かれたことを
**(初期値を渡さない場合)要素数-1だけ実行します**

ちょっと実際やってみましょう

accumulation(蓄積、積み重ね) アキュムレーター

 ```js
const strArray = ["a", "b", "c"] // 配列

const a = strArray.reduce((p, c) => p + c)
a // "abc"
 ```


何が起きたのでしょうか

```js
const a = strArray.reduce((p, c) => p + c)
```

reduceに渡している

```js
(p, c) => p + c
```

は関数です

これは `p + c`

をして結果を返しています

```js
const f = (p, c) => p + c
const a = strArray.reduce(f)
```

先ほどの例題と同じになりました

reduceの第二引数に初期値は渡してません

`reduce`に渡してた`f`は`strArray`の

**(初期値を渡さない場合)要素数-1だけ実行します**

```js
const strArray = ["a", "b", "c"] // "a" "b" "c"が入っているので
const f = (p, c) => p + c // 2(3-1)回これが実行される
const a = strArray.reduce(f) // 初期値は渡していない
```

1回目

```js
const f = ("a", "b") => "a" + "b"
const a = strArray.reduce(f)
```

2回目

```js
const f = ("ab", "c") => "ab" + "c"
const a = strArray.reduce(f)
a // "abc"
```

になります

ここで[reduceの構文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)をみましょう

`reduce`の`f`には

```js
const f = (p, c, i, a) => {}
```

4つの引数が渡ってきます(先ほどはiとaを使いませんでした)、

それぞれ、

```js
p(前回の値), c(現在の値), i(インデックス), a(配列) // それぞれprevious, current, index, arrayの略です
```

です。

これらを使って値を返します。(ここら辺は実際に手を動かしてまた後ほど話します)

今はreduceの第一引数に渡した関数から4つの仮引数が渡ってくるんだと覚えておいてください


`["a", "b"].reduce(f, initValue)`

の

reduceメソッドの第二引数に渡す`initValue`とはなんでしょう。

これは

reduceが最終的に返す型で

**最初に`f`の`p`に渡ってくる型です**


initValueを省略することもできます。

`["a", "b"].reduce(f)`

その場合

aに渡ってくるのは

```js
["a", "b"].reduce(f)
```

`"a"`です

`initValue`を指定する場合と指定しない場合で動きが変わることに注意です。ここが大事です

- initValueを指定した場合
  - 最初の`p`にはその値が渡ってきます
- `initValue`を指定しない場合
  - 最初の`p`には配列の最初の要素が渡ってきます


でどんな時使うの？

- 配列に入っている要素を違う**型**に変更して返したいとき

型ってなぁに

- 簡単にいうとデータ構造の形

`型`とは

例えば

```js
"a"
```

は`string`

ですね。

では

```js
1
```

は?

`number`

です。

`string`と`number`では使えるメソッドも違います。型が違うからです。

型とはわかりやすくいうと

`生まれてきた親が違う`と思っておいてください

`string`は

```js
const a = "a" // ここで`string`として生まれました。以降aに入っているのは`stringです
```

```js
const b = 1 // ここでnumberとして生まれました。以降bに入っているのは`numberです
```

`typeof a // "string"`

`typeof b // "number"`

簡単にいうとこれが型です。

では配列はどうでしょう

配列の型は

`[]`

のように表現します

```js
const c = [] // 配列として生まれた
```

オブジェクトは?

```js
{}
```

です。

```js
const d = {} // オブジェクトとして生まれた
```

ではこちら

```js
["a", "b"]
```

こちらは型としてどう表現したらいいと思いますか?

配列にstring型が入っています

配列に入っている要素が`string`型の場合を型で示す時はこのように表現します

`string[]`


じゃあこれは?

```js
[1, 2]
```

配列に入っている要素が`number`


```
number[]
```

です。

配列`[]`に入っているのは`number型`だからです。

ではこれはどうでしょう。

```
[{id: 1, name: "a"}]
```
型としてはどういう表現になるでしょう

```
{id: number, name: string}[]
```
型としてはこのような表現になります。

`id`と`name`のプロパティはそれぞれ`1`という`number`、

`name`は`"a"`という`string`を持った、

`オブジェクト型(誤解が生じやすいところです)`です。

これが配列の要素になっています。

これはどうでしょう。同じ形のプロパティの型は同じですが違う値です。

```js
[{id: 1, name: "a"}, {id: 2, name: "b"}]
```

これも型で表現する場合同じです

```
{id: number, name: string}[]
```

です。

だんだん型が何かわかってきましたか。じゃあ、

```js
{id: 1, name: "a", friends: ["b", "c", "d"]}
```

はどうでしょう。

ある構造(ここではidや`name`プロパティを持った)をしているオブジェクトに`friends`は`string`を要素にもつ配列を持っています。

`型`としてはどのような表現になるでしょう

```js
{id: number, name: string, friends: string[]}
```

ですね。

では本題です

reduceを使いたいとき

- 配列に入っている要素を違う型に変更して返したいとき

とは...



## 1 配列の要素全てを連結する

 ```js
const strArray = ["a", "b", "c"] // 配列

const a = strArray.reduce((a, c) => a + c)
a // "abc" // string[] -> string
 ```

 // `string[]` が `string`として返ってきました

## 2 配列の要素全てを加算する

`number[]`はどうでしょう

```js
const numrrArray = [1, 2, 3]

const b = numrrArray.reduce((a, c) => a + c)

b // 6
```

`1`,`2`,`3`を全て足して`6`として返りました

つまり

`number[]`が`number`

## 3 あるプロパティの値をkey(プロパティ)にしたオブジェクトを返す

```js
[{id: 1, name: "a"}, {id: 2, name: "b"}]
```

の型は

```js
{id: number, name: string}[]
```

これを

```js
{1: {id: 1, name: "a"}, 2: {id: 2, name: "b"}}
```
にするには

```js
const c = [{id: 1, name: "a"}, {id: 2, name: "b"}]
c.reduce((a, c) => {
 return {...a, [c.id]: c}
}, {})

c // {1: {id: 1, name: "a"}, 2: {id: 2, name: "b"}}
```

### avarage

 ```js
 [10, 30, 2000].reduce((a, n, i, arr) => {
   if(i === arr.length -1){
    const result = a + n
    return result / 2
   }
   return a + n
})
```

### WIP

```js
let arr = [3.24, 2.78, 999];
arr.reduce((x, y) => Math.max(x, y));
arr.reduce((x, y) => Math.min(x, y));
```

Flat multipul array

```js
function Flat(arr = []) {
    return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), [])
}
```

### 仕様

- 空配列には初期値を与えないとTypeError

```js
[].reduce(() => {});
// TypeError: Reduce of empty array with no initial value
```

- originalなarrayに追加しても呼ばれない

```js
const f = (a, c, index, arr) => {
  if(index === 0) arr.push("d")
  return a + c
}
const strArray = ["a", "b", "c"]
const a = strArray.reduce(f)
a // "abc"
```

- original arrayの要素が途中で変更された場合、その要素が使われる

```js
const f = (a, c, index, arr) => {
  arr[2] = "3"
  return a + c
}
const strArray = ["a", "b", "c"]
const a = strArray.reduce(f)

console.log(a) // "ab3"
```

- 途中で削除された要素は呼ばれない

```js
const f = (a, c, index, arr) => {
  if(index === 0) arr.push("d")
  delete arr[2] // here
  return a + c
}
const strArray = ["a", "b", "c"]
const a = strArray.reduce(f)

console.log(a) // "ab"
```

- 要素がない場合はないものとみなし飛ばされます

```js
const f = (a, c, index, arr) => {
  if(index === 0) arr.push("d")
  delete arr[2]
  return a + c
}
const strArray = [, "b", "c"]
const a = strArray.reduce(f)

console.log(a) // "ac"
```
