import React, { useState, memo, useEffect } from 'react'
import styled from 'styled-components'
import { Dropdown, TreeSelect, Form, Input, Dialog, Button } from 'antd-mobile'
import { ChoiceCard } from 'components'
import {
	FindOne,
	FindRentOne,
	FindRentFs,
	FindRentPrice,
	FindRentSort
} from 'api'
import { GET_LIST } from 'store/second/secondSlice'
import { GET_RENT_LIST } from 'store/rent/rentSlice'

import { AppDispatch } from 'store/store'
import { useDispatch } from 'react-redux'
import { join } from 'lodash'

const FilterStyle = styled.div`
	position: sticky;
	top: 0;
	/* .area-pick {
		width: 100%;
		display: flex;
	} */
	/* .my-selector {
		--checked-color: #ffe2e5;
	} */
`

export const FilterList: React.FC<any> = (props) => {
	const { filterPro, tit } = props
	const [index, setIndex] = useState(-1)
	const [choiceValue, setChoiceValue] = useState(['key1', '0'])
	const [choiceList, setChoiceList] = useState([])
	const [type, setType] = useState<any>({
		bet: '>=8000元'
	})
	const dispatch = useDispatch<AppDispatch>()
	const onFinish = (values: any) => {
		// const res = JSON.stringify(values)
		// console.log(JSON.parse(res))
		// Dialog.alert({
		// 	content: JSON.stringify(values)
		// })

		console.log(type)

		if (type.type === '租金') {
			FindRentPrice({ ...JSON.parse(JSON.stringify(values)), ...type }).then(
				(res) => {
					console.log(res)
					dispatch(GET_RENT_LIST(res.data.arr))
				}
			)
		}
	}
	useEffect(() => {
		console.log(choiceList)

		if (props.tit === '租房') {
			if (choiceList.length === 2) {
				FindRentOne({ first: choiceList[1], san: choiceList[0] }).then(
					(res) => {
						if (res.data.code === 1) {
							dispatch(GET_RENT_LIST(res.data.arr))
						}
					}
				)
			}
			if (choiceList.length >= 3) {
				FindRentOne({
					first: choiceList[choiceList.length - 2],
					er: choiceList[choiceList.length - 1],
					san: choiceList[choiceList.length - 3]
				}).then((res) => {
					if (res.data.code === 1) {
						dispatch(GET_RENT_LIST(res.data.arr))
					}
				})
			}
		} else {
			if (choiceList.length === 2) {
				FindOne({ first: choiceList[1], san: choiceList[0] }).then((res) => {
					if (res.data.code === 1) {
						dispatch(GET_LIST(res.data.arr))
					}
				})
			}
			if (choiceList.length >= 3) {
				FindOne({
					first: choiceList[choiceList.length - 2],
					er: choiceList[choiceList.length - 1],
					san: choiceList[choiceList.length - 3]
				}).then((res) => {
					if (res.data.code === 1) {
						dispatch(GET_LIST(res.data.arr))
					}
				})
			}
		}
	}, [choiceList])

	// 区域地铁线
	const tabs = [
		{
			label: '区域',
			value: 'key1',
			children: [
				{
					label: '不限',
					value: '0'
				},
				{
					label: '浦东',
					value: '1',
					children: [
						{
							label: '不限',
							value: '1-0'
						},
						{
							label: '北蔡',
							value: '1-1'
						},
						{
							label: '碧云',
							value: '1-2'
						},
						{
							label: '曹路',
							value: '1-3'
						}
					]
				},
				{
					label: '闵行',
					value: '2',
					children: [
						{
							label: '不限',
							value: '2-0'
						},
						{
							label: '春申',
							value: '2-1'
						},
						{
							label: '古美',
							value: '2-2'
						},
						{
							label: '航华',
							value: '2-3'
						}
					]
				},
				{
					label: '宝山',
					value: '3',
					children: [
						{
							label: '不限',
							value: '3-0'
						},
						{
							label: '大场镇',
							value: '3-1'
						},
						{
							label: '大华',
							value: '3-2'
						},
						{
							label: '高境',
							value: '3-3'
						}
					]
				},
				{
					label: '徐汇',
					value: '4',
					children: [
						{
							label: '不限',
							value: '4-0'
						},
						{
							label: '漕河泾',
							value: '4-1'
						},
						{
							label: '长桥',
							value: '4-2'
						},
						{
							label: '衡山路',
							value: '4-3'
						}
					]
				},
				{
					label: '普陀',
					value: '5',
					children: [
						{
							label: '不限',
							value: '5-0'
						},
						{
							label: '曹杨',
							value: '5-1'
						},
						{
							label: '长风',
							value: '5-2'
						},
						{
							label: '长寿路',
							value: '5-3'
						}
					]
				},
				{
					label: '杨浦',
					value: '6',
					children: [
						{
							label: '不限',
							value: '6-0'
						},
						{
							label: '鞍山',
							value: '6-1'
						},
						{
							label: '东外滩',
							value: '6-2'
						},
						{
							label: '黄兴公园',
							value: '6-3'
						}
					]
				},
				{
					label: '长宁',
					value: '7',
					children: [
						{
							label: '不限',
							value: '7-0'
						},
						{
							label: '北新泾',
							value: '7-1'
						},
						{
							label: '古北',
							value: '7-2'
						},
						{
							label: '虹桥',
							value: '7-3'
						}
					]
				},
				{
					label: '松江',
					value: '8',
					children: [
						{
							label: '不限',
							value: '8-0'
						},
						{
							label: '车墩',
							value: '8-1'
						},
						{
							label: '洞泾',
							value: '8-2'
						},
						{
							label: '九亭',
							value: '8-3'
						}
					]
				},
				{
					label: '嘉定',
					value: '9',
					children: [
						{
							label: '不限',
							value: '9-0'
						},
						{
							label: '安亭',
							value: '9-1'
						},
						{
							label: '丰庄',
							value: '9-2'
						},
						{
							label: '华亭',
							value: '9-3'
						}
					]
				},
				{
					label: '黄浦',
					value: '10',
					children: [
						{
							label: '不限',
							value: '10-0'
						},
						{
							label: '安亭',
							value: '10-1'
						},
						{
							label: '丰庄',
							value: '10-2'
						},
						{
							label: '华亭',
							value: '10-3'
						}
					]
				},
				{
					label: '静安',
					value: '11',
					children: [
						{
							label: '不限',
							value: '11-0'
						},
						{
							label: '安亭',
							value: '11-1'
						},
						{
							label: '丰庄',
							value: '11-2'
						},
						{
							label: '华亭',
							value: '11-3'
						}
					]
				},
				{
					label: '虹口',
					value: '12',
					children: [
						{
							label: '不限',
							value: '12-0'
						},
						{
							label: '安亭',
							value: '12-1'
						},
						{
							label: '丰庄',
							value: '12-2'
						},
						{
							label: '华亭',
							value: '12-3'
						}
					]
				},
				{
					label: '青浦',
					value: '13',
					children: [
						{
							label: '不限',
							value: '13-0'
						},
						{
							label: '安亭',
							value: '13-1'
						},
						{
							label: '丰庄',
							value: '13-2'
						},
						{
							label: '华亭',
							value: '13-3'
						}
					]
				},
				{
					label: '奉贤',
					value: '14',
					children: [
						{
							label: '不限',
							value: '14-0'
						},
						{
							label: '安亭',
							value: '14-1'
						},
						{
							label: '丰庄',
							value: '14-2'
						},
						{
							label: '华亭',
							value: '14-3'
						}
					]
				},
				{
					label: '金山',
					value: '15',
					children: [
						{
							label: '不限',
							value: '15-0'
						},
						{
							label: '安亭',
							value: '15-1'
						},
						{
							label: '丰庄',
							value: '15-2'
						},
						{
							label: '华亭',
							value: '15-3'
						}
					]
				},
				{
					label: '崇明',
					value: '16',
					children: [
						{
							label: '不限',
							value: '16-0'
						},
						{
							label: '安亭',
							value: '16-1'
						},
						{
							label: '丰庄',
							value: '16-2'
						},
						{
							label: '华亭',
							value: '16-3'
						}
					]
				},
				{
					label: '上海周边',
					value: '17',
					children: [
						{
							label: '不限',
							value: '17-0'
						},
						{
							label: '常熟市',
							value: '17-1'
						},
						{
							label: '海门',
							value: '17-2'
						},
						{
							label: '苏州',
							value: '17-3'
						}
					]
				}
			]
		},
		{
			label: '地铁',
			value: 'key2',
			children: [
				{
					label: '不限',
					value: 'key2-0'
				},
				{
					label: '5号线',
					value: 'key2-1',
					children: [
						{
							label: '不限',
							value: 'key2-1-0'
						},
						{
							label: '莘庄站',
							value: '莘庄站'
						},
						{
							label: '春申路站',
							value: '春申路站'
						},
						{
							label: '银都路站',
							value: '银都路站'
						}
					]
				},
				{
					label: '5号线支线',
					value: 'key2-2',
					children: [
						{
							label: '不限',
							value: 'key2-2-0'
						},
						{
							label: '东川路站',
							value: '东川路站'
						},
						{
							label: '金平路站',
							value: '金平路站'
						},
						{
							label: '华宁路站',
							value: '华宁路站'
						}
					]
				},
				{
					label: '6号线',
					value: 'key2-3',
					children: [
						{
							label: '不限',
							value: 'key2-3-0'
						},
						{
							label: '东方体育中心站',
							value: '东方体育中心站'
						},
						{
							label: '灵岩南路站',
							value: '灵岩南路站'
						},
						{
							label: '上南路站',
							value: '上南路站'
						}
					]
				},
				{
					label: '7号线',
					value: 'key2-4',
					children: [
						{
							label: '不限',
							value: 'key2-4-0'
						},
						{
							label: '美兰湖站',
							value: '美兰湖站'
						},
						{
							label: '罗南新村站',
							value: '罗南新村站'
						},
						{
							label: '潘广路站',
							value: '潘广路站'
						}
					]
				},
				{
					label: '8号线',
					value: 'key2-5',
					children: [
						{
							label: '不限',
							value: 'key2-5-0'
						},
						{
							label: '市光路站',
							value: '市光路站'
						},
						{
							label: '嫩江路站',
							value: '嫩江路站'
						},
						{
							label: '翔殷路站',
							value: '翔殷路站'
						}
					]
				},
				{
					label: '9号线',
					value: 'key2-6',
					children: [
						{
							label: '不限',
							value: 'key2-6-0'
						},
						{
							label: '金海路站',
							value: '金海路站'
						},
						{
							label: '曹路站',
							value: '曹路站'
						},
						{
							label: '民雷路站',
							value: '民雷路站'
						}
					]
				},
				{
					label: '11号线(花桥-三林)',
					value: 'key2-7',
					children: [
						{
							label: '不限',
							value: 'key2-7-0'
						},
						{
							label: '迪士尼站',
							value: '迪士尼站'
						},
						{
							label: '康新公路站',
							value: '康新公路站'
						},
						{
							label: '秀沿路站',
							value: '秀沿路站'
						}
					]
				},
				{
					label: '12号线',
					value: 'key2-8',
					children: [
						{
							label: '不限',
							value: 'key2-8-0'
						},
						{
							label: '七莘路站',
							value: '七莘路站'
						},
						{
							label: '虹莘路站',
							value: '虹莘路站'
						},
						{
							label: '顾戴路站',
							value: '顾戴路站'
						}
					]
				},
				{
					label: '13号线',
					value: 'key2-9',
					children: [
						{
							label: '不限',
							value: 'key2-9-0'
						},
						{
							label: '金运路站',
							value: '金运路站'
						},
						{
							label: '金沙江西路站',
							value: '金沙江西路站'
						},
						{
							label: '丰庄站',
							value: '丰庄站'
						}
					]
				},
				{
					label: '16号线',
					value: 'key2-10',
					children: [
						{
							label: '不限',
							value: 'key2-10-0'
						},
						{
							label: '龙阳路站',
							value: '龙阳路站'
						},
						{
							label: '华夏中路站',
							value: '华夏中路站'
						},
						{
							label: '罗山路站',
							value: '罗山路站'
						}
					]
				},
				{
					label: '17号线',
					value: 'key2-11',
					children: [
						{
							label: '不限',
							value: 'key2-11-0'
						},
						{
							label: '虹桥火车站站',
							value: '虹桥火车站站'
						},
						{
							label: '诸光路站',
							value: '诸光路站'
						},
						{
							label: '蟠龙路站',
							value: '蟠龙路站'
						}
					]
				},
				{
					label: '浦江线',
					value: 'key2-12',
					children: [
						{
							label: '不限',
							value: 'key2-12-0'
						},
						{
							label: '汇臻路站',
							value: '汇臻路站'
						},
						{
							label: '东城一路站',
							value: '东城一路站'
						},
						{
							label: '浦航路站',
							value: '浦航路站'
						}
					]
				},
				{
					label: '金山铁路',
					value: 'key2-13',
					children: [
						{
							label: '不限',
							value: 'key2-13-0'
						},
						{
							label: '金山卫站站',
							value: '金山卫站站'
						}
					]
				},
				{
					label: '磁悬浮',
					value: 'key2-14',
					children: [
						{
							label: '不限',
							value: 'key2-14-0'
						},
						{
							label: '龙阳路站',
							value: '龙阳路站'
						},
						{
							label: '浦东国际机场站',
							value: '浦东国际机场站'
						}
					]
				},
				{
					label: '10号线(基隆路-虹桥火车站)',
					value: 'key2-15',
					children: [
						{
							label: '不限',
							value: 'key2-15-0'
						},
						{
							label: '龙阳路站',
							value: '龙阳路站'
						},
						{
							label: '浦东国际机场站',
							value: '浦东国际机场站'
						}
					]
				},
				{
					label: '15号线',
					value: 'key2-16',
					children: [
						{
							label: '不限',
							value: 'key2-16-0'
						},
						{
							label: '汇臻路站',
							value: '汇臻路站'
						},
						{
							label: '东城一路站',
							value: '东城一路站'
						},
						{
							label: '浦航路站',
							value: '浦航路站'
						}
					]
				},
				{
					label: '1B号线',
					value: 'key2-17',
					children: [
						{
							label: '不限',
							value: 'key2-17-0'
						},
						{
							label: '汇臻路站',
							value: '汇臻路站'
						},
						{
							label: '东城一路站',
							value: '东城一路站'
						},
						{
							label: '浦航路站',
							value: '浦航路站'
						}
					]
				},
				{
					label: '1号线',
					value: 'key2-18',
					children: [
						{
							label: '不限',
							value: 'key2-18-0'
						},
						{
							label: '汇臻路站',
							value: '汇臻路站'
						},
						{
							label: '东城一路站',
							value: '东城一路站'
						},
						{
							label: '浦航路站',
							value: '浦航路站'
						}
					]
				},
				{
					label: '2号线',
					value: 'key2-19',
					children: [
						{
							label: '不限',
							value: 'key2-19-0'
						},
						{
							label: '汇臻路站',
							value: '汇臻路站'
						},
						{
							label: '东城一路站',
							value: '东城一路站'
						},
						{
							label: '浦航路站',
							value: '浦航路站'
						}
					]
				},
				{
					label: '3号线',
					value: 'key2-20',
					children: [
						{
							label: '不限',
							value: 'key2-20-0'
						},
						{
							label: '汇臻路站',
							value: '汇臻路站'
						},
						{
							label: '东城一路站',
							value: '东城一路站'
						},
						{
							label: '浦航路站',
							value: '浦航路站'
						}
					]
				},
				{
					label: '4号线',
					value: 'key2-21',
					children: [
						{
							label: '不限',
							value: 'key2-21-0'
						},
						{
							label: '汇臻路站',
							value: '汇臻路站'
						},
						{
							label: '东城一路站',
							value: '东城一路站'
						},
						{
							label: '浦航路站',
							value: '浦航路站'
						}
					]
				}
			]
		}
	]

	return (
		<FilterStyle>
			<Dropdown
				onChange={(e) => {
					console.log(e)
					if (e) {
						// drop = document.querySelector('.ua-rec')?.nextElementSibling
						// document.documentElement.scrollTop = drop?.offsetTop
						document.documentElement.scrollTop = 440
						// console.log(drop?.offsetTop)
					}
				}}
			>
				{filterPro?.length
					? filterPro.map((item: any) => {
							return (
								<Dropdown.Item key={item.value} title={item.title}>
									{item.value === '1' && (
										<div className="area-pick">
											<div style={{ height: '180px' }} className="right">
												<TreeSelect
													value={choiceValue}
													defaultValue={['key1', '0']}
													options={tabs}
													onChange={(value, nodes) => {
														setChoiceValue((prev: any) => {
															// console.log(prev, value)
															prev = value
															return JSON.parse(JSON.stringify(prev))
														})
														if (nodes.length === 3) {
															setChoiceList((prev: any) => {
																console.log('value====', nodes)
																prev.push(nodes[0].label)
																prev.push(nodes[1].label)
																prev.push(nodes[2]?.label)
																// prev.push()
																// prev = prev.slice(2)
																return JSON.parse(JSON.stringify(prev))
															})
														}
														console.log(value, nodes)
													}}
												/>
											</div>
										</div>
									)}
									{item.title === '价格' ||
									item.title === '房型' ||
									item.title === '更多' ||
									item.title === '筛选' ? (
										<ChoiceCard topic={item.title} children={item.children} />
									) : (
										''
									)}

									{item.title === '租金' ? (
										<div className="rent-money">
											<Form
												onFinish={onFinish}
												footer={
													<div className="rent-put">
														<div className="rent-left">
															<Form.Item name="bottomPrice">
																<Input placeholder="最小" type="number" />
															</Form.Item>
															<p>---</p>
															<Form.Item name="peakPrice">
																<Input placeholder="最大" type="number" />
															</Form.Item>
														</div>
														<Button block type="submit" color="primary">
															确定
														</Button>
													</div>
												}
											>
												{item.children.map((v: any, i: any) => {
													return (
														<div className="sort-pick" key={i}>
															<p
																onClick={() => {
																	setIndex(i)
																	console.log(v.title, item.title)
																	setType({
																		bet: v.title,
																		type: item.title
																	})
																}}
																className={i === index ? 'active' : ''}
															>
																{v.title}
															</p>
														</div>
													)
												})}
											</Form>
										</div>
									) : (
										''
									)}

									{item.title === '排序' || item.title === '方式'
										? item.children.map((v: any, i: any) => {
												return (
													<div className="sort-pick" key={i}>
														<p
															onClick={() => {
																setIndex(i)
																console.log(
																	item.title,
																	'=============++++++++++'
																)

																if (item.title === '方式') {
																	FindRentFs({ zf: v.title }).then((res) => {
																		if (res.data.code === 1) {
																			dispatch(GET_RENT_LIST(res.data.arr))
																		}
																	})
																}
																if (item.title === '排序') {
																	console.log(v.title)
																	FindRentSort({
																		type: v.title,
																		pay: tit
																	}).then((res) => {
																		// console.log(res)
																		if (res.data.code === 1) {
																			dispatch(GET_RENT_LIST(res.data.arr))
																		} else {
																			dispatch(GET_LIST(res.data.arr))
																		}
																	})
																}
															}}
															className={i === index ? 'active' : ''}
														>
															{v.title}
														</p>
													</div>
												)
										  })
										: ''}
								</Dropdown.Item>
							)
					  })
					: ''}
			</Dropdown>
		</FilterStyle>
	)
}

export default memo(FilterList)
