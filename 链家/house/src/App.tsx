import { BrowserRouter } from 'react-router-dom'
import { RouterView, routes } from 'router/index'
//js写样式,用js的方式写css,作为组件使用,全局样式组件要注册在全局根组件的第一个组件位置
import { GlobalStyle } from 'assets/reset.style'
import ErrorBoundary from 'components/ErrorBoundary'
import './index.scss'
const App = () => {
	return (
		<>
			<BrowserRouter>
				<GlobalStyle />
				<ErrorBoundary>
					<RouterView routes={routes} />
				</ErrorBoundary>
			</BrowserRouter>
		</>
	)
}

export default App
