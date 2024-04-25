const arr = [10, 12, 15, 21];
arr.forEach((elem) => {
  setTimeout(()=>{
    console.log(elem > 13 ? `Good: ${elem}` : `Bad: ${elem}`)
  }, 3000)
})

for (let i = 0; i < arr.length; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
    }, 3000);
  })(i);
}
