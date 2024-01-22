# JS模块化

## 历史

JavaScript发展初期主要是为了实现简单的页面交互逻辑；

如今CPU、浏览器性能得到了极大的提升，很多页面逻辑迁移到了客户端（表单验证等）随着web2.0时代的到来，Ajax技术得到广泛应用，jQuery等前端库层出不穷，前端代码日益膨胀，此时在JS方面就会考虑使用模块化规范去管理

## 理解模块化


### 什么是模块化

- 将一个复杂的程序依据一定的规则（规范）封装成几个块（文件），并进行组合
- 块的内部数据与函数（实现）是私有的，只向外部暴露一些接口与内部其他模块进行通信

### 模块的进化历史

  #### 全局function模式：将不同的功能封装成不同的函数
  
    - 编码：将不同的功能封装成不同的全局函数
    - 问题：污染全局命名空间、容易引起命名冲突或数据不安全，而且模块成员之间看不出直接关系 
  
  ```js
    function m1() {
      //...
    }

    function m2() {
      // ...
    }
  ```

  #### namespace模式：简单对象封装

    - 作用：减少了全局变量，解决命名冲突
    - 问题：数据不安全（外部可以直接修改模块内部的数据）
  
  ```js
    let myModule = {
      data: 'www.baidu.com',
      foo() {
        console.log(`foo()${this.data}`)
      },
      bar() {
        console.log(`bar() ${this.data}`)
      }
    }

    myModule.data = 'other data'
    myModule.foo() // foo() otherdata
  ```
  这样的写法会暴露所有模块成员，内部状态可以被外部改写

  #### IFFE模式：匿名函数自调用
    
    - 作用：数据是私有的，外部只能通过暴露的方法操作
    - 编码：将数据和行为封装到一个函数内部，通过给window添加属性来向外暴露接口
    - 问题：如果当前这个模块依赖另一个模块怎么办？
  
  ```js
    // index.html文件
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
    myModule.foo()
    myModule.bar()
    console.log(myModule.data) //undefined 不能访问模块内部数据
    myModule.data = 'xxxx' //不是修改的模块内部的data
    myModule.foo() //没有改变
</script>
  ```

  ```js
  // module.js文件
  // IFFE: 立即执行函数
  (function(window) {
     data: 'www.baidu.com',
      foo() {
        console.log(`foo()${this.data}`)
      },
      bar() {
        console.log(`bar() ${this.data}`)
        otherFun() // 内部调用
      }
      window.myModule = {foo, bar} // 暴露
  })(window)
  ```

  最终执行情况：

  <img src='/picture/IFFE模式-运行结果.png'/>

  #### IFFE模式增强：引入依赖

**这是现代模块化的基础**

```js
// module.js文件
(function(window, $) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
    $('body').css('background', 'red')
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar }
})(window, jQuery)
```

```html
 // index.html文件
  <!-- 引入的js必须有一定顺序 -->
  <script type="text/javascript" src="jquery-1.10.1.js"></script>
  <script type="text/javascript" src="module.js"></script>
  <script type="text/javascript">
    myModule.foo()
  </script>
```

上例子通过jquery方法将页面的背景颜色改成红色，所以必须先引入jQuery库，就把这个库当作参数传入。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

### 模块化的好处

- 避免命名冲突
- 更好的分离、按需加载
- 更高的复用性
- 高可维护性

### 引入多个```<script>```后出现的问题

 - 请求过多
   
   首先我们要依赖多个模块，就会发送多个请求，导致请求过多

 - 依赖模糊
   
   我们不知道它们具体的依赖关系是什么，也就是说很容易因为不了解它们之间的依赖关系导致加载先后顺序出错

 - 难以维护

   以上两种原因就导致了很难维护，很可能出现牵一发而动全身的情况导致项目出现严重的问题。 模块化固然有多个好处，然而一个页面需要引入多个js文件，就会出现以上这些问题。而这些问题可以通过模块化规范来解决

## 模块化规范

### CommonJS

#### （1）概述

Node应用由模块组成，采用CommonJS模块规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类都是私有的，对其他文件不可见。**在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。**

#### （2）特点

 - 所有代码都运行在模块作用域，不会污染全局作用域
 - 模块可以多次加载，但只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
 - 模块加载的顺序，按照其在代码中出现的顺序

#### （3）基本语法

  - 暴露模块：module.exports = value或exports.xxx = value
  - 引入模块：require(xxx),如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径

**CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性**

#### (4) 模块的加载机制

**CommonJS模块的加载机制是，输入的是被输出的值的拷贝(深拷贝)。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。**这点与ES6模块化有重大差异

```js
// lib.js
var counter = 3
function incCounter() {
  counter ++
}

module.exports = {
  counter,
  incCounter
}
```

上面代码输出内部变量counter和改写这个变量的内部方法incCounter

```js
// main.js
var counter = require('./lib.js').counter
var incCounter = require('./lib.js').incCounter
console.log(counter) // 3
incCounter()
console.log(counter) // 3
```

上面代码说明，counter输出以后，lib.js模块内部的变化就影响不到counter了。**这是因为counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。**

#### （5）服务器端实现

##### ① 下载安装nodejs

##### ② 创建项目结构

**用npm init自动生成package.json时，package name不能有中文和大写**

```js
|-modules
  |-module1.js
  |-module2.js
  |-module3.js
|-app.js
|-package.json
  {
    "name": "commonJS-node",
    "version": "1.0.0"
  }
```

##### ③ 下载第三方模块

```npm install uniq --save```

##### ④ 定义模块代码

```js
// module1.js
module.exports = {
  msg: 'module1',
  foo() {
    console.log(this.msg)
  }
}
```

```js
// module2.js
module.exports = function() {
  console.log('module2')
}
```

```js
//module3.js
exports.foo = function() {
  console.log('foo() module3')
}
exports.arr = [1, 2, 3, 3, 2]
```

```js
// app.js文件
// 引入第三方库，应该放置在最前面
let uniq = require('uniq')
let module1 = require('./modules/module1')
let module2 = require('./modules/module2')
let module3 = require('./modules/module3')

module1.foo() //module1
module2() //module2
module3.foo() //foo() module3
console.log(uniq(module3.arr)) //[ 1, 2, 3 ]
```

##### ⑤ 通过node运行app.js

命令行输入```node app.js```，运行JS文件

#### （6）浏览器端实现（借助Broswerify）

##### ① 创建项目解构

```
|-js
  |-dist //打包生成文件的目录
  |-src //源码所在的目录
    |-module1.js
    |-module2.js
    |-module3.js
    |-app.js //应用主源文件
|-index.html //运行于浏览器上
|-package.json
  {
    "name": "browserify-test",
    "version": "1.0.0"
  }
```

##### ② 下载broswerify

 - 全局： npm install broswerify -g
 - 局部： npm install broswerify --save-dev

##### ③ 定义模块代码

注意：index.html文件要运行在浏览器上，需要借助browserify将app.js文件打包编译，如果直接在index.html引入app.js就会报错！

##### ④ 打包处理js

根目录下运行 ```browserify js/src/app.js -o js/dist/bundle.js```

##### ⑤ 页面引入使用

在index.html文件中引入```<script type="text/javascript" src="js/dist/bundle.js"></script>```

### AMD

### CMD


### ES6模块化

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

#### （1）ES6模块化语法

export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

```js
// 定义模块math.js
var basicNum = 0
var add = function(a, b) {
  return a + b
}

export {basicNum, add}
// 引用模块
import {basicNum, add} from './math'
function test(ele) {
  ele.textContent = add(99 + basicNum)
}
```

如上例所示，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

```js
// export-default.js
export default function () {
  console.log('foo');
}
```

```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

模块默认输出, 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。

#### (2) ES6模块与CommonJS模块的差异

它们有两个重大差异：

①： CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用
②： CommonJS模块是运行时加载，ES6模块时编译时输出接口

第二个差异是因为CommonJS加载的是一个对象（module.exports），该对象只有在脚本运行完才会生成。而ES6模块不是对象，他的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

```js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}
// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

**ES6 模块的运行机制与 CommonJS 不一样。ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。**

#### (3) ES6-Babel-Browserify使用教程

简单来说就一句话：**使用Babel将ES6编译为ES5代码，使用Browserify编译打包js。**

##### ① 定义package.json文件

```js
 {
   "name" : "es6-babel-browserify",
   "version" : "1.0.0"
 }

```

##### ②安装babel-cli, babel-preset-es2015和browserify

- npm install babel-cli browserify -g
- npm install babel-preset-es2015 --save-dev
- preset 预设(将es6转换成es5的所有插件打包)

##### ③ 定义.babelrc文件

```js
  {
    "presets": ["es2015"]
  }
```

##### ④定义模块代码

```js
//module1.js文件
// 分别暴露
export function foo() {
  console.log('foo() module1')
}
export function bar() {
  console.log('bar() module1')
}

```

```js
//module2.js文件
// 统一暴露
function fun1() {
  console.log('fun1() module2')
}
function fun2() {
  console.log('fun2() module2')
}
export { fun1, fun2 }

```

```js
//module3.js文件
// 默认暴露 可以暴露任意数据类项，暴露什么数据，接收到就是什么数据
export default () => {
  console.log('默认暴露')
}

```

```js
// app.js文件
import { foo, bar } from './module1'
import { fun1, fun2 } from './module2'
import module3 from './module3'
foo()
bar()
fun1()
fun2()
module3()
```

##### ⑤ 编译并在index.html中引入

- 使用Babel将ES6编译为ES5代码(但包含CommonJS语法) : ```babel js/src -d js/lib```
- 使用Browserify编译js : ```browserify js/lib/app.js -o js/lib/bundle.js```

#### 