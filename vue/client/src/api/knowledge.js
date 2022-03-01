//管理知识小册页面接口
import { getHttp } from '../utils/http'
export const getKnow = async () => {
    return await getHttp('/api/setKnow')
}

// 知识小册详情
export const getKnowList = async (id) => {
    return await getHttp('/api/knowData', { id })
}