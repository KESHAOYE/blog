<!--
 * @Author: KESHAOYE
 * @Date: 2023-03-29 13:51:51
-->
# HTML元素

# iframe元素

通常用于在网页中嵌入另外一个页面

iframe为可替换元素

1. 通常为行盒
2. 通常显示的内容取决于元素的属性
3. CSS不能完全控制其中的样式
4. 具有行块盒的特性
---
# 表单元素

一系列元素，主要用于收集用户数据

## input元素

输入框

- type属性：输入框类型
     text：文本
     password：密码
     date：日期选择，有兼容性问题
     search：搜索框，手机用
     range：滑块（数字范围）
     color：颜色
     number：数字 
     checkbox：多选
     radio：单选
- value属性：输入框的值
- placeholder属性：显示提示文本，文本框没有内容时显示

**input框可以制作按钮**

当type值为submit、reset、button时为按钮

## select元素

下拉列表选择框

通常和option搭配使用

## textarea元素

文本域、多行文本框

## 按钮元素（button）

type属性：reset、submit、button，默认值为button

## 配合表单的其他元素

### label

普通元素，通常能够配合单选和多选框使用

  - 显式关联

  可以通过for属性，让label元素关联某个表单元素，for属性书写表单元素id值

  - 隐式关联
  
  label元素套一个input框

### datalist

数据列表

该元素本身不会显示，通常用于和普通文本框配合使用

### form

通常，会将整个表单元素，放置到form内，作用是提交表单时，会将form内部的表单内容以
合适的方式提交到服务器

form元素对于静态开发没有意义。

### fieldset元素

表单分组
