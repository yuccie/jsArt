---
layout: post
title: 经典的函数
date: Wed Nov 14 2018 19:33:18 GMT+0800 (中国标准时间)
---


## jsBridge

### jsBridge由来

关于 JSBridge，绝大多数同学最早遇到的是微信的 WeiXinJSBridge（现在被封装成 JSSDK），各种 Web 页面可以通过 Bridge 调用微信提供的一些原生功能，为用户提供相关的功能。

为什么是 JSBridge ？而不是 PythonBridge 或是 RubyBridge ？

当然不是因为 JavaScript 语言高人一等（虽然斯坦福大学已经把算法导论的语言从 Java 改成 JavaScript，小得意一下，嘻嘻），主要的原因还是因为 JavaScript 主要载体 Web 是当前世界上的 最易编写 、 最易维护 、最易部署 的 UI 构建方式。

任何一个移动操作系统中都包含可运行 JavaScript 的容器，例如 WebView 和 JSCore。所以，运行 JavaScript 不用像运行其他语言时，要额外添加运行环境。因此，基于上面种种原因，JSBridge 应运而生。

PhoneGap（ [Codova](https://cordova.axuer.com/) 的前身）作为 Hybrid 鼻祖框架，应该是最先被开发者广泛认知的 JSBridge 的应用场景；而对于 JSBridge 的应用在国内真正兴盛起来，则是因为杀手级应用微信的出现，主要用途是在网页中通过 JSBridge 设置分享内容。

### jsBridge用途

JSBridge 简单来讲，主要是 给 JavaScript 提供调用 Native 功能的接口，让混合开发中的『前端部分』可以方便地使用地址位置、摄像头甚至支付等 Native 功能。

既然是『简单来讲』，那么 JSBridge 的用途肯定不只『调用 Native 功能』这么简单宽泛。实际上，JSBridge 就像其名称中的『Bridge』的意义一样，是 Native 和非 Native 之间的桥梁，它的核心是 构建 Native 和非 Native 间消息通信的通道，而且是 双向通信的通道。

### jsBridge实现原理

JavaScript 是运行在一个单独的 JS Context中（例如，**WebView 的 Webkit 引擎、JSCore**）。由于这些 Context 与原生运行环境的天然隔离，我们可以将这种情况与 RPC（Remote Procedure Call，远程过程调用）通信进行类比，将 Native 与 JavaScript 的每次互相调用看做一次 RPC 调用。

### jsBridge通信原理

#### JavaScript 调用 Native

JavaScript 调用 Native 的方式，主要有两种：注入 API 和 拦截 URL SCHEME、重写 prompt

**注入API：** Native 通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。

注意：在 4.2 之前，Android 注入 JavaScript 对象的接口是 addJavascriptInterface，但是这个接口有漏洞，可以被不法分子利用，危害用户的安全，因此在 4.2 中引入新的接口 @JavascriptInterface（上面代码中使用的）来替代这个接口，解决安全问题。所以 Android 注入对对象的方式是 有兼容性问题的。（4.2 之前很多方案都采用拦截 prompt 的方式来实现，因为篇幅有限，这里就不展开了。）

**拦截 URL SCHEME：**

先解释一下 URL SCHEME：URL SCHEME是一种类似于url的链接，是为了方便app直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的，例如: `qunarhy://hy/url?url=ymfe.tech`，protocol 是 qunarhy，host 则是 hy。

拦截 URL SCHEME 的主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。

为什么选择 iframe.src 不选择 locaiton.href ？因为通过location.href有个问题，就是如果我们连续多次修改window.location.href的值，在Native层只能接收到最后一次请求，前面的请求都会被忽略掉。

但使用 iframe.src 发送 URL SCHEME 会有 url 长度的隐患。在 iOS 上采用了使用 Ajax 发送同域请求的方式，并将参数放到 head 或 body 里。这样，虽然规避了 url 长度的隐患，但是 WKWebView 并不支持这样的方式。


#### Native 调用 JavaScript

相比于 JavaScript 调用 Native， Native 调用 JavaScript 较为简单，毕竟不管是 iOS 的 UIWebView 还是 WKWebView，还是 Android 的 WebView 组件，都以子组件的形式存在于 View/Activity 中，直接调用相应的 API 即可。

Native 调用 JavaScript，其实就是执行拼接 JavaScript 字符串，从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上。（闭包里的方法，JavaScript 自己都调用不了，更不用想让 Native 去调用了）


### WebView类型

WebView对于ios和androd不太一样，因此需要分开说：

#### IOS
在讲解原理之前，首先来了解下iOS的UIWebView组件，先来看一下苹果官方的介绍：

>You can use the UIWebView class to embed web content in your application. To do so, you simply create a UIWebView object, attach it to a window, and send it a request to load web content. You can also use this class to move back and forward in the history of webpages, and you can even set some web content properties programmatically.

您可以使用UIWebView类在应用程序中嵌入Web内容。 为此，您只需创建一个UIWebView对象，将其附加到`window`，然后向其发送加载Web内容的请求。 您还可以使用此类在网页历史记录中前后移动，甚至可以通过编程方式设置一些Web内容属性。

上面的意思是说UIWebView是一个可加载网页的对象，它有浏览记录功能，且对加载的网页内容是可编程的。说白了UIWebView有类似浏览器的功能，我们使用可以它来打开页面，并做一些定制化的功能，如可以让js调某个方法可以取到手机的GPS信息。

但需要注意的是，Safari浏览器使用的浏览器控件和UIwebView组件并不是同一个，两者在性能上有很大的差距。幸运的是，苹果发布iOS8的时候，新增了一个WKWebView组件，如果你的APP只考虑支持iOS8及以上版本，那么你就可以使用这个新的浏览器控件了。

原生的UIWebView类提供了下面一些属性和方法

属性：
- loading：是否处于加载中
- canGoBack：A Boolean value indicating whether the receiver can move backward. (只读)
- canGoForward：A Boolean value indicating whether the receiver can move forward. (只读)
- request：The URL request identifying the location of the content to load. (read-only)

方法：
- loadData：Sets the main page contents, MIME type, content encoding, and base URL.
- loadRequest：加载网络内容
- loadHTMLString：加载本地HTML文件
- stopLoading：停止加载
- goBack：后退
- goForward：前进
- reload：重新加载
- stringByEvaluatingJavaScriptFromString：执行一段js脚本，并且返回执行结果

#### 当前所有版本的 iOS Safari（包括所有基于 iOS WebView 的浏览器）都存在一个 bug，下载中的脚本会阻塞页面的显示，无论脚本是否在页面底部或是否有 defer 或 async 属性。

这个问题确实存在于当前所有版本的 iOS Safari 中，包括所有基于 iOS WebView 的浏览器。这个问题是由于 iOS Safari 的一些特殊行为导致的，具体来说是因为 iOS Safari 在下载和解析 JavaScript 时采用了串行处理的方式，因此会阻塞页面的显示。而 defer 和 async 属性在 iOS Safari 中并不能完全解决这个问题，因为它们只能控制 JavaScript 的执行时机，并不能改变 JavaScript 下载和解析的顺序。

而安卓的浏览器会采用类似于多线程的方式来处理 JavaScript 的下载和解析，因此即使下载中的 JavaScript 阻塞了页面的显示，也不会像 iOS Safari 那样严重影响用户体验。

另外，安卓上的浏览器也可能使用了一些优化技术来加速 JavaScript 的下载和解析，例如对 JavaScript 文件进行压缩、缓存等等（但这个压缩和缓存，safari也会有，服务器设置响应头和压缩代码格式）。这些技术可以帮助减少 JavaScript 下载和解析的时间，从而提高页面加载速度和用户体验。

其实就是safari和安卓浏览器对于是否并行下载和解析js资源的行为不一致而已。

### jsBridge其他

参考：[H5与Native交互之JSBridge技术][h5AndNativeConnectUrl]、[iosJsBridge][WebViewJavascriptBridgeIosUrl]、[androidJsBridge][[WebViewJavascriptBridgeAndroidUrl]

>You can use the UIWebView class to embed web content in your application. To do so, you simply create a UIWebView object, attach it to a window, and send it a request to load web content. You can also use this class to move back and forward in the history of webpages, and you can even set some web content properties programmatically.
您可以使用UIWebView类在应用程序中嵌入Web内容。 为此，您只需创建一个UIWebView对象，将其附加到`window`，然后向其发送加载Web内容的请求。 您还可以使用此类在网页历史记录中前后移动，甚至可以通过编程方式设置一些Web内容属性。

其实就是`UIWebView`有类似浏览器的功能，我们使用可以它来打开页面，并做一些定制化的功能，如可以让js调某个方法可以取到手机的GPS信息。

Safari浏览器使用的浏览器控件和UIwebView组件并不是同一个，两者在性能上有很大的差距。幸运的是，苹果发布iOS8的时候，新增了一个WKWebView组件。

原生的UIWebView类提供了下面一些属性和方法，可以根据这些属性或方法，将native和H5联系起来。

属性：

- loading：是否处于加载中
- canGoBack：A Boolean value indicating whether the receiver can move backward. (只读)
- canGoForward：A Boolean value indicating whether the receiver can move forward. (只读)
- request：The URL request identifying the location of the content to load. (read-only)

方法：

- loadData：Sets the main page contents, MIME type, content encoding, and base URL.
- loadRequest：加载网络内容
- loadHTMLString：加载本地HTML文件
- stopLoading：停止加载
- goBack：后退
- goForward：前进
- reload：重新加载
- stringByEvaluatingJavaScriptFromString：执行一段js脚本，并且返回执行结果

桥与ios通信是通过iframe实现，而与安卓稍有不同，但本质都是通过webview拦截请求，然后客户端可以截取请求的参数，进而实现交互……然后原生就可以在webview的全局对象上挂载一些方法，供h5端来调用……最常用的场景是获取token，客户端首先登录，回去服务器拿到token，然后再打开h5的页面时候，一般app.vue就会去获取token，此时有可能通过js桥去拿就拿不到（可能桥还没联通起来），因此在拿不到token的时候请求接口会有问题，因此需要在判断一下有无token，没有的话再次请求获取token……还有种情况，h5跳转到第三方页面，相当于新的环境，此时vuex里的数据就会消失，因此还需要重新获取。。。

```js
// bridge.js ----begin----
const userAgentInfo = navigator.userAgent;
const isPhone = /(iPhone|iPad|iPod|iOS)/i.test( userAgentInfo );

let _data = Object.create( null );
let WebViewJavascriptBridge = window.WebViewJavascriptBridge;

function setupWebViewJavascriptBridge ( callback ) {
  if ( isPhone ) {
    if ( WebViewJavascriptBridge ) {
      return callback( WebViewJavascriptBridge );
    }
    if ( window.WVJBCallbacks ) {
      return window.WVJBCallbacks.push( callback );
    }

    window.WVJBCallbacks = [ callback ];

    // UIWebView 可以监听所有网络请求
    // 在ios中，js调用native有两种方式：location 和 iframe，都是schema方式
    // 前者若多次改变，native层只能收到最后一次请求。因此用iframe模拟
    var WVJBIframe = document.createElement( 'iframe' );
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild( WVJBIframe );
    setTimeout( function () {
      document.documentElement.removeChild( WVJBIframe );
    }, 0 );

  } else {
    // https://github.com/lzyzsd/JsBridge
    // This lib will inject a WebViewJavascriptBridge Object to window object. 
    // So in your js, before use WebViewJavascriptBridge, 
    // you must detect if WebViewJavascriptBridge exist. 
    // If WebViewJavascriptBridge does not exit, you can listen to WebViewJavascriptBridgeReady event,
    // as the blow code shows:
    if ( WebViewJavascriptBridge ) {
      callback( WebViewJavascriptBridge );
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          callback( WebViewJavascriptBridge );
        },
        false
      );
    }
  }
};

setupWebViewJavascriptBridge( function ( bridge ) {

  if ( !isPhone ) {
    // https://github.com/lzyzsd/JsBridge
    // You can also define a default handler use init method,
    // so that Java can send message to js without assigned handlerName
    // 原生调用方法：webView.send("hello")
    // will print 'JS got a message hello' and 'JS responding with' in webview console.
    bridge.init( function ( message, responseCallback ) {
      console.log( 'JS got a message', message );
      var data = {
        'Javascript Responds': 'Wee!'
      };
      console.log( 'JS responding with', data );
      responseCallback( data );
    } );
  }

  bridge.registerHandler( 'finupCredit_bridgeCallJavaScript', ( data, responseCallback ) => {
    if ( !isPhone ) {
      data = JSON.parse( data );
    }
    let result = {};
    if ( _data.hasOwnProperty( data.method ) ) {
      if ( !!data.data ) {
        result = _data[ data.method ]( data );
      } else {
        result = _data[ data.method ]();
      }
    }
    if ( !!responseCallback ) {
      if ( !!result ) {
        responseCallback( result );
      } else {
        responseCallback();
      }
    }
  } );
} );


let obj = Object.create( null );

// 调用native的方法
// 参数一：传给native端的参数
// 参数二：执行完native端函数后，执行的回调
obj.callHandler = function ( data, callBackFunc ) {
  if ( typeof data === 'string' ) {
    data = {
      method: data, // native端方法名
      data: {}      // 具体数据
    };
  }
  setupWebViewJavascriptBridge( function ( bridge ) {
    bridge.callHandler( 'finupCredit_bridgeCallNative', data, function responseCallback ( responseData ) {
      console.log( 'JS received response:', responseData );
      if ( callBackFunc ) {
        callBackFunc( responseData );
      }
    } );
  } );
};

obj.register = function ( name, callbackFunc ) {
  _data[ name ] = callbackFunc;
};

export default obj;
// bridge.js ----end----


// 示例：js调用原生方法
// 将bridge文件引入所需文件
bridge.callHandler( {
  method: "closeWebview",
  data: {}
} )

// 示例：原生调用js方法
// 将bridge文件引入所需文件
nativeCallHFiveMethod( 'onRefresh', null, this.init );

function nativeCallHFiveMethod ( methodName, transData, callback ) {
  if ( transData ) {
    // 这里的bridge就是上面的obj
    bridge.register( methodName, function () {
      if ( /(iPhone|iPad|iPod|iOS)/i.test( navigator.userAgent ) ) {
        return { data: transData };
      }
      else {
        return transData;
      }
    } );
  }
  else {
    bridge.register( methodName, callback ? callback : () => { } );
  }
}
```



在 iOS 中 WebView 需要分为UIWebView 和 iOS8 中新增的 WKWebView 两种类型。其中 WKWebView 相较于 UIWebView 优势在于能够直接使用系统 Safari 渲染引擎去渲染页面，支持更多的 HTML5 特性，渲染性能也会更好点。


[h5AndNativeConnectUrl]: https://segmentfault.com/a/1190000010356403 'H5与Native交互之JSBridge技术
[IosUrl]: https://github.com/marcuswestin/WebViewJavascriptBridge 'ios'
[WebViewJavascriptBridgeAndroidUrl]: https://github.com/lzyzsd/JsBridge 'android'