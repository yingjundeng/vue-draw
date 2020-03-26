const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // 项目部署的基础路径
  publicPath: '/',

  // 将构建好的文件输出到哪里
  outputDir: 'dist',

  // 放置静态资源的地方 (js/style/img/font/...)
  // assetsDir: '',

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  lintOnSave: false,

  // 使用带有浏览器内编译器的完整构建版本
  // compiler: false,

  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [ /* string or regex */],

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中,开发环境打开会影响热更新)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: false,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: true, //运行完成自动打开页面
    host: '0.0.0.0',
    port: 8077,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    historyApiFallback: true //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@config', resolve('src/config'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@api', resolve('src/api'))
      .set('@utils', resolve('src/utils'))
  },

  // 调整内部的 webpack 配置...(常规写法)
  configureWebpack: config => {
    config.externals = {
      'echarts': 'echarts'
    }
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改插件配置...
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
      )
    } else {
      // 为开发环境修改插件配置...
    }
  },

  // PWA 插件的选项。
  pwa: {
    favicon32: './public/logo.png',
    favicon16: './public/logo.png',
    appleTouchIcon: './public/logo.png',
    maskIcon: './public/logo.png',
    msTileImage: './public/logo.png'
  },

  // vue-cli的第三方插件的选项
  pluginOptions: {}
}
