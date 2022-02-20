const binarySearch = (nums, targetValue) => {
  let first = 0;
  let last = nums.length;
  let isFind = false;
//   let index = undefined
  while(!isFind && first <= last){
    //   const mid = Math.floor(last / 2)
      let mid = Math.floor(last / 2)
      if(nums[mid] > targetValue){
          last = mid -1
      } else if(nums[mid] < targetValue) {
          first = mid + 1
      } else {
          isFind = true
          return mid
      }
  }
  return index
}
const addSum = (nums, target) => {
    nums.sort((a, b) => a - b)
//   for(let i = 0; i < nums.length; i++){
//        const index = binarySearch(nums, target - nums[i])
//       if(index){
//           return [nums[i], nums[index]]
//       }
//       i++
//   }
//   return undefined
    let index = 0
    let last = nums.length;
    while(index < last){
        const findIndex = binarySearch(nums, (target - nums[index]))
        if(findIndex){
            return [index, findIndex]
        }
        index++
    }
    return undefined
}
const result = addSum([2,3,5,9], 14)
console.log(result)