## 云开发

- 教程：https://cloud.tencent.com/edu/paths/series/applet
- 

1. 使用微信的云开发，这样服务器端的运维工作就不需要考虑
- 云开发，需要在微信云服务器上，新建环境
- 在业务侧，其实有两部分，一部分是client客户端部分，一部分是云函数部分，然后公共的 project.config.json里配置的是云函数目录cloudfunctionRoot和客户端业务目录miniprogramRoot，其实就是指向的客户端及服务端的根目录
- 云函数，还需要配置环境id，其实就是云函数后续部署的环境id，在微信云服务器后台获取
- 肯定需要本地调试云函数，在指定的云函数目录里，右键开启本地调试云函数，此时会打开一个调试器，相当于服务端，然后勾选右侧的开启本地调试，此时client侧发起的请求就会在这里打印出来
- 新建云函数，也很简单，右键在云函数根目录 新建nodejs云函数即可生成一份默认的配置，需要安装对应的依赖，那如果业务很大，云函数岂不是很多？
- 删除云函数时，如果右键删除，一同步又会出现，此时需要在ide上点击云开发，进入到云开发控制台，在这里删除对应的函数才行
- 点击云开发，进入云控制台，设置里有环境id，还可以新建云函数，但是新建的是空白的，不如在项目里右键新建，然后如何与后台进行关联起来


## taro ts开发

### ts相关

- 项目中使用的别名，需要在tsconfig.json里和项目的config.js都配置才行，一个是项目用，一个是ts用
- 配置了别名，提示找不到名称“exports”、require
    - 可以安装 @types/node


@types/node 是一个 TypeScript 类型定义库，它为 Node.js 提供了 TypeScript 类型支持。在使用 TypeScript 开发 Node.js 应用时，可以使用 @types/node 库来获取 Node.js 相关的类型定义。

@types/node 的工作原理是通过声明文件（.d.ts 文件）来为 Node.js 应用提供类型定义。在应用中导入相应的类型定义，TypeScript 编译器就可以正确地检查代码并给出类型提示。

因为 Node.js 是一个非常庞大的项目，它有许多 API 和功能，所以 @types/node 库也是非常庞大的，包含了大量的类型定义文件。通过使用这个库，可以显著提高在 TypeScript 中编写 Node.js 应用的效率。

#### TypeScript 是如何找到 @types/node里定义的类型的？

TypeScript 会在项目中的 tsconfig.json 文件中查找 typeRoots 配置项，以确定类型定义文件的根目录。如果未配置 typeRoots，则 TypeScript 会默认查找 node_modules/@types 目录作为类型定义文件的根目录。

当 TypeScript 需要使用 node 模块的类型定义时，它会查找 @types/node 目录下的类型定义文件。如果在 typeRoots 中配置了其他路径，则 TypeScript 会在这些路径下继续查找类型定义文件。

如果找不到相应的类型定义文件，TypeScript 将无法理解 node 模块的 API，从而可能导致类型错误或其他问题。因此，在使用 node 模块时，确保已经安装了相应的 @types/node 包或其他类型定义文件。

在项目中，其实还可以看到 types目录，其实typescript是可以自动读取的。

#### 在 TypeScript 项目中，常见的声明文件主要有以下几种：

- .d.ts 文件：以 .d.ts 为后缀的文件，可以将它们与 JavaScript 文件或模块一起使用，用于提供 TypeScript 编译器需要的类型声明信息。这些文件通常用于描述已经存在的 JavaScript 库或框架的类型信息。例如，node.d.ts 就是 Node.js 的类型声明文件。
- @types 包：这是一组预先编写的声明文件，它们是由社区维护的，可以通过 npm 安装使用。在 TypeScript 编译器遇到一个未知的标识符时，它会在 @types 包中寻找与该标识符对应的类型定义。例如，@types/node 包提供了 Node.js 的类型声明。
- .tsx 文件：这些文件是 TypeScript 的 React 语法扩展，允许在 TypeScript 中编写 React 组件。

`/// <reference types="@tarojs/taro" />` 是 TypeScript 中的一个指令，用于引入类型声明文件。

在 TypeScript 中，可以使用类型声明文件来描述 JavaScript 库的类型信息，以便在使用该库时，能够获得更好的类型检查和自动补全等功能。

这个指令指定了引入 @tarojs/taro 模块的类型声明文件。这样，在编写代码时，TypeScript 编译器就能够根据这个类型声明文件来提供 Taro 框架的类型检查和自动补全等功能。

@tarojs/taro 模块是 Taro 框架自带的类型定义模块，可以在 Taro 项目中使用。这个模块的定义文件是在 Taro 源代码中的 @types/taro 文件夹中，这个文件夹中包含了 Taro 框架的类型定义文件。当你在 Taro 项目中使用 `/// <reference types="@tarojs/taro" />` 声明引入 @tarojs/taro 模块的时候，TypeScript 会自动去找这个模块的类型定义文件。


#### 选项 "jsx" 为“react-jsx”时，不能指定选项“jsxFactory” 怎么解决

<!-- 直接设置为空字符串即可。 -->

当 jsx 选项设置为 "react-jsx" 时，TypeScript 将使用 React.createElement 来解析 JSX，因此无法使用 jsxFactory 选项来指定另一个 JSX 工厂函数。

如果要使用其他 JSX 工厂函数，可以将 jsx 选项设置为 "preserve" 或 "react"，并在 tsconfig.json 文件中指定 jsxFactory 选项。例如：

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h"
  }
}
```
这将告诉 TypeScript 使用名为 h 的函数来解析 JSX。

jsx选项是TypeScript中的一个编译选项，用于指定JSX表达式的生成方式。JSX是一种JavaScript语言的扩展语法，它允许开发者在JavaScript代码中直接编写HTML代码，以更加简洁、易读的方式构建UI界面。

jsx选项有三种可选的值：

- preserve：将JSX语法转换成React.createElement函数调用，但不做额外处理；
- react：将JSX语法转换成React.createElement函数调用，并添加一些React特有的特性；
- react-jsx：将JSX语法转换成React.createElement函数调用，并添加一些React特有的特性，同时支持自定义JSX工厂函数。

其中，react-jsx是对react选项的一个扩展，它允许开发者指定一个自定义的JSX工厂函数来生成JSX表达式。这样可以在不同的框架或运行环境中使用不同的JSX表达式生成方式，实现更好的兼容性和灵活性。

在 TypeScript 中，jsxFactory 选项用于设置使用哪个函数来创建 JSX 元素，可选项包括：

- React.createElement
- h
- preact.h
- createElement
其中，React.createElement 用于使用 React 库时创建 JSX 元素，h 和 preact.h 用于使用 Preact 库时创建 JSX 元素，createElement 则用于使用其它 JSX 库时创建 JSX 元素。当然，也可以自定义函数来作为 jsxFactory 的选项值。


#### 文件是 CommonJS 模块; 它可能会转换为 ES 模块。ts(80001)

Parsing error: No Babel config file detected for /Users/yq/FE/taro_projects/castle/client/.eslintrc.js. Either disable config file checking with requireConfigFile: false, or configure Babel so that it can find the config files.eslint

更多参考：https://www.cnblogs.com/hmy-666/p/16441069.html

方式一：在 .eslintrc.js 文件里增加 

```json
parserOptions: {
  requireConfigFile: false, // <== ADD THIS
}
```

方式二：
具体原因就是babel的配置文件默认是在根目录进行查找的，而我编辑器打开的目录不是我现在运行项目的目录，所以 eslint 根据 eslint配置文件的 parserOptions ，知道了要使用babel对代码进行解析，但是解析babel需要使用到babel配置文件，由于找不到配置文件（babel配置文件默认需要放在根目录下，balbel官网有说），

所以会报错，此时聪明的网友想出了一个办法，就是配置requireConfigFile:false，本质上告诉eslint,不用给我查找这个配置文件了，因为我不需要它，所以从表面上的确可以解决这个报错，但是你在babel配置文件里写的东西自然也就失效了。

另外，这个root不为boolean类型时，应该触发了eslint的查找机制，使它遍历所有文件，也就查找到了babel的配置文件，所以‘ No Babel config file detected’这个报错也消失了。 也就是 root: ''


#### 找不到模块“@components/login/index”或其相应的类型声明。

出现这样的情况，不要上来就是.d.ts文件，因为写这个文件后，导致后续这个模块的任何更新，ts都不会自动检测了。。。出现问题要去尝试解决问题，而不是掩盖问题

之所以有 .d.ts文件，是为了一些不经常变动库准备的。

针对这种问题的解决思路：
1. 使用相对路径，比如 '../' 等在本文件夹内引用，看是否正常，如果正常说明模块本身是没有问题的
2. 还可以在根目录打开，试下
3. 最后，则需要查看配置是否正确，https://www.typescriptlang.org/tsconfig#paths

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
        "app/*": ["app/*"],
        "config/*": ["app/_config/*"],
        "environment/*": ["environments/*"],
        "shared/*": ["app/_shared/*"],
        "helpers/*": ["helpers/*"],
        "tests/*": ["tests/*"]
    },
}
```

- 每次配置修改后，可以重启老色批（LSP）或者文件关闭再打开
    - 重启：cmd + shift + p -》 重启 reload window
- tsc --showConfig 可以查看最终的tsconfig文件内容，项目里的tsconfig只是业务配置的，这个命令可以查看最终的配置


## 组件库

### vant

Vant Weapp 是一个基于微信小程序原生框架开发的 UI 组件库，它提供了一套丰富的小程序 UI 组件，可以帮助开发者快速搭建小程序页面。Vant Weapp 的架构设计主要包括以下几个方面：

- 组件的模块化设计：Vant Weapp 的组件采用模块化的设计，每个组件都是一个独立的模块，可以根据需要单独引入。这种模块化的设计使得组件之间的耦合度降低，提高了代码的可维护性和复用性。
- 组件的样式设计：Vant Weapp 的组件样式采用了类似于 Less 和 Sass 的预处理器来编写，这种预处理器可以使得样式的编写更加灵活和易于维护。同时，Vant Weapp 的样式设计也遵循了微信小程序的样式规范，使得组件的样式更加统一。
- 组件的API设计：Vant Weapp 的组件API设计简单易用，且具有一定的灵活性，可以满足不同的需求。组件的API设计也遵循了微信小程序的API设计规范，使得开发者可以更加方便地使用组件。
- 组件的可扩展性设计：Vant Weapp 的组件设计考虑了组件的可扩展性，可以通过插槽、事件等方式进行扩展，使得组件可以满足更加复杂的业务需求。同时，Vant Weapp 也提供了一些常用的插件和工具，可以帮助开发者更加方便地扩展组件。
- 组件的性能优化设计：Vant Weapp 的组件在设计时考虑了性能优化，采用了一些技术手段来提高组件的性能。例如，组件的渲染采用了虚拟DOM技术，可以减少页面的重排和重绘，提高页面的渲染效率。同时，组件的事件处理也采用了事件委托的方式，减少了事件绑定的数量，提高了页面的响应速度。

总的来说，Vant Weapp 的架构设计考虑了组件的模块化、样式设计、API设计、可扩展性设计和性能优化设计等多个方面，使得组件具有良好的可维护性、复用性和扩展性，同时也具有优秀的性能表现。