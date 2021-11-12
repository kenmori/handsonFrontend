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

## 1

input: `"abc"`
output: `["a", "b", "c"]`

## 2

input: `["a", "b", "c"]`
output: `"abc"`

## 3

- Find `e`, and then return index of e as number

input: `"abcdefd"`
output: `4`

## 4

- Filter odd number

input `[1, 2, 3, 4, 5, 6, 7]`
output `[1, 3, 5, 7]`

## 5

- map

input `["a", "b", "c"]`
output `{0: "a", 1, "b", 2: "c"}`

## 6

- map

input `["a", "b", "c"]`
output `{a: 0, b: 1, c: 2}`

## 7

input `["a", "b", "c"]`
output `{sum: "abc", length: 3}`

## 8

input `["a", "b", "c"]`
output `[{0: "a"}, {1: "b"}, {2: "c"}]`

## 9

Serch "e" element, if not exist, return false

input `["a", "b", "c"]`
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
