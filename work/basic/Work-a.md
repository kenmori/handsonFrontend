## 15

```js
function a(arr){
    let first = 0;
    let last = arr.length -1
    let mid
    let result = []
    while(first <= last){
        mid =  Math.floor((first + last) / 2)
        result.push(arr[mid])
        last = mid -1
    }
    return result
}

```

## 18

```js
function sumOfDigits(num){
 if(num == 0){
        return 0
    }
    return num % 10 + sumOfDigits(Math.floor(num / 10))
}
console.log(sumOfDigits(3023))
```


## 19


[...arr.toString().split(",")]

## sum

```js
function sum(arr){
    if(arr.length === 0){
       return 0
    } else {
        const [head, ...tail] = arr
        return head + sum(tail)
    }
}
sum([1, 2, 3, 4, 5])
```

## 30

```js
const arr = [2, 2, 5, 2, 2, 2, 4, 5, 5, 9];

function foo (array) {
  let a = [],
    b = [],
    arr = [...array], // clone array so we don't change the original when using .sort()
    prev;

  arr.sort();
  for (let element of arr) {
    if (element !== prev) {
      a.push(element);
      b.push(1);
    }
    else ++b[b.length - 1];
    prev = element;
  }

  return [a, b];
}
```



## 参照

[30](https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements)
