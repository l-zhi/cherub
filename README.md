<p align="center">
  <img alt="cherub" src="https://gw.alicdn.com/tfs/TB1kSLzw0cnBKNjSZR0XXcFqFXa-512-512.svg" width="200">
</p>

## Install [![npm](https://img.shields.io/npm/v/cherub.svg)](https://www.npmjs.com/package/cherub) [![Build Status](https://travis-ci.org/l-zhi/cherub.svg?branch=master)](https://travis-ci.org/l-zhi/cherub) 

cherub - a professional front-end templates generator to help you getting started with a new project based on HTML5 Boilerplate, also support Typescript, include `base template` & `PWA template`。

Translations: [简体中文](https://github.com/l-zhi/cherub/blob/master/doc/README.zh_CN.md)

```sh
# Node >= 6
# mac/linux
sudo install -g cherub
```

## Usage

```sh
# init
$ cherub create # or cherub create demo -t base[pwa] two templates supported

# install
$ cd demo && npm install

# run
$ cherub start

# build
$ cherub build

# help
$ cherub --help
```

## Contents

### What’s Included?

- Hot reload
- Autoprefixer
- `VM` responsive
- `px` -> `rem` Automatic conversion
- Image sprites
- Automatic set images width & height
- `Typescript` supported
- `PWA` supported

### Dependence

- [Zepto](http://zeptojs.com/) 

### Files

```sh
.
├── package.json
├── .cherub.js
├── dist
└── src
    ├── css
    │   └── app.scss
    ├── img
    ├── index.html
    ├── offline.html
    └── js
        ├── index.js
        └── sw.js
```

## License

cherub is open source software [MIT](https://opensource.org/licenses/MIT)
