```js
/// こう言うのがあったら if文を書くのは冗長
const f = (status) => {
  if(status === "a") return true
  if(status === "b") return true
  if(status === "c") return true
  if(status === "d") return true
  if(status === "e") return true
  return false
}

console.log(f("a"))

/// それぞれの返値をマップしたオブジェクトを用意して
const obj = {
 a: true,
 b: true,
 c: true,
 d: true,
 e: true,
 f: false
}

/// indexにして返す
const f2 = (status) => {
  return obj[status]
}

console.log(f2("a"))

/// 何かbool値ではなく、実行したい関数があるなら
const fnA = () => true
const fnB = () => true
const fnC = () => true
const fnD = () => true
const fnE = () => true
const fnF = () => false
const obj3 = {
  a: fnA,
  b: fnB,
  c: fnC,
  d: fnD,
  e: fnE,
  f: fnF
 }
 ///　対応したものを実行する
 const f3 = (status) => {
   return obj3[status]()
 }
 console.log(f3("a"))
```