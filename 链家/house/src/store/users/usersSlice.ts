import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// import {
// 	FetchGetUserInfo,
// 	FetchRegister,
// 	FetchLogin,
// 	FetchUpload,
// 	FetchChangeAvatar,
// 	FetchNickname
// } from 'api'
// import { Toast } from 'react-vant'
// const reg = /^(\d{3})\d*(\d{4})$/
export interface DemoState {
	// value: number
	// status: 'idle' | 'loading' | 'failed'
}

// 默认值
const initialState: any = {
	userInfo: {
		mobile: '',
		userName: ''
	},
	info: ''
}

// // 登录thunk
// export const toLoginInfo = createAsyncThunk('登录接口', async (user: any) => {
// 	const { data } = await FetchLogin(user)
// 	return data
// })
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
export const usersSlice = createSlice({
	name: 'users',
	initialState,
	// 相当于vuex mutation
	reducers: {
		// LOG_OUT: (state) => {
		// 	state.userInfo = {
		// 		userName: '',
		// 		mobile: ''
		// 	}
		// }
	},
	// 相当于 vuex action
	extraReducers: {
		// // 登录接口成功返回函数
		// [toLoginInfo.fulfilled.type]: (state, { payload }) => {
		// 	return state
		// },
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
// export const { LOG_OUT } = usersSlice.actions

// 抛出reducer
export default usersSlice.reducer
