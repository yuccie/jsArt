---
layout: post
title: 从现在起，开始学算法
date: Wed Jun 05 2019 23:26:32 GMT+0800 (中国标准时间)
---

> 突然发现身边好多大神，就属自己最菜。。。

## **参考资料**

[小白一路走来，连续刷题三年，谈谈我的算法学习经验(掘金)][haotostudyalgorithmurl(juejin)]、[漫画算法][comicalgorithmurl]
[如何刷leetcode](https://www.zhihu.com/question/280279208/answer/824585814)
[常见算法复杂度](https://www.bigocheatsheet.com/)

## **基本概念**

- 如果不熟悉复杂度分析，如何做容量规划？
- 如果不清楚B+树, 又如何能够真正理解innodb的索引，并对查询过程了如指掌 ？
- 如果不能理解hash算法帮助我们如何在O(N)时间复杂度解决两数和的问题，又怎么能有信心去理解redis的hash结构在短链接生成等各种场景下实践？

解题步骤：

1. 5-10分钟读题和思考
2. 有思路则开始写代码，否则，马上看题解
3. 默写背诵，直到熟练
4. 然后开始自己写（闭卷）
5. 提交成功后，需要再写四遍，一共五遍（五毒神掌）

1. 先整理思路，列出所有的方式，先不用考虑要求


误区：
- 最大的误区就是刷一遍
- 

核心思量：
- 升维，查看别人的代码，学习更好的方式
- 要思考空间换时间
- 提交成功后，再去leetcode国际站点上看看是世界各地的解法

#### 刷题步骤

1. 算法的复杂度分析。  
2. 排序算法，以及他们的区别和优化。
3. 数组中的双指针、滑动窗口思想。
4. 利用 Map 和 Set 处理查找表问题。
5. 链表的各种问题。
6. 利用递归和迭代法解决二叉树问题。
7. 栈、队列、DFS、BFS。
8. 回溯法、贪心算法、动态规划。

## 算法(极客时间)

- 开始，排序算法
- 第一周(7/18之前)，数组、链表、跳表；栈、队列（优先于双端）
- 第二周(7/25之前)，哈希表，映射，集合；树、二叉树、二叉搜索树；堆、二叉堆和图
- 第三周(7/25之前)，递归、分治和回溯；
- 第四周(7/25之前)，深度、广度优先搜索；贪心算法与二分查找；
- 第五周(7/25之前)，动态规划
- 第六周(7/25之前)，并查集、字典树、红黑树和AVL树
- 第七周(7/25之前)，位运算、布隆过滤器和 LRU Cache 算法；
- 第八周(7/25之前)，字符串算法

### 前言

- 用白板写出解决问题的能力，不考虑语言、框架什么的
- 算法和数据结构是有趣且实用的。
- 区块链采用的数据结构就是链表，但现在也有其他新的结构。每个区块内部采用二叉树记录交易信息

### 如何有效学习算法与数据结构

学习算法和数据结构**不是去记忆，而是理解和训练**。

- 一万个小时
- 切碎知识点(将知识点挂在一颗树上，然后系统的记忆。不然记不住)
- 刻意练习（如果练习的很不舒服，那就对了，也就是刻意练习）
- 反馈（feedback），主动找高手题解，被动反馈（codereview等）


切题四件套：

- 明确题意，看数据边界
- 找出所有解决方法（分析复杂度，找到最优）
- coding
- 加上一些测试的样例

### 时间、空间复杂度

数学上的证明比较复杂，这里就略过，只需要知道基本的计算方式，然后记住常用的复杂度即可。

- O(1)，常数级，只要值是有限即是
- O(n)，线性级，一层循环
- O(n^2)，双层循环
- O(logn)，2^k = n，所以 k = logn;
- O(k^n)，循环一个数的n次方次，我们经常循环n次，这里循环 k^n次即可
- O(n!)，循环一个数的阶层次，我们经常循环n次，这里循环 n!次即可

```js
// O(n)复杂度
function total(n) {
  var sum = 0;
  for (var i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// O(1)
function total(n) {
  var sum = n*(n+1)/2
  return sum;
}

// 斐波那契数组 1、1、2、3、5、8、13、21...
// 思考复杂度是多少？
function fibo(n) {
  if (n < 2) return 1;
  return fibo(n-1) + fibo(n-2);
}
```

观察下图，可以看出，当执行f(6)时，需要执行f(5)、f(4)，当执行f(5)时又需要执行f(4)、f(3)，另一个分支计算f(4)时，又需要执行f(3)、f(2)...依次类推，运算的次数大概就是 2^n次，也就是指数级的复杂度。
![斐波那契循环次数](/jsArt/assets/images/algorithm/fib.png)

任何一个分治或递归的函数，都可以算出他的复杂度。怎么算，就是通过[主定理](https://zh.wikipedia.org/wiki/%E4%B8%BB%E5%AE%9A%E7%90%86)

### leetcode进行算法练习

- 三分学习，7分练习。
- 坚持、刻意练习
- 练习弱点，缺陷的题
- 不舒服、不爽、枯燥，这是很正常，因为跳出了舒适区
- 解题步骤，必须是切题四件套

```js
// 两数之和
// 方式1、双层循环，O(n^2)
// 方式2、查询一个数是否在数组中存在，可以利用hash或map，复杂度O(n)
function twoSum(arr, target) {
  let map = {};
  for (let i = 0; i < arr.length; i++) {
    // 遍历arr[i]，然后判断target - arr[i]是否在数组中即可
    let temp = target - arr[i];
    if (map[temp] !== undefined) {
      // 这里map[temp]是先记录的，肯定小于i，所以放前面
      return [map[temp], i]
    } else {
      // 如果target - arr[i]不在数组中，继续记录arr[i]
      map[arr[i]] = i;
    }
  }
  return '没找到'
}
```

### 数组与链表

两种都是线性数据结构，

- 数组，内存连续，查询O(1)，删除和插入O(n)
- 链表，内存可以不连续，删除和插入O(1)，查询O(n)，**主要应用场景**：删除和插入操作多、不知道元素的个数

长度为n的数组，删除第i个元素，要移动后面 n-i 个元素；在第i个元素之前插入，需要移动包括i在内的 n-i+1 个元素。

- 单链表（linkedList）、双链表（doublyLinkedList）
- 在链表中，tail属性用来保存对列表最后一项的引用，而head属性保存列表第一项的引用

如下图，除了next指针用来连接链表的元素，还有head和tail用来记录头指针和尾指针。其实就是告诉你聊表的头在哪，尾在哪

![链表指针图指向](/jsArt/assets/images/algorithm/linkedList.png)


双向链表无非是又多一个prev指针，同时在查询时，不但可以向后，还可以向前查询

![双链表指针图指向](/jsArt/assets/images/algorithm/doubleLinkedList.png)

习题训练：

<font color="red">题：反转链表</font>

```js
// https://leetcode-cn.com/explore/?utm_source=LCUS&utm_medium=banner_redirect&utm_campaign=transfer2china
// 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。
// 1->2->3->4->5->null
// 5->4->3->2->1->null
// 注意这里看似输入的是数组，但不可能在控制台，因为这是链表结构
function reverseList(head) {
  // 这里头结点head可以理解为第一个节点，第一个节点上有next属性
  let prev = null;
  let cur = head;

  // 当cur节点指向null了，就不再循环
  while(cur) {
    // 暂存当前节点的next指向
    let oldNext = cur.next;
    // 重新制定当前节点的指向
    cur.next = prev;

    // 把当前节点作为新一轮的next指向
    prev = cur;
    // 将暂存的旧next指向当做当前节点
    cur = oldNext;
  }

  // 循环完之后，prev指向的就是头结点
  return prev;
}

// 我的思路1：遍历链表，记录每个节点的指针引用，放到一个数组中，然后再次遍历链表，倒序赋值节点的next指针。👇1不行
var reverseList1 = function(head) {
  // head理解为第一个节点，理论上头结点只有head,tail？
  // 直接从函数里拿到的是const类型？是let类型，可以修改
  // 这里赋值的目的，是因为每次处理的不同，看起来直观
  let cur = Object.assign({}, head);
  let arr = [];
  while(cur) {
    arr.unshift(cur.next);
    cur = cur.next
  }

  cur = Object.assign({}, head); // 引用类型
  let idx = 0;
  while(cur) {
    let oldNext = cur.next
    cur.next = arr[idx];
    cur = oldNext;
  }
  return arr;
};

// 上面代码两个错误：
// 1、理论上数组中确实保存的是cur.next，但应该是cur.val
// 2、打印head确实是引用类型，但cur = head;这里就可以直接赋值。。。
var reverseList2 = function(head) {
  let cur = head;
  let arr = [];
  while(cur) {
    arr.push(cur.val);
    cur = cur.next
  }

  cur = head;
  let idx = 0;
  while(cur) {
    cur.val = arr.pop();
    cur = cur.next;
  }
  return head;
};
reverseList2([1,2,3,4,5])




function reverseLine(head) {
  // head就是一个指针，和null一样，就是单个独立的值，但其指向的是链表中的一段
  let pre = null;
  let cur = head; // 从当前的head处理

  while(cur) {
    // 保存旧的链表端指向，
    let old = cur.next;

    // 将指向改变，本来指向下一个，改为指向最后面的一个
    cur.next = pre;

    // 此时cur就可以理解为新的pre了
    pre = cur;
    // 然后将之前保存的下一个节点给cur
    cur = old
  }
  return pre;
}

// 遍历节点
function reverseLine(head) {
  let 
}
```




<font color="red">题24. 两两交换链表中的节点</font>

>给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
>
> 例如：给定 1->2->3->4, 你应该返回 2->1->4->3.
```js
// 我的思路1：怎么获取总长度？然后根据2*i来处理？
var swapPairs = function(head) {
  let nodeArr = [];
  let cur = head;
  // 遍历链表，将值存放到数组，获取长度
  while(cur) {
    nodeArr.push(cur.val);
    cur = cur.next;
  };

  // 数组长度偶数和奇数处理
  let len = nodeArr.length;
  if (len % 2 === 0) {
    // 循环一次，向后移动2项，再次循环
    for (let i = 0; i < len; i=i+2) {
      [nodeArr[i], nodeArr[i+1]] = [nodeArr[i+1], nodeArr[i]]
    }
  } else {
    // 最后一项不用交换
    for (let i = 0; i < len - 1; i=i+2) {
      [nodeArr[i], nodeArr[i+1]] = [nodeArr[i+1], nodeArr[i]]
    }
  }

  // 初始化链表
  let newHead = new ListNode();
  let cur = newHead;
  for (let i = 0;i < len; i++) {
    cur.next = new ListNode(nodeArr[i]);
    cur = cur.next;
  }
  return newHead.next;
}

// 其他思路
var swapPairs = function(head) {
  // 如果头结点为空或只有一个子节点，直接返回
  if (!head || head.next === null) return head;
  // 初始化第一、第二个节点
  let [firstNode, secondNode] = [head, head.next];
  // 交换后，第一个节点的next应该指向第三个节点，而第三个节点是secondNode.next
  firstNode.next = swapPairs(secondNode.next);
  // 第二个节点的next应该指向第一个节点
  secondNode.next = firstNode;

  // 翻转完成后，secondNode变为了当前这段链表的头节点，可以返回给上一层的递归，作为上一层翻转时，firstNode.next的指向。
  return secondNode
};

// 更简洁写法
var swapPairs2 = function(head) {
  if (!head || !head.next) return head;
  let [fst, snd] = [head, head.next];
  [fst.next, snd.next] = [swapPairs(snd.next), fst];
  return snd;
}
```

总结：
- 链表的节点可以通过node.next.next...无限寻址
- 递归需要学习

<font color="red">题141. 环形链表</font>

>给定一个链表，判断链表中是否有环。
```js
// 思路一：规定一个时间段，比如0.5s，一直执行判断head.next.next...是否为null，为null则没有环，当然这就是一条胡同走到黑的解法
// 思路二：利用set数据结构，每访问一个节点，就将该节点的next用set存储下来，如果没有重复的则没有环。
// 思路三：利用快慢指针，想象成两个人，一人每次走两步，一人每次走一步，如果没有环的话，两个人肯定不会相遇。否则就会相遇

/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 利用set数据结构
var hasCycle = function(head) {
  // 利用set数据结构，set结构的key可以为对象
  let mySet = new Set();
  let cur = head;
  while(cur) {
    if (mySet.has(cur.next)) return true;
    mySet.add(cur.next);
    cur = cur.next;
  }
  return false
  // 整体时间复杂度：遍历O(n)，从set里取值为O(1) => O(n*1)
  // 整体空间复杂度：遍历O(n)
};

// 利用快慢指针
var hasCycle = function(head) {
  let fast = slow = head;

  while(fast && fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }
  return false
};
```

### 堆栈和队列

- 堆栈（stack），先进后出
- 队列（queue），排队，先进先出

注意：堆栈和堆不一样，堆的英文为 heap

<font color="red">题20：有效的括号</font>

>给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
>
>有效字符串需满足：
>
>左括号必须用相同类型的右括号闭合。
>左括号必须以正确的顺序闭合。
>
>注意空字符串可被认为是有效字符串。

```js
var isValid = function(s) {
  let stack = [];
  // 注意这里是右括号作为key
  let map = {
    ')': '(',
    ']': '[',
    '}': '{',
  }
  for (let item of s) {
    // 如果map里没有，则说明是左侧符号
    if (!map[item]) {
      stack.push(item);
    } else {
      if (stack.pop() !== map[item]) {
        return false;
      }
    }
  }
  // if (stack.length) {
  //   return false;
  // } else {
  //   return true;
  // }
  return !stack.length
};

var isValid = function(s) {
  // 正则匹配字符串，遇到成对的符号就替换成''
  let len = 0;
  // 需要一个终止条件，就是长度经过一轮替换，如果没有变化，说明已经到头了
  while(len !== s.length) {
    len = s.length;
    s = s.replace('()', '').replace('{}', '').replace('[]', '');
  }
  return !s.length;
}
```

<font color="red">题225. 用队列实现栈</font>

<font color="red">题232. 用栈实现队列</font>

>使用栈实现队列的下列操作：
>push(x) -- 将一个元素放入队列的尾部。
>pop() -- 从队列首部移除元素。
>peek() -- 返回队列首部的元素。
>empty() -- 返回队列是否为空。

```js
var MyQueue = function() {
    // 定义两个数组，相当于用两个数组来回倒腾数据，有种负负得正的感觉
    this.stack1 = [];
    this.stack2 = [];
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    // 向队列里添加元素，只需push进stack1即可
    this.stack1.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    // 从队列首部移除元素，也就是最开始的元素
    // 所以要将stack1里的元素拿到stack2里，然后删除最后一个
    if (this.stack1.length) {
        for (let item of this.stack1) {
            this.stack2.unshift(item);
        }
        // 移动完，需要清空stack1
        this.stack1 = [];
    }
    return this.stack2.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    // 返回队列首部的元素
    if (this.stack1.length) {
        for (let item of this.stack1) {
            this.stack2.unshift(item);
        }
        // 移动完，需要清空stack1
        this.stack1 = [];
    }
    return this.stack2[this.stack2.length - 1];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return !this.stack1.length && !this.stack2.length
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

### 优先队列

两种实现方式：
- 堆（二叉堆、多项式堆、斐波那契堆等等）
- 二叉搜索树

小顶堆，父节点小于子节点
大顶堆，父节点大于子节点

<font color="red">题703：实时判断数据流中第K大元素</font>

```js
// 我的思路，排序，取第k个元素的大小
// 思路：小顶堆
function swap(arr, idx1, idx2) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

// 
function KthLargest(k, nums) {
  // 小顶堆特点：父节点大于左右子节点
  this.minHeap = [null];
  this.k = k;
  nums.forEach(num => this.add(num))
}

KthLargest.prototype.add = (num) => {
  // 小顶堆未满
  if (this.minHeap.length <= this.k) {
    this.minHeap.push(num);
    // 调整堆的顺序
    this.up(this.minHeap.length - 1)
  } else {
    // 如果比堆顶元素大，则替换，并调整顺序
    if (num > this.minHeap[1]) {
       this.minHeap[1] = num;
       this.down(1);
    }
    // 否则丢弃
  }
  // 最后返回堆顶元素？
  return this.minHeap[1];
}

KthLargest.prototype.up = idx => {
  // 父节点索引
  let parent = Math.floor(idx / 2);
  if (parent >= 1 && this.minHeap[parent] > this.minHeap[idx]) {
    swap(this.minHeap, parent, idx);
    // 递归上浮
    this.up(parent);
  }
}

KthLargest.prototype.down = idx => {
  let to = idx;
    // 和左子元素比较
    let left = idx * 2;
    if (left < this.minHeap.length && this.minHeap[left] < this.minHeap[to]) {
        to = left;
    }
    // 和右子元素比较
    let right = idx * 2 + 1;
    if (right < this.minHeap.length && this.minHeap[right] < this.minHeap[to]) {
        to = right;
    }
    if (to !== idx) {
      swap(this.minHeap, to, idx);
      // 递归下沉
      this.down(to);
    }
}
```

## javascript 数据结构与算法

#### 数据结构绪论

数据：是描述客观事物的符号，是计算机中可以操作的对象，是能被计算机识别，并输入给计算机处理的符号集合。数据不仅仅包括数值类型，还包括字符、声音、图像、视频等非数值类型。

数据元素：是组成数据的、有一定意义的基本单位，在计算机中通常作为整体处理。也被称为记录。比如人类中，人就是数据元素，畜类中，牛，马，羊，猴等都是畜类的数据元素。

数据项：一个数据元素可以由多个数据项组成。比如人这样的数据元素，可以有眼，耳朵，鼻子，嘴巴，手脚等数据项，也可以有姓名、年龄等，具体有哪些数据项，要根据你要做的系统来定。数据项是数据不可分割的最小单位。

数据对象：是性质相同的数据元素的集合，是数据的子集。性质相同，指的是数据元素具有相同数量和类型的数据项。

数据对象是数据的子集，在实际应用中，处理的数据元素通常具有相同性质，在不产生混淆的情况下，我们将数据对象简称为数据。

数据结构：是相互间存在一种或多种特定关系的数据元素的集合

这些特定关系其实就分为两种：逻辑结构、物理结构

逻辑结构：集合机构、线性机构、树形结构、图形结构

物理结构：指数据的逻辑结构在计算机中的存储形式。分为：顺序存储和链式存储结构

逻辑结构是面向问题的，而物理结构是面向计算机的。

数据类型：是指一组性质相同的值得集合以及定义在此集合上的一些操作的总称。数据类型是按照值得不同进行划分的。

抽象：是指抽出事物具有的普遍性的本质。

对已有的数据类型进行抽象，就有了抽象数据类型。

抽象数据类型：是指一个数据模型及定义在该模型上的一组操作。

#### 线性表

典故：幼儿园接孩子时，老师都是让孩子们排好队，一个孩子拉着另一个孩子的衣服，然后挨个的将孩子交给家长，有什么寓意吗？

线性表：零个或多个数据元素的有限序列。

实际生活中的线性表：排队购票，点名册等等

##### 线性表的抽象数据类型

如果将生活中的线性表抽象成数据类型，其实就是线性表，排队中的插队其实就是线性表的插入数据等等。因此抽象，不但抽象了数据模型还定义了该模型上的一组操作。

##### 线性表的顺序存储结构

主要分两种物理结构：

- 顺序存储结构，用一段地址连续的存储单元依次存储线性表的数据元素
- 是

顺序存储结构的三个属性：

- 存储空间的起始位置
- 线性表的最大存储容量，即数组的长度
- 线性表的当前长度

数组长度和线性表长度区别：数组的长度是存放线性表的存储空间的长度，一般定义后是不会变的，当然也可以通过数组的操作来变化，当然这会有性能上的损耗（元素的移动）。线性表的长度是线性表中数据元素的个数，随着线性表插入和删除操作的进行，这个量是变化的。因此：在任意时刻，线性表的长度应该小于等于数组的长度。

其实通俗的理解就是：数组长度是预先定义的，而线性表的长度是实际的长度，前缀侧重理论 ，后者侧重实际。又因为线性表需要删除或插入，因此一般分配的数组空间要大于等于当前线性表的长度。

内存中地址计算方法：内存中的地址，和图书馆或电影院里的座位一样，都是有编号的，当确定第一个存储位置后，后面第i个元素的位置就可以计算出来，因为每个存储空间大小是恒定的。

**顺序存储结构的存入与取出**，对于这种顺序存储结构，要想存入（位置有了，只需将数据放入而已）或取出一个元素的值，消耗的时间复杂度为O(1)。

**顺序存储结构的插入与删除**：

**插入操作**：比如排队，插入一个人，则后面所有人都需要向后移动一位。

如果写成算法，思路如下：

1. 如果插入位置不合理，抛出异常
2. 如果线性表长度大于数组长度（比如只能10人排队，又插入一个），则抛出异常或动态增加容量
3. 从最后一个元素开始想前遍历到第i个位置，分别将他们向后移动一位
4. 将待插入的元素放入位置i处
5. 表长度加1（数组和线性表还需要再核实 ？）

```js
// 感觉不太合适。。。
function listInsert(arr, i, ele) {
  let len = arr.length;
  if (i === len) return '线性表已满';
  if (i < 0 || i > len) return '插入位置不对';

  if (i < len) {
    for (let j = len -1; j >= i - 1; j-- ) {
      arr[j+1] = arr[j]
    }
    arr[i-1] = undefined;
  }
  arr[i-1] = ele;
  return arr;
}
var arr = [1,2,3,4,,];
listInsert(arr, 2, 22); // [1, 22, 2, 3, 4, undefined]
```

**删除操作**：比如排队，中间某个人走了，则后面所有人都需要向前移动一位。

如果写成算法，思路如下：

1. 如果删除位置不合理，抛出异常
2. 取出删除元素
3. 从删除位置开始遍历到最后一个元素，分别将他们向前移动一位
4. 表长度减1（数组和线性表还需要再核实 ？）

```js
// 感觉不太合适。。。
function listDelete(arr, i) {
  let len = arr.length;
  if (len === 0) return '线性表为空';
  if (i < 0 || i > len) return '删除位置不对';

  let ele = arr[i];

  if (i < len) {
    for (let j = i ; j < len; j++) {
      arr[j] = arr[j+1]
    }
  }
  return arr;
}
var arr = [1,2,3,4];
listDelete(arr, 2); // [1, 2, 4, undefined]
```

插入或删除的最好情况：即操作的最后一个元素，则不需要移动，时间复杂度为O(1);
插入或删除的最坏情况：即操作的第一个元素，则需要全部移动，时间复杂度为O(n);
平均情况呢：即操作的是第i个元素，则需要移动 n-i 个元素，~~所以总的移动次数为 (n-1) + (n-2) + ... + 1 + 0 = n*(n+1)/2，操作每个元素的概率为 1/n，因此平均移动次数和中间的那个元素的移动次数相同，为 n-1 / 2~~

因此平均复杂度还是 O(n)，因此**对于线性表，存入和读取数据的时间复杂度为O(1)，而插入和删除数据的时间复杂度为O(n)，因此比较适合元素个数不太变化，而更多的是存取数据的应用**。

线性表顺序存储结构的优缺点：
#### 数据结构与算法关系

其实数据结构和算法完全可以分割开来，但是如果只讲数据结构可能感觉不太强烈，但如果配合算法来分析，就能更加深刻的体会数据结构。

先看两种累加1-10000算法的比较：

```js
// 方式一
console.time();
let sum = 0, n = 10000;
for (let i = 0; i <= n; i++) {
  sum += i;
}
console.log(sum);
console.timeEnd(); // 0.50390625ms

// 方式二
console.time();
let sum = 0, n = 10000;
sum = ( n + 1 ) * n / 2
console.log(sum);
console.timeEnd(); // 0.12890625ms
```

##### 算法定义：

算法：解决特定问题求解步骤的描述，在计算机中表现为指令的有限序列，并且每条指令表示一个或多个指令。


##### 算法特性：

- 输入、输出
- 有穷性
- 确定性
- 可行性

##### 算法设计的要求：

- 正确性
- 可读性
- 健壮性
- 时间效率高和存储量低


##### 算法效率的度量方法：

- 事后统计法
- 事前分析估算法

##### 函数的渐进增长：

#### 数据结构

- 链表就是特殊化的树，因为链表可以有前后指针，分别指向上一下和下一个元素
- 树又是特殊化的图，树从上向下分支，不会形成环，但图可以形成环

二叉树遍历：

- 前序，根、左、右
- 中序，左、根、右
- 后序，左、右、根


```
    1
  2   3
 4 5 6 7
```
- 「先序遍历」：如果你按照 根节点 -> 左孩子 -> 右孩子 的方式遍历，每次先遍历根节点，遍历结果为 1 2 4 5 3 6 7；
- 「中序遍历」：同理，如果你按照 左孩子 -> 根节点 -> 右孩子 的方式遍历，遍历结果为 4 2 5 1 6 3 7；
- 「后序遍历」：如果你按照 左孩子 -> 右孩子 -> 根节点 的方式遍历，遍历结果为 4 5 2 6 7 3 1；
- 最后，层次遍历就是按照每一层从左向右的方式进行遍历，遍历结果为 1 2 3 4 5 6 7。


- 前序遍历的代码在进入到某一个节点之前的那个时间点执行
- 后续遍历代码在离开某个节点之后的那个时间点执行。

想象一维数组或链表的遍历，要么从前向后，要么从后向前，在树里因为是二维，所以遍历的方式有些不同。另外对于**树形结构用递归比较方便一些，如果用遍历比较麻烦（比如深度或广度优先遍历）**。其实递归本身是没有效率问题的，只是单纯的用傻傻的递归会有效率问题，比如斐波那契数列，递归配合缓存就可以提高很多效率。

二叉树中的节点最多只能有两个子节点:一个是左侧子节点，另一个是右侧子节点。这些定义有助于我们写出更高效的向/从树中插入、查找和删除节点的算法。二叉树在计算机科学中的应用非常广泛。

**二叉树搜索树(BST)是二叉树的一种**，但是它只允许你在左侧子节点存储(比根节点)小的值， 在右侧节点存储(比根节点)大(或者等于)的值。 所以中序遍历就是升序排列了，

**二叉树搜索树**的查询、插入、删除都是O(logn)的复杂度，而不是O(n)，不像数组插入是O(n)，查询是O(1)等，当总体来说O(logn)的复杂度比O(n)快的还是很多的

## **性能相关**

```js
// 检测某些逻辑循环n次，消耗的时间
function getTimePerformance(fn, n) {
  console.time();
  for (let i = 0; i < n; i++) {
    fn.apply(this);
  }
  console.timeEnd();
}
```


## **正则相关**

### 基本知识点

参考：[regExp对象(阮一峰)][howRexExpWorkUrlRuanYiFeng]、[通俗的正则][commonRegexUrl]、[正则表达式全集][allRegexUnitUrl]、[mdn正则表达式][mdnRegexUrl]

正则其实是有规律可循的，主要由以下几部分组成：

```js
// 1. 元字符(构成正则的基本元素
// 1.1、 . 匹配除换行符(\n),回车(\r),行分隔符(\u2028),段分隔符(\u2029)以外的任意字符  
// 1.2、 \w 匹配包括下划线的任何单词字符，等价于[A-Za-z0-9_]  
// 1.3、 \W 匹配任何非单词字符，等价于[^A-Za-z0-9_]  
// 1.4、 \s 匹配任意的空白符（空格，制表符，换页符）  
// 1.5、 \b 匹配单词的开始或结束(/\ba/.test('ab') ; /a\b/.test('da'))  
// 1.6、 ^ 匹配字符串的开始  
// 1.7、 $ 匹配字符串的结束  

// \b 的例子
/\bworld/.test('hello world') // true
/\bworld/.test('hello-world') // true
/\bworld/.test('helloworld')  // false

// \B 的例子
/\Bworld/.test('hello-world') // false
/\Bworld/.test('helloworld') // true

// 利用
'helloworld'.replace(/\Bworld/, ' ') // "hello "
'helloworld'.replace(/\B(?=world)/, ' ') // "hello world"
'helloworld'.replace(/(?=world)/, ' ') // "hello world"

// 利用基本元素可以写简单的正则表达式
\abc或者^abc // 匹配有abc开头的字符串
^\d\d\d\d\d\d\d\d$ // 匹配8位数字的QQ号码
^1\d\d\d\d\d\d\d\d\d\d$ // 匹配1开头11位数字的手机号码


// 2. 重复限定符  
// 2.1、 * 重复0次或更多次  
// 2.2、 + 重复一次或更多次  
// 2.3、 ？重复0次或一次  
// 2.4、 {n}重复n次  
// 2.5、 {n,}重复n次或更多次  
// 2.6、 {n,m}重复n到m次  

// 改造上面的正则表达式
\d{8}$      // 匹配8位数字的QQ号码
^1\d{10}$   // 匹配1开头11位数字的手机号码
^\d{14,18}$ // 匹配14~18位的数字
^ab*$       // 匹配a开头，0个或多个b结尾的字符串

// 注意查看下面的，或许因为数字太大，js引擎在匹配之前做了一层转化
/^1\d{10}/.test(176108358151234567892) // true
/^1\d{10}/.test(1761083581512345678923) // false
console.log(Number(1761083581512345678923)) // 1.7610835815123457e+21
/^1\d{10}/.test(1.7610835815123457e+21) // false


// 3. 分组
// 3.1、 (pattern)匹配pattern并获取这一匹配
// ^(ab)* // 匹配0个或多个ab开头

// 4. 转义
^(\(ab\))*  // 匹配0个或多个(ab)开头


// 5. 条件或符号
5.1 ^(130|131|132|155|156|185|186|145|176)\d{8}$  

// 6. 区间
^((13[0-2])|(15[56])|(18[5-6])|145|176)\d{8}$
// 6.1 限定0-9范围可以为 [0-9]  
// 6.2 限定a-z范围可以为 [a-z]  
// 6.3 限定某些数字 [165]  

// 注意：[]只是包含就行，而()则是完全匹配
/[12|13]/g.test(1); // ture
/[123]/g.test(1); // true，只要有其中一个即可匹配上
/[123]/g.test(1235); // true，只要有其中一个即可匹配上
/(12|13)/g.test(1); // false
/(12|13)/g.test(12); // true

// 正则实例对象的几种方法
// 1. exec 在字符串中查找，返回数组(成员是匹配成功的子字符串),未匹配到返回null
// 1-1. exec 在字符串中查找，返回数组(未匹配到返回null)
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

r1.exec(s) // ["x"]
r2.exec(s) // null

// 1-2. 正则表示式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员，第一个成员是整个正则匹配的结果，成员二是圆括号里规则里匹配的内容。。。
//    也就是说，第二个成员对应第一个括号，第三个成员对应第二个括号。
var r = /a(b+)a/;
var arr = r.exec('_abbba_aba_');
arr // ["abbba", "bbb"] // 第一个括号匹配的就是bbb
// 另外返回的数组实例，还有两个属性
arr.index // 1，整个模式匹配成功的开始位置
arr.input // "_abbba_aba_"，整个原字符串

// 利用g修饰符，允许多次匹配
var reg = /a/g;
var str = 'abc_abc_abc'

while(true) {
  var match = reg.exec(str);
  if (!match) break;
  console.log('#' + match.index + ':' + match[0]);
}
// #0:a
// #4:a
// #8:a

// 注意：lastIndex是正则实例的属性

// 例子
var str = "http://172.16.185.224:7001/public/js/chunk/app.js:306:1";
var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
regExp.exec(str);
// 返回下面数组，已格式化
// 0: "http://172.16.185.224:7001/public/js/chunk/app.js:306:1"
// 1: "http://172.16.185.224:7001/public/js/chunk/app.js"
// 2: "306"
// 3: "1"
// groups: undefined
// index: 0
// input: "http://172.16.185.224:7001/public/js/chunk/app.js:306:1"
// length: 4

// 2. test 测试是否包含指定字符串，返回true或false
// 2-1. 带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配
// 2-2. 带有g修饰符，可通过正则对象的lastIndex属性指定开始搜索的位置。
// 2-3. 正则模式是一个空字符串，则匹配所有字符串

// 3. match 在字符串中查找，返回数组，未匹配到返回null，
// 3-1. 字符串的match与正则的exec相似，只是exec返回值更加丰富
// 3-2. 但若带g修饰符，match会一次性返回所有匹配成功的结果，而exec则无效
var s = 'abba';
var r = /a/g;

s.match(r) // ["a", "a"]
r.exec(s) // [ 'a', index: 0, input: 'a', groups: undefined ]
// 3-3. 设置正则表达式的lastIndex，此时无效，始终从0开始

// 4. search 在字符串中查找，返回第一个匹配到的位置索引(失败返回-1)

// 5. replace替换匹配到的值，参数一是正则，参数二是替换的内容
// 5-1. 不加g，替换第一个匹配成功的值。或者替换所有
// 5-2. 参数二可以用美元符号$，用来表示所替换的内容
//   $&：匹配的子字符串。
//   $`：匹配结果前面的文本。
//   $’：匹配结果后面的文本。
//   $n：匹配成功的第n组内容，n是从1开始的自然数。
//   $$：指代美元符号$。
'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1')
// "world hello"

'abc'.replace('b', '[$`-$&-$\']')
// "a[a-b-c]c"，
// 这里匹配结果是b，因此$`表示b的前面，就是a
// 而$\'表示b的后面，也就是c

// 手机号脱敏
function formatTelNum(telNum) {
  var str = String(telNum);
  var pat = /(\d{3})\d*(\d{4})/; // 必须带括号，表示分组
  return str.replace(pat,'$1***$2');
}
formatTelNum(18912341234); // 189***1234

// 匹配固定电话号码
function validZuoJiPhone(telNum) {
  var str = telNum;
  var reg = /^(0\d{3}-)?([2-9]\d{6,7})+(-\d{1,4})?$/;
  return reg.test(str);
}
validZuoJiPhone("0110-23456780"); // true

// 格式化人民币
var FormatMoney = (s)=> {
  // 1、如果不是数字或.开头，则不是数字
  if (/[^\d\.]/.test(s)) return "invalid value";
  // 2、如果是整数，则拼接小数点 .
  s = String(s).replace(/^(\d*)$/, "$1.");
  // 3、先拼00，然后再匹配小数格式，去掉多余00
  s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
  // 4、将小数点换成,
  s = s.replace(".", ",");
  // 5、循环，如果有(\d)(\d{3},)，就插入,号 123456,23 => 2123,456,23 => 2,123,456,23
  var re = /(\d)(\d{3},)/;
  while (re.test(s)) {
    s = s.replace(re, "$1,$2");
  }
  // 6、将最后一个,\d{2} 替换成 '.$1' 即可
  s = s.replace(/,(\d\d)$/, ".$1");
  // 7、最后如果是以 . 开头，添加0.即可
  return s.replace(/^\./, "0.")
}
FormatMoney(.1); // 0.10
FormatMoney(0); // 0.00
FormatMoney(1234567789); // "1,234,567,789.00"

// 下面方式更简洁
function formatNumber(val) {
  var num = val + '';
  var str = '';
  var ret = num.split('.');
  
  if (ret[0] !== undefined) {
    // \B表示后面的内容，不是处在开始位置
    // (?:\d{3}) 非捕获组
    // (?=XXX+$)，先行断言，其实这里匹配的就是 组前面的一个字符？？？
    str = ret[0].replace(/(?=(?:\d{3})+$)/g, ',');
    if (ret[1]) {
      str += '.' + ret[1];
    }
  }
  return str;
}
formatNumber(1234567789); // "1,234,567,789"
formatNumber(0); // "0"
formatNumber(12456.734567); // "12,456.734567"

// 下面方式更简洁
function formatNumber1(val) {
  var num = val + '';
  var str = '';
  var ret = num.split('.');
  
  if (ret[0] !== undefined) {
    str = ret[0].replace(/(?=(?:\d{3})+$)/g, ',');
  }
  // 拼接.00格式
  ret[1] = ret[1] !== void undefined ? ret[1] : '';
  str += '.' + ret[1] + '00';
  // 截取小数点后两位之前的内容
  str = str.replace(/(\d*\.\d{2})\d*/, '$1')
  // 处理.开头的内容
  str = str.replace(/^\./, '0.');
  str = str.replace(/^\,/, '');
  return str;
}
formatNumber1(12456.734567); // "12,456.73"
formatNumber1(0); // "0.00"
formatNumber1(.1); // "0.10"

function numThousandsFormat(num) {
  var c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return c
}
numThousandsFormat(0);


// 5-3. 参数二还可以是函数
// 函数场景，就类似map方法，对每个对象都执行一次指定操作
'3 and 5'.replace(/[0-9]+/g, function (match) {
  return 2 * match;
})
// "6 and 10"

var a = 'The quick brown fox jumped over the lazy dog.';
var pattern = /quick|brown|lazy/ig;

a.replace(pattern, function replacer(match) {
  return match.toUpperCase();
});
// The QUICK BROWN fox jumped over the LAZY dog.

// 6. split 在字符串中查找指定字符，并且以指定字符切割字符串，返回切割后的字符串数组(不含被切字符)
// 6-1. 参数一是正则，参数二是返回数组的最大成员数量
// 非正则分隔
'a,  b,c, d'.split(',')
// [ 'a', '  b', 'c', ' d' ]

// 正则分隔，去除多余的空格
'a,  b,c,d '.split(/\s*,\s*/)
// [ 'a', 'b', 'c', 'd' ]

// 指定返回数组的最大成员
'a , b,c,d'.split(/\s*,\s*/, 2)
[ 'a', 'b' ]

// 例一
'aaa*a*'.split(/a*/)
// [ '', '*', '*' ]
// 例一的第一个分隔符是aaa，第二个分割符是a，将字符串分成三个部分，包含开始处的空字符串

// 例二
'aaa**a*'.split(/a*/)
// ["", "*", "*", "*"]
// 例二的第一个分隔符是aaa，第二个分隔符是0个a（即空字符），第三个分隔符是a，所以将字符串分成四个部分。

// 如果正则表达式带有括号，则括号匹配的部分也会作为数组成员返回。
'aaa*a*'.split(/(a*)/)
// [ '', 'aaa', '*', 'a', '*' ]

// 7. 贪婪模式
var s = 'aaa';
s.match(/a+/) // ["aaa"]
// 上面代码中，模式是/a+/，表示匹配1个a或多个a，那么到底会匹配几个a呢？
// 因为默认是贪婪模式，会一直匹配到字符a不出现为止，所以匹配结果是3个a。

// 如果想将贪婪模式改为非贪婪模式，可以在量词符后面加一个问号。
var s = 'aaa';
s.match(/a+?/) // ["a"]
// 模式结尾添加了一个问号/a+?/，这时就改为非贪婪模式，一旦条件满足，就不再往下匹配。
// 除了非贪婪模式的加号，还有非贪婪模式的星号（*）。
// *?：表示某个模式出现0次或多次，匹配时采用非贪婪模式。
// +?：表示某个模式出现1次或多次，匹配时采用非贪婪模式。

// 8. 组匹配
// 正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容
/fred+/.test('fredd');       // true
/(fred)+/.test('fredfred');  // true

var m = 'abcabc'.match(/(.)b(.)/);
m ;// ['abc', 'a', 'c']
// 正则表达式/(.)b(.)/一共使用两个括号，第一个括号捕获a，第二个括号捕获c。

// 使用组匹配，不宜使用g修饰符，否则match方法不会捕获分组的内容。其实就是少了每一次具体的细节
var m = 'abcabc'.match(/(.)b(.)/g);
m ;// ['abc', 'abc']

// \n是用在正则中的，而$n使用在字符串中的。要区分开
// 可以用\n引用括号匹配的内容，n是从1开始的自然数，表示对应顺序的括号。
/(.)b(.)\1b\2/.test("abcabc"); // true
// \1表示第一个括号匹配的内容（即a），\2表示第二个括号匹配的内容（即c）。

/y(..)(.)\2\1/.test('yabccab') // true，此时\2就是c,\1就是ab

/y((..)\2)\1/.test('yabababab') // true
// 上面代码中，\1指向外层括号，\2指向内层括号。

//  8-1. 组匹配之非捕获组
// (?:x)称为非捕获组，表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。
// 使用场景，假定需要匹配foo或者foofoo，正则表达式就应该写成/(foo){1,2}/
// 但这样就会占用一个组匹配。这时就可以这样：/(?:foo){1,2}/

var m1 = 'abc'.match(/(.)b(.)/);
m1; // ["abc", "a", "c"]
var m = 'abc'.match(/(?:.)b(.)/);
m // ["abc", "c"]
// 使用非捕获组，所以最终返回的结果中就没有第一个括号。

// 参考：https://www.runoob.com/w3cnote/reg-lookahead-lookbehind.html
// (?=pattern) 零宽正向先行断言
// (?!pattern) 零宽负向先行断言
// 断言的意思是判断是否满足，零宽的意思是它只匹配一个位置，如同^匹配开头，$匹配末尾一样，只是一个位置，不返回匹配到的字符，正向表示需要满足pattern，负向表示不能满足pattern，先行表示这个断言语句现在期望返回的匹配字符的后面。

// x(?=y)称为先行断言，x只有在y前面才匹配，y不会被计入返回结果。
// 比如下面，只匹配在c前面的b，但并不返回c
var m = 'abc'.match(/b(?=c)/);// ['b']
var m = 'abc'.match(/(?=c)/); // ["", index: 2, input: "abc", groups: undefined]
'abc'.replace(/(?=c)/, 'd');  // abdc
var m = 'abc'.match(/b(c)/);
m // ["bc", "b"]

// x(?!y)称为先行否定断言，x只有不在y前面才匹配，y不会被计入返回结果。
/\d+(?!\.)/.exec('3.14') // ["14"]

// b不在c前面所以被匹配，而且括号对应的d不会被返回
'abd'.match(/b(?!c)/); // [b]
```


#### 需要转义的字符

在正则表达式中，有些字符本身具有特殊的含义，如果还想匹配改字符，需要转义。比如^本身代表以什么开始，如果要匹配 ^ 就需要 \^，如下共14个。

- ^ => \^
- $ => \$
- ( => \(
- ) => \)
- { => \{
- } => \}
- [ => \[
- ] => \]
- . => \.
- `* => \*`
- `+ => \+`
- `? => \?`
- `\ => \\`
- `/ => \/`

#### 常用正则规则

**. 校验密码、邮箱、url：**

```js
/*
题：检验密码强度

断言，只匹配一个位置。
*/
function validCipher(str) {
  str = String(str);
  // 必须包含数字，大小写字符，特殊字符，且长度在6-12位
  // ?= 断言只匹配一个位置，类似^匹配开头，$匹配结尾，
  // 因此下面的意思就是必须有四个位置上分别有数字，小写，大写，特殊符号
  let reg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,12}/;
  return reg.test(str);
}
validCipher('abcd13!dd');  // false
validCipher('abcd13!ddA'); // ture

// 如果不加 ?= 的话，则必须按顺序写。
/(.*[0-9])(.*[a-z])/.test('1a'); // ture
/(.*[0-9])(.*[a-z])/.test('a1'); // false

/*
题：校验邮箱格式

格式：名称@域名
1、名称里有可能有汉语 [\u4e00-\u9fa5]
2、域名有可能多级域名 (\.[a-zA-Z0-9_-]+)+
*/
function validEmail(str) {
  str = String(str);
  let reg = /^[A-Za-z0-9_-\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return reg.test(str);
}
validEmail('abc-12@126.com.cn');  // false

/*
题：校验URL格式

1、协议，(https?|ftp|file)
2、中英文
*/
function validUrl(str) {
  str = String(str);
  let reg = /(https?|ftp|file):\/\/[0-9a-zA-Z+&@#\/%?=~_-|!:,.;]+[0-9a-zA-Z+&@#\/%=~_-|]/;
  return reg.test(str);
}
validUrl('abc-12@126.com.cn');  // false
```

**. 身份证相关：**

```js
// 匹配身份证号
function validIdcard(str) {
  let reg = /^\d{17}(\d|X|x)$/;
  return reg.test(str);
}
validIdcard('372930199012126619');

/^\d{17}(\d|xX)$/.test('37293019901212661xX'); // true
/^\d{17}[\d|xX]$/.test('37293019901212661xX'); // false
```

**. 手机号相关：**

```js
// 手机号匹配
function isTelNum(str) {
  str = String(str);
  let reg = /^1\d{10}$/g;
  return reg.test(str);
}

function isTelNum(str) {
  str = String(str);
  // 0-3区间，以及6或7才行
  let reg = /^1((3[0-3])|7[67])\d{8}$/g;
  return reg.test(str);
}
```

**. 数值相关：**

```html
<el-input
  class="input-line"
  size="mini"
  placeholder="请输入"
  type="text"
  @input="val => numChange(val, scope.row.stockItems[0])"
  v-model.trim.number="scope.row.stockItems[0].returnQuantity"
></el-input>

<script>
  // element-ui中，input事件是值改变时触发，
  function numChange(val, scopeData) {
    // 要求是正整数，则不能有 -. 且不能0开头，
    // 默认情况下input的类型是text，此时可以用正则匹配的输入字符串，然后修改
    // 如果type改为number，或者修饰符添加.number，则会通过转换，将非法数字自动转换为''，比如：1-1 => ''
    // 因此要想原汁原味的拿到输入的值，并正则匹配，可以写成type='text'，然后正则匹配，如下只允许输入正整数
    if(!/^[1-9][0-9]*$/g.test(val)) {
      this.$nextTick(() => {
        scopeData.returnQuantity = ''
      });
    }
  }
</script>

```

**. url相关：**

```js
// 匹配url的query字符串1
function getQueryUrl1 (url) {
  url = window.decodeURIComponent(url || location.href);
  if (url.indexOf('?') === -1) return '';

  url = url.split('?')[1];
  let tempArr = url.split('&');
  let queryObj = Object.create(null);
  for (let item of tempArr) {
    let itemObj = item.split('=');
    queryObj[itemObj[0]] = itemObj[1]
  }
  return queryObj;
}
getQueryUrl1();
getTimePerformance(getQueryUrl1, 1000);
// ?type=2，会发生数据格式变化???
// {type: "2"}


// 匹配url的query字符串2
function getQueryUrl2(url) {
  let query = ''
  if (url && ~url.indexOf('?')) {
    query = url.split('?')[1]
  } else {
    query = ~location.href.indexOf("?") ? location.search.slice(1) : "";
  }
  query = window.decodeURIComponent(query);

  // 思路：先写整体结构，再匹配val和key
  // /()=?()/g => /()=?([^&]*)/g => /([^&=]+)=?([^&]*)/g
  let reg = /([^&=]+)=?([^&]*)/g;
  let obj = Object.create(null);
  query.replace(reg, function(all, key, val) {
    // all是完全匹配的字符串，key是组一，val是组二
    obj[key] = val;
  });
  return obj;
}
getQueryUrl2();
getTimePerformance(getQueryUrl2, 1000); // 如何在这里传参？？？

// 获取当前url里，指定key的value
function getUrlKey (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
```

**. 字符串处理相关：**

```js
/*
题：输入abcde，输出 a-bc-de，也就是从后面开始，每隔两位插入一个符号
*/
function insertCode(str) {
  return [...str.split('').reverse().join('').replace(/(.{2})/g, '$1-')].reverse().join('');
}
console.time();
for(let i = 0; i < 10000; i++) {
  insertCode('abcde'); // "a-bc-de"
}
console.timeEnd(); // 18.815185546875ms

// 利用非捕获组与先行断言
function insertCode1(str) {
  str.replace(/(?=(?:\w{2})+$)/g, '-')
}
console.time();
for(let i = 0; i < 10000; i++) {
  insertCode1('abcde'); // "a-bc-de"
}
console.timeEnd(); // 3.998046875ms

'abcde'.match(/(.{2})/g) // ["ab", "cd"]
'abcde'.match(/(.{1,2})/g) // ["ab", "cd", "e"]


/*
题：改为驼峰命名

1、_，-可能在两侧
*/
function toHump (name) {
  return name.replace( /[_-](\w)?/g, function ( all, letter ) {
    return letter ? letter.toUpperCase() : '';
  } );
}
toHump('hello-world-a_'); // "helloWorldA"

/*
题：驼峰改为下划线命名

*/
function toLine1(name) {
  return name.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}
toLine1('aBcDfe');

function toLine2(name) {
  // replace参数二的函数，函数里的参数2开始都是匹配的组
  return name.replace(/([A-Z])/g, (str, letter) => `_${letter.toLowerCase()}`);
}
toLine2('aBcDfe');
```

**. 其他处理相关：**

```js
// 输入值不能全部为空格
/.*[^ ].*/.test(' 2 '); // true
/.*[^ ].*/.test('   '); // false

// 不能纯数字，取反即可
!/^\d+$/.test('2'); // false

// 不能包含数字
!/\d+/g.test('a2'); // false

```

## **日期相关**

### Date对象基本知识点

有关时间对象 `Date` 的方法和描述：

方法 | 描述
| - | - |
Date() | 返回当日的日期和时间。
getDate() | 从 Date 对象返回一个月中的某一天 (1 ~ 31)。
getDay() | 从 Date 对象返回一周中的某一天 (0 ~ 6)。
getMonth() | 从 Date 对象返回月份 (0 ~ 11)。
getFullYear() | 从 Date 对象以四位数字返回年份。
getYear() | 请使用 getFullYear() 方法代替。
getHours() | 返回 Date 对象的小时 (0 ~ 23)。
getMinutes() | 返回 Date 对象的分钟 (0 ~ 59)。
getSeconds() | 返回 Date 对象的秒数 (0 ~ 59)。
getMilliseconds() | 返回 Date 对象的毫秒(0 ~ 999)。
getTime() | 返回 1970 年 1 月 1 日至今的毫秒数。
getTimezoneOffset() | 返回本地时间与格林威治标准时间 (GMT) 的分钟差。
getUTCDate() | 根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。
getUTCDay() | 根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。
getUTCMonth() | 根据世界时从 Date 对象返回月份 (0 ~ 11)。
getUTCFullYear() | 根据世界时从 Date 对象返回四位数的年份。
getUTCHours() | 根据世界时返回 Date 对象的小时 (0 ~ 23)。
getUTCMinutes() | 根据世界时返回 Date 对象的分钟 (0 ~ 59)。
getUTCSeconds() | 根据世界时返回 Date 对象的秒钟 (0 ~ 59)。
getUTCMilliseconds() | 根据世界时返回 Date 对象的毫秒(0 ~ 999)。
parse() | 返回1970年1月1日午夜到指定日期（字符串）的毫秒数。
setDate() | 设置 Date 对象中月的某一天 (1 ~ 31)。
setMonth() | 设置 Date 对象中月份 (0 ~ 11)。
setFullYear() | 设置 Date 对象中的年份（四位数字）。
setYear() | 请使用 setFullYear() 方法代替。
setHours() | 设置 Date 对象中的小时 (0 ~ 23)。
setMinutes() | 设置 Date 对象中的分钟 (0 ~ 59)。
setSeconds() | 设置 Date 对象中的秒钟 (0 ~ 59)。
setMilliseconds() | 设置 Date 对象中的毫秒 (0 ~ 999)。
setTime() | 以毫秒设置 Date 对象。
setUTCDate() | 根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。
setUTCMonth() | 根据世界时设置 Date 对象中的月份 (0 ~ 11)。
setUTCFullYear() | 根据世界时设置 Date 对象中的年份（四位数字）。
setUTCHours() | 根据世界时设置 Date 对象中的小时 (0 ~ 23)。
setUTCMinutes() | 根据世界时设置 Date 对象中的分钟 (0 ~ 59)。
setUTCSeconds() | 根据世界时设置 Date 对象中的秒钟 (0 ~ 59)。
setUTCMilliseconds() | 根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。
toSource() | 返回该对象的源代码。
toString() | 把 Date 对象转换为字符串。
toTimeString() | 把 Date 对象的时间部分转换为字符串。
toDateString() | 把 Date 对象的日期部分转换为字符串。
toGMTString() | 请使用 toUTCString() 方法代替。
toUTCString() | 根据世界时，把 Date 对象转换为字符串。
toLocaleString() | 根据本地时间格式，把 Date 对象转换为字符串。
toLocaleTimeString() | 根据本地时间格式，把 Date 对象的时间部分转换为字符串。
toLocaleDateString() | 根据本地时间格式，把 Date 对象的日期部分转换为字符串。
UTC() | 根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数。
valueOf() | 返回 Date 对象的原始值。

### setDate() 方法

`setDate()`方法用来设定日期对象中本地时间的日，也就是每个月中的几号，传入参数是一个1~31的整数。若是传入的值超出当月份的正常范围，setDate（）方法也会依据超出的数值进行计算

- 如setDate（0）会让日期变成前一个月的最后一天，
- setDate（-1）会让日期变成前一个月的倒数第二天。
- 若当月有31天，那setDate（32）会让日期变成下个月的第一天。

```js
// 当前时间
new Date().toLocaleString()
"2020/4/4 下午5:23:28"

// 指定年份，月份，日期
new Date(2020, 4, 0).toLocaleString()
"2020/4/30 上午12:00:00"

// 获取今天星期几，这种方式牛逼
new Date().toLocaleString('default', { weekday: 'long' })
// "星期一"

// 因此获取指定月份的天数，默认是当月
function getMonthDays(year, month) {
  if (year !== void 0 && month !== void 0) {
    return new Date(year, month, 0).getDate();
  } else {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;

    // 这里如果month是4，其实表示的5月份，但参数3设置为0
    // 正好是上一个月，即4月份的最后一天，也就是算出一个月有多少天了
    return new Date(year, month, 0).getDate();
  }
}
getMonthDays();        // 比如此时是2020年4月，30
getMonthDays(2020, 5); // 31
```

```js
/*
题：获取指定年，月份的工作日。
*/

// 根据是否为0和6即可判断是否为周末
function isWeekday(year, month, day) {
  var day = new Date(year, month, day).getDay();
  return day !== 0 && day !== 6;
}

// 获取指定月份所有的工作日
function getWeekdaysInMonth(year, month) {
  let monthDays = getMonthDays(year, month);
  let daysStrArr = [];
  for (let i = 1; i <= monthDays; i ++) {
    // 因为月份是从0开始，但我们传进去的一般都不是从0开始
    if (isWeekday(year, month - 1, i)) {
      daysStrArr[daysStrArr.length] = new Date(year, month - 1, i).toLocaleDateString();
    }
  }
  return daysStrArr;
}

// 比如获取 2020年5月份，所有的工作日列表：
getWeekdaysInMonth(2020, 5);
// ["2020/5/1", "2020/5/4", "2020/5/5", "2020/5/6", "2020/5/7", "2020/5/8", "2020/5/11", "2020/5/12", "2020/5/13", "2020/5/14", "2020/5/15", "2020/5/18", "2020/5/19", "2020/5/20", "2020/5/21", "2020/5/22", "2020/5/25", "2020/5/26", "2020/5/27", "2020/5/28", "2020/5/29"]



// 知道今天，需要得出当前周的数据
var todayDate = "2020-06-25";
var curDate = new Date(todayDate);
var curTimesStamp = curDate.getTime();
var curDay = curDate.getDay();
var dates = [];
for (var i = 0; i < 7; i++) {
  dates.push(
    new Date(curTimesStamp + 86400000 * (i - ((curDay + 6) % 7)))
      .toLocaleDateString()
      .replace(/\//g, "-")
      .replace(/-(\d{1})-/g, "-0$1-")
      .replace(/-(\d{1})$/g, "-0$1")
  );
}
console.log(dates);
// ["2020-06-22", "2020-06-23", "2020-06-24", "2020-06-25", "2020-06-26", "2020-06-27", "2020-06-28"]

```

## **动态规划**

淘宝的“双十一”购物节有各种促销活动，比如“满 200 元减 50 元”。假设你女朋友的购物车中有 n 个（n>100）想买的商品，她希望从里面选几个，在凑够满减条件的前提下，让选出来的商品价格总和最大程度地接近满减条件（200 元），这样就可以极大限度地“薅羊毛”。作为程序员的你，能不能编个代码来帮她搞定呢？

动态规划(dynamic programming，DP)是一种将复杂问题分解成更小的子问题来解决的优化技术。动态规划只有当每个子问题都是离散的，即不依赖其他子问题时才管用。


**注意**，动态规划和分而治之是不同的方法。分而治之方法是把问题分解成相互独立的子问题，然后组合它们的答案，而动态规划则是将问题分解成相互依赖的子问题(比如斐波那契数列)。

首先，动态规划问题的一般形式就是求最值。动态规划其实是运筹学的一种最优化方法，只不过在计算机问题上应用比较多，比如说让你求最长递增子序列呀，最小编辑距离呀等等。

既然是要求最值，核心问题是什么呢？求解动态规划的核心问题是穷举。因为要求最值，肯定要把所有可行的答案穷举出来，然后在其中找最值呗。

动态规划这么简单，就是穷举就完事了？我看到的动态规划问题都很难啊！

首先，动态规划的穷举有点特别，**因为这类问题存在「重叠子问题」，如果暴力穷举的话效率会极其低下，所以需要「备忘录」或者「DP table」来优化穷举过程，避免不必要的计算**。

而且，动态规划问题一定会具备「最优子结构」，才能通过子问题的最值得到原问题的最值。

另外，虽然动态规划的核心思想就是穷举求最值，但是问题可以千变万化，穷举所有可行解其实并不是一件容易的事，**只有列出正确的「状态转移方程」**，才能正确地穷举。

以上提到的**重叠子问题、最优子结构、状态转移方程**就是动态规划三要素。

思路：**明确 base case -> 明确「状态」-> 明确「选择」 -> 定义 dp 数组/函数的含义**。

```js
// 递归法：斐波那契数列数列
function fib(n) {
  if(n<2) return 1;
  return fib(n-1) + fib(n-2);
}
console.time();
fib(30)
console.timeEnd(); // 13.01611328125ms
```
上面这种方式，可以画成二叉树的结构，因此节点数目就是2^n，然后每次运行时间其实就是 f(n - 1) + f(n - 2) 一个加法运算，因此总的复杂度就是2^n。

主要问题是：上面的递归存在大量的重复计算。。。因此需要将计算过的存起来。。。而存起来的方式就是备忘录或map（如果将这个map独立出来成为一张表的话，不就是dp table吗）

啥叫「自底向上」？反过来，我们直接从最底下，最简单，问题规模最小的 f(1) 和 f(2) 开始往上推，直到推到我们想要的答案 f(20)，这就是动态规划的思路，**这也是为什么动态规划一般都脱离了递归，而是由循环迭代完成计算**。

```js
// 动态规划
function dyFib(n) {
  let arr = [0,1]
  if(n<2) return arr[n];
  for (let i = 2; i<= n; i++) {
    arr[i] = arr[i-1] + arr[i-2]
  }
  return arr[n];
}
console.time();
dyFib(30)
console.timeEnd(); // 0.063720703125ms

// 上面的方式，占用了一个数组的长度，其实还可以再优化
// 这样的话，就只占用了一个位置的空间。
function fib1(n) {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

上面的这个技巧就是所谓的「状态压缩」，如果我们发现每次状态转移只需要 DP table 中的一部分，那么可以尝试用状态压缩来缩小 DP table 的大小，只记录必要的数据，上述例子就相当于把DP table 的大小从 n 缩小到 2。后续的动态规划章节中我们还会看到这样的例子，一般来说是把一个二维的 DP table 压缩成一维，即把空间复杂度从 O(n^2) 压缩到 O(n)。

有人会问，动态规划的另一个重要特性「最优子结构」，怎么没有涉及？下面会涉及。斐波那契数列的例子严格来说不算动态规划，因为没有涉及求最值，以上旨在说明重叠子问题的消除方法，演示得到最优解法逐步求精的过程。下面，看第二个例子，凑零钱问题。

### 凑零钱问题

先看下题目：给你 k 种面值的硬币，面值分别为 c1, c2 ... ck，每种硬币的数量无限，再给一个总金额 amount，问你最少需要几枚硬币凑出这个金额，如果不可能凑出，算法返回 -1 。算法的函数签名如下：

比如说 k = 3，面值分别为 1，2，5，总金额 amount = 11。那么最少需要 3 枚硬币凑出，即 11 = 5 + 5 + 1。

你认为计算机应该如何解决这个问题？显然，**就是把所有可能的凑硬币方法都穷举出来**，然后找找看最少需要多少枚硬币。

动态规划的特点：
- 有最优子结构
- 

而凑零钱问题就符合最优子结构，为什么说它符合最优子结构呢？比如你想求 amount = 11 时的最少硬币数（原问题），如果你知道凑出 amount = 10 的最少硬币数（子问题），你只需要把子问题的答案加一（再选一枚面值为 1 的硬币）就是原问题的答案。因为硬币的数量是没有限制的，所以子问题之间没有相互制，是互相独立的。

那么，既然知道了这是个动态规划问题，就要思考如何列出正确的状态转移方程？

1. 确定 base case，这个很简单，显然目标金额 amount 为 0 时算法返回 0，因为不需要任何硬币就已经凑出目标金额了。
2. 确定「状态」，也就是原问题和子问题中会变化的变量。由于硬币数量无限，硬币的面额也是题目给定的，只有目标金额会不断地向 base case 靠近，所以唯一的「状态」就是目标金额 amount。(可以理解为与base 状态对应的另一种极端情况)
3. 确定「选择」，也就是导致「状态」产生变化的行为。目标金额为什么变化呢，因为你在选择硬币，你每选择一枚硬币，就相当于改变了目标金额。所以说所有硬币的面值，就是你的「选择」。
4. 明确 dp 函数/数组的定义。我们这里讲的是自顶向下的解法，所以会有一个递归的 dp 函数，一般来说函数的参数就是状态转移中会变化的量，也就是上面说到的「状态」；函数的返回值就是题目要求我们计算的量。就本题来说，状态只有一个，即「目标金额」，题目要求我们计算凑出目标金额所需的最少硬币数量。所以我们可以这样定义 dp 函数：
dp(n) 的定义：输入一个目标金额 n，返回凑出目标金额 n 的最少硬币数量。

计算机解决问题其实没有任何奇技淫巧，它唯一的解决办法就是穷举，穷举所有可能性。算法设计无非就是先思考“如何穷举”，然后再追求“如何聪明地穷举”。

```js
var coinChange = function(coins, amount) {
  // dp数组，索引表示金额，数组中的值对应硬币数量
  // amount+1表示一个不可超越的范围，凑成 amount 金额的硬币数最多只可能等于 amount（全用 1 元面值的硬币），
  // 所以初始化为 amount + 1 就相当于初始化为正无穷，便于后续取最小值。
  // 1、初始化dp table，用来存放所有的状态
  let dp = Array(amount+1).fill(Infinity);
  // 2、初始化base case
  // 当金额为0时，数量肯定为0
  dp[0] = 0;

  // 3、穷举所有金额，记录每种金额的最优，从1开始
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i >= coin) {
        // 5是否最优，可以分为4是否最优 + 1
        dp[i] = Math.min(dp[i], dp[i-coin]+1)
      }
    }
  }

  // 穷举，列出所有可能，然后找出最优
  return dp[amount] === Infinity ? -1 : dp[amount];
}

function coinChange(amount, coins) {
  // 找出需要凑够amount金额的最小硬币数量。
  // 1. 初始化dp table，索引表示金额，然后值表示对应的硬币数量
  let dp = Array(amount+1).fill(Infinity);
  // 2. 初始化base case，当金额为0时，肯定就需要0枚硬币
  dp[0] = 0;

  // 3. 穷举所有的可能性
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i-coin]+1)
      }
    }
  }
  // 上面循环完，其实数组里的每一项存储的都是最小值了
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

### 子序列解题模板

首先，子序列问题本身就相对子串、子数组更困难一些，因为前者是不连续的序列，而后两者是连续的，就算穷举都不容易，更别说求解相关的算法问题了。

而且，子序列问题很可能涉及到两个字符串，比如让你求两个字符串的 最长公共子序列，如果没有一定的处理经验，真的不容易想出来。所以本文就来扒一扒子序列问题的套路，其实就有两种模板，相关问题只要往这两种思路上想，十拿九稳。

#### 第一种思路模板是一个一维的 dp 数组：

```js
int n = array.length;
int[] dp = new int[n];

for (int i = 1; i < n; i++) {
  for (int j = 0; j < i; j++) {
    dp[i] = 最值(dp[i], dp[j] + ...)
  }
}
```
在子数组array[0..i]中，以array[i]结尾的目标子序列（最长递增子序列）的长度是dp[i]。

#### 第二种思路模板是一个二维的 dp 数组：

```js
int n = arr.length;
int[][] dp = new dp[n][n];

for (int i = 0; i < n; i++) {
    for (int j = 1; j < n; j++) {
        if (arr[i] == arr[j]) 
            dp[i][j] = dp[i][j] + ...
        else
            dp[i][j] = 最值(...)
    }
}
```

这种思路运用相对更多一些，尤其是涉及两个字符串/数组的子序列。本思路中 dp 数组含义又分为「只涉及一个字符串」和「涉及两个字符串」两种情况。

- 2.1 涉及两个字符串/数组时（比如最长公共子序列），dp 数组的含义如下：

在子数组arr1[0..i]和子数组arr2[0..j]中，我们要求的子序列（最长公共子序列）长度为dp[i][j]。

- 2.2 只涉及一个字符串/数组时（比如本文要讲的最长回文子序列），dp 数组的含义如下：

在子数组array[i..j]中，我们要求的子序列（最长回文子序列）的长度为dp[i][j]。

### 最长回文子序列

给定一个字符串 s ，找到其中最长的回文子序列，并返回该序列的长度。可以假设 s 的最大长度为 1000 。输入'bbbab'，输出4，因为子序列可以不连续

我们说这个问题对 dp 数组的定义是：在子串s[i..j]中，最长回文子序列的长度为dp[i][j]。一定要记住这个定义才能理解算法。

为啥这个问题要这样定义二维的 dp 数组呢？我们前文多次提到，**找状态转移需要归纳思维，说白了就是如何从已知的结果推出未知的部分，这样定义容易归纳，容易发现状态转移关系**。

具体来说，如果我们想求dp[i][j]，（这里可以i和j是两个指针，前面是i后面是j）假设你知道了子问题dp[i+1][j-1]的结果（s[i+1..j-1]中最长回文子序列的长度），你是否能想办法算出dp[i][j]的值（s[i..j]中，最长回文子序列的长度）呢？

可以！这取决于s[i]和s[j]的字符：

- 如果它俩相等，那么它俩加上s[i+1..j-1]中的最长回文子序列就是s[i..j]的最长回文子序列
- 如果不相等，说明它俩不可能同时出现在s[i..j]的最长回文子序列中，那么把它俩分别加入s[i+1..j-1]中，看看哪个子串产生的回文子序列更长即可

伪代码如下：

```js
if (s[i] == s[j])
    // 它俩一定在最长回文子序列中
    dp[i][j] = dp[i + 1][j - 1] + 2;
else
    // s[i+1..j] 和 s[i..j-1] 谁的回文子序列更长？
    dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
```

想象一个方格纸贴在墙上，然后你看着方格纸，顶部向右是j轴，左侧向下是i轴。因此dp[0][len-1]就是右上角位置的元素。


### 最长上升子序列

学会了动态规划的套路：找到了问题的「状态」，明确了 dp 数组/函数的含义，定义了 base case；但是不知道如何确定「选择」，也就是不到状态转移的关系，依然写不出动态规划解法，怎么办？

不要担心，**动态规划的难点本来就在于寻找正确的状态转移方程**，本文就借助经典的「最长递增子序列问题」来讲一讲设计动态规划的通用技巧：**数学归纳思想**。

最长递增子序列（Longest Increasing Subsequence，简写 LIS）是非常经典的一个法问题，比较容易想到的是动态规划解法，时间复杂度 O(N^2)，我们借这个问题来由浅入深讲解如何找状态转移方程，如何写出动态规划解法。比较难想到的是利用二分查找，时间复杂度是 O(NlogN)，我们通过一种简单的纸牌游戏来辅助理解这种巧妙的解法。

注意「子序列」和「子串」这两个名词的区别，**子串一定是连续的，而子序列不一定是连续的**。

相信大家对数学归纳法都不陌生，高中就学过，而且思路很简单。比如我们想证明一个数学结论，那么我们先假设这个结论在 `k<n 时成立，然后根据这个假设，想办法推导证明出 k=n 的时候此结论也成立。如果能够证明出来，那么就说明这个结论对于 k 等于任何数都成立`。

类似的，我们设计动态规划算法，不是需要一个 dp 数组吗？我们可以假设 dp[0...i-1] 都已经被算出来了，然后问自己：怎么通过这些结果算出 dp[i]？

dp[i] **表示以 nums[i] 这个数结尾的最长递增子序列的长度**。(其实都动态规划问题，主要就两种模板类型)

根据这个定义，我们就可以推出 base case：dp[i] 初始值为 1，因为以 nums[i] 结尾的最长递增子序列起码要包含它自己。

根据这个定义，我们的最终结果（子序列的最大长度）应该是 dp 数组中的最大值

```js
let res = 0;
for (let i = 0; i < dp.size(); i++) {
  res = Math.max(res, dp[i]);
}
return res;
```

```js
function lengthOfLIS(nums) {
  const len = nums.length;
  let dp = Array(len).fill(1);

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (num[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp)
}
```
### 回溯算法

回溯算法和动态规划有点类似，有的问题如果实在想不出状态转移方程，尝试用回溯算法暴力解决也是一个聪明的策略，总比写不出来解法强。

那么，回溯算法和动态规划到底是啥关系？它俩都涉及递归，算法模板看起来还挺像的，都涉及做「选择」，真的酷似父与子。

任何算法的核心都是穷举，回溯算法就是一个暴力穷举算法，

其实回溯算法其 实就是我们常说的 DFS 算法，本质上就是一种暴力穷举算法

废话不多说，直接上回溯算法框架。解决一个回溯问题，实际上就是一个决策树的遍历过程。你只需要思考 3 个问题：
1. 路径：也就是已经做出的选择。
2. 选择列表：也就是你当前可以做的选择。
3. 结束条件：也就是到达决策树底层，无法再做选择的条件。

通过几个例子来看看回溯问题：

#### 全排列问题

比如之前的排列组合问题，n个不重复的数字，全排列共有n!个。

那么我们当时是怎么穷举全排列的呢？比方说给三个数 [1,2,3]，你肯定不会无规律地乱穷举，一般是这样：

先固定第一位为 1，然后第二位可以是 2，那么第三位只能是 3；然后可以把第二位变成 3，第三位就只能是 2 了；然后就只能变化第一位，变成 2，然后再穷举后两位……

然后还可以将这个过程用决策树的形式展现出来。然后怎么将这个过程对应到路径，选择列表呢

- 比如我们先把第一位固定为2，则这个2就是路径，表示已经做过的选择。
- 然后第一位选择了2，则下面的话只能选择1或3了，此时1或3就是选择列表，表示当前节点可以做的选择。
- 结束条件就是遍历到树的底层，这里的话就是选择列表为空的时候。

因此就可以将路径和选择列表，作为决策树上每个节点的属性。比如第一个位置，如果还没选的话：路径就为空，然后选择列表就是[1,2,3]

因此我们定义的backtrack函数其实就像一个指针，在这个树上游走，同时要正确维护每个节点的属性，每当走到树的底层，其 路径 就是一个全排列。

### BFS算法

BFS 的核心思想应该不难理解的，就是把一些问题抽象成图，从一个点开始，向四周开始扩散。一般来说，**我们写 BFS 算法都是用「队列」这种数据结构，每次将一个节点周围的所有节点加入队列。**

BFS 相对 DFS 的最主要的区别是：BFS 找到的路径一定是最短的，但代价就是空间复杂度比 DFS 大很多...

#### 算法场景

问题的本质就是让你在一幅「图」中找到从起点 start 到终点 target 的最近距离，这个例子听起来很枯燥，但是 BFS 算法问题其实都是在干这个事儿，比如走迷宫，有的格子是围墙不能走，从起点到终点的最短距离是多少？

再比如说两个单词，要求你通过某些替换，把其中一个变成另一个，每次只能替换一个字符，最少要替换几次？

再比如说连连看游戏，两个方块消除的条件不仅仅是图案相同，还得保证两个方块之间的最短连线不能多于两个拐点。你玩连连看，点击两个坐标，游戏是如何判断它俩的最短连线有几个拐点的？

这些问题都没啥奇技淫巧，本质上就是一幅「图」，让你从一个起点，走到终点，问最短路径，这就是 BFS 的本质。

- dfs也可以找最短路径，但时间复杂度很高，因为DFS 实际上是靠递归的堆栈记录走过的路径，你要找到最短路径，肯定得把二叉树中所有树杈都探索完才能对比出最短的路径有多长对不对？**而 BFS 借助队列做到一次一步「齐头并进」**，是可以在不遍历完整棵树的条件下找到最短距离的。形象点说，DFS 是线，BFS 是面；DFS 是单打独斗，BFS 是集体行动。
- BFS 可以找到最短距离，但是空间复杂度高，而 DFS 的空间复杂度较低。
## **二分法**

- d6，高级
- 32 * 16 

对于一个有序的列表（比如1-100），如果要查找1这个数的位置，二分查找：50 -> 25 -> 13 -> 7 -> 4 -> 2 -> 1通过七次就可以找到，如果挨个找，比如倒序就需要100次。

在数学中 2^3 = 8，那我想知道几个2相乘是8怎么算？即：$\log_2{8}$ = 3。

```js
// 在数学中
2^3 = 8
// 那我想知道几个2相乘是8怎么算？即
log2^8 = 3
```

综上：**对数运算其实就是幂运算的逆运算**

在使用大O表示法时，log 指的都是 $\log_2$，因此对于有序长度为 n 的列表，使用二分查找的时间复杂度为：logn，如果n为8，log8也就是3。   => 2^3 = 8 

```js
// 实现一个二分查找，步骤如下
// 1、函数接受一个数组和一个元素
// 2、开始时，搜索范围是整个数组，因此lowIdx = 0, highIdx = len - 1
// 3、每次取中间值，有余数则向上或向下取整，即 Math.floor((lowIdx + highIdx) / 2)
// 4、如果元素等于中间值，直接返回索引，如果小于中间值，则将highIdx = 当前中间值索引 - 1，否则lowIdx = 当前中间值索引 + 1
// 5、循环，如果lowIdx < highIdx则继续循环，否则返回空

function binarySearch(arr, target) {
  let lowIdx = 0;
  let highIdx = arr.length - 1;
  let times = 0;
  // 当lowIdx = highIdx，也需要检测
  while(lowIdx <= highIdx) {
    let mid = Math.floor((lowIdx + highIdx) / 2);
    times++;

    if (target < arr[mid]) {
      highIdx = mid - 1;
    } else if (target > arr[mid]) {
      lowIdx = mid + 1;
    } else {
      console.log(`运算次数：${times}；目标索引：${mid}`);
      return mid;
    }
  }
  // 循环结束，如果没有返回，说明没找到
  return '没找到额！'
}

let arr = Array(1024).fill(0).map((item,idx) => idx)
binarySearch(arr, 1);
```

运行时间：如果逐个查找时间，列表长度为100的话，就需要100次；长度为40亿次的话就需要40亿次，这种需要查找的次数和列表长度一致，这种叫做**线性时间**。如果用二分法，长度100只需7次，40亿次只需32次。所以大幅缩短了时间。

注意：

- 如果数值过大怎么办？数值超过js中的范围？
- 线性时间和对数时间的增长率不同，时间相差会越来越大

#### **大O表示法**

对于不同增长率的曲线，只对比某个时刻的时间相差多少，不准确。。。为了更可靠的识别不同曲线下的时间，需要大O表示法。

大O表示法指出算法有多快，如果列表含有n个元素，挨个检查则需要n次操作，运行时间也就是O(n)。单位是什么呢？**大O表示法指的并非以秒为单位的速度，而是比较操作数，它指出了算法运行时间的增速**。

如果用二分法检查，运行时间也就是操作数为 O(logn)，也就是指出了算法需要执行的**操作数**。

大O表示法指出了最糟糕情况下的运行时间，比如长度为n的列表，挨个查找的时间为O(n)，那如果要查找的元素就是第一个呢？一次就找到，难道是O(1)。。。其实不是的，挨个查找也就是简单查找的运行时间总是O(n)，只是说一次就找到的情况是最佳情形，而**大O表示法指出了最糟糕情况下的运行时间**

>除了最糟糕情形下的运行时间，还要考虑平均时间的。

实际上，并不能直接将大O运行时间转换为操作数，但目前来说已经足够了。总结:

- 算法的速度指的并非时间，而是操作数的增速
- 谈论算法的速度时，我们说的是随着输入的增多，其运行时间将以什么样的速度增加。
- O(logn)比O(n)快，当需要搜索的元素更多时，前者比后者快的越多

### **排序及搜索算法**

我们可以将内存理解为超市里的储物柜，每个格子就是一块内存，如果想同时并且连续放置4个柜子，就是数组。。。如果想连续放置100个柜子，数组很明显不满足，因为很容易不连续。这时就需要链表。

而同样，本来四个柜子可以装下，现在又多了一个东西，还需一个柜子。。。就需要重新找一个可以连续放下5个东西的柜子。反映在计算机内就是重新开辟一个新的空间，然后放置。。。因此每次都很慢，这时可以提前向计算机申请一个大点的内存空间，从而预留一些位置。但还需要权衡这些空间是否会用到，以免浪费内存，如果后续超过了还需要重新换位置。

而链表的话，不必是连续的内存空间，就如寻宝游戏，你前往第一个地址，那里有一张纸条写着"下一个元素的地址为123"，因此你前往123，那里又有一张纸条，写着“下一个元素的地址为847”，因此在链表中插入元素很容易，只需将其放入内存，并将其地址存储到前一个元素中。

| | 数组 | 链表
| - | - | - |
读取 | O(1) | O(n)
插入 | O(n) | O(1)
删除 | O(n) | O(1)

#### 冒泡排序

```js
// 每次循环，其实移动只是一个元素，因此需要双层循环
function bubleSort(list) {
  let len = list.length;
  for (let i = 0; i< len; i++) {
    for (j = 0; j < len -1; j++) {
      console.log(1)
      if (list[j] > list[j+1]) {
        [list[j], list[j+1]] = [list[j+1], list[j]]
      }
    }
  }
  return list;
}
bubleSort([3,2,1]); // 1打印了6次，即：3*2 

function bubleSort1(list) {
  let len = list.length;
  let flag = true;

  for (let i = 0; i< len; i++) {
    for (j = 0; j < len -1; j++) {
      console.log(1)
      if (list[j] > list[j+1]) {
        flag = false;
        [list[j], list[j+1]] = [list[j+1], list[j]]
      }
    }
  }
  // 如果没有交换，说明已经是拍好序的了，但也执行了6次有何意义呢？
  if (flag) return list;

  return list;
}
bubleSort1([3,2,1]);

// 其实每次排序，最后面的数字都已经拍好序了，没必要再次比较
// 因此 j < len - 1 - i
function bubleSort2(list) {
  let len = list.length;

  for (let i = 0; i< len; i++) {
    for (j = 0; j < len - 1 - i; j++) {
      console.log(1)
      if (list[j] > list[j+1]) {
        [list[j], list[j+1]] = [list[j+1], list[j]]
      }
    }
  }

  return list;
}
bubleSort2([3,2,1]); // 打印3次1，虽然次数减少了，但复杂度依然是O(n^2)
```

#### 选择排序

选择排序就是重复“从待排序的数据中寻找最小值，将其与序列最左边的数字进行交换”，


```js
// 1、每轮循环找出最小元素的索引
// 2、每轮循环结束，将最小元素放在循环开始位置
function selectSort(arr) {
  let len = arr.length;

  for (let i = 0; i < len -1; i++) {
    let minIdx = i;
    for (let j = 0; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (i !== minIdx) {
      // 说明最小值变化了，把最小值放在初始位置上，即i
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
    }
  }
}
selectSort([3,2,1]); // 6次

// 上面的比较是n*(n-1)次，也就是3*2，其实比较过的值，没必要再次比较
// 因此内层循环为 let j = i + 1
function selectSort(arr) {
  let len = arr.length;
  let times = 0;
  // 务必注意，这里是len - 1，因为最后要给j留一个元素
  // 其实len也行，只是内层循环最后一次不执行而已，
  for (let i = 0; i < len - 1; i++) {
    let minIdx = i;

    for(let j = i + 1; j < len; j++) {
      times++;
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // 不用判断，直接执行也行，如果没变，则无影响，如果变了，就应该调换
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
  }
  console.log(`执行次数：${times}`); //  3次
  return arr;
}
let arr = Array(3).fill(0).map((item, idx) => idx);
selectSort(arr);

// 上面的操作只是操作索引，还可以直接操作元素
function selectSort(array) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    var len = array.length, temp;
    for (var i = 0; i < len - 1; i++) {
      var min = array[i];
      for (var j = i + 1; j < len; j++) {
        if (array[j] < min) {
          [array[j], min] = [min, array[j]]
        }
      }
      array[i] = min;
    }
    return array;
  } else {
    return 'array is not an Array!';
  }
}
```

冒泡排序，是双层循环，每次比较相邻的两个值，然后交换位置，而选择排序，每次都从剩余列表里找出最值的索引，最后放在开始或结束位置。

冒泡和选择排序的时间复杂度都为O(n^2)

#### 插入排序

将一个序列分为两部分，已排序和未排序区间，已排序可以默认为第一个元素，核心就是取未排序区间中的元素，在已排序区间中找到合适位置插入即可。

涉及元素的比较，及元素的移动(需要将插入点的元素往后移动一位，这样才能腾出空间给元素插入)

```js
function insertSort(arr) {
  let len = arr.length;
  if (len <= 1) return arr;

  // i=1，我们认为第一项(i=0)已排好序了
  for (let i = 1; i < len; i++) {
    let val = arr[i];
    let j = i-1; // 定义在这里，因为for循环外要用
    // 已排序的索引最大就是i-1，其实是倒着比，
    // 如果比最后一个还大，就只需比一次
    for (; j >= 0; j--) {
      if (arr[j] > val) {
        arr[j+1] = arr[j]
      } else {
        break;
      }
    }

    // 等到内层循环完，也就移动完了，也就空出一个位置
    // 最后执行完j--，所以这里是j+1
    arr[j+1] = val
  }
  return arr;
}
insertSort([3,5,1]);
// 步骤一、3已经排好序，从数组第二项5开始，3比5小，所以5待在原位
// 步骤二、1比5小，所以5移到第三位了（arr[j+1] = arr[j]），然后1比3还小，所以3移动第二位了，第一位的值就可以改为1了


function insertSort1(arr) {
  let len = arr.length;
  if (len <= 1) return arr;

  // i=1，我们认为第一项(i=0)已排好序了
  for (let i = 1; i < len; i++) {
    let val = arr[i];
    let j = i;

    while (j > 0 && arr[j-1] > val) {
      arr[j] = arr[j-1];
      j--
    }
    // 最后一次j-1项被移走了，而后又j--，
    // 因此其实就是这里的j
    arr[j] = val
  }
  return arr;
}
insertSort1([3,5,1]);

// 插入排序的空间复杂度为O(1)，最好情况的时间复杂度为O(n)，最坏情况则为O(n的平方)
```

可以看出，对于冒泡，插入，选择排序三种算法，时间复杂度都是O(n的平方)比较高，适合小规模数据的排序。。。还有时间复杂度为O(nlogn)的排序算法，**归并排序和快速排序**，这两种比较适合大规模的数据排序。而且也很好的体现了**分治**的思想

#### 归并排序

js的sort方法用以排序数组，但是规范并没有要求用哪种排序算法，所以不同的浏览器使用的算法略有不同。chrome使用的是插入和快速排序，而firefox使用的是归并排序。

具体实践情况参考：https://segmentfault.com/a/1190000010648740

 归并排序是一种分治算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完成的大数组。

因此可以先把数组从中间分成前后两部分，然后再对前后两部分继续分开。。。直到不能分，并排序，最后将排好序的两部分合并在一起。

```js
function mergeSort(arr) {
  let len = arr.length;
  if (len <= 1) return arr;

  let middle = Math.floor(len / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let result = [];

  while(left.length && right.length) {
    if (left[0] <= right[0]) {
      // 把最小的依次放在result里面
      // 每次操作，数组都会变化
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  //经过上面一次循环，只能左子列或右子列一个不为空，或者都为空
  while (left.length){
    // 不能使用concat，因为会死循环
    result.push(left.shift());
  }
  while (right.length){
    result.push(right.shift());
  }
  return result;
}
// 测试数据
var nums=[6,10,1,9,4,8,2,7,3,5];
mergeSort(nums); //
```

归并排序需要另外开辟一个空间，进行存储排好序的数组作为中间过渡状态。。。

#### 快速排序

快速排序也许是最常用的排序算法了，复杂度为O(nlogn)，且通常情况下它比同样O(nlogn)复杂度的其他排序算法性能要好。

快速排序也使用分治的方法，将原始数组分为较小的数组，但与归并排序还略有不同。

参考：[快速排序(阮一峰)][quickSortUrl(ruanyifeng)]  
1. 在数据集中，选择一个元素作为基准(pivot)
2. 所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
3. 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

```js
var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
  // splice返回的是数组，因此[0]就可以取出具体的值
　　var pivot = arr.splice(pivotIndex, 1)[0]; // 务必要注意，这里修改数组，数组的长度已经发生变化了
　　var left = [];
　　var right = [];
    // 注意这里的数组长度是动态变化的，不能一开始就用变量缓存长度
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};
quickSort([9,8,5,3,1]) // [1,3,5,8,9]

// 用es6语法
function quickSortRecursion (arr) {
  if (!arr || arr.length < 2) return arr;
  const pivot = arr.pop();
  let left = arr.filter(item => item < pivot);
  let right = arr.filter(item => item >= pivot);
  return quickSortRecursion(left).concat([pivot], quickSortRecursion(right));
}
```

但上面的方式占用内存比较多，因此还有下面的方式：

```js
function quickSort(arr, left, right) {
  /*
   * len为数组的长度;
   * left为需要数组中参与排序的起始点；right为数组中参与排序的终止点;
   * left如果有传数字那么就为left，没有传参则为0；
   * right如果有传参那么就为right，没有传参则为len-1;
   * 有传参可能会部分排序可能不会排序，没传参默认排序整个数组;
   * partitionIndex为分组界限;
   */
  var len = arr.length,
    partitionIndex,
    left = typeof left !== 'number' ? 0 : left,
    right = typeof right !== 'number' ? len - 1 : right;

  // 如果需要排序的起始索引小于终止索引则执行排序;递归的终止条件；
  if (left < right) {

    // partition的返回值作为partitionIndex来分隔数组；
    // 索引partitionIndex左边的元素均小于arr[partitionIndex]；
    // 右边的元素均大于arr[partitionIndex]；
    partitionIndex = partition(arr, left, right);

    // 数组中小于arr[partitionIndex]的部分(索引left到partitionIndex-1)再次使用quickSort排序；
    quickSort(arr, left, partitionIndex - 1);

    // 数组中大于arr[partitionIndex]的部分(索引partitionIndex+1到right)再次使用quickSort排序；
    quickSort(arr, partitionIndex + 1, right);
  }
  // 递归执行直到不满足left<right;返回本身；
  return arr;
}

function partition(arr, left, right) {
  /*
   * 这部分是具体实现排序的部分；
   * 将left赋值给pivot，作为参照物，因为left在最左边，只需要从左到右比较一遍即可判断整个数组；
   * index索引是arr中待交换位置；
   */
  var pivot = left,
    index = pivot + 1;
  // for循环从参照物arr[pivot]下一个元素arr[pivot+1]开始一直比较到子数组结束arr[right]；
  for (var i = index; i <= right; i++) {

    // 循环中如果有任何小于参照物的，就将他交换到index的位置，然后index向右移动到下一个位置；
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  /*
   * 因为每次都是交换完后index移动到下一个位置，所以在循环结束时，index仍为待交换的位置；
   * 此时索引pivot+1到index-1的元素都小于参照物arr[pivot]；
   */

  // 交换pivot和index-1索引的值之后index-1索引左边全都是小于arr[index-1]的元素；
  swap(arr, pivot, index - 1);

  // 返回index-1作为拆分子数组的分界线；
  return index - 1;
}
/*
* 普通的交换，将a[i]和a[j]的数值交换；
*/
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
quickSort([9,8,5,3,1]) // [1,3,5,8,9]
```


### **递归**

如果使用循环，性能可能更高，如果使用递归，程序可能更容易理解。但要注意的是递归写起来简洁，但实际上执行的效率并不高。

```js
// 实现数的阶层n！
function factorial(n) {
  if (n === 1) return 1;
  return n*factorial(n-1)
}
factorial(3); // 6

// 实现斐波那契数列
function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n-2) + fibonacci(n-1)
}

// 实现斐波那契数列
var count = 0;
var fibonacci = function(n) {
  count++;
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
for (var i = 0; i <= 10; i++) {
  fibonacci(i);
}
// 计算到10的斐波那契额数列竟然运行了453次函数调用
console.log(count); // 453

console.time();
fibonacci(20)
console.timeEnd(); // 1.965087890625ms

// 当执行 fib(0) 时，调用 1 次
// 当执行 fib(1) 时，调用 1 次
// 当执行 fib(2) 时，相当于 fib(1) + fib(0) 加上 fib(2) 本身这一次，共 1 + 1 + 1 = 3 次
// 当执行 fib(3) 时，相当于 fib(2) + fib(1) 加上 fib(3) 本身这一次，共 3 + 1 + 1 = 5 次
// 当执行 fib(4) 时，相当于 fib(3) + fib(2) 加上 fib(4) 本身这一次，共 5 + 3 + 1 = 9 次
// ...

// 优化版，需要一个对象保存已经计算过的值
var fibonacci = (function(n){
  // 利用闭包保存已计算的值
  let cache = Object.create(null);

  // 因为最终要的是函数，所以这里返回函数
  return n => {
    if (n < 2) return n;

    if (cache[n-2] === void 0) {
      cache[n-2] = fibonacci(n-2)
    }
    if (cache[n-1] === void 0) {
      cache[n-1] = fibonacci(n-1)
    }
    return cache[n] = cache[n-1] + cache[n-2]
  }
})()

console.time();
fibonacci(20)
console.timeEnd(); // 0.055908203125ms
```

使用递归计算数组的累加和

```js
// 使用遍历或循环可以轻松的求出和，如果是递归呢？
function addSum(arr) {
  let sum = 0;
  if (arr.length < 2) {
    return arr.shift();
  } else {
    sum = arr.shift() + addSum(arr);
  }
  return sum;
}
addSum([1,2,3]); // 6

// 使用递归找到数组中最大值rr
function findMax(arr) {
  let len = arr.length;
  let max = 0;
  if (len < 2) {
    return arr[0]
  } else {
    let temp = arr.shift();
    if (max < temp) {
      max = temp;
    }
    findMax(arr);
  }
  return max;
};
findMax([1,2,3]); // 6
```

为什么能使用循环遍历的场合，非得用递归呢？因为在函数式编程里，没有循环，只有递归。

### **数组相关**

>编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```js
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>a-b)
```

>业务中，有时会从后台获取一个很大的数组，然后要么渲染在页面，要么过滤后渲染到页面上，如何高效渲染呢？

```js
<span
-  v-for="item in vendorList"
-  v-if="item.vendorId == scope.row.vendorId"
+  v-for="item in filterVendorList(scope.row.vendorId)"
+  :key="item.vendorId"
>{{item.vendorName}}</span>

// 减号是之前代码，v-for和v-if写在一块，每次接口数据回来后，页面都需要卡顿好几秒才可以交互，
// 原因就是v-for的优先级高，因此哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表
// 加号是优化代码，避免写在一块，又不用增加新标签，如下其实，就是过滤一下大数组。
filterVendorList(vendorId) {
  if (this.vendorList) {
    return this.vendorList.filter(item => {
      return item.vendorId === vendorId
    })
  } else {
    return [];
  }
}
// 当然如果利用计算属性，效率会更好，计算属性如果涉及传参，可以内部返回函数
filterVendorList() {
  return function(vendorId) {
    // todo
  }
}
```

>两数之和，给定一个整数数组和一个目标值，找出数组中和为目标值的两个数

```js
function twoNumSum(arr, target) {
  let map = {};
  // arr.forEach();// 无法退出
  for(let item of arr) {
    let temp = target - item;
    // 其实相当于将两个加数存到map里
    if (map[temp] === void 0) {
      map[item] = item;
    } else {
      // 如果是forEach则无法退出，意味着无法收到返回值。
      // 因此需要用for循环
      return [map[temp], item]
    }
  }
}
twoNumSum([2,7,11,15], 9);
```

>两数之和 II，给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

```js
function twoNumSumII(arr, target) {
  let map = {};
  let len = arr.length;
  // let [item,idx] of map，可以，但不能用在数组arr上
  for(let i = 0; i < len; i++) {
    let temp = target - arr[i];
    if (map[temp] === void 0) {
      map[arr[i]] = i;
    } else {
      // +1是因为，返回的索引要求大于0开始
      return [map[temp]+1, i+1]
    }
  }
}
// leetcode上的跑分，并不准确，同一份代码提交多次，耗时差别还挺大
// 执行用时 :72 ms, 在所有 JavaScript 提交中击败了56.84%的用户
// 内存消耗 :35.4 MB, 在所有 JavaScript 提交中击败了40.00%的用户
twoNumSumII([2,7,11,15], 9); // [1,2]

function twoNumSumII1(arr, target) {
  // 因为数组是有序的
  let lowIdx = 0;
  let highIdx = arr.length - 1;

  while(lowIdx < highIdx) {
    let sum = arr[lowIdx] + arr[highIdx]
    if (sum === target) {
      return [lowIdx+1, highIdx+1];
    } else if (sum < target) {
      // 因为有序数组，所以，如果小于，则采用右侧大点的元素
      lowIdx++;
    } else {
      highIdx--;
    }
  }
  // while循环如果没返回，则返回
  return [-1,-1];
}
// 执行用时 :68 ms, 在所有 JavaScript 提交中击败了71.27%的用户
// 内存消耗 :35.1 MB, 在所有 JavaScript 提交中击败了70.00%的用户
twoNumSumII1([2,7,11,15], 9); // [1,2]
```

>删除排序数组中的重复项，给定一个排序数组，你需要使用原地算法删除重复的项，最后返回数组长度

```js
// 原地删除，就是不占用新的内存空间
function removeDuplicates(arr) {
  let len = 0;
  for(let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i+1]) {
      arr.splice(i,1);
      // 删除后，索引需要减少一个
      i--
    } else {
      len++;
    }
  }
  return len;
}
removeDuplicates([2,7,7,11,15]); // 4
removeDuplicates([2]); // 1
```

>移除元素，给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

```js
// 原地删除，就是不占用新的内存空间
var removeElement = function(nums, val) {
  for(let i = 0; i< nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i --;
    }
  }
  return nums.length;
};
```

>合并两个有序数组，给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

```js
// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
// 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
// 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3

// 输出: [1,2,2,3,5,6]

var merge = function(nums1, m, nums2, n) {
  let len = m + n;
  while(n>0) {
    // 当m<=0时，其实就是nums1里面全是位置，此时只需将nums2里的按顺序插入即可
    // 这里还需要注意 --len是，执行前先进行减一操作。
    if (m <= 0) {
      nums1[--len] = nums2[--n]
      continue
    }
    // 如果n大于0，且m>0，则两个数组里都没有比较完毕，需要继续比较
    // 当n<=0，说明nums2已经处理完毕
    nums1[--len] = nums1[m-1] < nums2[n-1] ? nums2[--n] :  nums1[--m]
  }
};
```

>最大连续1的个数，给定一个二进制数组， 计算其中最大连续1的个数。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
  // [1,0,1,1,0,1]
  // 转为字符串，然后分割，排除[0]
  let arr = nums.toString().replace(/(0,?)+/g, ' ').split(' ');
  let max = 0;
  arr.forEach(item => {
    item = item.replace(/,/g, '');
    max = Math.max(max, item.length)
  })
  return max;
};

var findMaxConsecutiveOnes1 = function(nums) {
  // [1,0,1,1,0,1]
  let len = nums.length;
  let count = 0;
  let max = 0;

  for (let i = 0; i < len; i++) {
    if (nums[i] === 1) {
      count ++;
    } else {
      max = Math.max(max, count);
      count = 0;
    }
  }
  return Math.max(max, count)
};
```

>搜索插入位置：给定一个排序数组和一个目标值，在数组中找到目标值，并返回索引。如果目标值不在数组中，返回它将会被按顺序插入的位置

```js
// 需要考虑边界情况，比如就一项，比如只在两侧等等
function searchInsert(arr, target) {
  let idx = arr.indexOf(target);

  if (idx === -1) {
    // 如果手动查找，需要考虑边界情况，因此直接插入，重新排序
    arr.push(target)
    return arr.sort((a,b)=> a-b).indexOf(target);
  } else {
    return idx;
  }
}

// 执行用时 :72 ms, 在所有 JavaScript 提交中击败了36.59%的用户
// 内存消耗 :35.9 MB, 在所有 JavaScript 提交中击败了13.04%的用户
searchInsert([2,7,7,11,15], 13); // 4


function searchInsert1(arr, target) {
  let map = Object.create(null);
  let len = arr.length;

  for (let i = 0; i< len; i++) {
    map[arr[i]] = i;
    if (map[target] !== void 0) return map[target]
  }

  // 为了排除边界的情况，可以在边界添加两个值
  arr[-1] = -Infinity;
  arr[len] = Infinity;
  // 再次for循环，target肯定会落在这区间
  for(let i = 0; i <= len; i++) {
    if (arr[i-1] < target && target < arr[i]) {
      return i;
    }
  }
}

// 执行用时 :84 ms, 在所有 JavaScript 提交中击败了18.08%的用户
// 内存消耗 :37.5 MB, 在所有 JavaScript 提交中击败了8.7%的用户
searchInsert1([2,7,7,11,15], 13); // 4
// 这种反而效率不高。。。单次测试还是不准，因为复杂度分析必须得会
```

>最大子序和，给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

```js
function maxSubArray(arr) {
  let max = -Infinity;
  let sum = 0;

  arr.forEach(item => {
    sum += item;
    if (max < sum) {
      max = sum;
    }
    // 如果小于0，需要清零
    if (sum < 0) {
      sum = 0;
    }
  });
}

// 执行用时 :64 ms, 在所有 JavaScript 提交中击败了91.54%的用户
// 内存消耗 :34.8 MB, 在所有 JavaScript 提交中击败了100.00%的用户
maxSubArray([-2,1,-3,4,-1,2,1,-5,4]); // 6
```

>加一：给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。你可以假设除了整数 0 之外，这个整数不会以零开头。

```js
function plusOne(arr) {
  // 注意每个元素只存储单个数字，其实相当于10进制
  // 由于有进位的可能，如果想着直接转换成数字来计算，数字会溢出
  // Number('1234567891234567891') => 1234567891234568000
  let num = Number(digits.toString().replace(/,/g, ''));
  num ++;
  return num.toString().split(''); // 比较小点的数字可以
}

function plusOne1(arr) {
  let ans = [];
  let add = 0;
  let len = arr.length;

  // 直接运算一次
  arr[len-1]++;

  for (let i = len - 1; i > -1; i--) {
    let sum = arr[i] + add;
    // 其实每次将进位和当前数字相加，然后再计算
    ans[i] = sum % 10; // 余数就是应该的值
    add = ~~(sum/10);  // 其实可以理解为Math.floor，但负数表现不一致
  }
  // 如果循环完以后，还有add，则最开始处需要添加进位
  if (add) {
    ans.unshift(add);
  }
  return ans;
}
// 执行用时 :64 ms, 在所有 JavaScript 提交中击败了74.40%的用户
// 内存消耗 :33.9 MB, 在所有 JavaScript 提交中击败了90.00%的用户
plusOne1([9]); // [1,0]
```

>求众数：给定义一个大小为n的数组，找到其中的众数。众数的特征是指在数组中出现次数大于 n/2 的元素。

```js
function findZhongShu(arr) {
  let len = arr.length;
  let map = {};
  let res = [];
  arr.forEach(item => {
    if (map[item] === void 0) {
      map[item] = 1;
    } else {
      map[item]++
    }
  });

  for (let item of Object.entries(map)) {
    if (item[1] > len/2) {
      res.push(item[0]);
    }
  }
  return res;
}

findZhongShu([3,2,3]); // ['3']

function findZhongShu1(arr) {
  let len = arr.length;
  let map = {};
  let res = [];
  arr.forEach(item => {
    if (map[item] === void 0) {
      map[item] = 1;
    } else {
      map[item]++
    }

    // 第一种是双重循环，但这里每次都会判断。。。
    if (map[item] > len/2) {
      res.push(item)
    }
  });
  return res;
}

findZhongShu1([3,2,3]); // [3]
```

>杨辉三角：给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。在杨辉三角中，每个数是它左上方和右上方的数的和。

```js
function generate(numRows) {
  let arr = [];
  if (numRows === 1) return [[1]]

  for (let i = 1; i <= numRows; i++) {
    // 初始化每个子元素
    arr[i-1] = [];
    // 初始化每个子元素的开始和结束位置，都是1
    arr[i-1][0] = 1;
    arr[i-1][i-1] = 1;

    // 如果大于2，开始产生中间数值，需要遍历并等于它左上方和右上方的数的和
    if (i > 2) {
      for (let j = 1; j <= i-2; j++) {
        arr[i-1][j] = arr[i-2][j-1] + arr[i-2][j]
      }
    }
  }
  return arr;
}
generate(5);
// [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
// 执行用时 :60 ms, 在所有 JavaScript 提交中击败了84.16%的用户
// 内存消耗 :33.7 MB, 在所有 JavaScript 提交中击败了100.00%的用户

function generate1(numRows) {
  let arr = [];

  for (let i = 0; i < numRows; i++) {
    if (i === 0) {
      arr[i] = [1];
      continue;
    }

    // 其实这里从第二行就开始遍历，而上面的解法是从第三行开始遍历
    for (let j = 0; j <= i; j++) {
      if (j === 0) {
        arr[i][j] = 1;
      } else if(j === i) {
        arr[i][j] = 1;
      } else {
        arr[i][j] =  arr[i-1][j-1]+ arr[i-1][j]
      }
    }
  }
  return arr;
}
generate1(5);
// [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
// 执行用时 :56 ms, 在所有 JavaScript 提交中击败了93.59%的用户
// 内存消耗 :33.7 MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

> 买卖股票的最佳时机：给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

```js
function maxProfit(prices) {
  let len = prices.length;
  let max = 0;
  for(let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (prices[j] - prices[i] > max) {
        max = prices[j] - prices[i];
      }
    }
  }
  // 通常利润是负数，一般不会交易，因此利润应该为0
  if (max < 0) {
    max = 0;
  }
  return max;
}

// 执行用时 :388 ms, 在所有 JavaScript 提交中击败了23.96%的用户
// 内存消耗 :35.4 MB, 在所有 JavaScript 提交中击败了92.00%的用户
maxProfit([7,6,4,3,1]); // 0


function maxProfit1(prices) {
  // 上面的暴力破解复杂度是O(n2)，比较低效，如何只用一层循环呢？
  // 最小值，其实要设置数值上限
  let minPrice = Infinity; // 记录最小值
  let max = 0;
  prices.forEach(price => {
    if(price < minPrice) {
      minPrice = price;
    } else {
      max = Math.max(max, price - minPrice)
    }
  })
  return max;
}

// 执行用时 :76 ms, 在所有 JavaScript 提交中击败了60.59%的用户
// 内存消耗 :35.3 MB, 在所有 JavaScript 提交中击败了92.00%的用户
maxProfit1([7,1,5,3,6,4]); // 5

function maxProfit3(prices) {
  // 上面的暴力破解复杂度是O(n2)，比较低效，如何只用一层循环呢？
  // 最小值，其实要设置数值上限
  let minPrice = Infinity; // 记录最小值
  let max = 0;
  let len = prices.length;
  for (let i = 0; i < len; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else {
      // 如果用三元，则能提高至66ms，内存没变化
      // max = max < (prices[i] - minPrice) ? prices[i] - minPrice : max;
      max = Math.max(max, prices[i] - minPrice);
    }
  }
  return max;
}

// 执行用时 :88 ms, 在所有 JavaScript 提交中击败了43.08%的用户
// 内存消耗 :35.3 MB, 在所有 JavaScript 提交中击败了92.00%的用户
maxProfit3([7,1,5,3,6,4]); // 5
// 综上forEach的效率要稍高于for循环，而三元表达式的效率要高于Math.max方法调用

function maxProfit4(prices) {
  let minPrice = Infinity;
  let max = 0;

  prices.forEach(price => {
    minPrice = minPrice > price ? price : minPrice;
    max =  max < (price - minPrice) ? price - minPrice : max;
    //   minPrice = Math.min(minPrice, price);
    //   max  = Math.max(max, price - minPrice)
  });
  return max;
}

// 执行用时 :76 ms, 在所有 JavaScript 提交中击败了60.59%的用户
// 内存消耗 :35.1 MB, 在所有 JavaScript 提交中击败了100.00%的用户
maxProfit4([7,1,5,3,6,4]); // 5
// 还可以动态规划方式
```

> 旋转数组：给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数

```js
function rotate(arr, k) {
  // 向右移动k位，其实就是截取slice(k, arr.length)
  // 然后拼接到最开始
  let left = arr.slice(-k);
  let right = arr.slice(0, -k);
  // 上面两行的arr指针还和外部的一致，但下面的就会生成一个新指针给arr
  // 因此下面的操作不会影响到外面的数组
  arr = left.concat(right)
}
rotate([1,2,3,4,5,6,7], 3);// 


// 下面的操作，会与外面的arr始终保持同步
function rotate1(arr, k) {
  // 只有k < arr.length，k才不为0，且k为其本身
  k = k % arr.length;
  
  let temp = [];
  if (k) {
    // slice省略参数2，即是到最后
    temp = arr.slice(-k)
  }
  // 当k不为0，需要删除拷贝的那一部分，当k为0，说明移动太多了，导致数组为空
  arr.splice(-k, k);
  arr.unshift(...temp)
}
rotate1([1,2], 1);
```

### **栈结构**

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

### **柯理化**

写一个加法函数(sum)，使他可以同时支持sum(x,y)和sum(x)(y)两种调用方式。

```js
function fn(...args) {
  if(args.length>1) {
    let tempVal = 0;
    args.forEach(item => tempVal += item)
    return tempVal;
  } else {
    return (...arg1s) => {
      return fn.apply(this,[...args, ...arg1s])
    }
  }
}
console.log(fn(1,2),fn(1)(2))
```

### **队列**

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

### **链表**

数组提供了`[]`语法获取元素很是方便，然而（大多数语言中）数组的大小是固定的，从数组的起点或中间插入或移除元素的成本很高，因为需要移动元素。

而链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的，每个元素由一个存储元素本身的节点和一个指向下一个元素的引用组成。链表的好处在于，添加或移除元素的时候不需要移动其他元素。数组可以通过索引直接访问元素，而要想访问链表中的元素，需要从起点开始迭代列表直到找到所需要的元素。

可以将火车想象成一个链表，每节车厢通过铰链链接，断开任意两个车厢间的铰链就可以插入一节新的车厢。。。

### **广度优先**

**深度优先遍历和广度优先遍历**  
树形结构一般有两种遍历方法，深度优先遍历和广度优先遍历
所谓深度优先就是先选择一个子树纵向遍历，而广度优先则是同级别横向遍历。

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

function bfs(root) {
  let quene = [];
  let res = [];
  quene.push(root);
  while (quene.length) {
    let node = quene.shift();
    res.push(node.val);
    if (!node.child) continue;
    q.push(...node.child)
    // for (let child of node.child) {
    //   quene.push(child);
    // }
  }
  return res;
}

bfs(root);
// ["a", "b", "d", "c", "e", "f"]
```

遍历dom节点

```js
let root=document.documentElement;
let res = []
function Dom(root){
  if (root.nodeName) {
    res.push(root.nodeName);
  }

  var children = root.children;  
  for(var i=0;i<children.length;i++){
    Dom(children[i]);
  }
}
Dom(root);

// 如果遍历一个非结构化的数据，用正则比较方便，如下：
// 给定一个字符串格式的dom结构，然后打印所有的标签
var reg = /<(\w+)>/g;
var str = '<body><div><span><b></b></span></div></body>'

while(true) {
  var match = reg.exec(str);
  if (!match) break;
  console.log(match[1]);
  // body div span b
}

// 还可以直接匹配
function logDom(str) {
  let reg = /<(\w+)>/g;
  str.replace(reg, (all, letter) => console.log(letter));
}
logDom(str);
```

### **常见算法题**

#### **字符串相关**

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

### **相关链接**

[haotostudyalgorithmurl(juejin)]: https://juejin.im/post/5cf5d203e51d45590a445afd "小白说算法如何学"
[comicalgorithmurl]: https://cloud.tencent.com/developer/article/1101517 "程序员小灰漫画算法"
