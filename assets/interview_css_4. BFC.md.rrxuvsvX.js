import{_ as s,c as a,ag as t,o as l}from"./chunks/framework.BxW8Wou5.js";const h="/blog/picture/BFC/1.webp",o=JSON.parse('{"title":"4. BFC","description":"","frontmatter":{},"headers":[],"relativePath":"interview/css/4. BFC.md","filePath":"interview/css/4. BFC.md","lastUpdated":1705937785000}'),n={name:"interview/css/4. BFC.md"};function e(p,i,k,d,r,E){return l(),a("div",null,i[0]||(i[0]=[t('<h1 id="_4-bfc" tabindex="-1">4. BFC <a class="header-anchor" href="#_4-bfc" aria-label="Permalink to &quot;4. BFC&quot;">​</a></h1><h2 id="什么是bfc" tabindex="-1">什么是BFC <a class="header-anchor" href="#什么是bfc" aria-label="Permalink to &quot;什么是BFC&quot;">​</a></h2><p>BFC(Block Formatting Context)块级格式化上下文：属于普通（常规）流。它是页面中独立渲染的一块区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。<strong>具有BFC特性的元素可以看作是隔离了的独立容器，容器里面的元素不会再布局上影响到外面的元素，并且BFC具有普通容器没有的一些特性</strong></p><h2 id="如何创建bfc" tabindex="-1">如何创建BFC <a class="header-anchor" href="#如何创建bfc" aria-label="Permalink to &quot;如何创建BFC&quot;">​</a></h2><ul><li>浮动元素</li><li>绝对/固定定位元素(position:absolute / fixed)</li><li>display:inline-block、table-cell、flex、grid</li><li>overflow:hidden/auto/scroll</li><li>contain: layout、content、paint</li></ul><h2 id="bfc解决了什么问题" tabindex="-1">BFC解决了什么问题 <a class="header-anchor" href="#bfc解决了什么问题" aria-label="Permalink to &quot;BFC解决了什么问题&quot;">​</a></h2><h3 id="_1-bfc内的元素会发生边距重叠-即margin-margin" tabindex="-1">1.BFC内的元素会发生边距重叠（即margin + margin） <a class="header-anchor" href="#_1-bfc内的元素会发生边距重叠-即margin-margin" aria-label="Permalink to &quot;1.BFC内的元素会发生边距重叠（即margin + margin）&quot;">​</a></h3><img src="'+h+`"><p>两个div都处在同一个容器下，所以第一个div的下边距和第二个div的上边距发生了边距重叠，导致两个盒子间的距离只有100px。</p><p><strong>如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中,通过overflow：hidden 触发 BFC，这样即可避免两个元素边距重叠。</strong></p><h3 id="_2-bfc在计算高度时会算浮动元素-解决高度坍塌问题" tabindex="-1">2. BFC在计算高度时会算浮动元素（解决高度坍塌问题） <a class="header-anchor" href="#_2-bfc在计算高度时会算浮动元素-解决高度坍塌问题" aria-label="Permalink to &quot;2. BFC在计算高度时会算浮动元素（解决高度坍塌问题）&quot;">​</a></h3><p>浮动元素会脱离常规文档流。导致父元素高度坍塌。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;border: 1px solid #000;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;!--情况一--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;width: 100px;height: 100px;background: #eee;float: left;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;border: 1px solid #000;overflow: hidden&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;!--情况二：开启BFC--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;width: 100px;height: 100px;background: #eee;float: left;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f83040305f0d4d1d96c3ad5fce8d9c5e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp"><h3 id="_3-bfc元素和浮动元素不会发生重叠" tabindex="-1">3. BFC元素和浮动元素不会发生重叠 <a class="header-anchor" href="#_3-bfc元素和浮动元素不会发生重叠" aria-label="Permalink to &quot;3. BFC元素和浮动元素不会发生重叠&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;height: 100px;width: 100px;float: left;background: lightblue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;向左浮动的div&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;!--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">情况一</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;width: 200px; height: 200px;background: #eee&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    由于上一个div向左浮动会脱离文档流，则导致该div会顶上去，占据上一个div的原来位置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;height: 100px;width: 100px;float: left;background: lightblue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;向左浮动的div&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;!--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">情况二：开启BFC</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;width: 200px; height: 200px;background: #eee;overflow: hidden;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    通过overflow: hidden;触发该div的BFC，BFC元素和浮动元素不会发生重叠，于是乎</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5acabbf8be8148c39a295d06c51db2f0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp"><p>第一种情况由于上一个 div 向左浮动会脱离文档流，则导致第二个 div 会顶上去，占据第一个 div 的原来位置(文本信息不会被浮动元素所覆盖) ，如果想避免上面这种重叠情况，可在第二个元素中加入 overflow: hidden 触发第二个元素的 BFC 特性，BFC 元素和浮动元素不会发生重叠。</p>`,19)]))}const c=s(n,[["render",e]]);export{o as __pageData,c as default};
