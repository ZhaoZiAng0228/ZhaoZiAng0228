import { createStore } from 'vuex'
import router from '../router/index'
import { Login, Sign } from '../api/Login'
import { ElMessage } from 'element-plus'
import Cookie from 'js-cookie'
import { filterRouter } from '../utils/filterRouter'
import { userRouter } from '../router/userRouter'
import { setRoute } from '../api/layout'
// vuex持久化
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    user: {},
    token: Cookie.get('token') || '',
    author: '',
    routeList: [],
    list: []
  },
  mutations: {
    loginUser(state, payload) {
      state.user = { ...payload.login }
      state.token = payload.token,
        state.author = payload.login.role,
        Cookie.set('token', payload.token)
      Cookie.set('author', payload.author)
    },
    getRouterList(state, payload) {
      state.routeList = payload
    },
    layoutRoute(state, payload) {
      state.list = payload
    }
  },
  actions: {
    /* 登录接口 */
    async LOGIN_USER({ commit, dispatch }, payload) {
      const { user } = payload
      let resq = await Login('/api/login', {
        user: {
          name: user.name,
          password: user.password
        }
      })

      await dispatch('GET_ROUTE', resq.data.login.role)
      await commit('loginUser', resq.data)

      /*  当后端返还的code全等于200时,表示用户名密码输入正确,跳转至管理后台 */
      if (resq.data.code === 200) {
        router.push('/layout')
        ElMessage({
          message: resq.data.message,
          type: 'success',
        })
      } else {
        /*  当后端返还的code不全等于200时,表示用户名或密码输入错误,重新输入 */
        ElMessage({
          message: resq.data.message,
          type: 'error',
        })
      }
    },
    async GET_ROUTE({ commit }, payload) {
      const routers = filterRouter(userRouter, payload)
      routers.forEach(item => {
        // 将获取到的一个路由 push 到 router 里面
        router.addRoute(item)
      })
      router.push(routers[0].path)
      await commit('getRouterList', routers)
    },
    async SIGN_USER({ commit }, payload) {
      const { user } = payload
      let data = +new Date();
      let resq = await Sign('/api/sign', {
        user: {
          name: user.name,
          password: user.password,
          date: new Date(parseInt(data)).toLocaleString()
        }
      })
      if (resq.data.code === 200) {
        /*  当后端返还的code全等于200时,表示数据库中没有重复的账号,注册成功 */
        ElMessage({
          message: resq.data.message,
          type: 'success',
        })
      } else {
        /*  当后端返还的code不全等于200时,表示数据库中有重复的账号,重新注册 */
        ElMessage({
          message: resq.data.message,
          type: 'error',
        })
      }
    },
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        // 只储存state中的token
        user: val.user
      }
    }
  })],
})
