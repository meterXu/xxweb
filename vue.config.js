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
    config.entry = {
      project:["./src/project.js"],
      main: ["./src/main.js"]
    }
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
                from: './src/project.js', to: `./js/project.[contenthash:4].js`,
                transform:(res,p)=>{
                  res = res.toString().replace(`export default project`,'')
                  let regex = new RegExp('(?<=process.env\\.)\\w*','gi')
                  let ms = res.match(regex)
                  ms.forEach(m=>{
                    res = res.replaceAll(`process.env.${m}`,`"${process.env[m]}"`)
                  })
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

