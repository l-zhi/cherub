<p align="center">
  <img alt="cherub" src="https://gw.alicdn.com/tfs/TB1kSLzw0cnBKNjSZR0XXcFqFXa-512-512.svg" width="200">
</p>

## Install [![npm](https://img.shields.io/npm/v/cherub.svg)](https://www.npmjs.com/package/cherub) [![Build Status](https://travis-ci.org/l-zhi/cherub.svg?branch=master)](https://travis-ci.org/l-zhi/cherub) 


cherub - 面向开发者的 HTML5 构建工具，**安装即用**，可用来制作各种 HTML5 场景营销活动页面，现包括 `基础模板` 和 `PWA` 模板。

> **`提醒`**
由于依赖的包比较多，第一次安装耗时很长很长，请稍微耐心等待一下。
推荐使用淘宝的 npm 镜像进行安装，执行 npm 安装命令时带上 `--registry=https://registry.npm.taobao.org`。
另外 `node-sass` 和 `phantomjs` 这两个包需要编译，可以设置 `SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/`
和 `PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs/`，安装已经编译好的版本。


```sh
# 全局安装 Node >= 6
# mac/linux
$ SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs/ sudo npm install -g cherub --registry=https://registry.npm.taobao.org
# windows
$ sudo npm install -g cherub --registry=https://registry.npm.taobao.org --SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ --PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs/
```

## 使用

```sh
# 初始化项目
$ cherub create # or cherub create demo -t base[pwa] 暂时提供两种模板 base（基础） 和 pwa（渐进式）

# 安装依赖
$ cd demo && npm install

# 开发运行
$ cherub start

# 打包
$ cherub build

# 查看 help
$ cherub --help
```

## 介绍

### 主要功能

- 样式热加载
- Autoprefixer 前缀补全
- vm 适配
- px -> rem 自动转换
- 雪碧图合成
- 自动获取图片 width 和 height
- 部署构建时代码合并压缩

### 相关组件依赖

- [Zepto](http://zeptojs.com/) 默认引入

### 基础目录结构

```sh
.
├── package.json
└── src
    ├── css
    │   └── app.scss
    ├── img
    ├── index.html
    └── js
        └── main.js
```

## 许可

[MIT](https://opensource.org/licenses/MIT)
