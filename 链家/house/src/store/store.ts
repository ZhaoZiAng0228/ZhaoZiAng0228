import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { usersSlice, secondSlice, citySlice, rentSlice } from './reducers'
export const store = configureStore({
	reducer: {
		usersSlice,
		secondSlice,
		citySlice,
		rentSlice
	}
})

// ts
export type AppDispatch = typeof store.dispatch
// 反向注入
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<String>
>
