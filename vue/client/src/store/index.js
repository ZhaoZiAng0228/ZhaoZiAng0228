import { createStore } from 'vuex'
import { loginUser, ThirdPartyLogin } from '../api/login'
import { ElMessage } from 'element-plus'
import router from '../router/index'
import Cookie from 'js-cookie'
// vuex持久化
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    user: {}
  },
  mutations: {
    loginUser(state, payload) {
      state.user = { ...payload.login };
      Cookie.set('token', payload.token);
    },
    thirdpartyLogin(state, payload) {
      const { payloads } = payload
      state.user = {
        ...payloads.user,
        img: payloads.user.avatar_url,
      };
      Cookie.set('token', payloads.code);
    }
  },
  actions: {
    /* 登录接口 */
    async LOGIN_USER({ commit }, payload) {
      const { user } = payload
      let resq = await loginUser({ user: { name: user.name, password: user.password } })
      await commit('loginUser', resq.data)
      /*  当后端返还的code全等于200时,表示用户名密码输入正确,跳转至管理后台 */
      if (resq.data.code === 200) {
        router.go(-1)
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
    /* 第三方登录接口 */
    async THIR_DPARTY_LOGIN({ commit }, payload) {
      const { code } = payload
      let resq = await ThirdPartyLogin(code)
      await commit('thirdpartyLogin', { payloads: { user: resq.data.thirdUser, code } })
      /*  当后端返还的code全等于200时,表示用户名密码输入正确,跳转至管理后台 */
        if (resq.data.status === 200) {
          router.push('/article')
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
