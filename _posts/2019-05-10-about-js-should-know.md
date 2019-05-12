---
layout: post
title: 关于javascript你需要知道的
date: Fri May 10 2019 17:25:49 GMT+0800 (中国标准时间)
---
>写在前面：平时开发中总是遇见相同的问题，但很多时候都需要重新查找相关资料才可以，不但浪费了时间，而且每次都有种重新开始的感觉。。。因此将这些常见问题总结在一起，后续再有相关问题，都将其归为一类进行总结对比学习。

### **参考资料**

---

### **javascript的前世今生**

---

### **基本概念**

---

#### **严格模式**

ECMAScript 5引入严格模式的概念，是为javascript定义了一种不同的解析与执行模型。在严格模式下，ECMAScript 3中不确定的行为或某些不安全的操作都做了一些限制或错误处理。要在整个脚本启用严格模式，可以在顶部添加：`use strict`

这段代码看似为字符串，而且也没有赋值给任何变量，但其实是一个**编译指示（pragma），用来告诉支持的js引擎切换到严格模式**。这是为了不破坏ECMAScript 3语法而特意选定的语法，还可以在指定函数为严格模式：

```js
function doSomething(){
  'use strict'
  // TODO
}
```

#### **自动分号**

语句的分号不是必须的，但建议任何时候都加上。因为：

- 避免不必要的错误(不完整输入)
- 代码结尾处没有分号会导致压缩错误
- 加上分号某些情况下会增进代码性能(解析器不必再花时间推测哪里插入分号)

#### **代码块 {}**

可以借鉴c风格的语法把多条语句组合在一个代码块里，虽然if语句只在执行多条语句时，才要求使用代码块，但最佳实践是始终使用代码块，即使只有一条语句，如：

```js
if (test) console.log('test') // 有效但容易出错，不要使用

if (test) {
  console.log('test') // 推荐
}
```

#### **变量**

ECMAScript的变量是松散型的，也就是可以保存任何类型的数据。换句话说，**每个变量仅仅是一个用于保存值得占位符**而已，定义变量时，要使用`var,let,const`等操作符(同时也是关键字)，后跟变量名（即标识符）

```js
var msg
```

上面代码定义了一个名为`msg`的变量，可以用来保存任何值(上面那样未经初始化的变量，会保存一个特殊的值`undefined`)。

```js
var msg = 'hi javascript'
msg = 100 // 有效但不推荐
```

像上面那样先初始化一个字符串数据类型，后又改为数字类型，这种即改变变量值又改变值类型的行为不推荐。

。所有变量(包括基本类型和引用类型)都存在与一个执行环境(也叫作用域)中，这个执行环境决定了变量的生命周期，以及哪一部分代码可以访问其中的变量。

---

### **基本数据类型**

---

#### **typeof**

鉴于ECMAScript是松散类型的，因此需要一种手段来检测变量的数据类型，`typeof`就是负责提供这方面信息的操作符。

```js
typeof 'hello'      // 'string'
typeof true         // 'boolean'
typeof 100          // 'number'
typeof undefined    // 'undefined'
typeof (null)       // 'object'
typeof function(){} // 'function'
```

#### **Null 与 Undefined**

**注意：**`typeof`是一个操作符而不是函数，因此例子中的圆括号可以使用，但不是必需的。这里`typeof null`返回`'object'`，因为`null`被认为是一个**空的对象引用**，其实更底层原因是因为不同的对象在计算机底层都表示为二进制，在`JavaScript`中二进制前三位都为 0 的话会被判断为 `object` 类型，`null`的二进制表示是全 0，自然前三位也是 0，所以执行`typeof` 时会返回`'object'`。

`null`表示"没有对象"，即该处不应该有值。`undefined`表示"缺少值"，就是此处应该有一个值，但是还没有定义。

注意：对未经声明或未初始化的变量，使用`typeof`都会返回`'undefined'`，但无法使用`delete`删除一个直接通过`var`声明的全局变量

```js
var aa
typeof aa // 'undefined'
typeof bb // 'undefined'
delete aa // false
delete bb // true

// 另外注意
null == undefined   // true , 实际上undefined值是派生自null值的(null出现的早)
+ null === 0        // true ,+ 其实就是数字转化，相当于Number(null)
Number(null) === 0  // true
- null === -0       // true , - 也是数字转化，但有符号问题
+ 0 === - 0         // true
```

如果定义的变量准备在**将来用于保存对象，那么最好将该变量初始化为`null`而不是其他值**。这样只要直接检测是否为`null`就可以知道变量是否已经保存一个对象的引用了。

参考：[null和undefined的由来及区别][nullAndundefined(阮一峰)]

#### **instanceof**

。`typeof`是检测字符串、数值、布尔值、`undefined`的最佳工具，但对于对象或`null`，则都返回`'object'`。因此在检测引用类型的值时用途不大，因为**我们并不是想知道某个值是对象，而是想知道它是什么类型的对象**，因此出现了`instanceof`操作符，**用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置**。

如果变量是给定引用类型的实例，那么`instanceof`就会返回`true`。根据规定，所有引用类型都是`Objcet`的实例，因此在检测引用类型值与`Objcet`构造函数时，`instanceof`都会返回`true`，如果检测基本类型，则都会`false`，因为基本类型不是对象。。。

在ECMA-262规范中，凡是内部实现`[[call]]`方法的对象，`typeof`检测都返回`'function'`，由于正则也实现了，因此也会返回`'function'`。。。但现代浏览器普遍都返回`'object'`

#### **Number**

Number类型在ECMAScript中，使用[IEEE754][IEEE_754URL]格式来表示整数和浮点数(又称双精度数值)。常见的格式有10，2，8，16进制等。

8进制的第一位必须是0，然后是8进制数字(0~7)，如果字面值中的数字超过了（0~7），那么前导0被忽略，后面的数值将当做10进制解析，如下

```js
var octalNum1 = 070 // 8进制56 即 (7 * 8 + 0 * 8)
var octalNum2 = 079 // 无效的8进制，丢弃前导0，后面解析为10进制，即79
var octalNum3 = 08  // 无效的8进制，丢弃前导0，后面解析为10进制，即8
```

**注意：**在严格模式下，8进制前导0变为`0o`，即

```js
var num1 = 0o71 // 8进制57 即 (7 * 8^1 + 1 * 8^0)
```

十六进制字面量的前两位必须是`0x`，后面跟十六进制数字（0~9及A-F），字母大小写均可。在进行算术计算时，所有八进制和十六进制表示的数值最终都将被转换为十进制数值。

```js
var hexNum1 = 0xA  // 十六进制10
var hexNum2 = 0XA  // 十六进制10
var hexNum3 = 0x1f // 十六进制31 即 1 * 16^1 + 15 * 16^0
```

#### **浮点数**

所谓浮点数，就是该数值必须包含一个小数点，且小数点后面至少有一个数字，**虽然小数点前可以没有数字但不推荐**。由于浮点数需要的内存空间是整数值的两倍，因此ECMAScript会不失时机的将浮点数转换为整数值。显然，如果小数点后面没有任何数字(如：1.)，或本身就是一个整数(如：10.0)，则都会转换成整数。

对于那些极大或极小的数值，可以用e表示法（科学计数法）表示的浮点数表示。e表示法表示的数值等于e前面的数值乘以10的指数次幂

```js
var floatNum1 = 3.125e7;    // 等于31250000，即3.125 * 10^7
var floatNum2 = 0.0000003;  // 等于3e-7
```

**浮点数的最高精度是17位小数**，但在进行算术运算时其精确度远远不如整数，如：

```js
0.1 + 0.2 === 0.30000000000000004 // 小数点后正好17位
0.15 + 0.15 === 0.3 // true
```

**注意：**关于浮点数值计算会产生舍入误差的问题，这是因为使用基于[IEEE754][IEEE_754URL]数值的浮点计算的通病，ECMAScript并非独此一家，其他使用相同数值格式的语言也存在这个问题。当然如果只是想表面的'修复'此问题，可以如下：

```js
// 注意结果有的为字符串格式
(0.1 + 0.2).toFixed(10)             // '0.3000000000'
parseFloat((0.1 + 0.2).toFixed(10)) // 0.3
(0.1+0.2).toPrecision(1)            // '0.3'
parseFloat((0.1+0.2).toPrecision(1))// 0.3
```

#### **数值范围**

由于内存的限制，ECMAScript无法存储所有数值，ECMAScript能够表示的最小，最大以及溢出如何处理如下：

```js
// 针对大多数浏览器
Number.MAX_VALUE // 保存着最大值 1.7976931348623157e+308
Number.MIN_VALUE // 保存着最小值 5e-324

Number.MAX_VALUE * 2      // 最大值溢出，显示为Infinity
Number.MIN_VALUE - 2e+308 // 最小值溢出，显示为-Infinity

Number.MIN_VALUE - 2e+307 // -2e+307
Number.MIN_VALUE - 2      // -2，此时和精度有关
Number.MIN_VALUE / 2      //  0，此时和精度有关

Number.POSITIVE_INFINITY  //  Infinity，保存着溢出后的最大值
Number.NEGATIVE_INFINITY  // -Infinity，保存着溢出后的最小值
```

**注意：**上面例子中如果想模拟溢出最小值，会有点出乎意料，但其实这是精度的问题，而且也就从308开始显示为`-Infinity`，而308也和最大值呼应起来。检测某个值是否在最大值与最小值之间，可以如下：

```js
var overflowMaxVal = Number.MAX_VALUE * 2
var overflowMinVal = Number.MIN_VALUE - 2e+308

isFinite(overflowMaxVal) // false
isFinite(overflowMinVal) // false
isFinite(666)            // true
```

#### **NaN**

NaN，即非数值（not a number），是一个特殊的数值，用来表示**一个本来要返回数值的操作数未返回数值的情况（这样在程序运行中就不会抛出错误了）**，它有两个特点：

- 任何涉及NaN的操作都返回NaN（如：NaN / 2）
- 不等于任何值(包括自身，NaN == NaN 为false)

当然可以利用`isNaN()`函数来检测是否为NaN，这个**函数在接收一个值以后，会尝试将这个值转为数值，如果不能转换为数值就会返回true**。

```js
isNaN(NaN)        // true
isNaN('string')   // true
isNaN(undefined)  // true
isNaN({})         // true

isNaN(10)         // false
isNaN('10')       // false，'10'会被转换10
isNaN(true)       // false，true会被转换1
isNaN(null)       // false，null会被转换0
```

`isNaN()`函数也可以传入**对象**，此时会**先调用对象的`valueOf()`方法，然后确定该方法返回的值是否可以转换为数值，如果不能，则基于这个返回值再调用`toString()`方法，再测试其返回值。**

#### **数值转化**

有三个函数可以把非数值转化为数值：`Number()、parseInt()、parseFloat()`，**`Number()`适用于所有数据类型**，其他两个专门用于**将字符串转为数值**。`Number()`转换规则如下：

1. 如果是`Boolean`值，`true`和`false`分别转为1和0
2. 如果是数值，只是简单的传入和返回
3. 如果是`null`，返回0
4. 如果是`undefined`，返回`NaN`
5. 如果是字符串，则有以下规则

     - 字符串**只包含数字(可以有正负号)**，则转为10进制，如：'1' => 1,'-123' => -123，'011' => 11(忽略前导0)
     - 字符串**只包含浮点格式(可以有正负号)**，则转为对应浮点数值，忽略前导0，如：'-01.1' => -1.1
     - 字符串**包含十六进制格式**，转换为10进制，如：'0xa' => 10，'-0xa' => NaN
     - 字符串为空(不含任何字符)，转换为0
     - 如果字符串中包含上述格式以外的字符，转为`NaN`

6. 如果是对象(如果是`Date`对象可直接调用`toString()`)，先调用对象的`valueOf()`方法，然后确定该方法**返回的值是否为原始值**，如果不是，则基于这个返回值再调用`toString()`方法，然后依次按照**前面的规则转换返回的字符串值**。

下面一句话不太准确  
~~如果是对象，先调用对象的`valueOf()`方法，然后按照前面的规则转换返回的值，如果结果为`NaN`,则调用对象的`toString()`方法，然后依次按照前面的规则转换返回的字符串值。~~

#### **valueOf**

`object.valueOf()`方法**返回该对象的原始值**，而**ECMAScript规定的变量可以存储在两种类型的值：原始值和引用值**。

- **原始值：**存储在栈(stack)中的简单数据段，他们的值直接存储在变量访问的位置
- **引用值：**存储在堆(heap)中的对象，存储在变量处的值是一个指针(point)，指向存储对象的内存处

为变量赋值时，ECMAScript 的解释程序必须判断该值是原始类型，还是引用类型。要实现这一点，解释程序则需尝试判断**该值是否为 ECMAScript 的原始类型之一**，即 `Undefined、Null、Boolean、Number`和 `String`型。由于这些**原始类型占据的空间是固定的，所以可将他们存储在较小的内存区域 - 栈中。这样存储便于迅速查寻变量的值**。

如果一个值是**引用类型的，那么它的存储空间将从堆中分配**。由于引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在**变量中的值是该对象存储在堆中的地址**。地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。

另外：引用类型的值是保存在内存中的对象，与其他语言不同，js不允许直接访问内存中的位置，在操作对象时，实际操作的是对象的引用而不是实际的对象。

JavaScript调用`valueOf`方法将对象转换为原始值。你很少需要自己调用`valueOf`方法；当遇到要预期的原始值的对象时，JavaScript会自动调用它。

默认情况下，`valueOf`方法由Object后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。如果对象没有原始值，则`valueOf`将返回对象本身。

JavaScript的**许多内置对象都重写了该函数，以实现更适合自身的功能需要**。因此，不同类型对象的`valueOf()`方法的返回值和返回值类型均可能不同。

| 对象         | 返回值                                                  |
| :---        | :---                                                   |
| Array       | 返回数组对象本身                                          |
| Boolean     | 布尔值。                                                 |
| Date        | 存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。      |
| Function    | 函数本身。                                               |
| Number      | 数字值                                                   |
| Object      | 对象本身。这是默认情况。                                    |
| String      | 字符串值                                                 |
|             | Math、Error 对象没有 valueOf 方法         |

```js
// 其实下面的这几个没必要调用valueOf，因为都是原始值
1.230.valueOf()                  // 1.23
'1.230'.valueOf()                // '1.230'
true.valueOf()                   // true
null.valueOf()                   // Cannot read property 'valueOf' of null
undefined.valueOf()              // 同上

// Date对象转换后，直接就是数字了，直接调用数字转化规则
new Date().valueOf()             // 1551667119234 距今的毫秒数

// 下面几个对象转换之后仍然是对象，因此需要再调用toString()
[].valueOf()                     // []
["ABC", true, 12, -5].valueOf()  // ["ABC", true, 12, -5]
({}).valueOf()                   // {}
({a:1}).valueOf()                // {a:1}
(function(){}).valueOf()         // function(){}

[].valueOf().toString()                     // ''
["ABC", true, 12, -5].valueOf().toString()  // "ABC,true,12,-5"
({}).valueOf().toString()                   // "[object Object]"
({a:1}).valueOf().toString()                // "[object Object]"
(function(){}).valueOf().toString()         // "function(){}"
```

**注意：**`({}).valueOf()`，这里的`{}`用`()`包括起来了，这是因为避免解析器将`{}`解析为代码块，此处应该为对象，所以包裹起来。

上面便是数字转化的规则，因此遇到需要隐式转换的场景，应该熟练上述转化：

```js
console.log(1 + "5");               // "15"
console.log([1, 3, 5] + 1);         // "1,3,51"
console.log(10 + true);             // 11
console.log(15 + {});               // "15[object Object]"
console.log(8 + null);              // 8
console.log("queen" + null);        // "queennull"
console.log({} + null);             // "[object Object]null"
console.log(12 + undefined);        // NaN
console.log("w3cplus" + undefined); // "w3cplusundefined"
console.log([] + null);             // "null"
console.log([] + undefined);        // "undefined"
console.log([] + "w3cplus");        // "w3cplus"
```

知道了对象转化为数字的规则，则当有加法运算时（**其实一元加操作符的操作与`Number()`函数相同**），也有一定规则：

1. 如果操作符数中有一个对象，它将转换为原始值
2. 如果操作符数中有一个字符串，第二个操作数将转换成字符串，并且连接在一起转换成一个字符串（和顺序无关）
3. 在其它情况之下，两个操作数转换为数字并且将执行加法运算

```js
// 前置减号和前置加号，都优先转换为数字再计算
console.log(+ '12' + '34')      // '1234'
console.log(+ '12' + 34 )       // 46
console.log(+ 12 + '34')        // '1234'
console.log(+ 12 + 34 )         // 46

console.log(- '12' + '34')      // '-1234'
console.log(- '12' + 34)        // 22
console.log(- 12 + '34')        // '-1234'
console.log(- 12 + 34)          // 22

// 减号在中间，两侧都转换为数值，否则为NaN
console.log('11' + 2 - '1')       // 111  数字
console.log('12' - '34')          // -22
console.log('12' - '34a')         // NaN
console.log('12' - 34)            // -22
console.log(12 - '34')            // -22
console.log(12 - 34)              // -22
```

参考：[js中的加号运算符][addOperatorUrl]、[js中的减号运算符][minusOperatorUrl]  

#### **parseInt() & parseFloat()**

`Number()`函数在转换字符串时，比较复杂繁琐，`parseInt()、parseFloat()`则更加单纯，更多的是**看是否符合数值模式**。首先来看`parseInt()`的规则：

- 忽略字符串前面的空格
- 找到第一个非空格字符
- 若第一个字符不是数字或正负号，则返回NaN
- 若第一个字符有效，则继续后面的字符，直到遇到非数字字符
- 若第一个字符有效，还可以识别出各种整数格式(二、八、十六进制)

```js
parseInt(' ') // NaN，而Number(' ') => 0
parseInt('1.1') // 1, 符号.在parseInt里为无效符号
parseInt('123abc') // 123
parseInt('0xf') // 15

parseInt('071')  // 57，在ES3引擎上为8进制
```

**注意：**`parseInt('071')`在ES3和ES5引擎上表现不一致，在ES3上被认为是八进制，因此值为57，但在ES5引擎上，`parseInt()`不具有解析八进制值得能力(十六进制仍然可以)，~~因此前导0会被认为无效，从而返回0，结果就是十进制的0~~

从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀0表示，ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。

在现在chrome浏览器，有以下行为：

```js
parseInt('011', 2)  // 3
parseInt('011')     // 11
parseInt('071')     // 71
parseInt('071', 8)  // 57
parseInt('0o71')    // 0
parseInt('0o71', 8) // 0
parseInt('0b11')    // 0
```

为了消除`parseInt()`函数可能导致的上述问题，可以为这个函数提供第二个参数，转换时使用的基数，如果知道要解析的值是16进制，那么就指定16作为第二个参数，以保证得到正确的结果。而且**若指定了第二个参数，还可以不带'0x'**

**注意：**parseInt方法的可选参数是**操作数的进制说明，不是要转化的目标的进制**。要想进制转换可以利用`Number.prototype.toString()`

```js
// string 要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用toString 抽象操作)
// radix 一个介于2和36之间的整数(数学系统的基础)，表示上述字符串的基数。当未指定基数时，不同的实现会产生不同的结果，通常将值默认为10。
parseInt(string, radix);

// 以下例子均返回15
parseInt("0xF", 16);
parseInt("F", 16);
parseInt("17", 8);
parseInt(021, 8);      // 和parseInt('021', 8) => 17不同
parseInt("015", 10);   // parseInt(015, 10); 返回 15
parseInt(15.99, 10);
parseInt("15,123", 10);
parseInt("FXX123", 16);
parseInt("1111", 2);
parseInt("15 * 3", 10);
parseInt("15e2", 10);
parseInt("15px", 10);
parseInt("12", 13);

// 以下例子均返回 NaN:
parseInt("Hello", 8); // 根本就不是数值
parseInt("546", 2);   // 除了“0、1”外，其它数字都不是有效二进制数字

// 以下例子均返回 -15：
parseInt("-F", 16);
parseInt("-0F", 16);
parseInt("-0XF", 16);
parseInt(-15.1, 10);
parseInt(" -17", 8);
parseInt(" -15", 10);
parseInt("-1111", 2);
parseInt("-15e1", 10);
parseInt("-12", 13);

// 下例中也全部返回 17，因为输入的 string 参数以 "0x" 开头时作为十六进制数字解释，而第二个参数假如经过 Number 函数转换后为 0 或 NaN，则将会忽略而仍然解析为十六进制
parseInt("0x11", 16);
parseInt("0x11",  0);
parseInt("0x11", NaN);
// 如果给十六进制数传其他进制，则无法识别，直接返回0
parseInt("0x11", 8);    // 0

// 另外被解析参数的第一个字符若无法被转换，则返回NaN
parseInt('211', 2) // 返回 NaN，因为二进制不可能有2
parseInt('a11', 2) // 返回 NaN，因为二进制无法转换a字符
```

`parseFloat()`在解析过程中遇到了正负号(+或-),数字(0-9),小数点,或者科学记数法中的指数(e或E)以外的字符,则它会忽略该字符以及之后的所有字符,返回当前已经解析到的浮点数.同时参数字符串首位的空白符会被忽略。

但字符串中的第二个小数点是无效的，如`parseFloat('22.33.5') => 22.34`。另外就是它始终忽略前导0，可以识别所有**浮点数值格式(包括十进制)，但十六进制始终转换为0**，也就是`parseFloat()`只解析十进制格式，因此**没有第二个参数的用法**

#### **String**

。**基本概念**  
`String`类型用于表示由0或多个16位`Unicode`字符组成的字符序列，**与PHP中单双引号对字符串的解释方式不同，在ECMAScript中，单双引号表示的字符串完全相同**。

`字符串字面量`里可以包含转义字符(非打印字符)，或其他用途的字符，当其出现在字符串中时，长度仍然作为一个字符来解析

```js
'a \n'.length // 3
'b \u03a3'    // 'b ∑'
```

`字符串一旦创建`，并不能修改，那下面操作如何实现？

```js
var str = 'java'
str = 'java' + 'script'
```

过程：  

1. 首先创建一个容纳10个字符串的新字符串
2. 在这个新字符串中填充`'java'`和`'script'`
3. 销毁原来的字符串`'java'`和字符串`'script'`

。**转换为字符串**  
要把一个值转为字符串有两种方式。第一种使用几乎每个值都有的`toString()`方法，第二种是适用于任何类型的`String()`。

在不知道要转换的值是否为`null`或`undefined`时，可以用`String()`:

- 如果值有`toString()`方法，直接调用并返回结果
- 如果值为`null`，返回`'null'`
- 如果值为`undefined`，返回`'undefined'`

。**toString()传参**  
给toString()传参，多数情况下不必传参，但是，在调用**数值**的`toString()`方法时，可以传递一个参数：**输出数值的基数**。默认情况下返回十进制的字符串表示

```js
(10).toString()   // '10' ，之所以加()，因为小数点优先级高，会把10.toString看成数值而出错
(10).toString(2)  // '1010'
(10).toString(8)  // '12'
(10).toString(8)  // 'a'
'10'.toString(16) // '10'，注意此处传参了，但调用toString的不是数值，原样输出
```

---

### **操作符**

#### **逗号操作符**

。**基本概念**  
使用逗号操作符可以在一条语句中执行多个操作，多用于声明多个变量。还用于赋值，在用于赋值时，逗号操作符总会返回表达式的最后一下：

```js
// 声明变量
var num1 = 1, num2 = 2, num3 = 3;

// 赋值
var num = (5, 1, 4, 8);  // num的值为8
```

### **引用数据类型**

---

#### **Object类型**

。**基本概念**  
尽管`ECMAScript`从技术上讲是一门面向对象的语言，但不具备传统面向对象语言所支持的类和接口等结构。

对象是特定引用类型(比如`Object`)的实例，新对象是使用`new`操作符后跟一个**构造函数**来创建的。构造函数本身就是一个函数，只不过该函数是出于创建新对象的目的而定义的。

```js
var person = new Object();
```

上面代码创建了`Object`引用类型的一个新实例，然后把该实例保存在变量`person`中，使用的构造函数`Object`，他只是**为新对象定义了一些默认的属性和方法**。`ECMAScript`提供了很多原生引用类型(`Array、Date、RegExp、Function`等)，以便开发人员用以实现常见的计算任务。

```js
var person = {
  name: 'jane',
  'home': 'beijing',   // 属性名可以使字符串
  66: true,            // 数值属性会自动转为字符串
  age: 18              // 在老的浏览器，最后一个属性后加,号，会出错
};
```

。当然还有字面量方式定义对象，上面例子中，左侧的`{`表示对象字面量的开始，因为它出现在表达式上下文中。在`ECMAScript`中的表达式上下文指的是能够返回一个值(表达式)，赋值操作符表示后面是一个值。

一般来说，访问对象的属性使用点表示法，但还有方括号表示法，后者在通过变量访问或属性名有特殊字符、关键字或保留字时访问属性会很方便

```js
var propertyName = 'name';
person[propertyName]      // 变量
person['first name']      // 特殊字符空格
```

#### **Array类型**

##### .**基本概念**  

`ECMAScript`中的数组和其他语言中的数组有很大差别，虽然都是有序列表，但`ECMAScript`中的数组的每一项可以保存任何类型的数据，而且数组大小还可动态调整。

```js
var arr1 = new Array();
var arr2 = new Array(20);             // length为20的数组（传递一项且为数值则为长度）
var arr3 = new Array('red');          // 只包含一项'red'的数组(传递一项且为非数值则为内容)
var arr4 = new Array('red', 'blue');
var arr5 = Array('red', 'blue');      // 还可以不用new操作符

var arr6 = ['red', 'blue'];
var arr6 = [1,2,];
var arr6 = [,,,];                     // 几个逗号length便为几，值undefined
```

**注意：**数组的`length`属性并非只读，因此可以通过修改`length`属性达到扩大或裁剪数组。数组最多可以包含4 294 967 295个项，超出则会发生异常。

##### .**检测数组**  

自从ES3开始，就出现了检测某个对象是不是数组的问题，对于一个网页或一个全局作用域而言，使用`instanceof`即可。。。但是，`instanceof`的问题在于，它假定单一的全局执行环境。如果**网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的Array构造函数**，则从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有不同的构造函数。。。

为了解决上面的问题，ES5新增了`Array.isArray()`方法，而它无论在哪个全局环境下都可以检测出，某个对象到底是不是数组。

##### .**转换数组**  

所有对象(指引用类型)都有`toLocaleString()、toString()、valueOf()`方法。

```js
var colors = ['red', 'blue', 'green'];

colors.toString()         // 返回字符串，"red,blue,green"
colors.valueOf()          // 返回数组，["red", "blue", "green"]
alert(colors)             // alert接收字符串参数，后台会调用toString()方法
```

另外`toLocalestring()`方法经常也返回与`toString(),valueOf()`方法相同的值，但也不总是如此。因为当数组调用`toLocaleString()`时，数组的每一项会调用自己的`toLocaleString()`方法，如下：

```js
var person1 = {
  toLocaleString : function () {
    return "Nikolaos";
  },
  
  toString : function() {
    return "Nicholas";
  }
};

var person2 = {
  toLocaleString : function () {
    return "Grigorios";
  },
  
  toString : function() {
    return "Greg";
  }
};

var people = [person1, person2];
alert(people);                      // Nicholas,Greg
alert(people.toString());           // Nicholas,Greg
alert(people.toLocaleString());     // Nikolaos,Grigorios
```

##### .**数组转字符串**  

数组继承的`toLocaleString()、toString()、valueof()`方法，默认情况下都会返回逗号分隔的字符串，而如果使用`join()`方法，还可返回自定义分隔符的字符串。

如果不给`join()`方法传递参数，或者传入`undefined`，则依然是逗号分隔。如果数组中某一项是`null、undefined`，那么在使用`toLocaleString()、toString()、valueOf()、join()`方法返回的结果中以空字符串表示。

```js
[null, undefined, 'see'].join()           // ',,see'
[null, undefined, 'see'].toString()       // ',,see'
[null, undefined, 'see'].toLocaleString() // ',,see'
[null, undefined, 'see'].valueOf()        // 数组调用返回自身 [null, undefined, "see"]
```

### **函数**

---

#### **arguments**

ECMAScript函数可以封装任意多条语句，且不介意传进来多少参数，什么数据类型，即便定义的参数与实际调用时传递的数量不一致也没有关系，因为ECMAScript中的参数在内部是用一个**伪数组**来表示，这便是`arguments`对象,具有length属性但并不是数组的实例(也不具有数组常用api)。

ECMAScript函数中命名的参数只是提供便利，但不是必需。另外，在命名参数方面，其他语言可能需要事先创建一个函数签名，而将来的调用必需与该签名一致，但ECMAScript函数并没有此要求，因此ECMAScript函数也不能重载(其实可以理解为同名函数，根据参数名的不同分别执行多次，但在js中同名函数会有覆盖且参数是伪数组，因此无法重载，但可以根据参数个数不同实现不同的逻辑，进而模拟重载)。

```js
function doAdd(num1, num2){
  arguments[1] = 20;
  console.log(arguments[0] + num2);
}

doAdd(10, 10) // 30
```

修改`arguments[1]`会自动映射到num2上，因为`arguments`对象中的值会自动映射到对应的命名参数。但注意：**并不是说这两个值访问相同的内存空间，他们的内存空间是独立的，但值会同步**。

有地方说，上述影响是单向的，即修改`arguments`会自动映射到对应的命名参数，反之不行？但下面代码在chrome可行，也就是说这种改变是双向的。。。

```js
function test(num1, num2){
  arguments[1] = 20;
  console.log(num2);
  num2 = 40;
  console.log(arguments[1])
}

test() // 20 40
```

但在严格模式下，会有些不同，即`arguments`对象**变化时不再与对应的命名参数自动同步值**，如下：

```js
function test(num1, num2){
  'use strict'
  arguments[1] = 20;
  console.log(num2);
  num2 = 40;
  console.log(arguments[1])
}

test() // 2 20
```

#### **函数中参数传递**

。ECMAScript中**所有函数的参数都是按值传递的**。也就是说，把函数外部的值赋值给函数内部的参数，就和把值从一个变量复制到另一个变量一样，即使针对引用类型，也只是将**指向内存的地址给复制了一份**。访问变量有**按值和按引用两种方式，但参数传递只能按值传递**。

在向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，因为这个局部变量里的地址仍然指向外部的那个对象，因此局部变量的变化会反映在函数的外部。

```js
function setName(obj) {
  obj.name = "Nicholas";
  
  obj.name = 'Change';
}

var person = new Object();
setName(person);
console.log(person.name);    // "Nicholas"
```

如上，只是把`person`对象在内存中的地址当做参数传给函数了，当执行`obj.name = "Nicholas";`时，局部变量`obj`和`person`确实都指向同一块内存空间。但执行`obj = new Object();`时，新创建一个内存空间的地址赋值给了局部变量`obj`(也会在函数执行完毕后被销毁)，但并没有影响函数外`person`对象的指向啊，因此依然打印`"Nicholas"`。。。这就证明了：**ECMAScript中所有函数的参数都是按值传递的**

### **性能优化**

#### **管理内存**

。使用具备垃圾回收机制的语言编写程序，开发人员不用担心内存管理问题，但js在进行内存管理与垃圾回收方面面临的问题还是有点与众不同。

其中最主要的问题是：分配给web浏览器的可用内存数量通常比桌面程序要少，这是出于安全考虑，目的就是**防止运行js的网页耗尽全部系统内存而导致系统崩溃**。内存限制问题，不但影响给变量分配内存，同时还会影响调用栈以及一个线程中能够同时执行的语句数量。

因此为了提高性能，降低不必要的内存占用，一旦数据不再使用，最好通过将其值设为`null`来释放引用，适用于大多数全局变量和全局对象的属性，局部变量会在它们离开环境时自动解除引用。

。**注意：解除引用并不意味着自动回收该值占用的空间，而是让值脱离执行环境，以便垃圾回收器下次运行时将其回收**

[nullAndundefined(阮一峰)]: http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html '阮一峰'
[IEEE_754URL]: https://zh.wikipedia.org/wiki/IEEE_754 '维基百科'
[minusOperatorUrl]: http://www.wenjiangs.com/article/javascript-string-number.html '减号运算符'
[addOperatorUrl]: https://www.w3cplus.com/javascript/javascriptss-addition-operator-demystified.html '加号运算符'
[SysConvertUrl]:http://www.cnblogs.com/gaizai/p/4233780.html '任意进制转换'