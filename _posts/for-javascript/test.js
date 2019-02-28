// 冒泡排序
function bubleSort(arr){
  if(!arr) return
  let arrLen = arr.length
  for(let i = 1;i<arrLen;i++){
    for(let j=0;j<arrLen-i;j++){
      if(arr[j]>arr[j+1]){
        [arr[j+1],arr[j]] = [arr[j],arr[j+1]]
      }
    }
  }
  return arr
}

function bubleSort(arr){
  if(!arr) return
  let arrLen = arr.length
  for(let i = 1;i<arrLen;i++){
    for(let j=0;j<arrLen-i;j++){
      if(arr[j]<arr[j+1]){
        [arr[j+1],arr[j]] = [arr[j],arr[j+1]]
      }
    }
  }
  return arr
}

// 数组去重
function uniqueArr(arr){
  let obj = {}
  arr.forEach(item => {
    obj[item] = 0
  })
  return Object.keys(obj)
}

function uniqueArr1(arr){
  return arr.filter((ele,idx,arr) => {
    return idx === arr.indexOf(ele)
  })
}

function uniqueArr2(arr){
  // 利用Set
  return [...new Set(arr)]
}

function uniqueArr3(arr){
  arr.reduce((map, item) => {
    // map是初始的叠加值，若不传则为数组第一项，
    map[item] = 0
    return map
  },{})
}

function reverseStr(str){
  return [...str].reverse().join()
}

function strChar(str){
  // 字符串需要先改成数组
  let myStr = [...str]
    obj = {}
    max = 0
    maxVal = ''
  myStr.forEach(val => {
    obj[val] = obj[val] === undefined ? 1 : obj[val] + 1;
    if(obj[val] > max){
      max = obj[val]
      maxVal = val
    }
  })
  return maxVal
}

function debounce(fn, interval = 300){
  let timeout = null
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(()=>{
      fn.apply(this,args)
    },interval)
  }
}

function throttle(fn, interval = 300){
  let canRun = true
  return function(){
    if(!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, args)
      canRun = true
    }, interval)
  }
}
