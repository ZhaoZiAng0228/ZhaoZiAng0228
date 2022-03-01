import axios from 'utils/request'

export const FetchLogin = (data: any) => {
	return axios.post('/api/users/login', data)
}
export const FetchRegister = (data: any) => {
	return axios.post('/api/users/register', data)
}
export const FetchUpload = (data: any) => {
	return axios.post('/api/users/upload', data)
}

export const GetYzm = () => {
	return axios.get('/yzm')
}

export const GetUser = () => {
	return axios.post('/api/users/get')
}

export const GetCities = () => {
	return axios.get('/')
}
export const Zhifubao = (data: any) => {
	console.log(data)
	return axios.post('/api/pay-zhifubao', data)
}
