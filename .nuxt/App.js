import Vue from 'vue'

import {
  getMatchedComponentsInstances,
  promisify,
  globalHandleError
} from './utils'

import NuxtError from '..\\layouts\\error.vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '..\\assets\\css\\app.css'

import _1a3ae26b from '..\\layouts\\app.vue'
import _77a66d33 from '..\\layouts\\login.vue'
import _6f6c098b from './layouts/default.vue'

const layouts = { "_app": _1a3ae26b,"_login": _77a66d33,"_default": _6f6c098b }

export default {
  head: {"title":"web_kol","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"My grand Nuxt.js project"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.png"},{"rel":"stylesheet","href":"\u002Fplugins\u002Fresponsive-table\u002Fcss\u002Frwd-table.min.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Fbootstrap.min.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Fcore.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Fcomponents.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Ficons.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Fpages.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Fmenu.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Fresponsive.css"},{"rel":"stylesheet","href":"\u002Fplugins\u002Fanimate\u002Fanimate.min.css"},{"rel":"stylesheet","href":"\u002Fplugins\u002Fbootstrap-sweetalert\u002Fsweet-alert.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Fvue-multiselect\u002Fvue-multiselect.min.css"},{"rel":"stylesheet","href":"\u002Fplugins\u002Ftoastr\u002Ftoastr.min.css"}],"script":[{"src":"\u002Fjs\u002Fmodernizr.min.js"},{"src":"\u002Fjs\u002Fjquery.min.js"},{"src":"\u002Fjs\u002Fbootstrap.min.js"},{"src":"\u002Fjs\u002Fdetect.js"},{"src":"\u002Fjs\u002Ffastclick.js"},{"src":"\u002Fjs\u002Fjquery.blockUI.js"},{"src":"\u002Fjs\u002Fwaves.js"},{"src":"\u002Fjs\u002Fjquery.slimscroll.js"},{"src":"\u002Fjs\u002Fjquery.scrollTo.min.js"},{"src":"\u002Fjs\u002Fapexcharts.min.js"},{"src":"\u002Fplugins\u002Fbootstrap-sweetalert\u002Fsweet-alert.min.js"},{"src":"\u002Fplugins\u002Ftoastr\u002Ftoastr.min.js"},{"src":"\u002Fplugins\u002Fckeditor_4.8.0\u002Fckeditor.js"},{"src":"\u002Fjs\u002Fjquery.core.js"},{"src":"\u002Fjs\u002Fjquery.app.js"},{"src":"\u002Fjs\u002Fgifshot.min.js"}],"style":[]},

  render (h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })

    if (this.nuxt.err && NuxtError) {
      const errorLayout = (NuxtError.options || NuxtError).layout
      if (errorLayout) {
        this.setLayout(
          typeof errorLayout === 'function'
            ? errorLayout.call(NuxtError, this.context)
            : errorLayout
        )
      }
    }

    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [layoutEl])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter (el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [templateEl])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,

      transitionEl
    ])
  },

  data: () => ({
    isOnline: true,

    layout: null,
    layoutName: ''
  }),

  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this

      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
    // Add $nuxt.context
    this.context = this.$options.context
  },

  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline () {
      return !this.isOnline
    }
  },

  methods: {
    refreshOnlineStatus () {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    async refresh () {
      const pages = getMatchedComponentsInstances(this.$route)

      if (!pages.length) {
        return
      }
      this.$loading.start()

      const promises = pages.map((page) => {
        const p = []

        if (page.$options.fetch) {
          p.push(promisify(page.$options.fetch, this.context))
        }

        if (page.$options.asyncData) {
          p.push(
            promisify(page.$options.asyncData, this.context)
              .then((newData) => {
                for (const key in newData) {
                  Vue.set(page.$data, key, newData[key])
                }
              })
          )
        }

        return Promise.all(p)
      })
      try {
        await Promise.all(promises)
      } catch (error) {
        this.$loading.fail()
        globalHandleError(error)
        this.error(error)
      }
      this.$loading.finish()
    },

    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) {
          this.$loading.fail()
        }
        if (this.$loading.finish) {
          this.$loading.finish()
        }
      }
    },

    setLayout (layout) {
      if(layout && typeof layout !== 'string') {
        throw new Error('[nuxt] Avoid using non-string value as layout property.')
      }

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },

  components: {
    NuxtLoading
  }
}
