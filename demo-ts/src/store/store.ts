/*
 * @Author: your name
 * @Date: 2021-11-10 20:57:12
 * @LastEditTime: 2021-11-11 09:15:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\shixuner\demo-ts\src\store\store.ts
 */

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {}
})

//ts
export type AppDispatch = typeof store.dispatch

//反向注入
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>