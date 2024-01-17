# 路由中hash和history的区别与原理

使用vue-router或react-router-dom时，一般会有两个路由模式供开发人员选择，分别是hash和history

## hash

### 样式

```js
var t = https://www.fam.tjfy.com/#/addAssets
```

路由地址栏上会有 "#"

### 原理

基于```location.hash```实现，```location.hash```的值就是URL中```#```后面的内容

其原理是使用```hashchange```事件监听#后面内容的变化来发起请求进行局部更新

### 触发hashchange事件

- 浏览器前进后退改变URL
- a标签改变URL
- window.location改变URL

## history

### 样式

```js
var t = https://www.fam.tjfy.com/addAssets
```

路由地址栏上没有"#"

### 原理

利用HTML5新特性```window.history```中的```pushState(state, title, url)```或```replaceState(state, title, url)```实现路由跳转(这两个方法改变URL不会引起页面刷新)

## 区别

- 样式上存在差别，一个带#，一个不带
- 兼容性存在差别，history为html5新特性兼容性不如hash模式
- history模式需要后端进行额外配置，否则会出现刷新白屏
    原因：页面刷新时，浏览器会向服务器发送此地址的请求，但对应文件资源不存在，所以会报404
