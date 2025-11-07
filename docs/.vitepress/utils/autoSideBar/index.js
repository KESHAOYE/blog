import fs from "fs";
import path from "path";

// —— 自然排序比较器（数字按数值比较，大小写不敏感）
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

// 更健壮：支持 “1.”、“1-”、“1_”、“1 ）”、“1 空格”等前缀数字形式
function extractNumberFromTitle(title = "") {
  const match = String(title)
    .trim()
    .match(/^(\d+)(?:[.\-_\)\s]+)?/);
  return match ? parseInt(match[1], 10) : null;
}

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

// —— 方案A：自然排序（默认），并保留 numberPrefix 的优先数字比较
function sortList(items, config) {
  const { sort, sortType } = config;
  if (!sort || !Array.isArray(items)) return items;

  // 保持纯函数：不直接修改原数组
  const arr = items.slice();

  if (sortType === "numberPrefix") {
    return arr.sort((a, b) => {
      const at = a?.text ?? "";
      const bt = b?.text ?? "";
      const numA = extractNumberFromTitle(at);
      const numB = extractNumberFromTitle(bt);
      // 两者都有数字前缀 => 按数字比
      if (numA != null && numB != null) {
        const diff = numA - numB;
        return diff !== 0 ? diff : collator.compare(at, bt);
      }
      // 只有一方有数字前缀 => 有数字的优先
      if (numA != null) return -1;
      if (numB != null) return 1;
      // 都没有数字前缀 => 自然排序
      return collator.compare(at, bt);
    });
  }

  if (sortType === "createTime") {
    // TODO: 这里按你的“创建时间”实现（示例：读取 fs.statSync(file).birthtimeMs）
    return arr;
  }

  // 默认：自然排序（1, 2, 11）
  return arr.sort((a, b) => collator.compare(a?.text ?? "", b?.text ?? ""));
}

export { generatorSideBar };
