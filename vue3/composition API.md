# 1 setup
+ 新的option, 所有的组合API函数都在此使用, 只在初始化时执行一次
* 函数如果返回对象, 对象中的属性或方法, 模板中可以直接使用

# 2 ref
+ 作用: 定义一个数据的响应式
+ 语法: const xxx = ref(initValue):
  - 创建一个包含响应式数据的引用(reference)对象
  - js中操作数据: xxx.value
  - 模板中操作数据: 不需要.value
* 一般用来定义一个基本类型的响应式数据


# 3 reactive
* 作用: 定义多个数据的响应式
* const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
* 响应式转换是“深层的”：会影响对象内部所有嵌套的属性
* 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的

# 4 比较Vue2与Vue3的响应式(重要)
## vue2的响应式
+ 核心:
  - 对象: 通过defineProperty对对象的已有属性值的读取和修改进行劫持(监视/拦截)
  - 数组: 通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持
+ 问题
  - 对象直接新添加的属性或删除已有属性, 界面不会自动更新
  - 直接通过下标替换元素或更新length, 界面不会自动更新 arr[1] = {}
```JavaScript
  const data1 = {count: 1};
  Object.defineProperty(data1, 'count', {
    get () {
      const value = getter ? getter.call(obj) : val;
      // 依赖收集，收集watcher
      dep.depend()

       if (childOb) {
          /*子对象进行依赖收集，其实就是将同一个watcher观察者实例放进了两个depend中，一个是正在本身闭包中的depend，另一个是子元素的depend*/
          childOb.dep.depend()
        }
        if (Array.isArray(value)) {
          /*是数组则需要对每一个成员都进行依赖收集，如果数组的成员还是数组，则递归。*/
          dependArray(value)
        }
    }, 
    set () {
      // 依赖更新，通知收集的watcher更新
      dep.notify()
    }
  })
```
## Vue3的响应式
+ 核心:
  - 通过Proxy(代理): 拦截对data任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
  - 通过 Reflect(反射): 动态对被代理对象的相应属性进行特定的操作
```JavaScript
  const data2 = {count: 1};
  new Proxy(data2, {
    get (target, prop) {
      return Reflect.get(target, prop);
    },
    set (target, prop, value) {
      return Reflect.set(target, prop, value);
    },
    deleteProperty (target, prop) {
      return Reflect.deleteProperty(target, prop);
    }
})
```

# 5 setup细节
* setup执行的时机
  - 在beforeCreate之前执行（一次），此时组件对象还未创建
  - this是undefined，不能通过this来访问data/computed/methods/props
  - 并且所有Composition API相关回调函数也都不可以访问this
* setup的返回值
  - 一般都返回一个对象，为模板提供数据，也就是模板中可以使用此对象的所有属性和方法
  - 返回对象的属性会和data函数返回对象的属性合并成为组件对象的属性
  - 返回对象的方法会和methods中的方法合并成为组件对象的方法
  - 如果有重名，setup中的优先
  - 注意：
    - 一般不要混合使用：methods中可以访问setup提供的属性和方法，但是在setup方法中不能访问data和methods
    - setup不能是一个async函数，因为返回值不再是一个对象，而是一个promise，模板看不到return对象中的属性数据
* setup的参数
  - setup(props, context) / setup(props, {attrs, slots, emit, expose })
  - props: 包含props配置申明且传入了属性的对象
  - attrs: 包含没有在props配置中申明的属性的对象，相当于this.$attrs
  - slots: 包含所有传入的插槽内容对象，相当于this.$slots
  - emit: 用来分发自定义事件的函数，相当于this.$emit
  - expose: 暴露公共属性，当父组件通过模板引用访问该组件的实例时，仅能访问expose函数暴露出的内容

# 6 reactive与ref细节
* 是Vue3的composition API中最重要的响应式API
* ref用来处理基本类型数据，reactive用来处理对象（递归深度响应式）
* 如果用ref对象/数组，内部会自动将对象/数组转换为reactive的代理对象
* ref内部：把数据包装一层 {value: xxx}，再通过给value属性添加getter/setter来实现对数据的截至
* reactive内部：通过使用Proxy来实现对对象内部所有数据的劫持，并通过Reflect操作对象内部数据
* ref的数据操作：在js中要.value，在模板中不需要，直接访问（内部访问会自动添加.value）

# 7 计算属性与监视
* computed
  - 与配置项computed用法基本一致
* watch
  - 与配置项watch用法基本一直
* watchEffect函数
  - 不用指定要监视的数据，回调函数中使用了哪些响应式数据，就会监视哪些响应式数据
  - 默认初始化时会执行一次，从而可以收集需要监视的数据
  - 监视数据时发生变化时回调

# 8 生命周期
* vue2.0x生命周期图
[2.0x生命周期](https://v2.cn.vuejs.org/images/lifecycle.png)
* vue3.0x生命周期图
  - beforeDestory -> beforeUnmount
  - destoryed -> unmounted
[3.0x生命周期](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)
与2.0x版本生命周期相对应的组合式API
* beforeCreate -> 使用setup
* created -> 使用setup
* beforeMount -> onBeforeMount
* mounted -> onMonted
* beforeUpdate -> onBeforeUpdate
* update -> onUpdate
* beforeDestory -> onBeforeUnmount
* destoryed -> onUnmonted

# 其他新组合和API
## 1.新组件
  * Fragment Vue2中组件必须有有一个根标签，vue3可以不需要根标签
  * Teleport Teleport 提供了一种干净的方法, 让组件的html在父组件界面外的特定标签(很可能是body)下插入显示
  * Suspense 提供default和fallback两个插槽，可以和异步组件配合使用
## 2.其他新的API
  * 全新的全局API
    + createApp
    + defineProperty
    + defineAsyncComponent
    + nextTick
  * 将原来的全局API转移到应用对象
    + app.component()
    + app.config()
    + app.directive()
    + app.mount()
    + app.unmount()
    + app.use()
  * 模板语法变化
    + v-model的本质变化
      - prop：value -> modelValue
      - event：input -> update:modelValue
    + .sync修改符已移除, 由v-model代替
    + v-if优先v-for解析