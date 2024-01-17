<!--
 * @Author: KESHAOYE
 * @Date: 2023-04-07 13:40:08
-->
# 一文带你了解```<script>```标签

说到```<script>```标签，相信前端的同学都不陌生。但随着前端工程化的普及，我想大部分开发者已经不会再手写```<script>```标签了。
趁着这次重新复盘前端知识的机会，就好好梳理一下```<script>```这个元素！

## 形成背景

在JavaScript早期，网景公司的工作人员希望将JavaScript引入HTML页面的同时，不会导致页面在其他浏览器中渲染出问题，通过反复试错和讨论，他们最终
做出了一些决定，并达成了向网页中引入通用脚本能力的共识。为了将JavaScript插入HTML，网景公司提出的方案是使用```<script>```标签，并最早在NetScape Navigator2中实现。

## 使用方式

```<script>```引入JS的方式主要有三种：内联、外部引入、动态加载

### 内联

直接把代码放到```<script>```标签中

```html
<script>
 function sayHi() {
   console.log('Hi!')
 }
</script>
```
<span style='color:  #ff9999'>使用内联JS代码时，代码中不应该出现字符串```</script>```</span>
```html
<!--这是错误写法-->
<script>
 function sayHi() {
   console.log('</script>')
 }
</script>
```
解决此问题需要使用到转义字符'\'

```html
<!--这是正确写法-->
<script>
 function sayHi() {
   console.log('<\/script>')
 }
</script>
```

### 外部引入（推荐）

设置```<script>```标签的src属性，引入外部代码

```html
 <!--引入Jquery-->
 <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
```

外部引入js脚本是最推荐的一种做法，其优点如下:

- 可维护性：JavaScript代码如果分散到多个页面会出现维护困难的情况，如果将所有JavaScript代码放到一个文件夹下，方便维护
- 缓存：浏览器会根据特定的设置缓存所有外部链接的JavaScrit文件，这意味着如果两个页面都用到同一个文件，则该文件只下载一次。这意味着页面加载更快。

### 动态加载

可以使用DOM API向DOM中动态添加```<script>```元素

```js
let script = document.createElement('script')
script.src='http://code.jquery.com/jquery-migrate-1.2.1.min.js'
document.head.appendChild(script)
```

<span style='color:#ff9999'>默认情况下，上述例子添加的script元素是异步的，相当于加上了async属性(后文会提到),但不是所有浏览器都支持async属性，所以可以手动将其修改为同步代码</span>

```js
let script = document.createElement('script')
script.src='http://code.jquery.com/jquery-migrate-1.2.1.min.js'
// 手动修改为同步
script.async = false
document.head.appendChild(script)
```

## 书写位置

在过去，开发者通常将```<script>```元素书写在```<head>```标签中

```HTML
 <!DOCTYPE HTML>
 <html>
    <head>
      <title>过去</title>
      <script src='example1.js'></script>
      <script src='example2.js'></script>
    </head>
    <body>
        <!--页面内容-->
    </body>
 </html>
```

这种做法的主要目的是将外部引入的CSS和JS放在一起。不过这种做法存在不少弊端，
<span style='color: #ff9999'>这意味着必须把所有JS代码下载、解析完成后再开始渲染页面，</span>
对于依赖很多外部JS文件的页面来说，就会造成首屏白屏问题。

为了解决这个问题，现代WEB程序通常将所有JS引用放在```<body>```元素中页面内容的后面

```HTML
 <!DOCTYPE HTML>
 <html>
    <head>
      <title>现在</title>
    </head>
    <body>
        <!--页面内容-->
        <script src='example1.js'></script>
        <script src='example2.js'></script>
    </body>
 </html>
```

这样一来，浏览器就会优先渲染页面再处理JS代码，用户会明显感知到页面加载时间缩短，因为首屏白屏问题得到了解决。

## 推迟/异步 执行脚本(defer与async)

### defer（推迟执行脚本）

HTML4.01为```<script>```元素定义了一个叫defer的属性。这个属性表示脚本在执行的时候不会改变页面的结构，因此，这个脚本完全可以在整个页面解析完之后在运行。在```<script>```元素上设置defer属性，会告诉浏览器应该立即开始下载，但执行应该推迟。
```html
  <!DOCTYPE HTML>
 <html>
    <head>
      <title>defer</title>
      <script defer src='example1.js'></script>
      <script defer src='example2.js'></script>
    </head>
    <body>
        <!--页面内容-->
    </body>
 </html>
```

在上面的例子中，虽然```<script>```标签在```<head>```标签中，但它们会在浏览器解析到结束的```<html/>```标签后才会执行。HTML5要求脚本按照他们出现的顺序进行执行，因此第一个推迟脚本(example1)会在第二个推迟脚本(example2)之前执行，而且两者都会在[DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/DOMContentLoaded_event)事件之前执行。
<span style='color:  #ff9999'>不过在实际当中，推迟执行的脚本不一定总会按顺序执行或者在DOMContentLoaded事件之前执行，因此最好只包含一个这样的脚本</span>

### async（异步执行脚本）

HTML5为```<script>```标签定义了async属性。从改变脚本处理方式上看，defer与async类似。不过，与 defer 不同的是，标记为 async 的脚本并不保证能按照它们出现的次序执行

```HTML
 <!DOCTYPE HTML>
 <html>
    <head>
      <title>async</title>
      <script async src='example1.js'></script>
      <script async src='example2.js'></script>
    </head>
    <body>
    </body>
 </html>
```

在这个例子中，第二个脚本可能先于第一个脚本执行。因此，重点在于它们之间没有依赖关系。给脚本添加 async 属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到该异步脚本下载和执行后再加载其他脚本。正因为如此，异步脚本不应该在加载期间修改 DOM。使用 async 也会告诉页面你不会使用```document.write。

### defer与async区别

| 标签 | 何时执行 | 是否造成HTML阻塞（是否暂停HTML解析）|阻塞阶段|
| --- | --- | --- | --- |
|```<script>```|网络请求返回时（下载完成后）| 阻塞 | 脚本下载及执行 |
|```<script async>```| 网络请求返回时（下载完成后）| 阻塞或不阻塞 | 脚本执行（如果此时HTML解析完毕则不阻塞） |
|```<script defer>```| 网络请求返回且HTML解析完毕 | 不阻塞 | 无 |

## ```<noscript>```元素

针对早期浏览器不支持JavaScript的问题，需要一个页面优雅降级的处理方案。最终，```<noscript>```元素出现，被用于给不支持 JavaScript 的浏览器提供替代内容。虽然如今的浏览器已经 100%支持JavaScript，但对于禁用 JavaScript 的浏览器来说，这个元素仍然有它的用处。```<noscript>```元素可以包含任何可以出现在```<body>```中的 HTML元素，```<script>```除外。

在下列两种情况下，浏览器将显示包含在```<noscript>```中的内容:

- 浏览器不支持脚本;
- 浏览器对脚本的支持被关闭。
  
任何一个条件被满足，包含在```<noscript>```中的内容就会被渲染。否则，浏览器不会染```<noscript>```中的内容。
