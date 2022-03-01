import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Tag } from 'antd-mobile'

import { AppDispatch } from 'store/store'
import { useDispatch } from 'react-redux'
import { InfiniteScroll, Loading } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { useAppSelector } from 'hooks/hooks'
import { toSecondList } from 'store/second/secondSlice'

const ListStyle = styled.div`
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
let count = 0
let pagesize = 5

export const List: React.FC<any> = ({ props }) => {
	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		dispatch(toSecondList())
		mockRequest()
		loadMore()
	}, [])

	const state = useAppSelector((state) => state)
	const [list, setList] = useState<any[]>([])

	let lists = state.secondSlice.list

	// console.log('lists==========', lists)

	async function mockRequest() {
		if (count >= lists.length / 5) {
			return []
		}
		await sleep(2000)
		count++
		const houselist = lists.slice((count - 1) * pagesize, count * pagesize)

		// console.log(lists)
		return houselist
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

	const [hasMore, setHasMore] = useState(true)
	async function loadMore() {
		const append = await mockRequest()
		console.log(append)

		setList((val: any) => [...val, ...append])
		setHasMore(append.length > 0)
	}

	// const houseList2 = [
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '550万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	},
	// 	{
	// 		img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
	// 		tit: '整租·成都北路140弄 1室1厅',
	// 		other: '64.00m²|南|链家',
	// 		unit: '485万'
	// 	}
	// ]
	return (
		<ListStyle>
			<div>
				<div className="list_box">
					{/* 租房 */}
					{
						list.length
							? list.map((item: any, i: any) => {
									return (
										<div
											className="zlist_item"
											onClick={() => {
												props.history.push({
													pathname: '/basicLayouts/detail'
													// state: { obj: { ...item } }
												})
												localStorage.setItem('id', item.id)
												localStorage.setItem('item', JSON.stringify(item))
												localStorage.setItem('type', '二手房')
												// console.log(props)
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
												<p className="item_price">{item.jiage} 万</p>
											</div>
										</div>
									)
							  })
							: ''
						// houseList2.map((item: any, i: any) => {
						// 		return (
						// 			<div
						// 				className="zlist_item"
						// 				onClick={() => {
						// 					props.history.push('/basicLayouts/detail')
						// 				}}
						// 				key={i}
						// 			>
						// 				<div className="houseImg">
						// 					<img src={item.img} alt="" />
						// 				</div>
						// 				<div className="item_con">
						// 					<div className="item_tit">{item.tit}</div>
						// 					<p className="item_other">{item.other}</p>
						// 					<div className="tag_box">
						// 						<Tag
						// 							style={{
						// 								margin: '0.2em ',
						// 								color: '#849aae',
						// 								backgroundColor: 'rgba(237,240,243,.8)',
						// 								border: 'none'
						// 							}}
						// 						>
						// 							精装
						// 						</Tag>
						// 						<Tag
						// 							style={{
						// 								margin: '0.2em ',
						// 								color: '#849aae',
						// 								backgroundColor: 'rgba(237,240,243,.8)',
						// 								border: 'none'
						// 							}}
						// 						>
						// 							随时看房
						// 						</Tag>
						// 					</div>
						// 					<p className="item_price">{item.unit} </p>
						// 				</div>
						// 			</div>
						// 		)
						//   })
					}
				</div>
				<InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
					<InfiniteScrollContent hasMore={hasMore} />
				</InfiniteScroll>
			</div>
		</ListStyle>
	)
}

export default List
