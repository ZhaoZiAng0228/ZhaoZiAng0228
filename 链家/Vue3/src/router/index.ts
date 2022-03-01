import { createRouter, createWebHistory } from "vue-router";
import axios from "../utils/request";
import store from "../store/index";

const routes = [
  {
    path: "/LoginRegister",
    name: "LoginRegister",
    component: () =>
      import(
        /* webpackChunkName: "LoginRegister" */ "../views/LoginRegister.vue"
      ),
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   component: () =>
  //     import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue"),
  // },
  // {
  //   path: "/:catchAll(.*)",
  //   name: "404",
  //   component: () => import(/* webpackChunkName: "404" */ "../views/404.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const whiteList = ["/LoginRegister", "/StreamingDetail"];
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("managerToken");
  // 过滤白名单
  if (whiteList.includes(to.path)) {
    next();
  } else {
    // 判断是否有登录信息
    if (token) {
      // 获取路由列表和权限
      let routerList = store.state.routerList;
      console.log(store.state.routerList);
      // store.commit('MUTATIONS', payload)

      let author = localStorage.getItem("author");
      // 判断是否为空 或者不存在(证明要么是没登录,要么是退出账号)
      if (routerList.length <= 0 && author) {
        // 如果不存在,获取路由表
        store.commit("getRouter", author);
        next({ ...to, replace: true });
      } else {
        next();
      }
    } else {
      next("/LoginRegister");
    }
  }
});
// // 生成路由
// function generateRoute(menuList:any){
// 	let routes:any = []
// 	const deepList = (list:any) => {
// 		while (list.length) {
// 			let item = list.pop()
// 			// 将item.action = item.path
// 			if (item.path) {
// 				routes.push({
// 					name: item.component,
// 					path: item.path,
// 					meta: {
// 						title: item.menuName
// 					},
// 					component: item.component
// 				})
// 			}
// 			if (item.children && !item.action) {
// 				deepList(item.children)
// 			}
// 		}
// 	}
// 	deepList(menuList)
// 	return routes
// }

// // 导航守卫
// // 生成异步路由 （）
// async function loadAsyncRoutes() {
// 	// 1. 判断token
// 	let token = localStorage.getItem('managerToken') || {}
// 	if (token) {
// 		// 2. 带上token, 请求用户信息接口（权限-路由）
// 		try {
// 			//  请求用户信息接口，拿到路由信息
// 			const res = await axios.get('/api/manager/users')
// 			// console.log('menuList:', menuList)
// 			// 判断路由权限，生成动态路由
// 			let routes = generateRoute(menuList)

// 			// 3. 动态添加路由
// 			routes.map((route) => {
// 				console.log('route:', route)
// 				let url = `./../views/${route.component}.vue`
// 				route.component = () => import(url)
// 				router.addRoute('home', route)
// 			})

// 			// 导航守卫
// 			router.beforeEach((to, from, next) => {
// 				if (router.hasRoute(to.name)) {
// 					document.title = to.meta.title
// 					next()
// 				} else {
// 					next('/404')
// 				}
// 			})
// 		} catch (error) {}
// 	}
// }
// loadAsyncRoutes()

export default router;
