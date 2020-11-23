const arr = [1, 4, 6, 8, 10, 99, 45]

function generateNumber(num){
  const arr = Array.from({length: num}, ((_, i) => i))
  return arr.map(() => {
    return Math.floor(Math.random() * 1000)
  })
}



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
console.log(result);