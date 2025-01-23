/*
 * @Author: KESHAOYE
 * @Date: 2023-03-25 21:26:49
 */
/*
 * @Author: KESHAOYE
 * @Date: 2023-03-25 21:26:49
 */
import { defineConfig } from "vitepress";
import { generatorSideBar } from "./utils/autoSideBar/index";

// https://vitepress.dev/reference/site-config
export default async () =>
  defineConfig({
    lastUpdated: true,
    title: "KESHAOYE的后花园",
    description: "KESHAOYE的后花园",
    base: "/blog/",
    srcDir: "src",
    publicPath: process.env.NODE_ENV === "production" ? "/blog/" : "./",
    themeConfig: {
      logo: process.env.NODE_ENV === "production" ? "./logo.png" : "/logo.png",
      nav: [
        { text: "首页", link: "/" },
        { text: "关于我", link: "/myLife/" },
        {
          text: "推荐工具",
          items: [
            { text: "即时工具", link: "http://www.67tool.com" },
            {
              text: "CSS动画库",
              link: "http://hepengwei.cn/#/html/visualDesign",
            },
          ],
        },
      ],

      aside: true,

      outline: "deep",

      sidebar: generatorSideBar({
        contentRoot: "./docs/src/",
        useModule: true,
        showEmptyFolder: false,
        except: [".vitepress", "public"],
        sort: true,
        sortType: "numberPrefix",
      }),

      socialLinks: [{ icon: "github", link: "https://github.com/KESHAOYE" }],

      footer: {
        message: "KESHAOYE-知识星球",
        copyright: "Copyright © 2023-2025 KEWEI LI（2024.1.22起改版中...）",
      },
      search: {
        provider: "local",
      },
    },
  });
