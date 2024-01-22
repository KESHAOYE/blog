# 2. 说说vue响应式原理

## 什么叫响应式（大致流程）

响应式就是数据变化过后要有一些操作。

首先通过```Object.definedProperty```遍历对象的每一个属性，将其变为```getter/setter```。读取属性时就会运行```getter```，给属性赋值时就会运行```setter```。组件在运行```render```函数时，会使用到一些数据（即调用getter），```getter```函数便会记录依赖（观察器watcher）。将来重新赋值时（运行```setter```），```setter```会派发更新（通知watcher），```watcher```再运行```render```函数

<img src='https://v2.cn.vuejs.org/images/data.png'/>

## 概念

**响应式的最终目标是:当对象本身或对象属性发生变化时，将会运行一些函数，最常见的就是render函数**

### Observer

Observer要实现的目标非常简单，就是把一个普通对象转换为响应式对象

- 对于Object（对象）

Observer把对象的每一个属性通过```Object.definedProperty```转换为带有getter和setter的属性。当访问或设置属性时，vue就有机会做一些别的事情。

Observer是vue内部的构造器，我们可以通过Vue提供的静态方法```Vue.observable(object)```间接的使用该功能。

在组件生命周期中，这件事发生在```beforeCreate```之后，```create```之前

由于遍历时只能遍历到当前对象的属性，因此无法检测到将来动态添加/删除的属性。因此Vue提供了```$set```和```$delete```两个实例方法

- 对于Array(数组)
  在js中数组实例的```__proto__```指向```Array.prototype```。但是在Vue中数组实例的```__proto__```指向Vue定义的对象的```Prototype```，这个对象将部分原生的数组方法重写了，并将这个对象的```__proto```指向```Array.prototype```，以此完成数组原型。

### Dep

**读取属性和变化属性时要做什么？这个问题需要Dep来解决**

Dep的含义时Dependency，表示依赖。

Vue会为每一个响应式数据（响应式对象中的每一个属性、对象本身、数组本身）创建一个Dep实例。每个Dep实例有能力做以下两件事：

- 记录依赖： 谁在用我？（getter -> Dep.depend()）
  
  当读取响应式对象的某个属性时，他会进行依赖收集，有人用到了我！

- 派发更新：我变了，要通知用我的那些人。(setter -> Dep.notify())

  当改变某个属性时，它会派发更新，通知那些用我的人



### Watcher

**Dep怎么知道谁在用呢？这就需要watcher。**

当某个函数执行的过程中，用到了响应式数据，响应式数据无法知道是哪个函数在使用自己。

因此，Vue通过一种巧妙的方式解决这个问题。

---

我们不直接执行函数，而是将其交给watcher去执行，watcher是一个对象，每个这样的函数执行时都应该创建一个watcher，通过watcher去执行。

watcher会设置一个全局变量，让全局变量记录当前负责执行的watcher等于自己，再去执行函数，在函数的执行过程中，如果发生了依赖记录```dep.depend()```,那么Dep会把这个全局变量记录下来，表示，有一个watcher用到了自己。

当Dep进行派发更新时，它会通知之前记录的所有watcher

**每一个Vue组件都至少有一个watcher，该watcher中记录了该组件的render函数**

watcher首先会把render函数运行一次收集依赖，于是在那些render中用到的响应式数据就会记录这个watcher

当数据变化时，dep就会通知该watcher，而watcher将重新运行render函数，从而让界面重新渲染的同时重新记录当前的依赖

---

### Scheduler(调度器)

Dep通知Watcher后，如果watcher执行重运行对应的函数，就有可能导致函数频繁运行，从而导致效率低下

试想，如果一个交给watcher的函数，他用到了属性a、b、c、d，那么a、b、c、d属性都会记录依赖，于是下面的代码将触发4次更新

```js
  state.a = 'new data'
  state.b = 'new data'
  state.c = 'new data'
  state.d = 'new data'
```

这样显然是不合适的，因此，watcher收到派发更新的通知后，实际上不是立即执行对应函数，而是交给调度器（scheduler）

调度器维护一个执行队列，该队列同一个watcher仅会存在一次，队列中的watcher不是立即执行，它会通过一个叫做```nextTick```的工具方法，把这些需要执行的watcher放入事件循环的微队列中，nextTick的具体做法是通过Promise完成的

>nextTick通过```this.$nextTick```暴露给开发者

**响应式数据变化时候，render函数的执行是异步的，在微队列中**