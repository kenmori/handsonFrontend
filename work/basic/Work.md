# 言語チャレンジ

この課題の進め方

`input`の値を`output`の値として出力すること

関数の引数に入力を渡し、実行した結果(出力)をconsole.logで示してください

例えば

```js
function input (pram){
 // ここを実装して返す
 // pramを出力の値に変換する
 return "出力" //　出力値
}
 // 入力値を実行した結果をoutput。値を出力する
```

上の例だと

```txt
input "入力"
output "出力"
```

です

また、問題文のoutputやinputが

```js
{0: "a", 1, "b", 2: "c"}
```

のような記述の場合
node上でコンソール出力すると

```js
{"0": "a", "1", "b", "2": "c"}
```

になります。
`ChromeDevTools`の`Console`上では

```js
{0: "a", 1, "b", 2: "c"}
```

です。
どちらも同じ意味として捉えて構いません

※なるべく効率よく出力することを目指しましょう
※問題の番号は変更されることがあります。jsに問題文をコメント入れてコメントアウトしておくことをお勧めしますoi

## スタンス

言語チャレンジはあくまでinputとoutputがあっているかを主眼を置いていて
必ずしも森田の`apporve`が森田のベストの解答ということではないです(森田ならこう書くみたいなところは伝えていないです)
それには理由があります

- input outputの型があっているので答えとしては問題ない
- もっといい方法や書き方、改善まで全ての人にレビューしていく、教えるのは大変
- 森田にとってのベストの解答が塾外の誰かが見た時にそうではない
- 自分なりのベストを調べ尽くしてほしい
- サクサク進めることで言語を学ぶ楽しさを味わってほしい

と思っているからです
そこのところをうまい具合に補足していただけると助かります

## お願い

今後は言語チャレンジのPRフォーマットは以下です

---
# [Lesson3](https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md#3)

input:  "abcdefd"
output: 4

## [Stackblitz](https://stackblitz.com/edit/node-npnpq6?file=users/yukamuramatsu/3.js)
Last commit: [d7076ec](https://github.com/kenmori/node-morikenjuku/commit/d7076ec7ad4c351f0a802dbef6c5a78e6d49471b)

`node ./users/yukamuramatsu/3.js`

---

でお願いしたいです。
https://github.com/kenmori/node-morikenjuku/pull/45

特にみやすいと思ったのを決めでやってます

あと、[number].jsの中に

// input:  "abcdefd"
// output: 4

をコメントアウトして書いてもらえますか

---

## getting start

でははじめましょう
## 1

input:

```js
"abc"
```

output:

```js
["a", "b", "c"]
```

## 2

input:

```js
["a", "b", "c"]
```

output:

```js
"abc"
```

## 3

- Find `e`, and then return index of e as number.

input:

```js
"abcdefd"
```

output: `4`

## 4

- Filter odd number

input

```js
[1, 2, 3, 4, 5, 6, 7]
```

output

```js
[1, 3, 5, 7]
```

## 5

- map

input

```js
["a", "b", "c"]
```

output

```js
{0: "a", 1, "b", 2: "c"}
```

## 6

- map

input

```js
["a", "b", "c"]
```

output

```js
{ a: 0, b: 1, c: 2 }
```

## 7

input

```js
["a", "b", "c"]
```

output

```js
{sum: "abc", length: 3}
```

## 8

input

```js
["a", "b", "c"]
```

output

```js
[{0: "a"}, {1: "b"}, {2: "c"}]
```

## 9

Search "e" element, if not exist, return false

input

```js
["a", "b", "c"]
```

output `false`

## 10

input:

```js
[
  { id: "a", value: 1 },
  { id: "b", value: 2 },
  { id: "c", value: 3 }
]
```

output:

```js
{
  ids: ["a", "b", "c"],
  entities: {
    a: { value: 1 },
    b: { value: 2 },
    c: { value: 3 }
  }
}`
```

## 11

input

```js
[1, 2, 3, 4]
```

output

```js
{
  sum: 10,
  ids: [
    {
      1: { value: 1 },
      2: { value: 2 },
      3: { value: 3 },
      4: { value: 4 }
    }
  ]
}
```

## 12

input

```js
[
  ['0', 'a'],
  ['1', 'b'],
  ['2', 'c']
]
```

output

```js
{ 0: "a", 1: "b", 2: "c" }
```

## 13

input

```js
 { a: 1, b: 2, c: 3 }
 ```

 output

 ```js
  { a: 2, b: 4, c: 6 }
```

## 14

input

```js
'type=listing&page=2&rowCount=10'
```

output

```js
{type: "listing", page: "2", rowCount: "10"}
```

## 15

Create countDown function.

Don't write

```js
function a(){
  count(3)
  count(2)
  count(1)
  count(0)
}
```

input

```js
3
```

output

```js
3
2
1
0
```

## 16

input

```js
"abcdefg"
```

output

```js
"gfedcba"
```

don't use reverse method

## 17

input

```js
{ 1: "a", 2: "b", 3: "c" }
```

output

```js
[
  ['1', 'a'],
  ['2', 'b'],
  ['3', 'c']
]
```

## 18

input

```js
[
  ["1","2"],
  [[[3]]]
];
```

output

```js
['1', '2', '3']
```

## 19

input

```js
[1, 1, [2, 2], [[3, [4], 3], 2]]
```

output

```js
[1, 1, 2, 2, 3, 4, 3, 2]
```

## 20

Return the result of adding the elements next to each other as an array.

input

```js
[1, 2, 4, 10, 12]
```

output

```js
[3, 6, 14, 22]
```

## 21

Add the numbers in the same index of the two arrays and return to the new array.

input

```js
[1, 2, 3, 4, 5]
```

and

```js
[3, 4, 5, 10, 9]
```

output

```js
[4, 6, 8, 14, 14]
```

## 22

input

```js
 ["a", "b", "c", "d"]
 ```

 and 2

 output

 ```js
  [["a", "b"],["c", "d"]]
  ```

input

```js
 ["a", "b", "c", "d"]
 ```

 output

 ```js
  [["a", "b","c"], ["d"]]
  ```

## 23 intersection

input

```js
[2, 1], [2, 3]
```

output

```js
[2]
```

and

input

```js
[5, 1], [2, 6]
```

output

```js
[]
```

and

```js
[2, 1, 6], [2, 3, 6]
```

output

```js
[2, 6]
```

## 24

*two sum*

Please return the combination of the second argument, the element whose value is the sum. If not, return false

input

```js
[1, 9, 10, 3, 4, 2, 6]
```

and

```js
8
```

output

```js
[2,6]
```

if second input is 3, return [1, 2]
if second input is 20, return false

don't use `for(){ for(){}}`

## 25

中間と一番最初を抜き取る

input

```js
[1, 2, 3, 4, 5, 6, 7 ,8 ,9, 10]
```

output

```js
[5, 2, 1]
```

input

```js
[1, 2, 3, 4, 5, 6, 7 ,8 ,9, 10, 11]
```

output

```js
[6, 3, 1]
```

input

```js
[1, 2, 3, 4, 5, 6, 7 ,8 ,9, 10, 11, 12, 13, 14, 15]
```

output

```js
[8, 4, 2, 1]
```

## 26

Don't use reduce, for

input

```js
3456
```

output

```js
17
```


## 27

input

use recursion (call function in function)

```js
[1, 2, 3, 4, 5]
```

output

```js
15
```

## 28

Remove "not", "so" element. not use Iterator method(map, forEach,...etc) and Iterator(for, while)

input

```js
['today', 'was', 'not', 'so', 'great']
```

output

```js
[['today', 'was', 'great'], ['not', 'so']]
```

## 29

no debule

input

```js
["a", "b", "c", "a", "c", "d"]
```

output

```js
["a", "b", "c", "d"]
```

## 30

ランダムな数字があります。昇順のユニークな要素配列とそのユニーク要素が何回出現したかを表す配列を出力してください。for文で実装すること

input

```js
[2, 2, 5, 2, 2, 2, 4, 5, 5, 9];
```

output

```js
[[2,4,5,9], [5,1,3,1]]
```

## 参照
