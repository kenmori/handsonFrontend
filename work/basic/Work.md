# 言語ハンズオン

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
const output = input("入力") // 入力値を関数に渡す
console.log(output)
```

上の例だと

```txt
input "入力"
output "出力"
```

です

※例えば、問題文のoutputやinputが

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

です。どちらも同じ意味として捉えて構いません

※なるべく効率よく出力することを目指しましょう
※問題の番号は変更されることがあります。jsに問題文をコメント入れてコメントアウトしておくことをお勧めします

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

- Find `e`, and then return index of e as number

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
{sum: 10, ids: [{ 1: { value: 1 }, 2: { value: 2 }, 3: { value: 3 }, 4: { value: 4 }}]}
```

## 12

input

```js
[ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
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

input 3

output

3
2
1
0

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
{1: "a", 2: "b", 3: "c"}
```

output

```js
[['1', 'a'],['2', 'b'], ['3', 'c']]
```
## 18

Return the result of adding the elements next to each other as an array.

input

```js
[1, 2, 4, 10, 12]
```

output

```js
[3, 6, 14, 22]
```

## 19

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

## 20

[chunk](https://lodash.com/docs/4.17.15#chunk)

WIP

## 21

[difference](https://lodash.com/docs/4.17.15#difference)

WIP

-----

below is WIP

## 22

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

## 23

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

## 24

Don't use reduce, for

input

3456

output

17


## 25

input

```js
```

output

```js
```

## 26

input

```js
```

output

```js
```

## 27

input

```js
```

output

```js
```

## 参照
