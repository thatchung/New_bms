const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: '/plugins/responsive-table/css/rwd-table.min.css' },
      { rel: 'stylesheet', href: '/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/css/core.css' },
      { rel: 'stylesheet', href: '/css/components.css' },
      { rel: 'stylesheet', href: '/css/icons.css' },
      { rel: 'stylesheet', href: '/css/pages.css' },
      { rel: 'stylesheet', href: '/css/menu.css' },
      { rel: 'stylesheet', href: '/css/responsive.css' },
      { rel: 'stylesheet', href: '/plugins/animate/animate.min.css' },
      { rel: 'stylesheet', href: '/plugins/bootstrap-sweetalert/sweet-alert.css' },
      { rel: 'stylesheet', href: '/css/vue-multiselect/vue-multiselect.min.css' },
      { rel: 'stylesheet', href: '/plugins/toastr/toastr.min.css' }
    ],
    script: [
      { src: '/js/modernizr.min.js' },
      { src: '/js/jquery.min.js' },
      { src: '/js/bootstrap.min.js' },
      { src: '/js/detect.js' },
      { src: '/js/fastclick.js' },
      { src: '/js/jquery.blockUI.js' },
      { src: '/js/waves.js' },
      { src: '/js/jquery.slimscroll.js' },
      { src: '/js/jquery.scrollTo.min.js' },
      { src: '/js/apexcharts.min.js' },
      { src: '/plugins/bootstrap-sweetalert/sweet-alert.min.js' },
      { src: '/plugins/toastr/toastr.min.js' },
      { src: '/plugins/ckeditor_4.8.0/ckeditor.js' },
      { src: '/js/jquery.core.js' },
      { src: '/js/jquery.app.js' },
      { src: '/js/gifshot.min.js' },

    ],
  },
  dev: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development',
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/app.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/global.js',
    '~/plugins/helper.js',
    { src: '~/plugins/global_nossr', ssr: false },
    { src: '~/plugins/notification' },
    { src: '~/plugins/element-ui' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    // 'bootstrap-vue/nuxt',
    'cookie-universal-nuxt',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient }) {
      if (isDev && process.client) {
        config.node = {
          fs: 'empty'
        }
        config.module.rules.push({
            enforce: 'pre',
            test: /\.(vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
          },
        )
      }
    }
  }
}
