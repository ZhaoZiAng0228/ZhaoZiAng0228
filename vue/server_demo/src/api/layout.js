import { getHttp } from '../utils/request'

/**
 * @description: 动态路由
 * @param { url } 
 * @return {*}
 */
export const setRoute = async (url, params) => {
    return await getHttp(url, params)
}
