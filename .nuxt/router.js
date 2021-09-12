import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3ad9a07d = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _75a25a1c = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _3e385894 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _10648eb6 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _e5254e94 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _2f0ac6c0 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _11a25bfa = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _3ad9a07d,
    children: [{
      path: "/",
      component: _75a25a1c,
      name: "home"
    }, {
      path: "/login",
      component: _3e385894,
      name: "login"
    }, {
      path: "/register",
      component: _3e385894,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _10648eb6,
      name: "profile"
    }, {
      path: "/settings",
      component: _e5254e94,
      name: "settings"
    }, {
      path: "/editor",
      component: _2f0ac6c0,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _11a25bfa,
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
