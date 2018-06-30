module.exports = {
  "devServer": {
    "port": 8088
  },
  "designWidth": 750,
  "responsive": "vm",
  "entry": "src/js/index.js",
  "output": {
    "path": "dist",
    "publicPath": "./",
    "filename": "js/bundle.js"
  },
  "outputCSS": "css/app.css",
  "outputCSSPublicPath": "../"
}