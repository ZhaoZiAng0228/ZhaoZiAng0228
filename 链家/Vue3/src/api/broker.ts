import axios from "../utils/request";
// 获取数据
export const getList = (data: any) => {
  return axios.get("/api/brokers", data);
};
// 添加
export const addList = (data: any) => {
  return axios.put("/api/brokers", data);
};
// 删除
export const delList = (data: any) => {
  return axios.delete("/api/brokers", data);
};
// 编辑
export const editList = (data: any) => {
  return axios.post("/api/brokers", data);
};
// 查询
export const searchList = (data: any) => {
  return axios.post("/api/search/brokers", data);
};
