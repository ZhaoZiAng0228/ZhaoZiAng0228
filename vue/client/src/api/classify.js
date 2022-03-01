//文章分类组件接口
import { getHttp } from '../utils/http'
export const getClassify = async () => {
    return await getHttp('/api/get_classify')
}