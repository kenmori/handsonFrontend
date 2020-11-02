# Big O notation Example JavaScript

## 計算量オーダー
計算の実行にどのくらい時間がかかるかがわかる

### O(1)

```js
function1(numbers){
  return numbers[0]
}
```

どんなにnumbersが増えても一番目のものを返しているの処理が1

### O(log(n))

10を渡しても10回呼ばれるわけではない

```js
function fn2(n){
 if(n <= 1){
   return
 } else {
   console.log(n)
   fn2(n/2)
 }
}

fn2(10)

// 10
// 5
// 2.5
// 1.25
```

logとは...WIP


O(n) // nが増えれば増えるほど右肩上がりに上がっていく

```js

function fn(n){
  n.forEach((n => console.log(n)))
}
fn([1, 2, 3, 4, 5]);
```

## ソート

### bogo(ボゴソート)

arrayをshuffleするコード

```js
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
```

実行

```js
function bogo_sort(numbers){
  const result = shuffle(numbers)
  console.log(result)
}

bogo_sort([1, 2, 3, 4, 5]);
```


