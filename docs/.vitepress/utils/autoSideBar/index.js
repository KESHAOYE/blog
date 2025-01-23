import fs from "fs";
import path from "path";

function generatorSideBar(config = {}) {
  // 设置默认值
  config.contentRoot = config?.contentRoot ?? "./docs";
  config.except = config?.except ?? [".vitepress"];
  config.suffix = config?.suffix ?? [".md"];
  config.useArticleTitle = config?.useArticleTitle ?? true; // 新增配置项
  config.parentNodePage = config.parentNodePage ?? "index.md";
  config.collapsed = config?.collapsed ?? false;
  config.titleHideExtname = config?.titleHideExtname ?? true;
  config.useModule = config?.useModule ?? false;
  config.moduleConfig = config?.moduleConfig ?? {};
  config.showEmptyFolder = config?.showEmptyFolder ?? true;
  config.sort = config?.sort ?? false;
  config.sortType = config?.sortType ?? "createTime";

  // 获取根目录信息
  const root = path.resolve(config.contentRoot);
  // 遍历根目录下的所有文件夹和文件，并生成侧边栏数组
  const result = config.useModule
    ? getModuleSideBar(root, config)
    : getSidebarItems(root, config);
  return result;
}

// 判断当前文件是否需要排除
// 排除标准是用户配置的 except 和 suffix
// 返回文件状态信息
function fileFilter(file, suffix, except) {
  const isExcept = except.findIndex((el) => el === path.basename(file));
  const extname = path.extname(file);
  return {
    stat: fs.statSync(file),
    isExcept: isExcept === -1 ? false : true,
    extname,
    extCanWrite: suffix.includes(extname), // 支持多个后缀
  };
}

// 判断父节点是否有内容显示（模块描述）
function judgeHasParentNodePage(filePath, config) {
  const files = fs.readdirSync(filePath);
  let hasParentNodePage = false;
  for (let file of files) {
    if (path.basename(file) === config.parentNodePage) {
      hasParentNodePage = true;
    }
  }
  return hasParentNodePage;
}

function getSidebarItems(dir, config) {
  const files = fs.readdirSync(dir);
  const items = [];
  // 遍历每个文件名
  for (let file of files) {
    const filePath = path.resolve(dir, file);
    const { stat, isExcept, extname, extCanWrite } = fileFilter(
      filePath,
      config.suffix,
      config.except
    );
    // 文件为被排除文件或为根目录标题页面则跳过
    if (
      isExcept ||
      filePath === path.resolve(config.contentRoot, config.parentNodePage)
    ) {
      continue;
    }
    if (stat.isDirectory()) {
      const subItems = getSidebarItems(filePath, config);
      if (!config.showEmptyFolder && subItems.length <= 0) continue;
      const hasParentNodePage = judgeHasParentNodePage(filePath, config);
      const link = hasParentNodePage
        ? "/" + path.relative(config.contentRoot, filePath) + "/"
        : false;
      items.push({
        text: file,
        link: link,
        collapsed: config.collapsed,
        items: sortList(subItems, config), // 对子项进行排序
      });
    }
    if (extCanWrite && path.basename(filePath) !== config.parentNodePage) {
      const content = fs.readFileSync(filePath, "utf-8");
      let title =
        extname === ".md" && config.useArticleTitle
          ? content.match(/^#\s+(.*)/)?.[1] ?? file
          : path.basename(filePath);
      title = config.titleHideExtname
        ? title.replace(/^(.+)\.\w+$/, "$1")
        : title;
      let link = "/" + path.relative(config.contentRoot, filePath);
      link = link.replace(/\\/g, "/");
      items.push({
        text: title,
        link: link,
      });
    }
  }
  return sortList(items, config); // 对当前层级的项进行排序
}

// 生成模块化侧边栏
function getModuleSideBar(dir, config) {
  const { moduleConfig } = config;
  const useModuleConfig = Object.keys(moduleConfig).length > 0;
  const files = fs.readdirSync(dir);
  const items = {};
  for (let file of files) {
    const filePath = path.resolve(dir, file);
    const { stat } = fileFilter(filePath, config.suffix, config.except);
    // 是文件夹则继续
    if (stat.isDirectory()) {
      if (useModuleConfig) {
        console.log("自定义模块模板下个版本推出");
      }
      dealModule(items, file, config);
    }
  }
  return items;
}

// 处理当前模块
function dealModule(items, dirName, config) {
  const keyName = `/${dirName}/`;
  items[keyName] = sortList(
    getSidebarItems(`./docs/src/${dirName}`, config),
    config
  ); // 对模块项进行排序
}

// 根据需要对文章进行排序
function sortList(items, config) {
  const { sort, sortType } = config;
  if (!sort || !Array.isArray(items)) return items;

  if (sortType === "numberPrefix") {
    return items.sort((a, b) => {
      const numA = extractNumberFromTitle(a.text);
      const numB = extractNumberFromTitle(b.text);
      if (numA === null && numB === null) return 0;
      if (numA === null) return 1;
      if (numB === null) return -1;
      return numA - numB;
    });
  }

  // 如果是按创建时间排序，则保留原逻辑（这里未展示原逻辑）
  if (sortType === "createTime") {
    // 原有逻辑...
  }

  return items;
}

// 提取标题中的数字序号
function extractNumberFromTitle(title) {
  const match = title.match(/^(\d+)\./);
  return match ? parseInt(match[1], 10) : null; // 提取数字部分
}

export { generatorSideBar };
