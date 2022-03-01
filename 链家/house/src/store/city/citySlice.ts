import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { SearchCity } from 'api'
// import { Toast } from 'react-vant'
// const reg = /^(\d{3})\d*(\d{4})$/
export interface DemoState {
	// value: number
	// status: 'idle' | 'loading' | 'failed'
}

// 默认值
const initialState: any = {
	searchCitylist: [],
	searchcityname: '',
	cityloactionList: JSON.parse(localStorage.getItem('citylist') || '[]') || [],
	cityslices: []
}

// // 登录thunk
export const searchcity = createAsyncThunk('搜索接口', async (payload: any) => {
	const { data } = await SearchCity(payload)
	return data
})

// 模块化切片
export const citySlice = createSlice({
	name: 'city',
	// 相当于vuex mutationq
	initialState,
	reducers: {
		// LOG_OUT: (state) => {
		// 	state.userInfo = {
		// 		userName: '',
		// 		mobile: ''
		// 	}
		clearsearchcity: (state) => {
			state.searchCitylist = []
		},

		//接受传过来的

		citylocalhost: (state, { payload }) => {
			console.log(payload)

			// if (payload.name) {
			// state.cityloactionList.unshift(payload.name)
			const cityarry = state.cityloactionList.findIndex(
				(item: any) => item === payload.name
			)
			console.log(cityarry)
			if (cityarry !== -1) {
				state.cityloactionList.splice(cityarry, 1)
			}
			state.cityloactionList.unshift(payload.name)
			state.cityloactionList = state.cityloactionList.slice(0, 3)
			// if (cityarry === -1) {
			// 	state.cityloactionList.unshift(payload.name)
			// 	state.cityloactionList = state.cityloactionList.slice(0, 3)
			// } else {

			// }

			console.log(state.cityloactionList)
			// }
			// console.log(...payload)

			// state.cityloactionList.forEach((item: any, index: any) => {
			// 	if (item.name !== payload.name) {
			// 		state.searchCitylist.push(payload)
			// 	}
			// })

			// cityarry.reduce(
			// 	(prev: any, cur: any) => (prev.includes(cur) ? prev : [...prev, cur]),
			// 	[]
			// )

			// let stateobj = state.cityloactionList.slice(0, 3)
			// console.log(stateobj)

			localStorage.setItem('citylist', JSON.stringify(state.cityloactionList))

			// JSON.parse(localStorage.getItem('citylist'))
		}

		// }
	},
	// 相当于 vuex action
	extraReducers: {
		// // 登录接口成功返回函数
		[searchcity.fulfilled.type]: (state, { payload }) => {
			// console.log(payload.districts)
			state.searchCitylist = payload.districts
			console.log(state.searchCitylist)
		}
		// // [getData.rejected.type]: (state, action) => {
		// // 	// state.posts = [];
		// // 	console.log('error')
		// // },
		// // [getData.pending.type]: (state, action) => {
		// // 	//    state.posts.unshift(action.payload.data);
		// // 	console.log('进行中')
		// // }
		// // 注册接口成功返回函数
		// [toRegisterInfo.fulfilled.type]: (state, { payload }) => {
		// 	return state
		// },
		// // 获取用户信息接口成功返回函数
		// [toGetUserInfo.fulfilled.type]: (state, { payload }) => {
		// 	if (payload.code === 0) {
		// 		state.userInfo = {
		// 			...payload.data.data,
		// 			mobile: payload.data.data.mobile.replace(reg, '$1****$2')
		// 		}
		// 	} else {
		// 		return state
		// 	}
		// },
		// // 上传头像成功返回函数
		// [toUpload.fulfilled.type]: (state, { payload }) => {
		// 	return state
		// },
		// // 更改用户头像成功返回函数
		// [toChangeAvatar.fulfilled.type]: (state, { payload }) => {
		// 	if (payload.code === 0) {
		// 		//存redux
		// 		state.userInfo = {
		// 			...state.userInfo,
		// 			userImg: payload.data.data.userImg,
		// 			mobile: payload.data.data.mobile.replace(reg, '$1****$2')
		// 		}
		// 		Toast.success(payload.message)
		// 	} else {
		// 		Toast.fail(payload.message)
		// 	}
		// },
		// // 更改用户昵称成功返回函数
		// [toChangeNickname.fulfilled.type]: (state, { payload }) => {
		// 	if (payload.code === 0) {
		// 		// 存redux
		// 		state.userInfo = {
		// 			...payload.data.data,
		// 			mobile: payload.data.data.mobile.replace(reg, '$1****$2'),
		// 			nickName: payload.data.data.nickName
		// 		}
		// 		Toast.success(payload.message)
		// 	} else {
		// 		Toast.fail(payload.message)
		// 	}
		// }
	}
})

// 抛出同步reducers
export const { clearsearchcity, citylocalhost } = citySlice.actions

// 抛出reducer
export default citySlice.reducer
