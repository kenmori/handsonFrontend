function show(){
  let text = '';
  for(let i = 2; i <=100; i++){
    let flag = check(i);
    if(flag){
    text = text +i + '、';
    }
  }
  console.log(text)
}
function check(num){
  for(let j =2; j<=num-1; j++){
    if(num % j == 0){
        return false;
    }
    return true;
  }
}
show()
