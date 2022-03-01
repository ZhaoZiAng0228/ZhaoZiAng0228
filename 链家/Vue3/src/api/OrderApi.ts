/*
 * @Author: your name
 * @Date: 2021-10-26 16:34:07
 * @LastEditTime: 2021-10-26 21:44:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-manager-ts\src\api\OrderApi.ts
 */
import axios from "../utils/request";
//获取
export const getOrderdata = (data?: any) => {
	return axios.get('/api/orderdata', { params: data })
}
//删除
export const delOrderdata = (data?: any) => {
	return axios.delete('/api/orderdata', { params: data })
}
//资讯获取加搜索
export const getInfolist = (data?: any) => {
	return axios.get('/api/infodata', { params: data })
}
//资讯删除
export const delInfolist = (data?: any) => {
	return axios.delete('/api/infodata', { params: data })
}
//资讯编辑
export const editInfolist = (data?: any) => {
	return axios.post('/api/infodata', data)
}
//资讯添加
export const addInfolist = (data?: any) => {
	return axios.put('/api/infodata', data)
}
//资讯状态
export const alterInfolist = (data?: any) => {
	return axios.post('/api/alterinfodata', data)
}