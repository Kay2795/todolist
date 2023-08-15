const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  //开启source-map功能，方便定位控制台报错的代码具体位置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'nosources-source-map'
    } else {
      config.devtool = 'source-map'
    }
  },
  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  }
})
