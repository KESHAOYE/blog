import { sideBarDefaultConfig, sideBarItem } from "./type";

import fs from "fs";
import path from "path";

async function generatorSideBar(config: sideBarDefaultConfig = {}) {
  // 设置默认值
  config.contentRoot = config?.contentRoot ?? "./docs";
  config.except = config?.except ?? [".vitepress"];
  config.suffix = config?.suffix ?? [".md"];
  config.useArticleTitle = config.useArticleTitle ?? true;
  config.parentNodePage = config.parentNodePage ?? 'index.md';
  config.collapsed = config?.collapsed ?? true;
  config.titleHideExtname = config?.titleHideExtname ?? true;
  // 获取根目录信息
  const root = path.resolve(config.contentRoot);
  // 遍历根目录下的所有文件夹和文件，并生成侧边栏数组
  const sidebar = await getSidebarItems(root, config);
  return sidebar;
}

function fileFilter(file, suffix, except) {
  const isExcept = except.findIndex(el => el == path.basename(file))
  const extname = path.extname(file)
  return {
    stat: fs.statSync(file),
    isExcept: isExcept == -1 ? false : true,
    extname,
    extCanWrite: extname == suffix
  }
}

// 判断父节点是否有内容显示（模块描述）
async function judgeHasParentNodePage(filePath, config){
  const files = fs.readdirSync(filePath);
  let hasParentNodePage = false
  for (let file of files) {
    if(path.basename(file) == config.parentNodePage) {
        hasParentNodePage = await true
    }
  }
  return hasParentNodePage
}

async function getSidebarItems(dir, config) {
  const files = fs.readdirSync(dir);
  const items:sideBarItem[] = [];
  // 遍历每个文件名
  for (let file of files) {
    const filePath = path.resolve(dir, file);
    const {stat, isExcept, extname, extCanWrite} = fileFilter(filePath, config.suffix, config.except)
    // 文件为被排除文件或为根目录标题页面则跳过
    if (isExcept || (filePath == path.resolve(config.contentRoot, config.parentNodePage))) {continue};
    if (stat.isDirectory()) {
      const subItems = await getSidebarItems(filePath, config);
      const hasParentNodePage = judgeHasParentNodePage(filePath, config)
      const link =await hasParentNodePage ? "/" + path.relative(config.contentRoot, filePath) + "/" : false ;
      items.push({
        text: file,
        link: link,
        collapsed: config.collapsed,
        items: subItems,
      });
    }
    if(extCanWrite && path.basename(filePath) != config.parentNodePage) {
        const content = fs.readFileSync(filePath, "utf-8");
        let title = extname == '.md' && config.useArticleTitle ? content.match(/^#\s+(.*)/)?.[1] ?? file : path.basename(filePath);
        title = config.titleHideExtname ? title.replace(/^(.+)\.\w+$/,'$1') : title
        let link = "/" + path.relative(config.contentRoot, filePath);
        link = link.replace(/\\/g, '/')
        items.push({
          text: title,
          link: link,
        });
      }
    }
  return items
}

export { generatorSideBar };