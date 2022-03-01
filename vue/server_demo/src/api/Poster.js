import { postHttp } from '../utils/request'

/**
 * @description: 获取海报管理页面数据
 * @param { url } 
 * @return {*}
 */
export const setPosters = async (url, params) => {
    return await postHttp(url, params)
}
