# Big O notation Example JavaScript

## 計算量オーダーの概念

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

並び替えたものが正しく整列しているかどうかを確認するのが`bogo sort`

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

こちらの実行結果が正しく順序通りに並んでいるかを確認する(全コード)

```js

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function bogo_sort(numbers){
  const result = shuffle(numbers)
  return result
}

const result = bogo_sort([1, 2, 3, 4, 5]);

console.log(result) // どのようなランダム値になっているか

function is_in_order(numbers){
  console.log(numbers.length)
  for(let n = 0; n <= numbers.length; n++){
    if(numbers[n] > numbers[n+1]){
       return false // 順序どおり整列していない
    }
    return true // 整列している
  }
}
is_in_order(result)
```

## Bubble Sort(バブルソート)

`const list = [2, 5, 1, 8, 7, 3]`というリストに対して、隣同士比較をして、低い方を前にし、
全ての要素を評価したら、`limit(list.length -1)`に対して-1、さらに最初から隣同士を比較していく


```js
function bubble_sort(a){
  const limit = a.length -1
  for(let v = 0; v < limit; v++){
    for(let j = 0; j < limit -v; j++){
      if(a[j] > a[j+1]){
        var tem = a[j+1]
        a[j+1] = a[j]
        a[j] = tem
      }
    }
  }
  return a
}

const result = bubble_sort([2, 5, 1, 8, 7, 3])
// [1,2,3,5,7,8]
```

## cacktail sort(シェーカーソート)

バブルソートのように全てを比べなくても途中で終えられる

```js
var a = generateNumber(4)
console.log(a);

function sort(a){
  for(var i = 0; i < a.length; i++){
    for(var j = a.length-1; j > i; j--){
      if(a[j-1]> a[j]){
        var temp = a[j]
        a[j] = a[j-1]
        a[j-1] = temp
      }
    }
  }
  return a
}

const result = sort(a)

```
## select sort


### 参照

[JavaScript：配列内の要素をシャッフル（ランダムソート）する方法](https://www.nxworld.net/tips/js-array-shuffle.html)

[計算量オーダーの求め方を総整理！〜どこからlogが出て来るか〜](https://qiita.com/drken/items/872ebc3a2b5caaa4a0d0)

[現役シリコンバレーエンジニアが教えるアルゴリズム・データ構造・コーディングテスト入門](https://www.udemy.com/course/python-algo/)
