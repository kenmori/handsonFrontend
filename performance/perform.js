console.time("ee")

const mil = 10000;
const arr = Array(mil)

// for(let i = 0; i < mil; i++){
//   console.log(i)
// }

arr.map(v => v).map(v => v)

console.timeEnd("ff")