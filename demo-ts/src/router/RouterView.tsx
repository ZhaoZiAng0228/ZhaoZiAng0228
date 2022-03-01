/*
 * @Author: your name
 * @Date: 2021-11-10 16:30:34
 * @LastEditTime: 2021-11-11 18:46:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\shixuner\demo-ts\src\router\RouterView.tsx
 */
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

export const RouterView: FC<RouterViewProps> = (props) => {
    //组建循环
    const coms = props.routes.filter((v) => v.component)
    //重定向
    const redirectComs = props.routes.filter((v) => v.redirect)
    return (
        <Switch>
            {
                coms.map((item, index) => {
                    return (
                        <Route
                            key={index}
                            path={item.path}
                            render={(itemProps) => {
                                return item.auth && !localStorage.getItem('token') ? (
                                    <Redirect to='/login' key={item.path} />
                                ) : (
                                    <item.component {...itemProps} routes={item.children} />
                                )
                            }}
                        />
                    )
                })
            }
            {
                redirectComs.map((item, index) => {
                    if (item.redirect) {
                        return (
                            <Redirect key={index} from={item.path} to={item.redirect} exact />
                        )
                    }
                    return ''
                })
            }
        </Switch>
    )
}


export default RouterView
