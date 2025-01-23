import{_ as a,c as t,ag as r,o as s}from"./chunks/framework.BxW8Wou5.js";const u=JSON.parse('{"title":"2. 说说vue响应式原理","description":"","frontmatter":{},"headers":[],"relativePath":"interview/vue/2.说说Vue响应式原理.md","filePath":"interview/vue/2.说说Vue响应式原理.md","lastUpdated":1705937785000}'),p={name:"interview/vue/2.说说Vue响应式原理.md"};function c(d,e,i,o,n,h){return s(),t("div",null,e[0]||(e[0]=[r(`<h1 id="_2-说说vue响应式原理" tabindex="-1">2. 说说vue响应式原理 <a class="header-anchor" href="#_2-说说vue响应式原理" aria-label="Permalink to &quot;2. 说说vue响应式原理&quot;">​</a></h1><h2 id="什么叫响应式-大致流程" tabindex="-1">什么叫响应式（大致流程） <a class="header-anchor" href="#什么叫响应式-大致流程" aria-label="Permalink to &quot;什么叫响应式（大致流程）&quot;">​</a></h2><p>响应式就是数据变化过后要有一些操作。</p><p>首先通过<code>Object.definedProperty</code>遍历对象的每一个属性，将其变为<code>getter/setter</code>。读取属性时就会运行<code>getter</code>，给属性赋值时就会运行<code>setter</code>。组件在运行<code>render</code>函数时，会使用到一些数据（即调用getter），<code>getter</code>函数便会记录依赖（观察器watcher）。将来重新赋值时（运行<code>setter</code>），<code>setter</code>会派发更新（通知watcher），<code>watcher</code>再运行<code>render</code>函数</p><img src="https://v2.cn.vuejs.org/images/data.png"><h2 id="概念" tabindex="-1">概念 <a class="header-anchor" href="#概念" aria-label="Permalink to &quot;概念&quot;">​</a></h2><p><strong>响应式的最终目标是:当对象本身或对象属性发生变化时，将会运行一些函数，最常见的就是render函数</strong></p><h3 id="observer" tabindex="-1">Observer <a class="header-anchor" href="#observer" aria-label="Permalink to &quot;Observer&quot;">​</a></h3><p>Observer要实现的目标非常简单，就是把一个普通对象转换为响应式对象</p><ul><li>对于Object（对象）</li></ul><p>Observer把对象的每一个属性通过<code>Object.definedProperty</code>转换为带有getter和setter的属性。当访问或设置属性时，vue就有机会做一些别的事情。</p><p>Observer是vue内部的构造器，我们可以通过Vue提供的静态方法<code>Vue.observable(object)</code>间接的使用该功能。</p><p>在组件生命周期中，这件事发生在<code>beforeCreate</code>之后，<code>create</code>之前</p><p>由于遍历时只能遍历到当前对象的属性，因此无法检测到将来动态添加/删除的属性。因此Vue提供了<code>$set</code>和<code>$delete</code>两个实例方法</p><ul><li>对于Array(数组) 在js中数组实例的<code>__proto__</code>指向<code>Array.prototype</code>。但是在Vue中数组实例的<code>__proto__</code>指向Vue定义的对象的<code>Prototype</code>，这个对象将部分原生的数组方法重写了，并将这个对象的<code>__proto</code>指向<code>Array.prototype</code>，以此完成数组原型。</li></ul><h3 id="dep" tabindex="-1">Dep <a class="header-anchor" href="#dep" aria-label="Permalink to &quot;Dep&quot;">​</a></h3><p><strong>读取属性和变化属性时要做什么？这个问题需要Dep来解决</strong></p><p>Dep的含义时Dependency，表示依赖。</p><p>Vue会为每一个响应式数据（响应式对象中的每一个属性、对象本身、数组本身）创建一个Dep实例。每个Dep实例有能力做以下两件事：</p><ul><li><p>记录依赖： 谁在用我？（getter -&gt; Dep.depend()）</p><p>当读取响应式对象的某个属性时，他会进行依赖收集，有人用到了我！</p></li><li><p>派发更新：我变了，要通知用我的那些人。(setter -&gt; Dep.notify())</p><p>当改变某个属性时，它会派发更新，通知那些用我的人</p></li></ul><h3 id="watcher" tabindex="-1">Watcher <a class="header-anchor" href="#watcher" aria-label="Permalink to &quot;Watcher&quot;">​</a></h3><p><strong>Dep怎么知道谁在用呢？这就需要watcher。</strong></p><p>当某个函数执行的过程中，用到了响应式数据，响应式数据无法知道是哪个函数在使用自己。</p><p>因此，Vue通过一种巧妙的方式解决这个问题。</p><hr><p>我们不直接执行函数，而是将其交给watcher去执行，watcher是一个对象，每个这样的函数执行时都应该创建一个watcher，通过watcher去执行。</p><p>watcher会设置一个全局变量，让全局变量记录当前负责执行的watcher等于自己，再去执行函数，在函数的执行过程中，如果发生了依赖记录<code>dep.depend()</code>,那么Dep会把这个全局变量记录下来，表示，有一个watcher用到了自己。</p><p>当Dep进行派发更新时，它会通知之前记录的所有watcher</p><p><strong>每一个Vue组件都至少有一个watcher，该watcher中记录了该组件的render函数</strong></p><p>watcher首先会把render函数运行一次收集依赖，于是在那些render中用到的响应式数据就会记录这个watcher</p><p>当数据变化时，dep就会通知该watcher，而watcher将重新运行render函数，从而让界面重新渲染的同时重新记录当前的依赖</p><hr><h3 id="scheduler-调度器" tabindex="-1">Scheduler(调度器) <a class="header-anchor" href="#scheduler-调度器" aria-label="Permalink to &quot;Scheduler(调度器)&quot;">​</a></h3><p>Dep通知Watcher后，如果watcher执行重运行对应的函数，就有可能导致函数频繁运行，从而导致效率低下</p><p>试想，如果一个交给watcher的函数，他用到了属性a、b、c、d，那么a、b、c、d属性都会记录依赖，于是下面的代码将触发4次更新</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  state.a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;new data&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  state.b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;new data&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  state.c </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;new data&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  state.d </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;new data&#39;</span></span></code></pre></div><p>这样显然是不合适的，因此，watcher收到派发更新的通知后，实际上不是立即执行对应函数，而是交给调度器（scheduler）</p><p>调度器维护一个执行队列，该队列同一个watcher仅会存在一次，队列中的watcher不是立即执行，它会通过一个叫做<code>nextTick</code>的工具方法，把这些需要执行的watcher放入事件循环的微队列中，nextTick的具体做法是通过Promise完成的</p><blockquote><p>nextTick通过<code>this.$nextTick</code>暴露给开发者</p></blockquote><p><strong>响应式数据变化时候，render函数的执行是异步的，在微队列中</strong></p>`,40)]))}const k=a(p,[["render",c]]);export{u as __pageData,k as default};
