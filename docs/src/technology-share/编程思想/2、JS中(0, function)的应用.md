# JS中```(0, function)```的应用

## 背景

在阅读[@alibaba/ice](https://v3.ice.work/)的源码时，发现了```(0,function)(params)```这种写法，满头雾水，便查阅了相关资料。

```js
  // ice中的使用（例子）
  tarballURL = await (0, ice_npm_utils_1.getNpmTarball)(scaffoldNpmName, version || 'latest', registry);
```

## 疑问

- 为什么要使用这种写法？
- 为什么是```(0,function)```而不是```(1, function)```？

## 解答

### 1. 为什么要使用这种写法？

实践出真知，在浏览器环境下对上述代码进行模拟。

```js
  const ice_npm_utils = {
    // ...
    getNpmTarball: function(npmName, version, registry){
      console.log(`当前this指向: ${this}`)
      // console.log(npmName, version, registry)
    }
  }
  // 直接调用
  ice_npm_utils.getNpmTarball('@ice/antd-pro-scaffold', 'latest', 'http://registry.npmmirror.com')
  // IIFE
  (ice_npm_utils.getNpmTarball)('@ice/antd-pro-scaffold', 'latest', 'http://registry.npmmirror.com')
  // (0, function)方法
  (0, ice_npm_utils.getNpmTarball)('@ice/antd-pro-scaffold', 'latest', 'http://registry.npmmirror.com')
```

#### 运行结果

<!-- <img src='/public/(0,function)浏览器运行结果.jpg'/> -->

可以看到```(0,function)```更改了函数的this指向为window，即全局

### 2. 为什么是(0,function)而不是(1,function)

 **答案是：可以替换为(1,function)，甚至还可以是2、3、4、5...。**

#### 原因

这其实是JS中的逗号运算符。逗号运算符可以实现连续运算，并返回最后一个参数的值（即getNpmTarball的返回值）。

## 思考

说到改变this指向，我们首先想到的肯定是call/apply/bind这些方法，那为何源码中要使用这种写法呢？

### 猜测

源码中可能对call/apply/bind使用猴子补丁，污染了原型。所以只能用上述方法来改变this指向。建议开发者在开发过程中还是慎用猴子补丁！