import axios from 'utils/request'

export const FindRentOne = (data: any) => {
	return axios.post('/api/rent', data)
}

export const FindRentFirst = () => {
	return axios.post('/api/rentfirst')
}
export const FindRentFs = (data: any) => {
	return axios.post('/api/rentfs', data)
}
export const FindRentPrice = (data: any) => {
	return axios.post('/api/rentprice', data)
}

export const FindRentMore = (data: any) => {
	return axios.post('/api/rentmore', data)
}

export const FindRentSort = (data: any) => {
	return axios.post('/api/rentsort', data)
}

export const ForRentDetail = (data: any) => {
	return axios.post('/api/rentdetail', data)
}

export const FilterSearch = (data: any) => {
	return axios.post('/api/rentsearch', data)
}
// export const FindOneFirst = () => {
// 	return axios.post('/api/secondfirst')
// }

// export const ForPrice = (data: any) => {
// 	return axios.post('/api/secondprice', data)
// }
// export const ForRoom = (data: any) => {
// 	return axios.post('/api/secondroom', data)
// }
// export const ForMore = (data: any) => {
// 	return axios.post('/api/secondroom', data)
// }

// export const ForDetail = (data: any) => {
// 	return axios.post('/api/seconddetail', data)
// }
