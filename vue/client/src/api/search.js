// 模糊搜索接口
import { getHttp } from '../utils/http'
export const searchHisory = async (searchInp) => {
    return await getHttp('/api/getSearch', { searchInp })
}

