

```js
const a = [1,10,-1,11,5,0,-7,0,25,-35]
const moveZerosToLeft = function(a) {
    const ref = [...a]
    let com = 0
    let ins = 0
    for(ins = 1; ins < ref.length; ins++){
        var temp = ref[ins];
        for(com = ins - 1; com >= 0; com--){
            if(ref[com] > temp){
              ref[com + 1] = ref[com]
            } else {
              break
            }
        }
        ref[com + 1] = temp
    }
  return ref
};


const result = moveZerosToLeft(a)

console.log(result)
```
