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
  devServer: {
    disableHostCheck: true,
  }
}

