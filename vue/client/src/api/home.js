//管理主页接口
import { getHttp } from '../utils/http'
export const getPage = async () => {
    return await getHttp('/api/all')
}

