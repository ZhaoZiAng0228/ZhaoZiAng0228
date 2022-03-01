/*
 * @Author: your name
 * @Date: 2021-10-13 16:34:50
 * @LastEditTime: 2021-10-15 15:57:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \house\src\pages\renting\index.tsx
 */
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { createFromIconfontCN } from '@ant-design/icons'
import { Search, Tag } from 'antd-mobile'
import { InfiniteScroll, List, Loading } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { HeaderNav, FilterList } from 'components'
import { useAppSelector } from 'hooks/hooks'
import { AppDispatch } from 'store/store'
import { useDispatch } from 'react-redux'
import { toRentList } from 'store/rent/rentSlice'

import { GET_RENT_LIST } from '../../store/rent/rentSlice'

import { FilterSearch } from 'api'

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_p599fnorcgn.js'
})
const Rentcontainer = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	/* 租房头部 */
	.rent_min {
		border-top: 1px solid #ccc;
	}
	.search {
		padding: 0.2rem 0.3rem;
	}
	.list_box {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 0.3rem;
		.zlist_item {
			display: flex;
			padding: 0.4rem;
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

let count = 0
let pagesize = 5

export const Rent: FC<any> = (props) => {
	const [data, setData] = useState<any>([])
	const [hasMore, setHasMore] = useState(true)
	const dispatch = useDispatch<AppDispatch>()
	const state = useAppSelector((state) => state)
	const [list, setList] = useState<any[]>([])
	let lists = state.rentSlice.list

	useEffect(() => {
		console.log(props.location.state.tit)
		dispatch(toRentList())
		mockRequest()
		loadMore()
	}, [])

	async function mockRequest() {
		// if (lists.length === 0) {
		// 	alert('没有符合条件的数据')
		// }

		if (count >= lists.length / 5) {
			return []
		}
		await sleep(2000)
		count++
		const rentlist = lists.slice((count - 1) * pagesize, count * pagesize)
		return rentlist
	}

	useEffect(() => {
		mockRequest()
		loadMore()

		if (lists.length) {
			const lis = lists.slice(0, 5)
			setList([...lis])
		}
	}, [lists])
	const InfiniteScrollContent = ({ hasMore }: { hasMore?: boolean }) => {
		return (
			<>
				{hasMore ? (
					<>
						<span>Loading</span>
						<Loading />
					</>
				) : (
					<span>--- 我是有底线的 ---</span>
				)}
			</>
		)
	}

	const rentList = [
		{
			title: '区域',
			value: '1'
		},
		{
			title: '方式',
			value: '2',
			children: [
				{ title: '不限', value: '0' },
				{ title: '整租', value: '1' },
				{ title: '合租', value: '2' }
			]
		},
		{
			title: '租金',
			value: '3',
			children: [
				{ title: '不限', value: '0' },
				{ title: '<=1000元', value: '1' },
				{ title: '1000-1500元', value: '2' },
				{ title: '1500-2000元', value: '3' },
				{ title: '2000-3000元', value: '4' },
				{ title: '5000-8000元', value: '5' },
				{ title: '>=8000元', value: '6' }
			]
		},
		{
			title: '筛选',
			value: '4',
			children: [
				{
					label: '户型',
					value: 'houseType',
					content: [
						{
							label: '一居',
							value: '一居'
						},
						{
							label: '两居',
							value: '两居'
						},
						{
							label: '三居',
							value: '三居'
						},
						{
							label: '四居+',
							value: '四居+'
						}
					]
				},
				{
					label: '朝向',
					value: 'orientation',
					content: [
						{
							label: '东',
							value: '东'
						},
						{
							label: '西',
							value: '西'
						},
						{
							label: '南',
							value: '南'
						},
						{
							label: '北',
							value: '北'
						},
						{
							label: '南北',
							value: '南北'
						}
					]
				},
				{
					label: '品牌',
					value: 'brand',
					content: [
						{
							label: '链家',
							value: '链家'
						},
						{
							label: '自如',
							value: '自如'
						}
					]
				},
				{
					label: '房屋亮点',
					value: 'housePoint',
					content: [
						{
							label: '近地铁',
							value: '近地铁'
						},
						{
							label: '拎包入住',
							value: '拎包入住'
						},
						{
							label: '精装修',
							value: '精装修'
						},
						{
							label: '押一付一',
							value: '押一付一'
						},
						{
							label: '新上',
							value: '新上'
						},
						{
							label: '认证公寓',
							value: '认证公寓'
						},
						{
							label: '随时看房',
							value: '随时看房'
						},
						{
							label: 'VR房源',
							value: 'VR房源'
						},
						{
							label: '业主自荐',
							value: '业主自荐'
						}
					]
				},
				{
					label: '租期',
					value: 'rentTerm',
					content: [
						{
							label: '月租',
							value: '月租'
						},
						{
							label: '年租',
							value: '年租'
						},
						{
							label: '一个月起租',
							value: '一个月起租'
						},
						{
							label: '1-3个月',
							value: '1-3个月'
						},
						{
							label: '4-6个月',
							value: '4-6个月'
						}
					]
				},
				{
					label: '楼层',
					value: 'floor',
					content: [
						{
							label: '低楼层',
							value: '低楼层'
						},
						{
							label: '中楼层',
							value: '中楼层'
						},
						{
							label: '高楼层',
							value: '高楼层'
						}
					]
				},
				{
					label: '电梯',
					value: 'elevator',
					content: [
						{
							label: '有电梯',
							value: '有电梯'
						},
						{
							label: '无电梯',
							value: '无电梯'
						}
					]
				}
			]
		},
		{
			title: '排序',
			value: '5',
			children: [
				{ title: '综合排序', value: '0' },
				{ title: '最新发布', value: '1' },
				{ title: '价格(从低到高)', value: '2' },
				{ title: '价格(从高到低)', value: '3' },
				{ title: '面积(从小到大)', value: '4' },
				{ title: '面积(从大到小)', value: '5' }
			]
		}
	]
	async function loadMore() {
		const append = await mockRequest()

		setList((val: any) => [...val, ...append])
		setHasMore(append.length > 0)
	}

	useEffect(() => {
		// console.log(props.location.query.tit)
	}, [])
	return (
		<Rentcontainer>
			{/* 头部盒子 */}
			<div>
				<HeaderNav {...props} tit="宏烨找房" />
			</div>
			<div className="rent_min">
				<div className="search">
					<Search
						placeholder="输入小区/商圈/地铁"
						style={{
							'--border-radius': '100px',
							'--background': '#f5f5f5'
						}}
						onSearch={(val) => {
							FilterSearch({ val }).then((res) => {
								dispatch(GET_RENT_LIST(res.data.arr))
							})
						}}
					/>
				</div>

				{/* 筛选组件 */}
				<FilterList filterPro={rentList} tit={props.location.state.tit} />
				<div className="list_box">
					{/* 租房 */}
					{list.map((item: any, i: any) => {
						return (
							<div
								className="zlist_item"
								onClick={() => {
									props.history.push('/basicLayouts/detail')

									localStorage.setItem('id', item.id)
									localStorage.setItem('item', JSON.stringify(item))

									localStorage.setItem('type', '租房')
								}}
								key={i}
							>
								<div className="houseImg">
									<img src={item.img} alt="" />
								</div>
								<div className="item_con">
									<div className="item_tit">{item.name}</div>
									<p className="item_other">
										{item.mianji}㎡|
										{item.ditie}|{item.quyu}
									</p>
									<div className="tag_box">
										<Tag
											style={{
												margin: '0.2em ',
												color: '#849aae',
												backgroundColor: 'rgba(237,240,243,.8)',
												border: 'none'
											}}
										>
											{item.ts}
										</Tag>
										<Tag
											style={{
												margin: '0.2em ',
												color: '#849aae',
												backgroundColor: 'rgba(237,240,243,.8)',
												border: 'none'
											}}
										>
											随时看房
										</Tag>
									</div>
									<p className="item_price">{item.jiage}/每月 </p>
								</div>
							</div>
						)
					})}
				</div>
				<InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
					<InfiniteScrollContent hasMore={hasMore} />
				</InfiniteScroll>
			</div>
		</Rentcontainer>
	)
}

export default Rent
