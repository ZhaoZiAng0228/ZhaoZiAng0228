import { postHttp,getHttp } from '../utils/http'
//登录接口
export const loginUser = async (params) => {
    return await postHttp('/api/login', params)
}

// 第三方登录接口
export const ThirdPartyLogin = async (code) => {
    return await postHttp('/api/ThirdPartyLogin', {code})
}