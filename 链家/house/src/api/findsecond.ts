import axios from 'utils/request'

export const FindOne = (data: any) => {
	return axios.post('/api/second', data)
}
export const FindOneFirst = () => {
	return axios.post('/api/secondfirst')
}

export const ForPrice = (data: any) => {
	return axios.post('/api/secondprice', data)
}
export const ForRoom = (data: any) => {
	return axios.post('/api/secondroom', data)
}
export const ForMore = (data: any) => {
	return axios.post('/api/secondmore', data)
}

export const ForDetail = (data: any) => {
	return axios.post('/api/seconddetail', data)
}
export const ForFilterSearch = (data: any) => {
	return axios.post('/api/sconedsearch', data)
}
