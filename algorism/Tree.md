# Tree

```js
const data = [{parentId: null, id: 1, value: "1"}, {parentId: 1, id: 222, value: "222"}, {parentId: 1, id: 2, value: "2"}, {parentId: 2, id: 222, value: "222"}, {parentId: 222, id: 3333, value: "3333"}]


const mapedDataWithId = data.reduce((acc, cur, i) => {
    return {...acc, [cur.id]: i}
}, {})

let root;

data.forEach(el => {
    if(el.parentId === null){
        root = el;
        return
    }
    const parentEl = data[mapedDataWithId[el.parentId]];
    parentEl.children = [...(parentEl.children || []), el]
})

console.log(root)
```
