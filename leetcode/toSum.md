
2020/7/5

[two-sum](https://leetcode.com/problems/two-sum/)

```js
const nums = [1, 4, 100, 5, 5, 9]
const target = 104
const twoSum = function(nums, target) {
    let result
   for(let i = 0; i < nums.length; i++){
    if(nums[i] + nums[i+1] === target){
     result = [i, i+1]
    }
 }
 return result
};

const result = twoSum(nums, target)
console.log(nums[result[0]] + nums[result[1]] === target)
```

