## 其他

### chrome 浏览器插件

编写 Chrome 浏览器插件可以帮助我们增强浏览器的功能，实现一些自定义化的需求。下面是一个简单的 Chrome 浏览器插件示例，用于在浏览器上方显示一个固定的搜索框。

创建一个名为 manifest.json 的文件，用于描述插件的基本信息和功能。

```json
{
  "manifest_version": 2,
  "name": "Search Bar",
  "description": "A simple search bar extension for Chrome",
  "version": "1.0",
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },
  "browser_action": {
    "default_icon": "icon48.png",
    "default_popup": "popup.html"
  },
  "permissions": [
    "activeTab"
  ]
}
```

创建一个名为 popup.html 的文件，用于显示插件的弹出窗口。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Search Bar</title>
    <style>
      input {
        width: 100%;
        padding: 6px 10px;
        font-size: 16px;
        border-radius: 20px;
        border: none;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        outline: none;
      }
    </style>
  </head>
  <body>
    <input type="text" placeholder="Search...">
  </body>
</html>
```

创建一个名为 icon16.png、icon48.png 和 icon128.png 的文件，用于设置插件的图标。

在 Chrome 浏览器中打开“扩展程序”页面（可以通过地址栏输入 chrome://extensions/ 进入），打开开发者模式，点击“加载已解压的扩展程序”按钮，选择插件所在的文件夹即可。

完成上述步骤后，插件就可以在浏览器上方显示一个固定的搜索框了。当用户点击插件图标时，会显示弹出窗口，用户可以在该窗口中输入搜索内容，并进行搜索操作。此外，该插件还请求了 activeTab 权限，用于获取当前选中的标签页信息，以便进行搜索操作。

### vscode 插件
编写 VS Code 插件可以帮助我们扩展 VS Code 的功能，为开发者提供更好的开发体验。下面是一个简单的 VS Code 插件示例，用于在编辑器中显示当前时间。

1. 打开 VS Code 编辑器，使用快捷键 Ctrl + Shift + P 打开命令面板，输入 Extension: Create Extension 并按下回车键，创建一个新的扩展程序。
2. 在弹出的窗口中输入扩展程序的基本信息，例如作者、扩展程序名、描述等。
3. 在创建完成后，打开 src/extension.ts 文件，编写插件的代码。

```js
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Time extension activated.');

  // 获取当前编辑器
  const editor = vscode.window.activeTextEditor;

  // 创建状态栏项
  const timeStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  timeStatusBarItem.command = 'time.show';
  context.subscriptions.push(timeStatusBarItem);

  // 创建命令
  const showTimeCommand = vscode.commands.registerCommand(
    'time.show',
    () => {
      const date = new Date();
      const timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      vscode.window.showInformationMessage(`Current time is ${timeStr}`);
    }
  );
  context.subscriptions.push(showTimeCommand);

  // 更新状态栏项
  setInterval(() => {
    const date = new Date();
    const timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    timeStatusBarItem.text = `$(clock) ${timeStr}`;
    timeStatusBarItem.show();
  }, 1000);
}

export function deactivate() {
  console.log('Time extension deactivated.');
}
```
该代码实现了以下功能：

- 在扩展程序激活时，在编辑器底部的状态栏中创建一个状态栏项，并设置了一个命令；
- 实现了 time.show 命令，用于在编辑器中显示当前时间；
- 每隔一秒钟更新状态栏项的文本内容，显示当前时间。
4. 在 VS Code 编辑器中使用快捷键 F5 运行该扩展程序，就可以在编辑器中看到状态栏中显示当前时间的效果了。

完成上述步骤后，我们就创建了一个简单的 VS Code 插件，用于在编辑器中显示当前时间。该插件的功能可以进一步扩展，例如在状态栏中添加更多的信息、提供更多的命令等。


### 缓存
#### 如何让cdn缓存失效

让 CDN 缓存失效，可以通过以下几种方式实现：

1. 更新资源的 URL：可以在 URL 中添加时间戳、版本号等参数，使每个版本的资源 URL 都不同，从而强制 CDN 服务器重新拉取资源。
2. 修改 HTTP 响应头：可以通过在 HTTP 响应头中添加 Cache-Control、Expires 等控制缓存的字段，指定缓存过期时间或者禁止缓存，从而使 CDN 缓存失效。（但是有些浏览器或者服务商不遵守）
3. 使用缓存刷新工具：一些 CDN 服务提供商提供了缓存刷新工具，可以手动刷新 CDN 缓存。例如，阿里云 CDN 提供了刷新接口和刷新工具，可以直接在控制台或者 API 中进行操作

#### CDN 服务提供商提供了缓存刷新工具的原理

DN 服务提供商提供的缓存刷新工具主要是通过调用其后台的 API 接口实现的。一般来说，缓存刷新工具会将用户的请求发送给 CDN 服务商的服务器，然后由服务器负责将请求发送到 CDN 缓存节点上，通知它们将指定的缓存失效。

具体而言，缓存刷新工具的原理如下：

1. 用户在 CDN 服务商的控制台或者其他工具上提交缓存刷新请求。
2. CDN 服务商的服务器接收到请求后，通过后台的 API 接口将请求发送到相应的 CDN 缓存节点。
3. CDN 缓存节点接收到请求后，根据请求内容和缓存策略，将指定的缓存失效。
4. 如果缓存失效成功，则 CDN 缓存节点会返回相应的响应码和状态信息给 CDN 服务商的服务器。
5. CDN 服务商的服务器根据返回的响应码和状态信息，判断缓存刷新是否成功，并将结果返回给用户。

需要注意的是，CDN 服务商的缓存刷新工具一般有一定的限制和规定，例如每天可提交的刷新次数、缓存刷新的最大文件大小、缓存刷新的时间间隔等等。在使用缓存刷新工具时，需要仔细阅读相关的使用说明和规定，以免触发服务商的限制或者出现其他问题。

## 渲染

### SSR的流程

SSR（Server Side Rendering，服务端渲染）的基本流程如下：

1. 浏览器向服务器发送页面请求。
2. 服务器接收到请求后，根据请求的 URL 和路由信息，确定需要渲染的页面组件。
3. 服务器通过调用组件的 renderToString 方法，将组件转换成 HTML 字符串。
4. 服务器将渲染好的 HTML 字符串和组件的状态（如果需要）一并发送给浏览器。
5. 浏览器接收到响应后，展示 HTML 内容，并根据需要下载 CSS、JS 等资源文件。
6. 浏览器下载并解析 JS 文件，运行组件的生命周期方法，并将组件的状态更新到页面上。

在上述流程中，SSR 的主要作用是在服务器端将 React、Vue 等组件转换成 HTML 字符串，并将渲染好的 HTML 字符串和组件的状态发送给浏览器。这样，在浏览器接收到响应后，页面的 HTML 内容已经被渲染出来，不需要再等待 JS 文件的下载和执行，从而提高了页面的加载速度和用户体验。

需要注意的是，SSR 的实现还需要考虑如何处理数据获取、路由管理、性能优化等方面的问题，例如通过预取数据、使用缓存、启用服务端压缩等方式优化页面的性能和加载速度，以确保 SSR 能够达到预期的效果和效率。

### ssr渲染返回的字符串与状态又是如何激活并渲染到页面上的

在 SSR 渲染返回的 HTML 字符串中，会包含组件的 HTML 内容、组件的状态和相关的 JS 代码。浏览器接收到响应后，会将 HTML 字符串解析成 DOM 树，并执行其中的 JS 代码。在 JS 代码执行的过程中，可以通过以下几种方式激活并渲染组件的状态：

- 使用客户端 JS 代码重新渲染组件：在客户端 JS 代码中，可以通过调用 ReactDOM.hydrate() 或者 ReactDOM.render() 方法重新渲染组件，并将组件的状态传入。这样，浏览器就可以在页面中展示渲染好的组件，并保留组件的状态。
- 使用服务端渲染时预加载的 JS 代码：在 SSR 渲染返回的 HTML 字符串中，可能会包含组件的预加载 JS 代码。这些代码可以在浏览器中执行，激活组件的状态并进行渲染。
- 使用客户端路由管理工具：如果在 SSR 中使用了客户端路由管理工具，例如 React Router，可以通过路由切换的方式重新渲染组件，并传入组件的状态。

需要注意的是，在使用 SSR 渲染的过程中，要确保服务器端和客户端 JS 代码的一致性，以避免因代码不一致而导致的状态不匹配、页面闪烁等问题。同时，还需要考虑性能优化的问题，例如通过缓存、懒加载、代码分割等方式减少 JS 代码的体积，提高页面的渲染速度和用户体验。


## 算法

### 统计字符串中次数最多的字母 

```js
function findMostFrequentLetter(str) {
  const count = {};
  let maxCount = 0;
  let mostFrequentLetter = '';

  // 遍历字符串，统计每个字母出现的次数
  for (let i = 0; i < str.length; i++) {
    const letter = str[i].toLowerCase(); // 转换为小写字母
    if (/[a-z]/.test(letter)) { // 判断是否为字母
      count[letter] = (count[letter] || 0) + 1; // 计数
      if (count[letter] > maxCount) { // 更新最大出现次数和对应的字母
        maxCount = count[letter];
        mostFrequentLetter = letter;
      }
    }
  }

  return { letter: mostFrequentLetter, count: maxCount };
}

// 示例用法
const result = findMostFrequentLetter('Hello World!');
console.log(result); // 输出 { letter: 'l', count: 3 }
```

### fn(arr, n, num) arr是一个数组，n 表示在这个数组中找出n个项，num表示在这n个项相加和为num

可以使用回溯法（Backtracking）来解决这个问题。

回溯法是一种穷举搜索的算法，它通过枚举所有可能的解，并逐步排除不可能的解，最终找到所有满足条件的解。

具体实现步骤如下：

1. 定义一个空数组 result，用于存储所有符合条件的数组。
2. 定义一个递归函数 find，接收三个参数：当前的数组 curArr，剩余需要找的个数 count，以及剩余需要相加的和 sum。
3. 如果剩余需要找的个数为 0，且剩余需要相加的和为 0，说明当前的数组符合条件，将其添加到 result 数组中。
4. 如果剩余需要找的个数为 0，但剩余需要相加的和不为 0，说明当前的数组不符合条件，返回。
5. 如果当前数组已经遍历完，返回。
6. 遍历原数组 arr，将每个元素依次添加到 curArr 中，然后调用 find 函数，传入剩余需要找的个数 count - 1，以及剩余需要相加的和 sum - arr[i]。
7。 在递归返回时，将 curArr 中的最后一个元素移除，继续遍历原数组。

最终，result 数组中存储的就是所有符合条件的数组。

```js
function fn(arr, n, num) {
  const result = [];

  function find(curArr, count, sum) {
    if (count === 0 && sum === 0) {
      result.push(curArr.slice());
      return;
    }
    if (count === 0 || sum < 0) {
      return;
    }
    if (arr.length === 0) {
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      curArr.push(arr[i]);
      arr.splice(i, 1);
      find(curArr, count - 1, sum - arr[i]);
      arr.splice(i, 0, curArr.pop());
    }
  }

  find([], n, num);
  return result;
}
// 测试
const arr = [1, 2, 3, 4, 5];
const n = 3;
const num = 7;
const result = fn(arr, n, num);
console.log(result);
```

## html 相关

### DSL

领域特定语言（英语：domain-specific language、DSL）指的是专注于某个应用程序领域的计算机语言。 又译作领域专用语言。 不同于普通的跨领域通用计算机语言(GPL)，领域特定语言只用在某些特定的领域。 比如用来显示网页的HTML，以及Emacs所使用的Emac LISP语言。

### viewport 原理

**viewport的原理**

<meta> 标签中的 viewport 属性用于设置浏览器的视口（viewport）的大小和缩放比例，以便于让网页在不同设备上以合适的方式呈现。viewport 属性的原理如下：

在移动设备上，浏览器默认将页面的宽度设置为一个固定的值，这个值通常是设备的宽度。如果一个网页的宽度大于这个固定的值，那么就会出现横向滚动条，这会对用户的体验造成很大的影响。因此，**我们需要通过 viewport 属性来告诉浏览器网页的实际宽度，以便于浏览器进行合适的缩放和布局**。注意这句话，是通过viewport这个属性，告诉浏览器，现在网页的宽度就是多少，你就渲染的时候就按这么宽渲染。

viewport 属性的值通常由两个部分组成，分别是 width 和 initial-scale。其中 width 属性用于设置网页的宽度，通常设置为设备的宽度，而 initial-scale 属性用于设置网页的缩放比例，通常设置为 1。这样设置后，浏览器就可以根据 width 属性来确定网页的实际宽度，并根据 initial-scale 属性来进行合适的缩放和布局。

除了 width 和 initial-scale 属性外，viewport 属性还可以包含其他属性，例如 minimum-scale、maximum-scale 和 user-scalable 等，用于进一步控制浏览器的缩放行为。

总之，viewport 属性是移动设备上网页布局和缩放的关键，通过合理设置 viewport 属性，可以让网页在不同设备上以合适的方式呈现，提高用户的体验。

### Cookie、Session、LocalStorage 和 SessionStorage 都

是在 Web 开发中用于存储数据的机制，但它们之间存在一些区别。

- Cookie 是浏览器用于存储少量数据的机制，通常用于存储用户的登录状态、网站的一些偏好设置等。Cookie 会随着每个 HTTP 请求发送到服务器端，因此可以用于在客户端和服务器端之间传递信息。Cookie 可以设置过期时间，也可以通过 JavaScript 来操作。

- Session 是在服务器端存储用户数据的机制，通常用于存储用户的登录状态、用户的购物车信息等。当用户通过浏览器访问网站时，服务器会为每个用户创建一个唯一的 Session ID，并将其存储在 Cookie 中返回给客户端。客户端每次请求时都会携带该 Cookie，服务器根据 Session ID 来判断用户的身份，从而获取用户的数据。Session 的数据存储在服务器端，因此相对于 Cookie 更加安全。

- LocalStorage 是在浏览器端存储数据的机制，通常用于存储一些持久化的数据，例如用户的偏好设置、应用程序的配置等。LocalStorage 可以设置过期时间，数据会一直存在浏览器中，除非用户手动清除。

- SessionStorage 与 LocalStorage 类似，都是在浏览器端存储数据的机制，但其数据的生命周期与 Session 相关。当用户关闭浏览器时，SessionStorage 中的数据也会被清除。

总的来说，这些存储机制的使用场景和使用方式各不相同。需要根据具体的业务需求选择合适的存储机制。

## CSS

### 像素

- 1像素，其实就是屏幕上的一个马赛克点，是一个绝对单位，但是在retina屏上 等于 dpr 个像素点，比如iPhone X 上，1px 等于 3 个物理像素点。
- 像素密度，屏幕上每英寸的像素数目，通常用“ppi”（Pixels Per Inch）表示
- retina屏，其实就是相同宽度下，可以显示更多的马赛克点
- 幕尺寸指的是屏幕对角线的长度，通常用“英寸”作为单位表示
- 如1080 x 1920 像素，屏幕尺寸为 5.5 英寸的手机，像素密度为：1080 / 5.5 ≈ 401 ppi
- 在 iPhone X 上，屏幕分辨率为 1125 x 2436 像素，而屏幕尺寸为 5.8 英寸，像素密度为 458 ppi（像素每英寸），因此每个物理像素上显示的图像元素数目是常规屏幕的 3 倍左右

### 要让前端项目开始使用 GPU 加速，需要考虑以下几个方面：

- 使用 CSS3 动画和过渡：使用 CSS3 的 transition 和 animation 属性可以让元素的动画效果变得更加平滑和流畅。由于这些属性会使用 GPU 加速，因此可以在一定程度上提高动画效果的性能和效率。
- 使用 transform 和 opacity 属性：使用 transform 属性可以对元素进行 2D 或 3D 变换，例如旋转、缩放等，而使用 opacity 属性可以控制元素的透明度。由于这些属性同样可以使用 GPU 加速，因此可以在一定程度上提高页面的渲染速度和流畅度。
- 使用 Web Animations API：Web Animations API 是一种 JavaScript API，可以用于编写高性能、复杂的动画效果。使用 Web Animations API 可以直接操作浏览器的动画引擎，从而更好地利用 GPU 加速，提高动画效果的性能和效率。
- 合理使用 Canvas 和 WebGL：如果需要实现复杂的图形和动画效果，可以考虑使用 Canvas 和 WebGL 技术。**这些技术可以直接访问 GPU**，从而提高图形和动画效果的性能和效率。
- 使用优化技巧：为了更好地利用 GPU 加速，还可以使用一些优化技巧，例如减少页面的重排和重绘、使用硬件加速视频解码、启用合适的合成模式等。

需要注意的是，使用 GPU 加速并不是一定能够提高性能和效率，它还需要考虑硬件设备、浏览器兼容性、优化技巧等因素的影响。因此，在使用 GPU 加速时需要仔细评估其对性能和用户体验的影响，确保能够达到预期的效果和效率。

```js
// 使用 Web Animations API 实现的动画
// 获取元素
const box = document.querySelector('.box');

// 定义动画效果
const animation = box.animate([
  { transform: 'rotate(0deg) scale(1)' },
  { transform: 'rotate(360deg) scale(1.5)' }
], {
  duration: 2000, // 动画时长
  easing: 'ease-out', // 缓动函数
  iterations: Infinity // 循环播放
});

// 暂停动画
animation.pause();

// 点击元素时开始或暂停动画
box.addEventListener('click', () => {
  if (animation.playState === 'paused') {
    animation.play();
  } else {
    animation.pause();
  }
});
```

## vue

### keep-alive 的原理

1. 当被包裹的组件第一次渲染时，keep-alive 组件会创建一个缓存对象 cache，并将该组件的实例对象存入 cache 中。
2. 当被包裹的组件被销毁时，keep-alive 组件会将该组件的实例对象从 cache 中删除。
3. 当被包裹的组件再次渲染时，keep-alive 组件会检查 cache 中是否有该组件的实例对象。如果有，则直接从 cache 中获取该实例对象，不再重新创建。
4. 如果被包裹的组件需要更新，keep-alive 组件会先调用该组件的 beforeUpdate 钩子函数，然后再更新该组件的状态。


## babel

### babel 如何处理 this

babel在不同的环境下，将this转换成不同的内容，比如undefined，可以写一个简单的babel工具测试下

### 组件库如何实现的按需加载

- 组件库按需加载： 
  - 方式一：手动加载：
  - 方式二：借助bebel-plugin-import插件

```js
// 方式一：
import Button from 'vant/lib/button';
import 'vant/lib/button/style';


// 方式二：
// 配置bebel插件
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};

// 业务中使用
import { Button } from 'vant';
Vue.use(Button);
```

其实对比二者，bebel-plugin-import 的作用，无非是将手动挨个引入组件及样式的操作自动化了而已。


#### 组件库按需加载的本质

```js
import { Button } from 'vant';

// bebel 转换为 如下，避免每次都手动引的麻烦。

import "vant/es/button/style";
import _Button from "vant/es/button";
```

其实底层就是，bebel插件在 AST 层面对导入语法进行分析，并进行替换操作，然后再生成最终的代码而已。

而每个babel插件其实，就是类似如下的一个对象：

```js
export default function({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {},
      ASTNodeTypeHere(path, state) {}
    }
  };
};
```


- [组件库按需加载原理分析](https://juejin.cn/post/6968505746757533710#heading-15)
- [深入Babel，这一篇就够了](https://juejin.cn/post/6844903746804137991)
- [一口(很长的)气了解 babel](https://juejin.cn/post/6844903743121522701)
- [babel插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)


