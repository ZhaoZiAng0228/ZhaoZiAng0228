import { FC } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

export type ItemProps = {
	path: string
	component?: any
	children?: ItemProps[]
	redirect?: string
	auth?: boolean
}

export interface RouterViewProps {
	routes: ItemProps[]
}
// 私有路由 => 导航守卫

export const RouterView: FC<RouterViewProps> = (props) => {
	//组件循环
	const coms = props.routes.filter((v) => v.component)
	//重定向循环
	const redirComs = props.routes.filter((v) => v.redirect)
	return (
		<Switch>
			{coms.map((item, index) => {
				return (
					<Route
						key={index}
						path={item.path}
						render={(itemProps) => {
							return item.auth && !localStorage.getItem('token') ? (
								<Redirect to="/blankLayouts/login" key={item.path} />
							) : (
								<item.component {...itemProps} routes={item.children} />
							)
						}}
					/>
				)
			})}
			{redirComs.map((item, index) => {
				if (item.redirect) {
					return (
						<Redirect key={index} from={item.path} to={item.redirect} exact />
					)
				}
				return ''
			})}
		</Switch>
	)
}

export default RouterView
