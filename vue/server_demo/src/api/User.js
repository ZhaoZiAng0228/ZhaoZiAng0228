import { getHttp,postHttp } from '../utils/request'

/**
 * @description: 获取用户管理数据
 * @param { url } 
 * @return {*}
 */
export const getUser = async (url, params) => {
    return await getHttp(url, params)
}


/**
 * @description: 更改用户管理页面状态
 * @param {url}
 * @return {*}
 */

 export const setTion = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 更改用户管理页面角色权限
 * @param {url}
 * @return {*}
 */

 export const setRole = async (url, params) => {
    return await postHttp(url, params)
}


/**
 * @description: 用户管理页面搜索功能
 * @param {url}
 * @return {*}
 */

 export const getSearch = async (url, params) => {
    return await postHttp(url, params)
}



/**
 * @description: 用户管理页面批量修改状态
 * @param {url}
 * @return {*}
 */

 export const allTion = async (url, params) => {
    return await postHttp(url, params)
}


/**
 * @description: 用户管理页面批量修改角色权限
 * @param {url}
 * @return {*}
 */

 export const allRole = async (url, params) => {
    return await postHttp(url, params)
}
