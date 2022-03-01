/*
 * @Author: your name
 * @Date: 2021-11-10 18:33:40
 * @LastEditTime: 2021-11-11 20:45:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \找房\shixuner\demo-ts\src\views\House\house.tsx
 * 
 * 房源
 */
import { FC } from 'react'
import { RouterView, routes } from '../../router'
import { Link } from 'react-router-dom'

export const House: FC = (props: any) => {
    return (
        <div>
            <button><Link to='/layout/house/market'>楼盘销售</Link></button>
            <button> <Link to='/layout/house/reny'>房屋租聘</Link></button>
            <RouterView routes={props.routes} />
        </div>
    )
}
export default House
