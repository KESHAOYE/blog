<!--
 * @Author: KESHAOYE
 * @Date: 2023-05-08 10:38:39
-->
# JS中的集合引用类型

## Object

大多数引用值的示例使用的屎Object类型。Object是ECMAscript中最常用的类型之一。虽然Object实例没有多少功能，但很适合存储和在应用程序间交换数据。

显式的创建Object实例有两种方式

- 使用new操作符和Object构造函数
  
  ```js
   let person = new Object()
   person.name = 'likewei'
   person.age = 25
  ```
- 使用对象字面量
  
  ```js
    let person = {
      name: 'likewei',
      age: 25
    }
  ```
  
  **逗号用于在对象字面量中分割属性，在最后一个属性后面加上逗号在老版本浏览器中会报错，但所有现代浏览器都支持**，属性值可以是字符串或者数值

  ```js
   let  person = {
     name: 'likewei',
     age: 25,
     5: 123
   }
  ```

- 使用对象字面量表示法来定义一个只有默认属性和方法的对象

    ```js
      let person = {}
      person.name = 'likewei'
      person.age = 25
    ```
  
  虽然以上三种方法定义对象都是可行的，但是开发者更偏向于使用对象字面量表示法。事实上，对象字面量已经成为给函数传递大量可选参数的主要方式

  ```js
    function displayInfo(args) {
      let output = ''

      if(typeof args.name == 'string') {
        output += `Name: ${args.name}`
      }

      if(typeof args.age == 'number') {
        output += `Age: ${args.age}`
      }

      console.log(output)
    }

    displayInfo({name: 'likewei', age: 25})
    displayInfo({name: 'KESHAOYE'})
  ```
  虽然属性一般通过**点语法**读取，但也可以使用中括号来存取属性。在使用中括号时，要在括号内使用属性名的字符串形式

  ```js
    console.log(person['name']) //likewei
    console.log(person.name) // likewei
  ```

  从功能上来说两者没有任何区别。使用中括号的优势就是可以使用变量来访问属性

## Array

除了Object，Array应该就是ECMAScript中最常用的类型了。ECMAScript数组和其他编程语言的数组有很大区别，**数组中每个槽位可以存储任意类型的数据**。这意味着可以创建一个数组，第一个元素是字符串，第二个是数值，第三个是对象。ECMAScript数组也是动态大小的，会随着数据添加而自动增加。

### 创建数组

有几种基本的方式可以创建数组：

- 使用Array构造函数，比如：

```js
let color = new Array()
```

如果知道数组中元素的数量，那么可以给构造函数传入一个数值，然后length属性就会被自动创建并设置为这个值。比如，下面的代码会创建一个初始length为20的数组

```js
let colors = new Array(20)
```

也可以给Array构造函数传入要保存的元素，比如，下面的代码会创建一个包含3个字符串值的数组

```js
let colors = new Array('blue','red','yellow')
```

**new操作符是可以省略的**

- 使用数组字面量表示法

```js
  let colors = ['blue', 'yellow', 'red'] // 创建一个包含3个元素的数组
  let colors = [] // 创建一个空数组
  let values = [1,2,] // 创建一个2个元素的数组
```

<span>与对象一样，使用数组字面量表示法创建数组不会调用Array构造函数</span>

- 使用from()方法
  
  Array.from()的第一个参数是一个类数组对象，即任何可迭代的结构，或有一个length属性和可索引元素的结构

  ```js
  // 字符串会被拆成单字符数组
  console.log(Array.from("Matt")) // ['M','a','t','t']

  // 使用from方法将集合和映射转换为一个新数组
  const m = new Map().set(1,2)
                     .set(3,4)
  const n = new Set().add(1)
                     .add(2)
                     .add(3)
                     .add(4)
  console.log(Array.from(m)) // [[1,2],[3,4]]
  console.log(Array.from(s)) // [1,2,3,4]

  // 对现有数组执行浅复制
  const a1 = [1,2,3,4]
  const a2 = Array.from(a1)

  console.log(a2) // [1,2,3,4]
  console.log(a1 == a2)  // false

  // 可使用任何可迭代对象
  const iter = {
    *[Symbol.itertor]() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    }
  }
  console.log(Array.from(iter))// [1,2,3,4,5]

  // arguments对象可以被轻松的转换为数组
  function getArgsArray() {
    return Array.from(arguments)
  }
  console.log(getArgsArray(1,2,3,4)) // [1,2,3,4]

  // from()也可以转换带有必有属性的自定义对象
  const arrayLikeObject = {
    0:1,
    1:2,
    2:3,
    3:4,
    length: 4
  }
  console.log(Array.from(arrayLikeObject)) // [1,2,3,4]
  ```

- 使用of()方法

  of方法可以将一组参数转换为数组

  ```js
    console.log(Array.of(1,2,3,4)) // [1,2,3,4]
    console.log(Array.of(undefined)) // [undefined]
  ```

### 数组空位

使用数组字面量初始化数组时，可以使用一串逗号来创建空位（hole）。ECMAScript会将逗号之间相应索引位置的值当成空位，ES6规范重新定义了该如何处理这些空位

```js
  const hole = [,,,,]
  console.log(hole.length) // 5
  console.log(hole) // [,,,,]
```

ES6新增的方法和迭代器与早期ECMAScript版本中存在的方法行为不同。ES6新增方法普遍将这些空位当成存在的元素，只不过值为undefined

```js
const options = [1,,,5]

for(const option of options) {
  console.log(option === undefined)
}
// false
// true
// true
// true
// false

const as = Array.from([,,,])
for(const a of as) {
  console.log(a === undefined)
}
// true
// true
// true

console.log(Array.of(...[,,,])) // [undefined,undefined,undefined]

```

**ES6之前的方法会忽略这个空位，但具体行为也会因方法而异**

```js
const options = [1,,,,5]

// map()会跳过空位置
console.log(options.map(()=>6))) // [6,undefined,undefined,undefined,6]

// join()视空位置为空字符串
console.log(options.join('-')) // 1----5

```

### 数组索引

要取得或设置数组的值，需要使用中括号并提供相应值的数字索引

```js
let colors = ['red','green','blue']
console.log(colors[0])
colors[2] = 'black'
colors[3] = 'brown'
```

在中括号中提供的索引表示要访问的值。

- 如果索引小于数组包含的元素数，则返回存储在相应位置的元素
- 如果把一个值设置给超过数组最大索引的索引，则数组长度会自动扩展到该索引值加1

数组中的元素数量保存在length属性中，这个属性始终返回0或大于0的值。

```js
let colors = ['red','green','blue']
let names = []

console.log(colors.length) // 3
console.log(names.length) // 0
```

**length属性不是只读的，可以通过修改length属性从数组末尾删除或添加元素**

```js
// 通过修改length值，删除元素
  let colors = ['red','green','blue']
  colors.length = 2
  console.log(colors[2]) // undefined
// 通过修改length值，添加元素
  let colors = ['red','green','blue']
  colors.length = 4
  console.log(colors[3]) // undefined
// 使用length属性可以方便的向数组末尾添加元素
// 数组最后一个元素的索引始终是length - 1，因此下一个槽位的索引值就是length 
  let colors = ['red','green','blue']
  colors[colors.length] = 'black'
  colors[colors.length] = 'brown'
```

### 检测数组

判断一个对象是否为数组

- instanceOf
- Array.isArray()

### 迭代器方法

ES6中，Array原型上暴露了3个用于检索数组内容的方法

- keys(): 返回数组索引迭代器
- values()：返回数组元素迭代器
- entries()：返回索引/值对迭代器

```js
  const a = ['red','green','blue']

  const akeys = Array.from(a.keys()) // [0,1,2]
  const avalues = Array.from(a.values()) // ['red','green','blue']
  const aentries = Array.from(a.entries()) // [[0,'red'],[1,'green'],[2,'blue']]
```

使用ES6的解构可以非常容易的在循环中拆分键/值对

```js
  const a = ['red','green','blue']
  for(const [id, value] of a.entries()) {
    console.log(id, value)
    // 0 red
    // 1 green
    // 2 blue 
  }
```
### 复制和填充方法

- 批量复制方法 fill(value,start?,end?)
  
  此方法可以向数组插入全部或部分相同的值。负值索引从数组末尾开始计算。
  
  value：要填充的值

  start:可选，开始索引，如为空则插入整个数组

  end： 可选，结束索引，如为空则从开始索引至数组结束

  ```js
    const zeros = [0,0,0,0,0]
    zeros.fill(5)
    console.log(zero) // [5,5,5,5,5]
    zeros.fill(0) // 重置

    // 用6填充索引大于3的元素
    zeros.fill(6, 3)
    console.log(zeros) // [0,0,0,6,6]
    zeros.fill(0) // 重置

    // 用7填充索引大于等于1且小于3的元素
    zeros.fill(7,1,3)
    console.log(zeros) // [0,7,7,0,0]
    zeros.fill(0)

    // 用8 填充索引大于等于1且小于4的元素 
    // (-4 + zeroes.length = 1) 
    // (-1 + zeroes.length = 4) 
    zeroes.fill(8, -4, -1); 
    console.log(zeroes);  // [0, 8, 8, 8, 0];

  ```

    fill()静默忽略超出数组边界、零长度及方向相反的索引范围： 

    ```js
    const zeroes = [0, 0, 0, 0, 0]; 
    // 索引过低，忽略 
    zeroes.fill(1, -10, -6); 
    console.log(zeroes);  // [0, 0, 0, 0, 0] 
    // 索引过高，忽略 
    zeroes.fill(1, 10, 15); 
    console.log(zeroes);  // [0, 0, 0, 0, 0] 
    // 索引反向，忽略 
    zeroes.fill(2, 4, 2); 
    console.log(zeroes);  // [0, 0, 0, 0, 0] 
    // 索引部分可用，填充可用部分 
    zeroes.fill(4, 3, 10) 
    console.log(zeroes);  // [0, 0, 0, 4, 4]
    ```

- 填充数组方法 copyWithin(target, start, end?)

target:序列开始替换的目标位置，以 0 为起始的下标表示

start:要复制的元素序列的起始位置，以 0 为起始的下标表示

end: 要复制的元素序列的结束位置，以 0 为起始的下标表示

copyWithin()会按照指定范围浅复制数组中的部分内容，然后将它们插入到指定索引开始的位置。开始索引和结束索引则与fill()使用同样的计算方法： 

```js
let ints,  
    reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset(); 

// 从ints 中复制索引0开始的内容，插入到索引5开始的位置 
// 在源索引或目标索引到达数组边界时停止 
ints.copyWithin(5); 
console.log(ints);  // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4] 
reset(); 

// 从ints 中复制索引5开始的内容，插入到索引0开始的位置 
ints.copyWithin(0, 5); 
console.log(ints);  // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9] 
reset(); 
// 从ints 中复制索引0开始到索引3结束的内容 
// 插入到索引4开始的位置 
ints.copyWithin(4, 0, 3); 
alert(ints);  // [0, 1, 2, 3, 0, 1, 2, 7, 8, 9] 
reset(); 
// JavaScript 引擎在插值前会完整复制范围内的值 
// 因此复制期间不存在重写的风险 
ints.copyWithin(2, 0, 6); 
alert(ints);  // [0, 1, 0, 1, 2, 3, 4, 5, 8, 9] 
reset(); 
// 支持负索引值，与fill()相对于数组末尾计算正向索引的过程是一样的 
ints.copyWithin(-4, -7, -3); 
alert(ints);  // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6] 
copyWithin()静默忽略超出数组边界、零长度及方向相反的索引范围： 
let ints,  
    reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset(); 
// 索引过低，忽略 
ints.copyWithin(1, -15, -12); 
alert(ints);  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset() 
// 索引过高，忽略 
ints.copyWithin(1, 12, 15); 
alert(ints);  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset(); 
// 索引反向，忽略 
ints.copyWithin(2, 4, 2); 
alert(ints);  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset(); 
// 索引部分可用，复制、填充可用部分 
ints.copyWithin(4, 7, 10) 
alert(ints);  // [0, 1, 2, 3, 7, 8, 9, 7, 8, 9];
```

### 转换方法

**所有对象都有toLocaleString()、toString()和valueOf()方法**，其中valueOf()返回的是数组本身。而toString()返回由数组中每个值的等效字符串凭借而成的一个逗号分隔的字符串。也就是说，对数组的每个值都会调用其toString方法，以得到最终的字符串

```js
let colors = ["red", "blue", "green"]; // 创建一个包含3 个字符串的数组
alert(colors.toString());   // red,blue,green 
alert(colors.valueOf());    // [red,blue,green] 
alert(colors);              // [red,blue,green]
```

继承的方法 toLocaleString()以及 toString()都返回数组值的逗号分隔的字符串。如果想使用不同的分隔符，则可以使用join()方法。join()方法接收一个参数，即字符串分隔符，返回包含所有项的字符串。

```js
let colors = ["red", "green", "blue"]; 
alert(colors.join(","));     // red,green,blue 
alert(colors.join("||"));    // red||green||blue
```

### 栈方法

- push()
  
  接受任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度。

  ```js
    let colors = new Array();                 // 创建一个数组 
    let count = colors.push("red", "green");  // 推入两项 
    alert(count);                             // 2 
    count = colors.push("black");  // 再推入一项 
    alert(count);                  // 3 
  ```

- pop()
  
  用于删除数组的最后一项，同时减少数组的length值，返回被删除的项。

  ```js
  let item = colors.pop();       // 取得最后一项,并删除
  alert(item);                   // black 
  alert(colors.length);          // 2 
  ```

### 队列方法

- shift()
  
  从数组开头取得数据的方法,它会删除数组的第一项并返回它，然后数组长度减1

  ```js
  // 与push配合可以模拟队列（先进先出）
    let colors = new Array();                 // 创建一个数组 
    let count = colors.push("red", "green");  // 推入两项 
    alert(count);                             // 2 
    count = colors.push("black"); // 再推入一项 
    alert(count);                 // 3 
    let item = colors.shift();  // 取得第一项，并删除
    alert(item);                // red 
    alert(colors.length);       // 2 
  ```

- unshift()
  
  在数组开头添加任意多个值，然后返回新的数组长度

  ```js
  // 与pop配合可以模拟队列
  let colors = new Array();                    // 创建一个数组 
  let count = colors.unshift("red", "green");  // 从数组开头推入两项 
  alert(count);                                // 2 
  count = colors.unshift("black");  // 再推入一项 
  alert(count);                     // 3 
  let item = colors.pop();  // 取得最后一项 
  alert(item);              // green 
  alert(colors.length);     // 2 
  ```

### 排序方法

- reverse()
  
  将数组方向排列

  ```js
  let values = [1, 2, 3, 4, 5]; 
  values.reverse(); 
  alert(values);  // 5,4,3,2,1
  ```

- sort()

  sort()会在每一项上调用String()转型函数，然后比较字符串来决定顺序

  ```js
  let values = [0, 1, 5, 10, 15]; 
  values.sort(compare); 
  alert(values);  // 0,1,10,15,5
  ```
  
  sort()方法可以接收一个比较函数，用于判断哪个值应该排在前面,比较函数接收两个参数，如果第一个参数应该排在第二个参数前面，就返回负值；如果两个参数相等，就返回0；如果第一个参数应该排在第二个参数后面，就返回正值

  ```js
  function compare(value1, value2) { 
    if (value1 < value2) { 
      return -1; 
    } else if (value1 > value2) { 
      return 1; 
    } else {  
      return 0; 
    } 
  }

  let values = [0, 1, 5, 10, 15]; 
  values.sort(compare); 
  alert(values);  // 15,10,5,1,0
  ```

  这个比较函数还可以写为一个箭头函数

  ```js
    let values = [0, 1, 5, 10, 15]; 
    values.sort((a, b) => a < b ? 1 : a > b ? -1 : 0); 
    alert(values); // 15,10,5,1,0 
  ```

  如果数组的元素是数值，或者是其valueOf()方法返回数值的对象（如Date对象），这个比较函数还可以写得更简单，因为这时可以直接用第二个值减去第一个值：
  
  ```js 
    function compare(value1, value2){ 
      return value2 - value1;
    }
  ```

  比较函数就是要返回小于0、0和大于0的数值，因此减法操作完全可以满足要求。

  ### 操作方法

  - concat()
  
  可以在现有数组全部元素基础上创建一个新数组，它首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组

  打平数组参数的行为可以重写，方法是在参数数组上指定一个特殊的符号：Symbol.isConcatSpreadable。这个符号能够阻止 concat()打平参数数组。相反，把这个值设置为 true 可以强制打平类数组对象

  ```js
    let colors = ["red", "green", "blue"]; 
    let newColors = ["black", "brown"]; 
    let moreNewColors = { 
    [Symbol.isConcatSpreadable]: true, 
    length: 2, 
    0: "pink", 
    1: "cyan" 
    }; 
    newColors[Symbol.isConcatSpreadable] = false; 
    // 强制不打平数组
    let colors2 = colors.concat("yellow", newColors); 
    // 强制打平类数组对象
    let colors3 = colors.concat(moreNewColors); 
    console.log(colors); // ["red", "green", "blue"] 
    console.log(colors2); // ["red", "green", "blue", "yellow", ["black", "brown"]] 
    console.log(colors3); // ["red", "green", "blue", "pink", "cyan"] 
  ```

  - slice(start, ?end)

  用于创建一个包含原有数组中一个或多个元素的新数组。如果只有一个参数，则 slice()会返回该索引到数组末尾的所有元素。如果有两个参数，则 slice()返回从开始索引到结束索引对应的所有元素，**其中不包含结束索引对应的元素**。**这个操作不影响原始数组。**

  ```js
  let colors = ["red", "green", "blue", "yellow", "purple"]; 
  let colors2 = colors.slice(1); 
  let colors3 = colors.slice(1, 4); 
  alert(colors2); // green,blue,yellow,purple 
  alert(colors3); // green,blue,yellow
  ```

  - splice(start, deleteCount?, item1?, ...itemN?)
  
  这个方法可以插入、删除、替换数组中的元素
    
    - 删除
      
      需要给 splice()传 2 个参数：要删除的第一个元素的位置和要删除的元素数量。可以从数组中删除任意多个元素，比如 splice(0, 2)会删除前两个元素

      ```js
      let colors = ["red", "green", "blue"]; 
      let removed = colors.splice(0,1); // 删除第一项
      alert(colors); // green,blue 
      alert(removed); // red，只有一个元素的数组
      ```

    - 插入
  
      需要给 splice()传 3 个参数：开始位置、0（要删除的元素数量）和要插入的元素，可以在数组中指定的位置插入元素。第三个参数之后还可以传第四个、第五个参数，乃至任意多个要插入的元素。比如，splice(2, 0, "red", "green")会从数组位置 2 开始插入字符串"red"和"green"

      ```js
      removed = colors.splice(1, 0, "yellow", "orange"); // 在位置 1 插入两个元素
      alert(colors); // green,yellow,orange,blue 
      alert(removed); // 空数组
      ```

    - 替换

      splice()在删除元素的同时可以在指定位置插入新元素，同样要传入 3 个参数：开始位置、要删除元素的数量和要插入的任意多个元素。要插入的元素数量不一定跟删除的元素数量一致。比如，splice(2, 1, "red", "green")会在位置 2 删除一个元素，然后从该位置开始向数组中插入"red"和"green"。

      ```js
      removed = colors.splice(1, 1, "red", "purple"); // 插入两个值，删除一个元素
      alert(colors); // green,red,purple,orange,blue 
      alert(removed); // yellow，只有一个元素的数组
      ```

### 搜索和位置方法

ECMAScript 提供两类搜索数组的方法：按严格相等搜索和按断言函数搜索

- 按严格相等搜索
  
  - indexOf(searchElement, fromIndex?)
  
    返回在数组中可以找到给定元素的第一个索引
  
    searchElement: 要查找的元素

    fromIndex: 可选，开始搜索的索引（从零开始）

    ```js
    let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    alert(numbers.indexOf(4)); // 3 
    alert(numbers.indexOf(4, 4)); // 5 
    let person = { name: "Nicholas" }; 
    let people = [{ name: "Nicholas" }]; 
    let morePeople = [person]; 
    alert(people.indexOf(person)); // -1 
    alert(morePeople.indexOf(person)); // 0 
    ```

  - lastIndexOf(searchElement, ?fromIndex)
  
    方法返回数组中给定元素最后一次出现的索引

    searchElement: 要查找的元素

    fromIndex: 可选，以 0 起始的索引，表明反向搜索的起始位置

    ```js
    alert(numbers.lastIndexOf(4)); // 5 
    alert(numbers.lastIndexOf(4, 4)); // 3 
    ```

  - includes(searchElement, fromIndex?) ES7更新
  
    用来判断一个数组是否包含一个指定的值

    searchElement: 要查找的元素

    fromIndex: 可选，开始搜索的索引（从零开始）

    ```js
    alert(numbers.includes(4)); // true
    alert(numbers.includes(4, 7)); // false
    alert(people.includes(person)); // false 
    alert(morePeople.includes(person)); // true
    ```

- 按断言函数搜索
  
  ECMAScript 也允许按照定义的断言函数搜索数组，每个索引都会调用这个函数。断言函数的返回值决定了相应索引的元素是否被认为匹配

   - find((element, index, array) => return Boolean)
    
    返回第一个匹配的元素

   - findIndex((element, index, array) => return Boolean)
  
    返回第一个匹配的元素索引

    ```js
        const people = [ 
          { 
          name: "Matt", 
          age: 27 
          }, 
          { 
          name: "Nicholas", 
          age: 29 
          }]; 
      alert(people.find((element, index, array) => element.age < 28)); 
      // {name: "Matt", age: 27} 
      alert(people.findIndex((element, index, array) => element.age < 28)
      找到匹配项后，这两个方法都不再继续搜索。
      const evens = [2, 4, 6]; 
    // 找到匹配后，永远不会检查数组的最后一个元素
      evens.find((element, index, array) => { 
        console.log(element); 
        console.log(index); 
        console.log(array); 
        return element === 4; 
      }); 
      // 2 
      // 0 
      // [2, 4, 6] 
      // 4 
      // 1 
      // [2, 4, 6] 
    ```

### 迭代(循环)方法

ECMAScript 为数组定义了 5 个迭代方法。

- every(callBack, thisArg)
  
  测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。

  ```js
   let a = [1,2,3,4,12]
   let b = [1,2,3,4,5]

   a.every(e=>e<10) // false(12大于10)
   b.every(e=>e<10) // true
  ```

- filter(callBack, thisArg)
  
  创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素。

  ```js
  let a = [2,30,5,20,25,48,4]
  a.filter(e=> e > 10 ) // 30,20,25,48
  ```

- forEach(callBack, thisArg)
  
  对数组的每个元素执行一次给定的函数,没有返回值。

  ```js
    let a = [1,2,3,4,5]
    a.forEach(e => console.log(e)) // 1,2,3,4,5
  ```

- map(callBack, thisArg)
  
  **方法创建一个新数组**，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

  ```js
   let a = [1,2,3,4,5]
   let b = a.map(e=>e = ++e)
   console.log(b) // [2,3,4,5,6,10]
  ```

- some(callBack, thisArg)

  方法测试数组中是否至少有一个元素通过了由提供的函数实现的测试。（every则是需要全部通过）

  ```js
    let a = [1,2,3,4,5,6,10]
    a.some(e => e >= 10 ) // true
  ```

### 归并方法

ECMAScript 为数组提供了两个归并方法：reduce()和 reduceRight()。这两个方法都会迭代数组的所有项，并在此基础上构建一个最终返回值。

- reduce(callBack(previousValue, initialValue, currentValue, currentIndex), initialValue?)
  
  ```js
  let values = [1, 2, 3, 4, 5]; 
  let sum = values.reduce((prev, cur, index, array) => prev + cur); 
  alert(sum); // 15
  ```
- reduceRight()


## 定型数组(待填坑)

### ArayBuffer

ArrayBuffer()是一个普通的 JavaScript 构造函数，可用于在内存中分配特定数量的字节空间

```js
const buf = new ArrayBuffer(16); // 在内存中分配 16 字节
alert(buf.byteLength); // 16
```

ArrayBuffer 一经创建就不能再调整大小。不过，可以使用 slice()复制其全部或部分到一个新实例中

```js
const buf1 = new ArrayBuffer(16); 
const buf2 = buf1.slice(4, 12); 
alert(buf2.byteLength); // 8 
```

## Map(将键映射到值的对象)

Map 是一种新的集合类型，为JS带来了真正的键/值存储机制。

```js
const m = new Map()
```

如果想在创建的同时初始化实例，可以给 Map 构造函数传入一个可迭代对象，需要包含键/值对数组。可迭代对象中的每个键/值对都会按照迭代顺序插入到新映射实例中：

```js
// 使用嵌套数组初始化映射
const m1 = new Map([ 
 ["key1", "val1"], 
 ["key2", "val2"], 
 ["key3", "val3"] 
]); 
alert(m1.size); // 3 
// 使用自定义迭代器初始化映射
const m2 = new Map({ 
 [Symbol.iterator]: function*() { 
 yield ["key1", "val1"]; 
 yield ["key2", "val2"]; 
 yield ["key3", "val3"]; 
 } 
}); 
alert(m2.size); // 3 
// 映射期待的键/值对，无论是否提供
const m3 = new Map([[]]); 
alert(m3.has(undefined)); // true 
alert(m3.get(undefined)); // undefined 
```

初始化之后，可以使用 set()方法再添加键/值对。另外，可以使用 get()和 has()进行查询，可以通过 size 属性获取映射中的键/值对的数量，还可以使用 delete()和 clear()删除值

```js
const m = new Map(); 
alert(m.has("firstName")); // false 
alert(m.get("firstName")); // undefined 
alert(m.size); // 0 
m.set("firstName", "Matt") 
 .set("lastName", "Frisbie"); 
alert(m.has("firstName")); // true 
alert(m.get("firstName")); // Matt 
alert(m.size); // 2 
m.delete("firstName"); // 只删除这一个键/值对
alert(m.has("firstName")); // false 
alert(m.has("lastName")); // true 
alert(m.size); // 1 
m.clear(); // 清除这个映射实例中的所有键/值对
alert(m.has("firstName")); // false 
alert(m.has("lastName")); // false 
alert(m.size); // 0
```

set()方法返回映射实例，因此可以把多个操作连缀起来，包括初始化声明

```js
const m = new Map().set("key1", "val1"); 
m.set("key2", "val2") 
 .set("key3", "val3"); 
alert(m.size); // 3 
```

与 Object 只能使用数值、字符串或符号作为键不同，Map 可以使用任何 JavaScript 数据类型作为键。Map 内部使用 SameValueZero 比较操作（ECMAScript 规范内部定义，语言中不能使用），基本上相当于使用严格对象相等的标准来检查键的匹配性。与 Object 类似，映射的值是没有限制的

```js
const m = new Map(); 
const functionKey = function() {}; 
const symbolKey = Symbol(); 
const objectKey = new Object(); 
m.set(functionKey, "functionValue"); 
m.set(symbolKey, "symbolValue"); 
m.set(objectKey, "objectValue"); 
alert(m.get(functionKey)); // functionValue 
alert(m.get(symbolKey)); // symbolValue 
alert(m.get(objectKey)); // objectValue 
// SameValueZero 比较意味着独立实例不冲突
alert(m.get(function() {})); // undefined 
```

与严格相等一样，在Map中用作键和值的对象及其他“集合”类型，在自己的内容或属性被修改时仍然保持不变

```js
const m = new Map(); 
const objKey = {}, 
 objVal = {}, 
 arrKey = [], 
 arrVal = []; 
m.set(objKey, objVal); 
m.set(arrKey, arrVal);
```

### 顺序与迭代

与 Object 类型的一个主要差异是，Map 实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作

映射实例可以提供一个迭代器（Iterator），能以插入顺序生成[key, value]形式的数组。可以通过 entries()方法（或者 Symbol.iterator 属性，它引用 entries()）取得这个迭代器

```js
  const m = new Map(([ 
 ["key1", "val1"], 
 ["key2", "val2"], 
 ["key3", "val3"] 
])

alert(m.entries === m[Symbol.iterator]); // true 
for (let pair of m.entries()) { 
 alert(pair); 
} 
// [key1,val1] 
// [key2,val2] 
// [key3,val3] 
for (let pair of m[Symbol.iterator]()) { 
 alert(pair); 
} 
// [key1,val1] 
// [key2,val2] 
// [key3,val3] 

```

因为 entries()是默认迭代器，所以可以直接对映射实例使用扩展操作，把映射转换为数组

```js
const m = new Map([ 
 ["key1", "val1"], 
 ["key2", "val2"], 
 ["key3", "val3"] 
]); 
console.log([...m]); // [[key1,val1],[key2,val2],[key3,val3]]
```

如果不使用迭代器，而是使用回调方式，则可以调用映射的 forEach(callback, opt_thisArg)方法并传入回调，依次迭代每个键/值对。传入的回调接收可选的第二个参数，这个参数用于重写回调内部 this 的值

```js
const m = new Map([ 
 ["key1", "val1"], 
 ["key2", "val2"], 
 ["key3", "val3"] 
]); 
m.forEach((val, key) => alert(`${key} -> ${val}`)); 
// key1 -> val1 
// key2 -> val2 
// key3 -> val3
```

keys()和 values()分别返回以插入顺序生成键和值的迭代器

```js
const m = new Map([ 
 ["key1", "val1"], 
 ["key2", "val2"], 
 ["key3", "val3"] 
]); 
for (let key of m.keys()) { 
 alert(key); 
} 
// key1 
// key2 
// key3 
for (let key of m.values()) { 
 alert(key); 
} 
// value1 
// value2 
// value3 
```

键和值在迭代器遍历时是可以修改的，但映射内部的引用则无法修改。当然，这并不妨碍修改作为键或值的对象内部的属性，因为这样并不影响它们在映射实例中的身份

```js
const m1 = new Map([ 
 ["key1", "val1"] 
]); 
// 作为键的字符串原始值是不能修改的
for (let key of m1.keys()) { 
 key = "newKey"; 
 alert(key); // newKey 
 alert(m1.get("key1")); // val1 
} 
const keyObj = {id: 1}; 
const m = new Map([ 
 [keyObj, "val1"] 
]); 
// 修改了作为键的对象的属性，但对象在映射内部仍然引用相同的值
for (let key of m.keys()) { 
 key.id = "newKey"; 
 alert(key); // {id: "newKey"} 
 alert(m.get(keyObj)); // val1 
} 
alert(keyObj); // {id: "newKey"}
```

### 选择Map还是Object

**对于多数 Web 开发任务来说，选择 Object 还是 Map 只是个人偏好问题，影响不大。不过，对于在乎内存和性能的开发者来说，对象和映射之间确实存在显著的差别**

- 同等内存下，Map可存储比Object多50%的键值对
- 涉及插入操作时，Map比Object快
- 涉及大量查找操作，Object速度更快
- 涉及大量删除操作，Map速度更快

## WeakMap（待完善）

## Set

ECMAScript 6 新增的 Set 是一种新集合（值的集合）类型，为这门语言带来集合数据结构。Set 在很多方面都像是加强的 Map，这是因为它们的大多数 API 和行为都是共有的

使用 new 关键字和 Set 构造函数可以创建一个空集合

```js
 const s = new Set()
```

如果想在创建的同时初始化实例，则可以给 Set 构造函数传入一个可迭代对象，其中需要包含插入到新集合实例中的元素

```js
// 使用数组初始化集合 
const s1 = new Set(["val1", "val2", "val3"]); 
alert(s1.size); // 3 
// 使用自定义迭代器初始化集合
const s2 = new Set({ 
 [Symbol.iterator]: function*() { 
 yield "val1"; 
 yield "val2"; 
 yield "val3"; 
 } 
}); 
alert(s2.size); // 3 
```

初始化之后，可以使用 add()增加值，使用 has()查询，通过 size 取得元素数量，以及使用 delete()和 clear()删除元素：

```js
const s = new Set(); 
alert(s.has("Matt")); // false 
alert(s.size); // 0 
s.add("Matt") 
 .add("Frisbie"); 
alert(s.has("Matt")); // true 
alert(s.size); // 2 
s.delete("Matt"); 
alert(s.has("Matt")); // false 
alert(s.has("Frisbie")); // true 
alert(s.size); // 1 
s.clear(); // 销毁集合实例中的所有值
alert(s.has("Matt")); // false 
alert(s.has("Frisbie")); // false 
alert(s.size); // 0 
```

add()返回集合的实例，所以可以将多个添加操作连缀起来，包括初始化

```js
const s = new Set().add("val1"); 
s.add("val2") 
 .add("val3"); 
alert(s.size); // 3
```

与 Map 类似，Set 可以包含任何 JavaScript 数据类型作为值。集合也使用 SameValueZero 操作（ECMAScript 内部定义，无法在语言中使用），基本上相当于使用严格对象相等的标准来检查值的匹配性

```js
const s = new Set(); 
const functionVal = function() {}; 
const symbolVal = Symbol(); 
const objectVal = new Object(); 
s.add(functionVal); 
s.add(symbolVal); 
s.add(objectVal); 
alert(s.has(functionVal)); // true 
alert(s.has(symbolVal)); // true 
alert(s.has(objectVal)); // true 
// SameValueZero 检查意味着独立的实例不会冲突
alert(s.has(function() {})); // false 
```

与严格相等一样，用作值的对象和其他“集合”类型在自己的内容或属性被修改时也不会改变

```js
const s = new Set(); 
const objVal = {}, 
 arrVal = []; 
s.add(objVal); 
s.add(arrVal); 
objVal.bar = "bar"; 
arrVal.push("bar"); 
alert(s.has(objVal)); // true 
alert(s.has(arrVal)); // true 
```

add()和 delete()操作是幂等的。delete()返回一个布尔值，表示集合中是否存在要删除的值

```js
const s = new Set(); 
s.add('foo'); 
alert(s.size); // 1 
s.add('foo'); 
alert(s.size); // 1 
// 集合里有这个值
alert(s.delete('foo')); // true 
// 集合里没有这个值
alert(s.delete('foo')); // false
```

### 顺序与迭代器

Set 会维护值插入时的顺序，因此支持按顺序迭代

集合实例可以提供一个迭代器（Iterator），能以插入顺序生成集合内容。可以通过 values()方法及其别名方法 keys()（或者 Symbol.iterator 属性，它引用 values()）取得这个迭代器

```js
const s = new Set(["val1", "val2", "val3"]); 
alert(s.values === s[Symbol.iterator]); // true 
alert(s.keys === s[Symbol.iterator]); // true 
for (let value of s.values()) { 
 alert(value); 
} 
// val1 
// val2 
// val3 
for (let value of s[Symbol.iterator]()) { 
 alert(value); 
} 
// val1 
// val2 
// val3 
```

因为 values()是默认迭代器，所以可以直接对集合实例使用扩展操作，把集合转换为数组

```js
const s = new Set(["val1", "val2", "val3"]); 
console.log([...s]); // ["val1", "val2", "val3"]
```

集合的 entries()方法返回一个迭代器，可以按照插入顺序产生包含两个元素的数组，这两个元素是集合中每个值的重复出现(键和值相同)

```js
const s = new Set(["val1", "val2", "val3"]); 
for (let pair of s.entries()) { 
 console.log(pair); 
} 
// ["val1", "val1"] 
// ["val2", "val2"] 
// ["val3", "val3"]
```

如果不使用迭代器，而是使用回调方式，则可以调用集合的 forEach()方法并传入回调，依次迭代每个键/值对。传入的回调接收可选的第二个参数，这个参数用于重写回调内部 this 的值

```js
const s = new Set(["val1", "val2", "val3"]); 
s.forEach((val, dupVal) => alert(`${val} -> ${dupVal}`)); 
// val1 -> val1 
// val2 -> val2 
// val3 -> val3 
修改集合中值的属性不会影响其作为集合值的身份：
const s1 = new Set(["val1"]); 
// 字符串原始值作为值不会被修改
for (let value of s1.values()) {
  value = "newVal"; 
 alert(value); // newVal 
 alert(s1.has("val1")); // true 
} 
const valObj = {id: 1}; 
const s2 = new Set([valObj]); 
// 修改值对象的属性，但对象仍然存在于集合中
for (let value of s2.values()) { 
 value.id = "newVal"; 
 alert(value); // {id: "newVal"} 
 alert(s2.has(valObj)); // true 
} 
alert(valObj); // {id: "newVal"}
```
