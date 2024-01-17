// var ice_npm_utils = {
//     // ...
//     getNpmTarball: function(npmName, version, registry){
//       console.log(`当前this指向: ${this}`)
//       // console.log(npmName, version, registry)
//     }
// }
// // 直接调用
// ice_npm_utils.getNpmTarball('@ice/antd-pro-scaffold', 'latest', 'http://registry.npmmirror.com')
// // 立即执行 - IIFE
// (ice_npm_utils.getNpmTarball)('@ice/antd-pro-scaffold', 'latest', 'http://registry.npmmirror.com')
// // (0, function)方法
// (0, ice_npm_utils.getNpmTarball)('@ice/antd-pro-scaffold', 'latest', 'http://registry.npmmirror.com')



function myNew(constructor, ...args) {
  console.log(!(constructor instanceof Function))
  if(!(constructor instanceof Function)) {
    console.log('constructor must be a function')
    throw new Error('constructor must be a function')
  }

  const obj = {}
  obj._proto_ = constructor.prototype
  const result = constructor.call(obj, ...args)
  return typeof result == 'object' ? result : obj   
}

const a = 123
myNew(a)