<!--
 * @Author: KESHAOYE
 * @Date: 2023-03-27 16:18:07
-->
# CSS中的盒子模型

**box**：每个元素在页面中都会生成一个矩形区域（盒子）


盒子类型：

1. 行盒，display属性等于inline的元素
2. 块盒，display属性等于block的元素

**行盒在页面中不换行，块盒在页面中会换行**

display的默认值为inline

浏览器默认样式表设置的块盒： 容器元素(div)、h1~h6、p

常见的行盒：span、a、img、video、audio

## 盒子的组成部分

无论是行盒还是块盒，都由下面几个部分组成，从内到外分别是：

1. 内容 content
   
    &nbsp;&nbsp;width、height设置的是盒子内容的宽高
   
    &nbsp;&nbsp;内容部分通常叫做整个盒子的**内容盒（content-box）**

2. 填充 padding

    &nbsp;&nbsp;盒子边框到盒子内容的距离

    &nbsp;&nbsp;padding-left、right、top、bottom

    &nbsp;&nbsp;padding简写属性（上、右、下、左）

    &nbsp;&nbsp;填充区 + 内容区 = **填充盒（padding-box）**

3. 边框 border

    &nbsp;&nbsp;边框 = 边框样式（borde-style） + 边框宽度（border-width） + 边框颜色（border-color）
    
    &nbsp;&nbsp;边框区域 + 填充区 + 内容区 = **边框盒（border-box）**

4. 外边框 margin
   
   边框到其他盒子的距离

   &nbsp;&nbsp;margin-left、right、top、bottom

   &nbsp;&nbsp;margin简写属性（上、右、下、左）

---

# 盒模型的应用

## 改变宽高范围

默认情况下，width和height设置的是内容的宽高

衡量设计师原型稿时，往往使用的是边框盒，但设置width和height，则设置的是内容盒

1. 使用精确计算
2. CSS3 box-sizing：（content-box - 默认 | border-box）

## 改变背景覆盖范围

默认情况下，背景覆盖边框盒

可以通过 **backgroud-clip（padding-box | content-box | border-box - 默认）** 修改

## 溢出处理

定长、定宽盒子内容可能会发生溢出

overflow（hidden | auto | scroll），控制内容溢出边框盒后的处理方式

## 断词规则

word-break，会影响文字在什么地方被截断换行

normal： 普通，CJK字符（中文、日文、韩文）（文字位置截断），非CJK字符（单词位置截断）

break-all： 截断所有，所有字符都在文字处截断

keep-all：所有文字都在单词处截断

## 空白处理

white-space：nowrap

---

# 行盒的盒模型

常见的行盒：包含具体内容的元素

span、storen、em、a、img、video、audio

## 显著特点

1. 盒子沿着内容延伸
2. 行盒不能设置宽高

调整行盒的宽高，应该使用字体大小、行高、字体类型等间接调整

3. 内边距（填充区）

水平方向有效，垂直方向仅会影响背景，不会实际占据空间

4. 边框

水平方向有效，垂直方向不会实际占据空间

5. 外边距

水平方向有效，垂直方向不会实际占据空间

## 行高的取值

**line-height（可继承）**

1. px，像素值
   
2. 无单位的数字：行高为字体大小的 n 倍
   - 先继承
   - 再计算像素值

3. em单位 ： 行高为字体大小的 n 倍（会出现问题）
   - 先计算像素值
   - 再继承
   
4. 百分比

## 行块盒

display：inline-block的盒子

1. 不独占一行
2. 盒模型中所有尺寸都有效

## 空白折叠

**无论多少个空格、tab、换行都会折叠为一个**

发生在行盒（行块盒）内部或行盒（行块盒）之间

## 可替换元素 和 非可替换元素

大部分元素，页面上显示的结果，取决于元素内容，称为**非可替换元素**

少部分元素，页面上显示的结果，取决于元素属性，称为**可替换元素**

可替换元素：img、video、audio

绝大部分可替换元素为行盒

可替换元素类似行块盒，盒模型中所有尺寸都有效