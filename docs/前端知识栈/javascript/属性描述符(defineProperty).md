# 属性描述符-definedProperty

## 如何获取属性描述符

🚫 使用```for-in```循环

🚫 使用Object.keys

✅ 使用Object.getOwnPropertyDescriptor

## 如何设置属性描述符

使用 Object.defineProperty(obj, prop, descriptor)

- obj:要设置的对象
- prop：要设置的字段
- descriptor：要定义或修改的属性描述符
  - configurable：是否可被配置
  - enumberable：是否可被遍历
  - value：属性的值
  - writable：是否可重写
  
  访问器

  - get(): 读取器,劫持get
  - set()：设置器,劫持set

## 扩展

- Object.freeze(obj)
  
  不能添加新的属性，不能移除现有的属性，不能更改它们的可枚举性、可配置性、可写性或值，对象的原型也不能被重新指定
  
- Object.seal()

  不能添加新属性、不能删除现有属性或更改其可枚举性和可配置性、不能重新分配其原型。**只要现有属性的值是可写的，它们仍然可以更改**