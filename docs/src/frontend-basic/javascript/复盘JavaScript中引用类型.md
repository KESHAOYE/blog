<!--
 * @Author: KESHAOYE
 * @Date: 2023-04-19 22:29:36
-->
# 复盘JavaScript中引用类型

引用值（或者对象）是某个特定引用类型的实例。在ECMASCript中，引用类型是把数据和功能组织到一起的结构，有时候被称为“对象定义”，因为他们描述了自己对象应有的属性和方法

对象被认为是某个特定引用类型的实例。新对象通过new操作符后跟一个构造函数来创建。构造函数就是用来创建新对象的函数

```js
let now = new Date()
```

## Date

ECMAScript的Date参考了Java早期版本中的java.util.Date。为此，Date类型将日期保存为自协调时间时(UTC)时间1970年1月1日午夜（零时）至今所经过的毫秒数。

要创建日期对象，就是用new操作符来调用Date构造函数

```js
let now = new Date()
```

在不传参的情况下，Date默认返回当前的时间和日期。

要基于其他日期和时间创建日期对象，必须传入其毫秒表示。ECMAScript为此提供了两个辅助函数
\
- Date.parse()
  
  接受一个表示日期的字符串，尝试将这个日期字符串转换为对应的毫秒数。传入的参数必须为下列格式

  - 月/日/年  8/30/2023
  ```js
  Date.parse('8/30/2023') // 1693324800000
  ```
  - 月（英文） 日,年  August 30,2023
  ```js
  Date.parse('August 30,2023') // 1693324800000
  ```
  - 周几 月名 日 年 时:分:秒 时区  Tue August 30 2023 00:00:00 GMT-0700
  ```js
  Date.parse('Wed August 30 2023 00:00:00 GMT-0700') // 1693378800000
  ```
  - ISO8601扩展格式   YYYY-MM-DDTHH:mm:ss:sssZ  2023-08-30T00:00:00
  ```js
  Date.parse('Wed August 30 2023 00:00:00 GMT-0700') // 1693324800000
  ```
  <span style='color: red'>如果传给Date.parse()的字符串不表示日期，则会返回NaN</span>

  如果在直接把日期字符串作为参数传给构造函数，那么JavaScript会在后台自动调用```Date.parse()```

  ```js
  let now = Date.parse('2023-08-30T00:00:00')
  // 等价于
  let now = new Date('2023-08-30T00:00:00')
  ```

- Date.UTC() 方法也返回日期的毫秒表示，但使用的是跟Date.parse()不同的信息来生成这个值。

传给Date.UTC的参数是年、零起点月数(0~11)、日、时、分、秒、毫秒。  <span style='color: red'>这些参数中只有前两个参数是必须的(年、月)</span>

如果不提供日，那么默认为1日。其他参数默认为0.

```js
let y2k = Date.UTC(2023,0) // 表示2023-1-1 00:00:00

let allFives = Date.UTC(2023, 3, 21, 0, 0, 0) // 表示2023-04-21 00：00：00
```

Date.UTC()也会被Date构造函数隐式调用，但是隐式调用采用的是计算机本地的时区而不是GMT时区

```js
let y2k = new Date(2023,0) // 表示2023-1-1 00:00:00

let allFives = new Date(2023, 3, 21, 0, 0, 0) // 表示2023-04-21 00：00：00
```

- Date.now()方法返回执行时的日期和时间的毫秒数

### 继承的方法

- toLocaleString()
  
  返回与计算机本地环境一致的日期和时间。

  ```js
  new Date().toLocaleString() //'2023/4/21 00:14:49'
  ```

- toString()
  
  返回带时区信息的日期和时间

  ```js
  new Date().toString() // 'Fri Apr 21 2023 00:16:42 GMT+0800 (中国标准时间)'
  ```

- valueOf()

  不返回字符串，而返回日期对应的毫秒数

  ```js
  new Date().valueOf() // 1682007512788
  ```

### 日期格式化的方法

- toDateString()
  
  ```'Fri Apr 21 2023'```

- toTimeString()
  
  ```'00:20:57 GMT+0800 (中国标准时间)'```

- toLocaleDateString()

  ```'2023/4/21'```

- toLocaleTimeString()
  
  ```'00:21:43'```

- toUTCString()

  ```'Thu, 20 Apr 2023 16:22:04 GMT'```

### UTC和GMT

- UTC：根据原子钟计算
  
  现在使用的时间标准，更加准确

- GMT：根据地球的自转和公转计算


### 其他方法

|方法|备注|
|---|---|
|getTime()|返回日期的毫秒数，与**valueOf**相同|
|setTime(milliseconds)|设置日期的毫秒数，改变整个日期|
|getFullYear()|返回四位数年（2023）|
|getUTCFullYear()|返回UTC日期的四位数年|
|setFullYear(year)|设置日期的年|
|setUTCFullYear(year)|设置UTC日期的年|
|getMonth()|返回日期的月（0~11）|
|getUTCMonth()|返回UTC日期的月（0~11）|
|setMonth(month)|设置日期的月|
|setUTCMonth(month)|设置UTC日期的月|
|getDate()|返回日期的日（1~31）|
|getUTCDate()|返回UTC日期的日（1~31）|
|setDate(date)|设置日期的日|
|setUTCDate(date)|设置UTC日期的日|
|getDay()|返回日期中表示周几（0~6）|
|getUTCDay()|返回UTC日期中表示周几（0~6）|
|setDay(day)|设置日期中的周几|
|setUTCDay(day)|设置UTC日期中的周几|
|getHours()|返回日期中的小时|
|getUTCHours()|返回UTC日期中的小时|
|setHours()|设置日期中的小时|
|setUTCHours()|设置UTC日期中的小时|
|getMinutes()|返回日期中的分钟|
|getUTCMinutes()|返回UTC日期中的分钟|
|setMinutes()|设置日期中的分钟|
|setUTCMinutes()|设置UTC日期中的分钟|
|getSeconds()|返回日期中的秒|
|getUTCSeconds()|返回UTC日期中的秒|
|setSeconds()|设置日期中的秒|
|setUTCSeconds()|设置UTC日期中的秒|
|getMilliseconds()|返回日期中的毫秒|
|getUTCMilliseconds()|返回UTC日期中的毫秒|
|setMilliseconds()|设置日期中的毫秒|
|setUTCMilliseconds()|设置UTC日期中的毫秒|
|getTimezoneOffset()||

## RegExp

ECMAScript通过RegExp类型支持正则表达式。

```js
let expression = /pattern/flags;
// pattern表示正则表达式
// flags表示匹配的模式
```

|标记|模式|备注|
|---|---|---|
|g|全局模式|表示查找字符串的全部内容，而不是找到第一个就结束|
|i|不区分大小写|表示在查找时忽略大小写|
|m|多行模式|表示查找到一行末尾后会继续查找|
|y|粘附模式|表示只查找从lastIndex开始及之后的字符串|
|u|Unicode模式|启用Unicode模式|
|s|dotAll模式|表示元字符，匹配任何字符|

### 正则表达式



|符号|名称|作用|
|---|---|---|
|？|限定符|表示前面的字符需要出现0或1次|
|*|限定符|表示前面的字符需要出现0次或多次|
|+|限定符|表示前面的字符需要出现1次以上|
|\{number\}\/\{number1,number2\}|限定符|表示前面的字符需要出现number次,花括号内存在多个数字，则字符需要出现number1-number2次，传入一个数字加逗号表示需要出现number次以上|
|(A\|B)|或运算符|A或B|
|[abc]\/[a-zA-Z0-9]|字符类||

#### 元字符

##### 集合

```[]```表示匹配所包含的任意一个字符，例如```[Jj]avaScript```就能匹配JavaScript和javascript

```js
  let str = '123456woaiJavaScript,javaScript是世界上最好的语言'
  str.match(/[Jj]avaScript/g) // ['JavaScript', 'javaScript']
```
在集合中使用 - 可以匹配范围内的字符，例如[a-z]可以匹配a-z任意一个字符

```js
  let str = 'aavaScript123bavaScript'
  str.match(/[a-z]avaScript/g) // ['aavaScript', 'bavaScript']
```

#### 次数字符（限定符）

- *表示后面可以跟0个或多个字符
- ？表示后面可以跟0个或1个字符
- +表示后面可以跟1个或多个字符
- {n, m}表示后面可以跟n到m个字符

```js
[a-z]?avascript

javascript // javascript
abcdefgavascript // gavascript
avascript // false
```

```js
// 匹配11位数手机号
[0-9]{11}
```

#### 并列

需要匹配两个字符中的一个的时候，就用A|B,匹配到了A就不会匹配B

#### 提取

#### 特定符号

|字符串|含义|
|---|---|
|^|匹配字符串开始的位置|
|$|匹配字符串结束的位置|
|.|匹配除换行符之外所有单字符|
|\b|匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\b' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'。|
|\B|匹配非单词边界。'er\B' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。|
|\d|匹配一个数字字符。等价于 [0-9]。|
|\D|匹配一个非数字字符。等价于 [^0-9]。|
|\f|匹配一个换页符。|
|\n|匹配一个换行符。|
|\r|匹配一个回车符。|
|\t|匹配一个制表符。|
|\v|匹配一个垂直制表符。|
|\s|匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。|
|\S|匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。|
|\w|匹配字母、数字、下划线。等价于'[A-Za-z0-9_]'。|
|\W|匹配非字母、数字、下划线。等价于 '[^A-Za-z0-9_]'。|




## 原始值包装类型

为了方便操作原始值，ECMAScript提供了3种特殊的引用类型

- Boolean
- String
- Number

### Boolean

Boolean是对应布尔值的引用类型。要创建一个Boolean对象，就使用Boolean构造函数并传入true或false

```js
let booleanObject = new Boolean(true);
```

Boolean的实例会重写valueOf()方法，返回一个原始值true或false。toString()被调用时也会被覆盖，返回字符串'true'或'false'

<span style='color:red'>不建议使用Boolean对象，而建议使用原始布尔值</span>

### Number

Number是对应数值的引用类型。要创建Number对象，就使用Number构造函数并传入一个数值

```js
let numberObject = new Number(10)
```

Number实例重写了valueOf()、toLocaleString()、toString()方法

valueOf()返回Number对象表示的原始数值
toLocaleString()和toString()返回数值字符串，toString(进制)接受一个参数，返回对应进制数

除了继承的方法，Number类型还提供了几个用于将数值格式化为字符串的方法

- tofixed(小数点位数)：返回包含指定小数点位数的数值字符串
  ```js
  let num = 10
  console.log(num.toFixed(2)) // 10.00
  ```
- toExponential(小数的位数):返回以科学计数法表示的数值字符串
  ```js
  let num = 10
  console.log(num.toExponential(1)) // 1.0e+1
  // 一般来说，小数字不用表示为科学计数法，如果想得到最合适的形式toPrecision()
  ```
- toPrecision(小数位数):返回合适形式的数
  ```js
  let num = 99
  console.log(num.toPrecision(1)) // 1e+2
  console.log(num.toPrecision(2)) // 99
  console.log(num.toPrecision(3)) // 99.0
  ```
- isInteger()与安全整数
  
  ES6新增了Number.isInteger()方法，用于辨别一个数值是否保存为整数。有时候，小数位的0可能会让人误以为数值是一个浮点值
  ```js
    console.log(Number.isInteger(1)) // true
    console.log(Number.isInteger(1.00)) // true
    console.log(Number.isInteger(1.01)) // false
  ```
- isSafeInteger()
  
  IEE754数值格式有一个特殊的数值范围（-2的53次方 + 1）到（2的53次方 - 1），用Number.isSafeInteger()方法可以鉴别整数是否在安全范围内


#### String

String是对应字符串的引用类型。要创建String对象，使用String构造函数并传入一个数值

```js
let stringObject = new String('hello world')
```

String对象的方法可以在所有字符串原始值上调用

3个继承方法valueOf()、toLocaleString()、toString()都返回对象的原始字符串值

- length
  每个String对象都有一个length属性，表示字符串种字符的数量

  ```js
  let stringValue = 'hello world'
  console.log(stringValue.length) // 11
  ```

- chatAt(index)
  
  index取值为(0 - str.length -1),返回对应位置的字符

- charCodeAt(index)

  index取值为（0 - str.length -1）,返回对应字符的unicode代码

- concat()
  
  用于将一个或多个字符串拼接为一个新字符串

- slice(beginIndex， !endIndex)
  
  提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串
  
  beginIndex： 从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待，这里的strLength 是字符串的长度（例如，如果 beginIndex 是 -3 则看作是：strLength - 3）
 
  endIndex: 可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice() 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex，这里的 strLength 就是字符串的长度 (例如，如果 endIndex 是 -3，则是，strLength - 3)。
  
- substring(indexStart, !indexEnd)

  返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引直到字符串的末尾的一个子集。

  indexStart: 需要截取的第一个字符的索引，该索引位置的字符作为返回的字符串的首字母。

  indexEnd: 可选。一个 0 到字符串长度之间的整数，以该数字为索引的字符不包含在截取的字符串内。

  <span style='color: red'>与slice不同，如果参数为负数，则默认修改为0</span>

- indexOf(searchString, !position)
  
  要搜索的子字符串，搜索整个调用字符串，并返回指定子字符串第一次出现的索引。给定第二个参数：一个数字，该方法将返回指定子字符串在大于或等于指定数字的索引处的第一次出现。

  searchString: 要搜索的子字符串

  position: 可选，默认为0，指定子字符串在大于或等于 position 位置的第一次出现的索引

- lastIndexOf(searchValue, !fromIndex)
  
  从后向前搜索，返回字符串第一次出现的索引值

  searchValue:一个字符串，表示被查找的值。

  fromIndex: 可选,待匹配字符串 searchValue 的开头一位字符从 str 的第 fromIndex 位开始向左回向查找。fromIndex默认值是 +Infinity。如果 fromIndex >= str.length ，则会搜索整个字符串。如果 fromIndex < 0 ，则等同于 fromIndex == 0。

- startsWith(searchValue, !position)

  用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。

- endsWith(searchValue, !length)

用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。

- includes(searchValue, !position)
  
  执行区分大小写的搜索，以确定是否可以在另一个字符串中找到一个字符串，并根据情况返回 true 或 false。

- trim()
  
  从字符串的两端清除空格，返回一个新的字符串，而不修改原始字符串。

- repeat()
  
  构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

- padStart(长度, 字符串) padEnd()
  
  会复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件。这两个方法的第一个参数是长度，第二个参数是可选的填充字符串，默认为空格(U+0020)。

```js
let stringValue ="foo"; 
console.log(stringValue.padstart(6)); // "       foo"
console.log(stringValue.padstart(9，".")); //"......foo"


console.log(stringValue.padEnd(6)); //"foo      "
console.log(stringValue.padEnd(9，".")); //"foo......"

可选的第二个参数并不限于一个字符。如果提供了多个字符的字符串，则会将其拼接并截断以匹配指定长度。此外，如果长度小于或等于字符串长度，则会返回原始字符串。
let stringValue  ="foo";
console.log(stringValue.padstart(8，"bar"));//"barbafoo"
console.log(stringValue.padstart(2)); // "foo"
console.log(stringValue.padEnd(8，"bar"));//"foobarba"
console.log(stringValue.padEnd(2));//foo
```

- 字符串迭代（itreator）与解构

字符串的原型上暴露了一个@@iterator方法，表示可以迭代字符串的每个字符

```js
let message = 'abcd'

let messageIterator = message[Symbol.iterator]()

console.log(messageIterator.next()) // {value: 'a', done: false}
console.log(messageIterator.next()) // {value: 'b', done: false}
console.log(messageIterator.next()) // {value: 'c', done: false}
console.log(messageIterator.next()) // {value: 'd', done: false}
console.log(messageIterator.next()) // {value: undefined, done: true}

```

有了这个迭代器以后就可以通过解构操作符来进行结构操作了

```js
  let message = '12345'
  console.log([...message]) // ['1','2','3','4','5']
```

- 字符串大小写转换
  
  涉及到以下几个方法 toLowerCase()、toLocaleLowerCase()、toUpperCase()、toLocaleupperCase()

  toLocale的两个方法旨在基于特定地区实现，大部分地区使用toLowerCase\toUpperCase就可以实现，但小部分地区需要使用toLocale**

- 字符串模式匹配方法
  
  String类型专门为在字符串中实现模式匹配设计了几个方法

  - match()
    
  本质上和RegExp的exec方法相同，**接受一个参数，可以是正则表达式字符串，也可以是RegExp对象**

  ```js
    let text = "cat，bat，dat，fat"
    let pattern = /.at/

    // 等价于pattern.exec
    let matches = text.match(pattern)
    console.log(matchs.index) // 0
    console.log(matchs[0])// cat
    console.log(pattern.lastindex) // 0
  ```
  match方法返回的数组与RegExp对象的exec()方法返回的数组一样：第一个元素是与整个模式匹配的字符串，其余元素则是与表达式中的捕获组匹配的字符串
  
  - search()

  这个方法的参数与match方法一样。这个方法返回模式第一个匹配的位置索引，如果没找到则返回-1。search()始终从字符串开头向后匹配模式。

  ```js
  let text = 'cat,bat,fat'
  let pos = text.search(/at/)
  console.log(text.search(pos)) // 1
  ```

  - replace()
  
  这个方法接受两个参数，第一个参数可以是一个RegExp对象或一个字符串,第二个参数可以是一个字符串或一个函数。如果第一个参数是字符串，那么只能替换第一个子字符串。要想替换所有字符串那么第一个参数必须使用正则表达式并带上全局标记

  ```js
  let text = 'cat,bat,fat'
  let result = text.replace("at", "ond")
  console.log(result) // cond,bat,fat

  let result = text.replace(/at/g, "ond")
  console.log(result) // cong,bong,fong
  ```

  ### 内置对象（Global、Math）

  ECMA-262对内置对象的定义是“任何由ECMAScript实现提供、与宿主环境无关，并在ECMAScript程序开始执行时就存在的对象”。这就意味着，开发者不用显式的实例化内置对象，因为他们已经实例化好了。

  #### Global

  Global对象是ECMASCript中最特别的对象，因为代码不会显式的访问它。ECMA-262规定Global对象为一种兜底对象，他所针对的是不属于任何对象的属性和方法。事实上，不存在全局变量或全局函数这种东西。在全局作用域中定义的变量和函数都会变成Global对象的属性。包括isNaN()、parseInt()、parseFloat()、isFinite()等都是Global对象上的方法。

  Global还拥有一些其他方法

  - URL编码方法
  
  encodeURI()和encodeURIComponent()方法用于编码统一资源标识符(URI)，以便传给浏览器。有效的URI不能包含某些字符，比如空格。使用URI编码方法来编码URI可以让浏览器能够理解他们，同时又以特殊的UTF-8编码替换掉无效的字符
  
  这两个方法的区别是，encodeURI不会编码属于URL组件的特殊字符，比如冒号，斜杆，问号，井号，而encodeURIComponent会编码他发现的所有非标准字符

  ```js
  let uri = "http://www.baidu.com/index.php value.html?start=123"

  console.log(encodeURI(uri)) // 'http://www.baidu.com/index.php%20value.html?start=123'

  console.log(encodeURIComponent(uri))// 'http%3A%2F%2Fwww.baidu.com%2Findex.php%20value.html'
  ```

  encodeURI和encodeURIComponent对应的是decodeURI()和decodeURIComponent()，decodeURI只对encodeURI编码过的字符解码。例如：%20会被替换为空格，而%23不会被替换为#，decodeURIComponent也是一样的。

  - eval()方法

  这可能是整个ECMAScript中最强大的了，它是一个完整的ECMAScript解释器，他接受一个参数，即一个要执行的ECMASCript字符串

  ```js
  eval(console.log('hello'))
  // 等价于
  console.log('hello')
  ```

  当解释器发现eval调用时，会将参数解释为实际的ECMAScript语句，然后将其插入到该位置。通过eval()执行的代码属于该调用所在上下文，被执行的代码与该上下文有相同的作用域链，这意味着定义在包含上下文中国的变量可以在eval()内部被引用

  ```js
  let msg = 'hello world'
  eval(console.log(msg)) // hello world
  ```

  类似的，可以在eval内部定义一个函数或变量，然后再外部代码中引用

  ```js
  eval("function sayHi(){console.log('hello')}")
  sayHi() // hello
  ```

  #### Global对象属性

  |属性|说明|
  |---|---|
  |undefined|特殊值undefined|
  |NaN|特殊值NaN|
  |Infinity|特殊值Infinity|
  |Object|Object的构造函数|
  |Array|Array的构造函数|
  |Function|Function的构造函数|
  |Boolean|Boolean的构造函数|
  |String|String的构造函数|
  |Number|Number的构造函数|
  |Date|Date的构造函数|
  |RegExp|RegExp的构造函数|
  |Symbol|Symbol的构造函数|
  |Error|Error的构造函数|
  |EvalError|EvalError的构造函数|
  |RangeError|RangeError的构造函数|
  |ReferenceError|ReferenceError的构造函数|
  |SyntaxError|Syntax的构造函数|
  |TypeError|TypeError的构造函数|
  |URIError|URIError的构造函数|

##### window对象

虽然ECMA-262没有规定直接访问Gloabl对象的方式，但浏览器将window对象实现为Global对象的代理。因此，所有全局作用域声明的变量和函数都变成了window的属性

```js
var color = "red"

function getColor() {
  console.log(window.color)
}

window.getColor() // red

```

#### Math

ECMAScript提供了Math对象作为保存数学公式、信息和计算的地方。Math对象提供了一些辅助计算的属性和方法

1. Math对象属性
   
   Math对象有一些属性，主要用于保存数学中的一些特殊值。
   
   |属性|说明|
   |---|---|
   |Math.E|自然对数的基数e的值|
   |Math.LN10|10为底的自然对数|
   |Math.LN2|2为底的自然对数|
   |Math.LOG2E|以2为底的e的对数|
   |Math.LOG10E|以10为底的e的对数|
   |Math.PI|Π的值|
   |Math.SQRT1_2|1/2的平方根|
   |Math.SQRT2|2的平方根|

2. min()和max()

min和max用于确定一组数值中的最大值和最小值。这两个方法都接受任意多个参数

```js
let max = Math.max(3,4,5,6,7)
console.log(max) // 7

let min = Math.min(10,3,2,5)
console.log(min) // 2

let value = [1,2,3,4,5,6,7,8,9]
console.log(Math.max(...value))
```

3. 舍入方法（ceil,floor,round,fround）
   
   - Math.ceil()方法 始终向上舍入为最接近的整数
  ```js
  console.log(Math.ceil(25.9)) // 26
  ```
   - Math.floor()方法 始终向下舍入为最接近的整数
  ```js
  console.log(Math.floor(25.9)) // 25
  ```
   - Math.round()方法 执行四舍五入
  ```js
  console.log(Math.round(25.6)) // 26
  ```
   - Math.fround()方法 返回数值最接近的单精度浮点数表示值

4. random()方法
   Math.random方法返回一个0-1范围内的随机数，其中包含0但不包含1。可以使用下列方法从一组整数中随机选择一个数（指定范围）

   ```js
   // 例如从1~10中选择一个数
   // 下列代码中的10为可选数字总数（即10 - 1 + 1），1为起始数
   let number = Math.floor(Math.random() * 10  + 1 )
   // 从2-10中选择就变为,9(10 - 2 + 1)
   let number = Math.floor(Math.random() * 9 + 2)
   ```

5. [其他方法（参考MDN）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)


