// 聊天室接口
import { postHttp } from '../utils/http'
export const getWebSocket = async () => {
    return await postHttp('/api/getWeb')
}