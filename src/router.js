import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import More from './views/More.vue'
import User from './views/User.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        login_require: true
      },
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      // meta: {
      //   login_require: true
      // },
    },
    {
      path: '/more',
      name: 'more',
      component: More,
      meta: {
        login_require: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
  ]
})
//路由跳转前执行的函数
router.beforeEach((to, from, next) => {
  //判断meta信息里是否需要登录
    if (to.matched.some(record => record.meta.login_require)) {
      if (!window.localStorage.getItem("login")) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    } else {
      next() // 确保一定要调用 next()
    }
})

export default router