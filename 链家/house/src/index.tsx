import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import 'react-vant/lib/index.css'
import Loading from 'assets/myloading.jpg'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

ReactDOM.render(
	<Provider store={store}>
		<Suspense
			fallback={
				<div style={{ width: '100%', height: '100%' }}>
					<img style={{ width: '100%' }} src={Loading} alt="" />
				</div>
			}
		>
			<App />
		</Suspense>
	</Provider>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
