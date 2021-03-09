
```js
const items = [{value: 1, children: [{value: 2}]}, {value: 3, children: [{value: 4}]}]

const findValue = (items, serchValue) => {
    for(let item of items){
    if(item.value === serchValue){
       return item.value
    }
    if(item.children){
       const result = findValue(item.children, serchValue)
       if(result === serchValue){
          return result
       }
    }
  }
  return undefined
}
console.log(findValue(items, 4))
```