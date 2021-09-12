import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3263c6b4 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _5536455b = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _51caae6d = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _3a00d0a6 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _0e336e9f = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _4a017a2e = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _6c6c4a0c = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _3263c6b4,
    children: [{
      path: "/",
      component: _5536455b,
      name: "home"
    }, {
      path: "/login",
      component: _51caae6d,
      name: "login"
    }, {
      path: "/register",
      component: _51caae6d,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _3a00d0a6,
      name: "profile"
    }, {
      path: "/settings",
      component: _0e336e9f,
      name: "settings"
    }, {
      path: "/editor",
      component: _4a017a2e,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _6c6c4a0c,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
