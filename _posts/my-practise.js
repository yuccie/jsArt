// 求两个二进制字符串的和，返回依然是二进制
function addBinary (a, b) {
  debugger
  a = a.split('').reverse();
  b = b.split('').reverse();

  let c = [];
  let add = 0;
  for(var i = 0, len = Math.max(a.length, b.length); i < len; i++) {
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
  toLocaleString: function() {
    return "Nikolaos";
  },

  toString: function() {
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
  .catch(function(thrown) {
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
var getInstance = function(fn) {
  let result;
  return result || (result = fn.call(this, arguments));
};

// 防抖和节流都用闭包
function debounce(fn, interval = 300) {
  let timeout = null;
  return function(...args) {
    clearTimeout(timeout);
    setTimeout(() => {
      fn.apply(this, args);
    }, interval);
  };
}

function throttle(fn, interval) {
  let canRun = true;
  return function(...args) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, interval);
  };
}

var count = 0;
var fibonacci = function(n) {
  count++;
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
for (var i = 0; i <= 10; i++) {
  fibonacci(i);
}
console.log(count); // 453

// 下拉刷新
(function(window) {
  var _element = document.getElementById("refreshContainer"),
    _refreshText = document.querySelector(".refreshText"),
    _startPos = 0,
    _transitionHeight = 0;

  _element.addEventListener(
    "touchstart",
    function(e) {
      console.log("初始位置：", e.touches[0].pageY);
      _startPos = e.touches[0].pageY;
      _element.style.position = "relative";
      _element.style.transition = "transform 0s";
    },
    false
  );

  _element.addEventListener(
    "touchmove",
    function(e) {
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
    function(e) {
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
  var Node = function(element) {
    this.element = element;
    this.next = null;
  };

  var length = 0; // 链表具有length属性
  var head = null; // 存储下一节点的引用

  this.append = function(element) {}; // 尾部添加一项
  this.insert = function(position, element) {}; // 特定位置插入一项
  this.removeAt = function(position) {}; // 移除一项
  this.remove = function(element) {}; // 返回索引
  this.indexOf = function(element) {}; // 移除特定位置的项
  this.isEmpty = function() {}; // 是否为空
  this.size = function() {}; //链表的元素个数
  this.toString = function() {}; //由于使用Node类，因此需要重写继承的toString方法
  this.print = function() {};
}

this.append = function(element) {
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

this.removeAt = function() {};

class Person {
  constructor() {
    this.name = "jack";
  }
  a = function() {
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
      success: function(res) {
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
  return function(...args) {
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
  return function(...args) {
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
  method.tId = setTimeout(function() {
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

Promise.all = function(pArr) {
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

const flatten = function(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
};

// 脱敏手机号
"17610835815".replace(/(\d{4})*(\d{4})/g, "$1****$2");
"17610835815".replace(/(\d{3})\d*(\d{4})/g, "$1****$2");

// 下划线或中划线变驼峰
"-a_bc-e_f-".replace(/\b([-|_]\w*)/g, function(all, letter) {
  console.log(all, letter);
});

"aBcDfe".replace(/([A-Z])/g, "-$1");
"aBcDfe".replace(/([A-Z])/g, (all, letter) => {
  return `-${letter.toUpperCase()}`;
});
