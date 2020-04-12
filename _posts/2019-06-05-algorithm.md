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

#### **柯理化**

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

**深度优先遍历和广度优先遍历**  
树形结构一般有两种遍历方法，深度优先遍历和广度优先遍历
所谓深度优先就是先选择一个子树纵向遍历，而广度优先则是同级别横向遍历。

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

#### **常见算法题**

##### **字符串相关**

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
