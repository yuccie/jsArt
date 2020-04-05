---
layout: post
title: 从现在起，开始学算法
date: Wed Jun 05 2019 23:26:32 GMT+0800 (中国标准时间)
---

> 突然发现身边好多大神，就属自己最菜。。。

### **参考资料**

[小白一路走来，连续刷题三年，谈谈我的算法学习经验(掘金)][haotostudyalgorithmurl(juejin)]、[漫画算法][comicalgorithmurl]

### **基本概念**

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
/(12|13)/g.test(1); // false
/(12|13)/g.test(12); // false

// 正则实例对象的几种方法
// 1. exec 在字符串中查找，返回数组(成员是匹配成功的子字符串),未匹配到返回null
// 1-1. exec 在字符串中查找，返回数组(未匹配到返回null)
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

r1.exec(s) // ["x"]
r2.exec(s) // null

// 1-2. 正则表示式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员，第一个成员是整个匹配的结果，成员二是圆括号里规则里匹配的内容。。。
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

// 2. test 测试是否包含指定字符串，返回true或false
// 2-1. 带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配
// 2-2. 带有g修饰符，可通过正则对象的lastIndex属性指定开始搜索的位置。
// 2-3. 正则模式是一个空字符串，则匹配所有字符串

// 3. match 在字符串中查找，返回数组，未匹配到返回null，
// 3-1. 字符串的match与正则的exec相似
// 3-2. 但若带g修饰符，match会一次性返回所有匹配成功的结果
var s = 'abba';
var r = /a/g;

s.match(r) // ["a", "a"]
r.exec(s) // ["a"]
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
  var str = String(telNum) || "18912341234";
  var pat = /(\d{3})\d*(\d{4})/; // 必须带括号，表示分组
  return str.replace(pat,'$1***$2');
}
formatTelNum(); // 189***1234

// 格式化人民币
const FormatMoney = (s)=> {
  if (/[^0-9\.]/.test(s)) return "invalid value";
  s = s.replace(/^(\d*)$/, "$1.");
  s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
  s = s.replace(".", ",");
  var re = /(\d)(\d{3},)/;
  while (re.test(s)) {
    s = s.replace(re, "$1,$2");
  }
  s = s.replace(/,(\d\d)$/, ".$1");
  return  s.replace(/^\./, "0.")
}

// 5-3. 参数二还可以是函数
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
// 6-1. 参数一时正则，参数二是返回数组的最大成员数量
// 非正则分隔
'a,  b,c, d'.split(',')
// [ 'a', '  b', 'c', ' d' ]

// 正则分隔，去除多余的空格
'a,  b,c, d'.split(/, */)
// [ 'a', 'b', 'c', 'd' ]

// 指定返回数组的最大成员
'a,  b,c, d'.split(/, */, 2)
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

function formatNumber(val) {
  var num = val + '';
  var str = '';
  var ret = num.split('.');
  
  if (ret[0] !== undefined) {
    // \B是非单词边界，这里没有意义
    str = ret[0].replace(/\B(?=(?:\d{3})+$)/g, ',');
    if (ret[1]) {
      str += '.' + ret[1];
    }
  }
  return str;
}


// 8. 组匹配
// 正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容
/fred+/.test('fredd');       // true
/(fred)+/.test('fredfred');  // true

var m = 'abcabc'.match(/(.)b(.)/);
m ;// ['abc', 'a', 'c']
// 正则表达式/(.)b(.)/一共使用两个括号，第一个括号捕获a，第二个括号捕获c。
// 使用组匹配，不宜使用g修饰符，否则match方法不会捕获分组的内容。
var m = 'abcabc'.match(/(.)b(.)/g);
m ;// ['abc', 'abc']

// 可以用\n引用括号匹配的内容，n是从1开始的自然数，表示对应顺序的括号。
/(.)b(.)\1b\2/.test("abcabc");
// true
// \1表示第一个括号匹配的内容（即a），\2表示第二个括号匹配的内容（即c）。

/y(..)(.)\2\1/.test('yabccab') // true，此时\2就是c,\1就是ab

/y((..)\2)\1/.test('yabababab') // true
// 面代码中，\1指向外层括号，\2指向内层括号。

//  8-1. 组匹配之非捕获组
// (?:x)称为非捕获组，表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。
// 使用场景，假定需要匹配foo或者foofoo，正则表达式就应该写成/(foo){1, 2}/
// 但这样就会占用一个组匹配。这时就可以这样：/(?:foo){1, 2}/

var m1 = 'abc'.match(/(.)b(.)/);
m1; // ["abc", "a", "c"]
var m = 'abc'.match(/(?:.)b(.)/);
m // ["abc", "c"]
// 使用非捕获组，所以最终返回的结果中就没有第一个括号。

// x(?=y)称为先行断言，x只有在y前面才匹配，y不会被计入返回结果。
var m = 'abc'.match(/b(?=c)/);
m // ["b"]
var m = 'abc'.match(/b(c)/);
m // ["bc", "b"]

// x(?!y)称为先行否定断言，x只有不在y前面才匹配，y不会被计入返回结果。
/\d+(?!\.)/.exec('3.14') // ["14"]
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
[...'abcde'.split('').reverse().join('').replace(/(.{2})/g, '$1-')].reverse().join('');


/*
题：改为驼峰命名
1、_，-可能在两侧
*/
function toHump (name) {
  return name.replace( /[_|-](\w)?/g, function ( all, letter ) {
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
  return name.replace(/([A-Z])/g, (str, letter) => `_${letter.toLowerCase()}`);
}
toLine2('aBcDfe');
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

`setDate()`方法用来设定日期物件中本地时间的日，也就是每个月中的几号，传入参数是一个1~31的整数。若是传入的值超出当月份的正常范围，setDate（）方法也会依据超出的数值进行计算

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


#### **算法之字符串相关**

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
console.time();
trimStringByByte('abc134中国人', 7);
console.timeEnd();

getTimePerformance(trimStringByByte, 1000);
```

**题：查找一个字符串在另一个字符串中的出现的第一个位置？**

```js
/*
1、可以直接用match
2、
*/
// 用indexOf
var index = 'abcdefbc'.indexOf('bc')

// 用search
var index = 'abcdefbc'.search(/(bc)/)

// 用match
var matchObj = 'abcdefbc'.match(/(bc)/); 
// ["bc", "bc", index: 1, input: "abcdefbc", groups: undefined]
matchObj.index = 1

```

**题：给定一个字符串，找出其中不含有重复字符的 最长子串 的长度。？**

```js
/*
思路一：遍历字符串，保留一个临时字符串，如果重复就删除第一个重复的字符，直到最长的那个
*/
function lengthOfLongestSubstring1(s) {
  let num = 0, res = 0, m = '';
  for (let n of s) {
    if (m.indexOf(n) === -1) {
      m += n;
      num++;
      res = num > res ? num : res;
    } else {
      m += n;
      // 删除第一个重复的字符
      m = m.slice(m.indexOf(n)+1)
      num = m.length;
    }
  }
  return res;
}

function lengthOfLongestSubstring2(str) {
  if (!str.length) return 0
  let tmpStr = ''   // 每次循环找到的不含重复字符的子字符串
  let maxStrLen = 0   // 最大不含重复字符的子字符串的长度
  let len = str.length   
  let left = 0  // 不含重复字符的子字符串的左游标
  for (let i = 0; i < len; i++) {
    if (tmpStr.indexOf(str[i]) !== -1) {
      left += (str.slice(left, i).indexOf(str[i]) + 1)
      continue
    }
    tmpStr = str.slice(left, i + 1)
    maxStrLen = Math.max(maxStrLen, tmpStr.length)
  }
  return maxStrLen
}
```

**题：给定一个字符串，判断是否由n个重复字符串构成？**

```js
/*
思路一：n大于1
*/
function repeatedSubstringPattern(s) {
  let tempStr = ''
  for (let m of s) {
    if (tempStr.indexOf(m) === -1) {
      tempStr += m;
    } else {
      break;
    }
  }
  // 当'a'时错误
  // if (s.split(tempStr).every(item => item === '') ) {
  //   return true
  // } else {
  //   return false;
  // }


  // "abaababaab"时错误
  // 如果分割成数组，且每项都为空，则为true
  // let tempArr = s.split(tempStr);
  // if (tempArr.length > 2 && tempArr.every(item => item === '') ) {
  //   return true
  // } else {
  //   return false;
  // }

  // 当 abac时，下面逻辑就会有问题
  // if (s.length % tempStr.length === 0) {
  //   return true;
  // } else {
  //   return false;
  // }
};
repeatedSubstringPattern('a')

function repeatedSubstringPattern2(s) {
  // \1就是匹配的前面的组
  let reg = /^(\w+)\1+$/;
  return reg.test(s);
}

function repeatedSubstringPattern3(s) {
  // 先合并，再掐头去尾，如果还包含，则正确
  // abab => abababab => bababa => abab
  let s1 = (s + s).slice(1, -1);
  return s1.indexOf(s) !== -1;
}
```

**题：找出两个字符串中共有的最大公共子字符串**

```js
/*
题目：字符串的最大公因子
思路一：
*/
function gcdOfStrings(str1, str2) {
  if (str1 + str2 !== str2 + str1) return '';

  // 将字符串问题转为数学问题，求最大公因子公式（辗转相除法）
  // 求出字符串在字符串str1中截止的索引位置
  const gcd = (a, b) => (0 === b ? a : gcd(b, a % b))

  // 截取字符串
  return str1.substring(0, gcd(str1.length, str2.length))
}


function gcdOfStrings(str1, str2) {
let n1 = str1.length, n2 = str2.length
  if(n1 === n2) {
    if(str1 === str2) return str1
    else return ''
  }
  if(n1 < n2) {
    let tmp = str2.split(str1).filter((val) => val !== '')
    if(tmp.length === 0) return str1
    else if(tmp.length > 1 || tmp[0] === str2) return ''
    else return gcdOfStrings(tmp[0], str1)
  }

  if(n1 > n2) {
    let tmp = str1.split(str2).filter((val) => val !== '')
    if(tmp.length === 0) return str2
    else if(tmp.length > 1 || tmp[0] === str1) return ''
    else return gcdOfStrings(tmp[0], str2)
  }
};
```



#### **算法之数组相关**

```js
/*
两数之和
给定一个整数数组和目标值，找出数组中和为目标值的两个数
*/
function twoSum1(nums, target) {
  let res = {};
  let numsLen = nums.length;
  for (let i = 0; i < numsLen; i++) {
    // 其实就是将两个值作为数组里的索引，而值就是要得到的目标索引
    let temp = target - nums[i]
    if (res[temp] !== void 0) return [res[temp], i];
    res[nums[i]] = i;
  }
}
twoSum2([2,7,11,15], 9);

/*
最大子序和
给定一个整数数组，求这个数组中，哪个连续子数组的和最大，和是多少

直接forEach，然后累计加和，如果和每次都增大，则继续累加，如果总和小于0，从0开始累计。
*/
var maxSubArray = function(nums) {
  var maxn = - Number.MAX_VALUE;
  var sum = 0;
  nums.forEach(function(item, index, array) {
    sum += item;
    // 如果每次累加都增大，说明
    if (sum > maxn) {
      maxn = sum;
    }
    if (sum < 0)
      sum = 0;
  });
  console.log(arr);
  return maxn;
};

maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) // 6
// 思考如何返回对应的子数组？？？
```

**题：找出最短的连续子数组，如果把子数组排序好了，整个数组也就排序好了**

```js
/*
思路一：先对数组排序，拍好序后跟原来的数组进行对比，得到索引差
*/
function findUnsortedSubarray(nums) {
  //将nums进行升序操作，与原数组进行前后比较，找出索引差
  var arr = [...nums].sort((a,b)=>a-b);
  var l = 0;
  var r = 0;
  for(var i=0;i<arr.length;i++){
    if(arr[i] !== nums[i]){
      l = i;
      break;
    }
  }
  for(var j=nums.length-1;j>-1;j--){
    if(nums[j] !== arr[j]){
      r = j;
      break;
    }
  }
  if(l === 0 && r === 0){
    return 0;
  }
  return r - l + 1;
};
let nums = [2,6,4,8,10,9,15];
findUnsortedSubarray(nums);
```

**题：给定一个未排序的整数数组，返回最长、连续且递增的子序列的长度**

```js
/*
思路一：从第一项开始比较，如果后面比前面大，则累计次数，然后两层循环
*/

function findLongSunArr(nums) {
  let len = nums.length;
  let longest = 0;
  for(let i = 0; i< len; i++) {
    // 外层每次循环都需要重新计数
    let tempLen = 0;
    for (j = 0; j< len; j++) {
      if (nums[j] < nums[j+1]) {
        tempLen ++;
        continue;
      } else {
        // 如果有一个不满足，直接退出当前循环
        break
      }
    }
    longest = Math.max(longest, tempLen)
  }
  return longest;
}
findLongSunArr([1,3,5,7,6]);
```

**题：给定一个排序的整数数组，使用原地算法删除重复的元素，并返回新的数组长度**

```js
/*
思路一：循环，发现相等的，就原地删除，切记数组长度是即时变化的，不能缓存
*/

function removeDuplicates1(nums) {
  for (let i = 0; i< nums.length; i++){
    if (nums[i] === nums[i+1]) {
      nums.splice(i, 1);
    }
  }
  return nums.length;
}
removeDuplicates1([1,1,5,7,7]); // 3
```

**题：给定一个排序无重复的整数数组和一个目标值，返回目标值在数组中的位置**

```js
/*
题目：搜索插入位置
思路一：目标值可能在，也可能不在数组中
*/

function findTargetIndex(nums, target) {
  // 先假设在数组中
  let tempIdx = nums.indexOf(target);
  
  if (~tempIdx) {
    return tempIdx;
  } else {
    // 不在数组中
    for (let i = 0; i< nums.length; i++){
      if (nums[i] < target && target < nums[i+1]) {
        return i+1;
      }
    }
  }
}
findTargetIndex([1,5,7,8], 6); // 2
```

**题：给定一个长度为n的数组，找出其中的众数**

```js
/*
思路一：众数特征，出现次数大于 n/2 的。
*/

function findZhongShu1(nums) {
  let len = nums.length;
  let map = {};
  for (let i = 0; i < len; i++) {
    if (map[nums[i]] !== void 0) {
      map[nums[i]] ++;
    } else {
      map[nums[i]] = 1;
    }

    // 可以在循环里直接判断
    if (map[nums[i]] > len/2) {
      return nums[i];
    }
  }

  // 再次遍历结果，也行，但没必要
  // let res = [];
  // for (let [item, val] of Object.entries(map)) {
  //   if (val > len/2) {
  //     res.push(item);
  //   }
  // }
  // return res;
}
findZhongShu1([3,2,3]); // ['3']
```

**题：给定一个整数数组和一个整数k，判断是否存在索引不同，但值相同，且索引差的绝对值为k**

```js
/*
思路一：
*/

function containsNearbyDuplicate(nums, k) {
  let len = nums.length;
  for (let i = 0; i< len; i++) {
    if (nums[i] === nums[i+k]) {
      return [i, i+k]
    }
  }
}
containsNearbyDuplicate([1,2,3,1], 3); // [0,3]
```

**题：给定一个整数数组和一个整数k，返回所有索引不同，但对应的值相差k的组合**

```js
/*
思路一：双层循环，但会有可能会产生重复的组合，因此最好先排序
思路一：结果里可能出现类似 [1,2] [2,1]这种，需要去除
*/

function findPairs(nums, k) {
  let len = nums.length;
  let res = [];
  nums = [...new Set(nums)]
  for (let i = 0; i< len; i++) {
    for (let j = 1; j< len; j++) {
      if (Math.abs(nums[i] - nums[j]) === k) {
        res.push([nums[i],nums[j]])
      }
    }
  }
  return res;
}
findPairs([3,1,4,1,5], 2); // 
findPairs([1,2,3,4,5], 1); // 

function findPairs2(nums, k) {
  let len = nums.length;
  let res = [];
  // nums = [...new Set(nums)]
  for (let i = 0; i< len; i++) {
    for (let j = 1; j< len; j++) {
      if (Math.abs(nums[i] - nums[j]) === k && i < j) {
        res.push([nums[i],nums[j]])
      }
    }
  }
  // 去重
  let map = {};
  res.forEach(item => {
    map[item.toString()] = item;
  })

  return Object.values(map);
}
// findPairs2([1,2,3,4,5], 1); // 
// findPairs2([1,3,1,5,4], 0); // 
findPairs2([1,1,1,2,1], 1); // 

// 这个可以的。
function findPaires3(nums, k) {
  let len = nums.length;
  let map = new Map();

  for (let i = i; i < len; i++) {
    if (map.has(nums[i])) {
      map.set(nums[i], map.get(nums[i]) + 1);
    } else {
      map.set(nums[i], 1)
    }
  }

  for (let i = i; i < len; i++) {
    if (map.has(nums[i]) && map.get(num[i]) > 0) {
      // k > 0 && map.has(nums[i]+k)，其实就是当k大于0，map对象里nums[i]+k有值即可
      // k === 0 && map.get(num[i]) > 1，k===0，说明必须重复才可以，也就是map.get(num[i]) > 1
      if ((k > 0 && map.has(nums[i]+k) || (k === 0 && map.get(num[i]) > 1))) {
        count++;
      } else {
        map.set(num[i], -1)
      }
    }
  }
  return count;
}

```

**题：给出一个数组(0-n)，找出缺少哪个数字**

```js
/*
思路一：排序，比对
思路二：存在map里，比对
*/

function findMissedNums(nums) {
  let len = nums.length;
  nums.sort((a,b) => a-b);

  for (let i = 0; i< len; i++) {
    if (nums[i] !== i) {
      return i;
    }
  }
}
findMissedNums([1,2,4,0]); // 3

function findMissedNums2(nums) {
  let len = nums.length;
  let map = {};

  nums.forEach(item => map[item] = true);

  for (let i = 0; i< len; i++) {
    if (!map[i]) return i;
  }
}
findMissedNums2([1,2,4,0]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：先统计0出现次数n，然后用0分割数组，再合并，最后补加n个0
思路二：遍历，等于0就删除，然后累计次数，最后拼接
思路三：遍历，等于0就删除，然后直接push(0)，但需要注意是倒序，长度也就不变了
*/

function moveZeroes(nums) {
  let n = 0;
  nums.forEach((item,idx) => {
    if (item === 0) {
      nums.splice(idx,1);
      n ++;
    }
  })
  return nums.concat(Array(n).fill(0))
}
moveZeroes([1,2,4,0,1,3]); 

function moveZeroes2(nums) {
  for (let i = nums.length -1; i > -1;i--) {
    if (nums[i] === 0) {
      nums.splice(i,1);
      nums.push(0);
    }
  }
  return nums;
}
moveZeroes2([1,2,4,0,1,3]); 
```

**题：给定一个数组，返回数组中第三大的数，不存在第三个，则返回最大值**

```js
/*
思路一：排序，去重，获取第三个，若不存在，返回第一个
*/

function findThridMax(nums) {
  // 升序是a-b，倒序是 b-a
  nums = [...new Set(nums)].sort((a,b) => b-a);
  if (nums[2]) {
    return nums[2]
  } else {
    return nums[0]
  }
}
findThridMax([1,2,4,0,2,4,1]); // 1
```

**题：给定一个二进制数组，计算其中最大连续1的个数**

```js
/*
思路一：遍历，一个值存储最大，一个值存储每次比较的
*/

function findLongestOnes(nums) {
  let len = nums.length;
  let max = 0, temp = 0;
  for (let i = 0; i< len;i ++) {
    if (nums[i] === 1) {
      temp ++;
      max = max < temp ? temp : max;
    } else {
      temp = 0;
    }
  }
  return max
}
findLongestOnes([1,1,0,1,1,1]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：
*/

function moveZeroes(nums) {

}
moveZeroes([1,2,4,0]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：
*/

function moveZeroes(nums) {

}
moveZeroes([1,2,4,0]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：
*/

function moveZeroes(nums) {

}
moveZeroes([1,2,4,0]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：
*/

function moveZeroes(nums) {

}
moveZeroes([1,2,4,0]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：
*/

function moveZeroes(nums) {

}
moveZeroes([1,2,4,0]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：
*/

function moveZeroes(nums) {

}
moveZeroes([1,2,4,0]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：
*/

function moveZeroes(nums) {

}
moveZeroes([1,2,4,0]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：
*/

function moveZeroes(nums) {

}
moveZeroes([1,2,4,0]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：
*/

function moveZeroes(nums) {

}
moveZeroes([1,2,4,0]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：
*/

function moveZeroes(nums) {

}
moveZeroes([1,2,4,0]); // 3
```

**题：给定一个数组，将所有的0移到末尾，不能改变其他顺序**

```js
/*
思路一：
*/

function moveZeroes(nums) {

}
moveZeroes([1,2,4,0]); // 3
```

### **相关链接**

[haotostudyalgorithmurl(juejin)]: https://juejin.im/post/5cf5d203e51d45590a445afd "小白说算法如何学"
[comicalgorithmurl]: https://cloud.tencent.com/developer/article/1101517 "程序员小灰漫画算法"
