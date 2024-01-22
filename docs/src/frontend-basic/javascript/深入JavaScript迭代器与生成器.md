# 深入JavaScript迭代器（循环）与生成器

迭代：从一个数据集合中按照一定的顺序，不断地取数据的过程

在JavaScript中，计数循环是最简单的一种迭代（循环）

```js
for(let i = 1;i <= 10;  i++) {
  console.log(i)
}
```

循环是迭代机制的基础，这是因为它可以指定迭代的次数，以及每次迭代要执行什么操作。每次循环都会在下一次迭代开始之前完成，而每次迭代的顺序都是事先定义好的

迭代会在一个有序集合上进行

```js
let collection = ['foo', 'bar', 'baz'];

for(let index = 0; index < collection.length ; index++ ) {
  console.log(collection[index])
}
```

因为数组有已知长度，且数组每一项都可以通过索引获取，所以整个数组可以通过递增索引来遍历。但是通过这种循环来执行并不理想

- 迭代之前需要事先知道如何使用数据结构
- 遍历顺序并不是数据解构固有的：通过递增索引来访问数据是特定于数组类型的方式，并不适用于其他具有隐式顺序的数据结构。

**ES5新增了Array.prototype.forEach()方法,向通用迭代需求迈进了一步（但仍然不够理想）**

```js
  let collection = ['foo','bar','baz']

  collection.forEach((item) => console.log(item))
  // foo
  // bar
  // baz
```

<span style='color:red'>这个方法解决了单独记录索引和通过数组对象取得值的问题。不过，没有办法标识迭代何时终止。因此这个方法只适用于数组，而且回调结构也比较笨拙。</span>

## 迭代器模式

迭代器模式把有些解构称为“可迭代对象”，因为它们实现了正式的Iterable接口，而且可以通过迭代器Iterator消费

可迭代对象是一种抽象的说法。基本上，可以把可迭代对象理解为数据或集合这样的集合类型对象。他们包含的元素是有限的

```js
let arr = [3,1,4]

let set = new Set().add(3).add(1).add(4)
```

任何实现Iterable接口的数据解构都可以被实现Iterator结构的结构“消费”。迭代器是按需创建的一次性对象。每个迭代器都会关联一个可迭代对象，而迭代器会暴露迭代其关联可迭代对象的API。迭代器无须了解与其关联的可迭代对象的结构，只需要知道如何取得连续的值。

### 可迭代协议

实现 Iterable 接口（可迭代协议）要求同时具备两种能力：支持迭代的自我识别能力和创建实现Iterator 接口的对象的能力。在 ECMAScript 中，这意味着必须暴露一个属性作为“默认迭代器”，而且这个属性必须使用特殊的 Symbol.iterator 作为键。这个默认迭代器属性必须引用一个迭代器工厂函数，调用这个工厂函数必须返回一个新迭代器。

很多内置类型都实现了 Iterable 接口：

- 字符串
- 数组
- 映射Map
- 集合Set
- arguments对象
- NodeList等DOM集合类型

```js
// 检查是否存在默认迭代器属性可以暴露这个工厂函数
let num = 1;
let obj = {};

// 这两种类型没有实现迭代器工厂函数
console.log(num[Symbol.iterator]); // undefined 
console.log(obj[Symbol.iterator]); // undefined

let str = 'abc'
let arr = ['a','b','c']
let map = new Map().set('a',1).set('b',2).set('c',2)
let set = new Set().add('a').add('b').add('c'); 
let els = document.querySelectorAll('div'); 

// 这些类型都实现了迭代器工厂函数
console.log(str[Symbol.iterator]); // f values() { [native code] } 
console.log(arr[Symbol.iterator]); // f values() { [native code] } 
console.log(map[Symbol.iterator]); // f values() { [native code] } 
console.log(set[Symbol.iterator]); // f values() { [native code] } 
console.log(els[Symbol.iterator]); // f values() { [native code] } 

// 调用这个工厂函数会生成一个迭代器
console.log(str[Symbol.iterator]()); // StringIterator {} 
console.log(arr[Symbol.iterator]()); // ArrayIterator {} 
console.log(map[Symbol.iterator]()); // MapIterator {} 
console.log(set[Symbol.iterator]()); // SetIterator {} 
console.log(els[Symbol.iterator]()); // ArrayIterator {} 

```

实际写代码中不需要显式调用这个工厂函数来生成迭代器。实现可迭代协议的所有类型都会自动兼容接受可迭代对象的任何语言特性。接受可迭代对象的原生语言特性包括

- for-of 循环
- 数组解构
- 扩展操作符
- Array.from()
- 创建集合
- 创建映射
- Promise.all()接收由期约组成的可迭代对象
- Promise.race()接收由期约组成的可迭代对象
- yield*操作符，在生成器中使用

这些原生语言结构会在后台调用提供的可迭代对象的这个工厂函数，从而创建一个迭代器

```js
let arr = ['foo', 'bar', 'baz']

// for-of

for(let i of arr) {
  console.log(i)
}
// foo
// bar
// baz

// 数组解构

let [a,b,c] = arr
console.log(a,b,c) // foo bar baz

// 扩展操作符
let arr2 = [...arr]
console.log(arr) // foo bar baz

// Array.from
let arr3 = Array.from(arr)
console.log(arr3) // foo bar baz

// Set 构造函数
let set = new Set(arr); 
console.log(set); // Set(3) {'foo', 'bar', 'baz'} 

// Map 构造函数
let pairs = arr.map((x, i) => [x, i]); 
console.log(pairs); // [['foo', 0], ['bar', 1], ['baz', 2]] 
let map = new Map(pairs); 
console.log(map); // Map(3) { 'foo'=>0, 'bar'=>1, 'baz'=>2 } 

// 如果对象原型链上的父类实现了 Iterable 接口，那这个对象也就实现了这个接口：
class FooArray extends Array {} 
let fooArr = new FooArray('foo', 'bar', 'baz'); 
for (let el of fooArr) { 
 console.log(el); 
} 
// foo 
// bar 
// baz

```

### 迭代器协议

迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器 API 使用 next()方法在可迭代对象中遍历数据。每次成功调用 next()，都会返回一个 IteratorResult 对象，其中包含迭代器返回的下一个值。若不调用 next()，则无法知道迭代器的当前位置。next()方法返回的迭代器对象 IteratorResult 包含两个属性：done 和 value。done 是一个布尔值，表示是否还可以再次调用 next()取得下一个值；value 包含可迭代对象的下一个值（done 为false），或者 undefined（done 为 true）。done: true 状态称为“耗尽”。

```js
// 可迭代对象
let arr = ['foo', 'bar']; 
// 迭代器工厂函数
console.log(arr[Symbol.iterator]); // f values() { [native code] } 
// 迭代器
let iter = arr[Symbol.iterator](); 
console.log(iter); // ArrayIterator {} 
// 执行迭代
console.log(iter.next()); // { done: false, value: 'foo' } 
console.log(iter.next()); // { done: false, value: 'bar' } 
console.log(iter.next()); // { done: true, value: undefined }
```

这里通过创建迭代器并调用 next()方法按顺序迭代了数组，直至不再产生新值。迭代器并不知道怎么从可迭代对象中取得下一个值，也不知道可迭代对象有多大。只要迭代器到达 done: true 状态，后续调用 next()就一直返回同样的值了

```js
let arr = ['foo']; 
let iter = arr[Symbol.iterator](); 
console.log(iter.next()); // { done: false, value: 'foo' } 
console.log(iter.next()); // { done: true, value: undefined } 
console.log(iter.next()); // { done: true, value: undefined } 
console.log(iter.next()); // { done: true, value: undefined } 
```

每个迭代器都表示对可迭代对象的一次性有序遍历。不同迭代器的实例相互之间没有联系，只会独立地遍历可迭代对象

```js
let arr = ['foo', 'bar']; 
let iter1 = arr[Symbol.iterator](); 
let iter2 = arr[Symbol.iterator](); 
console.log(iter1.next()); // { done: false, value: 'foo' } 
console.log(iter2.next()); // { done: false, value: 'foo' } 
console.log(iter2.next()); // { done: false, value: 'bar' } 
console.log(iter1.next()); // { done: false, value: 'bar' }
```

迭代器并不与可迭代对象某个时刻的快照绑定，而仅仅是使用游标来记录遍历可迭代对象的历程。如果可迭代对象在迭代期间被修改了，那么迭代器也会反映相应的变化

```js

let arr = ['foo', 'baz']; 
let iter = arr[Symbol.iterator](); 
console.log(iter.next()); // { done: false, value: 'foo' } 
// 在数组中间插入值
arr.splice(1, 0, 'bar'); 

```

“迭代器”的概念有时候容易模糊，因为它可以指通用的迭代，也可以指接口，还可以指正式的迭代器类型。下面的例子比较了一个显式的迭代器实现和一个原生的迭代器实现

```js
// 这个类实现了可迭代接口（Iterable） 
// 调用默认的迭代器工厂函数会返回
// 一个实现迭代器接口（Iterator）的迭代器对象
class Foo { 
188 第 7 章 迭代器与生成器
 [Symbol.iterator]() { 
 return { 
 next() { 
 return { done: false, value: 'foo' }; 
 } 
 } 
 } 
} 
let f = new Foo(); 
// 打印出实现了迭代器接口的对象
console.log(f[Symbol.iterator]()); // { next: f() {} } 
// Array 类型实现了可迭代接口（Iterable）
// 调用 Array 类型的默认迭代器工厂函数
// 会创建一个 ArrayIterator 的实例
let a = new Array(); 
// 打印出 ArrayIterator 的实例
console.log(a[Symbol.iterator]()); // Array Iterator {} 

```

### 自定义迭代器

与 Iterable 接口类似，任何实现 Iterator 接口的对象都可以作为迭代器使用

```js
class Counter { 
 // Counter 的实例应该迭代 limit 次
 constructor(limit) { 
 this.count = 1; 
 this.limit = limit; 
 } 
 next() { 
 if (this.count <= this.limit) { 
 return { done: false, value: this.count++ }; 
 } else { 
 return { done: true, value: undefined }; 
 } 
 } 
 [Symbol.iterator]() { 
 return this; 
 } 
} 
let counter = new Counter(3); 
for (let i of counter) { 
 console.log(i); 
} 
// 1 
// 2 
// 3
```

这个类实现了 Iterator 接口，但不理想。这是因为它的每个实例只能被迭代一次

```js
for (let i of counter) { console.log(i); } 
// 1 
for (let i of counter) { console.log(i); } 
// (nothing logged)
```

为了让一个可迭代对象能够创建多个迭代器，必须每创建一个迭代器就对应一个新计数器。为此，可以把计数器变量放到闭包里，然后通过闭包返回迭代器

```js
class Counter { 
 constructor(limit) { 
 this.limit = limit; 
 } 
 [Symbol.iterator]() { 
 let count = 1, 
 limit = this.limit; 
 return { 
 next() { 
 if (count <= limit) { 
 return { done: false, value: count++ }; 
 } else { 
 return { done: true, value: undefined }; 
 } 
 } 
 }; 
 } 
} 
let counter = new Counter(3); 
for (let i of counter) { console.log(i); } 
// 1 
// 2 
// 3 
for (let i of counter) { console.log(i); } 
// 1 
// 2 
// 3 
```

每个以这种方式创建的迭代器也实现了 Iterable 接口。Symbol.iterator 属性引用的工厂函数会返回相同的迭代器：

```js
let arr = ['foo', 'bar', 'baz']; 
let iter1 = arr[Symbol.iterator](); 
console.log(iter1[Symbol.iterator]); // f values() { [native code] } 
let iter2 = iter1[Symbol.iterator](); 
console.log(iter1 === iter2); // true
```

因为每个迭代器也实现了 Iterable 接口，所以它们可以用在任何期待可迭代对象的地方，比如for-of 循环：

```js
let arr = [3, 1, 4]; 
let iter = arr[Symbol.iterator](); 
for (let item of arr ) { console.log(item); } 
// 3 
// 1 
// 4 
for (let item of iter ) { console.log(item); } 
// 3 
// 1 
// 4
```

### 提前终止迭代器

return()方法用于指定迭代器提前关闭时执行的逻辑，需要返回一个有效的iteratorResult对象，简单情况下，可以只返回{done: true}

下列情况可以提前关闭迭代器

- for-of循环通过循环中断符（break、continue、return）或throw提前退出;
- 解构操作未消费所有值

```js
    class Counter { 
      constructor(limit) { 
        this.limit = limit; 
      } 
      [Symbol.iterator]() { 
        let count = 1, 
        limit = this.limit; 
        return { 
          next() { 
            if (count <= limit) { 
              return { done: false, value: count++ }; 
            } else { 
              return { done: true }; 
            } 
          }, 
          // return方法用于指定迭代器提前关闭时执行的逻辑
          return() { 
            console.log('Exiting early'); 
            return { done: true }; 
          } 
        }; 
      } 
    }

    let counter1 = new Counter(5);
    // for-of通过break关闭
    for (let i of counter1) { 
    if (i > 2) { 
      break; 
    } 
    console.log(i);
    // for-of通过throw关闭
    let counter2 = new Counter(5); 
    try { 
    for (let i of counter2) { 
      if (i > 2) { 
        throw 'err'; 
      } 
      console.log(i); 
    } 
    } catch(e) {} 
    // 1 
    // 2 
    // Exiting early

    // 如果迭代器没有关闭，则还可以继续从上次离开的地方继续迭代。比如，数组的迭代器就是不能关闭的：
    let a = [1, 2, 3, 4, 5]; 
    let iter = a[Symbol.iterator](); 
    for (let i of iter) { 
      console.log(i); 
      if (i > 2) { 
        break 
      } 
    } 
    // 1 
    // 2 
    // 3 
    for (let i of iter) { 
      console.log(i); 
    } 
    // 4 
    // 5
```

    因为 return()方法是可选的，所以并非所有迭代器都是可关闭的。要知道某个迭代器是否可关闭，可以测试这个迭代器实例的 return 属性是不是函数对象。不过，仅仅给一个不可关闭的迭代器增加这个方法并不能让它变成可关闭的。这是因为调用 return()不会强制迭代器进入关闭状态。即便如此，return()方法还是会被调用。

    ```js
      let a = [1, 2, 3, 4, 5]; 
      let iter = a[Symbol.iterator](); 
      iter.return = function() { 
        console.log('Exiting early'); 
        return { done: true }; 
      }; 
      for (let i of iter) { 
        console.log(i); 
        if (i > 2) { 
          break 
        } 
      } 
      // 1 
      // 2 
      // 3 
      // 提前退出
      for (let i of iter) { 
        console.log(i); 
      } 
      // 4 
      // 5 
    ```

## 生成器

生成器是 ECMAScript 6 新增的一个极为灵活的结构，拥有在一个函数块内暂停和恢复代码执行的能力。这种新能力具有深远的影响，比如，使用生成器可以自定义迭代器和实现协程

生成器的形式是一个函数，函数名称之前加一个星号(*)表示它是一个生成器。只要是可以定义函数的地方，就可以定义生成器。

```js
// 生成器函数声明
function* generatorFn() {} 
// 生成器函数表达式
let generatorFn = function* () {} 
// 作为对象字面量方法的生成器函数
let foo = { 
 * generatorFn() {} 
} 
// 作为类实例方法的生成器函数
class Foo { 
 * generatorFn() {} 
} 
// 作为类静态方法的生成器函数
class Bar { 
 static * generatorFn() {} 
}
// *不受空格影响
// 等价的生成器函数： 
  function* generatorFnA() {} 
  function *generatorFnB() {} 
  function * generatorFnC() {} 
// 等价的生成器方法：
  class Foo { 
  *generatorFnD() {} 
  * generatorFnE() {} 
  } 
```

<span>箭头函数不能用来定义生成器函数</span>

调用生成器函数会产生一个生成器对象。生成器对象一开始处于暂停执行（suspended）的状态。与迭代器相似，生成器对象也实现了 Iterator 接口，因此具有 next()方法。调用这个方法会让生成器开始或恢复执行

```js
  function* generatorFn() {} 
  const g = generatorFn(); 
  console.log(g); // generatorFn {<suspended>} 
  console.log(g.next); // f next() { [native code] }
```

next()方法的返回值类似于迭代器，有一个 done 属性和一个 value 属性。函数体为空的生成器函数中间不会停留，调用一次 next()就会让生成器到达 done: true 状态。

```js
  function* generatorFn() {} 
  let generatorObject = generatorFn(); 
  console.log(generatorObject); // generatorFn {<suspended>} 
  console.log(generatorObject.next()); // { done: true, value: undefined } 
```

value 属性是生成器函数的返回值，默认值为 undefined，可以通过生成器函数的返回值指定：

```js
    function* generatorFn() { 
      return 'foo'; 
    } 
    let generatorObject = generatorFn(); 
    console.log(generatorObject); // generatorFn {<suspended>} 
    console.log(generatorObject.next()); // { done: true, value: 'foo' } 
```

生成器函数只会在初次调用 next()方法后开始执行，如下所示

```js
function* generatorFn() { 
 console.log('foobar'); 
} 
// 初次调用生成器函数并不会打印日志
let generatorObject = generatorFn(); 
generatorObject.next(); // foobar 
```

生成器对象实现了 Iterable 接口，它们默认的迭代器是自引用的

```js
function* generatorFn() {} 
console.log(generatorFn); 
// f* generatorFn() {} 
console.log(generatorFn()[Symbol.iterator]); 
// f [Symbol.iterator]() {native code} 
console.log(generatorFn()); 
// generatorFn {<suspended>} 
console.log(generatorFn()[Symbol.iterator]()); 
// generatorFn {<suspended>} 
const g = generatorFn(); 
console.log(g === g[Symbol.iterator]()); 
// true 
```

### yield

yield 关键字可以让生成器停止和开始执行，也是生成器最有用的地方。生成器函数在遇到 yield关键字之前会正常执行。遇到这个关键字后，执行会停止，函数作用域的状态会被保留。停止执行的生成器函数只能通过在生成器对象上调用 next()方法来恢复执行

```js
  function* generatorFn() { 
    yield; 
  } 
  let generatorObject = generatorFn(); 
  console.log(generatorObject.next()); // { done: false, value: undefined } 
  console.log(generatorObject.next()); // { done: true, value: undefined } 
```

此时的yield 关键字有点像函数的中间返回语句，它生成的值会出现在 next()方法返回的对象里。通过 yield 关键字退出的生成器函数会处在 done: false 状态；通过 return 关键字退出的生成器函数会处于 done: true 状态

```js
    function* generatorFn() { 
      yield 'foo'; 
      yield 'bar'; 
      return 'baz'; 
    } 
    let generatorObject = generatorFn(); 
    console.log(generatorObject.next()); // { done: false, value: 'foo' } 
    console.log(generatorObject.next()); // { done: false, value: 'bar' } 
    console.log(generatorObject.next()); // { done: true, value: 'baz' } 
```

生成器函数内部的执行流程会针对**每个生成器对象区分作用域**。在一个生成器对象上调用 next()不会影响其他生成器

```js
    function* generatorFn() { 
    yield 'foo'; 
    yield 'bar'; 
    return 'baz'; 
    } 
    let generatorObject1 = generatorFn(); 
    let generatorObject2 = generatorFn(); 
    console.log(generatorObject1.next()); // { done: false, value: 'foo' } 
    console.log(generatorObject2.next()); // { done: false, value: 'foo' } 
    console.log(generatorObject2.next()); // { done: false, value: 'bar' } 
    console.log(generatorObject1.next()); // { done: false, value: 'bar' } 
```

yield 关键字只能在生成器函数内部使用，用在其他地方会抛出错误。类似函数的 return 关键字，yield 关键字必须直接位于生成器函数定义中，出现在嵌套的非生成器函数中会抛出语法错误

  ```js
  // 有效
  function* validGeneratorFn() { 
    yield; 
  } 
  // 无效
  function* invalidGeneratorFnA() { 
    function a() { 
      yield; 
    } 
  } 
  // 无效
  function* invalidGeneratorFnB() { 
    const b = () => { 
      yield; 
    } 
  } 
  // 无效
  function* invalidGeneratorFnC() { 
    (() => { 
      yield; 
    })(); 
  } 
```

- 生成器对象作为可迭代对象

在生成器对象上显式调用 next()方法的用处并不大。其实，如果把生成器对象当成可迭代对象，那么使用起来会更方便

```js
  function* generatorFn() { 
    yield 1; 
    yield 2; 
    yield 3; 
  } 
  for (const x of generatorFn()) { 
    console.log(x); 
  } 
  // 1 
  // 2 
  // 3 
```

在需要自定义迭代对象时，这样使用生成器对象会特别有用。比如，我们需要定义一个可迭代对象，而它会产生一个迭代器，这个迭代器会执行指定的次数。使用生成器，可以通过一个简单的循环来实现

```js
function* nTimes(n) { 
 while(n--) { 
   yield; 
 } 
} 

for (let _ of nTimes(3)) { 
 console.log('foo'); 
} 
// foo 
// foo 
// foo 

// 传给生成器的函数可以控制迭代循环的次数。在 n 为 0 时，while 条件为假，循环退出，生成器函数返回。

```

- 使用yield实现输入和输出

除了可以作为函数的中间返回语句使用，yield 关键字还可以作为函数的中间参数使用。上一次让生成器函数暂停的 yield 关键字会接收到传给 next()方法的第一个值。这里有个地方不太好理解——第一次调用 next()传入的值不会被使用，因为这一次调用是为了开始执行生成器函数

```js
  function* generatorFn(initial) { 
    console.log(initial); 
    console.log(yield); 
    console.log(yield); 
  } 
  let generatorObject = generatorFn('foo'); 
  generatorObject.next('bar'); // foo 
  generatorObject.next('baz'); // baz 
  generatorObject.next('qux'); // qux 
```

yield 关键字可以同时用于输入和输出

```js
  function* generatorFn() { 
    return yield 'foo'; 
  } 
  let generatorObject = generatorFn(); 
  console.log(generatorObject.next()); // { done: false, value: 'foo' } 
  console.log(generatorObject.next('bar')); // { done: true, value: 'bar' } 

  //因为函数必须对整个表达式求值才能确定要返回的值，所以它在遇到 yield 关键字时暂停执行并计算出要产生的值："foo"。下一次调用 next()传入了"bar"，作为交给同一个 yield 的值。然后这个值被确定为本次生成器函数要返回的值
```

yield 关键字并非只能使用一次

```js
  function* generatorFn() { 
    for (let i = 0;;++i) { 
      yield i; 
    } 
  } 
  let generatorObject = generatorFn(); 
  console.log(generatorObject.next().value); // 0 
  console.log(generatorObject.next().value); // 1 
  console.log(generatorObject.next().value); // 2 
  console.log(generatorObject.next().value); // 3 
  console.log(generatorObject.next().value); // 4 
  console.log(generatorObject.next().value); // 5 
  ...
```

假设我们想定义一个生成器函数，它会根据配置的值迭代相应次数并产生迭代的索引。初始化一个新数组可以实现这个需求，但不用数组也可以实现同样的行为

```js
function* nTimes(n) {
  for(let i = 0;i < n;i++) {
    yield i
  }
}

for(let x of nTimes(3)) {
  console.log(x)
}
// 0 
// 1
// 2
```

使用 while 循环也可以，而且代码稍微简洁一点

```js
  function* nTimes(n) { 
    let i = 0; 
    while(n--) { 
      yield i++; 
    } 
  } 
for (let x of nTimes(3)) { 
 console.log(x); 
} 
// 0 
// 1 
// 2 
```

这样使用生成器也可以实现范围和填充数组

```js
function* range(start, end) { 
 while(end > start) { 
  yield start++; 
 } 
} 
for (const x of range(4, 7)) { 
 console.log(x); 
} 
// 4 
// 5 
// 6 
function* zeroes(n) { 
 while(n--) { 
  yield 0; 
 } 
} 
console.log(Array.from(zeroes(8))); // [0, 0, 0, 0, 0, 0, 0, 0]
```

- 产生可迭代对象

可以使用星号增强 yield 的行为，让它能够迭代一个可迭代对象，从而一次产出一个值

```js
// 等价的 generatorFn： 
// function* generatorFn() { 
// for (const x of [1, 2, 3]) { 
// yield x; 
// } 
// } 
function* generatorFn() { 
 yield* [1, 2, 3]; 
} 
let generatorObject = generatorFn(); 
for (const x of generatorFn()) { 
 console.log(x); 
} 
// 1 
// 2 
// 3
// 与生成器函数的星号类似，yield 星号两侧的空格不影响其行为
```

因为 yield*实际上只是将一个可迭代对象序列化为一连串可以单独产出的值，所以这跟把 yield放到一个循环里没什么不同。下面两个生成器函数的行为是等价的

```js
function* generatorFnA() { 
 for (const x of [1, 2, 3]) { 
 yield x; 
 } 
} 
for (const x of generatorFnA()) { 
 console.log(x); 
} 
// 1 
// 2 
// 3 
function* generatorFnB() { 
 yield* [1, 2, 3]; 
} 
for (const x of generatorFnB()) { 
 console.log(x); 
} 

```

yield*的值是关联迭代器返回 done: true 时的 value 属性。对于普通迭代器来说，这个值是undefined

```js
function* generatorFn() { 
 console.log('iter value:', yield* [1, 2, 3]); 
} 
for (const x of generatorFn()) { 
 console.log('value:', x); 
} 
// value: 1 
// value: 2 
// value: 3 
// iter value: undefined
```

对于生成器函数产生的迭代器来说，这个值就是生成器函数返回的

```js
function* innerGeneratorFn() { 
 yield 'foo'; 
 return 'bar'; 
} 
function* outerGeneratorFn(genObj) { 
 console.log('iter value:', yield* innerGeneratorFn()); 
} 
for (const x of outerGeneratorFn()) { 
 console.log('value:', x); 
} 
// value: foo 
// iter value: bar 
```

- 使用yield*实现递归

yield*最有用的地方是实现递归操作，此时生成器可以产生自身

```js
function* nTimes(n) { 
 if (n > 0) { 
  yield* nTimes(n - 1); 
  yield n - 1; 
 } 
} 
for (const x of nTimes(3)) { 
 console.log(x); 
} 
// 0 
// 1 
// 2 
```

