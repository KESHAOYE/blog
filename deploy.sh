#!/usr/bin/env sh

# 遇到错误时终止脚本
set -e

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vitepress/dist

# 获取当前时间
nowTime=$(date "+%Y%m%d%H%M%S")

# 初始化 Git 仓库
git init
git branch -m master  # 确保分支是 master
git add -A
git commit -m "deploy: 更新博客 - V${nowTime}"

# 推送到 GitHub Pages
git push -f https://github.com/KESHAOYE/blog.git master:gh-pages

# 返回上级目录
cd -