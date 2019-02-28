const arr = [ 1, 2, 3, 4, 5 ];
// 插入代码...
Object.defineProperty( arr, 'multiply', {
  // enumerable: false,
  value: function () {
    // for ( let i = 0; i < arr.length; i++ ) {
    //   arr.push( arr[i] * 2 )
    // }
    this.forEach((item) => {
      this.push(item * item)
    })
    // for(let item of this){
    //   console.log(item)
    //   // this.push(item * item)
    // }
  },
} )
arr.multiply();
console.log( arr.slice(0,arr.length-1) ); // [1, 2, 3, 4, 5, 1, 4, 9, 16, 25]

const arr = [ 1, 2, 3, 4, 5 ];
// 插入代码...
Object.defineProperty( arr, 'multiply', {
  value: function () {
    this.forEach((item) => {
      this.push(item * item)
    })
  },
} ) 
arr.multiply();
console.log( arr.slice(0, arr.length) );