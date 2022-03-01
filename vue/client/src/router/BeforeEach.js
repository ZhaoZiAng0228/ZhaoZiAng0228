import rooter from './index'

rooter.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (sessionStorage.getItem('vuex')) { //判断本地是否存在access_token
            next();
        } else {
            if (to.path === '/login') {
                next();
            } else {
                next({
                    path: '/login'
                })
            }
        }
    }
    else {
        next();
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if (to.fullPath == "/login") {
        if (sessionStorage.getItem('vuex')) {
            next({
                path: from.fullPath
            });
        } else {
            next();
        }
    }
});


export default rooter