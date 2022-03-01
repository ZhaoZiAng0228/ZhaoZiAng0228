import axios from "../utils/request";
// 获取数据
export const getList = (data: any) => {
  return axios.get("/api/control", data);
};
// 删除
export const delList = (data: any) => {
  return axios.delete("/api/control", data);
};
// 编辑
export const editList = (data: any) => {
  return axios.post("/api/control", data);
};
