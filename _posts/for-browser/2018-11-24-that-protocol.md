---
layout: post
title: 那些互联网协议们
date: Sat Nov 24 2018 14:53:50 GMT+0800 (中国标准时间)
---


### 什么是协议


### SSH
为 Secure Shell 的缩写，是一种网络协议，用于计算机之间的加密登录，如果一个用户从本地计算机，使用ssh协议登录另一台远程计算机，我们可以认为这种登录是安全的，即使被中途截获，密码也不会泄露。ssh之所以安全，因为他采用公钥加密

**过程：**
1. 远程主机收到用户的登录请求，把自己的公钥发给用户，
2. 用户使用这个公钥，将登陆密码加密后，发送给远程主机，
3. 远程主机用自己的私钥，解密登录密码，如果密码正确，就登录成功。

但也有安全隐患，如果有人截获了登录请求（第一步），然后冒充远程主机，将伪造的公钥发送给用户，那么用户就很难辨别真伪。因为不像https协议那样，ssh协议的公钥是没有证书中心ca公证的，也就是说，都是自己签发。

可以设想，如果攻击者插在用户与远程主机之间（比如公共的wifi区域），用伪造的公钥，获取用户的登录密码，再用这个密码登录远程主机，那么ssh的安全机制就荡然无存。也是中间人攻击（Man-in-the-middle attack）

ssh分客户端openssh-client 和openssh-server，如果只是想登陆别人的机器，ssh只需安装openssh-client（ubantu 有默认安装），如果要想使本机开放ssh服务就需要安装openssh-server。

 ssh root@67.218.147.xxx  意思是，安全脚本连接系统用户是root，服务器地址是67.218.147.xxx，
 ssh默认连接的端口是22，如果想修改端口，需要加 ssh -p 端口号 root@67.218.147.xxx   
 而ip地址可以通过设置hostname来改变。如上图中root@djch  但连接的时候，不建议这样，ip更加高效。

#### **密钥生成**

每个SSH用户都有自己的`known_hosts`文件，此外系统也有一个这样的文件，通常是`/etc/ssh/ssh_known_hosts`，保存一些对所有用户都可信赖的远程主机的公钥。`id_rsa.pub`是本机的公钥，`id_rsa`是本机的私钥。

```bash
# ~/.ssh 目录是一些密钥信息
# 若不添加任何信息可以直接执行下面命令，然后一路回车，
# 此时会生成id_rsa，id_rsa_pub，只需要将后者拷贝到远程对应服务器即可
ssh-keygen

# 但是若想一台电脑建立多个ssh连接，则需要为每个秘钥生成不同的名字
ssh-keygen -t rsa -C "your_mail@example.com" -f ~/.ssh/my_example_rsa
# 此时会在~/.ssh目录生成my_example_rsa和my_example_rsa.pub两个文件
# 此时将my_example_rsa.pub拷贝到远程
# 还需要在~/.ssh目录增加(若没有)config文件，然后里面配置如下信息

#------------
# missfresh-gitlab（这是区分不同的用户名，自定义即可）
Host gitlab.missfresh.net
    HostName gitlab.missfresh.net
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/missfresh-gitlab-rsa

# 配置文件参数
# Host : Host进行配置对应的的主机名和ssh文件
# HostName : 要登录主机的主机名(git@gitlab.missfresh.net:xxx.git,则为：gitlab.missfresh.net)
# User : 登录名
# IdentityFile : 指明对应用户的私钥文件地址(私钥的权限600)
#------------

# 配置完可以测试一下：
# @前面的协议一般都为git，后面的地址就是上面HostName
ssh -T git@gitlab.missfresh.net
# 若输出类似一下信息，则代表成功：
Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.
```

使用密码登录，每次都需要输入密码，非常麻烦，好在`ssh`还提供公钥登录，可以省去输入密码的步骤。所谓公钥登录，原理就是用户将自己的公钥存储在远程主机上，登录时，远程主机会向用户发送一段随机字符串，用户用自己的私钥加密后再发给远程主机，远程主机用事先存储用户的公钥解密，如果成功，则客户的是可信的，直接允许登录`shell`，不再要求密码。

### openSSL
https是一种协议，等于http + TLS(由于历史原因，SSL3.0之后就被TLS1.0替代了)
openSSL是一套开源工具集(**注意:**HTTPS与OpenSSL就是iPhone与富士康的关系。)。

SSL是Secure Sockets Layer（安全套接层协议）的缩写，可以在Internet上提供秘密性传输。Netscape公司在推出第一个Web浏览器的同时，提出了SSL协议标准。其目标是保证两个应用间通信的保密性和可靠性,可在服务器端和用户端同时实现支持。已经成为Internet上保密通讯的工业标准。

SSL能使用户/服务器应用之间的通信不被攻击者窃听，并且始终对服务器进行认证，还可选择对用户进行认证。SSL协议要求建立在可靠的传输层协议(TCP)之上。SSL协议的优势在于它是与应用层协议独立无关的，高层的应用层协议(例如：HTTP，FTP，TELNET等)能透明地建立于SSL协议之上。SSL协议在应用层协议通信之前就已经完成加密算法、通信密钥的协商及服务器认证工作。在此之后应用层协议所传送的数据都会被加密，从而保证通信的私密性。

