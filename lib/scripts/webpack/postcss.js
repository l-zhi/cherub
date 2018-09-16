
const path = require('path')
const assets = require('postcss-assets')
const config = require('../../config')
const _ = require('lodash')

const fontSize = config.designWidth / 10
const rootSize = config.responsive ? fontSize / (config.designWidth / 2) * config.designWidth : 12
module.exports = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-sprites')(_.assignIn(config.postcssSpritesOptions, {
      spritePath: path.resolve(config.postcssSpritesOptions.spritePath)
    })),
    require('autoprefixer')(config.autoprefixerOptions),
    assets(config.assetsOptions),
    require('postcss-pxtorem')(_.assignIn(config.postcssPxtoremOptions, { rootValue: rootSize })),
  ]
}