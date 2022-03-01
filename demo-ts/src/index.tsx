/*
 * @Author: your name
 * @Date: 2021-11-11 09:35:56
 * @LastEditTime: 2021-11-11 19:23:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\pratice_two\demo-ts\src\index.tsx
 */
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.scss'

ReactDOM.render(
  <Provider store={store}>
    <Suspense
      fallback={
        <div style={{ width: '100%', height: '100%' }}>
          {/* <img style={{ width: '100%' }} src={Loading} alt="" /> */}
          加载中
        </div>
      }
    >
      <App />
    </Suspense>
  </Provider>,

  document.getElementById('root')
)