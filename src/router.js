import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'
import Order from './views/Order.vue'
import Report from './views/Report.vue'
import PaySuccess from './views/PaySuccess.vue'
import Success from './views/Success.vue'

Vue.use(Router)
let router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '车况查询',
      component: Home,
    },
    {
      path: '/user',
      name: '我的',
      component: User,
      meta: {
        login_require: true
      },
    },
    {
      path: '/order',
      name: '我的订单',
      component: Order,
      meta: {
        login_require: true
      },
    },
    {
      path: '/report',
      name: '维保报告',
      component: Report,
      meta: {
        login_require: true
      },
    },
    {
      path: '/login',
      name: '登陆',
      component: Login,
    },
    {
      path: '/search',
      name: '确认订单',
      component: Search,
      meta: {
        login_require: true
      },
    },
    {
      path: '/success',
      name: '确认订单',
      component: Success,
      meta: {
        login_require: true
      },
    },
    {
      path: '/paySuccess',
      name: '确认订单',
      component: PaySuccess,
      meta: {
        login_require: true
      },
    },
  ]
})
//路由跳转前执行的函数
router.beforeEach((to, from, next) => {
  //判断meta信息里是否需要登录
    if (to.matched.some(record => record.meta.login_require)) {
      if (!window.localStorage.getItem("user")) {
        next({
          path: '/login',
          query:{ path:to.path}
        })
      } else {
        next()
      }
    } else {
      next() // 确保一定要调用 next()
    }
})

export default router