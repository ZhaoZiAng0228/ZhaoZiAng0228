import { postHttp, getHttp } from '../utils/http'
// 跳转详情页接口
export const getDetails = async (id) => {
    return await postHttp('/api/getDetails', { id })
}

// 详情页点赞和取消点赞功能接口
export const getGives = async (user) => {
    return await postHttp('/api/give', user)
}

// 跳转支付页面
export const routerMoney = async (detailMoney) => {
    return await getHttp('/api/getAlipay', detailMoney)
}

// 获取评论
export const allMessage = async (messageList) => {
    return await postHttp('/api/allMessage',messageList)
}