//管理归档页面接口
import { getHttp } from '../utils/http'
export const getPigeon = async () => {
    return await getHttp('/api/all')
}