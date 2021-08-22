
// ref https://dev.to/joelnet/3-simple-tricks-for-recursion-over-a-tree-structure-in-javascript-nodejs-29cj

```js
const rxIsoDate = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+([+-][0-2]\d:[0-5]\d|Z)/;

const isIsoDate = value => typeof value === 'string' && rxIsoDate.test(value);

const raw = {
  a: 1,
  date: '2020-07-17T01:32:26.206Z',
  second: {
    b: 2,
    createdAt: '2020-07-17T01:32:26.206Z',
    third: {
      c: 3,
      updatedAt: '2020-07-17T01:32:26.206Z'
    }
  }
};

const toJsDate = obj => {
  if (isIsoDate(obj)) return new Date(obj);
  if (typeof obj !== 'object') return obj;
  const nextObj = {};
  for (const [prop, value] of Object.entries(obj)) {
    nextObj[prop] = toJsDate(value);
  }
  return nextObj;
};
const clear = toJsDate(raw);

console.log(clear);
```

[reduce](https://runkit.com/joelnet/5f1344792ad936001ad53c94)


const isArray = (arr) => Array.isArray(arr) ? arr : []
const {}