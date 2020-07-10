---
layout: post
title: 关于jekyll
date: Tue Nov 20 2018 10:17:51 GMT+0800 (中国标准时间)
---


#### jekyll常用链接
- [jekyll官网](https://jekyllrb.com/)
- [jekyll使用](http://gohom.win/2015/07/27/Jekyll-usage/)

- [liquid语法](https://shopify.github.io/liquid/)

- [toml要革yaml的命](https://segmentfault.com/a/1190000000477752)
- [toml](https://github.com/toml-lang/toml#user-content-example)


#### jekyll常见问题
1. 在md里面，四个空格和一个tab代表的距离一致，但如果通过jekyll serve编译时将一个tab代表的距离更换为2个空格？


#### 安装jekyll开发环境
1. 安装ruby环境
  - Ruby version 2.2.5 or above, including all development headers (ruby version can be checked by running ruby -v)
  - RubyGems (which you can check by running gem -v)
  - GCC and Make (in case your system doesn’t have them installed, which you can check by running gcc -v,g++ -v and make -v in your system’s command line interface)

```
By default, binaries installed by gem will be placed into:
  /usr/local/lib/ruby/gems/2.6.0/bin

You may want to add this to your PATH.

ruby is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have ruby first in your PATH run:
  echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc

For compilers to find ruby you may need to set:
  export LDFLAGS="-L/usr/local/opt/ruby/lib"
  export CPPFLAGS="-I/usr/local/opt/ruby/include"

For pkg-config to find ruby you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/ruby/lib/pkgconfig"
```

2. 

#### 安装jekyll遇到的问题
我的ruby环境已经安装好，版本2.5.1
1. `gem install jekyll bundler`
  - 先提示我权限不足，改用sudo解决权限
  - 权限解决以后，又提示`Unable to pull data from 'https://rubygems.org/': SSL_connect returned=1 errno=0 state=SSLv2/v3 read server hello A: tlsv1 alert protocol version (https://rubygems.org/latest_specs.4.8.gz)`
[参考][SSL_connect_err_url]















[SSL_connect_err_url]:https://teamtreehouse.com/community/warning-unable-to-pull-data-from-httpsrubygemsorg









