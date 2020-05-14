import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _30da1a8e = () => interopDefault(import('..\\pages\\account\\index.vue' /* webpackChunkName: "pages_account_index" */))
const _1e7e3b2e = () => interopDefault(import('..\\pages\\account_customer\\index.vue' /* webpackChunkName: "pages_account_customer_index" */))
const _f9cc2bac = () => interopDefault(import('..\\pages\\account_internal\\index.vue' /* webpackChunkName: "pages_account_internal_index" */))
const _54e9c4a6 = () => interopDefault(import('..\\pages\\investment\\index.vue' /* webpackChunkName: "pages_investment_index" */))
const _e238d320 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _13a9bc62 = () => interopDefault(import('..\\pages\\mission\\index.vue' /* webpackChunkName: "pages_mission_index" */))
const _1f3be6aa = () => interopDefault(import('..\\pages\\page\\index.vue' /* webpackChunkName: "pages_page_index" */))
const _5de487ac = () => interopDefault(import('..\\pages\\permission\\index.vue' /* webpackChunkName: "pages_permission_index" */))
const _1ab454dc = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages_profile_index" */))
const _429616aa = () => interopDefault(import('..\\pages\\mission\\_id\\index.vue' /* webpackChunkName: "pages_mission__id_index" */))
const _7588194e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/account",
    component: _30da1a8e,
    name: "account"
  }, {
    path: "/account_customer",
    component: _1e7e3b2e,
    name: "account_customer"
  }, {
    path: "/account_internal",
    component: _f9cc2bac,
    name: "account_internal"
  }, {
    path: "/investment",
    component: _54e9c4a6,
    name: "investment"
  }, {
    path: "/login",
    component: _e238d320,
    name: "login"
  }, {
    path: "/mission",
    component: _13a9bc62,
    name: "mission"
  }, {
    path: "/page",
    component: _1f3be6aa,
    name: "page"
  }, {
    path: "/permission",
    component: _5de487ac,
    name: "permission"
  }, {
    path: "/profile",
    component: _1ab454dc,
    name: "profile"
  }, {
    path: "/mission/:id",
    component: _429616aa,
    name: "mission-id"
  }, {
    path: "/",
    component: _7588194e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
