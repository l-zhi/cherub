const postcss = require('postcss')
const updateRule = require('postcss-sprites/lib/core').updateRule
module.exports = {
  // https://doc.webpack-china.org/loaders/file-loader/
  imageLoaderOptions: {
    name: 'img/[name].[ext]',
    useRelativePath: process.env.NODE_ENV === 'production',
    emitFile: true
  },
  output: {
    path: 'dist',
    publicPath: './',
    filename: 'js/bundle.js'
  },
  outputCSS: 'css/app.css',
  outputCSSPublicPath: '../',
  entry:'src/js/index.js',
  designWidth: 750,
  responsive: true,
  library: 'zepto', // zepto | jquery
  htmlWebpackPluginOptions: {
    filename: 'index.html',
    template: 'src/index.html',
    cache: false
  },
  UglifyJsPluginOptions: { // 可针对线上优化
    sourceMap: true
  },
  // https://doc.webpack-china.org/plugins/hot-module-replacement-plugin/
  HotModuleReplacementPluginOptions: {},
  devServer: {
    port: 8088,
    contentBase: 'src',
    hot: true,
    watchContentBase: true,
    stats: {
      colors: true
    },
    host: '0.0.0.0',
    disableHostCheck: true,
    publicPath: '/', // 开发模式固定用 /
    inline: true,
    // open: true,
    quiet: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /\/node_modules\/.*/,
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  postcssSpritesOptions: {
    spritePath: './src/img/',
    retina: true,
    hooks: {
      onUpdateRule: function(rule, token, image) {
        updateRule(rule, token, image);
        ['width', 'height'].forEach(function(prop) {
          var value = image.coords[prop]
          if (image.retina) {
            value /= image.ratio
          }
          rule.insertAfter(rule.last, postcss.decl({
            prop: prop,
            value: value + 'px'
          }))
        })
      }
    },
    filterBy: function(image) {
      const files = image.url.split('/')
      const filesCount = files.length
      if (files[filesCount - 2] === 'unsprite') {
        return Promise.reject()
      }
      return Promise.resolve()
    },
    groupBy: function(image) {
      try {
        const files = image.url.split('/')
        const filesCount = files.length
        const filename = files[filesCount - 2].split('.')[0]
        return Promise.resolve(filename)
      } catch (error) {
        return Promise.resolve('')
      }
    }
  },
  assetsOptions: {
    loadPaths: ['src/img/'],
    cache: true
  },
  autoprefixerOptions: {},
  // https://github.com/cuth/postcss-pxtorem
  postcssPxtoremOptions: {
    propWhiteList: []
  },
  ProvidePluginOptions: {},
  CopyWebpackPluginOptions: []
}