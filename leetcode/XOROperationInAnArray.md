
# XOR Operation in an Array

## 2020/7/8

[XOR Operation in an Array](https://leetcode.com/problems/xor-operation-in-an-array/)

```js
const f = (n, start) => {
  let num = 0
 for(let i = 0; i < n; i++){
    num = num ^ start + 2*i
 }
 return num
}
// f(5, 0)
```
