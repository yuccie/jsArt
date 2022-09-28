// 事件订阅发布模式




// 事件总线添加事件，然后触发事件，一次性事件，
class myEvtEmitter {
  constructor() {
    this.map = new Map();
  }
  add(key, fn) {
    // 添加事件
    if (this.map.has(key)) {
      this.map.get(key).push(fn)
    } else {
      this.map.set(key, [fn])
    }
  }
  emit(key) {
    // 触发事件
    if (!this.map.has(key)) {
      return;
    }
    this.map.get(key).forEach(fn => fn())
  }
  on(key, fn) {
    // 监听事件

  }
  del(key) {
    if (this.map.has(key)) {
      this.map.delete(key)
    }
  }
  once(key, fn) {
    // 一次性事件
    const _fn = () => {
      fn();
      this.del(key)
    }
    _fn();
  } 
}


function myLRU(depth) {
  this.maxLen = depth;
  this.cache = [];
}

myLRU.prototype.get = function(key) {
  const idx = this.cache.findIndex(item => item.key === key)
  if (idx !== -1) {
    this.cache.splice(idx, 1)
  }
  const val = this.cache[idx].val
  this.cache.unshift({key, val})
  return val;
}

myLRU.prototype.set = function(key, val) {
  const idx = this.cache.findIndex(item => item.key === key)
  if (idx > -1) {
    this.cache.splice(idx, 1)
  }
  if (this.cache.length >= this.maxLen) {
    this.cache.pop();
  }
  this.cache.unshift({key, val});
}


class myLRU {
	constructor(depth) {
    this.map = new Map();
    this.maxDepth = depth;
	}

  get(key) {
    if (!this.map.has(key)) {
      return -1;
    }
    const val = this.map.get(key)
    this.del(key)
    this.set(key, val)
    return val;
  }
  set(key, val) {
    if (this.map.has(key)) {
      this.del(key)
    }
    if (this.map.size >= this.maxDepth) {
      // 删除最开始的一个
      this.del(this.map.keys().next().value)
    }
    this.map.set(key, val)
  }

  del(key) {
    this.map.delete(key)
  }
}

console.log(Number('-123'))



// 异步任务队列 

const queue = []

// 队列任务执行完后执行的回调函数队列 

const postFlushCbs = []

function queueJob(job) {

  if (!queue.includes(job)) {

    queue.push(job)

    queueFlush()

  }

}

function queuePostFlushCb(cb) {

  if (!isArray(cb)) {

    postFlushCbs.push(cb)

  }

  else {

    // 如果是数组，把它拍平成一维 

    postFlushCbs.push(...cb)

  }

  queueFlush()

}

// 深拷贝
function deepClone(target) {
  let wMap = new WeakMap();

  function _getType(val) {
    return Object.prototype.toString.call(val).slice(8, -1)
  }

  function _deep(target) {
    // 非数组和对象，直接返回
    if (['Array', 'Object'].includes(_getType())) return target;

    if (wMap.has(target)) return wMap.get(target);

    let obj = Array.isArray(target) ? [] : {};
    wMap.set(target, obj);

    Object.keys(target).forEach(key => {
      if (obj[key]) return;
      obj[key] = _deep(target[key])
    })
    return obj;
  }

  return _deep(target);
}

class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  // 添加事件
  add(name, cb) {
    if (this.events.has(name)) {
      this.events.get(name).push(cb)
    } else {
      this.events.set(name, [cb])
    }
  }
  // 触发事件
  emit(name, ...args) {
    if (this.events.has(name)) {
      this.events.get(name).forEach(fn => fn.apply(null, args))
    }
  }
  // 解除事件
  off(key, fn) {
    if (!fn) {
      this.events.delete(key)
    } else {
      this.events.set(key, this.events.get(key).filter(_fn => _fn !== fn))
    }
  }
  // 一次性事件
  once(name, cb) {
    const _fn = (...args) => {
      cb.apply(this, args)
      this.off(name, _fn)
    }
    this.add(name, _fn)
  }
}

// 实现订阅发布模式
class EventEmitter {
  constructor() {
    this.events = {};
  }
  // 监听事件
  on(name, cb) {
    if (!this.events[name]) {
      this.events[name] = [cb];
    } else {
      this.events[name].push(cb)
    }
  }
  // emit触发事件
  emit(name, ...args) {
    if (this.events[name]) {
      this.events[name].forEach(fn => fn.apply(this, args))
    }
  }

  // 移除事件
  off(name, fn) {
    if (!fn) {
      this.events[name] = [];
    } else {
      this.events[name] = this.events[name].filter(_fn => _fn !== fn)
    }
  }

  // 绑定一次性事件
  once(name, cb) {
    const _fn = (...args) => {
      cb(args);
      this.off(name, _fn);
    }
    this.on(name, _fn);
  }
}

// 大数相加
function bigNumAdd(a, b) {
  // 获取两个数的长度
  let i = a.length - 1;
  let j = b.length - 1;

  let res = ''; // 最终结果
  let carry = 0; // 进位
  // 只要有一个长度大于等于0，即循环
  while (i >= 0 || j >= 0) {
    let x = 0;
    let y = 0;
    let sum = 0; // 两个数的和

    if (i >= 0) {
      x = +a[i];
      i--;
    }
    if (j >= 0) {
      y = +b[j];
      j--;
    }

    sum = x + y + carry;

    if (sum >= 10) {
      carry = 1;
      sum -= 10; // 进位后，两个数的临时和就需要减10
    } else {
      carry = 0;
    }

    // 两个数的临时和，需要与最终结果的字符串拼接；
    res = sum + res;
  }

  // 循环结束后，还需判断进位
  if (carry) {
    res = carry + res;
  }
  return res;
}

// 动态规划
let lengthOfLIS = function (nums) {
  let dp = []
  let n = nums.length
  if (!n) {
    return 0
  }

  dp[0] = 1
  for (let i = 1; i < n; i++) {
    let num = nums[i]
    let max = 1
    // j 从 [0, i) 依次求出可以和 i 组成的最长上升子序列
    for (let j = 0; j < i; j++) {
      let prevNum = nums[j]
      if (num > prevNum) {
        // 循环中不断更新 max 值
        max = Math.max(max, dp[j] + 1)
      }
    }
    dp[i] = max
  }

  return Math.max(...dp)
}

function getLen(arr) {
  let len = arr.length;
  if (!len) return 0;

  let dp = [1]

  for (let i = 1; i < len; i++) {
    let temp = arr[i];
    let max = 1;

    for (let j = 0; j < i; j++) {
      // 每次i都会增加，记录不同数组长度下，有几个递增的。
      if (temp > arr[j]) {
        max = Math.max(max, dp[j] + 1)
      }
    }
    dp[i] = max;
  }

  return Math.max(...dp)
}
getLen([10, 9, 2, 5, 3, 7, 101, 18])

var lengthOfLongestSubstring = function (s) {
  let num = 0, res = 0, m = '';
  for (let n of s) {
    if (m.indexOf(n) === -1) {
      m += n;
      num++;
      res = num > res ? num : res;
    } else {
      m += n;
      // 删除第一个重复的字符
      m = m.slice(m.indexOf(n) + 1)
      num = m.length;
    }
  }
  return res;
};

function insertSort(arr) {
  let len = arr.length;
  if (len < 2) return arr;

  for (let i = 1; i < len; i++) {
    let temp = arr[i];

    let j = i - 1;
    for (; j >= 0; j--) {
      if (arr[j] > temp) {
        arr[j + 1] = arr[j]
      } else {
        break;
      }
    }
    arr[j + 1] = temp;
  }
  return arr;
}
// 手写promise
class MyPromise {
  // 需要传入执行器
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;

    // 为绑定this，这里使用箭头函数
    let resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
      }
    }

    let reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
      }
    }

    // 立马执行
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err)
    }
  }

  // then，成功和失败回调
  then(onFulfilled, onRejected) {
    if (this.status === 'fulfilled') {
      onFulfilled(this.value)
    }
    if (this.status === 'rejected') {
      onRejected(this.reason);
    }
  }
}
const promise1 = new MyPromise((resolve, reject) => {
  resolve('成功');
}).then(
  (data) => {
    console.log('success', data)
  },
  (err) => {
    console.log('faild', err)
  }
)

// 支持异步
class MyPromise {
  // 需要传入执行器
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 定义回调数组
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    // 为绑定this，这里使用箭头函数
    let resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        // 只要状态发生变化，就遍历执行
        this.onFulfilledCbs.forEach(cb => cb())
      }
    }

    let reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        // 只要状态发生变化，就遍历执行
        this.onRejectedCbs.forEach(cb => cb())
      }
    }

    // 立马执行
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err)
    }
  }

  // then，成功和失败回调
  then(onFulfilled, onRejected) {
    if (this.status === 'fulfilled') {
      onFulfilled(this.value)
    }
    if (this.status === 'rejected') {
      onRejected(this.reason);
    }
    // 如果状态是pending，则需要先将回调存放起来
    if (this.status === 'pending') {
      this.onFulfilledCbs.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCbs.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

// then的链式调用和值穿透
// 我们都知道，promise 的优势在于可以链式调用。
// 在我们使用 Promise 的时候，当 then 函数中 return 了一个值，不管是什么值，我们都能在下一个 then 中获取到，这就是所谓的then 的链式调用。
// 而且，当我们不在 then 中放入参数，例：promise.then().then()，那么其后面的 then 依旧可以得到之前 then 返回的值，这就是所谓的值的穿透。
// 因此如果我们每次调用then时，都重新创建一个promise，然后把上一个then的返回结果传给这个新的promise的then，不就可以一直then下去了？
class MyPromise {
  // 需要传入执行器
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 定义回调数组
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    // 为绑定this，这里使用箭头函数
    let resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        // 只要状态发生变化，就遍历执行
        this.onFulfilledCbs.forEach(cb => cb())
      }
    }

    let reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        // 只要状态发生变化，就遍历执行
        this.onRejectedCbs.forEach(cb => cb())
      }
    }

    // 立马执行
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err)
    }
  }

  // then，成功和失败回调
  then(onFulfilled, onRejected) {
    // 解决onFulfilled，onRejected没有传值的情况
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

    // 每次调用then都会返回一个新的promise
    let p2 = new MyPromise((resolve, reject) => {
      // 成功
      if (this.status === 'fulfilled') {
        // 这里用setTimeout来模拟异步返回promise
        // 由于原生的 Promise 是V8引擎提供的微任务，我们无法还原V8引擎的实现，所以这里使用 setTimeout 模拟异步，所以原生的是微任务，这里是宏任务。
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            // 将返回值包装一下
            this.resolvePromise(p2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      }
      // 失败
      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            this.resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      // pending
      if (this.status === 'pending') {
        this.onFulfilledCbs.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              // 将返回值包装一下
              this.resolvePromise(p2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          })
        })

        this.onRejectedCbs.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              this.resolvePromise(p2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })

    return p2;
  }

  resolvePromise(p2, x, resolve, reject) {
    // 自己等待自己，其实就是循环调用，报错并结束
    if (p2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // 只调用一次
    let called;
    // 区分对象和函数
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
      try {
        // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候） 
        let then = x.then;
        if (typeof then === 'function') {
          then.call(x, y => {
            if (called) return;
            called = true;
            // 递归解析（因为可能 promise 中还有 promise） 
            resolvePromise(p2, x, resolve, reject)
          }, r => {
            // 只要失败就失败 
            if (called) return;
            called = true;
            reject(r);
          })
        } else {
          // 普通值，直接返回
          resolve(x)
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error)
      }
    } else {
      // 普通值，直接返回
      resolve(x)
    }
  }
}

// 手动实现Promise.prototype.finally
MyPromise.prototype.finally = function (cb) {
  return this.then(value => {
    return MyPromise.resolve(cb()).then(() => value)
  }, reason => {
    return MyPromise.resolve(cb()).then(() => { throw reason })
  })
}
// 实现promise.all 
Promise.all = function (values) {
  if (!Array.isArray(values)) {
    return new TypeError(`TypeError: ${type} ${values} is not iterable`)
  }

  return new Promise((resolve, reject) => {
    let res = [];
    let idx = 0;

    const processData = (value, idx) => {
      res[idx] = value;
      idx++;
      if (res.length === idx) {
        resolve(res);
      }
    }

    // 不能保证书序
    // values.forEach((value, idx) => {
    //   if (value && typeof value.then === 'function') {
    //     value.then((value) => {
    //       processData(value, idx);
    //     }, reject);
    //   }
    // })

    for (let i = 0; i < values.length; i++) {
      let value = values[i]
      if (value && typeof value.then === 'function') {
        value.then(val => {
          processData(val, i)
        }, reject)
      } else {
        processData(value, i)
      }
    }
  })
}

class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    let resolve = val => {
      if (this.status === 'pending') {
        this.status === 'fulfilled'
        this.value = val;
        this.onFulfilledCbs.forEach(fn => fn())
      }
    }

    let reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCbs.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // then是个函数，里面会传入回调
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : f => f;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    // 每次调用都会返回一个新的promise
    let p2 = new MyPromise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        // 这里用setTimeout来模拟异步返回promise
        // 由于原生的 Promise 是V8引擎提供的微任务，我们无法还原V8引擎的实现，所以这里使用 setTimeout 模拟异步，所以原生的是微任务，这里是宏任务。
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            // 将返回值包装一下
            this.resolvePromise(p2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      }
    })
    // 如果成功
    if (this.status === 'fulfilled') {
      onFulfilled(this.value)
    }
    if (this.status === 'rejected') {
      onRejected(this.reason)
    }

    // 如果是pending状态，则压入到数组中
    if (this.status === 'pending') {
      this.onFulfilledCbs.push(() => {
        onFulfilled(this.value);
      })
      this.onRejectedCbs.push(() => {
        onRejected(this.reason);
      })
    }
  }
}


function deepClonePro(target) {
  let wMap = new WeakMap();
  function _getType(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
  }
  function _deep(target) {
    // 非数组或对象，直接返回
    if (!['Object', 'Array'].includes(_getType(target))) return target;

    // 如果map里有，直接返回，解决循环引用
    if (wMap.has(target)) return wMap.get(target);

    // 存储
    let obj = Array.isArray(target) ? [] : {};
    wMap.set(target, obj)

    Object.keys(target).forEach(key => {
      if (obj[key]) return;
      obj[key] = _deep(target[key])
    })
    return obj;
  }
  return _deep(target)
}

function deepClone(obj) {
  let ret = Object.create(null);
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      typeof obj[prop] === 'object'
        ? ret[prop] = deepClone(obj[prop])
        : ret[prop] = obj[prop]
    }
  }

  return ret;
}

function deepClonePro(target) {
  let tempMap = new WeakMap();

  function _getType(val) {
    return Object.prototype.toString.call(val).slice(8, -1)
  }

  function _deep(target) {
    // 非数组或对象均返回
    if (!['Array', 'Object'].includes(target)) return target;

    // 存在即返回
    if (tempMap.has(target)) return tempMap.get(target);

    let obj = Array.isArray(target) ? [] : {};
    tempMap.set(target, obj);

    Object.keys(target).forEach(prop => {
      if (obj[prop]) return;
      obj[prop] = _deep(target[prop])
    })

    return obj;
  }

  return _deep(target);
}

function deepClonePro(target) {
  let wMap = new WeakMap();
  function _getType(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
  }
  function _deep(target) {
    // 非数组或对象，直接返回
    if (!['Object', 'Array'].includes(_getType(target))) return target;

    // 如果map里有，直接返回，解决循环引用
    if (wMap.has(target)) return wMap.get(target);

    // 存储
    let obj = Array.isArray(target) ? [] : {};
    wMap.set(target, obj)

    Object.keys(target).forEach(key => {
      if (obj[key]) return;
      obj[key] = _deep(target[key])
    })
    return obj;
  }
  return _deep(target)
}
let obj = {
  date: new Date(),
  fn: function () { },
  sym: Symbol,
  a: '1',
  b: 2,
  bool: true,
  nul: null,
  undf: undefined
}
console.log(deepClonePro(obj))
console.log(JSON.parse(JSON.stringify(obj)))


function deepClonePro(target) {
  let weakMap = new WeakMap();

  function _getType(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
  };

  function _deep(target) {
    // 非数组或对象，直接返回
    if (!['Array', 'Object'].includes(_getType(target))) return target;

    // 如果有了，直接返回
    if (weakMap.has(target)) return weakMap.get(target);

    // 判断数据类型
    let obj = Array.isArray(target) ? [] : {};

    Object.keys(target).forEach(key => {
      if (obj[key]) return;
      obj[key] = _deep(target[key])
    })

    return obj;
  };

  return _deep(target)
}
let obj = {
  date: new Date(),
  fn: function () { },
  sym: Symbol,
  a: '1',
  b: 2,
  bool: true,
  nul: null,
  undf: undefined
}
console.log(deepClonePro(obj))
console.log(JSON.parse(JSON.stringify(obj)))


function debounce(fn, interval = 300) {
  return (...args) => {
    clearTimeout(fn.timeId);
    fn.timeId = setTimeout(() => {
      fn.apply(this, args)
    }, interval)
  }
}
function throttle(fn, interval = 300) {
  let canRun = true;
  return (...args) => {
    if (!canRun) return;
    canRun = false;
    fn.timeId = setTimeout(() => {
      fn.apply(this, args)
      canRun = true;
    }, interval)
  }
}
window.addEventListener('resize', throttle(() => console.log('d'), 2000))

// Array.from接受像数组的对象，然后生成一个新的数组
let testArr = Array.from({ length: 5000 }, () => Math.floor(Math.random() * 100))

// 冒泡排序
function bubbleSort(arr) {
  let len = arr.length;
  console.time();
  for (let i = 0; i < len - 1; i++) {
    let flag = false
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[i] > arr[j]) {
        flag = true;
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }

    if (!flag) break;
  }
  console.timeEnd();
  return arr;
}
bubbleSort(testArr)

// 两两比较，每轮循环，都会找到一个最值放在一侧
// 需要循环length轮
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    // 每轮循环，最值都会在一侧，因此-i
    for (let j = 0; j < len - i - 1; j++) {
      // 两两比较
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
  }
  return arr;
}
// 还可以在每轮循环里增加flag，若是一轮循环后，没有调换顺序，说明已经排好序了
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let flag = true;
    // 每轮循环，最值都会在一侧，因此-i
    for (let j = 0; j < len - i - 1; j++) {
      // 两两比较
      if (arr[j] > arr[j + 1]) {
        flag = false;
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
    if (flag) break;
  }
  return arr;
}


// 插入排序
// 一个数组，假设一部分是排好序的，另一部分挨个拿过来比较，看需要插在哪个位置？
function insertSort(arr) {
  let len = arr.length;
  if (len < 2) return arr;

  for (let i = 1; i < len; i++) {
    // 暂存待比较的值
    let temp = arr[i];

    // 已排好序的，移动
    let j = i - 1;
    for (; j >= 0; j--) {
      if (arr[j] > temp) {
        arr[j + 1] = arr[j]
      } else {
        // 必须break，否则j还会继续循环，就出问题了
        break;
      }
    }

    // 移动完后，会有个空缺，
    arr[j + 1] = temp;
  }
  return arr;
}
insertSort(testArr);

function insertSort(arr) {
  const len = arr.length;
  if (len < 2) return arr;

  // 从1开始循环
  for (let i = 1; i < len; i++) {
    const temp = arr[i]; // 记录当下的值

    // 循环左侧的区域
    let j = i - 1;
    for (; j >= 0; j--) {
      // 倒着比较，如果最右侧比新来的还大，则移动最右侧的值
      // 移动后，就会多出一个空隙
      if (arr[j] > temp) {
        // 其实就是将j的值赋值到j+1上，从而就可以随便处置arr[j]
        arr[j + 1] = arr[j]
      } else {
        // 需要退出，不然j的值会继续变化
        break;
      }
      // 循环结束后，j会减一，因此此处需要j+1
      arr[j + 1] = temp;
    }
  }
  return arr;
}


// 选择排序
function selectSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = arr[i];
    // 从剩余中选择最小的，赋值给min
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < min) {
        [arr[j], min] = [min, arr[j]]
      }
    }

    // 将新的最小值赋值给 假设的最小值，即 arr[i]
    arr[i] = min;
  }
  return arr;
}
/**
 * 其实就是每次从剩余的数组列表里选择一个最小值，然后放到最前面
 * 外层循环，定义一个最小值
 * 然后内从i+1开始，与最小值比较，如果比最小值还小，则交换
 */
function selectSort(arr) {
  const len = arr.length;
  // 之所以len-1，是因为内层排序会取到
  for (let i = 0; i < len - 1; i++) {
    // 假设当前项会最小值
    let min = arr[i];

    // 从i+1开始循环剩余的，与假设的最小值做对比
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < min) {
        // 交换值，此时min依然是最小
        [arr[j], min] = [min, arr[j]]
      }
    }

    // 循环结束后，arr[i]的值可能已经不是最小了，此处再次覆盖
    arr[i] = min;
  }
  return arr;
}

selectSort(testArr)

// 插入排序
function insertSrot(arr) {
  // 移动已经排好序的元素，最后插入
  const len = arr.length;
  console.log(3)
  // 遍历待插入的值
  for (let i = 1; i < len; i++) {
    let temp = arr[i];

    // 遍历排序好的数据，并移动
    let j = i - 1;
    for (; j >= 0; j--) {
      if (arr[j] > temp) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = temp;
  }
  return arr;
}


// 快手
// 已知两个有序数组，合并排序并去重
// 常见排序算法的复杂度
let a = [1, 3, 5, 7]
let b = [2, 3, 4, 6, 8]

// 高复杂度版
function merge(a, b) {
  return [...new Set([...a, ...b])].sort((a, b) => a - b)
}
var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, n, ...nums2)
  nums1.sort((a, b) => a - b)
  return nums1
}

// 低复杂度版，O(n)
function mergePro(a, b) {
  let mergeArr = a.concat(b);
  let len = mergeArr.length;
  // 先生成一个有序的数组，每一项有idx，val
  let mapArr = Array.from({ length: len }, (item, idx) => {
    return {
      idx,
      val: ''
    }
  })

  // 将合并后的数组数据放到map对象上，后续直接根据索引获取对应的值
  let map = new Map();
  mergeArr.forEach(item => {
    map.set(item, item);
  })

  // 遍历有序数组，然后拿到对应索引下的值。
  mapArr = mapArr.map(item => {
    item.val = map.get(item.idx)
    return item;
  })
  return mapArr.map(item => item.val)
}

merge(a, b);

// 快速排序版本
function fastSort(arr) {
  if (arr.length < 2) return arr;

  const tempVal = arr.pop();
  let left = [];
  let right = [];

  arr.forEach(item => {
    if (item < tempVal) {
      left.push(item);
    } else {
      right.push(item)
    }
  })

  return fastSort(left).concat([tempVal], fastSort(right))
}
function fastSort(arr) {
  // 快速排序，找出一个基准值，
  // 然后根据基准值分割整个数组
  // 递归分割

  // 因为后续要操作原数组，所以不缓存长度
  if (arr.length < 2) return arr;

  // 取出基准值，取最后的性能好
  const temp = arr.pop();
  const left = [];
  const right = [];

  arr.forEach(item => {
    if (item < temp) {
      left.push(item);
    } else {
      right.push(item);
    }
  })

  // 返回最后的值。
  return fastSort(left).concat(temp, fastSort(right));
}

// 快速排序es6版本
function fastSortEs(arr) {
  if (arr.length < 2) return arr;

  const tempVal = arr.pop();
  let left = arr.filter(item => item < tempVal);
  let right = arr.filter(item => item >= tempVal)

  return fastSort(left).concat([tempVal], fastSort(right))
}
fastSortEs([6, 5, 4, 1, 1, 7, 9, 10])

// 手写apply和call
// apply和call都是方法借用，别的对象上的方法，拿过来自己用，因此需要设法拿到这个方法，比如fn
// 另外，apply和call都有两个参数，参数1是thisArg，参数二是argsArray
// 现在是thisArg想调用fn方法，怎么办呢？只需挂载就好了啊：thisArg.fn = fn;
// 现在有了fn方法，那直接执行就好了，然后返回执行的结果即可
Function.prototype.apply = function (ctx, ...args) {
  // 函数执行，this的指向是函数调用 . 前面的对象，所以：
  ctx.fn = this;
  const res = ctx.fn(args);
  delete ctx.fn;
  return res;
}

// 手写apply和call
// apply和call都是方法借用，将fn.apply中的fn给别的对象用，因此可以通过this直接拿到
// 给指定对象ctx使用，因此需要在这个对象上挂在ctx上，ctx.fn = this
// 挂载完后，还需要传入指定的参数
Function.prototype.myApply = function (ctx) {
  // this指向的是当前调用apply的方法
  ctx.fn = this;
  console.log(222)
  // apply还需要校验参数二是否为数组，因此不能使用...args
  // 这里获取的是数组中的项：[1,2,3].splice(1)[0] => 2
  const args = [...arguments].splice(1)[0];
  if (!Array.isArray(args)) throw '参数错误';

  const res = ctx.fn(args);
  delete ctx.fn;
  return res;
}
var obj = {
  name: 'obj'
}
function sayName(arr) {
  console.log(this.name, arr)
}
sayName.myApply(obj, [1, 2, 3]) //obj [1, 2, 3]

Function.prototype.call = function () {
  context.fn = this;//1.将函数挂载到传入的对象
  // 这里获取的从1开始的数组：[1,2,3].splice(1) => [2,3]
  var arg = [...arguments].splice(1);//2.取参数
  const res = context.fn(...arg) //3.执行对象的方法
  delete context.fn; //4.移除对象的方法
  return res;
}