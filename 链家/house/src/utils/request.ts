import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import Cookie from 'js-cookie'
/*
 *为什么封装？ 二次分装
 *@title 六个步骤处理封装。
 一个变量处理环境
 *三个创建
 *三个处理(统一 处理) loading、token、错误、... 参数处理


 new   class 


 consoletoken
 *
 *baseURL --- 借助node-process.NODE_ENV获取环境变量,处理上线问题
  



 */
// const env = process.env.NODE_ENV
// console.log('process.env.REACT_APP_URL:', process.env.PUBLIC_URL)
// axios.defaults.baseURL = 'http://localhost:4396'

// 1.创建实例 baseURL
const instance = axios.create({
	// baseURL: process.env.REACT_APP_URL,
	baseURL: 'http://localhost:7001/'
	// timeout: 5000 // 过期时间
})

// 2.添加请求拦截器(loading、token)
instance.interceptors.request.use(
	function (config: any) {
		// 在发送请求之前做些什么
		// loading...  noprocess
		NProgress.start()
		// 处理token
		config.headers.authorization = localStorage.getItem('token')
		// config.headers.
		return config
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 3.添加响应拦截器(错误状态码处理)
// instance.interceptors.response.Header

// Access-Control-Allow-Headers: "Access-Control-Allow-Origin"
instance.interceptors.response.use(
	function (response) {
		// 对响应数据做点什么
		// 根据公司后台业务返回模型做处理
		NProgress.done()
		console.log('response:', response)
		if (response.status === 200) {
			return response
		} else {
			return Promise.reject('请求错误')
		}
	},
	function (error) {
		// 对响应错误做点什么
		// 错误状态码
		// toasht提示组件
		// 401
		// 404
		// 500
		return Promise.reject(error)
	}
)

export default instance
