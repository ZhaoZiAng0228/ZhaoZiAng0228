/*
 * @Author: your name
 * @Date: 2021-11-10 19:52:37
 * @LastEditTime: 2021-11-11 16:49:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\shixuner\demo-ts\src\utils\request.ts
 */
import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:7001'
//请求时进度条
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

/// 1.创建实例 baseURL
const instance = axios.create({
    // baseURL: process.env.REACT_APP_URL,
    baseURL: 'http://localhost:7001'
    // timeout: 5000 // 过期时间
})

// 2.添加请求拦截器(loading、token)
axios.interceptors.request.use(
    function (config: any) {
        // 在发送请求之前做些什么
        // loading...  noprocess
        // NProgress.start()
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
// axios.interceptors.response.Header

// Access-Control-Allow-Headers: "Access-Control-Allow-Origin"
instance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        // 根据公司后台业务返回模型做处理
        // NProgress.done()
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

/**
  * @description: get请求
  * @param {url 请求地址} 
  * @param {params 参数} 
  * @return {接口数据}
  */
export const getHttp = async (url: string, params: any) => {
    return await instance.get(url, { params })
}

/**
 * @description: post请求
 * @param {url 请求地址} 
 * @param {params 参数} 
 * @return {接口数据}
 */
export const postHttp = async (url: string, params: any) => {
    return await instance.post(url, params)
}


/**
 * @description: put请求
 * @param {url 请求地址} 
 * @param {params 参数} 
 * @return {接口数据}
 */
export const putHttp = async (url: string, params: any) => {
    return await instance.put(url, params)
}

/**
 * @description: delete请求
 * @param {url 请求地址} 
 * @param {params 参数} 
 * @return {接口数据}
 */
export const deleteHttp = async (url: string, params: any) => {
    return await instance.delete(url, { params })
}

export default instance
