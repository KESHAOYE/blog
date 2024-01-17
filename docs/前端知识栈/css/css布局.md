<!--
 * @Author: KESHAOYE
 * @Date: 2023-04-02 15:44:35
-->
# CSS布局

## 多栏布局

### 两栏布局

- 方法一：左浮动 + 右浮动(缺点：两个盒子都需要定宽)
  ```html
  <style>
    /** 常规流盒子在自动计算高度时候会无视浮动盒子，出现高度坍塌，用clear解决 */
    .clearfix::before {
       content: '';
       display: block;
       clear: both;
    }
    .container {
      width: 1000px;
    }
    .left {
      float: left;
      width: 200px;
    }
    .main {
      float: right;
      width: 800px;
    } 
  </style>
  <div class='container clearfix'>
    <aside class='left'></aside>
    <main class='main'></main>
  </div>
  ```

- 方法二：左浮动 + BFC
    ```html
  <style>
    /** 常规流盒子在自动计算高度时候会无视浮动盒子，出现高度坍塌，用clear解决 */
    .clearfix::before {
       content: '';
       display: block;
       clear: both;
    }
    .container {
      width: 1000px;
    }
    .left {
      float: left;
      width: 200px;
    }
    /**设置BFC，因独立渲染，避开浮动盒子 */
    .main {
      overflow: hidden
    } 
  </style>
  <div class='container clearfix'>
    <aside class='left'></aside>
    <aside class='right'></aside>
    <main class='main'></main>
  </div>
  ```

### 三栏布局
- 左浮动 + BFC + 右浮动
    ```html
  <style>
    /** 常规流盒子在自动计算高度时候会无视浮动盒子，出现高度坍塌，用clear解决 */
    .clearfix::before {
       content: '';
       display: block;
       clear: both;
    }
    .container {
      width: 1000px;
    }
    .left {
      float: left;
      width: 200px;
    }
    /**设置BFC，因独立渲染，避开浮动盒子 */
    .main {
      overflow: hidden
    } 
  </style>
  <div class='container clearfix'>
    <aside class='left'></aside>
    <aside class='right'></aside>
    <main class='main'></main>
  </div>
  ```

### 等高

1. CSS3 弹性盒子
2. JS控制
3. 伪等高
   - 设置侧边栏的高度为一个夸张的值
   - 设置margin-bottom为负数

### 元素书写顺序 