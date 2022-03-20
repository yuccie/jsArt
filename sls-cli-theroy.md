## 货运项目的接口调用方式
### bridge

货运的bridge，目前的工作方式大概为：H5侧需要引入fusion（kui代码库有）相关代码，然后如果在安卓或者ios上打开，就会注册从原生端过来的一些能力，在浏览器端打开注册不了。这些注册的能力都挂载在window.Fusion上，加载哪些模块的方法是window上的（应该是在哪个环节挂载上的）。

然后调用native上的方法是使用scheme协议打开一个隐藏的iframe，然后客户端拦截实现。遇到调用native端非实时的接口时，可以调回调，方式一样。

调用H5端的逻辑就是直接调用window对象上的方法。

具体H5端调用哪些方法，以及这些方法挂载哪个对象上，需要与端上的同学协商。

- $callHandler

在业界有很多开源的优秀RPC 框架，例如Spring Cloud、Dubbo、Thrift 等

## sls-service

- GIFT是基础架构部开发的一款静态资源存储服务，类似于阿里的OSS和Amazon的S3，其与普通存储（Fastdfs，cassandra，MFS等）的最大区别在于，GIFT不仅仅提供存储，而是基于存储的服务，提供与存储相关的一系列功能，比如CDN、权限、图片处理等。


## sls 服务

```
|-function
| |-hello.js // 会根据对应的folder名称生成对应的router，这个默认router就是/hello
```

## sls-cli

- 使用node_modules包里的sls，可以log调试
- request-promise-native has been deprecated because it extends the now deprecated request package
- const traceid = uuid.v4().replace(/-/g, '')
- git remote get-url origin 获取当前项目的远程git仓库；git config user.name
- os.homedir()，在mac中可以直接 echo $HOME 打印出来
- golden上报时提供当前仓库、当前用户在$HOME/.sls/.sls.json里的accessToken，以及上报的类型（cli启动还是页面等），但ua竟然写死了，原理很简单就是利用request-promise-native发送ajax请求，也没有做队列、节流什么处理。
- getLoggerWithTag利用函数柯力化，将console.log，consone.info等根据tab进行了包装，底层利用chalk显示不同的颜色
- npm view ${packageName} dist-tags --json --registry=http://npm.intra.xiaojukeji.com 查看某个npm包的版本号。
- minimist(argv.slice(2));the guts of optimist's argument parser without all the fanciful decoration
- semver，一个处理版本的库
- fsExtra.ensureFileSync，fs-extra adds file system methods that aren't included in the native fs module and adds promise support to the fs methods. It also uses graceful-fs to prevent EMFILE errors. It should be a drop in replacement for fs.
- resolvePkg，读取package.json，返回dev和生产的依赖
- Cosmiconfig searches for and loads configuration for your program.，尝试读取不同后缀的的配置文件
- ncjsm，CJS modules resolver
- _.mapValues(object, [iteratee=_.identity])，创建一个对象，这个对象的key与object对象相同，而value的话通过迭代函数决定
- _.forEach(collection, [iteratee=_.identity]),与其他"集合"方法一样，类似于数组，对象的 "length" 属性也会被遍历。想避免这种情况，可以用_.forIn 或者_.forOwn 代替。其实就是遍历对象，函数的参数分别为：value/key
- _.flatMap(collection, [iteratee=_.identity]) 创建一个扁平化（注：同阶数组）的数组，这个数组的值来自collection（集合）中的每一个值经过 iteratee（迭代函数） 处理后返回的结果，并且扁平化合并。
-   webpackConfig.mode(options.mode).context(options.context)，这里的context，其实相当于指定webpack查找文件的根目录，然后entry的话，就可以基于这个根目录再向下找对应的入口文件了
- _.template([string=''], [options=])，预编译模板，比如模板里有变量，这里可以替换为最终传入的数据
- 获取当前分支：git rev-parse --abbrev-ref HEAD；获取当前修改未提交的文件： git status --porcelain
- 
  
```js
'git@git.xiaojukeji.com:puhui/596-crm.git'.match(/([^/:]+)\/([^/:]+)\.git/)
// (3) ['puhui/596-crm.git', 'puhui', '596-crm', index: 23, input: 'git@git.xiaojukeji.com:puhui/596-crm.git', groups: undefined]


// meta.json
{
  "server": "serverless-puhui", // 底层迁移 severless 平台后，不需要声明和准备集群
  "handleType": "dynamicHtml", // 页面类型:api 动态接口、dynamicHtml 动态页面、json 静态接口、html 静态页面
  "template": "../../template/starui2.html", //  html 模板,支持没有模板、默认模板、相对路径模板、npm 包模板
  "middleware": "../../middleware/config.js,../../middleware/dubbo-596.js,../../middleware/mgr-auth-all.js",
  "from": "v3" // 兼容V2的发布
}

// 前端资源打包的webpack配置处理
// 除非静态页面，其他的都会输出到node目录
const outputFile = meta.handleType == 'html' ? `${shortHtmlPath}.html` : `../node/${shortHtmlPath}.html`

// pathname就是src下pages里每个页面的首页路径，比如：workOrderList/index
pages[pathname] = {
  entry: './src/pages/workOrderList/index.js',
  filename: outputFile, // 比如：'../node/workOrderList.html'
  templateContent: function ({htmlWebpackPlugin}) { /* 读取模板，插入插槽变量、注入代码片段等，最后返回code */ }
}
// 这就是多页应用打包的配置，entry是入口文件，filename是打包输出的文件


// 首页访问的列表来源：根据meta.json返回类型，根据git仓库信息返回仓库组以及仓库名；当然页面列表还是：文件夹名.类型
export const getPageList = function (ctx) {
  const globPath = './src/pages/**/meta.json'
  const suffixMap = {
    'api': 'node',
    'dynamicHtml': 'node',
    'html': 'html',
    'json': 'json'
  }
  const pageList = []
  // console.log('ctx', ctx)
  // ctx  /Users/didi/huoyun/596-crm
  glob.sync(globPath, {
    cwd: ctx
  }).forEach(function (entry: string) {
    const meta = JSON.parse(fs.readFileSync(path.resolve(ctx, entry), 'utf8')) // 实时更新
    const matchResult = entry.match(/\/pages\/(.+)\/meta.json$/)
    // matchResult
    //  [
    //   '/pages/workOrderList/meta.json',
    //   'workOrderList',
    //   index: 5,
    //   input: './src/pages/workOrderList/meta.json',
    //   groups: undefined
    // ]
    const pageShortPath= matchResult && matchResult[1]
    const name = `${pageShortPath || 'index'}.${suffixMap[meta.handleType] || 'errorHandleType'}`
    const {group = 'group', rep = 'rep'} = getGitGroupRep()
    pageList.push({
      name: name,
      url: `/${group}/${rep}/${name}`
    })
  })
  return pageList
}

function getGitGroupRep({ cwd = null } = {}) {
    var remote = '', matched;
    try {
        remote = exec('git remote get-url origin', { cwd: cwd, stdio: [null], timeout: 2000 }).toString().trim();
        // git@git.xiaojukeji.com:puhui/596-crm.git
        matched = remote.match(/([^/:]+)\/([^/:]+)\.git/) || [];
        // 'git@git.xiaojukeji.com:puhui/596-crm.git'.match(/([^/:]+)\/([^/:]+)\.git/)
        // ['puhui/596-crm.git', 'puhui', '596-crm', index: 23, input: 'git@git.xiaojukeji.com:puhui/596-crm.git', groups: undefined]
    }
    catch (err) {
        return {};
    }
    return {
        remote,
        group: matched[1] || '',
        rep: matched[2] || ''
    };
}




// node端资源打包的webpack配置处理
// 顾名思义，前端和node的资源都需要打包处理，因此也需要webpack配置
// 服务端代码构建webpack配置
export const getServerWebpackConfig = function (options) {
  // options 为全局合并的配置
  let result = {
    mode: options.mode || "production",
    optimization: {
      minimize: false // 服务端代码始终不压缩
    },
    devtool: options.mode == 'production'? '': 'source-map',
    context,
    entry: getMultiServerConfig('./src/pages/*/service.?(ts|js)'),
    output: {
      path: path.resolve(context, outputServer),
      filename: "[name].js",
      libraryTarget: "commonjs2",
    },
    target: 'node',
    module: {
      rules: [
        {
          resourceQuery: /sma-service/,
          // service.js 保留给js打包， sourcemap
          include: [
            path.resolve(context, "./src/pages")
          ],
          loader: require.resolve('./loader/service-loader'),
          options: {
            slsOptions: options
          }
        },
        {
          include: [
            path.resolve(context, "./src")
          ],
          test: /.tsx?$/,
          loader: 'ts-loader'
        }
      ]
    },
    resolve: {}
  }

  // 支持service.js 配置alias
  if (options.chainWebpack && options.chainWebpack.resolve) {
    lodash.merge(result.resolve, options.chainWebpack.resolve)
  }
  return result
}

function getMultiServerConfig(globPath: string) {
  var entry = {}
  glob.sync(globPath).forEach(function (file: string) {
    var matchResult = file.match(/\.\/src\/pages\/(.+service)(.(ts|js)$)/)
    var pathname = matchResult[1] // dynamic/service
    var shortServerPath = pathname.replace(/\/[^/]+$/, '')
    entry[shortServerPath] = file + '?sma-service' // service-loader
  })
  // entry比如：{ activityDetail: './src/pages/activityDetail/service.js?sma-service' },
  // 其实说白了，service.js是服务端打包的入口文件
  return entry
}



```

```js
// webpackDevServer 使用中间件
app.use(devIndexHtml(that.options))

// 中间件具体逻辑
import {getPageList} from '../utils'
import {request, golden} from "@didi/sls-cli-utils"

export default (options: any) => {
  return (req: any, res: any, next: any) => {
    if (req.path === '/') {
      golden('sma-light-getDevIndex','sma-light-访问开发首页')
      const pageList = getPageList(options.context) // 实时更新
      // pageList: [{ name: name, url: url }]
      request.post('https://star.xiaojukeji.com/m/__devIndex', {
        body: {
          pageList
        },
      }).then(function ({body, statusCode}) {
        // 这个body就是最终填充了数据的完整html，dev打开系统时的首页
        res.status(statusCode).send(body)
      }).catch(function (err) {
        golden('sma-light-getDevIndex-error','开发首页获取异常', {
          err
        })
        res.status(500).send(err)
      })
    } else {
      return next()
    }
  }
}
```

```html
<!DOCTYPE html>
<html lang="zh-cn">

<head>
	<meta charset="utf-8" />
	<meta name="keywords" content="">
	<meta name="description" content="">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>dev页面列表</title>
	<link type="image/x-icon" href="//img.kuaidadi.com/cms/img/upload_df9978f80edeabfd9cd91469d34bb715.ico"
		rel="shortcut icon">
	<link rel="stylesheet" href="//assets.xiaojukeji.com/??kui/base/1.0.24/base.css" media="all">
	<script type="text/javascript"
		src="//assets.xiaojukeji.com/??kui/lib/1.4.0/zepto.js,kui/base/1.0.24/base.js,kui/base/1.0.24/event.js,kui/lib/1.4.0/zepto/detect.js,kui/base/1.0.24/platform.js,kui/native/1.4.16/didinative.js,kui/native/1.4.16/dididriver.js,kui/lib/1.4.0/promise.js,kui/lib/1.4.0/sha1.js,kui/dataing/2.0.7/wsgsig.js,kui/dataing/2.0.7/kop.js,kui/native/1.4.16/native.js,kui/native/1.4.16/didies.js,kui/login/4.3.13/unifiedLogin.js,kui/golden/4.5.15/golden.js,kui/lib/1.4.0/vue.js"
		crossorigin></script>

	<style type="text/css">
	  /* 此处省略很多css样式文件 */
	</style>

	<script type="text/javascript">
		var __global_dynamic_public_path__ =  "//assets.xiaojukeji.com" ; 
	</script>
	<!--[if lt IE 9]> <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script> <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script> <![endif]-->
</head>

<body>
	<div class="container">
		<div id="app" v-cloak>
			<section class="hero is-primary is-bold is-medium">
				<div class="hero-body">
					<div class="container">
						<h1 class="title">页面列表</h1>
						<h2 class="subtitle">欢迎反馈问题、建议和贡献</h2>
					</div>
				</div>
			</section>
			<div class="holder"> <input type="text" class="search" v-model="searchValue" @input="searchHandler(searchValue)" placeholder="搜索"/>
				<ul>
					<li v-for="item in curcentPageList" :key="item.name" @click="openPage(item)">
						<span >{{item.name}}</span> </li>
				</ul>
			</div>
		</div>
		<script type="text/javascript" charset="utf-8">
      // 遍历./src/pages/**/meta.json，以及根据每个页面的类型，以及该仓库所属的group、rep等，拼接最后的如下格式：
      // name: 文件夹名字.类型
      // url: `/${group}/${rep}/${name}`
      // sls dev时，
      // [{"name":"acceleratorConfiguration.node","url":"/puhui/596-crm/acceleratorConfiguration.node"}]
			window.pageList =  [] ;  
		</script>
	</div>
	<script type="text/javascript">
		window.starPageEnv = "online"; window.KUIGlobalConfig = window.KUIGlobalConfig || {};window.goldenConfig = window.goldenConfig || {};window.KUIGlobalConfig.renderType = "node";window.GoldenTracker = window.GoldenTracker || "omegad6b5832cfb";window.goldenConfig.attrs = {};window.KUIGlobalConfig.pageHost = "page.kuaidadi.com";window.KUIGlobalConfig.nodeHost = "star.xiaojukeji.com";window.KUIGlobalConfig.didiPageHost = "page.xiaojukeji.com"; 
	</script>
	<script type="text/javascript">
		$(function () {
    let pageList = window.pageList
    new Vue({
        data: function data () {
            return {
                curcentPageList: pageList,
                searchValue: ''
            }
        },
        methods: {
            searchHandler: function(searchValue) {
               this.curcentPageList = pageList.filter(function(item){
                   return item.name.indexOf(searchValue.toLowerCase()) != -1
                })
             },
             openPage: function(item){
                 window.open(item.url,'_blank');
             }
        }
    }).$mount('#app')
}) 
	</script>
</body>

</html>
```



执行 `sls xxx` 命令的整个过程：
1. sls-cli中bin目录启动，首先通过golden上报埋点(启动cli以及查看sls版本都会上报)，同时打印不同的日志，同时process.on监听各种异常事件信号（SIGINT，SIGTERM，exit等），golden上报并退出，最后执行start函数启动
2. start函数逻辑中，首先如果没有注明--update=false，则检查cli版本；然后初始化cli = new DDCli(process.argv)，同时执行cli.init()、cli.run()
3. 而 DDCli 继承至`@didi/sls-cli-core`，继承的同时重写loadDefaultPlugin方法，用来加载各个插件(sls-cli-plugin-config|init|build|dev|deploy|rollback|doc插件等)。
4. DDCli初始化，首先执行@didi/sls-cli-core的cli构造函数（node_modules/@didi/sls-cli-core/src/class/cli.ts），cli构造函数又初始化Core构造函数（读取pkg依赖、slsConfig及用户sls.json（电脑配置sls账户: ~/.sls/sls.json），实例初始化化weppackChain），最终的结果是，将Core初始化的实例及命令行上的argv挂载在cli实例上了，同时在实例上注册加载插件的方法：`loadDefaultPlugin、loadCorePlugin、loadServicePlugin`，下面有具体实现。
5. cli上有init方法（加载插件及执行core.init方法）、run方法（执行core.invoke）
6. 加载插件方法内部依次执行：loadDefaultPlugin（这个是cli那里实现的，这里只是空函数）、loadCorePlugin（内部执行this.core.addPlugin(PluginManager)，其中PluginManager是一个类，作用是尝试读写用户的sls.json数据并重新写入）、loadServicePlugin方法（这个方法主要通过this.core.addPlugin，加载依赖中和sls.config.js中的配置插件，主要是单个项目级的插件）；综上loadDefaultPlugin是加载核心插件，loadCorePlugin是加载用户信息插件，loadServicePlugin是用来加载项目中的插件。
7. this.core.addPlugin 这个方法，入参是一个插件对象，每个插件对象有commands、hooks属性等，然后插入时会判断是否已经插入过，然后将commands对象对存储到一个this.commands对象中，同时提供了重写全局命令的方式（支持 overwrite true 来覆盖全局命令的生命周期、options参数）。另外还将插件里的hooks都放在this.hooks对象上，hooks对象可以有多个hook，每个hook都对应一个数组可以放多个事件，最后将插件都push到this.plugins里了
8. core.init其实就是执行上一步this.plugins数组里的插件的init方法（如果有，但多数都没有，其实就是插件自己是否需要初始化），而且是await 串行执行的。。。难道和顺序有关系？？？没有效率问题？
9. 然后再执行core.run方法，也就是core.invoke，也就是调用，入参是命令行里的参数；首先调用遍历调用this.hooks['before:invoke'][i].hook()，然后从this.commands找到待执行命令行输入的命令，然后根据每个command对象生成events数组，这个数组就是对应着不同阶段的hooks（比如before:xxx，after:xxx等，其实就是一个命令执行的前后及执行中），最后遍历执行这些hooks，如果hooks中有chainWebpack相关的，则吧new WebpackChain()生成的实例传入。
10. 到这里，插件的安装注册、hooks等都各就各位了。。。同时也通过core.invoke(this.commandsArray)执行了传入的命令，从而执行对应的hooks；
11. 更多逻辑参考如下：


**sls dev：阶段**假设输入的sls dev 则执行的是 @didi/sls-cli-plugin-dev
1. 输入sls dev 打印hooks，如下，而hooks是根据events来的，events是根据输入命令来确定的。。。
2. 但每个插件都需要什么命令和生命周期，这个怎么确定？？？这个根据插件的定位，自己设置，参考插件的编写方法
3. dev这个插件，本来注册了9个生命周期钩子（三个hook分别对应前中后），但实际上，项目中只匹配到了5个钩子；其实就是我虽然定义了9个钩子，但是只用到了5个
4. 根据返回的hooks数组，主要激活了sls-cli-plugin-sma-light和sls-cli-plugin-dev两个插件里的生命周期钩子
5. 

```js
// sls dev时，commandsArray及command
[ 'dev' ] 
command: {
  description: 'dev a project in local',
  usage: 'sls dev --[option]=[value]',
  lifecycleEvents: [ 'chainWebpack', 'webpackServer', 'runtimeServer' ],
  options: {
    '--host': 'specify host (default: 0.0.0.0)',
    '--port': 'specify port (default: 9090)',
    '--open': 'open browser on server start (default: false)',
    '--copy': 'copy url to clipboard on server start (default: false)',
    '--inspect': 'specify runtime server inspect port (default: 9229)',
    '--runtimePort': 'specify runtime server port (default: 8080)'
  },
  pluginName: 'sls-cli-plugin-sma-light',
  key: 'dev',
  commands: {}
}

// sls dev时，events数组
[
  'before:dev:chainWebpack',
  'dev:chainWebpack',
  'after:dev:chainWebpack',
  'before:dev:webpackServer',
  'dev:webpackServer',
  'after:dev:webpackServer',
  'before:dev:runtimeServer',
  'dev:runtimeServer',
  'after:dev:runtimeServer'
]

// sls dev时，hooks数组
[
  {
    // chainWebpack这个钩子主要的工作是：获取插件内部的配置，覆盖从Core实例化时的devServer的默认配置，然后将之前生成的webpackChain实例及配置传下去，
    // 传下去后，会根据配置重置webpack-base里的一些配置（设置项目上下文及入口、loader、分包、runtimeChunk、HTMLPlugin处理，以及多页处理等，还加载了其他的一些插件），还有webpack-css（就是处理css样式的webpack配置）
    // 多页处理的话，会遍历多页，生成多份相关的配置，因为dev是一个基础包，这里pages为空对象
    // sls-cli-plugin-dev内部会调用sls-cli-plugin-build插件，用来构建webpack的配置，对于分包的一些配置，并没有使用项目中的配置，需要重写覆盖
    event: 'dev:chainWebpack',
    pluginName: 'sls-cli-plugin-dev',
    hook: [Function: bound chainWebpack] AsyncFunction,
    plugin: DevPlugin {
      pluginName: 'sls-cli-plugin-dev',
      options: {},
      argv: [Object],
      commands: [Object],
      hooks: [Object],
      slsGlobalConfigPath: '/Users/didi/.sls/sls.json',
      core: [Core],
      utils: [Object],
      cli: [Object],
      service: [Object],
      eventBus: [EventEmitter],
      store: [Object]
    }
  },
  {
    // 这个插件里有多个钩子，chainWebpackDev这个钩子主要做了这几件事：端口占用监测、devServer设置cors响应头、拦截首页请求，通过http-proxy-middleware设置代理
    // webapckDevserver起的端口是8080开始
    // 拦截首页请求：如果是访问页面首页，则根据pages里的文件生成列表，如果不是，则直接放行，放行的逻辑怎样？
    event: 'dev:chainWebpack',
    pluginName: 'sls-cli-plugin-sma-light',
    hook: [Function: bound chainWebpackDev] AsyncFunction,
    plugin: SmaLightPlugin {
      pluginName: 'sls-cli-plugin-sma-light',
      options: {},
      argv: [Object],
      commands: [Object],
      hooks: [Object],
      slsGlobalConfigPath: '/Users/didi/.sls/sls.json',
      core: [Core],
      utils: [Object],
      cli: [Object],
      service: [Object],
      eventBus: [EventEmitter],
      store: [Object]
    }
  },
  {
    // 插件sls-cli-plugin-dev中的webpackServer钩子主要做了以下事情：
    // 1、菊花转
    // 2、根据options.chainWebpack是否为函数或对象，进行特殊处理
    // 3、端口占用监测
    // 4、配置合并
    // 5、添加热更新入口文件，其实就是热更新的文件，放在entry里
    // 6、支持多份webpack配置
    // 7、启动webpackServer，暴露compiler的invalid、done钩子，并触发sls dev插件
    // 8、最后监听端口9090、并监听异常信号
    event: 'dev:webpackServer',
    pluginName: 'sls-cli-plugin-dev',
    hook: [Function: bound webpackServer] AsyncFunction,
    plugin: DevPlugin {
      pluginName: 'sls-cli-plugin-dev',
      options: {},
      argv: [Object],
      commands: [Object],
      hooks: [Object],
      slsGlobalConfigPath: '/Users/didi/.sls/sls.json',
      core: [Core],
      utils: [Object],
      cli: [Object],
      service: [Object],
      eventBus: [EventEmitter],
      store: [Object]
    }
  },
  {
    // 这个钩子，是个空函数
    event: 'dev:runtimeServer',
    pluginName: 'sls-cli-plugin-dev',
    hook: [Function: bound runtimeServer] AsyncFunction,
    plugin: DevPlugin {
      pluginName: 'sls-cli-plugin-dev',
      options: {},
      argv: [Object],
      commands: [Object],
      hooks: [Object],
      slsGlobalConfigPath: '/Users/didi/.sls/sls.json',
      core: [Core],
      utils: [Object],
      cli: [Object],
      service: [Object],
      eventBus: [EventEmitter],
      store: [Object]
    }
  },
  {
    // 这个钩子主要做了以下事情：
    // 1、端口监测
    // 2、找到@didi/sma-light-runtime这个包main字段的绝对路径，并fork一个子进程，这个子进程就是启动一个express服务，
    // 3、根据初始化Core时EventEmitter的通信方式，监听child.stdout.on、child.stderr.on并打印日志
    event: 'dev:runtimeServer',
    pluginName: 'sls-cli-plugin-sma-light',
    hook: [Function: bound runtimeServer] AsyncFunction,
    plugin: SmaLightPlugin {
      pluginName: 'sls-cli-plugin-sma-light',
      options: {},
      argv: [Object],
      commands: [Object],
      hooks: [Object],
      slsGlobalConfigPath: '/Users/didi/.sls/sls.json',
      core: [Core],
      utils: [Object],
      cli: [Object],
      service: [Object],
      eventBus: [EventEmitter],
      store: [Object]
    }
  }
]
```

sls build 时的数据如下：

```js
// events
[
  'before:build:clean',
  'build:clean',
  'after:build:clean',
  'before:build:chainWebpack',
  'build:chainWebpack',
  'after:build:chainWebpack',
  'before:build:build',
  'build:build',
  'after:build:build'
]

// hooks
[
  {
    // 这个hooks就是将之前的构建文件删除掉。
    event: 'build:clean',
    pluginName: 'sls-cli-plugin-build',
    hook: [Function: bound clean] AsyncFunction,
    plugin: BuildPlugin {
      pluginName: 'sls-cli-plugin-build',
      options: [Object],
      argv: [Object],
      commands: [Object],
      hooks: [Object],
      slsGlobalConfigPath: '/Users/didi/.sls/sls.json',
      core: [Core],
      utils: [Object],
      cli: [Object],
      service: [Object],
      eventBus: [EventEmitter],
      store: [Object]
    }
  },
  {
    // 这个hooks就是，逻辑如下
    // this.cli.info('Run sma-light clean')
    // rm(path.resolve(this.options.context, this.options.outputServer))
    // rm(path.resolve(this.options.context, this.options.output))
    event: 'build:clean',
    pluginName: 'sls-cli-plugin-sma-light',
    hook: [Function: bound clean] AsyncFunction,
    plugin: SmaLightPlugin {
      pluginName: 'sls-cli-plugin-sma-light',
      options: [Object],
      argv: [Object],
      commands: [Object],
      hooks: [Object],
      slsGlobalConfigPath: '/Users/didi/.sls/sls.json',
      core: [Core],
      utils: [Object],
      cli: [Object],
      service: [Object],
      eventBus: [EventEmitter],
      store: [Object]
    }
  },
  {
    // chainWebpack这个钩子用来，处理webpack的构建配置，打包的一系列配置，和dev时一样
    event: 'build:chainWebpack',
    pluginName: 'sls-cli-plugin-build',
    hook: [Function: bound chainWebpack] AsyncFunction,
    plugin: BuildPlugin {
      pluginName: 'sls-cli-plugin-build',
      options: [Object],
      argv: [Object],
      commands: [Object],
      hooks: [Object],
      slsGlobalConfigPath: '/Users/didi/.sls/sls.json',
      core: [Core],
      utils: [Object],
      cli: [Object],
      service: [Object],
      eventBus: [EventEmitter],
      store: [Object]
    }
  },
  {
    // 这个钩子主要做以下事情：
    // 1、覆盖部分配置
    // 2、兼容OE
    // 3、合并配置
    // 4、输出umd包
    event: 'build:chainWebpack',
    pluginName: 'sls-cli-plugin-sma-light',
    hook: [Function: bound chainWebpack] AsyncFunction,
    plugin: SmaLightPlugin {
      pluginName: 'sls-cli-plugin-sma-light',
      options: [Object],
      argv: [Object],
      commands: [Object],
      hooks: [Object],
      slsGlobalConfigPath: '/Users/didi/.sls/sls.json',
      core: [Core],
      utils: [Object],
      cli: [Object],
      service: [Object],
      eventBus: [EventEmitter],
      store: [Object]
    }
  },
  {
    // bound build 构建，主要做以下事情：根据配置构建（支持多份配置）结束，打印日志。
    event: 'build:build',
    pluginName: 'sls-cli-plugin-build',
    hook: [Function: bound build] AsyncFunction,
    plugin: BuildPlugin {
      pluginName: 'sls-cli-plugin-build',
      options: [Object],
      argv: [Object],
      commands: [Object],
      hooks: [Object],
      slsGlobalConfigPath: '/Users/didi/.sls/sls.json',
      core: [Core],
      utils: [Object],
      cli: [Object],
      service: [Object],
      eventBus: [EventEmitter],
      store: [Object]
    }
  }
]
```

npm run deply 做的工作：
1. 检查本地及远程代码信息
2. 根据git信息获取远程服务的信息
3. 根据服务信息发起odin部署工单
4. 轮训查询部署情况

```js

```


```js
// 一些服务节点信息
const backupMap = {
  "2c":["serverless-puhui.nodejs.daijia.didi.com", "puhui.sls.daijia.didi.com"],
  "mis":["serverless-mis.nodejs.daijia.didi.com", "puhui-mis.sls.daijia.didi.com"]
}

const convertMap = {
  "serverless-mis": "serverless-mis.nodejs.daijia.didi.com",
  "serverless-puhui": "serverless-puhui.nodejs.daijia.didi.com"
}
```



1、node_modules/@didi/sls-cli/bin/sls.js

```js
// node_modules/@didi/sls-cli/bin/sls.js
async function start () {

  if (process.argv.indexOf('--update=false') == -1){
    let foreUpdate = (process.argv.indexOf('--update') != -1 || process.argv.indexOf('--update=true') != -1)
    const checkInfo = await checkVersion(packageConfig.name, packageConfig.version, foreUpdate)
    if (checkInfo.needUpate) {
      golden('need-update','cli需要升级', {
        currentVersion: checkInfo.currentVersion,
        latestVersion: checkInfo.latestVersion
      })
      logger.info(`Global sls current version ${checkInfo.currentVersion} upgrade to ${checkInfo.latestVersion}`)
      let start = Date.now()
      try {
        execSync(`npm install @didi/sls-cli -g --registry=http://npm.intra.xiaojukeji.com --loglevel=error --unsafe-perm`, {
          stdio: ['inherit','inherit','inherit']
        })
      } catch (err) {
        golden('update-error','cli升级失败', {
          err: err.message || err,
          stack: err.stack
        })
        logger.error(err.message)
        process.exit(1)
      }
      golden('update-success—process-time','cli升级成功耗时', {
        process_time: (Date.now() - start)/1000
      })
      logger.done(`Upgrade success, sls version is ${checkInfo.latestVersion} now`)
    } else if (!checkInfo.needUpate && foreUpdate) {
      logger.info(`Global sls current version ${checkInfo.currentVersion} is latest`)
    }
  }
  const cli = new DDCli(process.argv)
  await cli.init()
  await cli.run()
}

start().catch(errorHandler)


// node_modules/@didi/sls-cli/src/index.ts
import { Cli } from '@didi/sls-cli-core';
import ConfigPlugin from '@didi/sls-cli-plugin-config'; // 监测并重写用户系统级的Serverless Access Token配置
import InitPlugin from '@didi/sls-cli-plugin-init'; // init a project
import BuildPlugin from '@didi/sls-cli-plugin-build'; // build a project in local
import DevPlugin from '@didi/sls-cli-plugin-dev'; // dev a project in local
import DeployPlugin from '@didi/sls-cli-plugin-deploy'; // deploy a project
import RollbackPlugin from '@didi/sls-cli-plugin-rollback';
import DocPlugin from '@didi/sls-cli-plugin-doc'; // open document about serverless

export class DDCli extends Cli {
  loadDefaultPlugin() {
    this.core.addPlugin(ConfigPlugin);
    this.core.addPlugin(InitPlugin);
    this.core.addPlugin(BuildPlugin);
    this.core.addPlugin(DevPlugin);
    this.core.addPlugin(DeployPlugin);
    this.core.addPlugin(RollbackPlugin);
    this.core.addPlugin(DocPlugin);
  }
}
```

2、node_modules/@didi/sls-cli-core/src/class/cli.ts
```js
// node_modules/@didi/sls-cli-core/src/class/cli.ts
import path from "path"
import minimist from 'minimist'
import {Core, PluginManager} from '../'
import {getLoggerWithTag, isSlsPlugin, golden} from "@didi/sls-cli-utils"

const logger = getLoggerWithTag('sls-cli')
const cjsResolve = require('ncjsm/resolve/sync');

export class Cli {
  public argv: any;
  public core: any;
  public commandsArray: string[];

  constructor(argv: any) {
    this.argv = minimist(argv.slice(2));
    this.commandsArray = [].concat(this.argv._);
    this.argv.command = this.commandsArray.join(' ')
    this.core = new Core({
      options: {},
      argv: this.argv
    })
  }

  public async init() {
    await this.loadPlugins();
    await this.core.init();
  }

  public async run() {
    await this.core.invoke(this.commandsArray);
  }

  private async loadPlugins() {
    this.loadDefaultPlugin();
    this.loadCorePlugin();
    this.loadServicePlugin();
  }

  private loadCorePlugin() {
    this.core.addPlugin(PluginManager);
  }

  // 加载默认插件
  public loadDefaultPlugin() {
  }

  // 加载工程中插件
  public loadServicePlugin() {
    var pkg = this.core.service.package
    var context = this.core.service.context
    Object.keys(pkg.devDependencies || {})
      .concat(Object.keys(pkg.dependencies || {}))
      .filter(isSlsPlugin)
      .forEach(name => {
        try {
          golden('load-service-plugin', '加载服务中插件', {
            pluginName: name.replace('@didi/', '')
          })
          let configPath = pkg.dependencies[name] || pkg.devDependencies[name]
          let absoluteLocalPath = ''
          if (configPath.startsWith('./') || configPath.startsWith('../')) {
            absoluteLocalPath = path.resolve(context, configPath);
          } else if (configPath.startsWith('/')) {
            absoluteLocalPath = configPath
          } else {
            absoluteLocalPath = (cjsResolve(context, name).realPath);
          }
          if (!absoluteLocalPath) {
            throw new Error(`Plugin dependency ${name} is not installed.`)
          }
          this.core.addPlugin(require(absoluteLocalPath).default);
        } catch (err) {
          logger.error(err)
          golden('load-service-plugin-error', '加载服务中插件失败', {
            pluginName: name,
            err: err.message || err,
            stack: err.stack
          })
          process.exit(1)
        }
      })
    let { config: { localPlugins } } = this.core.service
    localPlugins = localPlugins || []
    localPlugins.forEach((pluginPath: string) => {
      try {
        const pluginLocalPath = path.resolve(context, pluginPath)
        this.core.addPlugin(require(pluginLocalPath).default || require(pluginLocalPath))
      } catch(err) {
        logger.error(err)
        process.exit(1)
      }
    })
  }
}

```

3、node_modules/@didi/sls-cli-core/src/class/core.ts
```js
import {ICommand, IHook, IPlugin, IPluginCommands} from '../types/plugin'
import {ICore, ICoreCommand, ICoreCommands, ICoreHooks, IService, IStore} from '../types/core'
import {formatHelp, logger, resolvePkg, ensureFileSync, golden, getSlsConfig} from "@didi/sls-cli-utils"
import * as _ from 'lodash'
import WebpackChain  from 'webpack-chain'
import {EventEmitter} from 'events'
import * as path from "path";
import {homedir} from "os";
const globalVar: any = global

export class Core implements ICore {
  public options: any
  public plugins: IPlugin[] = []
  public commands: ICoreCommands = {}
  public hooks: ICoreHooks = {}
  public store: IStore
  public eventBus: EventEmitter
  public chainWebpackConfig: any
  public service: IService
  public slsGlobalConfigPath: string

  constructor(options: any) {
    let context = process.cwd()
    this.options = options

    this.service = {
      context,
      package: resolvePkg(context),
      config: getSlsConfig()
    }

    this.slsGlobalConfigPath = path.join(homedir(), '.sls/sls.json')
    this.store = new Map()
    this.eventBus = new EventEmitter()
    this.chainWebpackConfig = new WebpackChain()

    ensureFileSync(this.slsGlobalConfigPath)
  }

  public async init() {
    for (var i = 0; i < this.plugins.length; i++) {
      if (this.plugins[i].init) {
        await this.plugins[i].init()
      }
    }
  }

  public async invoke(commandsArray?: string[]) {
    let beforeInvokeHooks = this.hooks['before:invoke']
    if (beforeInvokeHooks) {
      for (var i = 0; i < beforeInvokeHooks.length; i++) {
        await beforeInvokeHooks[i].hook()
      }
    }

    const command = this.getCommand(commandsArray);
    const events = this.getEvents(command);
    const hooks = this.getHooks(events);

    golden('exec-command', '执行命令', {
      pluginName: command.pluginName,
      cmd: process.argv.slice(2).join(' ')
    })
    golden(`exec-command-${commandsArray.join('-')}`, '执行具体命令', {
      pluginName: command.pluginName,
      cmd: process.argv.slice(2).join(' ')
    })

    globalVar._loadSpinner && globalVar._loadSpinner.stop()
    globalVar._loadSpinner = null
    if (this.options.argv.h || this.options.argv.help || !commandsArray.length) {
      golden('displayHelp', '查看帮助', {
        cmd: this.options.argv.command
      })
      this.displayHelp(commandsArray, command)
      process.exit(0)
    }

    // 当前执行命令，涉及到的插件加载先后options配置 < 工程配置 < 命令行配置 的合并值
    // todo 添加合并时覆盖的warn提示
    var flags = {}
    for (let i = 0; i < hooks.length; i++){
      if (!flags[hooks[i].pluginName]) {
        flags[hooks[i].pluginName] = true
        _.merge(this.options.options, hooks[i].plugin.constructor.options || {});
      }
    }
    _.merge(this.options.options, this.service.config, this.options.argv);

    golden('cmd-loading-process-time','命令loading耗时', {
      cmd: process.argv.slice(2).join(' '),
      process_time: (Date.now() - globalVar._gStartTime)/1000
    })
    for (let i = 0; i < hooks.length; i++) {
      if (/chainWebpack/.test(hooks[i].event)){
        await hooks[i].hook(this.chainWebpackConfig)
      } else {
        await hooks[i].hook()
      }
    }
  }

  public addPlugin(Plugin: any) {
    const plugin = new Plugin(this, this.options, Plugin.pluginName);
    var hasPlugin = this.plugins.some(plugin => plugin instanceof Plugin)
    if (hasPlugin) {
      return;
    }
    this.loadCommands(plugin);
    this.loadHooks(plugin);
    this.plugins.push(plugin);
  }

  // 添加插件命令到this.commands
  private loadCommands(plugin: any) {
    const pluginName = plugin.constructor.pluginName || plugin.constructor.name
    plugin.pluginName = pluginName
    _.forEach(plugin.commands, (command: ICommand, key: string) => {
      var processDoneCommand = this.processCommand(pluginName, command, key)
      // 递归深度合并
      this.commands[key] = _.merge({}, this.commands[key], processDoneCommand);

      // 当命令与全局命令不存在公用部分
      // 支持 overwrite true 来覆盖全局命令的生命周期、options参数
      if (processDoneCommand.overwrite) {
        if (processDoneCommand.lifecycleEvents){
          this.commands[key].lifecycleEvents = processDoneCommand.lifecycleEvents
        }
        if (processDoneCommand.options){
          this.commands[key].options = processDoneCommand.options
        }
      }
    })
  }

  // 处理命令/子命令
  private processCommand(pluginName: string, details: ICommand, key: string) {
    details.pluginName = pluginName
    const commands: IPluginCommands = _.mapValues(details.commands, (subDetails: ICommand, subKey: string) => {
      golden('has-child-command', '包含子命令', {
        pluginName,
        cmd: `${key}:${subKey}`
      })
      return this.processCommand(pluginName, subDetails, `${key}:${subKey}`)
    });
    return Object.assign({}, details, {key, pluginName, commands});
  }

  // 添加插件生命周期函数到this.hooks
  private loadHooks(plugin: any) {
    const pluginName = plugin.constructor.pluginName || plugin.constructor.name
    _.forEach(plugin.hooks, (hook: IHook, event: string) => {
      this.hooks[event] = this.hooks[event] || [];
      this.hooks[event].push({
        event,
        pluginName,
        hook,
        plugin
      });
    });
  }

  private getCommand(commandsArray: string[]): any {
    return _.reduce(
      commandsArray,
      (current, name, index) => {
        const commandExists = name in current.commands;

        if (!commandExists) {
          golden('not-found-command', '执行命令不存在', {
            cmd: process.argv.slice(2).join(' ')
          })
          globalVar._loadSpinner && globalVar._loadSpinner.stop()
          logger.error('Not found command  ', 'sls-cli-core')
          process.exit(0)
        } else {
          return current.commands[name] || {}
        }
      },
      {commands: this.commands}
    );
  }

  private getEvents(command: ICoreCommand) {
    return _.flatMap(command.lifecycleEvents, event => [
      `before:${command.key}:${event}`,
      `${command.key}:${event}`,
      `after:${command.key}:${event}`,
    ]);
  }

  private getHooks(events: string[]) {
    return _.flatMap(events, event => this.hooks[event] || []);
  }

  private displayHelp(commandsArray: string[], command: ICoreCommand) {
    let commandList: any = {};
    if (commandsArray && commandsArray.length) {
      commandList = this.getCommandHelp(command, commandsArray.join(' '));
    } else {
      commandList = this.flatCommandsHelp(this.commands)
    }
    logger.log(formatHelp(commandList))
  }

  private flatCommandsHelp(commands: any) {
    var commandList: any = []
    Object.keys(commands).forEach(name => {
      let command = commands[name]
      if (!command || !command.lifecycleEvents) {
        return;
      }
      commandList.push(this.getCommandHelp(command, command.key.replace(/:/, ' ')))
      // 子命令处理
      if (command.commands) {
        commandList = commandList.concat(this.flatCommandsHelp(command.commands))
      }
    })
    return commandList
  }

  private getCommandHelp(command: ICoreCommand, commandName: string) {
    var prefixLength = 12
    var result: any = {
      commandName: 'Command:'.padEnd(prefixLength) + command.pluginName + ':sls ' + commandName,
      optionList: Object.keys(command.options || {}).map(param => {
        return {
          param,
          desc: command.options[param]
        };
      }),
    }

    if (command.usage) {
      result.usage = 'Usage:'.padEnd(prefixLength) + command.usage
    }
    if (command.description) {
      result.description = 'Desc:'.padEnd(prefixLength) + command.description
    }
    return result
  }
}

```
```js
export const checkVersion = async function (packageName: string, currentVersion: string, foreUpdate: boolean) {
  // 获取自动更新的最小版本号，减少打扰
  let needUpdate = false
  if (!foreUpdate) {
    let start = Date.now()
    let {body, statusCode} = await request.get('https://dj.kuaidadi.com/mgr/sls_cli_mini_version', {})
    golden('get-mini-version-process-time', '获取自动更新最小sls版本号耗时', {
      process_time: (Date.now() - start)/1000
    })
    if (statusCode == 200 && body.result.miniVersion) {
      needUpdate = semver.lt(currentVersion, body.result.miniVersion)
    }
  }

  if (needUpdate || foreUpdate) {
    let start = Date.now()
    try {
      var result = execSync(`npm view ${packageName} dist-tags --json --registry=http://npm.intra.xiaojukeji.com`, {
        stdio: [null],
        timeout: 10000
      }).toString();
    } catch (err) {
      golden('get-last-version-error', '获取最新sls版本号', {
        err
      })
      logger.error(err)
      process.exit(1)
    }
    golden('get-last-version-process-time', '获取最新sls版本号耗时', {
      process_time: (Date.now() - start)/1000
    })
    result = JSON.parse(result);
    var latestVersion = result['latest']
    return {
      currentVersion,
      latestVersion,
      needUpate: semver.lt(currentVersion, latestVersion)
    }
  } else {
    return {
      needUpate: false
    }
  }
}

```