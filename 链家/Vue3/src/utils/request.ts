import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElLoading } from "element-plus";

let loading: any;

const startLoading = () => {
  interface Options {
    lock: boolean;
    text: string;
    background: string;
  }

  const options: Options = {
    lock: true,
    text: "加载中...",
    background: "rgba(0,0,0,0.7)",
  };
  loading = ElLoading.service(options);
};

const endLoading = () => {
  loading.close();
};

// 创建实例 baseURL
const instance = axios.create({
  // baseURL: process.env.REACT_APP_URL,
  baseURL: "http://localhost:7001",
  timeout: 10000, // 过期时间
});

// 请求拦截
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // 加载
  startLoading();
  // 处理token
  //  @ts-ignore
  config.headers.authorization = localStorage.getItem("token");
  return config;
});

// 响应拦截
instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // 结束loading
    endLoading();
    return response;
  },
  (error) => {
    // 结束loading
    endLoading();
    // 错误提醒
    return Promise.reject(error);
  }
);

export default instance;
