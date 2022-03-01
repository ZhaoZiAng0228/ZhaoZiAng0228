import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import store from '../store/index'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const whiteList = ['/login'] //路由拦截的白名单

router.beforeEach((to, from, next) => {
  let token = Cookies.get('token')

  //过滤白名单

  if (whiteList.includes(to.path)) {
    next();
  } else {
    //判断是否有登录信息
    if (token) {
      let routeList = store.state.routeList
      let author = store.state.user.role
      //判断是否为空 或者不存在 (证明要不就说没有登录 要不就是退出账号)
      if (routeList.length <= 0) {
        store.dispatch('GET_ROUTE', author)
        next({ ...to, replace: true })
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
