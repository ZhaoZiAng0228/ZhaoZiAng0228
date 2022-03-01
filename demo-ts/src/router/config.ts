/*
 * @Author: your name
 * @Date: 2021-11-10 16:30:14
 * @LastEditTime: 2021-11-11 20:47:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\shixuner\demo-ts\src\router\config.ts
 */
import { lazy } from 'react'
//引入路由文件

const Layout = lazy(() => import('../layout/layout'))
//登录
const Login = lazy(() => import('../views/Login/login'))
//注册
const Register = lazy(() => import('../views/Register/register'))
//房源
const House = lazy(() => import('../views/House/house'))
//直播
const Live = lazy(() => import('../views/Live/live'))
//团购
const Group = lazy(() => import('../views/Group/group'))
//审核
const Audit = lazy(() => import('../views/Audit/audit'))
//订单
const Ordor = lazy(() => import('../views/Order/order'))
//资讯
const Message = lazy(() => import('../views/Message/message'))
//经纪人
const Broker = lazy(() => import('../views/Broker/broker'))
//销售
const Market = lazy(() => import('../views/House/Market/market'))
//房屋租聘
const Rent = lazy(() => import('../views/House/Rent/rent'))

export const routes = [{
    path: '/',
    redirect: '/login',
}, {
    path: '/login',
    component: Login
}, {
    path: '/register',
    component: Register
}, {
    path: '/layout',
    component: Layout,
    children: [{
        path: '/layout',
        redirect: '/layout/house'
    }, {
        // 房源
        path: '/layout/house',
        component: House,
        children: [{
            path: '/layout/house',
            redirect: '/layout/house/market'
        }, {
            path: '/layout/house/market',
            component: Market
        }, {
            path: '/layout/house/rent',
            component: Rent
        }]
    }, {
        // 直播
        path: '/layout/live',
        component: Live
    }, {
        //团购
        path: '/layout/group',
        component: Group
    }, {
        //审核
        path: '/layout/audit',
        component: Audit
    }, {
        //订单
        path: '/layout/ordor',
        component: Ordor
    }, {
        // 资讯
        path: '/layout/message',
        component: Message
    }, {
        // 经纪人
        path: '/layout/broker',
        component: Broker
    }]
}]

export default routes