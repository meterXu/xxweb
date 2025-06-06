const fs = require('fs')
const project = require('./src/project')
const Icons = require('unplugin-icons/webpack')
fs.writeFileSync('./public/project.js','window.project='+JSON.stringify(project,null,2),{'flag':'w'})
module.exports = {
  lintOnSave: undefined,
  productionSourceMap: false,
  runtimeCompiler:true,
  publicPath: './',
  chainWebpack: (config) => {
    if (process.env.npm_config_report) {
      config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  configureWebpack:  config => {
    config.plugins.push(Icons({compiler:'vue2'}))
    if (process.env.NODE_ENV === 'production') {
      config.optimization.runtimeChunk = false
      config.optimization.splitChunks = {
        cacheGroups: {
          default: false
        }
      }
    }
  },
  devServer: {
    disableHostCheck: true,
  }
}

