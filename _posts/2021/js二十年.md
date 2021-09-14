
JavaScript 1.0/1.1 是一种动态类型语言，具有五种基本数据类型：数字、字符串、布尔值、对象和函数。这里的「动态类型」意味着运行时类型信息与每条数据相关联，而不是与诸如变量之类的「值的容器」相关联。运行时类型检查可确保操作仅应用于各操作所支持的数据值上。

布尔值、字符串和数字是不可变（immutable）的值。布尔类型具有两个值，分别为 true 和 false。字符串值由 8 位字符编码的不可变序列组成，没有 Unicode 支持。(现如今，一个字符一般两个字节表示，内存里序列是固定的，底层也没有额外的做其他处理，只是替换并覆盖)

在 JavaScript 1.0 中，可以通过声明和访问未初始化变量的方式，获取到 undefined 这个值。而值 null 则旨在表示某个预期存在对象值的上下文里「没有对象」。它是根据 Java 的 null 值建模的，有助于将 JavaScript 与 Java 实现的对象进行集成。

令人困惑的是，typeof null 会返回字符串值 "object" 而不是 "null"。其实也可以说这与 Java 保持了一致，因为 Java 的所有值都是对象，而 null 本质上是表达「没有对象」的对象。但是，Java 缺少与 typeof 运算符等效的特性，并使用 null 作为未初始化变量的默认值。根据 Brendan Eich 的回忆，typeof null 的值是原始 Mocha 实现中抽象泄漏g的结果。null 的运行时值使用了与对象值相同的内部标记值进行编码，因此 typeof 运算符的实现就直接返回了 "object"，而无需任何额外的特殊处理。

void 运算符仅求值其操作数，然后返回 undefined。访问 undefined 的一种常见手法是 void 0。引入 void 运算符是为了作为辅助，以便定义那些会在单击时执行 JavaScript 代码的 HTML 超链接。例如：

```js
<a href="javascript:void usefulFunction()">
  Click to do something useful
</a>
```

这里 href 属性g的值应为一个 URL，而 javascript: 是浏览器可识别的特殊 URL 协议。这意味着要对后面的 JavaScript 代码求值，并使用将其转换为字符串的结果，就像使用由常规 href URL 获取的响应文档那样。除非获得 undefined，否则 <a> 元素将尝试继续处理该响应文档。通常 Web 开发者想要的只是在单击链接时对 JavaScript 表达式求值而已。给表达式加上前缀 void 即可允许以这种方式使用该表达式，避免 <a> 元素的进一步处理。