title: Apns 推送表情问题
author: ipiao
tags:
  - apns
  - emoji
categories:
  - 第三方
date: 2018-12-14 10:54:00
---
### Apns表情推送
1.常规的，服务端，尤其是go，发起apns推送是可以直接推送UTF-8表情的。


### 问题场景
1. 发起apns推送，用户名中有emoji表情，推送结果显示不出来。

  解决方案: 一顿操作以后，发现数据库字符是utf8mb4，字段字符集是utf8_general_ci。需要将字符集改成utf8_unicode_ci。有两种方式:
  - 直接修改数据库配置，或者值修改相应字段的字符集
  - 在程序中连接mysql的时候修改连接设置(基于对连接参数设置的支持)，charset=utf8mb4&collation=utf8_unicode_ci。与前者的差异是，这种修改只是针对当前连接的，以及字符集修改是针对数据库的，会产生相应的效率问题。


### 参考资料
1. [apns文档](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1)
2. [mysql Emoji存储方案](https://www.cnblogs.com/zhangwufei/p/7017325.html)
3. [go 连接mysql参数设置](https://blog.csdn.net/qingxili/article/details/82764072)