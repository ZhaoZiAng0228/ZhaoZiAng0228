import axios from 'axios'

export const SearchCity = (data: any) => {
	return axios.get(
		`https://restapi.amap.com/v3/config/district?key=2dec3d55509bc53c93825a5fad45b70c&keywords=${data}&subdistrict=1`
	)
}
