import axios from "axios";
import Cookie from "js-cookie";
import Nprogress from "nprogress";
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    //挂载token
    config.headers.authorization = Cookie.get("token")
    //开启加载条
    Nprogress.start();
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    //关闭加载条
    Nprogress.done();
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    // 响应错误时 状态码对应的问题
    return Promise.reject(error);
  }
);

/**
 * @description:get请求
 * @param {url:请求路径,params:请求参数（object）}
 * @return {*}
 */
export const getHttp = async (url, params) => {
  return await axios.get(url, { params });
};

/**
 * @description:post请求
 * @param {url:请求路径,params:请求参数（object）}
 * @return {*}
 */

export const postHttp = async (url, params) => {
  return await axios.post(url, params);
};
/**
 * @description:put请求
 * @param {url:请求路径,params:请求参数（object）}
 * @return {*}
 */

export const putHttp = async (url, params) => {
  return await axios.put(url, params);
};
/**
 * @description:delete请求
 * @param {url:请求路径,params:请求参数（object）}
 * @return {*}
 */
export const deleteHttp = async (url, params) => {
  return await axios.delete(url, { params });
};
