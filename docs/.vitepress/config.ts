/*
 * @Author: KESHAOYE
 * @Date: 2023-03-25 21:26:49
 */
import { defineConfig } from "vitepress";
import { generatorSideBar } from "./utils/autoSideBar/index";
import path from "path";
import fs from "fs";

// 读取当前版本号
const versionFile = path.resolve(__dirname, "version.json");
let version = "未知";

if (process.env.NODE_ENV !== "production") {
  console.log("版本号为开发环境");
  version = "开发版本";
} else if (fs.existsSync(versionFile)) {
  const data = JSON.parse(fs.readFileSync(versionFile, "utf-8"));
  version = data.version;
}

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
        message: `KESHAOYE-知识星球  ${version}`,
        copyright: "Copyright © 2023-2025 KEWEI LI（2024.1.22起改版中...）",
      },
      search: {
        provider: "local",
      },
    },
  });
