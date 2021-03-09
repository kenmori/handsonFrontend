////////////////////////////////厳密等価と等価の違い///////////////////////////////////////////////////


厳密等価と等価

```js
const a = "1"
const b = 1
const c = 0
const d = ""

// 文字列と数値の比較
console.log(a == b) // true
console.log(a === b) // false


// 数値と真偽値の比較(等価)
console.log(b == true) // true
console.log(c == false) // true

// 数値と真偽値の比較(厳密等価)
console.log(b === true) // false
console.log(c === false) // false

// 空文字と真偽値の比較
console.log(d == false) // true
console.log(d === false) // false
```


