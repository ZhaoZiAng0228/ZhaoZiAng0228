import axios from 'axios'
import Cookie from 'js-cookie'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = Cookie.get('token')
    if (token) {
        /* 在进入页面时判断是否有token值 */
        config.headers.authorization = token
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    switch (error.response.status) {
        /* 响应错误时 状态码对应的问题 */
        case '400':
            alert('请求的地址不存在或者包含不支持的参数')
            break;
        case '401':
            alert('未授权')
            break;
        case '403':
            alert('被禁止访问')
            break;
        case '404':
            alert('请求的资源不存在')
            break;
        case '422':
            alert('[POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误')
            break;
        case '500':
            alert('内部错误')
            break;
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
 * @description: get请求
 * @param {url 请求地址} 
 * @param {params 参数} 
 * @return {接口数据}
 */
export const getHttp = async (url, params) => {
    return await axios.get(url, { params })
}

/**
 * @description: post请求
 * @param {url 请求地址} 
 * @param {params 参数} 
 * @return {接口数据}
 */
export const postHttp = async (url, params) => {
    return await axios.post(url, params)
}


/**
 * @description: put请求
 * @param {url 请求地址} 
 * @param {params 参数} 
 * @return {接口数据}
 */
export const putHttp = async (url, params) => {
    return await axios.put(url, params)
}

/**
 * @description: delete请求
 * @param {url 请求地址} 
 * @param {params 参数} 
 * @return {接口数据}
 */
export const deleteHttp = async (url, params) => {
    return await axios.delete(url, {params})
}

