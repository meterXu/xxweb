const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  lintOnSave: undefined,
  productionSourceMap: true,
  publicPath: './',
  chainWebpack: (config) => {
    if (process.env.npm_config_report) {
      config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.runtimeChunk = false
      config.optimization.splitChunks = {
        cacheGroups: {
          default: false
        }
      }
    }
    return {
      plugins: [
        new CopyPlugin({
          patterns:
              [{
                from: './src/project.js', to: `js/project.[contenthash:4].js`,
                transform:(res,p)=>{
                  let a = env.process.VUE_APP_baseApi
                  debugger
                  res = res.toString().replace(`export default project`,'')
                  return res
                }
              }]
        })
      ]
    }
  },
  devServer: {
    disableHostCheck: true,
  }
}

