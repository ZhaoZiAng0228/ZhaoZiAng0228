//管理文章页面接口
import { getHttp } from '../utils/http'
export const getPage = async () => {
    return await getHttp('/api/all')
}

// 获取分类接口
export const getPageClassify = async () => {
    return await getHttp('/api/get_classify')
}

// 获取标签接口
export const getPageTags = async () => {
    return await getHttp('/api/get_label')
}