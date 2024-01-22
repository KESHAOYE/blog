<!--
 * @Author: KESHAOYE
 * @Date: 2023-04-10 13:34:52
-->
<!--
 * @Author: KESHAOYE
 * @Date: 2023-04-10 13:34:52
-->
# 深入JavaScript语法及变量

前端基础第二弹，今天来复盘的是与我们开发息息相关的JavaScript语法及变量
  
## 语法

ECMAScript的语法很大程度上借鉴了C语言和其他类 C语言，如Java和Perl。熟悉这些语言的开发者，应该很容易理解 ECMAScript 宽松的语法。

### 区分大小写

首先要知道的是，ECMAScript 中一切都区分大小写。无论是变量、函数名还是操作符，都区分大小写。换句话说，变量 test 和变量 est 是两个不同的变量。类似地，typeof 不能作为函数名，因为它是一个关键字(后面会介绍 )。但 Typeof 是一个完全有效的函数名。

### 标识符（变量、函数名）
所谓标识符，就是变量、函数、属性或函数参数的名称。标识符可以由一或多个下列字符组成:

- 第一个字符必须是一个字母、下划线 (_)或美元符号(S);
- 剩下的其他字符可以是字母、下划线、美元符号或数字。
- 标识符中的字母可以是扩展 ASCII (Extended ASCI)中的字母，也可以是 Unicode 的字母字符如A和压(但不推荐使用)。
  
按照惯例，ECMAScript 标识符使用驼峰大小写形式，即第一个单词的首字母小写，后面每个单词的首字母大写，例如 firstName、myCar等

**虽然这种写法不是强制性的，但因为这种形式跟ECMAScript内置函数和对象的命名方式一致，所以比较推荐**

### 注释

```js
 // 单行注释
 /* 多行注释 */
```

### 严格模式

ECMAScript5增了严格模式(srict mode)的概念。严格模式是一种不同的 JavaScript 解析和执行模型，ECMAScript3的一些不规范写法在种模式下会被处理，对于不安全的活动将抛出错误。要整个脚本启用严格模式，在脚本开头加上这一行:
```use strict```
虽然看起来像个没有赋值给任何变量的字符串,但它其实是一个预处理指令。任何支持的JavaScript引擎看到它都会切换到严格模式。选择这种语法形式的目的是不破坏ECMAScript3 语法。
也可以单独指定一个函数在严格模式下执行，只要把这个预处理指令放到函数体开头即可
```js
function dosomething() {
    "use strict";
    // 函数体
}
```
## 变量

Javascript种的变量可以用于保存所有类型的数据

### var

#### 1. var声明作用域
   使用var操作符定义的变量会成为包含它的函数的局部变量，使用var在一个函数内部定义一个变量，该变量在函数退出以后销毁
   ```js
     function test() {
        var message = 'hi'
     }
     test()
     console.log(message) // 出错
   ```
省略掉var操作符之后，message就变成了全局变量。只要调用一次函数test()，就会定义这个变量，并且可以在函数外部访问到。在局部作用域中定义的全局变量很难维护，不推荐这么做。
**在严格模式下，如果像这样给未声明的变量赋值，则会导致抛出ReferenceError。**
   ```js
     function test() {
        message = 'hi'
     }
     test()
     console.log(message) // hi
   ```

#### 2. var声明提升
var在js中是支持预解析的，如下代码不会报错。这是因为使用var声明的变量会自动提升到函数作用域顶部：

```js
function foo() {
    console.log(age);
    var age = 26;
}
foo(); // undefined
```

javaScript引擎，在代码预编译时，javaScript引擎会自动将所有代码里面的var关键字声明的语句都会提升到当前作用域的顶端,如下代码：

```js
function foo() {
    var age;
    console.log(age);
    age = 26;
}
foo(); // undefined
```

### let

#### let声明作用域

**let定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问，而var可以跨块访问**

```js
// var定义的变量
if (true) {
    var name = 'Matt';
    console.log(name); // Matt
}
console.log(name); // Matt

// let定义的变量
if (true) {
    let age = 26;
    console.log(age); // 26
}
console.log(age); // ReferenceError: age没有定义
```

**let不允许重复声明**

```js
var name;
var name;

let age;
let age; // SyntaxError；标识符age已经声明过了
```

#### 暂时性死区

let (const) 与 var 的另一个重要的区别，就是 let 声明的变量不会在作用域中被提升。在解析代码时，JavaScript引擎也会注意出现在块后面的 let 声明，只不过在此之前不能以任何方式来引用未声明的变量。在 let 声明之前的执行瞬间被称为“暂时性死区”

```js
// name会被提升
console.log(name); // undefined
var name = 'Matt';

// age不会被提升
console.log(age); // ReferenceError：age没有定义
let age = 26;
```

1. 全局声明
   
与var 关键字不同，使用 let 在全局作用域中声明的变量不会成为 window 对象的属性(var 声明的变量则会 )。
```js
  var name ='Matt';
  console.log(window.name); // 'Matt!
  let age=26;
  console.log(window.age); // undefined
```
不过，let 声明仍然是在全局作用域中发生的，相应变量会在页面的生命周期内存续。因此，为了避免 syntaxError，必须确保页面不会重复声明同一个变量。

3. 条件声明
   在使用 var 声明变量时，由于声明会被提升，JavaScript引擎会自动将多余的声明在作用域顶部合并为一个声明。因为let的作用域是块，所以不可能检查前面是否已经使用let声明过同名变量，同时也就不可能在没有声明的情况下声明它。
   ```js
    // 假设脚本不确定页面中是否已经声明了同名变量
    // 那它可以假设还没有声明过
     var name ='Nicholas';
     let age = 26;
    // 这里没问题，因为可以被作为一个提升声明来处理
    // 不需要检查之前是否声明过同名变量
    var name ='Matt!'
    // 如果age 之前声明过，这里会报错 
    let age = 36;
    ```
使用 try/catch 语句或 typeof 操作符也不能解决因为条件块中 let 声明的作用域仅限于该块

```js
      let name ='Nicholas';
      let age = 36;
      
      // 假设脚本不确定页面中是否已经声明了同名变量
      // 那它可以假设还没有声明过
      if (typeof name === iundefined') {
        let name;
      }
      //name 被限制在if{]块的作用域内// 因此这个赋值形同全局赋值
      name ='Matt';
      
      try {
        console.log(age);// 如果age 没有声明过，则会报错
      }catch(error){
        let age;
      }
      // age限制在catch{}块的作用域内
      // 因此形成这个赋值形同全局赋值
      age = 26
```

4. for循环中的let声明

在 let 出现之前，for 循环定义的迭代变量会渗透到循环体外部:
```js
for(var i = 0;i<5;++i) {
  // 循环逻辑
}
console.log(i) // 5
```
改成使用 let 之后，这个问题就消失了，因为迭代变量的作用域仅限于for循环块内部:
```js
for(var i = 0;i<5;++i) {
  // 循环逻辑
}
console.log(i) // ReferenceError:i没有定义
```
在使用 var 的时候，最常见的问题就是对迭代变量的奇特声明和修改:
```js
for (var i= 0;i<5;++i) {
    setTimeout(() => console.log(i)，0
    )
  }
  // 你可能以为会输出0、1、2、3、4
  // 实际上会输出 5、5、5、5、5

```
之所以会这样，是因为在退出循环时，迭代变量保存的是导致循环退出的值:5。在之后执行超时逻辑时，所有的 i 都是同一个变量，因而输出的都是同一个最终值。

而在使用 let 声明送代变量时，Javaseript引擎在后台会为每个送代循环声明一个新的选代变量。每个 setTimeout 用的都是不同的变量实例，所以console.log 输出的是我们期望的值，也就是循
环执行过程中每个迭代变量的值。
```js
for (let i=0;i<5;++i) {
    setTimeout(() => console.log(i)，0)
}
// 会输出0、1、2、3、4
```
这种每次迭代声明一个独立变量实例的行为适用于所有风格的 for 循环，包括 for-in和 for-of

### const

const的行为与let基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量，且尝试修改const声明的变量会导致运行时错误。

```js
const age = 26
age = 36; // TypeError: 给常量赋值
```

```js
// const也不允许重复声明
const age = 26
const age = 36 // SyntaxError
```

```js
// const声明的作用域也是块
const name = 'KESHAOYE'
if(true) {
  conat name = 'likewei'
}
console.log(name) // KESHAOYE
```

const声明的限制只是用与它指向的变量的引用。换句话说，如果const变量引用的是一个对象，那么修改这个对象内部的属性并不违反const的限制

```js
const person = {}
person.name = 'LIKEWEI' // ok
```

## 书写建议

- 不使用var
  
  有了let和const，大多数开发者会发现自己不再需要var了。限制自己只使用const和let有助于提升代码质量，因为变量有了明确的作用域、声明位置、以及不变的值

- const优先，let次之
  
  使用const声明可以让浏览器运行时强制保持变量不变，也可以让静态代码分析工具提前发现不合法的赋值操作。因此，很多开发者认为应该优先使用const来声明变量，只有提前知道未来会有修改时，再使用let。这样可以让开发者有信心的推断某些变量的值永远不变，同时也能迅速发现因意外赋值导致的非预期行为。
