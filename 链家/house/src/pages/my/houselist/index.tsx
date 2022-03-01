// 我关注的租房
import { FC, useEffect, useState } from 'react'
// 引入样式
import styled from 'styled-components'
// 引入背景图
// import { lianjiazufang } from 'assets/myImg'
// 引入头部导航栏
import { HeaderNav } from 'components/HeaderNav'
import { RouterView, routes } from 'router/index'

import { Tabs } from 'antd-mobile'
// 引入icon
import { createFromIconfontCN } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_zvlwvw36o3.js' // 在 iconfont.cn 上生成
})

// 样式表
const HouselistContainer = styled.div`
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	overflow-y: auto;
	.container {
		height: 100%;
		background: #fff;
	}
	.top {
		display: flex;
		justify-content: space-around;
		font-size: 0.3rem;
		height: 0.7rem;
		line-height: 0.7rem;
		background: #f9f9f9;
		a.active {
			color: #3d71f5;
			border-bottom: 0.01rem solid #3d71f5;
		}
	}
`
export const Houselist: FC<any> = (props: any) => {
	const [HouselistList] = useState<any>([])
	const [ind, setInd] = useState(0)

	const [topList] = useState([
		{
			title: '房源',
			id: 0,
			path: '/blankLayouts/houselist/apartmens'
		},
		{
			title: '门店',
			id: 1,
			path: '/blankLayouts/houselist/shop'
		}
	])

	return (
		<HouselistContainer>
			<HeaderNav {...props} tit={'宏烨租房'} />
			<div className="container">
				<div className="top">
					<NavLink to="/blankLayouts/houselist/apartmens">房源</NavLink>
					<NavLink to="/blankLayouts/houselist/shop">门店</NavLink>
				</div>
				<div className="box">
					<RouterView routes={props.routes}></RouterView>
				</div>
			</div>
		</HouselistContainer>
	)
}
export default Houselist
