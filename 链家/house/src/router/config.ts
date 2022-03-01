import { lazy } from 'react'
//引入路由文件

// 主页
const Home = lazy(() => import('pages/home'))
// 我的
const My = lazy(() => import('pages/my'))
// 登录
const Login = lazy(() => import('pages/login'))
// 注册
const Register = lazy(() => import('pages/register'))
// 我关注的二手房
const FavorHouse = lazy(() => import('pages/my/favorHouse'))
// 我关注的小区
const FavorCommunity = lazy(() => import('pages/my/favorCommunity'))
// 我关注的新房
const FavorNewHouse = lazy(() => import('pages/my/favorNewHouse'))
// 我关注的租房
const Houselist = lazy(() => import('pages/my/houselist'))
// main电话营销
const Miandarao = lazy(() => import('pages/my/miandarao'))
// 聊天
// const Callcenter = lazy(() => import('pages/callcenter'))

const Shop = lazy(() => import('pages/my/houselist/shop'))
const Apartmens = lazy(() => import('pages/my/houselist/apartmens'))

const Ceshi = lazy(() => import('pages/ceshi'))
const Rent = lazy(() => import('pages/renting'))
const Detail = lazy(() => import('pages/detail'))
const UsedApartment = lazy(() => import('pages/usedApartment'))
const City = lazy(() => import('pages/city'))
const Detailcity = lazy(() => import('pages/detailcity'))
const Update = lazy(() => import('pages/update'))
const VR = lazy(() => import('pages/vr'))
// 会话列表
const Session = lazy(() => import('pages/session'))
// 聊天
const Callcenter = lazy(() => import('pages/callcenter'))

// UsedApartment
// Rent

//抛出routes
export const routes = [
	{
		path: '/',
		redirect: '/basicLayouts/home'
	},
	//首页
	{
		path: '/basicLayouts/home',
		// basicLayouts/home
		component: Home
	},
	//测试页
	{
		path: '/basicLayouts/ceshi',
		component: Ceshi
	},
	//二手房页
	{
		path: '/basicLayouts/usedApartment',
		component: UsedApartment
	},
	//租房页
	{
		path: '/basicLayouts/renting',
		component: Rent
	},
	//详情页
	{
		path: '/basicLayouts/detail',
		component: Detail
	},
	//注册页
	{
		path: '/basicLayouts/register',
		component: Register
	},
	//我的页面
	{
		path: '/basicLayouts/my',
		component: My
	},

	{
		path: '/basicLayouts/vr',
		component: VR
	},
	//登录页
	{
		path: '/basicLayouts/login',
		component: Login
	},
	//上传图片
	{
		path: '/basicLayouts/update',
		component: Update
	},

	{
		path: '/blankLayouts/favorHouse',
		component: FavorHouse
	},
	// 我关注的小区
	{
		path: '/blankLayouts/favorCommunity',
		component: FavorCommunity
	},
	// 我关注的新房
	{
		path: '/blankLayouts/favorNewHouse',
		component: FavorNewHouse
	},

	// 我关注的租房
	{
		path: '/blankLayouts/houselist',
		component: Houselist,
		children: [
			{
				path: '/blankLayouts/houselist/shop',
				component: Shop
			},
			{
				path: '/blankLayouts/houselist/apartmens',
				component: Apartmens
			},
			{
				path: '/blankLayouts/houselist',
				redirect: '/blankLayouts/houselist/apartmens'
			}
		]
	},
	//选择城市页
	{
		path: '/blankLayouts/city',
		component: City
	},
	//出行方式
	{
		path: '/blankLayouts/detailcity',
		component: Detailcity
	},
	{
		path: '/blankLayouts/session',
		component: Session
	},
	// 客服中心
	{
		path: '/blankLayouts/callcenter',
		component: Callcenter
	}
]

export default routes
