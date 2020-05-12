---
layout: post
title: 从现在起，开始学算法
date: Wed Jun 05 2019 23:26:32 GMT+0800 (中国标准时间)
---

> 突然发现身边好多大神，就属自己最菜。。。

### **参考资料**

[小白一路走来，连续刷题三年，谈谈我的算法学习经验(掘金)][haotostudyalgorithmurl(juejin)]、[漫画算法][comicalgorithmurl]

### **基本概念**

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


### **性能相关**

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


### **正则相关**

#### 基本知识点

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
  return str;
}
formatNumber1(12456.734567); // "12,456.73"
formatNumber1(0); // "0.00"
formatNumber1(.1); // "0.10"

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

### **日期相关**

#### Date对象基本知识点

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

#### setDate() 方法

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

```

### **动态规划**

淘宝的“双十一”购物节有各种促销活动，比如“满 200 元减 50 元”。假设你女朋友的购物车中有 n 个（n>100）想买的商品，她希望从里面选几个，在凑够满减条件的前提下，让选出来的商品价格总和最大程度地接近满减条件（200 元），这样就可以极大限度地“薅羊毛”。作为程序员的你，能不能编个代码来帮她搞定呢？

动态规划(dynamic programming，DP)是一种将复杂问题分解成更小的子问题来解决的优化技术。动态规划只有当每个子问题都是离散的，即不依赖其他子问题时才管用。

```js
// 递归法：斐波那契数列数列
function fib(n) {
  if(n<2) return 1;
  return fib(n-1) + fib(n-2);
}
console.time();
fib(30)
console.timeEnd(); // 13.01611328125ms

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
```

**注意**，动态规划和分而治之是不同的方法。分而治之方法是把问题分解成相互独立的子问题，然后组合它们的答案，而动态规划则是将问题分解成相互依赖的子问题(比如斐波那契数列)。

动态规划学习路线动态规划比较适合用来求解最优问题，比如求最大值、最小值等等

### **二分法**

对于一个有序的列表（比如1-100），如果要查找1这个数的位置，二分查找：50 -> 25 -> 13 -> 7 -> 4 -> 2 -> 1通过七次就可以找到，如果挨个找，比如倒序就需要100次。

在数学中 2^3 = 8，那我想知道几个2相乘是8怎么算？即：$\log_2{8}$ = 3。

```js
// 在数学中
2^3 = 8
// 那我想知道几个2相乘是8怎么算？即
log2^8 = 3
```

综上：**对数运算其实就是幂运算的逆运算**

在使用大O表示法时，log 指的都是 $\log_2$，因此对于有序长度为 n 的列表，使用二分查找的时间复杂度为：logn，如果n为8，log8也就是3。

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

### **选择排序**

我们可以将内存理解为超市里的储物柜，每个格子就是一块内存，如果想同时并且连续放置4个柜子，就是数组。。。如果想连续放置100个柜子，数组很明显不满足，因为很容易不连续。这时就需要链表。

而同样，本来四个柜子可以装下，现在又多了一个东西，还需一个柜子。。。就需要重新找一个可以连续放下5个东西的柜子。反应在计算机内就是重新开辟一个新的空间，然后放置。。。因此每次都很慢，这时可以提前向计算机申请一个大点的内存空间，从而预留一些位置。但还需要权衡这些空间是否会用到，以免浪费内存，如果后续超过了还需要重新换位置。

而链表的话，不必是连续的内存空间，就如寻宝游戏，你前往第一个地址，那里有一张纸条写着"下一个元素的地址为123"，因此你前往123，那里又有一张纸条，写着“下一个元素的地址为847”，因此在链表中插入元素很容易，只需将其放入内存，并将其地址存储到前一个元素中。

| | 数组 | 链表
| - | - | - |
读取 | O(1) | O(n)
插入 | O(n) | O(1)
删除 | O(n) | O(1)

选择排序每一轮找出列表里的最大（或最小）值，放在列表循环的开始位置，比如第一轮放在索引为0的位置，第二轮则放在索引为1的位置。。。

```js
function selectSort(arr) {
  // 1、每轮循环找出最小元素的索引
  // 2、每轮循环结束，将最小元素放在循环开始位置
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
    // 一轮循环结束，将最小的放在循环开始处
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
  }
  console.log(`执行次数：${times}`);
  return arr;
}
let arr = Array(4).fill(0).map((item, idx) => idx);
selectSort(arr);
```

选择排序，每次都从剩余列表里找出最值的索引，最后放在开始或结束位置。而冒泡排序，是双层循环，每次比较相邻的两个值，然后交换位置

```js
// 冒泡排序
function bubleSort(arr) {
  let len = arr.length;
  let times = 0;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] < arr[j+1]) {
        times++;
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  console.log(`执行次数：${times}`);
  return arr;
}
let arr = Array(6).fill(0).map((item,idx) => idx)
bubleSort(arr);
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
    for (let child of node.child) {
      quene.push(child);
    }
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
