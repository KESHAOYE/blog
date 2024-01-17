<!--
 * @Author: KESHAOYE
 * @Date: 2023-03-26 20:25:03
-->
# CSS选择器

选择器：帮助精准选中想要的元素

## 简单选择器

1. ***ID选择器***
2. **类选择器**
3. **元素选择器**
4. **通配符选择器**<br/>
   选中所有元素
   ```css
     * {
       color: red
     }
   ```
5. **属性选择器**<br/>
   根据属性名和属性值选中元素   [属性名  =属性值（可缺省）]
   ```css
     /* 根据属性名选择 */
     [href] {
        color: red
     }
     /* 根据属性值选择(精确匹配) */
     [href='http://www.baidu.com'] {
        color: blue
     }
   ```
6. **伪类选择器**
   
   选中某些元素的某种状态
   四个都书写要按照LVHA书写（爱恨法则）

   ***hover***
   ```css
   /* 鼠标悬停时候的样式 */
    a:hover {
      cursor: pointer
    }
   ```
   ***active***
   ```css
   /* 鼠标按下时候的样式 */
    a:active {
      color: blue
    }
   ```
   ***link***
   ```css
   /** 超链接未访问时的状态 */
   a:link {
    color: red
   }
   ```
   ***visited***
   ```css
   /** 超链接访问过后的状态 */
   a:visited {
    color: red
   }
   ```

7. **伪元素选择器**

   生成并选中某个元素内部的第一个子元素或最后一个伪元素

   before
   ```css
    span::before{
      content: '122' /** 伪元素选择器必须要有content */
    }
   ```
   after
   ```css
    span::after{
      content: '122' /** 伪元素选择器必须要有content */
    }
   ```
## 选择器的组合

1. 后代元素 - 空格
2. 子元素 - > 大于号
3. 相邻兄弟元素 - + 加号
4. 兄弟元素 - ~ 波浪号
5. 并且 - 不加修饰直接放一起

## 选择器的并列

多个选择器要用逗号分隔

