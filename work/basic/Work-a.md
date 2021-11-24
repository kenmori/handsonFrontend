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
