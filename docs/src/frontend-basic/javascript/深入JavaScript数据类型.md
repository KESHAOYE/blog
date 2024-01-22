# 深入JavaScript数据类型（未完成）

前端JS基础第三弹，今天来深入JavaScript数据类型

ECMAScript有7种简单数据类型（原始类型）

- Undefined
- Null
- Boolean
- Number
- String
- Symbol（es6新增）
- BigInt（es11新增）

还有引用数据类型
- Object

## typeof 操作符

ECMAScript采用的是松散的类型系统，需要一种手段来确定任意变量的数据类型。typeof操作符就是为此而生的。对一个值使用typeof操作符会返回下列字符串之一：

- undefined 表示值为未定义
- boolean 表示值为布尔值
- string 表示值为字符串
- number 表示值为数值
- object 表示值为对象或null
- function 表示值为函数
- symbol 表示值为符号
- bigint 表示值为数字（任意大小的整数）

```js
let message = 'KESHAOYE so handsome'
console.log(typeof message) // string
console.log(typeof (message)) // string
```

**调用typeof null返回的是"object"，这是因为特殊值null被认为是一个空对象的引用**

## 数据类型详解

### undefined类型

Undefined类型只有一个值，那就是undefined，当使用var或let声明了变量但没有初始化时，就相当于给变量赋值了undefined值：

```js
 let a;
 console.log(a == undefined) // true

 // 上述代码与下列代码对等

let a = undefined;
console.log(a == undefined) // true

```

显式地以undefined来初始化是不必要的，因为默认情况下，任何未经初始化的变量都会取得undefined值

**包含undefined值的变量和未定义值还是有区别的**

```js
let message; // 这个变量被声明了，只是值未undefined

console.log(message) // undefined
consoel.log(age) // 报错

```

<span style='color:#ff4d4d'>未声明的变量，只有typeof操作是有效的，其他都会报错</span>

对未声明的变量和未初始化的变量调用typeof返回的均是undefined

> 建议在开发中在声明变量的同时初始化变量，这样就可以使用typeof判断变量是否声明

<span style='color:#ff4d4d'>undefined是一个假值</span>

```js
let message; // 定义变量 但未初始化 自动赋值为undefined
if(message) {
// 不执行
}
if(!message) {
// 执行
} 
if(age) {
// 报错
} 
```
### Null类型

Null类型同样只有一个值，即特殊值null。逻辑上，null值表示一个空对象指针，这也是给typeof传null会返回'Object'的原因

```js
let name = null
console.log(typeof name) // Object
```

在定义将来要保存对象值的变量时，建议使用null来初始化，不要使用其他值。这样，只要检查这个变量的值是不是null就可以知道这个变量是否在后来被重新赋予了一个对象的引用，比如：

```js
if(typeof car == 'Object' && !car == null) {
  // car是一个对象的引用
}
```

undefined值是由null值派生而来的，因此ECMAScript定义为表面上相等

```js
console.log(null == undefined) // true
```

即使undefined与null有关系，他们的用途也不完全一样，如前所述，永远不要显式的设置undefined。但null不是这样，任何时候，只有变量要保存对象，而当时又没有那个对象可保存，就要用null来填充该变量。这样那个就可以保持null是空对象指针的语义，并进一步将其与undefined区分开来。

<span style='color:#ff4d4d'>null是一个假值</span>

```js
let message = null; // 定义变量 但未初始化 自动赋值为undefined
let age;
if(message) {
// 不执行
}
if(!message) {
// 执行
} 
if(age) {
// 不执行
}
if(!age) {
// 执行
}
```

### Boolean类型

Boolean有两个字面值: true和false。这两个布尔值不等于数值，因此true不等于1，false不等于0

虽然Boolean值只有两个，但所有其他ECMAScript类型的值都有相应布尔值的等价形式，将其他类型的值转换为布尔值可以使用Boolean()转型函数

#### 转换规则（重要）

像if等流控制语句会自动执行其他类型值到布尔值的转换

|数据类型|转换为true的值|转换为false的值|
|---|---|---|
|Boolean|true|false|
|String|非空字符串|空字符串|
|Number|非零数值(包含无穷值)|0,NaN|
|Object|任意对象|null|
|undefined|不存在|undefined|

### Number类型

ECMAScript中最有意思的类型或许就是Number了。Number类型使用了IEE754格式表示整数和浮点值。不同的数值类型相应的也有不同的数值字面量格式

- 十进制整数
  最基本的数值字面量，直接写出来即可
  ```js
    let intNum = 10;
  ```
- 八进制整数
  第一个数字必须是0，然后是相应的八进制数字(数值0-7) **如果数值超过了八进制的范围，就会忽略前面的零，后面的数字序列会被当成十进制数**
  <span style='color: #ff4d4d'>八进制字面量在严格模式下无效，会抛出语法错误</span>
  ```js
  let octalNum1 = 070 // 八进制的56
  let octalNum2 = 079 // 无效，当成79处理
  let octalNum3 = 08 // 无效，当成8处理
  ```
- 十六进制整数
  要创建十六进制字面量，前缀为0x，然后是16进制数字(0-9以及A-F)。十六进制数字中的字母大小写均可。
  ```js
  let hexNum = 0xA // 十六进制10
  let hexNum2 = 0x1f // 十六进制31
  ```

#### 浮点值

要定义浮点值，数值中必须包含小数点，而且小数点后面必须至少有一个数字。虽然小数点前面不是必须有整数，但推荐加上

```js
let floatNum = 1.1
let floatNum2 = 0.1
let floatNum3 = .1 // 有效，但不推荐
```

因为储存浮点值使用的内存空间是存储整数值的两倍，所以ECMAScript会想方设法的把值转换为整数，具体为:

- 小数点后面没有数字，转换为整数
  ```js
  let num = 1.
  ```
- 本身是整数，小数点后面是0,转换为整数
  ```js
  let num = 1.0
  ```

对于非常大或非常小的数值，浮点值可以用科学计数法表示。科学计数法用于表示一个应该乘10的给定次幂的数值，ECMAScript的格式要求是一个数值后跟一个大写/小写的字母e，再加上要乘的10的幂次数
```js
let floatNum = 3.125e7 // 31250000
```

<span style='color: #ff4d4d'>默认情况下，ECMAScript会将小数点后至少包含6个零的浮点值转换为科学计数法</span>

浮点值的精确度最高可达17位小数，但在算术中远远不如整数精确（例如经典的0.1 + 0.2 == 0.3为false）

#### 值的范围

由于内存的限制，ECMASCript并不支持这个世界上的所有数值。ECMAScript可以表示的最大和最小数分别保存在Number.MAX_VALUE\Number.MIN_VALUE,如果某个计算后的数值操过了JS可以表示的范围，那么这个数值就会自动转换为一个特殊的Infinity，负数表示为Infinity。

如果计算返回正Infinity或负Infinity，则该值不能再继续进行计算。要判断一个数值是否在可计算范围内，可使用```isfinity```函数判断

```js
let a = Number.MAX_VALUE + Number.MIN_VALUE
console.log(isInfinty(a)) // false
```

#### NaN

有一个特殊的数值叫NaN，意思是不是数值，用于表示本来要返回数值的操作失败了。比如，用0除任意数值在其它语言中通常会导致错误，从而中断代码执行，但在ECMAScript中，0、+0、-0相除会返回NaN
```js
console.log(0/0) //NaN
console.log(+0/-0)// NaN
```

如果分子为非零，分母为有/无符号的0，则会返回Infinity或-Infinity
```js
console.log(5/0) // Infinity
console.log(5/-0)// -Infinity
```

<span style='color:#ff4d4d'>NaN进行任意运算返回的均为NaN、NaN不与任何值相等（包括NaN本身）</span>

```js
console.log(NaN == NaN) // false
```

ECMAScript提供了```isNaN()```函数。该函数接受一个参数，可以是任意数据类型，然后判断这个参数是否“不是数值”。把一个值传给isNaN()后，该函数会尝试把它转换为数值。某些非数值的值可以直接转换成数值，如字符串"10"或布尔值。任何不能转换为数值的值都会导致这个函数返回true。举例如下：
```js
console.log(isNaN(NaN)) // true
console.log(isNaN(10)) // false 10是数值
console.log(isNaN("10")) // false 可以转换为数值10
console.log(isNaN("blue")) // true 不能转换为数值
console.log(isNaN(true)) // false 可以转换数值1
```

##### Number.isNaN()和isNaN()的区别

- Number.isNaN()是ES6的方法， isNaN是ES5的方法
- NUmber.isNaN()用于判断某个变量是否等于NaN（不进行类型转换）

#### 数值转换

有3个函数可以将非数值转换为数值：Number()、parseInt()和parseFloat()

- Number：转型函数，可用于任何数据类型
  |类型|数值|返回值|
  |---|---|---|
  |Boolean|true|1|
  |Boolean|false|0|
  |Number||直接返回|
  |Null|null|0|
  |Undefined|undefined|NaN|
  |String|包含数值，包括数值字符前面带加、减号的情况，则转换为一个十进制数值。|Number("1")返回1, Number("123")返回123, Number("011")返回11|
  |String|包含浮点值|则会转换为相应的浮点值（同样，忽略前面的零）|
  |String|包含有效的十六进制格式|转换为与该十六进制值对应的十进制整数|
  |String|空字符串|0|
  |String|其他字符|NaN|
  |Object|调用valueOf()方法，按照上述规则（如果转换结果是NaN，则调用toString()方法，再按照转换字符串的规则转换）|

```js
  let num1 = Number("Hello world! ");   // NaN
  let num2 = Number("");                  // 0
  let num3 = Number("000011");          // 11
  let num4 = Number(true);               // 1
```

<span style='color: #ff4d4d'>考虑到用Number()函数转换字符串时相对复杂且有点反常规，通常在需要得到整数时可以优先使用parseInt()函数。parseInt()函数更专注于字符串是否包含数值模式</span>

- parseInt：更专注于字符串是否包含数值模式

  字符串最前面的空格会被忽略，从**第一个非空格字符开始转换**。**如果第一个字符不是数值字符、加号或减号，parseInt()立即返回NaN**。这意味着空字符串也会返回NaN（这一点跟Number()不一样，它返回0）。如果第一个字符是数值字符、加号或减号，则继续依次检测每个字符，直到字符串末尾，或碰到非数值字符。比如，"1234blue"会被转换为1234，因为"blue"会被完全忽略。类似地，"22.5"会被转换为22，因为小数点不是有效的整数字符。假设字符串中的第一个字符是数值字符，parseInt()函数也能识别不同的整数格式（十进制、八进制、十六进制）。换句话说，如果字符串以"0x"开头，就会被解释为十六进制整数。如果字符串以"0"开头，且紧跟着数值字符，在非严格模式下会被某些实现解释为八进制整数。

```js
    let num1 = parseInt("1234blue");   // 1234
    let num2 = parseInt("");             // NaN
    let num3 = parseInt("0xA");         // 10，解释为十六进制整数
    let num4 = parseInt(22.5);          // 22
    let num5 = parseInt("70");          // 70，解释为十进制值
    let num6 = parseInt("0xf");         // 15，解释为十六进制整数
```
不同的数值格式很容易混淆，因此parseInt()也接收第二个参数，用于指定底数（进制数）。如果知道要解析的值是十六进制，那么可以传入16作为第二个参数，以便正确解析：

```js
    let num = parseInt("0xAF", 16); // 175
```

事实上，如果提供了十六进制参数，那么字符串前面的"0x"可以省掉：

```js
    let num1 = parseInt("AF", 16);   // 175
    let num2 = parseInt("AF");        // NaN
```

在这个例子中，第一个转换是正确的，而第二个转换失败了。区别在于第一次传入了进制数作为参数，告诉parseInt()要解析的是一个十六进制字符串。而第二个转换检测到第一个字符就是非数值字符，随即自动停止并返回NaN。

通过第二个参数，可以极大扩展转换后获得的结果类型。比如：
```js
    let num1 = parseInt("10", 2);    // 2，按二进制解析
    let num2 = parseInt("10", 8);    // 8，按八进制解析
    let num3 = parseInt("10", 10);   // 10，按十进制解析
    let num4 = parseInt("10", 16);   // 16，按十六进制解析
```
**因为不传底数参数相当于让parseInt()自己决定如何解析，所以为避免解析出错，建议始终传给它第二个参数。**

> 注意 多数情况下解析的应该都是十进制数，此时第二个参数就要传入10

- parseFloat

    parseFloat()函数的工作方式跟parseInt()函数类似，都是从位置0开始检测每个字符。同样，它也是解析到字符串末尾或者解析到一个无效的浮点数值字符为止。这意味着第一次出现的小数点是有效的，但第二次出现的小数点就无效了，此时字符串的剩余字符都会被忽略。因此，"22.34.5"将转换成22.34。parseFloat()函数的另一个不同之处在于，它始终忽略字符串开头的零。这个函数能识别前面讨论的所有浮点格式，以及十进制格式（开头的零始终被忽略）。十六进制数值始终会返回0。因为**parseFloat()只解析十进制值**，因此不能指定底数。最后，如果字符串表示整数（没有小数点或者小数点后面只有一个零），则parseFloat()返回整数。下面是几个示例：

```js
    let num1 = parseFloat("1234blue");   // 1234，按整数解析
    let num2 = parseFloat("0xA");         // 0
    let num3 = parseFloat("22.5");        // 22.5
    let num4 = parseFloat("22.34.5");    // 22.34
    let num5 = parseFloat("0908.5");     // 908.5
    let num6 = parseFloat("3.125e7");    // 31250000
```

### String类型

String（字符串）数据类型表示零或多个16位Unicode字符序列。字符串可以使用双引号（"）、单引号（'）或反引号（`）标示，因此下面的代码都是合法的：

```js
    let firstName = "John";
    let lastName = 'Jacob';
    let lastName = `Jingleheimerschmidt`
    let firstName = 'Nicholas"; // 语法错误：开头和结尾的引号必须是同一种
```

#### 字符字面量

字符串数据类型包含一些字符字面量，用于表示非打印字符或有其他用途的字符，如下表所示：

![字符字面量](https://res.weread.qq.com/wrepub/epub_34336683_14)

字面量可以出现在字符串中的任意位置，且可以作为单个字符被解释

```js
    let text = "This is the letter sigma: \u03a3.";
```

在这个例子中，即使包含6个字符长的转义序列，变量text仍然是28个字符长。因为转义序列表示一个字符，所以只算一个字符。

字符串的长度可以通过其length属性获取：

```js
    console.log(text.length); // 28
```

#### 字符串的特点

ECMAScript中的字符串是不可变的（immutable），意思是一旦创建，它们的值就不能变了。要修改某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量，如下所示：

```js
    let lang = "Java";
    lang = lang + "Script";
```

这里，变量lang一开始包含字符串"Java"。紧接着，lang被重新定义为包含"Java"和"Script"的组合，也就是"JavaScript"。整个过程首先会分配一个足够容纳10个字符的空间，然后填充上"Java"和"Script"。最后销毁原始的字符串"Java"和字符串"Script"，因为这两个字符串都没有用了。所有处理都是在后台发生的，而这也是一些早期的浏览器（如Firefox 1.0之前的版本和IE6.0）在拼接字符串时非常慢的原因。这些浏览器在后来的版本中都有针对性地解决了这个问题。

#### 转换为字符串

有两种方式把一个值转换为字符串。

- toString()
  这个方法唯一的用途就是返回当前值的字符串等价物
  ```js
      let age = 11;
      let ageAsString = age.toString();        // 字符串"11"
      let found = true;
      let foundAsString = found.toString();   // 字符串"true"
  ```

除了null和undefined，其他类型均有toString方法
String类型的toString只是简单的返回自身副本

大多数情况下，toString不接受任何参数。但是在数值类型调用toString方法时，toString可以接受一个底数参数，即进制数。
默认情况下，toString()返回数值的十进制字符串表示。而通过传入参数，可以得到数值的二进制、八进制、十六进制，或者其他任何有效基数的字符串表示，比如：

```js
    let num = 10;
    console.log(num.toString());      // "10"
    console.log(num.toString(2));     // "1010"
    console.log(num.toString(8));     // "12"
    console.log(num.toString(10));    // "10"
    console.log(num.toString(16));    // "a"
```

- String()
如果你不确定一个值是不是null或undefined，可以使用String()转型函数，它始终会返回表示相应类型值的字符串。String()函数遵循如下规则。

1. 如果值有toString()方法，则调用该方法（不传参数）并返回结果。
2. 如果值是null/undefined，返回"null","undefined"。

```js
    let value1 = 10;
    let value2 = true;
    let value3 = null;
    let value4;
    console.log(String(value1)); // "10"
    console.log(String(value2));   // "true"
    console.log(String(value3));   // "null"
    console.log(String(value4));   // "undefined"
```

#### 模板字符串

ECMAScript 6新增了使用模板字面量定义字符串的能力。与使用单引号或双引号不同，模板字面量保留换行字符，可以跨行定义字符串：

```js
    let myMultiLineString = 'first line\nsecond line';
    let myMultiLineTemplateLiteral = `first line
    second line`;
    console.log(myMultiLineString);
    // first line
    // second line"
    console.log(myMultiLineTemplateLiteral);
    // first line
    // second line
    console.log(myMultiLineString === myMultiLinetemplateLiteral); // true
```

顾名思义，模板字面量在定义模板时特别有用，比如下面这个HTML模板：

```js
    let pageHTML = `
    <div>
      <a href="#">
        <span>Jake</span>
      </a>
    </div>`;
```

由于模板字面量会保持反引号内部的空格，因此在使用时要格外注意。格式正确的模板字符串看起来可能会缩进不当：

```js
    // 这个模板字面量在换行符之后有25 个空格符
    let myTemplateLiteral = `first line
                              second line`;
    console.log(myTemplateLiteral.length);   // 47
    // 这个模板字面量以一个换行符开头
    let secondTemplateLiteral = `
    first line
    second line`;
    console.log(secondTemplateLiteral[0] === '\n'); // true
    // 这个模板字面量没有意料之外的字符
    let thirdTemplateLiteral = `first line
    second line`;
    console.log(thirdTemplateLiteral);
    // first line
    // second line
```

#### 字符串插值

模板字面量最常用的一个特性是支持字符串插值，也就是可以在一个连续定义中插入一个或多个值。技术上讲，模板字面量不是字符串，而是一种特殊的JavaScript句法表达式，只不过求值后得到的是字符串。模板字面量在定义时立即求值并转换为字符串实例，任何插入的变量也会从它们最接近的作用域中取值。

字符串插值通过在${}中使用一个JavaScript表达式实现：

```js
    let value = 5;
    let exponent = 'second';
    // 以前，字符串插值是这样实现的：
    let interpolatedString =
      value + ' to the ' + exponent + ' power is ' + (value ＊ value);
    // 现在，可以用模板字面量这样实现：
    let interpolatedTemplateLiteral =
      `${ value } to the ${ exponent } power is ${ value ＊ value }`;
    console.log(interpolatedString);              // 5 to the second power is 25
    console.log(interpolatedTemplateLiteral);   // 5 to the second power is 25
```

所有插入的值都会使用toString()强制转型为字符串，而且任何JavaScript表达式都可以用于插值。嵌套的模板字符串无须转义：

```js
    console.log(`Hello, ${ `World` }! `);   // Hello, World!
```

将表达式转换为字符串时会调用toString()：

```js
    let foo = { toString: () => 'World' };
    console.log(`Hello, ${ foo }! `);        // Hello, World!
```

在插值表达式中可以调用函数和方法：

```js
    function capitalize(word) {
      return `${ word[0].toUpperCase() }${ word.slice(1) }`;
    }
    console.log(`${ capitalize('hello') }, ${ capitalize('world') }! `); // Hello, World!
```

此外，模板也可以插入自己之前的值：

```js
    let value = '';
    function append() {
      value = `${value}abc`
      console.log(value);
    }
    append();   // abc
    append();   // abcabc
    append();   // abcabcabc
```

#### 模板字面量标签函数

模板字面量也支持定义标签函数（tag function），而通过标签函数可以自定义插值行为。标签函数会接收被插值记号分隔后的模板和对每个表达式求值的结果。标签函数本身是一个常规函数，通过前缀到模板字面量来应用自定义行为，如下例所示。标签函数接收到的参数依次是原始字符串数组和对每个表达式求值的结果。这个函数的返回值是对模板字面量求值得到的字符串。

<span>第一个参数是原始的字符串，后面的参数是每个插值表达式的运算结果</span>

```js
    let a = 6;
    let b = 9;
    function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
      console.log(strings);
      console.log(aValExpression);
      console.log(bValExpression);
      console.log(sumExpression);
      return 'foobar';
    }
    let untaggedResult = `${ a } + ${ b } = ${ a + b }`;
    let taggedResult=simpleTag`${a}+${b}=${a+b}`;
    // ["", " + ", " = ", ""]
    // 6
    // 9
    // 15
    console.log(untaggedResult);    // "6 + 9 = 15"
    console.log(taggedResult);      // "foobar"
```

因为表达式参数的数量是可变的，所以通常应该使用剩余操作符（rest operator）将它们收集到一个数组中：

```js
    let a = 6;
    let b = 9;
    functionsimpleTag(strings, ...expressions){
      console.log(strings);
      for(const expression of expressions) {
        console.log(expression);
      }
      return 'foobar';
    }
    let taggedResult = simpleTag`${ a } + ${ b } = ${ a + b }`;
    // ["", " + ", " = ", ""]
    // 6
    // 9
    // 15
    console.log(taggedResult);   // "foobar"
```

对于有n个插值的模板字面量，传给标签函数的表达式参数的个数始终是n，而传给标签函数的第一个参数所包含的字符串个数则始终是n+1。因此，如果你想把这些字符串和对表达式求值的结果拼接起来作为默认返回的字符串，可以这样做：

```js
    let a = 6;
    let b = 9;
    function zipTag(strings, ...expressions) {
      return strings[0] +
              expressions.map((e, i) => `${e}${strings[i + 1]}`)
                        .join('');
    }
    let untaggedResult =     `${ a } + ${ b } = ${ a + b }`;
    let taggedResult = zipTag`${ a } + ${ b } = ${ a + b }`;
    console.log(untaggedResult);   // "6 + 9 = 15"
    console.log(taggedResult);     // "6 + 9 = 15"
```

#### 原始字符串

使用模板字面量也可以直接获取原始的模板字面量内容（如换行符或Unicode字符），而不是被转换后的字符表示。为此，可以使用默认的String.raw标签函数：

```js
    // Unicode示例
    // \u00A9 是版权符号
    console.log(`\u00A9`);               // ©
    console.log(String.raw`\u00A9`);   // \u00A9
    // 换行符示例
    console.log(`first line\nsecond line`);
    // first line
    // second line
    console.log(String.raw`first line\nsecond line`); // "first line\nsecond line"
    // 对实际的换行符来说是不行的
    // 它们不会被转换成转义序列的形式
    console.log(`first line
    second line`);
    // first line
    // second line
    console.log(String.raw`first line
    second line`);
    // first line
    // second line
```

另外，也可以通过标签函数的第一个参数，即字符串数组的．raw属性取得每个字符串的原始内容：

```js
    function printRaw(strings) {
      console.log('Actual characters:');
      for (const string of strings) {
        console.log(string);
      }
      console.log('Escaped characters; ');
      for (const rawString of strings.raw) {
        console.log(rawString);
      }
    }
    printRaw`\u00A9${ 'and' }\n`;
    // Actual characters:
    // ©
    //（换行符）
    // Escaped characters:
    // \u00A9
    // \n
```

### symbol(待填坑)

Symbol是ECMAScript6新增的数据类型。Symbol符号是原始值，且符号实例是唯一的，不可变的。**符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险**

听起来和私有属性类似，但Symbol并不是为了提供私有属性的行为才增加的。相反，符号是用来创建唯一符号，进而用作非字符串形式的对象属性。

#### Symbol的基本用法

它可以选择接受一个字符串作为参数或者没有参数，但是相同参数的两个Symbol值也是不相等的。

```js
 // 不带参数
 const s1 = Symbol()
 const s2 = Symbol()
 console.log(s1 === s2) // false

 const s3 = Symbol('test')
 const s4 = Symbol('test')
 console.log(s3 === s3) // false
```

<span style='color: red'>Symbol不是一个完整的构造函数，不能通过 new Symbol()来创建</span>

```js
console.log(typeof s1) // symbol
```

#### 使用全局符号注册表

如果需要重用符号，就需要使用```Symbol.for()```方法

Symbol.for()对每个字符串都执行幂等操作。第一次使用某个字符串调用时，他会检查全局，如果不存在对应的符号则创建新符号实例
如果存在则直接返回该符号实例。


```js
let fooGlobalSymbol = Symbol.for('shuai')
let otherFooGlobalSymbol = Symbol.for('shuai')

console.log(fooGlobalSymbol === otherFooGlobalSymbol) // true

```

即使使用相同的符号，使用Symbol.for()和Symbol()定义的符号也不相同

```js
let localSymbol = Symbol('test')
let globalSymbol = Symbol.for('test')
console.log(localSymbol === globalSymbol) // false
```

还可以使用Symbol.keyFor()来查询全局符号，这个方法的参数是一个符号，返回该全局符号对应的字符串键。如果查询的不是全局符号，返回undefined。

```js
let key = Symbol.for('foo')
console.log(Symbol.keyFor(key)) // foo

let key2 = Symbol('test')
console.log(Symbol.keyFor(key2)) // undefined

console.log(Symbol.keyFor(123))// TypeError: 123 is not a symbol
```

#### 使用符号作为属性

凡是可以使用字符串或数值作为属性的地方，都可以使用符号。这就包括了对象字面量属性和Object.defineProperty  |  Object.definedProperties定义的属性。对象字面量只能在计算属性语法中使用符号作为属性。

```js
  let s1 = Symbol('foo')
      s2 = Symbol('bar')
      s3 = Symbol('baz')
      s4 = Symbol('quz')
  let o = {
    [s1]: 'foo val'
  }
  // 等价于 o[s1] = 'foo val'
  console.log(o) // Symbol('foo'): 'foo val'

  // ********

  Object.definedProperty(o, s2, {value: 's2hhhh'})
   
  console.log(o) // {Symbol('foo'): 'foo val' , Symbol('bar'): 's2hhhh'}

  Object.definedProperties(o, 
  {
    [s3]: {value: 's3hhh'},
    [s4]: {value: 's4hhh'}
  })
  
  console.log(o) // {Symbol('foo'): 'foo val' , Symbol('bar'): 's2hhhh', Symbol('baz'): 's3hhhh', Symbol('quz'): 's4hhhh'}

```

### Object类型(..)

## 数据类型之间的转换总结

JavaScript是一种弱类型语言，变量的类型由值的类型决定，这种特性在给我们带来便利的同时，也带来了困扰

JS的类型转换分为显性转换和隐性转换两种，前文我们已经大致梳理了显性转换，现在我们来进行一个总结

### 显式转换

- 转为Boolean型
  
  **使用Boolean()方法**
  
  |类型|值|转换结果|
  |---|---|---|
  |String|非空字符串|true|
  |String|空字符串|false|
  |Number|0|false|
  |Number|非0|true|
  |Null|null|false|
  |Undefined|undefined|false|
  |Object|任意非空对象|true|

- 转为Number型
  
  [**使用Number()方法、parseInt()、parseFloat()**](#数值转换)

  |类型|值|转换结果|
  |---|---|---|
  |Boolean|true|1|
  |Boolean|false|0|
  |Null|null|0|
  |Undefined|undefined|NaN|
  |String| a123|NaN|
  |String|  123abc456|使用Number时NaN，使用pI、pF时123|

  String类型更推荐使用parseInt / parseFloat


- 转为String型

  **使用String()方法、toString()**

  除了null和undefined其他类型均有toString方法

  在不确定值是否为null和undefined的情况下使用String()转型方法

  String()方法会自动判断，如果支持toString方法则调用，否则返回null/undefined


### 隐式转换

  与显式转换不同，隐式转换是由JS自动完成的

  #### 隐式转换发生条件
  
  涉及隐式转换最多的运算符是 + 和 == ，-（减号） /（除号）*（乘号）只会针对Number类型

  隐式转换主要涉及三种转换

  - 将值转换为原始值（原始类型的值）
      
      JS内部在隐式转换时有ToPrimitive的操作
      ```ToPrimitive(input,PreferredType?)```
      - input 要转换的值
      - PreferredType 可选参数，可以是Number或者String类型
      
          **如果PreferredType的值是Number**
          
          1. 如果传入值是一个原始值，直接返回
          2. 否则，如果输入的值是一个对象，调用该对象的```valueOf```方法,如果```valueOf```方法的返回值是一个原始值，则返回这个原始值
          3. 否则，调用这个方法的```toString```方法，如果```toString```方法的返回值是一个原始值，则返回这个原始值
          4. 否则，抛出TypeError异常
          
          **如果PreferredType的值是String**

          5. 如果传入值是一个原始值，直接返回
          6. 否则，调用这个方法的```toString```方法，如果```toString```方法的返回值是一个原始值，则返回这个原始值
          7. 否则，如果输入的值是一个对象，调用该对象的```valueOf```方法,如果```valueOf```方法的返回值是一个原始值，则返回这个原始值
          8. 否则，抛出TypeError异常

          **没有设置PreferredType时，将会按照下列规则自动设置**

          9. 如果该对象为Date类型，设置为String
          10. 否则设置为Number类型

  - 将值转换为数字（toNumber）
      
      1. undefined、null、NaN、false转换为0

      2. true转换为1

      3. 数字无需转换

      4. 字符串解析为数字，'324'转换为324，'qwer'转换为NaN

      5. 对象先进行```ToPrimitive```转换得到原始值，再进行ToString转换为字符串

  - 将值转换为字符串（toString）
      
      1. undefined、null转换为'undefined'、'null'

      2. true、false转换为'true'、'false'

      3. 数字转为字符串，1.2转换为'1.2'

      4. 字符串无需转换

      5. 对象(obj)先进行 ```ToPrimitive(obj, String)```转换得到原始值，再进行 ToString 转换为字符串

    ### == 运算符隐式转换

    分为两种情况：类型相同 及 类型不同

    - 类型相同
      1. 均为undefined时，返回true
      2. 均为null时，返回true
      3. 均为string时，如果长度相同，且对应字符在对应位置，返回true
      4. 均为Boolean时，相同，返回true
      5. 均为Number时，分为几种情况
        (1) 均为NaN时，返回false
        (2) 均为+-0时，返回true
        (3) 为相同数值时，返回true
    - 类型不同
      1. null和undefined，返回true
      2. Number和String转换为Number进行比较
      3. Boolean转换为Number类型比较
      4. Object和String或Number进行比较时，将Object转换为原始类型后再进行比较
    ### 例子

    ```
    ({} + {})= ?
    两个对象进行 + 运算，要先进行隐式转换为原始类型才能进行计算
    1. 进行ToPrimitive转换，由于没有指定PreferredType类型，{}会使默认值为Number，进行ToPrimitive(input, Number)运算
    2. 所以会执行valueOf方法，{}.valueOf返回的还是{}，不是原始类型
    3. 继续执行toString方法，{}.toString返回[Object Object]
    所以结果是"[Object Object]"+"[Object Object]" = "[Object Object] [Object Object]"
    ```

    ```
    2 * {} = ?
    1. 因为*运算符只能对number类型进行运算，所以第一步就是对{}进行toNumber运算
    2. {}对象要进行toPrimitive(input, preferredType?)运算
    3. 未指定preferredType且不是Date类型，所以默认为Number，先调用valueOf，得到的非原始类型，还是{}
    4. 再调用toString方法，得到[Object object]
    5. 再进行toNumber运算，得到NaN
    所以结果是2 * NaN = NaN
    ```

    ```js
    let a = {
      valueOf: function() {
        return 1;
      },
      toString: function() {
        return '123'
      }
    }
    true == a // true
    // 转换规则如下：
    // 1. a为对象先进行toPrimitive转换
    // 2. 未指定preferredType，默认为number,调用valueOf方法，得到1
    // 3. 转换为 true == 1
    // 4. true为Boolean类型，进行ToNumber转换为Number，得到1
    // 5. 1 == 1 得到true 
    ```

## valueOf和toString