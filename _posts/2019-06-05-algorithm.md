---
layout: post
title: 从现在起，开始学算法
date: Wed Jun 05 2019 23:26:32 GMT+0800 (中国标准时间)
---

> 突然发现身边好多大神，就属自己最菜。。。

### **参考资料**

[小白一路走来，连续刷题三年，谈谈我的算法学习经验(掘金)][haotostudyalgorithmurl(juejin)]、[漫画算法][comicalgorithmurl]

### **基本概念**

#### **栈结构**

```js
// 利用数组定义一个栈的类
function Stack() {
  var items = [];
  this.push = function(element) {
    items.push(element);
  };
  this.pop = function() {
    return items.pop();
  };
  this.peek = function() {
    return items[items.length - 1];
  };
  this.isEmpty = function() {
    return items.length == 0;
  };
  this.size = function() {
    return items.length;
  };
  this.clear = function() {
    items = [];
  };
  this.print = function() {
    console.log(items.toString());
  };
}

// 任意进制转2进制
function divideBy2(decNumber) {
  var remStack = new Stack(),
    rem,
    binaryString = "";
  do {
    // 取余数，并放到栈中
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    // 每次值变为一半，利用Math.floor还可以取整
    decNumber = Math.floor(decNumber / 2);
  } while (decNumber >= 0);

  while (!remStack.isEmpty()) {
    // 然后倒序拼接字符串
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}
divideBy2(8); // '1000'
divideBy2(10); // '1010'

// 如果想转成任意进制呢？如果封装？
// 二进制：要么0，要么1
// 八进制：0-7
// 十进制：0-9
// 十六进制：0-9，a-f
function divideByAny(decNumber, base = 2) {
  var remStack = new Stack(),
    rem,
    binaryString = "",
    digits = "0123456789ABCDEF";
  do {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  } while (decNumber != 0);

  while (!remStack.isEmpty()) {
    // 只需根据remStack里的数值对应从digits取即可
    // 比如要是10，则取A；如果是8，则依然是8
    binaryString += digits[remStack.pop()];
  }

  return binaryString;
}

divideByAny(8); // '1000'
divideByAny(8, 2); // '1000'
divideByAny(10, 16); // 'A'
```

#### **队列**

```js
function Queue() {
  var items = [];
  this.enqueue = function(element) {
    items.push(element);
  };
  this.dequeue = function() {
    return items.shift();
  };
  this.front = function() {
    return items[0];
  };
  this.isEmpty = function() {
    return items.length == 0;
  };
  this.clear = function() {
    items = [];
  };
  this.size = function() {
    return items.length;
  };
  this.print = function() {
    console.log(items.toString());
  };
}

// 实现一个优先队列，也就是说优先级越高，越靠前
function PriorityQueue() {
  var items = [];
  function QueueElement(element, priority) {
    // 这里定义两个变量
    this.element = element;
    this.priority = priority;
  }
  this.enqueue = function(element, priority) {
    var queueElement = new QueueElement(element, priority);
    if (this.isEmpty()) {
      items.push(queueElement);
    } else {
      var added = false;
      for (var i = 0; i < items.length; i++) {
        // priority越大优先级越低
        if (queueElement.priority < items[i].priority) {
          // 插队，插在items[i]前面
          items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      // 如果权限最低，则放在最后
      if (!added) {
        items.push(queueElement);
      }
    }
  };
  //其他方法和默认的Queue实现相同
  this.isEmpty = function() {
    return items.length == 0;
  };
  this.print = function() {
    let arr = [];
    for (let item of items) {
      arr.push(item.element);
    }
    console.log(arr);
  };
}

var p = new PriorityQueue();
p.enqueue("jack", 3);
p.enqueue("joan", 2);
p.enqueue("bar", 1);
p.enqueue("foo", 2);
p.print();
// ["bar", "joan", "foo", "jack"]

// 实现一个循环队列
// 击鼓传花游戏，在这个游戏中，游戏者围成一个圈，把花尽快的传递给旁边的人。某一时刻游戏停止，
// 这个时候花在谁的手里，谁就退出游戏。重复这个过程，直到只剩一个人(最后胜利者)
function hotPotato(nameList, num) {
  var queue = new Queue();
  // 先将所有人拷贝
  for (var i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }
  var eliminated = "";
  while (queue.size() > 1) {
    // num是传递次数，当达到传递次数时停止
    for (var i = 0; i < num; i++) {
      // 从对头拿下一个，放到对尾，直到规定次数结束
      queue.enqueue(queue.dequeue());
    }
    eliminated = queue.dequeue();
    console.log(eliminated + "在击鼓传花游戏中被淘汰。");
  }
  return queue.dequeue();
}
var names = ["John", "Jack", "Camila", "Ingrid", "Carl"];
var winner = hotPotato(names, 7);
console.log("胜利者：" + winner);
```

#### **链表**

数组提供了`[]`语法获取元素很是方便，然而（大多数语言中）数组的大小是固定的，从数组的起点或中间插入或移除元素的成本很高，因为需要移动元素。

而链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的，每个元素由一个存储元素本身的节点和一个指向下一个元素的引用组成。链表的好处在于，添加或移除元素的时候不需要移动其他元素。数组可以通过索引直接访问元素，而要想访问链表中的元素，需要从起点开始迭代列表直到找到所需要的元素。

可以将火车想象成一个链表，每节车厢通过铰链链接，断开任意两个车厢间的铰链就可以插入一节新的车厢。。。

#### **广度优先**

广度优先算法（`Breadth-First Search`），同广度优先搜索，又称作宽度优先搜索，或横向优先搜索，简称 BFS，是一种图形搜索演算法。简单的说，BFS 是从根节点开始，沿着树的宽度遍历树的节点，如果发现目标，则演算终止。广度优先搜索的实现一般采用 open-closed 表。

```js
// 遍历一个树状结构，要求输出一个数组，数组里元素顺序：从上到下，从左到右
var root = {
  val: "a",
  child: [
    {
      val: "b",
      child: [{ val: "c" }]
    },
    {
      val: "d",
      child: [
        {
          val: "e"
        },
        {
          val: "f"
        }
      ]
    }
  ]
};

// 其实就是把目标值放在一个数组，不断的去读取
function bfs(root) {
  let quene = [];
  let res = [];
  quene.push(root);
  while (quene.length) {
    debugger
    let node = quene.shift();
    res.push(node.val);
    if (!node.child) continue;
    for (let child of node.child) {
      quene.push(child);
    }
  }
  return res;
}

bfs(root);
// ["a", "b", "d", "c", "e", "f"]
```



### **常见算法题**

#### **字符串**

```js
// 题1、求最长公共前缀
// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".

// Example 1:
// Input: ["flower","flow","flight"]
// Output: "fl"

// Example 2:
// Input: ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.

// Note:
// All given inputs are in lowercase letters a-z.

// 方法一
// 1、找到字符串数组中长度最短字符串
// 2、longest common prefix 长度范围 0 ~ minLength
// 3、运用binary search

function isCommonPrefix(strs, middle) {
  const prefix = strs[0].substring(0, middle);
  for (let i = 1; i < strs.length; i++) {
    if (!strs[i].startsWith(prefix)) return false;
  }

  return true;
}
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  // trie 解法
  // 时间复杂度O(m) 空间复杂度O(m * n)

  // tag: 二分法
  // 时间复杂度 O(n*logm)  空间复杂度O(1)
  if (strs.length === 0) return "";
  if (strs.length === 1) return strs[0];

  let minLen = Number.MAX_VALUE;

  for (let i = 0; i < strs.length; i++) {
    minLen = Math.min(minLen, strs[i].length);
  }

  let low = 0;
  let high = minLen;

  while (low <= high) {
    const middle = (low + high) >> 1;
    if (isCommonPrefix(strs, middle)) low = middle + 1;
    else high = middle - 1;
  }

  return strs[0].substring(0, (low + high) >> 1);
};


// 方法二
/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  if (strs.length === 1) return strs[0];

  // 字符串的长度
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
```

```js
/*
请写一个字符串截取函数，按照最大140个汉字（280）个字符截断。
汉字在js中是两个字节，而我们只想要140个字节的字符串

思路：
curByteLen代表当前的字节数，byteSum代表想要截取的总字节数，len代表当前访问的字符串的位置。
while循环 遍历字符串，如果是两个字节的字符串，curByteLen+2，否则，curByteLen+2
注意：有可能curByteLen大于byteSum，比如说，你想从”3中国人“截取6个字符，最后curByteLen 的长度是7，就要把最后一个字符给去掉
*/


function trimStringByByte(inputStr, byteSum) {
  var newArr = [], len = 0, curByteLen = 0;
  while (inputStr[len] && curByteLen < byteSum) {
    // 其实就是利用字符的编码是否大于255来判断是否占用几个字节
    if (inputStr.charCodeAt(len) > 255) {
      curByteLen += 2;
      newArr.push(inputStr[len]);
      len++;
    } else {
      curByteLen += 1;
      newArr.push(inputStr[len]);
      len++;
    }
  }
  // 如果长度大于想截取的长度，说明最后一个是两个字节的，所以把它从数组中去掉
  if (curByteLen > byteSum) {
    newArr.pop();
  }
  return newArr.join('');
}

```

#### **数组**

```js
/*
两数之和
给定一个整数数组和目标值，找出数组中和为目标值的两个数
*/
function twoSum(nums, target) {
  let res = [];
  let numsLen = nums.length;
  for (let i = 0; i < numsLen; i++) {
    // 其实就是将两个值作为数组里的索引，而值就是要得到的目标索引
    let temp = target - nums[i]
    if (res[temp] !== void 0) retrun [res[temp], i];
    res[nums[i]] = i;
  }
}
/*
最大子序和
给定一个整数数组，求这个数组中，哪个连续子数组的和最大，和是多少

直接forEach，然后累计加和，如果和每次都增大，则继续累加，如果和小于0，又从0开始计数
*/
var maxSubArray = function(nums) {
  var maxn = -Number.MAX_VALUE;
  var sum = 0;
  nums.forEach(function(item, index, array) {
    sum += item;
    if (sum > maxn)
      maxn = sum;
    if (sum < 0)
      sum = 0;
  });

  return maxn;
};

maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) // 6

```

### **相关链接**

[haotostudyalgorithmurl(juejin)]: https://juejin.im/post/5cf5d203e51d45590a445afd "小白说算法如何学"
[comicalgorithmurl]: https://cloud.tencent.com/developer/article/1101517 "程序员小灰漫画算法"
