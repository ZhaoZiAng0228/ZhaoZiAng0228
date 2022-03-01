import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { FindRentFirst } from 'api'

export const toRentList = createAsyncThunk('获取第一次数据接口', async () => {
	const res = await FindRentFirst()

	console.log(res)

	const { data } = res
	return data
})

export interface DemoState {
	// value: number
	// status: 'idle' | 'loading' | 'failed'

	list: any
}

// 默认值
const initialState: any = {
	// userInfo: {
	// 	mobile: '',
	// 	userName: ''
	// },
	// info: ''
	list: []
}

// 请求list数据

// export const forRoom = createAsyncThunk(
// 	'根据几居室获取数据接口',
// 	async (datas: any) => {
// 		const res = await ForRoom(datas)

// 		console.log(res)

// 		const { data } = res
// 		return data
// 	}
// )
// // 注册thunk
// export const toRegisterInfo = createAsyncThunk(
// 	'注册接口',
// 	async (user: any) => {
// 		const { data } = await FetchRegister(user)
// 		return data
// 	}
// )
// // 获取用户信息thunk
// export const toGetUserInfo = createAsyncThunk(
// 	'获取用户信息接口',
// 	async (user: any) => {
// 		const { data } = await FetchGetUserInfo(user)
// 		return data
// 	}
// )
// // 上传头像thunk
// export const toUpload = createAsyncThunk('上传用户头像', async (user: any) => {
// 	const { data } = await FetchUpload(user)
// 	return data
// })
// // 改变用户头像thunk
// export const toChangeAvatar = createAsyncThunk(
// 	'更改用户头像',
// 	async (user: any) => {
// 		const { data } = await FetchChangeAvatar(user)
// 		return data
// 	}
// )
// // 更改用户昵称thunk
// export const toChangeNickname = createAsyncThunk(
// 	'更改用户昵称',
// 	async (user: any) => {
// 		const { data } = await FetchNickname(user)
// 		return data
// 	}
// )

// 模块化切片
export const rentSlice = createSlice({
	name: 'rent',
	initialState,
	// 相当于vuex mutation
	reducers: {
		GET_RENT_LIST: (state, { payload }) => {
			// console.log('state==========', state)
			console.log('payload==========', payload)
			state.list = [...payload]
		}
	},
	// 相当于 vuex action
	extraReducers: {
		// 第一次请求数据接口成功返回函数
		[toRentList.fulfilled.type]: (state, { payload }) => {
			// console.log(payload)
			const { arr } = payload
			state.list = arr
			return state
		}
		// [forPrice.fulfilled.type]: (state, { payload }) => {
		// 	const { newarr } = payload
		// 	console.log(payload)
		// 	if (newarr) {
		// 		state.list = newarr
		// 	}
		// 	// state.list = arr
		// 	return state
		// },
		// [forRoom.fulfilled.type]: (state, { payload }) => {
		// 	const { newarr } = payload
		// 	console.log(payload.newarr)
		// 	if (newarr) {
		// 		state.list = newarr
		// 	}
		// 	// state.list = arr
		// 	return state
		// }
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
export const { GET_RENT_LIST } = rentSlice.actions

// 抛出reducer
export default rentSlice.reducer
