import { false } from "./good-codes/is";

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


{
  "ret": "success",
    "code": "0",
      "message": null,
        "data": {
    "minDate": "2019-04-26T00:00:00.000+0000",
      "maxDate": "2019-06-05T00:00:00.000+0000",
        "currentDate": "2019-07-06T05:09:44.198+0000",
          "dataList": [
            {
              "accessToken": null,
              "pageNo": 1,
              "pageSize": 20,
              "offset": 0,
              "id": 78,
              "projectKey": "SJQDQ",
              "projectId": 10469,
              "projectName": "社交&渠道&群工具",
              "projectPriority": "",
              "projectCategory": "社交&渠道&群工具",
              "projectType": "software",
              "leadKey": "gaowm",
              "leadDisplayName": "文明 高",
              "deptId": 277,
              "deptName": "社交研发组",
              "firstDeptId": 66,
              "firstDeptName": "增长后端研发",
              "startTime": "2019-05-01",
              "roughPlanTime": "1970-01-01",
              "detailPlanTime": "1970-01-01",
              "techPlanTime": "1970-01-01",
              "trackPlanTime": "1970-01-01",
              "startPlanTime": "2019-05-11",
              "testPlanTime": "2019-05-21",
              "prePublishTime": "1970-01-01",
              "grayPublishTime": "1970-01-01",
              "publishTime": "1970-01-01",
              "finishTime": "2019-05-31",
              "prospectiveEarnings": "",
              "realizeEarnings": "",
              "earningsConfirm": 0,
              "planConfirmDate": "1970-01-01",
              "confirmDate": "1970-01-01",
              "issueCount": 40,
              "issueFinishCount": 20,
              "issueDeliveryInTimeCount": 6,
              "issueLife": 354,
              "issueLifeCount": 20,
              "issueApprovedInTimeCount": 1,
              "issueApprovedCount": 11,
              "taskCount": 122,
              "taskFinishCount": 100,
              "taskDeliveryInTimeCount": 25,
              "taskLife": 960,
              "taskLifeCount": 100,
              "bugCount": 0,
              "bugFinishCount": 0,
              "bugLife": 0,
              "bugLifeCount": 0,
              "bugUrgentCount": 0,
              "projectStoryStage": "",
              "projectStoryStageTime": "新建=14.0;分析中=0.0;排期中=1.0;开发中=32.0;待验收=23.0;测试中=0.0;待上线=0.0;已关闭=0.0;新建/10000=1.0;",
              "projectTaskStage": "",
              "projectTaskStageTime": "新建=480.0;",
              "planCostDay": 7,
              "realCostDay": 19,
              "groupName": null,
              "groupType": null,
              "delFlag": 1,
              "updateTime": "2019-07-05T17:08:49.000+0000",
              "projectList": null,
              "projectTotalResource": null,
              "startOfPage": 0
            },
            {
              "accessToken": null,
              "pageNo": 1,
              "pageSize": 20,
              "offset": 0,
              "id": 79,
              "projectKey": "SJQDQGJ",
              "projectId": 10470,
              "projectName": "社交&渠道&群工具BUG",
              "projectPriority": "",
              "projectCategory": "社交&渠道&群工具",
              "projectType": "software",
              "leadKey": "liukai",
              "leadDisplayName": "凯 刘",
              "deptId": 614,
              "deptName": "增长测试组",
              "firstDeptId": 74,
              "firstDeptName": "运营管理和质量",
              "startTime": "2019-05-01",
              "roughPlanTime": "1970-01-01",
              "detailPlanTime": "1970-01-01",
              "techPlanTime": "1970-01-01",
              "trackPlanTime": "1970-01-01",
              "startPlanTime": "2019-05-10",
              "testPlanTime": "2019-05-21",
              "prePublishTime": "1970-01-01",
              "grayPublishTime": "1970-01-01",
              "publishTime": "1970-01-01",
              "finishTime": "2019-06-02",
              "prospectiveEarnings": "",
              "realizeEarnings": "",
              "earningsConfirm": 0,
              "planConfirmDate": "1970-01-01",
              "confirmDate": "1970-01-01",
              "issueCount": 0,
              "issueFinishCount": 0,
              "issueDeliveryInTimeCount": 0,
              "issueLife": 0,
              "issueLifeCount": 0,
              "issueApprovedInTimeCount": 0,
              "issueApprovedCount": 0,
              "taskCount": 0,
              "taskFinishCount": 0,
              "taskDeliveryInTimeCount": 0,
              "taskLife": 0,
              "taskLifeCount": 0,
              "bugCount": 245,
              "bugFinishCount": 216,
              "bugLife": 1238,
              "bugLifeCount": 216,
              "bugUrgentCount": 124,
              "projectStoryStage": "",
              "projectStoryStageTime": "",
              "projectTaskStage": "",
              "projectTaskStageTime": "",
              "planCostDay": 0,
              "realCostDay": 0,
              "groupName": null,
              "groupType": null,
              "delFlag": 1,
              "updateTime": "2019-07-05T17:08:49.000+0000",
              "projectList": null,
              "projectTotalResource": null,
              "startOfPage": 0
            },
            {
              "accessToken": null,
              "pageNo": 1,
              "pageSize": 20,
              "offset": 0,
              "id": 79,
              "projectKey": "SJQDQGJ",
              "projectId": 10470,
              "projectName": "社交&渠道&群工具BUG",
              "projectPriority": "",
              "projectCategory": "社交&渠道&群工具",
              "projectType": "software",
              "leadKey": "liukai",
              "leadDisplayName": "凯 刘",
              "deptId": 614,
              "deptName": "增长测试组",
              "firstDeptId": 74,
              "firstDeptName": "运营管理和质量",
              "startTime": "2019-05-11",
              "roughPlanTime": "1970-01-01",
              "detailPlanTime": "1970-01-01",
              "techPlanTime": "1970-01-01",
              "trackPlanTime": "1970-01-01",
              "startPlanTime": "2019-05-16",
              "testPlanTime": "2019-05-21",
              "prePublishTime": "1970-01-01",
              "grayPublishTime": "1970-01-01",
              "publishTime": "1970-01-01",
              "finishTime": "2019-05-26",
              "prospectiveEarnings": "",
              "realizeEarnings": "",
              "earningsConfirm": 0,
              "planConfirmDate": "1970-01-01",
              "confirmDate": "1970-01-01",
              "issueCount": 0,
              "issueFinishCount": 0,
              "issueDeliveryInTimeCount": 0,
              "issueLife": 0,
              "issueLifeCount": 0,
              "issueApprovedInTimeCount": 0,
              "issueApprovedCount": 0,
              "taskCount": 0,
              "taskFinishCount": 0,
              "taskDeliveryInTimeCount": 0,
              "taskLife": 0,
              "taskLifeCount": 0,
              "bugCount": 245,
              "bugFinishCount": 216,
              "bugLife": 1238,
              "bugLifeCount": 216,
              "bugUrgentCount": 124,
              "projectStoryStage": "",
              "projectStoryStageTime": "",
              "projectTaskStage": "",
              "projectTaskStageTime": "",
              "planCostDay": 0,
              "realCostDay": 0,
              "groupName": null,
              "groupType": null,
              "delFlag": 1,
              "updateTime": "2019-07-05T17:08:49.000+0000",
              "projectList": null,
              "projectTotalResource": null,
              "startOfPage": 0
            },
          ],
          "monthList": [
              "20190430",
              "20190531",
              "20190630"
            ]
  }
}