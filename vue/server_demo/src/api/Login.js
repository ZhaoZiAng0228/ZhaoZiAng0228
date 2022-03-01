// login接口
import { postHttp } from '../utils/request'

/**
 * @description: 登录接口
 * @param {url} 
 * @return {*}
 */
export const Login = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 注册接口
 * @param {url}
 * @return {*}
 */
export const Sign = async (url, params) => {
    return await postHttp(url, params)
}
