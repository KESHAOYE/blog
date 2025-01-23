import{_ as e,c as o,ag as t,o as i}from"./chunks/framework.BxW8Wou5.js";const p=JSON.parse('{"title":"2. CSS的多种引入方式、link和@import的区别","description":"","frontmatter":{},"headers":[],"relativePath":"interview/css/2.css的多种引入方式、link和@import的区别.md","filePath":"interview/css/2.css的多种引入方式、link和@import的区别.md","lastUpdated":1705937785000}'),r={name:"interview/css/2.css的多种引入方式、link和@import的区别.md"};function c(n,a,d,l,s,_){return i(),o("div",null,a[0]||(a[0]=[t('<h1 id="_2-css的多种引入方式、link和-import的区别" tabindex="-1">2. CSS的多种引入方式、link和@import的区别 <a class="header-anchor" href="#_2-css的多种引入方式、link和-import的区别" aria-label="Permalink to &quot;2. CSS的多种引入方式、link和@import的区别&quot;">​</a></h1><h2 id="引入方式" tabindex="-1">引入方式 <a class="header-anchor" href="#引入方式" aria-label="Permalink to &quot;引入方式&quot;">​</a></h2><p>引入CSS的方式主要有<code>link</code>标签和<code>@import</code></p><h2 id="区别" tabindex="-1">区别 <a class="header-anchor" href="#区别" aria-label="Permalink to &quot;区别&quot;">​</a></h2><h3 id="作用的区别" tabindex="-1">作用的区别 <a class="header-anchor" href="#作用的区别" aria-label="Permalink to &quot;作用的区别&quot;">​</a></h3><p><code>link</code>是HTML标签，不仅可以加载CSS还可以</p><h3 id="加载顺序的区别" tabindex="-1">加载顺序的区别 <a class="header-anchor" href="#加载顺序的区别" aria-label="Permalink to &quot;加载顺序的区别&quot;">​</a></h3><p>加载页面时，<code>link</code>标签引入的CSS被同时加载；<code>@import</code>引入的CSS在页面加载完毕后加载。</p><h3 id="兼容性问题" tabindex="-1">兼容性问题 <a class="header-anchor" href="#兼容性问题" aria-label="Permalink to &quot;兼容性问题&quot;">​</a></h3><p>CSS2.1以后才有了<code>@import</code>语法，所以需要IE5+的浏览器才适配。而<code>link</code>标签为HTML标签，没有兼容性问题。</p><h3 id="js操作" tabindex="-1">JS操作 <a class="header-anchor" href="#js操作" aria-label="Permalink to &quot;JS操作&quot;">​</a></h3><p>可以通过JS动态添加<code>link</code>标签（因为是HTML标签），而<code>@import</code>不可以。</p>',12)]))}const m=e(r,[["render",c]]);export{p as __pageData,m as default};
