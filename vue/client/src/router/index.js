import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/article'
  },
  {
    //文章
    path: '/article',
    component: () => import('../views/Article'),
  },
  {
    path: '/detail/:id',
    component: () => import('../views/Detail/index.vue'),
  },
  {
    //归档
    path: '/pigeonhole',
    component: () => import('../views/Pigeonhole')
  },
  {
    //知识小册
    path: '/knowledge',
    component: () => import('../views/Knowledge')
  },
  {
    //知识小册
    path: '/websocket',
    component: () => import('../views/WebSocket')
  },
  {
    //知识小册详情
    path: '/detailKnow/:id',
    component: () => import('../views/DetailKnow')
  },
  {
    //标签页面
    path: '/tag/:id',
    component: () => import('../views/Tag')
  },
  {
    //分类页面
    path: '/classify/:id',
    component: () => import('../views/Classify')
  },
  {
    //登录
    path: '/login',
    component: () => import('../views/Login')
  },{
    path:'/webSocket',
    component:()=>import('../views/WebSocket')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
