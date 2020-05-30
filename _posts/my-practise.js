
// 问题：
// 技术掌握深度不够 理论和项目经历还行 编程尚可
// 对技术的理解和使用不够灵活，没有遇到过的问题想不到解决方案。代码能力不符合预期。

// 解决：
// 1、每天总结
// 2、每天一个算法，必须搞彻底明白，还要思考多方式
// 3、加快node全流程项目落地
// 4、将理论落地

// 1、如何计算一个超过存取范围的大数据的计算？
// 2、落地页的图片如何优化？怎么支持不同的格式？
// 3、无头浏览器
// 4、spa与多页应用优缺点
// 5、小程序双线程、及登录流程
// 6、WebAssembly
// 7、nextTick原理
// 8、事件订阅与发布者模式，写个class
// 9、jsBridge通信
// 10、场景比较多，临界点突破机会多，对新特性应用的机会多，因此更能锻炼人。年轻有活力的公司。
// 11、如何优化页面加载，页面性能？

// ==  ===
// 0 == ‘0’ = true | false
// 事件循环 微任务
// set 1000
// 基于对象

// proptype  __proto__
// ES6
// ... 
// Node.js 
// ES6 export 
// Commonjs
// git -> mrege vs  rebase
// commit  rebase -i
// SQL vs NoSql 
// HTML5 语义化
// CSS3 新特性

function factorialize(num) {
  if (num>0)
  {return (num * factorialize(num - 1));}
  else
  return (1);
}

function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function () {
  console.log(this.name);
}

var person = new Person("xl");
console.log(person.constructor);
console.log(Person.prototype.constructor);

// Person
// Object // 这个错了，应该是Person，
// 如果是 Person.prototype_proto_ 
console.log(Person.constructor);
// Function

// 


// TODO
function use(obj) {
  obj.name = 'bbb'
  obj = new Object()
  obj.name = 'aaa'
}
let person = new Object();
use(person);
log(person.name)
// -------------
function Foo() {
  alert(1)
}
alert(Foo())
// -------------
function Foo() {
  console.log(this)
}
var arr = []
arr.f = Foo
document.onclick = Foo

arr.f() // arr
document.onclick() // window
// --------------
var str = 'dgraf' // d|gr|af
str.replace(/(\w{2})$/g, '|$1');
// --------------
// 6  8
// 2时xx分xx秒

let timeArr = [0, 4, 8]
let targetTime = new Date(8).setHours

let resTime = time
formatTime(time)

function test() { this.name = 1; return {} }

console.log('1');
async function async1() {
  console.log('2');
  await console('3');
  console.log('4');
}

setTimeout(function () {
  console.log('5');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('6');
  resolve();
}).then(function () {
  console.log('7');
});
console.log('8');

// 1 2 3 6 8 4 7 5



render: function (createElement) {
  return createElement(
    'h' + this.level,   // 标签名称
    this.$slots.default // 子节点数组
  )
}


[new Set(Array.from(10))].sort()


class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}



class Promise {
  constructor(executor) {
    this.status = 'pending';
    this.val = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = val => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.val = val;
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    };
    let reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === 'fulfilled') {
      onFulfilled(this.val);
    }
    if (this.status === 'rejected') {
      onRejected(this.reason);
    }

    if (this.status === 'pending') {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.val);
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      })
    }
  }
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  })
}

Promise.all = function (promises) {
  let arr = [];
  let i = 0;
  function processData() {
    arr[idx] = data;
    i++;
    if (promises.length === i) {
      resolve(arr);
    }
  }
  return new Promise((resolve, reject) => {
    for (let j = 0; j < promises.length; j++) {
      promises[j].then(data => {
        processData(j, data);
      }, reject)
    }
  })
}

function deepClone(target) {
  let tempMap = new WeakMap();
  function _getPrototype(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
  }
  function _deep(target) {
    if (!target || _getPrototype !== 'Array' || _getPrototype !== 'Object') return target;
    if (tempMap.has(target)) return tempMap.get(target);

    let obj = Array.isArray(target) ? [] : {};
    tempMap.set(target, obj);

    Object.keys(target).forEach(key => {
      if (obj[key]) return;
      obj[key] = _deep(target[key])
    })
    return obj;
  }
  return _deep(target)
}
let xhr = new XMLHttpRequest();
let url = '';
let method = 'GET';

xhr.open(method, url);
xhr.send();
xhr.abort();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    clearTimeout(timeout);
  }
}

// 斐波那切数列
let count = 0;
let fibonacci = function (n) {
  count++;
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
for (let i = 0; i <= 10; i++) {
  fibonacci(i);
}

// 优化版，利用map配合缓存
var fibonacci = (function (n) {
  let cache = Object.create(null);

  return n => {
    if (n < 2) return n;

    if (cache[n - 2] === void 0) {
      cache[n - 2] = fibonacci(n - 2)
    }
    if (cache[n - 1] === void 0) {
      cache[n - 1] = fibonacci(n - 1)
    }
    return cache[n] = cache[n - 1] + cache[n - 2]
  }
})()

// 冒泡排序
function bubleSort(arr) {
  const arrLen = arr.length;
  if (arrLen <= 1) return arr;

  for (let i = 0; i < arrLen - 1; i++) {
    let flag = true;
    for (let j = 0; j < arrLen - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
        flag = false;
      }
    }
    if (flag) break;
    return arr;
  }
}

arr => {
  return arr.filter((ele, idx, arr) => idx === arr.indexOf(ele))
}

// 防抖
function debounce(fn, interval = 300) {
  return (...args) => {
    clearTimeout(fn.timeId);
    fn.timeId = setTimeout(() => {
      fn.apply(this, args);
    }, interval);
  }
}

function debouncd(fn, interval = 300) {
  return (...args) => {
    clearTimeout(fn.timeId);
    fn.timeId = setTimeout(() => {
      fn.apply(this, interval);
    }, interval)
  }
}

function throttle(fn, interval = 300) {
  let canRun = true;
  return (...args) => {
    if (!canRun) return false;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, interval);
  }
}
function Point() {
  this.x = x;
}
Point.prototype.toString = function () {

}

class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

class Watcher {
  constructor() {
    Dep.target = this;
  }
  update() {
    console.log('视图更新啦');
  }
}

const proxy = new Proxy({}, {
  get: function (obj, prop) {
    return obj[prop]
  },
  set: function (obj, prop, val) {
    obj[prop] = val;
  }
})

Dep.target = null;

var getInstance = (function () {
  let instance = null;
  return function (name) {
    if (!instance) {
      instance = new Instance();
    }
    return instance;
  }
})()
/**
 . 匹配任意字符
 \w 匹配所有大小写字符及数字及下划线
 \W 匹配 \w以外的字段
 ^ 以什么开始
 $ 以什么结束
 
 */

/**
Number可以将非数字转为数字，
1、如果是Boolean，true就是1，false就是0
2、如果是NaN，就是0
3、如果是undefined，就是NaN
4、如果是数字，则直接返回
5、如果是字符串，
 5-1、只包含数字和正负号，则转为10进制
 5-2、只包含浮点数和正负号，则转为对应的浮点数，忽略前导0
 5-3、十六进制也转为10进制
 5-4、空字符串转为0
 
web浏览器都是将这个全局对象作为window对象的一部分进行实现
因此在全局作用域中声明的所有变量和函数，就都称为了window对象的属性
在调用Object.defineProperty
 
 
 */
window.addEventListener('deviceorientation', handleOrientation, true)

function deepClone1(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  let temp = Array.isArray(obj) ? [] : {}

  Object.keys(obj).forEach(key => {
    if (temp[key]) return;
    temp[key] = deepClone1(obj[key])
  })
}

function deepClone(target) {
  let whiteList = ['Array', 'Object']
  let tempMap = new WeakMap;
  function _getPrototype(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
  }
  function _deep(target) {
    if (!target || !whiteList.includes(_getPrototype(target))) return target;
    if (tempMap.has(target)) return tempMap.get(target);

    let obj = Array.isArray(target) ? [] : {};
    tempMap.set(target, obj);

    Object.keys(target).forEach(key => {
      if (obj[key]) return;
      obj[key] = _deep(target[key])
    })

    return obj;
  };
  return _deep(target);
}

var o = new Foo()
// 
var obj = {}
obj._proto_ = Foo.prototype;
let tempObj = Foo.apply(obj)
if (typeof tempObj === 'object') {
  return tempObj
} else {

}


// 求两个二进制字符串的和，返回依然是二进制
function addBinary(a, b) {
  debugger
  a = a.split('').reverse();
  b = b.split('').reverse();

  let c = [];
  let add = 0;
  for (var i = 0, len = Math.max(a.length, b.length); i < len; i++) {
    let sum = (a[i] === undefined ? 0 : Number(a[i])) + (b[i] === undefined ? 0 : Number(b[i])) + add;
    c[i] = sum & 1;

    if (sum >= 2) {
      add = 1;
    } else {
      add = 0;
    }
  }

  if (add) {
    c[len] = 1;
  }

  return c.reverse().join('');
}

// 判断字符串是否为回文
function isPalindrome(s) {
  s = s.replace(/\W/g, '');
  s = s.toLowerCase();
  let s_copy = s.split('').reverse().join('')
  return s_copy === s;
}

// 判断第一个不重复的字符出现的索引
function firstUniqueChar(s) {
  for (let char of s) {
    // 正则表达式，无法直接构建正则表达式，需要用构造函数
    let reg = new RegExp(`${char}`, 'g');
    if ((s.match(reg)) && (s.match(reg)).length === 1) {
      return s.indexOf(char);
    }
  }
}

// 统计字符串中的单词个数
function countSegments(s) {
  s = s.replace(',', ' ');
  let arr = s.split(' ');
  let count = 0;

  arr.forEach(item => {
    item && count++;
  })

  return count
  // 求最长公共字符串前缀
  function longestCommonPrefix(strs) {
    if (!strs.length) return '';
    if (strs.length === 1) return strs[0];

    // 找出数组中最端字符串的长度
    let len = strs.reduce((pre, next) => {
      return Math.min(pre, next.length);
    }, Number.MAX_VALUE);

    let prefix = '';
    for (let i = 0; i < len; i++) {
      let a = strs[0][i];
      let flag = strs.every(item => item[i] === a)

      if (!flag) break;
      prefix += a;
    }

    return prefix;
  }

  // 给定一个字符串，判断是否合法
  // 利用堆栈，做到了最后进去的，最先出来。。。
  function isValid(str) {
    let target = {
      '(': ')',
      '[': ']',
      '{': '}'
    };
    let strArr = [];

    // 遍历字符串
    for (let i = 0, len = str.length; i < len; i++) {
      if (!strArr.length) {
        strArr.push(str[i])
      } else {
        // 如果当前的符号和数组的最后一项匹配，则直接弹出
        if (str[i] === target[strArr[strArr.length - 1]]) {
          strArr.pop();
        } else {
          strArr.push(str[i]);
        }
      }
    }

    // 如果最后的数组为空，说明是合法
    return !strArr.length;
  }

  class myPromse {
    constructor(executor) {
      let state = "pending",
        value,
        reason;

      let resolve = val => {
        if (this.state === "pending") {
          this.state = "fulfilled";
          this.value = val;
        }
      };
      let reject = reason => {
        if (this.state === "pending") {
          this.state = "rejected";
          this.reason = reason;
        }
      };
      try {
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
  }

  var person1 = {
    toLocaleString: function () {
      return "Nikolaos";
    },

    toString: function () {
      return "Nicholas";
    }
  };

  var person2 = {
    // toLocaleString: function () {
    //   return "Grigorios";
    // },
    // toString: function () {
    //   return "Greg";
    // }
  };

  var people = [person1, person2];
  console.log(people); // Nicholas,Greg
  console.log(people.toString()); // Nicholas,Greg
  console.log(people.toLocaleString()); // Nikolaos,Grigorios

  var sum = arr.reduce((p, c) => p + (Array.isArray(c) ? sum(c) : c), 0);
  var flatArr = arr.reduce(
    (p, c) => p.concat(Array.isArray(c) ? flatArr(c) : c),
    []
  );

  router.beforeEach((to, from, next) => {
    // ...
  });

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  axios
    .get("/user/12345", {
      cancelToken: source.token
    })
    .catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      } else {
        // handle error
      }
    });

  axios.post(
    "/user/12345",
    {
      name: "new name"
    },
    {
      cancelToken: source.token
    }
  );

  // cancel the request (the message parameter is optional)
  source.cancel("Operation canceled by the user.");

  // 单例模式
  var getInstance = function (fn) {
    let result;
    return result || (result = fn.call(this, arguments));
  };

  // 防抖和节流都用闭包
  function debounce(fn, interval = 300) {
    let timeout = null;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn.apply(this, args);
      }, interval);
    };
  }

  window.addEventListener('resize', debounce(() => console.log('防抖'), 500))

  function throttle(fn, interval) {
    let canRun = true;
    return function (...args) {
      if (!canRun) return;
      canRun = false;
      setTimeout(() => {
        fn.apply(this, args);
        canRun = true;
      }, interval);
    };
  }

  window.addEventListener('resize', throttle(() => console.log('节流'), 500))

  var count = 0;
  var fibonacci = function (n) {
    count++;
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
  };
  for (var i = 0; i <= 10; i++) {
    fibonacci(i);
  }
  console.log(count); // 453

  // 下拉刷新
  (function (window) {
    var _element = document.getElementById("refreshContainer"),
      _refreshText = document.querySelector(".refreshText"),
      _startPos = 0,
      _transitionHeight = 0;

    _element.addEventListener(
      "touchstart",
      function (e) {
        console.log("初始位置：", e.touches[0].pageY);
        _startPos = e.touches[0].pageY;
        _element.style.position = "relative";
        _element.style.transition = "transform 0s";
      },
      false
    );

    _element.addEventListener(
      "touchmove",
      function (e) {
        console.log("当前位置：", e.touches[0].pageY);
        _transitionHeight = e.touches[0].pageY - _startPos;

        if (_transitionHeight > 0 && _transitionHeight < 60) {
          _refreshText.innerText = "下拉刷新";
          _element.style.transform = "translateY(" + _transitionHeight + "px)";

          if (_transitionHeight > 55) {
            _refreshText.innerText = "释放更新";
          }
        }
      },
      false
    );

    _element.addEventListener(
      "touchend",
      function (e) {
        _element.style.transition = "transform 0.5s ease 1s";
        _element.style.transform = "translateY(0px)";
        _refreshText.innerText = "更新中...";

        // todo...
      },
      false
    );
  })(window);
  // CSS,canvas,svg，js
  // css旋转中心和其他不同，

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      console.log(1);
      window.requestAnimationFrame(step);
    }, 1000);
  }

  // var images = new Array()
  // function preload () {
  //   for ( i = 0; i & lt; preload.arguments.length; i++) {
  //     images[ i ] = new Image()
  //     images[ i ].src = preload.arguments[ i ]
  //   }
  // }
  // preload(
  //   "http://qiniu.cllgeek.com/react02.png",
  //   "http://qiniu.cllgeek.com/react03.png",
  //   "http://qiniu.cllgeek.com/react04.png"
  // )

  // 链表的基本结构

  function LinkedList() {
    // 辅助类
    var Node = function (element) {
      this.element = element;
      this.next = null;
    };

    var length = 0; // 链表具有length属性
    var head = null; // 存储下一节点的引用

    this.append = function (element) { }; // 尾部添加一项
    this.insert = function (position, element) { }; // 特定位置插入一项
    this.removeAt = function (position) { }; // 移除一项
    this.remove = function (element) { }; // 返回索引
    this.indexOf = function (element) { }; // 移除特定位置的项
    this.isEmpty = function () { }; // 是否为空
    this.size = function () { }; //链表的元素个数
    this.toString = function () { }; //由于使用Node类，因此需要重写继承的toString方法
    this.print = function () { };
  }

  this.append = function (element) {
    // 添加元素有两种场景，一是链表为空，一是不为空
    var node = new Node(element),
      current;
    if (head === null) {
      // 链表的第一个节点
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      // 找到最后一项，将其next属性指向node，建立连接
      current.next = node;
    }
    length++; // 更新链表长度
  };

  this.removeAt = function () { };

  class Person {
    constructor() {
      this.name = "jack";
    }
    a = function () {
      console.log(this.name);
    };
    b() {
      console.log(this.name);
    }
    // 下面的this绑定的是Person，而不是实例
    c = () => {
      console.log(this.name, this);
    };
  }
  var newPerson = new Person();
  var son = {
    name: "son",
    a: newPerson.a,
    b: newPerson.b,
    c: newPerson.c
  };
  son.c();

  function test() {
    myDom.on("keyup", () => {
      $.ajax({
        data: this.value,
        url: url,
        success: function (res) {
          body.html(res.html);
        }
      });
    });
  }

  var arr = new Array(10000).fill(0);

  console.time();
  for (var i = 0; i < 10000; i++) {
    console.log(0);
  }
  console.timeEnd();

  console.time();
  arr.forEach(() => {
    console.log(1);
  });
  console.timeEnd();

  // 防抖
  function debounce(fn, interval = 300) {
    return function (...args) {
      clearTimeout(fn.timerId);
      fn.timerId = setTimeout(() => {
        fn.apply(null, args);
      }, interval);
    };
  }
  window.onscroll = debounce(() => console.log(1));

  // 节流
  function throttle(fn, interval = 300) {
    let canRun = true;
    return function (...args) {
      if (!canRun) return;
      canRun = false;
      setTimeout(() => {
        fn.apply(null, args);
        canRun = true;
      }, interval);
    };
  }
  window.onscroll = throttle(() => {
    console.log("节流");
  });

  function throttle(method, context) {
    method();
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
      method.call(context);
    }, 300);
  }
  window.onscroll = throttle(() => {
    console.log(22);
  });

  // 数组去重
  var arr = [1, 1, 2, 2, 3];
  var uniqueArr = arr => {
    return arr.filter((val, idx, arr) => {
      return idx === arr.indexOf(val);
    });
  };
  var resArr = uniqueArr(arr);

  function getUniqueArr1(arr) {
    let obj = {};
    arr.forEach((val, idx, arr) => {
      obj[val] = 0;
    });
    return Object.keys(obj);
  }

  function getUniqueArr2(arr) {
    let obj = arr.reduce((prev, curt) => {
      prev[curt] = 0;
      return prev;
    }, {});
    return Object.keys(obj);
  }

  Promise.all = function (pArr) {
    let arr = [],
      i = 0;
    function processData(index, data) {
      // 序号和数据要一一对应
      arr[index] = data;
      i++;
      if (i === pArr.length) {
        Promise.resolve(arr);
      }
    }

    return new Promise((resolve, reject) => {
      for (let i = 0; i < pArr.length; i++) {
        pArr[i].then(data => {
          processData(i, data);
        }, reject);
      }
    });
  };

  const flatten = function (arr) {
    while (arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr);
    }
    return arr;
  };

  // 脱敏手机号
  "17610835815".replace(/(\d{4})*(\d{4})/g, "$1****$2");
  "17610835815".replace(/(\d{3})\d*(\d{4})/g, "$1****$2");

  // 下划线或中划线变驼峰
  "-a_bc-e_f-".replace(/\b([-|_]\w*)/g, function (all, letter) {
    console.log(all, letter);
  });

  "aBcDfe".replace(/([A-Z])/g, "-$1");
  "aBcDfe".replace(/([A-Z])/g, (all, letter) => {
    return `-${letter.toUpperCase()}`;
  });


  // 已知：
  // 每个月的天数：[20190430, 20190531, 20190630]
  // 最早月份的开始日期：20190426
  // 最晚月份的结束日期：20190606
  // 时间间隔：base = 2
  // 得出从开始到结束，每隔base天的日期数组？

  var start = new Date('2019-04-26');
  var end = new Date('2019-06-06');
  while (start.getTime() < end.getTime()) {
    let time = start.getTime() + 86400000
    start = new Date(time);
    // 你的逻辑处理
    console.log(start);
  }


  contains(parentNode, childNode) {
    if (parentNode.contains) {
      return parentNode != childNode && parentNode.contains(childNode);
    } else {
      return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
  },
  checkHover(e, target) {
    let getEvent = this.getEvent;
    let contains = this.contains;
    if (getEvent(e).type == "mouseover") {
      return (
        !contains(
          target,
          getEvent(e).relatedTarget || getEvent(e).fromElement
        ) &&
        !((getEvent(e).relatedTarget || getEvent(e).fromElement) === target)
      );
    } else {
      return (
        !contains(
          target,
          getEvent(e).relatedTarget || getEvent(e).toElement
        ) &&
        !((getEvent(e).relatedTarget || getEvent(e).toElement) === target)
      );
    }
  },
  getEvent(e) {
    return e || window.event;
  },

  getEle(ele) {
    if (typeof ele == "object") return ele;
    else if (typeof ele == "string" || typeof ele == "number")
      return document.getElementById(ele.toString());
    return null;
  },
  mousePos(e) {
    var x, y;
    var e = e || window.event;
    x =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    y =
      e.clientY +
      document.body.scrollTop +
      document.documentElement.scrollTop;

    return {
      x:
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft,
      y:
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop
    };
  },
  startMove() {
    var t = this.$refs.tip;
    window.onmousemove = e => {
      var mouse = this.mousePos(e);
      // t.style.left = mouse.x + 10 + "px";
      // t.style.top = mouse.y + 10 + "px";
      t.style.left = 1515 + "px";
      t.style.bottom = 0 + "px";
      t.innerHTML = "ddd";
      t.style.display = "";
    };
    window.onmouseout = () => {
      // t.style.display = "none";
    };
  },
  handleMouseMove(ev) {
    console.log("move");
    var ev = ev || event;
    ev.preventDefault();
    ev.stopPropagation();
    let domModel = document.querySelector(".model");
    domModel.style.left = ev.clientX + 20 + "px";
    domModel.style.top = ev.clientY - 10 + "px";
  },
  handleHover(e, val) {
    console.log("enter");
    var e = e || event;

    if (this.checkHover(e, this)) {

      console.log('dd');
      return;
    }
    // debugger;
    let domModel = document.querySelector(".model");
    domModel.style.display = "block";
    console.log("e", e);
    console.log("e.clientX", e.clientX);
    console.log("domModel.offsetLeft", domModel.offsetLeft); // 滚动后距离box最左边距离
    console.log("domModel.offsetWidth", domModel.offsetWidth);
    console.log("domModel.offsetHeight", domModel.offsetHeight);
    console.log("document.body.scrollLeft", document.body.scrollLeft);
    console.log(
      "document.documentElement.scrollLeft",
      document.documentElement.scrollLeft
    );
    domModel.style.left = e.clientX + 20 + "px";
    domModel.style.top = e.clientY - 20 + "px";
    // console.log('e', e, val);
    // this.mousePos(e);
    // this.startMove();

    this.$Modal.confirm({
      title: "Title",
      content: "<p>Content of dialog</p><p>Content of dialog</p>",
      onOk: () => {
        this.$Message.info("Clicked ok");
      },
      onCancel: () => {
        this.$Message.info("Clicked cancel");
      }
    });
  },
  handleMouseOut(item) {
    console.log("leave");

    let domModel = document.querySelector(".model");
    this.$Modal.remove();
    // domModel.style.display = "none";
  },


