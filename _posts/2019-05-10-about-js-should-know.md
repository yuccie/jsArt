---
layout: post
title: 关于javascript你需要知道的
date: Fri May 10 2019 17:25:49 GMT+0800 (中国标准时间)
---
>写在前面：平时开发中总是遇见相同的问题，但很多时候都需要重新查找相关资料才可以，不但浪费了时间，而且每次都有种重新开始的感觉。。。因此将这些常见问题总结在一起，后续再有相关问题，都将其归为一类进行总结对比学习。

### **参考资料**

[参考js秘密花园][jsSecretGardenUrl]、

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

`let` 关键字可以将变量绑定到所在的任意作用域中（通常是`{ .. }`内部）。换句话说，`let`为其声明的变量隐式地了所在的块作用域。

```js
var foo = true;
if (foo) {
  let bar = foo * 2;
  console.log( bar ); // 2
}
console.log( bar );   // ReferenceError
```

用let 将变量附加在一个已经存在的块作用域上的行为是隐式的。在开发和修改代码的过程中，如果没有密切关注哪些块作用域中有绑定的变量，并且习惯性地移动这些块或者将其包含在其他的块中，就会导致代码变得混乱。

为块作用域显式地创建块可以部分解决这个问题，使变量的附属关系变得更加清晰。通常来讲，显式的代码优于隐式或一些精巧但不清晰的代码。显式的块作用域风格非常容易书写，并且和其他语言中块作用域的工作原理一致：

```js
var foo = true;
if (foo) {
  { // <-- 显式的块
    let bar = foo * 2;
    console.log( bar ); // 2
  }
}
console.log( bar );     // ReferenceError
```

**只要声明是有效的，在声明中的任意位置都可以使用`{ .. }`括号来为`let` 创建一个用于绑定的块**。在这个例子中，我们在if 声明内部显式地创建了一个块，如果需要对其进行重构，整个块都可以被方便地移动而不会对外部if 声明的位置和语义产生任何影响。

**提升是指声明会被视为存在于其所出现的作用域的整个范围内**，但是，使用`let`进行的声明不会提升。

块作用域对垃圾收集及`let`循环有很大帮助，

```js
function process(data) {
  // 在这里做点有趣的事情
}
var someReallyBigData = { .. };
process( someReallyBigData );

var btn = document.getElementById( "my_button" );
btn.addEventListener( "click", function click(evt) {
  console.log("button clicked");
}, /*capturingPhase=*/false );
```

`click`函数的点击回调并不需要`someReallyBigData` 变量。理论上这意味着当`process(..)`执行后，在内存中占用大量空间的数据结构就可以被垃圾回收了。但是，由于click 函数形成了一个覆盖整个作用域的闭包，`JavaScript`引擎极有可能依然保存着这个结构（取决于具体
实现）。因此如果块作用域可以打消这种顾虑，可以让引擎清楚的知道没有必要继续保存`someReallyBigData`了：

```js
// 在这个块中定义的内容可以销毁了！
{
  let someReallyBigData = { .. };
  process( someReallyBigData );
}
```

`.let循环`  
for 循环头部的let 不仅将i 绑定到了for 循环的块中，事实上它将其重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值。下面通过另一种方式来说明每次迭代时进行重新绑定的行为：

```js
{
  let j;
  for (j=0; j<5; j++) {
    let i = j;          // 每个迭代重新绑定！
    console.log( i );   // 0 1 2 3 4
  }
}
```

**注意：**`let`**声明附属于一个新的作用域而不是当前的函数作用域（也不属于全局作用域）**，函数不是唯一的作用域单元。`块作用域指的是变量和函数不仅可以属于所处的作用域，也可以属于某个代码块`（通常指`{ .. }` 内部）。

#### **作用域提升**

引擎会在解释`JavaScript`代码之前**首先对其进行编译**。编译阶段中的一部分工作就是**找到所有的声明**，并用合适的作用域将它们关联起来。

因此，正确的**思考思路是，包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理**。

```js
console.log( a ); // undefined
var a = 2;
```

当你看到`var a = 2;`时，可能会认为这是一个声明。但`JavaScript` 实际上会将其看成两个声明：`var a;` 和`a = 2;`。第一个定义声明是在编译阶段进行的。第二个赋值声明会被留在原地等待执行阶段。也就是处理成如下：

```js
var a;
a = 2;
console.log( a ); // undefined
```

**注意：**提升是针对所有代码，即使是函数内部的声明也会提升，只是函数内的提升只能提升到函数内的最顶层。另外只有**函数声明会提升，但函数表达式不会提升**

```js
foo(); // 不是ReferenceError, 而是TypeError!
var foo = function bar() {
  // ...
};
```

这段程序中的变量标识符`foo`被提升并分配给所在作用域（在这里是全局作用域），因此`foo()`不会导致`ReferenceError`。但是`foo`此时并没有赋值（如果它是一个函数声明而不是函数表达式，那么就会赋值）。`foo()`由于对`undefined`值进行函数调用而导致非法操作，因此抛出TypeError 异常。

**注意：**函数声明和变量声明都会被提升。但是一个值得注意的细节（这个细节可以出现在有多个“重复”声明的代码中）是**函数会首先被提升，然后才是变量**。也就是函数湖覆盖变量。




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

**注意：**`parseInt(021, 8)`与`parseInt('021', 8)`不同，前者的参数1是数字，而后者是字符串。字符串的话则直接按照给定的基数进行解析。而数字的话，js默认0开头的是8进制，因此021对应的就是17，然后第二个参数是8，也就是让浏览器认为这个17也是8进制的，因此17再转换后为15(`1 * 8 + 7 * 8^0`)。同理遇见0x开头的则为16进制，也是需要先转成对应的10进制，然后再按照基数转一次。

```js
parseInt(021, 8)  // 15
parseInt(0x21, 8) // 27, 2*16^1 + 1 => 33, 33 => 3*8^1 + 3 => 27
parseInt(022, 8)  // 1, 2*8 + 2 => 18 ,18的8对于8进制无效，因此为1
parseInt(019, 8)  // 1, 019的9是非法8进制数，因此只识别01也就是1，再转一次也是1
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

##### .**栈方法**

`ECMAScript`数组也提供了一种让数组的行为类似其他数据结构的方法。比如栈，栈是一种可以限制插入和删除项的数据结构，特点是LIFO（Last-In-First-Out）,栈中项的插入（叫推入）和移除（叫弹出）只发生在一个位置--栈的顶部。

反映在数组上，也就是`push()、pop()`方法以便实现类似栈的行为。

```js
var arr = []
arr.push('red','blue') // 2，返回数组length
arr.pop()              // 弹出最后一项并返回，没有参数
```

##### .**队列方法**  

栈数据结构的规则是LIFO(后进先出)，而队列则为FIFO(First-In-First-Out),因此队列中项只发生在队列的前端。

反映在数组上，也就是`unshift()、shift()`方法以便实现类似队列的行为。

```js
var arr = []
arr.unshift('red','blue') // 2，返回数组length
arr.shift()               // 弹出最前面一项并返回，没有参数
```

##### .**重排序方法**  

数组中两个已有的重排序方法`reverse()、sort()`，前者是反转数组，但不够灵活，因此有了`sort()`,默认情况下`sort()`是升序，在实现排序时，`sort()`会为**每个数组项调用`toString()`方法，然后比较得到的字符串，以确定如何排序**。即使数组项都为数值，`sort()`方法比较的也是字符串。**二者的返回值都是排序之后的数组**

```js
var values = [0, 1, 5, 10, 15];
// 这里虽然5小于10，但进行字符串比较时，'10'则位于'5'前面
values.sort()               // [0, 1, 10, 15, 5]，修改了原数组
```

针对上面的问题，`sort()`方法最好接收一个比较函数作为参数，比较函数接收两个参数，这两个参数相互比较，参数一若在参数二之前则返回负数，相等则返回0，之后则返回正数。如果想颠倒顺序只需修改交换返回的值即可。

```js
// compare每次都会接收values数组中的两项作为参数，进行比较
function compare(val1, val2){
  if(val1 < val1){
    return -2
  } else if(val1 > val1) {
    return 2
  } else {
    return 0
  }
}

var values = [0, 1, 5, 10, 15];
values.sort(compare)            // [0, 1, 5, 10, 15]
```

我们注意到上面的`compare`函数内部，只是用`<、>`号还比较，这是因为待排序的数组项有可能不是数值类型或其`valueOf()`没有返回数值类型，如果使用`-`运算符就会有问题，因此如果能确定数组项是数值型或转化后是数值型，则可以使用更加简单的比较函数，如下

```js
'a' < 'b' // true
'a' - 'b' // NaN

// 对于数值类型或其valueOf()方法会返回数值类型的对象类型
function compare(val1, val2){
  return val1 - val2;
}
```

##### .**操作方法**  

`contact()`方法，会先创建当前数组的副本(深拷贝)，然后将接收到的参数添加到副本的末尾，最后返回新数组。

`slice()`方法，基于当前数组的一项或多项创建新数组，有两个参数:返回项的起始位置和结束位置。只有一个参数，则至末尾所有项。两个参数的话，不包括结束位置的项。**注意：不会影响原来数组**，另外，若参数有负数，则用数组长度加上该数来确定相应的位置，如长度为5的数组调用`slice(-2, -1)`与调用`slice(3, 4)`相同，若结束位置小于起始位置，则返回空数组。

```js
var arr = ['red', 'blue', 'yellow'];
arr.slice(1)       // ['blue', 'yellow']
arr.slice(1, 2)    // ['blue']
arr.slice(-2, -1)  // ['blue'], 等价于slice(-2+3, -1+3) => slice(1, 2)
arr.slice(-1, -2)  // []
arr                // ['red', 'blue', 'yellow']
```

`splice()`方法主要用途是向数组的中部插入项，因此**原数组肯定也就改变了**。**删除操作时返回删除的项组成的数组，若没有删除则返回空数组。插入操作时，返回空数组**。

1. **删除**，删除任意数量的项，两个参数：要删除的第一项和要删除的项数，`splice(0,2)`删除前两项
2. **插入**，指定位置插入任意数量的项，三个参数：起始位置、要删除的项数、要插入的项。`splice(2,0,'red','green')`从第二项开始，不删除，直接插入两项

```js
var arr = ['red', 'blue', 'yellow'];
arr.splice()                     // []
arr.splice(1, 1)                 // ['blue']
arr                              // ['red', 'yellow']
arr.splice(-1, 0, 'code', 'js')  // 位置支持负数，只需加上length即可
arr                              // ['red', 'code', 'js', 'yellow']
```

##### .**位置方法**  

`indexOf()、lastIndexOf()`方法，两个参数：要查找的项和(可选)表示要查找起点位置的索引。前者从数组开头向后找，后者从数组末尾开始找。都返回查找的项在数组中的位置。没有找到则返回-1，匹配操作时使用`===`全等。

##### .**迭代方法**  

`ECMAScript`为数组提供了5个迭代方法，**每个方法都接收两个参数**：要在每一项运行的函数和（可选的）运行该函数的作用域对象---影响`this`的值。传入这些方法的函数会接收三个参数：数组项的值、该项的索引和数组对象本身。

- `every()`,给数组中每一项运行给定函数，若该函数对每一项都返回`true`，则返回`true`
- `filter()`,给数组中每一项运行给定函数，返回该函数会返回`true`的项组成的数组
- `forEach()`,给数组中每一项运行给定函数，没有返回值
- `map()`,给数组中每一项运行给定函数，返回每次函数调用的结果组成的数组
- `some()`,给数组中每一项运行给定函数，若该函数对任一项返回`true`，则返回`true`

**注意：**以上都不会影响原数组。

##### .**缩小方法**  

`ECMAScript`为数组提供了2个缩小方法:`reduce()、reduceRight()`,这两个方法会迭代数组的所有项，然后构建一个最终返回的值。前者从数组第一项开始迭代逐个到最后，后者从最后一项开始。两个方法都接收连个参数：在每一项上调用的函数和（可选的）作为缩小基础的初始值。传给`reduce()、reduceRight()`的函数接收4个参数：前一个值、当前值、当前项的索引和数组对象。

这个函数返回的任何值都会作为第一个参数自动传给下一项，第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数就是数组的第二项。

```js
// 可以求和
var values = [1, 2, 3, 4, 5];
var sum = values.reduce((prev, cur, index, array) => {
  return prev + cur
})
// 第一次执行回调，prev是1，cur是2。第二次prev是3（1加2的结果），cur是3（数组第三项）...直到将数组中项都访问一遍
sum // 15
```

#### **Date类型**

##### .**基本概念**

`ECMAScript`中的`Date`类型是在早期`Java`中的`java.util.Date`类的基础上构建的。为此，`Date`类型使用自`UTC（Coordinated Universal Time，国际协调时间）`1970年1月1日午夜（零时）开始经过的毫秒数来保存日期。使用这种数据存储格式的条件下，`Date`类型保存的日期能够精确到1970年1月1日之前或之后的285 616年。

```js
var now = new Date()
```

不传参数会自动获取当前日期和时间。如果想根据特定的日期和时间创建日期对象，必须传入毫秒数，为了更加简单的获取毫秒数，`ECMAScript`提供了`Date.parse()、Date.UTC()`方法。但浏览器根据地区不同，实现的有很大差异

- `Date.parse()`接收一个表示日期的字符串，然后尝试根据字符串返回日期的毫秒数
- `Date.UTC()`同样返回毫秒数，但参数使用的分别为年份、基于0的月份(一月是0)、天、小时、分钟、秒以及毫秒。年和月必须，省略天则默认为1，其他省略则默认为0

```js
Date.parse(2019)               // 1546300800000
Date.parse('2019 1')           // 1546272000000
new Date(Date.parse(2019))     // Tue Jan 01 2019 08:00:00 GMT+0800 (中国标准时间)
new Date(Date.parse('2019 1')) // Tue Jan 01 2019 00:00:00 GMT+0800 (中国标准时间)

Date.UTC(2019, 0)           // 1546300800000 同 Date.parse(2019)
Date.UTC(2019)              // 1546300800000，其实月省略后也可以
Date.UTC(2019, 1)           // 1548979200000
new Date(Date.UTC(2019, 1)) //Fri Feb 01 2019 08:00:00 GMT+0800 (中国标准时间)
```

其实上面是通过`Date.parse()`获取时间戳，其实如果直接传入日期的字符串(如：`new Date('May 12, 2019')`)，后台调用的也是`Date.parse()`

##### .**Date.now**

`ECMAScript 5`添加了`Date.now()`方法，返回此时的日期和时间的毫秒数。该方法简化了`Date`对象分析代码的工作，在不支持它的浏览器，可以使用`+`操作符把`Date`对象转为字符串已达到同样目的。

```js
function getDate(){
  console.log(Date.now());   // 1557651029232
  console.log(+ new Date()); // 1557651029232
}
```

##### .**继承的方法**

与其他引用类型一样，`Date`类型也重写了`toLocaleString()、toString()、valueOf()`方法，因此返回值与其他类型的也不同。

- `toLocaleString()`会按照与浏览器设置的地区相适应的格式返回日期和时间
- `toString()`方法通常会返回带有时区信息的日期和时间
- `valueOf()`方法则根本不返回字符串，而是返回日期的毫秒数

还有一些日期/时间组件的方法，参考：[日期/时间组件方法][date&timeFunUrlMdn]



#### **基本包装类型**

##### .**基本概念**

为了便于操作基本类型值，`ECMAScript`还提供了3个特殊的引用类型：`Boolean、Number、String`。和其他引用类型相似但又不同。实际上，**每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能够调用一些方法来操作这些数据**。

```js
var s1 = 'some text';
var s2 = s1.substring(2); // "me text"
```

如上变量`s1`包含一个字符串，当然就是**基本类型值**，而下一行就调用了`substring()`方法。。。我们知道**基本类型值不是对象**，因而从**逻辑上讲他们不应该有方法**。

其实为了实现这种直观的操作，后台自动完成了一些列的处理。当第二行访问`s1`时，访问过程处于一种读取模式，也就是要从内存中读取这个字符串的值，而在读取模式中访问字符串时，后台会自动完成下面操作：

1. 创建`String`类型的一个实例(`var s1 = new String('some text')`)
2. 在实例上调用指定的方法(`var s2 = s1.substring(2)`)
3. 销毁这个实例(`s1 = null`)

经过上面的处理，基本的字符串就变得跟对象一样了，而且上面的过程也分别适用于`Boolean、Number`类型对应的布尔值和数字值。

**引用类型与基本包装类型**的主要区别就是**对象的内存期**。使用`new`操作符**创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中**。而**自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁**。意味着，我们不能在运行时会基本类型添加属性或方法，如下：

```js
var s1 = 'some text';
s1.color = 'red';
s1.color              // undefined
```

原因就是第二行创建的`String`对象在执行第三行代码时已经被销毁了。第三行代码又创建自己的`String`对象，而该对象没有`color`属性。

当然可以显式调用`String、Boolean、Number`来创建基本包装类型的对象，但最好不要这样做，因为很容易让人分不清自己处理的是基本类型还是引用类型的值。对**基本包装类型的实例（用new构造）调用`typeof`会返回`'object'`**，而且所有基本包装类型的对象都会被转换为布尔值`true`(因为是对象了)

`Object`构造函数也像工厂方法一样，根据传入值的类型返回相应基本包装类型的实例。

```js
var str = new Object('test string');
str instanceof String;             // true

var num = new Object(666);
num instanceof Number;             // true

var booleanVal = new Object(true);
booleanVal instanceof Boolean;     // true
```

**注意：使用`new`调用基本包装类型的构造函数，与直接调用同名的转型函数时不一样的**。例如：

```js
var val1 = Number('25'); // 转型函数
typeof val1;             // 'number'

var val2 = new Number('25'); // 构造函数
typeof val2;                 // 'object'
```

##### .**Boolean类型**

`Boolean`类型是引用类型，与基本类型布尔值不同。要创建`Boolean`对象，可以直接`new Boolean()`，可以传入`true、false`参数。`Boolean`的实例重写了`valueOf()`方法，返回**基本类型**`true、false`。也重写了`toString()`方法，返回字符串`'true'、'false'`。

```js
var falseObj = new Boolean(false);
falseObj.valueOf()     // false
falseObj.toString()    // 'false'
falseObj && 'look me'  // 'look me'，切忌用基本包装对象的实例用在布尔表达式中
```

##### .**Number类型**

与`Boolean`类型一样，`Number`类型也重写了`valueOf()、toLocaleString()、toString()`方法，重写后`valueOf()`返回基本类型值，而后两者返回字符串。

除了继承的方法之外，`Number`类型还提供了一些用于**数值格式化为字符串的方法**，如下：

```js
// toFixed(n)方法会按照指定的小数位返回数值的字符串表示。
// n取值0~20（可能有浏览器差异）
var num = 10;
num.toFixed(2); // '10.00'

// 如果数值本身的小数位大于指定的数目，那么接近指定的最大小数位的值就会舍入
// 可能有浏览器差异
var num1 = 10.0005;
num1.toFixed(2);     // '10.00'
var num2 = 10.005;
num2.toFixed(2);     // '10.01'

// toExponential()方法会返回e表示法表示的数值的字符串形式。
var num3 = 102000;
num3.toExponential();  // "1.02e+5"

// 但是还有一个方法可以自动分析采用toFixed()还是toExponential()
// 也就是方法会根据传入的参数分析数值，选择更适合展示数值的方式
// toPrecision()可以表现1~21位小数(可能有浏览器差异)
var num4 = 99;
num4.toPrecision(1); // '1e+2'
num4.toPrecision(2); // '99'
num4.toPrecision(3); // '99.0'
```

##### .**String类型**

`String`对象的方法可以在所有基本的字符串值中访问到，继承的`valueOf()、toLocaleString()、toString()`方法都返回对象所表示的基本字符串值。且每个实例都有`length`属性，`String`类型还提供了很多方法，用于完成对字符串的解析和操作。

`1. 字符方法`  
两个用于访问字符串特定字符的方法：`charAt()、charCodeAt()`,参数都是一个基于0的字符位置。前者返回对应位置的字符，而后者返回字符的编码。

```js
var str = 'hello world';
str.charAt(1);           // 'e'
str[1];                  // 'e'
str.charCodeAt(1);       // 101
```

`2. 字符串操作方法`  

```js
// concat()返回拼接后的新字符串，不影响原有字符串
var str1 = 'hello';
str1.concat(' world'); // 'hello world'
str1; // 'hello'
```

`slice()、substring()、substr()`三个方法都是基于子字符串创建新字符串的方法，返回新的子字符串，都接受1或2个参数，参数一指定子字符串的开始位置，参数二表示子字符串到哪里结束（不包含）。**不同的是`substr()`的参数二指定的是返回的字符个数，而不是位置**。。。

```js
var str2 = 'hello world';
str2.slice(3);            // 'lo world'
str2.substring(3);        // 'lo world'
str2.substr(3);           // 'lo world'

str2.slice(3, 7);         // 'lo w' ，从3开始，不包含索引为7的字符
str2.substring(3, 7);     // 'lo w' ，同上
str2.slice(3, 7);         // 'lo worl'，从3开始，共7个字符
```

当`slice()、substring()、substr()`参数里有负数时，行为就不尽相同了，其实`slice()`方法会将传入的负数与字符串的长度相加。`substr()`方法将的负的第一参数加上字符串的长度，而将负的第二个参数转换为0。`substring()`则将所有负数都转换为0。

```js
var str3 = 'hello';
str3.slice(-2);           // 'lo'
str3.substr(-2);          // 'lo'
str3.substring(-2);       // 'hello'

str3.slice(-2, -1);       // 'l', 等价于slice(3, 4)
str3.substr(-2, -1);      // '', 等价于substr(3, 0)
str3.substring(-2, -1);   // '', 等价于slice(0, 0)
```

`3. 字符串位置方法`  
有两个从字符串中查找子字符串的方法：`indexOf()、lastIndexOf()`，都是从一个字符串搜索给定的子字符串，然后返回子字符串的位置，没有找到则返回-1，前者是从字符串的开头向后搜索子字符串，而后者反之。都可选第二个参数，表示索引开始的位置。

```js
var str4 = 'hello world';
str4.indexOf('o');        // 4
str4.lastIndexOf('o');    // 7

str4.indexOf('o', 5);      // 7
str4.lastIndexOf('o', 8);  // 7
str4.lastIndexOf('o', 1);  // -1，索引的位置都是从前向后数的，即使从最后开始遍历
```

利用上面的特性，则可以循环获取所有匹配的项

```js
var stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
var positions = [];
var pos = stringValue.indexOf("e");

while(pos > -1){
  positions.push(pos);
  pos = stringValue.indexOf("e", pos + 1);
}

console.log(positions);    // [3, 24, 32, 35, 52]
```

`4. trim()方法`  
`ECMAScipt 5`为所有字符串定义了`trim()`方法，该方法会创建一个字符串的副本，并删除前置和后置的所有空格，然后返回结果。

`5. 字符串大小写转换方法`  
`ECMAScipt`中涉及字符串大小写转换的方法有四个：`toLowerCase()、toLocaleLowerCase()、toUpperCase()、toLocaleUpperCase()`，其中`toLowerCase()、toUpperCase()`是两个经典的方法，借鉴自`java.lang.String`中的同名方法。**而其他两个则是针对特定地区的实现。对有些地方，针对地区的方法和通用方法得到的结果相同，但少数语言(如土耳其语)会为`Unicode`大小转换应用特殊的规则，这时候就必须使用针对特定地区的方法来保证实现正确的转换。**

**注意：**一般来说，在不知道自己的代码将在那种语言环境中运行的情况下，还是使用针对地区的方法更加稳妥一些。

`6. 字符串的模式匹配方法`  
`String`类型定义了几个用于在字符串中匹配模式的方法。第一个方法就是`match()`，在字符串上调用这个方法，本质上与调用`RegExp`的`exec()`方法相同。`match()`只接受一个参数，要么是一个正则表达式，要么是一个`RegExp`对象。

```js
var text = "cat, bat, sat, fat";
var pattern = /.at/;

var matches = text.match(pattern);// ["cat", index: 0, input: "cat, bat, sat, fat", groups: undefined]
matches.index;                   // 0
matches[0];                      // "cat"
pattern.lastIndex;               // 0，可以给正则表达式对象设置lastIndex，但对match方法无效，匹配总是从字符串的第一个字符开始
```

`match()`返回一个数组，第一项是与整个模式匹配的字符串，之后的每一项(如果有)保存着匹配的字符串相关的数据。`index`表示匹配到的字符串索引(`.`匹配所有字符)，`input`则是目标字符串，`groups`是？

```js
var text = "cat, bat, sat, fat";
var pattern = /.at/g;             // g开启全局搜索模式，匹配到所有匹配的项
pattern.lastIndex = 2;

var matches = text.match(pattern);// ["cat", "bat", "sat", "fat"]，全局模式不含index，input等信息
matches.index;                    // undefined
pattern.lastIndex;                // 0，上面设置无效
```

另一个用于查找的方法是`search()`，参数为字符串或正则表达式，返回第一个匹配的索引，否则返回-1，始终从字符串开头查找。

为了简化替换子字符串的操作，`ECMAScript`提供了`replalce()`方法，两个参数：参数一是字符串或正则表达式，参数二可以是字符串或者一个函数。如果第一个参数是字符串，则只会替换第一个子字符串，要想替换所有的，则需要用正则，而且需要加上全局`g`标识。

```js
var text = "cat, bat, sat, fat";
var result = text.replace("at", "ond");
alert(result);                          //"cond, bat, sat, fat"

result = text.replace(/at/g, "ond");
alert(result);                          //"cond, bond, sond, fond"
```

**如果第二个参数是字符串**，那么还可以使用一些特殊的字符序列，将正则表达式得到的值插入到结果字符串中。如下表：

变量名      | 代表的值                        |
:--------- | :-----------                   |
$$         | 插入一个'$'                     |
$&         | 插入匹配的子串                   |
$`         | 插入当前匹配的子串左边的内容        |
$'         | 插入当前匹配的子串右边的内容        |
$n         | 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始        |

```js
var text = "cat, bat, sat, fat";
text.replace(/(.at)/g, "word ($1)");
// "word (cat), word (bat), word (sat), word (fat)"

text.replace(/(.at)/, 'hello $&');
// "hello cat, bat, sat, fat"

text.replace(/(.at)/g, 'hello $&');
// "hello cat, hello bat, hello sat, hello fat"

text.replace(/(.at)/, 'hello $`')
// "hello , bat, sat, fat"

text.replace(/(.at)/g, 'hello $`')
// "hello , hello cat, , hello cat, bat, , hello cat, bat, sat, "

text.replace(/(.at)/, 'hello $\'') // 需转义，或双引号包裹
// "hello , bat, sat, fat, bat, sat, fat"
```

`replace()`方法的第二个参数也可以是一个函数，在只有一个匹配项时，会向这个函数传递3个参数：模式的匹配项、模式匹配项的索引和原始字符串。

如果参数一定义了多个捕获组的情况下，传递给函数的参数依次为：模式的匹配项，第一个捕获组的匹配项、第二个捕获组的匹配项......，但最后两个参数仍然分别是模式的匹配项在字符串中的位置和原始字符串。

变量名      | 代表的值                        |
:--------- | :-----------                   |
match      | 匹配的子串。（对应于上述的$&。）                    |
p1,p2, ... | 假如replace()方法的第一个参数是一个RegExp 对象，则代表第n个括号匹配的字符串。（对应于上述的$1，$2等。）例如，如果是用 /(\a+)(\b+)/ 这个来匹配，p1 就是匹配的 \a+，p2 就是匹配的 \b+。                   |
offset         | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 'abcd'，匹配到的子字符串是 'bc'，那么这个参数将会是 1）        |
string         | 被匹配的原字符串。        |


```js
function replacer(match, p1, p2, p3, offset, string) {
  return [p1, p2, p3].join(' - ');
}
// [^\d]中括号里的^表示除了，这里匹配除了数字项，因此匹配到'abc'
// ()表示分组，每一组作为一个整体进行匹配，(\d*)匹配到'12345'
// 同理([^\w]*)匹配特殊字符，这里匹配到'#$*%'
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%
```

下面是一个转义`HTML`代码的函数：

```js
var text = "cat, bat, sat, fat";

function htmlEscape(text){
  return text.replace(/[<>"&]/g, function(match, pos, originalText){
    switch(match){
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "\"":
        return "&quot;";
    }
  });
}

htmlEscape("<p class=\"greeting\">Hello world!</p>");
//&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;
```

最后一个与模式匹配有关的方法是`split()`方法，该方法可以基于指定的分隔符将一个字符串分割成多个字符串，并将结果放到一个数组里。分隔符还可以是正则，还可以接受第二个参数，用于指定数组的大小。

```js
var colorText = "red,blue,green,yellow";

var colors1 = colorText.split(",");
//["red", "blue", "green", "yellow"]

var colors2 = colorText.split(",", 2);  // 指定数组长度
//["red", "blue"]

colorText.replace(/[^\,]+/g, '$');       // [$,$,$,$]
var colors3 = colorText.split(/[^\,]+/);
//["", ",", ",", ",", ""]
```

**注意：**最后一次调用`split()`返回的数组中，第一项和最后一项是两个空字符串，因为**通过正则表达式指定的分隔符出现在了字符串的开头和末尾**。

`7. fromCharCode()方法`  
`String`构造函数本身有一个静态方法：`fromCharCode()`，接收一个或多个字符编码，然后将他们转换为字符串，其实就是`charCodeAt()`的逆操作。。。

```js
String.fromCharCode(104, 101, 108, 108, 111)
// "hello"
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
[date&timeFunUrlMdn]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date '获取时间的一些方法'
[jsSecretGardenUrl]: https://bonsaiden.github.io/JavaScript-Garden/zh/ 'js秘密花园'