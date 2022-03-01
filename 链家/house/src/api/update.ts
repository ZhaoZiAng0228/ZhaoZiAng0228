import axios from 'utils/request'

export const UpDateImg = (data: any) => {
	return axios.post('/oss/upload', data)
}

export const DownLoad = (data: any) => {
	return axios.post('/oss/download', data)
}
