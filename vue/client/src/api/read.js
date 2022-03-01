//推荐阅读组件接口
import { getHttp } from '../utils/http'
export const getRead = async (params) => {
    return await getHttp('/api/all', params)
}