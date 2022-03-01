//文章标签组件接口
import { getHttp } from '../utils/http'
export const getTags= async () => {
    return await getHttp('/api/get_label')
}