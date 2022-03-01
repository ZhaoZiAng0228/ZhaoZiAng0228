/*
 * @Author: your name
 * @Date: 2021-10-12 15:03:59
 * @LastEditTime: 2021-10-14 20:10:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \s_1901A_group_one_umi\house\src\pages\home\index.tsx
 */
import { FC, useState } from 'react'
import styled from 'styled-components'
import { createFromIconfontCN } from '@ant-design/icons'
import { Button, Search, Tag, Space, Toast } from 'antd-mobile'
import { Dialogue } from 'components/Dialogue'
import {
	head_bg,
	menu1,
	menu2,
	menu3,
	menu4,
	menu5,
	menu6,
	menu7,
	tool1,
	tool2,
	tool3,
	tool4,
	tool5,
	dialogue,
	good
} from 'assets/index'
const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_p599fnorcgn.js'
})
const Homecontainer = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	background: #f5f5f5;
	height: 100%;
	overflow-y: auto;
	/* 定位图标 */
	.dialogue {
		position: fixed;
		bottom: 3rem;
		right: 0.2rem;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		box-shadow: 0 4px 17px 0 rgb(0 0 0 / 15%);
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 50%;
		}
	}
	/* 首页头部 */
	.homeHeader {
		height: 4.46rem;
		background-size: cover;
		background: url(${head_bg}) 100% 100% no-repeat;
		background-size: cover;
		color: #fff;
		box-sizing: border-box;
		padding: 0 0.3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.header_top {
			height: 0.86rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			div {
				background: rgba(0, 0, 0, 0.5);
				padding: 0.1rem 0.3rem;
				border-radius: 0.3rem;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			span {
				font-size: 0.38rem;
			}
		}
		.header_title {
			flex: 1;
			font-size: 0.28rem;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0.4rem;
			h1 {
				color: #fff;
			}
		}
		.header_search {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			margin: 0.4rem 0;
		}
	}
	.homeMenu {
		padding: 0.2rem 0;
		display: flex;
		flex-wrap: wrap;
		padding: 0.3rem 0;
		border-bottom: 1px solid #e5e5e5;
		background: #fff;
		> div {
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 0.28rem;
			padding: 0.2rem;
			img {
				width: 1rem;
				margin-bottom: 0.26rem;
			}
		}
	}
	//工具
	.homeTool {
		padding: 0 0.4rem;
		background: #fff;
		margin-top: 0.2rem;
		h2 {
			height: 1.1rem;
			border-bottom: 1px solid #e5e5e5;
			line-height: 1.1rem;
		}
		> div {
			display: flex;
			padding: 0.4rem 0;
			div {
				display: flex;
				font-size: 0.28rem;
				width: 20%;
				flex-direction: column;
				align-items: center;
				img {
					width: 0.56rem;
					margin-bottom: 0.2rem;
				}
			}
		}
	}
	//tab切换
	.homeTab {
		padding: 0 0.4rem;
		background: #fff;
		margin-top: 0.2rem;
		.tabBox {
			height: 1.1rem;
			border-bottom: 1px solid #e5e5e5;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.tabTit {
				span {
					color: #ccc;
					margin-left: 0.3rem;
				}
				.active {
					color: #23b371;
				}
			}
		}
	}
	//列表样式
	.houseWorp {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0;
		//二手
		.list_item {
			display: flex;
			padding: 0.4rem 0;
			border-bottom: 1px solid #e4e6f0;
			//房子图片
			.houseImg {
				width: 90%;
				img {
					width: 100%;
				}
			}
			//右侧
			.item_con {
				margin-left: 0.2rem;
				.item_tit {
					margin-bottom: 0.1rem;
					font-size: 0.28rem;
					line-height: 0.45rem;
					img {
						width: 1rem;
						vertical-align: middle;
						margin-right: 0.1rem;
					}
				}
				.item_other {
					color: #9399a5;
					font-size: 0.24rem;
					margin-bottom: 0.1rem;
				}
				.item_price {
					color: #fa5741;
					font-size: 0.32rem;
					font-weight: 600;
					white-space: nowrap;
					margin-bottom: 0.1rem;
					.item_unit {
						font-size: 0.24rem;
						color: #9399a5;
						font-weight: normal;
					}
				}
				.item_box {
				}
			}
		}
		//新房
		.xlist_item {
			display: flex;
			padding: 0.4rem 0;
			border-bottom: 1px solid #e4e6f0;
			//房子图片
			.houseImg {
				width: 41%;
				img {
					width: 100%;
				}
			}
			//右侧
			.item_con {
				margin-left: 0.2rem;
				.item_tit {
					margin-bottom: 0.1rem;
					font-size: 0.34rem;
					img {
						width: 1rem;
						vertical-align: middle;
						margin-right: 0.1rem;
					}
				}
				.item_other {
					color: #9399a5;
					font-size: 0.24rem;
					margin-bottom: 0.1rem;
				}
				.item_price {
					color: #fa5741;
					font-size: 0.32rem;
					font-weight: 600;
					white-space: nowrap;
					margin-bottom: 0.1rem;
					.item_unit {
						font-size: 0.24rem;
						color: #9399a5;
						font-weight: normal;
					}
				}
				.item_box {
					margin: 0.2rem 0;
				}
			}
		}
		//租房
		.zlist_item {
			display: flex;
			padding: 0.4rem 0;
			border-bottom: 1px solid #ccc;
			//房子图片
			.houseImg {
				width: 41%;
				img {
					width: 100%;
				}
			}
			//右侧
			.item_con {
				margin-left: 0.2rem;
				.item_tit {
					margin-bottom: 0.1rem;
					font-size: 0.34rem;
					line-height: 0.45rem;
					img {
						width: 1rem;
						vertical-align: middle;
						margin-right: 0.1rem;
					}
				}
				.item_other {
					color: #9399a5;
					font-size: 0.24rem;
					margin-bottom: 0.1rem;
				}
				.item_price {
					color: #fa5741;
					font-size: 0.32rem;
					font-weight: 600;
					white-space: nowrap;
					margin-bottom: 0.1rem;
					.item_unit {
						font-size: 0.24rem;
						color: #9399a5;
						font-weight: normal;
					}
				}
				.item_box {
					margin: 0.2rem 0;
				}
			}
		}
	}
`

export const Home: FC<any> = (props) => {
	//menu分类
	const menuList = [
		{
			icon: menu1,
			tit: '二手房',
			push: '/basicLayouts/usedApartment'
		},
		{
			icon: menu2,
			tit: '新房',
			push: ''
		},
		{
			icon: menu3,
			tit: '租房',
			push: '/basicLayouts/renting'
		},
		{
			icon: menu4,
			tit: '卖房',
			push: ''
		},
		{
			icon: menu5,
			tit: '海外',
			push: ''
		},
		{
			icon: menu6,
			tit: '商铺办公',
			push: ''
		},
		{
			icon: menu7,
			tit: '找小区',
			push: ''
		}
	]
	//工具
	const toolList = [
		{
			icon: tool1,
			tit: '找经济人',
			push: ''
		},
		{
			icon: tool2,
			tit: '问答',
			push: ''
		},
		{
			icon: tool3,
			tit: '百科',
			push: ''
		},
		{
			icon: tool4,
			tit: '客服电话',
			push: ''
		},
		{
			icon: tool5,
			tit: '查公交',
			push: ''
		}
	]
	//下标
	const [active, setActive] = useState(0)
	//房型切换
	const tabList = [
		{
			tit: '二手房',
			active: 0
		},
		{
			tit: '新房',
			active: 1
		},
		{
			tit: '租房',
			active: 2
		}
	]
	// 二手房
	const houseList = [
		{
			img: 'https://img2.baidu.com/it/u=395832536,268531906&fm=26&fmt=auto',
			tit: '精装修，近地铁，满五年，南通透，精装带地暖',
			icon: good,
			other: '2室1厅/71.08m²/南 北/春申',
			price: 435,
			unit: '92939元/平'
		},
		{
			img: 'https://img2.baidu.com/it/u=395832536,268531906&fm=26&fmt=auto',
			tit: '精装修，近地铁，满五年，南通透，精装带地暖',
			icon: good,
			other: '2室1厅/71.08m²/南 北/春申',
			price: 435,
			unit: '92939元/平'
		},
		{
			img: 'https://img2.baidu.com/it/u=395832536,268531906&fm=26&fmt=auto',
			tit: '精装修，近地铁，满五年，南通透，精装带地暖',
			icon: good,
			other: '2室1厅/71.08m²/南 北/春申',
			price: 435,
			unit: '92939元/平'
		},
		{
			img: 'https://img2.baidu.com/it/u=395832536,268531906&fm=26&fmt=auto',
			tit: '精装修，近地铁，满五年，南通透，精装带地暖',
			icon: good,
			other: '2室1厅/71.08m²/南 北/春申',
			price: 435,
			unit: '92939元/平'
		},
		{
			img: 'https://img1.baidu.com/it/u=2524686918,4202026733&fm=26&fmt=auto',
			tit: '精装修，近地铁，满五年，南通透，精装带地暖',
			icon: good,
			other: '2室1厅/71.08m²/南 北/春申',
			price: 435,
			unit: '92939元/平'
		}
	]
	//新房
	const houseList1 = [
		{
			img: 'https://img1.baidu.com/it/u=2524686918,4202026733&fm=26&fmt=auto',
			tit: '上海星河湾',
			address: '松江-泗泾',
			other: '建面112-230m²',
			price: 435,
			unit: '29000元/平'
		},
		{
			img: 'https://img1.baidu.com/it/u=2524686918,4202026733&fm=26&fmt=auto',
			tit: '上海星河湾',
			address: '松江-泗泾',
			other: '建面112-230m²',
			price: 435,
			unit: '29000元/平'
		},
		{
			img: 'https://img1.baidu.com/it/u=2524686918,4202026733&fm=26&fmt=auto',
			tit: '上海星河湾',
			address: '松江-泗泾',
			other: '建面112-230m²',
			price: 435,
			unit: '29000元/平'
		},
		{
			img: 'https://img1.baidu.com/it/u=2524686918,4202026733&fm=26&fmt=auto',
			tit: '上海星河湾',
			address: '松江-泗泾',
			other: '建面112-230m²',
			price: 435,
			unit: '29000元/平'
		}
	]
	//租房
	const houseList2 = [
		{
			img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
			tit: '整租·成都北路140弄 1室1厅',
			other: '64.00m²|南|链家',
			unit: '3600/月'
		},
		{
			img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
			tit: '整租·成都北路140弄 1室1厅',
			other: '64.00m²|南|链家',
			unit: '3600/月'
		},
		{
			img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
			tit: '整租·成都北路140弄 1室1厅',
			other: '64.00m²|南|链家',
			unit: '3600/月'
		},
		{
			img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
			tit: '整租·成都北路140弄 1室1厅',
			other: '64.00m²|南|链家',
			unit: '3600/月'
		},
		{
			img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
			tit: '整租·成都北路140弄 1室1厅',
			other: '64.00m²|南|链家',
			unit: '3600/月'
		}
	]
	const [value, setValue] = useState('')
	return (
		<Homecontainer>
			{/* 头部盒子 */}
			<div className="homeHeader">
				<div className="header_top">
					<div>
						{'上海市'}
						<IconFont
							type="icon-xiala"
							onClick={() => {
								console.log('跳')

								props.history.push('/blankLayouts/city')
							}}
						/>
					</div>
					<span>
						<IconFont
							type="icon-yonghu"
							onClick={() => {
								// console.log('跳登录/注册')
								props.history.push('/basicLayouts/my')
							}}
						/>
					</span>
				</div>
				<div className="header_title">
					<h1>连接每个家的故事</h1>
				</div>
				<div className="header_search">
					<Search
						placeholder="输入小区或商圈开始找放咯~"
						style={{
							'--background': '#ffffff'
						}}
					/>
				</div>
			</div>
			{/* meun分类 */}
			<div className="homeMenu">
				{menuList.map((item) => {
					return (
						<div
							key={item.tit}
							onClick={() => {
								props.history.push({
									pathname: item.push,
									state: { tit: item.tit }
								})
							}}
						>
							<img src={item.icon} alt="" />
							{item.tit}
						</div>
					)
				})}
			</div>
			{/* 常用工具 */}
			<div className="homeTool">
				<h2>常用工具</h2>
				<div>
					{toolList.map((item) => {
						return (
							<div
								key={item.tit}
								onClick={() => {
									props.history.push(item.push)
								}}
							>
								<img src={item.icon} alt="" />
								{item.tit}
							</div>
						)
					})}
				</div>
			</div>
			{/* 房型tab切换 */}
			<div className="homeTab">
				<div className="tabBox">
					<h2>为您推荐</h2>
					<div className="tabTit">
						{tabList.map((item) => {
							return (
								<span
									key={item.tit}
									className={active === item.active ? 'active' : ''}
									onClick={() => {
										setActive(item.active)
										console.log(item.tit)
									}}
								>
									{item.tit}
								</span>
							)
						})}
					</div>
				</div>
				{/* 列表盒子 */}
				<div className="house">
					<div className="houseWorp">
						{/* 二手房 */}
						{active === 0
							? houseList.map((item, i) => {
									return (
										<div className="list_item" key={i}>
											<div className="houseImg">
												<img src={item.img} alt="" />
											</div>
											<div className="item_con">
												<div className="item_tit">
													<img src={item.icon} alt="" />
													{item.tit}
												</div>
												<p className="item_other">{item.other}</p>

												<p className="item_price">
													{item.price}万{' '}
													<span className="item_unit">{item.unit}</span>{' '}
												</p>
												<div className="tag_box">
													<Tag
														style={{
															margin: ' 0.1rem',
															color: 'rgb(100,142,249)',
															backgroundColor: 'rgba(100,142,249,0.15)',
															border: 'none'
														}}
													>
														VR房源
													</Tag>
													<Tag
														style={{
															margin: ' 0.1rem',
															color: 'rgb(242,161,47)',
															backgroundColor: 'rgba(242,161,47,0.15)',
															border: 'none'
														}}
													>
														满五年
													</Tag>
													<Tag
														style={{
															margin: ' 0.1rem',
															color: 'rgb(51,190,133)',
															backgroundColor: 'rgba(51,190,133,0.15)',
															border: 'none'
														}}
													>
														随时看房
													</Tag>
													<Tag
														style={{
															margin: ' 0.1rem',
															color: 'rgb(123,189,255)',
															backgroundColor: 'rgba(123,189,255,0.15)',
															border: 'none'
														}}
													>
														有电梯
													</Tag>
												</div>
											</div>
										</div>
									)
							  })
							: ''}
						{/* 新房 */}
						{active === 1
							? houseList1.map((item, i) => {
									return (
										<div className="xlist_item" key={i}>
											<div className="houseImg">
												<img src={item.img} alt="" />
											</div>
											<div className="item_con">
												<div className="item_tit">
													{item.tit}
													<Tag
														style={{
															margin: '0 0.1rem',
															color: 'rgb(100,142,249)',
															backgroundColor: 'rgba(100,142,249,0.15)',
															border: 'none'
														}}
													>
														住宅
													</Tag>
													<Tag
														style={{
															margin: '0 0.1rem',
															color: 'rgb(242,161,47)',
															backgroundColor: 'rgba(242,161,47,0.15)',
															border: 'none'
														}}
													>
														在售
													</Tag>
												</div>
												<p className="item_address">{item.address}</p>
												<div className="tag_box">
													<Tag
														style={{
															margin: '0.2em ',
															color: '#9c9fa1',
															backgroundColor: '#fff',
															border: '1px solid #e5e5e5'
														}}
													>
														地铁沿线
													</Tag>
													<Tag
														style={{
															margin: '0.2em ',
															color: '#9c9fa1',
															backgroundColor: '#fff',
															border: '1px solid #e5e5e5'
														}}
													>
														公交直达
													</Tag>
													<Tag
														style={{
															margin: '0.2em ',
															color: '#9c9fa1',
															backgroundColor: '#fff',
															border: '1px solid #e5e5e5'
														}}
													>
														配到齐全
													</Tag>
												</div>
												<p className="item_price">
													{item.unit}{' '}
													<span className="item_unit">{item.other}</span>{' '}
												</p>
											</div>
										</div>
									)
							  })
							: ''}
						{/* 租房 */}
						{active === 2
							? houseList2.map((item, i) => {
									return (
										<div className="zlist_item" key={i}>
											<div className="houseImg">
												<img src={item.img} alt="" />
											</div>
											<div className="item_con">
												<div className="item_tit">{item.tit}</div>
												<p className="item_other">{item.other}</p>
												<div className="tag_box">
													<Tag
														style={{
															margin: '0.2em ',
															color: '#5373B2',
															backgroundColor: '#EDF0F3',
															border: 'none'
														}}
													>
														地铁沿线
													</Tag>
													<Tag
														style={{
															margin: '0.2em ',
															color: '#5373B2',
															backgroundColor: '#EDF0F3',
															border: 'none'
														}}
													>
														公交直达
													</Tag>
													<Tag
														style={{
															margin: '0.2em ',
															color: '#5373B2',
															backgroundColor: '#EDF0F3',
															border: 'none'
														}}
													>
														配到齐全
													</Tag>
												</div>
												<p className="item_price">{item.unit} </p>
											</div>
										</div>
									)
							  })
							: ''}
					</div>
				</div>
				{/* <div className="dialogue">
					<img src={dialogue} alt="" />
				</div> */}
				<Dialogue {...props}  />
			</div>
		</Homecontainer>
	)
}

export default Home
