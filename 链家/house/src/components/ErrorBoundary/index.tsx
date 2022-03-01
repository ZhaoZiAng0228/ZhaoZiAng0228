import React from 'react'

interface Iprops {}
interface Istate {
	hasError: boolean
}

/**
 * 1. 捕捉页面级别错误的生命周期
 * 2. 数据级别错误(axios二次封装,catch,try/catch)
 **/
export default class ErrorBoundary extends React.Component<Iprops, Istate> {
	constructor(props: Iprops) {
		super(props)
		this.state = { hasError: false }
	}

	// 捕捉页面级别错误的生命周期
	static getDerivedStateFromError(error: Error) {
		// 更新 state 使下一次渲染能够显示降级后的 UI
		return { hasError: true }
	}

	// 适用于低版本浏览器的捕捉页面级别错误的生命周期
	componentDidCatch(error: Error, errorInfo: any) {
		// 你同样可以将错误日志上报给服务器
		// 数据埋点
		// logErrorToMyService(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// 你可以自定义降级后的 UI 并渲染
			return <h1>Something went wrong.</h1>
		}

		return this.props.children
	}
}
