/*
 * @Author: KESHAOYE
 * @Date: 2023-03-25 21:26:49
 */
/*
 * @Author: KESHAOYE
 * @Date: 2023-03-25 21:26:49
 */
import { defineConfig } from 'vitepress'
import {generatorSideBar} from './utils/autoSideBar'


// https://vitepress.dev/reference/site-config
export default (async () => defineConfig({
  lastUpdated: true,
  title: "KESHAOYE的后花园",
  description: "KESHAOYE的后花园",
  base:'/blog/', 
  publicPath: process.env.NODE_ENV === 'production'? '/blog/' : './',
  themeConfig: {
    logo: process.env.NODE_ENV === 'production'? './logo.png' : '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '推荐项目', items: [
        {text: '即时工具', link: 'http://www.67tool.com'},
        {text: 'CSS动画库', link: 'http://hepengwei.cn/#/html/visualDesign'}
      ]},
      { text: '关于我', link: '/'}
    ],

    aside: true,
    
    outline: 'deep',

    sidebar: await generatorSideBar({contentRoot: './docs', except: ['.vitepress', 'picture', 'project','video','public']}),
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/KESHAOYE' }
    ],

    footer: {
      message: 'KESHAOYE-知识星球',
      copyright: 'Copyright © 2022-2023 KEWEI LI'
    },

    algolia: {
      appId: 'Q2IEQJ1946',
      apiKey: 'f624056b2a383a81ba7c1221c1838908',
      indexName: 'blog',
      placeholder: '请输入要搜索的内容'
    }
  }
})
)


