import { getHttp } from '../utils/request'

/**
 * @description: 获取所有文章数据
 * @param { url } 
 * @return {*}
 */
export const getAllArticles = async (url, params) => {
    return await getHttp(url, params)
}