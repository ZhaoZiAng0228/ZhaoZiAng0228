import { userRouter } from "@/router/userRouter";
import { createStore } from "vuex";
import router from "../router/index";
// import persistedState from "vuex-persistedstate";
import { filterRouter } from "../utils/filterRouter";
export default createStore({
  // plugins: [persistedState({ storage: window.localStorage })],
  state: {
    userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}") || {}, // 用户信息
    author: "", // 权限key
    routerList: [], // 获取路由表
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    clearUserInfo(state, payload) {
      state.userInfo = payload;
      localStorage.setItem("userInfo", JSON.stringify(payload));
    },
    clearRouterList(state, payload) {
      state.routerList = payload;
    },
    getRouter(state, payload) {
      const routers = filterRouter(userRouter(), payload);
      routers.forEach((item: any) => {
        router.addRoute(item);
      });
      router.push(routers[0].children[0].path);
      state.routerList = routers[0].children;
    },
  },
  actions: {},
  modules: {},
});
