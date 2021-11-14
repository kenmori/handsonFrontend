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

Serch "e" element, if not exist, return false

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

## 13

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

## 14

two sum

input

```js
[1, 9, 10, 3, 4, 2, 9]
```

and

```js
18
```

output

```js
[9,9]
```

if second input is 17, return false

## 15

input

```js
[
  {
    value: 1,
    children: [
      { value: 1, children: [ { value: 1, children: []}] }
    ]
  },
  { value: 2,
    children: [
      { value: 1, children: [ { value: 1, children: [{value: 1: children:[]
        }]}]
      }
    ]
  }
]
```

output

```js

```

## 11

input

```js
```

output

```js
```

## 11

input

```js
```

output

```js
```

## 11

input

```js
```

output

```js
```

## 11

input

```js
```

output

```js
```