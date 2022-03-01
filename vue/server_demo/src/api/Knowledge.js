import { getHttp,postHttp } from '../utils/request'

/**
 * @description: 知识小册数据
 * @param { url } 
 * @return {*}
 */
export const setKnow = async (url, params) => {
    return await getHttp(url, params)
}

/**
 * @description: 知识小册数据回显
 * @param { url } 
 * @return {*}
 */
 export const setKnowList = async (url, params) => {
    return await postHttp(url, params)
}


/**
 * @description: 知识小册数据编辑
 * @param { url } 
 * @return {*}
 */
 export const redactKnow = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 知识小册数据新建
 * @param { url } 
 * @return {*}
 */
 export const addKnowle = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 知识小册数据改变状态
 * @param { url } 
 * @return {*}
 */
 export const setKnowleStatu = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 知识小册删除
 * @param { url } 
 * @return {*}
 */
 export const deleteKnow = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 知识小册模糊搜索
 * @param { url } 
 * @return {*}
 */
 export const searchKnowle = async (url, params) => {
    return await postHttp(url, params)
}


/**
 * @description: 上传图片 点击覆盖
 * @param { url } 
 * @return {*}
 */
 export const coverImg = async (url, params) => {
    return await postHttp(url, params)
}