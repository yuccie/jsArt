---
layout: post
title: 基础知识
---

## TypeScript

### 基础类型

```js
// 1、布尔
let isDone: boolean = false;

// 2、数组
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3]; // 泛型

// 3、元组，已知元素数量和类型的数组
let x: [string, number]
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
// 当访问一个越界的元素，会使用联合类型替代
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
x[6] = true; // Error, 布尔不是(string | number)类型

// 4、枚举，默认从0开始为元素编号
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
console.log(c); // 1

enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
console.log(c); // 2

// 根据编号反推枚举的name
enum Color { Red = 1, Green, Blue }
let colorName: string = Color[1];
console.log(colorName); // red

// 5、any，不让检查器检查它
let notSure: any = 4;
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

// Object有相似作用，但Object类型的变量只允许给它赋任意值，但却不能在上面调用方法
let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

// 6、空值，void与any任意值正好相反，表示没有任何类型，其实也就是没有值
// 可以赋值undfined null
let unusable: void = undefined;

// 7、null undefined
// null undefined是所有类型的子类型，也就是可以赋值给任何类型、同时可以赋值给他们本身
let testType: string = null;

// 如果开启--strictNullChecks标记，则null和undefined只能赋值给void和它们各自

// 8、never，用不存在的值，比如抛出异常或死循环都会导致没有结果返回
// 只有本身可以赋值给never，any也不可以赋值给never。
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

// 9、类型断言，你确切的知道这是什么类型，不需要编译器再做处理。
// 方式一：尖括号
let someVal: any = "test string";
let len: number = (\<string>someVal).length // 这里 \ 只是转义用

// 方式二：as语法
let someVal: any = "test string";
let len: number = (someVal as string).length
// 当在TypeScript里使用JSX时，只有as语法断言是被允许的。

// 10、类型别名，为类型注解设置别名
type StrOrNum = string | number;

// 使用
let sample: StrOrNum;
sample = 123;
sample = '123';
// 可以为任意的类型注解提供类型别名
type Text = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;

// 11、联合类型，多种类型之一，使用 | 作为标记
function formatCommandline(command: string[] | string) {
  let line = '';
  if (typeof command === 'string') {
    line = command.trim();
  } else {
    line = command.join(' ').trim();
  }

  // Do stuff with line: string
}

// 12、unknown类型
// 就像所有类型都可以赋值给 any，所有类型也都可以赋值给 unknown。
// 但是，作为unknown类型的值，只能赋值给any和unknown
let value: unknown;

value = true; // OK
value = 42; // OK

// 
let value: unknown;
let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
```

### 解构、展开

```js
// 重命名
let { a: newName1, b: newName2 } = o;

// 指定类型
let {a, b}: {a: string, b: number} = o;

// 默认值，在属性为undefined时使用缺省值
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject;
}

// 对象展开，注意以下问题：，展开
// 1、后面会覆盖前面的
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { food: "rich", ...defaults };
console.log(search); // { food: "spicy", price: "$$", ambiance: "noisy" }
// 2、仅展开自身可枚举属性，在展开一个对象实例时，你会丢失其方法
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
// 如果自定义对象，方法是可以枚举的，没有问题
```

### 接口

合并众多类型声明至一个类型声明，编译器只会检查那些必需的属性是否存在，并且其类型是否匹配(也就是可以多传，但不能少传)

```js
// 1、可选
interface SquareConfig {
  color?: string;
  width?: number;
}

// 2、只读
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!

// ReadonlyArray<T> 与 Array<T> 类似，只是把所有可变方法去掉了
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error! 
// 可以用断言解决
a = ro as number[];

// 3、索引签名
interface SquareConfig {
  color?: string;
  width?: number;
  // 除了color，width还有其他未知的属性，可以如下：
  [propName: string]: any;
}
```

接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

```js
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

#### 实现接口：**其实就是明确的强制一个类去符合某种契约**。

接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

```js
interface ClockInterface {
  currentTime: Date;
  // 还可以描述一个方法，然后在类里实现
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
```

#### 继承接口

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。还可以继承多个

```js
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

// 接口还可以继承多个
interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```
#### 混合类型

有时你会希望一个对象可以同时具有上面提到的多种类型。比如一个对象可以同时做为函数和对象使用，并带有额外的属性

```js
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

接口还可以继承类：

### 类

传统的JavaScript程序使用**函数和基于原型的继承**来创建可重用的组件，但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 从ECMAScript 2015，也就是ECMAScript 6开始，JavaScript程序员将能够使用**基于类的面向对象**的方式。 

```js
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```
类从基类中继承了属性和方法。 这里，Dog是一个**派生类**，它派生自**Animal基类**，通过extends关键字。 **派生类通常被称作子类，基类通常被称作超类**。

- 在TypeScript里，成员都默认为public。
- protected修饰符与private修饰符的行为很相似，但有一点不同，protected成员在派生类中仍然可以访问。


#### 参数属性

如下，仅在构造函数里使用 `private name: string` 参数来创建和初始化name成员。 我们把声明和赋值合并至一处。

```js
class Animal {
  constructor(private name: string) { }
  move(distanceInMeters: number) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

#### 存取器

TypeScript支持通过getters/setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

```js
class Employee {
  fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

我们可以随意的设置fullName，这是非常方便的，但是这也可能会带来麻烦。

```js
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```

### 函数

```js
// 赋值符号=前面可以理解为类型声明，后面可以理解为具体函数定义
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```


提供一个默认值，就代表这个值可以不传，如果传的是undefined也会使用默认值：
```js
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
```

**注意：**：与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 

#### this与箭头函数

```js
// 版本一
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// 版本二
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```
版本一的问题在于，函数调用时的this来自window，因此我们用版本二在函数返回之前就绑定正确的this。

但：TypeScript会警告你犯了一个错误，如果你给编译器设置了--noImplicitThis标记。 它会指出this.suits[pickedSuit]里的this的类型为any。

这是因为：this来自对象字面量里的函数表达式(什么意思？)

修改的方法是，提供一个显式的this参数。 this参数是个假的参数，它出现在参数列表的最前面：

```js
function f(this: void) {
   // make sure `this` is unusable in this standalone function
}
```

```js
// 版本三，修正this的类型为Deck
// 因此--noImplicitThis不会报错了。
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

当你将一个函数传递到某个库函数里在稍后被调用时，你可能也见到过回调函数里的this会报错。 因为当回调函数被调用时，它会被当成一个普通函数调用，this将为undefined。 稍做改动，你就可以通过this参数来避免错误。 首先，库函数的作者要指定this的类型：

```js
interface UIElement {
  // 1、定义个函数addClickListener(): void
  // 2、函数的参数onclick的类型是(this: void, e: Event) => void
  // 3、this: void，表示onclick函数不需要指定this类型
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
```

#### 重载

很多情况下，我们传入函数里的参数类型不同，处理的逻辑也会不相同，~~执行时函数体内每次都需要对参数类型进行判断进而执行对应的逻辑~~

因此，我们可以直接将不同的情况，都定义出来，也就是重载列表（其实就是每种参数的可能）。编译器会查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。

```js

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    if (typeof x == "object") {
      // ...
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
      // ...
    }
}
```

**注意**，function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用pickCard会产生错误。

### 泛型

软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。**组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型**，这在创建大型系统时为你提供了十分灵活的功能。

下面来创建第一个使用泛型的例子：identity函数。 这个函数会返回任何传入它的值。 你可以把这个函数当成是echo命令。

```js
// 版本一
function identity(arg: number): number {
  return arg;
}
// 版本二
function identity(arg: any): any {
  return arg;
}
```

版本一限定了数据类型为number，版本二会丢失一些信息：传入的类型与返回的类型应该是相同的，但设置为any则无法保证。

因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了***类型变量***，它是一种特殊的变量，**只用于表示类型而不是值**。

```js
// 1、<T> 表明identity是泛型函数，
// 2、T 这个类型变量，帮助我们捕获用户传入的类型，比如：number
// 3、之后我们再次使用 T 当做返回值类型
function identity<T>(art: T): T {
  return arg;
}
```

使用方式：
```js
// 方式一：传入所有的参数，包含类型参数string：
let output = identity<string>("myString");  // type of output will be 'string'

// 方式二：利用类型推论 – 即编译器会根据传入的参数自动地帮助我们确定T的类型：
let output = identity("myString");  // type of output will be 'string'
```

为了简洁性，一般利用方式二，但在一些复杂的情况下，有可能推断不出来，此时需要使用方式一。

**注意：**使用泛型后，T 就可以理解为任意类型，因此不能随意的调用某些数据类型才具有的方法或属性

```js
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);  // Error: T doesn't have .length
  return arg;
}
// 既然T不具有length，那可以如下：
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}

// 当然利用数组的另外一种表示方式：Array<T> 等价于 T[]
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}
```

#### 泛型类型

泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：

```js
function identity<T>(arg: T): T {
  return arg;
}
// 1、<T>(arg: T)泛型声明及入参
// 2、T = identity，类型赋值
let myIdentity: <T>(arg: T) => T = identity;

// 1、我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
let myIdentity: <U>(arg: U) => U = identity;

// 2、我们还可以使用带有调用签名的对象字面量来定义泛型函数
let myIdentity: {<T>(arg: T): T} = identity;

// 2-1、泛型接口
interface GenericIdentityFn {
    <T>(arg: T): T;
}
let myIdentity: GenericIdentityFn = identity;

// 3、我们还可以把泛型参数当做整个接口的一个参数（其实就是传进去类型）
// 这样就能清楚的知道使用的具体是哪个泛型类型了
interface GenericIdentityFn<T> {
    (arg: T): T;
}
let myIdentity: GenericIdentityFn<number> = identity;
// 当我们使用GenericIdentityFn的时候，还得传入一个类型参数来指定泛型类型（这里是：number），锁定了之后代码里使用的类型。

// 其实Map是个泛型接口或泛型类，只是用<string, any>来指明了具体使用了那种泛型类型而已
// 具体的话就是泛型内部key为string，value为any
function loggingIdentity(): Map<string, any> {
  return new Map();
}
```

#### 泛型类

泛型类看上去与泛型接口差不多。 泛型类使用 `<>` 括起泛型类型，跟在类名后面。
```js
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```
类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以**类的静态属性不能使用这个泛型类型**。

#### 泛型约束

```js
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);  // Error: T doesn't have .length
  return arg;
}
```

我们想访问arg的length属性，但是编译器并不能证明每种类型都有length属性，所以就报错了。

相比于操作any所有类型，我们想要限制函数去处理任意带有.length属性的所有类型。 只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。 为此，我们需要列出对于T的约束要求。

为此，我们定义一个接口来描述约束条件。 创建一个包含.length属性的接口，使用这个接口和extends关键字还实现约束：

```js
interface Lengthwise {
  length: number;
}

// 使用接口Lengthwise来约束泛型
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}

loggingIdentity(3);  // Error, number doesn't have a .length property
loggingIdentity({length: 10, value: 3}); // right
```

还可以约束泛型内部的属性：
```js
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

### 枚举

使用枚举我们可以定义一些有名字的数字常量，一个枚举类型可以包含**零个或多个枚举成员**。 枚举成员具有一个数字值，它可以是**常数或是计算得出的值** 当满足如下条件时，枚举成员被当作是常数：

- 不具有初始化函数并且之前的枚举成员是常数。 在这种情况下，当前枚举成员的值为上一个枚举成员的值加1。 但第一个枚举元素是个例外。 如果它没有初始化方法，那么它的初始值为0。
- 枚举成员使用常数枚举表达式初始化。 常数枚举表达式是TypeScript表达式的子集，它可以在编译阶段求值。 当一个表达式满足下面条件之一时，它就是一个常数枚举表达式：
  - 数字字面量
  - 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的） 如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用。
  - 带括号的常数枚举表达式
  - +, -, ~ 一元运算符应用于常数枚举表达式
  - +, -, *, /, %, <<, >>, >>>, &, |, ^ 二元运算符，常数枚举表达式做为其一个操作对象。 若常数枚举表达式求值后为NaN或Infinity，则会在编译阶段报错。

```js
enum FileAccess {
  // constant members
  None,
  Read    = 1 << 1,
  Write   = 1 << 2,
  ReadWrite  = Read | Write,
  // computed member
  G = "123".length
}
```

枚举是在运行时真正存在的一个对象。 其中一个原因是因为这样可以从枚举值到枚举名进行反向映射。枚举类型被编译成一个对象， 当访问枚举值时，为了避免生成多余的代码和间接引用，可以使用常数枚举。 常数枚举是在enum关键字前使用const修饰符。

```js
// 常数枚举更加轻量，不会生成额外的代码
const enum Enum {
  A = 1,
  B = A * 2
}
```

### 模块

>关于术语的一点说明: 请务必注意一点，TypeScript 1.5里术语名已经发生了变化。 “内部模块”现在称做“命名空间”。 “外部模块”现在则简称为“模块”，这是为了与ECMAScript 2015里的术语保持一致，(也就是说 module X { 相当于现在推荐的写法 namespace X {)。

从ECMAScript 2015开始，JavaScript引入了模块的概念。TypeScript也沿用这个概念。

为了确保类型安全性，我们可以使用typeof关键字。 typeof关键字，当在表示类型的地方使用时，会得出一个类型值，这里就表示模块的类型。

```js
declare function require(moduleName: string): any;

import { ZipCodeValidator as Zip } from "./ZipCodeValidator";

if (needZipValidation) {
    let ZipCodeValidator: typeof Zip = require("./ZipCodeValidator");
    let validator = new ZipCodeValidator();
    if (validator.isAcceptable("...")) { /* ... */ }
}
```

#### 模块解析策略

共有两种可用的模块解析策略：Node和Classic。 你可以使用--moduleResolution标记指定使用哪种模块解析策略。 若未指定，那么在使用了--module AMD | System | ES2015时的默认值为Classic，其它情况时则为Node。

一、Classic: Classic是以前TypeScript默认的解析策略。 现在，它存在的理由主要是为了向后兼容。

相对导入的模块是相对于导入它的文件进行解析的。 因此/root/src/folder/A.ts文件里的import { b } from "./moduleB"会使用下面的查找流程：
1. /root/src/folder/moduleB.ts
2. /root/src/folder/moduleB.d.ts

对于非相对模块的导入，编译器则会从包含导入文件的目录开始依次向上级目录遍历，尝试定位匹配的声明文件。

比如：

有一个对moduleB的非相对导入import { b } from "moduleB"，它是在/root/src/folder/A.ts文件里，会以如下的方式来定位"moduleB"：

1. /root/src/folder/moduleB.ts
2. /root/src/folder/moduleB.d.ts
3. /root/src/moduleB.ts
4. /root/src/moduleB.d.ts
5. /root/moduleB.ts
6. /root/moduleB.d.ts
7. /moduleB.ts
8. /moduleB.d.ts


二、Node.js如何解析模块

为了理解TypeScript编译依照的解析步骤，先弄明白Node.js模块是非常重要的。 通常，在Node.js里导入是通过require函数调用进行的。 Node.js会根据require的是**相对路径还是非相对路径**做出不同的行为。

相对路径很简单。 例如，假设有一个文件路径为/root/src/moduleA.js，包含了一个导入`var x = require("./moduleB")`; Node.js以下面的顺序解析这个导入：

1. 将/root/src/moduleB.js视为文件，检查是否存在。
2. 将/root/src/moduleB视为目录，检查是否它包含package.json文件并且其指定了一个"main"模块。 在我们的例子里，如果Node.js发现文件/root/src/moduleB/package.json包含了{ "main": "lib/mainModule.js" }，那么Node.js会引用/root/src/moduleB/lib/mainModule.js。
3. 将/root/src/moduleB视为目录，检查它是否包含index.js文件。 这个文件会被隐式地当作那个文件夹下的”main”模块。


但是，非相对模块名的解析是个完全不同的过程。 Node会在一个特殊的文件夹node_modules里查找你的模块。 node_modules可能与当前文件在同一级目录下，或者在上层目录里。 Node会向上级目录遍历，查找每个node_modules直到它找到要加载的模块。

还是用上面例子，但假设/root/src/moduleA.js里使用的是非相对路径导入`var x = require("moduleB")`;。 Node则会以下面的顺序去解析moduleB，直到有一个匹配上。

1. /root/src/node_modules/moduleB.js
2. /root/src/node_modules/moduleB/package.json (如果指定了"main"属性)
3. /root/src/node_modules/moduleB/index.js
4. /root/node_modules/moduleB.js
5. /root/node_modules/moduleB/package.json (如果指定了"main"属性)
6. /root/node_modules/moduleB/index.js
7. /node_modules/moduleB.js
8. /node_modules/moduleB/package.json (如果指定了"main"属性)
9. /node_modules/moduleB/index.js

三、TypeScript如何解析模块

TypeScript是模仿Node.js运行时的解析策略来在编译阶段定位模块定义文件。 因此，TypeScript在Node解析逻辑基础上增加了TypeScript源文件的扩展名（.ts，.tsx和.d.ts）。 同时，TypeScript在package.json里使用字段"types"来表示类似"main"的意义 - 编译器会使用它来找到要使用的”main”定义文件。

四、Base URL
在利用AMD模块加载器的应用里使用baseUrl是常见做法，它要求在运行时模块都被放到了一个文件夹里。 这些模块的源码可以在不同的目录下，但是构建脚本会将它们集中到一起。

设置baseUrl来告诉编译器到哪里去查找模块。 所有非相对模块导入都会被当做相对于baseUrl。

五、路径映射

有时模块不是直接放在baseUrl下面。 比如，充分"jquery"模块地导入，在运行时可能被解释为"node_modules/jquery/dist/jquery.slim.min.js"。 

TypeScript编译器通过使用tsconfig.json文件里的"paths"来支持这样的声明映射。 下面是一个如何指定jquery的"paths"的例子。

```js
{
  "compilerOptions": {
    "baseUrl": ".", // This must be specified if "paths" is.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // 此处映射是相对于"baseUrl"
    }
  }
}
```
请注意"paths"是相对于"baseUrl"进行解析。 如果"baseUrl"被设置成了除"."外的其它值，比如tsconfig.json所在的目录，那么映射必须要做相应的改变。 如果你在上例中设置了"baseUrl": "./src"，那么jquery应该映射到"../node_modules/jquery/dist/jquery"。

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "*": [
        "*",
        "generated/*"
      ]
    }
  }
}
```
它告诉编译器所有匹配"*"（所有的值）模式的模块导入会在以下两个位置查找：

- "*"： 表示名字不发生改变，所以映射为<moduleName> => <baseUrl>/<moduleName>
- "generated/*"表示模块名添加了“generated”前缀，所以映射为<moduleName> => <baseUrl>/generated/<moduleName>

### tsconfig选项的含义

- --allowJs	boolean	false	允许编译javascript文件。
- --allowSyntheticDefaultImports	boolean	module === "system" 或设置了 --esModuleInterop 且 module 不为 es2015 / esnext	允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
  - esModuleInterop 当它为true时，相当于在commonjs可以使用es6的模块方式导入导出
- --allowUnreachableCode	boolean	false	不报告执行不到的代码错误。
- --allowUnusedLabels	boolean	false	不报告未使用的标签错误。
- --alwaysStrict	boolean	false	以严格模式解析并为每个源文件生成 "use strict"语句
- --baseUrl	string		解析非相对模块名的基准目录。查看 模块解析文档了解详情。
- --charset	string	"utf8"	输入文件的字符集。
- --checkJs	boolean	false	在 .js文件中报告错误。与 --allowJs配合使用。
- --declaration
  - -d	boolean	false	生成相应的 .d.ts文件。
- --declarationDir	string		生成声明文件的输出路径。
- --diagnostics	boolean	false	显示诊断信息。
- --disableSizeLimit	boolean	false	禁用JavaScript工程体积大小的限制
- --emitBOM	boolean	false	在输出文件的开头加入BOM头（UTF-8 Byte Order Mark）。
- --emitDecoratorMetadata [1]	boolean	false	给源码里的装饰器声明加上设计类型元数据。查看 issue #2577了解更多信息。
- --experimentalDecorators [1]	boolean	false	启用实验性的ES装饰器。
- --extendedDiagnostics	boolean	false	显示详细的诊段信息。
- --forceConsistentCasingInFileNames	boolean	false	禁止对同一个文件的不一致的引用。
- --help
  - -h			打印帮助信息。
- --importHelpers	string		从 tslib 导入辅助工具函数（比如 __extends， __rest等）
- --inlineSourceMap	boolean	false	生成单个sourcemaps文件，而不是将每sourcemaps生成不同的文件。
- --inlineSources	boolean	false	将代码与sourcemaps生成到一个文件中，要求同时设置了 --inlineSourceMap或 --sourceMap属性。
- --init			初始化TypeScript项目并创建一个 tsconfig.json文件。
- --isolatedModules	boolean	false	将每个文件作为单独的模块（与“ts.transpileModule”类似）。
- --jsx	string	"Preserve"	在 .tsx文件里支持JSX： "React"或 "Preserve"。查看 JSX。
- --jsxFactory	string	"React.createElement"	指定生成目标为react JSX时，使用的JSX工厂函数，比如 React.createElement或 h。
- --lib	string[]		编译过程中需要引入的库文件的列表。
  - 可能的值为：
  - ► ES5
  - ► ES6
  - ► ES2015
  - ► ES7
  - ► ES2016
  - ► ES2017
  - ► ES2018
  - ► ESNext
  - ► DOM
  - ► DOM.Iterable
  - ► WebWorker
  - ► ScriptHost
  - ► ES2015.Core
  - ► ES2015.Collection
  - ► ES2015.Generator
  - ► ES2015.Iterable
  - ► ES2015.Promise
  - ► ES2015.Proxy
  - ► ES2015.Reflect
  - ► ES2015.Symbol
  - ► ES2015.Symbol.WellKnown
  - ► ES2016.Array.Include
  - ► ES2017.object
  - ► ES2017.Intl
  - ► ES2017.SharedMemory
  - ► ES2017.String
  - ► ES2017.TypedArrays
  - ► ES2018.Intl
  - ► ES2018.Promise
  - ► ES2018.RegExp
  - ► ESNext.AsyncIterable
  - ► ESNext.Array
  - ► ESNext.Intl
  - ► ESNext.Symbol

  - 注意：如果--lib没有指定默认注入的库的列表。默认注入的库为：
  - ► 针对于--target ES5：DOM，ES5，ScriptHost
  - ► 针对于--target ES6：DOM，ES6，DOM.Iterable，ScriptHost
- --listEmittedFiles	boolean	false	打印出编译后生成文件的名字。
- --listFiles	boolean	false	编译过程中打印文件名。
- --locale	string	(platform specific)	显示错误信息时使用的语言，比如：en-us。
- --mapRoot	string		为调试器指定指定sourcemap文件的路径，而不是使用生成时的路径。当 .map文件是在运行时指定的，并不同于 js文件的地址时使用这个标记。指定的路径会嵌入到 sourceMap里告诉调试器到哪里去找它们。
- --maxNodeModuleJsDepth	number	0	node_modules依赖的最大搜索深度并加载JavaScript文件。仅适用于 --allowJs。
- --module
  - -m	string	target === "ES6" ? "ES6" : "commonjs"	指定生成哪个模块系统代码： "None"， "CommonJS"， "AMD"， "System"， "UMD"， - "ES6"或 "ES2015"。
  - ► 只有 "AMD"和 "System"能和 --outFile一起使用。
  - ► "ES6"和 "ES2015"可使用在目标输出为 "ES5"或更低的情况下。
- --moduleResolution	string	module === "AMD" or "System" or "ES6" ? "Classic" : "Node"	决定如何处理模块。或者是"Node"对于Node.js/io.js，或者是"Classic"（默认）。查看模块解析了解详情。
- --newLine	string	(platform specific)	当生成文件时指定行结束符： "crlf"（windows）或 "lf"（unix）。
- --noEmit	boolean	false	不生成输出文件。只做类型检查，不然项目中全是编译后的js文件
- --noEmitHelpers	boolean	false	不在输出文件中生成用户自定义的帮助函数代码，如 __extends。
- --noEmitOnError	boolean	false	报错时不生成输出文件。
- --noErrorTruncation	boolean	false	不截短错误消息。
- --noFallthroughCasesInSwitch	boolean	false	报告switch语句的fallthrough错误。（即，不允许switch的case语句贯穿）
- --noImplicitAny	boolean	false	在表达式和声明上有隐含的 any类型时报错。
- --noImplicitReturns	boolean	false	不是函数的所有返回路径都有返回值时报错。
- --noImplicitThis	boolean	false	当 this表达式的值为 any类型的时候，生成一个错误。
- --noImplicitUseStrict	boolean	false	模块输出中不包含 "use strict"指令。
- --noLib	boolean	false	不包含默认的库文件（ lib.d.ts）。
- --noResolve	boolean	false	不把 /// <reference``>或模块导入的文件加到编译文件列表。
- --noStrictGenericChecks	boolean	false	禁用在函数类型里对泛型签名进行严格检查。
- --noUnusedLocals	boolean	false	若有未使用的局部变量则抛错。
- --noUnusedParameters	boolean	false	若有未使用的参数则抛错。
- --out	string		弃用。使用 --outFile 代替。
- --outDir	string		重定向输出目录。
- --outFile	string		将输出文件合并为一个文件。合并的顺序是根据传入编译器的文件顺序和 ///<reference``>和 import的文件顺序决定的。查看输出文件顺序文件了解详情。
paths [2]	Object		模块名到基于 baseUrl的路径映射的列表。查看 模块解析文档了解详情。
- --preserveConstEnums	boolean	false	保留 const和 enum声明。查看 const enums documentation了解详情。
- --preserveSymlinks	boolean	false	不把符号链接解析为其真实路径；将符号链接文件视为真正的文件。
- --preserveWatchOutput	boolean	false	保留watch模式下过时的控制台输出。
- --pretty [1]	boolean	false	给错误和消息设置样式，使用颜色和上下文。
- --project
-p	string		编译指定目录下的项目。这个目录应该包含一个 tsconfig.json文件来管理编译。查看 tsconfig.json文档了解更多信息。
- --reactNamespace	string	"React"	当目标为生成 "react" JSX时，指定 createElement和 __spread的调用对象
- --removeComments	boolean	false	删除所有注释，除了以 /!*开头的版权信息。
- --rootDir	string	(common root directory is computed from the list of input files)	仅用来控制输出的目录结构 --outDir。
rootDirs [2]	string[]		根（root）文件夹列表，表示运行时组合工程结构的内容。查看 模块解析文档了解详情。
- --skipDefaultLibCheck	boolean	false	忽略 库的默认声明文件的类型检查。
- --skipLibCheck	boolean	false	忽略所有的声明文件（ *.d.ts）的类型检查。
- --sourceMap	boolean	false	生成相应的 .map文件。
- --sourceRoot	string		指定TypeScript源文件的路径，以便调试器定位。当TypeScript文件的位置是在运行时指定时使用此标记。路径信息会被加到 sourceMap里。
- --strict	boolean	false	启用所有严格类型检查选项。
启用 --strict相当于启用 --noImplicitAny, --noImplicitThis, --alwaysStrict， --strictNullChecks和 --strictFunctionTypes和--strictPropertyInitialization。
- --strictFunctionTypes	boolean	false	禁用函数参数双向协变检查。
- --strictPropertyInitialization	boolean	false	确保类的非undefined属性已经在构造函数里初始化。若要令此选项生效，需要同时启用--strictNullChecks。
- --strictNullChecks	boolean	false	在严格的 null检查模式下， null和 undefined值不包含在任何类型里，只允许用它们自己和 any来赋值（有个例外， undefined可以赋值到 void）。
- --stripInternal [1]	boolean	false	不对具有 /** @internal */ JSDoc注解的代码生成代码。
- --suppressExcessPropertyErrors [1]	boolean	false	阻止对对象字面量的额外属性检查。
- --suppressImplicitAnyIndexErrors	boolean	false	阻止 --noImplicitAny对缺少索引签名的索引对象报错。查看 issue #1232了解详情。
- --target
-t	string	"ES3"	指定ECMAScript目标版本 "ES3"（默认）， "ES5"， "ES6"/ "ES2015"， "ES2016"， "ES2017"或 "ESNext"。

注意： "ESNext"最新的生成目标列表为 ES proposed features
- --traceResolution	boolean	false	生成模块解析日志信息
- --types	string[]		要包含的类型声明文件名列表。查看 @types，--typeRoots和--types章节了解详细信息。
- --typeRoots	string[]		要包含的类型声明文件路径列表。查看 @types，--typeRoots和--types章节了解详细信息。
- --version
-v			打印编译器版本号。
- --watch
-w			在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。监视文件和目录的具体实现可以通过环境变量进行配置。详情请看配置 Watch。

- @ts-nocheck 忽略文件检查
- 添加ts doc 注释
- 宽松策略：

```json
// 下面是 tsc --init初始化的配置文件
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

tsconfig.json 是 TypeScript 的默认配置文件，它用于配置 TypeScript 项目的编译选项，包括编译时需要的文件、输出目录、模块规范等。而 tsconfig.node.json 则是专门针对 Node.js 项目而制定的 TypeScript 配置文件，它与 tsconfig.json 相比增加了一些针对 Node.js 开发的特殊配置项，比如 module 配置项需要设置为 commonjs，因为 Node.js 默认使用的是 CommonJS 模块规范，而不是 ES 模块规范。

因此，如果你正在开发一个基于 Node.js 的 TypeScript 项目，使用 tsconfig.node.json 文件可以更方便地配置和管理项目，同时也能避免一些常见的配置错误。

### ts-loader

- ts-loader 内部调用了官方的编译器 tsc ，所以tsc与ts-loader其实是共享tsconfig.json这个配置文件的
- tsc --init 可以初始化一个tsconfig.json配置文件
- 同时ts-loader还有自己的一些配置，通过options选项传入
- tsc编译器不但要做语言转换，还要做类型检查， transpileOnly 选项就是只做语言转换，这样的话即使编辑器有ts类型报错，编译器也会放过，这岂不是一个兜底方案？
- 那如何在 transpileOnly 开启时，又做类型检查呢？可以借助一个插件，相当于这个插件放在一个独立的进程中进行实现，比如 fork-ts-checker-webpack-plugin 
- 除了ts-loader还有一个 awesome-typescript-loader，
  - 更适合于babel集成，使用babel的缓存和转义
  - 不需要安装额外的插件，就可以把类型检查放在独立进程中进行（但类型检查存在缺陷）

使用了ts，为何还需要babel呢？
- tsc和babel都可以将ts、jsx等转为es3/es4/es5等，但前者有类型检查，后者有丰富的插件

在babel7之前，是不支持ts的，如果想在babel7之前的项目使用ts，则需要先转为js，然后再使用babel转义
babel7之后，就支持ts了，官方合作

因此，我们可以在项目里使用babel做语言转换，然后使用typescript做类型检查，tsc --watch 可以开启编译器的监听模式。但两者最好不要混用

### tslint eslint 代码检查工具

- tslint检查工具，慢慢的变为eslint
- tslint执行规则的方式存在一些架构问题，从而影响性能，而修复这些问题会破坏现有的规则
- eslint的性能更好，并且社区用户通常拥有eslint的规则配置

TSLint是为TypeScript设计的代码规范检查工具。它可以检查TypeScript代码中的错误，比如拼写错误、类型错误、代码不规范等，并提供一些自定义规则。TSLint已经停止了官方支持，官方推荐使用ESLint代替。

ESLint是JavaScript的静态代码分析工具，它可以检查JavaScript代码中的错误、不规范的代码风格，并且支持自定义规则。与TSLint不同，ESLint可以支持多种编程语言，包括JavaScript、TypeScript、JSX等。

从底层原理来分析：
- 业务代码经过tsc编译器生成的ast文件与eslint生成的ast并不兼容，但现在社区提供 typescript-eslint插件将前者的ast转为后者的ast，从而使用eslint丰富的社区生态

### 断言

```js
// 1、类型断言
// 1-1、尖括号语法
let someValue: any = "this is a string";
let strLength: number = (\<string>someValue).length;

// 1-2、as语法
let someValue: any = 'this is a string';
let strLen: number = (someValue as string).length;


// 2、非空断言
// 后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型
// 2-1、忽略undefined和null
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'. 
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok，这里就忽略了null和undefined，所以成功
}
// 2-2、调用函数时忽略
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); // ok，这就排除了undefined，所以可以
}

// 但要注意：非空断言只是在编译阶段起到检查目的，如果设法通过了编译，则还是会出现null和undefined
const a: number | undefined = undefined;
const b: number = a!;
console.log(b); 

// 以上 TS 代码会编译生成以下 ES5 代码：
"use strict";
const a = undefined;
const b = a;
console.log(b); // 依然会打印undefined
// 因此，ts的目的就是在编译阶段阻止错误可能的发生。


// 3、确定赋值断言
// 在使用const或者let定义变量时，常常发生错误：使用在定义之前；
// 其实就是说变量在赋值前被使用了。。。此时就可以用确定赋值断言，明确告诉编译器，这个变量肯定会被赋值

let a: number;
// Variable 'a' is used before being assigned.
console.log(a); // error
a = 1;

// 用!断言，编译器就会知道该属性会被明确地赋值
let a!: number;
console.log(a); // ok
a = 1;
```
### 常见ts引入问题：

#### 不识别@

- 未配置@别名或配置错误，参考：
- 打开项目的方式不对，一般ts编译器会去项目根目录里查找相应的配置文件，如果没有也会报错。

[vetur不识别@](https://my.oschina.net/u/4281209/blog/4791865) <br/>
[vscode打开工作空间与打开文件夹区别](https://www.jianshu.com/p/cf45d95ada26)
[vscode工作区详解](https://zhuanlan.zhihu.com/p/54770077)

如果不是打开方式的错误，如下一般都能解决(改完最好重启vscode)：

```js
// webpack配置
const path = require('path');
function resolve (dir) {
    return path.resolve(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  chainWebpack: (config)=>{
      config.resolve.alias
          .set('@', resolve('src'))
  }
}

// tsconfig.json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

#### 不识别特定的资源，比如png等图片资源

ts是无法识别非代码资源的，因此需要主动的去声明这个module，比如创建如下文件：

```js
// images.d.ts
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
```

项目编译过程中会自动去读取.d.ts这种类型的文件，所以不需要我们手动地加载他们。

当然 .d.ts 文件也不能随便放置在项目中，这类文件和ts文件一样需要被typescript编译，所以一样只能放置在**tsconfig.json中include属性所配置的文件夹**下。

## 装饰器
### 装饰器模式
装饰器是最新的 ECMA 中的一个提案，是一种**与类（class）相关的语法，用来注释或修改类和类方法**。装饰器在 Python 和 Java 等语言中也被大量使用。装饰器是实现 AOP（面向切面）编程的一种重要方式。

装饰器模式是一种结构型设计模式，它允许向一个现有的对象添加新的功能，同时又不改变其结构，是作为对现有类的一个包装。

decorator（装饰器）是 ES7 中的一个提案，目前处于 stage-2 阶段，提案地址：[JavaScript Decorators][https://github.com/tc39/proposal-decorators]。装饰器与函数组合（compose）以及高阶函数很相似。装饰器使用 @ 作为标识符，被放置在被装饰代码前面。

因为装饰器对业务代码非浸入。
### vue-class-component vs vue-property-decorator

- vue-property-decorator社区出品；
- vue-class-component官方出品，支持以class的方式来写vue代码
- vue-class-component提供了Vue、Component等；

vue-property-decorator 深度依赖了 vue-class-component，拓展出了更多操作符：@Prop、@Emit、@Inject、@Model、@Provide、@Watch；

## RxJs

RxJS 是一个库，它通过使用 observable 序列来编写异步和基于事件的程序。它提供了一个核心类型 Observable，附属类型 (Observer、 Schedulers、 Subjects) 和受 [Array#extras] 启发的操作符 (map、filter、reduce、every, 等等)，这些数组操作符可以把异步事件作为集合来处理。

>可以把 RxJS 当做是用来处理事件的 Lodash 。

### 拉取 (Pull) vs. 推送 (Push)

**什么是拉取？** - 在拉取体系中，由消费者来决定何时从生产者那里接收数据。生产者本身不知道数据是何时交付到消费者手中的。

每个 JavaScript 函数都是拉取体系。函数是数据的生产者，调用该函数的代码通过从函数调用中“取出”一个单个返回值来对该函数进行消费。

ES2015 引入了 generator 函数和 iterators (function*)，这是另外一种类型的拉取体系。调用 iterator.next() 的代码是消费者，它会从 iterator(生产者) 那“取出”多个值。

**什么是推送？** - 在推送体系中，由生产者来决定何时把数据发送给消费者。消费者本身不知道何时会接收到数据。

在当今的 JavaScript 世界中，Promises 是最常见的推送体系类型。Promise(生产者) 将一个解析过的值传递给已注册的回调函数(消费者)，但不同于函数的是，由 Promise 来决定何时把值“推送”给回调函数。

RxJS 引入了 Observables，**一个新的 JavaScript 推送体系。Observable 是多个值的生产者，并将值“推送”给观察者(消费者)**。

- Function 是惰性的评估运算，调用时会同步地返回一个单一值。
- Generator 是惰性的评估运算，调用时会同步地返回零到(有可能的)无限多个值。
- Promise 是最终可能(或可能不)返回单个值的运算。
- Observable 是惰性的评估运算，它可以从它被调用的时刻起同步或异步地返回零到(有可能的)无限多个值。

### Observables 作为函数的泛化

- 订阅 Observable 类似于调用函数。
- Observables 传递值可以是同步的，也可以是异步的。
- 那么 Observable 和 函数的区别是什么呢？Observable 可以随着时间的推移“返回”多个值，这是函数所做不到的

```js
// 函数只能返回一个值
function foo() {
  console.log('RxJs');
  return 42;
  return 41; // 永远不会执行
}

// Observables可以返回多个值（有点类似生成器）
const foo = Rx.Observable.create(function(observer) {
  console.log('RxJs');
  observer.next(42);
  observer.next(41); // 可以继续返回
})
foo.subscribe(x => console.log(x)); // 订阅（类似调用）才可以产生值。
```

结论：
- fn.call(); 同步的返回一个值
- observable.subscribe(); 给我任意数量的值，无论是同步还是异步。


### 订阅 Observables

订阅 Observable 像是调用函数, 并提供接收数据的回调函数。

这与像 addEventListener / removeEventListener 这样的事件处理方法 API 是完全不同的。使用 observable.subscribe，在 Observable 中不会将给定的观察者注册为监听器。Observable 甚至不会去维护一个附加的观察者列表。

subscribe 调用是启动 “Observable 执行”的一种简单方式， 并将值或事件传递给本次执行的观察者。

### Subject (主体)

什么是 Subject？ - RxJS Subject 是一种特殊类型的 Observable，它允许将值多播给多个观察者，所以 Subject 是多播的，而普通的 Observables 是单播的(每个已订阅的观察者都拥有 Observable 的独立执行)。

单播：点对点通信
多播：点对指定多个点通信，比如视频会议
广播：点对所有点通信

>Subject 像是 Observable，但是可以多播给多个观察者。Subject 还像是 EventEmitters，维护着多个监听器的注册表

- 每个Subject是Observable
- 每个Subject都是观察者

```js
// 我们为 Subject 添加了两个观察者，然后给 Subject 提供一些值：
var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(1);
subject.next(2);

// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

因为 Subject 是观察者，这也就在意味着你可以把 Subject 作为参数传给任何 Observable 的 subscribe 方法，

```js
var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

var observable = Rx.Observable.from([1, 2, 3]);

observable.subscribe(subject); // 你可以提供一个 Subject 进行订阅

// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

通过 Subject 将单播的 Observable 执行转换为多播的。这也说明了 Subjects 是将任意 Observable 执行共享给多个观察者的唯一方式。“多播 Observable” 通过 Subject 来发送通知，这个 Subject 可能有多个订阅者，然而普通的 “单播 Observable” 只发送通知给单个观察者。

### 项目案例

```js
export declare type Stream<T = unknown> = (cb: (payload: T) => void) => () => void;

export interface ISubject<T> {
  next: (value: T) => void;
  stream: Stream<T>;
}

export declare function Subject<T>(): ISubject<T>;
```


## vue3

### watchEffect

为了根据响应式状态自动应用和重新应用副作用，我们可以使用 watchEffect 方法。它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

停止侦听：

```js
const stop = watchEffect(() => {
  /* ... */
})

// later
stop()
```

清除副作用：

有时副作用函数（可以理解为watchEffect的入参）会执行一些异步的副作用，这些响应需要在其失效时清除 (即完成之前状态已改变了) 。所以侦听副作用传入的函数可以接收一个 onInvalidate 函数作入参，用来注册清理失效时的回调。当以下情况发生时，这个失效回调会被触发：

- 副作用即将重新执行时
- 侦听器被停止 (如果在 setup() 或生命周期钩子函数中使用了 watchEffect，则在组件卸载时)

```js
watchEffect(onInvalidate => {
  const token = performAsyncOperation(id.value)
  onInvalidate(() => {
    // id has changed or watcher is stopped.
    // invalidate previously pending async operation 以前挂起的异步操作失效
    token.cancel()
  })
})
```
