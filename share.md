
## Object 对象

几种常见创建对象方式：

```js
// 方式一：构造函数
let person = new Object({})

// 方式二：对象字面量：
// 1、一目了然
// 2、代码量更少
// 3、封装
let person = {
  "name": "Nicholas",
  "age": 29,
  5: true, // 最后一个属性后面加上逗号在非常老的浏览器中会导致报错，但所有现代浏览器都支持这种写法。
};
```

两种获取属性的方式：
- 点语法
- 中括号

```js
// 点语法
console.log(persion.name); // Nicholas

// 中括号：支持变量、非法字符串等
person['first name'] = 'first'
// { '5': true, name: 'Nicholas', age: 29, 'first name': 'first' }
```

## Array 数组

数组是基于对象的，不构成单独的语言类型。所以 typeof 不能从数组中区分出普通对象：

```js
alert(typeof {}); // object
alert(typeof []); // object
```

另外，对象允许存储键值集合。但很多时候我们发现还需要 **有序集合**，里面的元素都是按顺序排列的。

### 创建数组

#### 构造函数方式
```js
let colors = new Array(3);     // 创建一个包含 3 个元素的数组
let names = new Array("Greg"); // 创建一个只包含一个元素，即字符串"Greg"的数组
let nulls = new Array(null);   // [null]
```

创建数组时，传入一个参数时：
- 如果是数字，则是长度，**length 属性就会被自动创建并设置为这个值**
- 如果非数字，则是元素

注意：
- 还可以省略`new`运算符，但使用`new`运算符，可以在函数内部获取更多信息，比如：new.target
- 如果没有参数，还可以省略括号

#### 字面量方式

```js
// 末尾添加逗号，使得插入/移除项变得更加简单。
let values = [1,2,]; // 注意，最后有个逗号，创建一个包含 2 个元素的数组
```

与对象一样，**在使用数组字面量表示法创建数组不会调用Array构造函数**

### 内部

数组是一种特殊的对象。使用方括号来访问属性 arr[0] 实际上是来自于对象的语法。它扩展了对象，提供了**特殊的方法来处理有序的数据集合以及 length 属性**。但从本质上讲，它仍然是一个对象。

但是数组真正特殊的是它们的内部实现。**JavaScript 引擎尝试把这些元素一个接一个地存储在连续的内存区域，而且还有一些其它的优化，以使数组运行得非常快**。

但是，如果我们不像“有序集合”那样使用数组，而是像常规对象那样使用数组，这些就都不生效了。

```js
let fruits = [];   // 创建一个数组

fruits[99999] = 5; // 分配索引远大于数组长度的属性

fruits.length;    // 100000

fruits.age = 25;  // 创建一个具有任意名称的属性
```

### ES6 新增的用于创建数组的静态方法

- Array.from(arrayLike[, mapFn[, thisArg]]) 将一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
- Array.of() 创建一个具有可变数量参数的新数组实例

Array.from(arrayLike[, mapFn[, thisArg]]) 的用法：

```js
// 1、字符串会被拆分为单字符数组
console.log(Array.from("Matt")); // ["M", "a", "t", "t"]

// 2、Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1); // [1, 2, 3, 4]

// 3、可以使用任何可迭代对象 
const iter = {
  // ES6引入了一批常用内置符号(well-known symbol)，用于暴露语言内部的行为，
  // 开发者 可以直接访问、重写或模拟这些行为。这些内置符号都以 Symbol 工厂函数字符串属性的形式存在。
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  }
};
console.log(Array.from(iter)); // [1, 2, 3, 4]

// 4、像数组结构 -》鸭子模型
const arrayLike = {
  1: 1,
  length: 2
}
console.log(Array.from(arrayLike)); // [undefined, 1]
```

Array.from() 的参数2，可以实现map的功能，不像 Array.from().map()那样先创建一个中间数组，如下：

```js
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, x => x**2); // [1, 4, 9, 16]
```

Array.from() 的参数3，可以指定this，如下：

```js
const a1 = [1, 2, 3, 4];
const a3 = Array.from(a1, function(x) {return x**this.exponent}, {exponent: 2}); 
console.log(a3); // [1, 4, 9, 16]
// 注意：不支持箭头函数
```

Array.of() 的用法：

```js
console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
console.log(Array.of(undefined));  // [undefined]

// 对比Array()，
Array(2);    // [, ,]
Array.of(2); // [2]
```

这个方法主要用于替代 ES6 之前常用的 `Array.prototype.slice.call(arguments)`

### 数组空位

使用数组字面量初始化数组时，若逗号前没有值，则置为空位。 ES6新规范会将其处理成 undefined

```js
const options = [1,,,,5];
for (const option of options) {
  console.log(option === undefined);
}
// false
// 3 true
// false
```

注意：但是数组空位，有时候会造成一些隐形的问题，所以最好不要用，可以显式的设置 `undefined`

```js
const options = [1,,,,5];

// map 会跳过 空位
console.log(options.map(() => 6)); // [6, , , , 6]

// join()视空位置为空字符串
console.log(options.join('-')); // 1----5

// 显式设置
const options = [1, undefined, undefined, undefined, 5];
console.log(options.map(() => 6)); // [6, 6, 6, 6, 6]
```

**由于行为不一致和存在性能隐患，因此实践中要避免使用数组空位**。如果确实需要空位，则可以显式地用 undefined 值代替。

### 数组索引

数组中元素的数量保存在 length 属性中，这个属性始终返回 0 或大于 0 的值

数组 length 属性的独特之处在于，**它不是只读的。通过修改 length 属性，可以从数组末尾删除或添加元素**

```js
let colors = ["red", "blue", "green", "pink"]; // 创建一个包含 4 个字符串的数组 
colors.length = 2; // 截断
alert(colors[2]); // undefined

// 如果将 length 设置为大于数组元素数的值，则新添加的元素都将以 空位 填充
colors.length = 4
console.log(colors); //['red', 'blue', 空属性 × 2]
```

数组最多可以包含 4 294 967 295（2**32 - 1） 个元素，超过会报错：`Invalid array length`

准确来说，length 它实际上不是数组里元素的个数，而是最大的数字索引值加一。

~~另外，清空数组的方式，还可以是 `arr.length = 0`~~ 

### 检测数组

常用 `instanceof` 判定是否为数组

但这个的前提是，只有一个全局执行上下文。。。如果网页里有多个框架，则可能涉及两个不同的全局执行上下文，因此就会有两个不同版本的 Array 构造函数。

为解决这个问题，ECMAScript 提供了 `Array.isArray()` 方法

### 迭代器方法

在 ES6 中，**Array 的原型上**暴露了 3 个用于检索数组内容的方法

- keys()
- values()
- entries()

```js
const a = ["foo", "bar", "baz", "qux"];

// 因为这些方法都返回迭代器，所以可以将它们的内容 
// 通过Array.from()直接转换为数组实例
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values()); 
const aEntries = Array.from(a.entries());

console.log(aKeys); // [0, 1, 2, 3]
console.log(aValues); // ["foo", "bar", "baz", "qux"] 
console.log(aEntries); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]
```

### 转换方法

所有对象都有 toLocaleString()、toString()和 valueOf()方法

valueOf() 返回的还是数组本身。而 toString()返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的字符串。如下：

```js
// 创建一个包含 3 个字符串的数组
let colors = ["red", "blue", "green"];

alert(colors.toString()); // red,blue,green
alert(colors.valueOf());  // red,blue,green
alert(colors);            // red,blue,green 
```

因为 alert() 返回字符串，所以**会在底层调用数组的 toString()方法**，从而得到跟前面一样的结果。

注意：**toLocaleString()方法也可能返回跟 toString()和 valueOf()相同的结果，但也不一定**

```js
let person1 = {
  toLocaleString() {
    return "toLocaleString";
  },
  toString() {
    return "Nicholas";
  }
};
const people = [person1]

alert(people); // Nicholas
alert(people.toLocaleString()) // toLocaleString
```

注意：如果数组中某一项是null或undefined，则在join()、toLocaleString()、 toString()返回的结果中会以空字符串表示。

```js
[null, 1, undefined].join();     // ',1,'
[null, 1, undefined].toString(); // ',1,'
[null, 1, undefined].toLocaleString(); // ',1,'
```

### 栈方法&队列方法

- push()方法接收**任意数量**的参数，并将它们添加到数组末尾，**返回数组的最新长度**。
- pop()方法则 用于删除数组的最后一项，同时减少数组的 length 值，返回被删除的项。

push/pop 方法运行的比较快，而 shift/unshift 比较慢。

```js
fruits.shift(); // 从首端取出一个元素
```

为什么作用于数组的末端会比首端快呢？

**只获取并移除数字 0 对应的元素是不够的。其它元素也需要被重新编号。**

shift() 操作必须做三件事:

1. 移除索引为 0 的元素。
2. 把所有的元素向左移动，把索引 1 改成 0，2 改成 1 以此类推，对其重新编号。
3. 更新 length 属性。

因此数组里元素越多，耗费时间越多，意味着越多的内存操作。

相反，push/pop 方法运行的比较快，就非常快

```js
let arr = Array.from({ length: 2**16 }, () => 2**16)
// let arr = Array.apply(null, { length: 2**16 }).map(() => 2**16)

let startTime = performance.now()
for (let i = 0 ; i < 2**16; i++) {
  arr.shift();  // 2755.3000000715256 ms
  // arr.pop(); // 2.399999976158142 ms
}
let endTime = performance.now()

console.log('dur1', endTime - startTime)
```

### 循环

1、遍历数组最古老的方式就是 for 循环

```js
let arr = ["Apple", "Orange", "Pear"];

// 引擎对 arr.length 做了特殊处理，可以不用单独赋值
for (let i = 0; i < arr.length; i++) {
  alert( arr[i] );
}
```

2、for...of 循环

ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为**遍历所有数据结构的统一的方法**。

一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。

这些数据结构包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、Generator 对象，以及字符串等

```js
const arr = ['red', 'green', 'blue'];

for(let v of arr) {
  console.log(v); // red green blue
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for(let v of obj) {
  console.log(v); // red green blue
}
```

for..of 不能获取当前元素的索引，只是获取元素值

3、for..in 

**技术上来讲，因为数组也是对象**，所以使用 for..in 也是可以的：

```js
let arr = ["Apple", "Orange", "Pear"];

for (let key in arr) {
  alert( arr[key] ); // Apple, Orange, Pear
}
```

但是：**会有一些潜在问题存在**
- for..in 循环会遍历 所有属性，不仅仅是这些数字属性。
- for..in 循环适用于普通对象，并且做了对应的优化。但是不适用于数组，因此速度要慢 10-100 倍，只有在遇到瓶颈时可能会有问题。但是我们仍然应该了解这其中的不同。

```js
let arr = ["Apple", "Orange", "Pear"];

arr.name = 'haha'

for (let key in arr) {
  alert( key ); // 0, 1, 2, name
}

// 测试速度 -> 平时使用的场合，几乎区分不出来
let arr = Array.from({ length: 2**14 }, () => 2**16)
arr.name = 'arr'
const len = arr.length;
let startTime = performance.now()
// for循环
for (let i = 0 ; i < len; i++) {
  console.log('times')
}

// for...of
// for (let item of arr) {
//   console.log('times')
// }

// for...in
// for (let key in arr) {
//   console.log('times')
// }

let endTime = performance.now()
console.log('dur1', endTime - startTime)
```

### 排序方法

- reverse() 是 原位（in-place）排序
- sort() 是 原位（in-place）排序

reverse 不够灵活，所以才有了 sort

默认情况下，sort()会按**照升序重新排列数组元素**，即最小的值在前面，最大的值在后面。为此，sort()会在每一项上调用 String()转型函数，然后**比较字符串**来决定顺序。即使**数组的元素都是数值，也会先把数组转换为字符串再比较、排序**。

```js
let values = [0, 1, 5, 10, 15];
values.sort();                   // 0,1,10,15,5
alert(values);                   // 0,1,10,15,5

// 默认只会比较开头的第一个字符串，获取unicode编码
"10".charCodeAt(0);             // 49
"5".charCodeAt(0);              // 53
"a".charCodeAt();               // 97
"A".charCodeAt();               // 65
String.fromCharCode(65);        // A

// 注意：在js内部，字符以UTF-16格式存储，也就是2字节。
// 但对于那些需要4字节存储的字符，上述方法无法识别，
let s = '𠮷a'; 

// 被处理错误
s.length;         // 3 错误
s.charAt(0)       // '' ，读不出来
s.charAt(1)       // '' ，读不出来
s.charCodeAt(0)   // 55362，前两个字节
s.charCodeAt(1)   // 57271，后两个字节

// 被正确处理，'𠮷a'视为三个字符，“𠮷”的十进制码点134071，后两个字节，最后是a
s.codePointAt(0) // 134071，被截取且完整的读出来了
s.codePointAt(1) // 57271，后两个字节
s.codePointAt(2) // 97

// 如何处理长度呢？
// ES6提供了codePointAt方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
// 占2个字节的字符最大的码点为0xFFFF(十进制为65536）。超过65536（0xFFFF）的字符占4个字节。
// 一个字节是8位，也就是 2^8 = 256，小于256都是一个字节，大于256 小于 256 * 2^8 = 65536 就是两字节 
// 可以借助for...of，其可以利用codePointAt处理4字节字符
let len = 0;
for (let char of s) {
  if (char.codePointAt(0) > 0xFFFF) {
    len += 4;
  } else if (char.codePointAt(0) > 0x00FF) {
    len += 2;
  } else {
    len += 1;
  }
}
console.log(len); // 5

// 或者
var textEncoder = new TextEncoder('utf-8')
textEncoder.encode('𠮷a').length; // 5
```

为了解决上面的问题，sort()方法可以接收一个比较函数，用于判断哪个值应该排在前面。

- 比较函数接收两个参数，
- 如果第一个参数应该排在第二个参数前面，就返回负值;
- 如果两个参数相等，就返回0;
- 如果第一个参数应该排在第二个参数后面，就返回正值。
  
```js
function compare(value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}
let values = [0, 10, 5, 1, 15];
values.sort(compare); // [0, 1, 5, 10, 15]
```

**如果数组的元素是数值，或者是其 valueOf() 方法返回数值的对象(如 Date 对象)**，还可以如下：

```js
const compare = (a, b) => a - b

// "a" < "b"; // true
// "a" - "b"; // NaN
// new Date().valueOf(); // 1638098527738
```

其实对于字符串比较，还涉及到不同国家之间语言之间的比较，如下：

```js
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich（错的）

// 调用 str.localeCompare(str2) 会根据语言规则返回一个整数，这个整数能指示字符串 str 在排序顺序中排在字符串 str2 前面、后面、还是相同：
alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam（对的！）
```

arr.sort(fn) 方法实现了通用的排序算法。我们不需要关心它的内部工作原理（大多数情况下都是经过 快速排序 或 Timsort 算法优化的）。

### 操作方法

- concat()方法可以在现有数组全部元素基础上创建一个新数组
- slice([start], [end])用于创建一个包含原有数组中一个或多个元素的新数组。
- splice(start[, deleteCount, elem1, ..., elemN])最强大的数组方法，主要目的是在数组中间插入元素

```js
let colors = ["red", "green", "blue"];
let colors2 = colors.concat("yellow", ["black", "brown"]);

console.log(colors); // ["red", "green","blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]

let arr = [1, 2];
let arrayLike = {
  0: "something",
  length: 1
};
// 通常，它只复制数组中的元素。即使像数组
alert( arr.concat(arrayLike) ); // 1,2,[object Object]

// 但是：如果类似数组的对象具有 Symbol.isConcatSpreadable 属性，
// 那么它就会被 concat 当作一个数组来处理：
let colors = ["blue"];
let newColors = ["black", "brown"];
newColors[Symbol.isConcatSpreadable] = false; // 强制不打平

let colors2 = colors.concat("yellow", newColors); // ["blue", "yellow", ["black", "brown"]]

let moreNewColors = {
  [Symbol.isConcatSpreadable]: true, // 默认打平
  length: 2,
  0: "pink",
  1: "cyan"
};
let colors3 = colors.concat(moreNewColors); // ["blue", "pink", "cyan"]
```

### 搜索和位置方法

#### 严格相等类：

`arr.indexOf、arr.lastIndexOf 和 arr.includes` 方法与**字符串操作具有相同的语法**

- arr.indexOf(item, from) 从索引 from 开始搜索 item，如果找到则返回索引，否则返回 -1。
- arr.lastIndexOf(item, from) —— 和上面相同，只是从右向左搜索。
- arr.includes(item, from) —— ES7提供，从索引 from 开始搜索 item，如果找到则返回 true（译注：如果没找到，则返回 false）。

底层都使用严格匹配(===)

注意：**如果我们想检查是否包含某个元素，并且不想知道确切的索引，那么 arr.includes 是首选。**因为includes还可以处理如下情况：

```js
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1（应该为 0，但是严格相等 === equality 对 NaN 无效）
alert( arr.includes(NaN) ); // true（这个结果是对的）
```

#### 断言函数

断言函数接收 3 个参数:元素、索引和数组本身。

- find()
- findIndex()

这两个方法也都接收第二个可选的参数， 用于指定断言函数内部 this 的值。这两个方法都不再继续搜索。

### 迭代方法

ECMAScript 为数组定义了 5 个迭代方法。

每个方法接收两个参数:以每一项为参数运行的函数，以及可选的作为函数运行上下文的作用域对象(影响函数中 this 的值)。

传给每个方法的函数接收 3 个参数:数组元素、元素索引和数组本身。

- every():对数组每一项都运行传入的函数，如果对每一项函数都返回 true，则这个方法返回 true。 
- filter():对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回。
- forEach():对数组每一项都运行传入的函数，没有返回值，有也会被忽略。
- map():对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。
- some():对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true。

注意：这些方法都不改变调用它们的数组。

### 归并方法

当我们需要遍历一个数组时 —— 我们可以使用 forEach，for 或 for..of。

当我们需要遍历并返回每个元素的数据时 —— 我们可以使用 map。

ECMAScript 为数组提供了两个归并方法:reduce()和 reduceRight()。

这两个方法都会迭代数组的所有项，并在此基础上构建一个最终返回值。

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

reduce()方法从数组第一项开始遍历到最后一项。 而 reduceRight()从最后一项开始遍历至第一项。

这两个方法都接收两个参数:
- 对每一项都会运行的归并函数，
- 可选的以之为归并起点的初始值。 

传给 reduce()和 reduceRight()的函数接收 4 个参数:
- accumulator —— 是上一个函数调用的结果，第一次等于 initial（如果提供了 initial 的话）。
- item —— 当前的数组元素。
- index —— 当前索引。
- arr —— 数组本身。

```js
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

// 如果没有初始值，那么 reduce 会将数组的第一个元素作为初始值，并从第二个元素开始迭代。
// let result = arr.reduce((sum, current) => sum + current);

alert(result); // 15
```

但是注意，如果数组为空，且没有传递初始值，会报错
```js
let arr = [];

// Error: Reduce of empty array with no initial value
arr.reduce((sum, current) => sum + current);
```

一个典型的应用场景，从嵌套对象里获取值：

```js
const obj = {
  a: {
    b: {
      c: 'hello c'
    }
  }
}

'a.b.c'.split('.').reduce((pre, cur) => pre?.[cur], obj); // 'hello c'
```

### 其他的一些方法

ES6 新增了两个方法：批量复制方法 copyWithin()，以及填充数组方法 fill()

- copyWithin()
- fill()

[更多关于数组的方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

