#!/usr/bin/env sh

# 遇到错误时终止脚本
set -e

# 获取当前时间
nowTime=$(date "+%Y%m%d%H%M%S")

# 生成 `version.json` 并存入 `docs/.vitepress/`
echo "{ \"version\": \"V${nowTime}\" }" > docs/.vitepress/version.json

# 生成静态文件
yarn docs:build

# 进入 `dist` 目录
cd docs/.vitepress/dist

# 初始化 Git 仓库
git init
git branch -m main  # 确保使用 main 分支
git add -A
git commit -m "deploy: 更新博客 - V${nowTime}"

# 推送到 GitHub Pages
git push -f https://github.com/KESHAOYE/blog.git main:gh-pages

# 返回上级目录
cd -

# 提交 `version.json` 到 `master` 分支
git add -A
git commit -m "更新版本号 - V${nowTime}"
git push origin master  # 推送到 master