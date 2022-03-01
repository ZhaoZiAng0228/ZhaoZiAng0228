import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FilterList, List } from 'components'
import { Search, Tag } from 'antd-mobile'
import { Swipe, NavBar, Icon } from 'react-vant'
import { IMG1, IMG2, IMG3, barca, arsenal } from 'assets'
import { ForFilterSearch } from 'api'
import { useAppSelector } from 'hooks/hooks'
import { AppDispatch } from 'store/store'
import { useDispatch } from 'react-redux'
import { GET_LIST } from '../../store/second/secondSlice'
const Used = styled.div`
	.ua-header {
		width: 100%;
		height: 4.6rem;
		position: relative;
		.adm-search-input-box {
			position: absolute;
			top: 0.2rem;
			width: 90%;
			z-index: 99;
		}
	}
	.my-swipe .rv-swipe-item {
		color: #fff;
		font-size: 20px;
		line-height: 150px;
		text-align: center;
		background-color: #39a9ed;
	}
	.swiper-container,
	.swiper-container-initialized,
	.swiper-container-horizontal,
	.swiper-container-ios,
	.my-swipe,
	.rv-swipe {
		height: 4.6rem;
	}
	.swiper-wrapper {
		width: 100%;
		height: 100%;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.ua-rec {
		width: 100%;
		padding: 0.4rem;
		p {
			margin-bottom: 0.2rem;
		}
		div {
			img {
				width: 50%;
				padding: 0.1rem;
			}
		}
	}
`
export const UsedApartment: FC<any> = (props) => {
	const images = [IMG1, IMG2, IMG3]

	const dispatch = useDispatch<AppDispatch>()
	// 标题栏
	const filterPro = [
		{
			title: '区域',
			value: '1'
		},
		{
			title: '价格',
			value: '2',
			children: [
				{
					label: '价格区间(万)',
					value: 'priceBetween',
					content: [
						{
							label: '200万以下',
							value: '1'
						},
						{
							label: '200-300万',
							value: '2'
						},
						{
							label: '300-400万',
							value: '3'
						},
						{
							label: '400-500万',
							value: '4'
						},
						{
							label: '500-800万',
							value: '5'
						},
						{
							label: '800-1000万',
							value: '6'
						},
						{
							label: '1000万以上',
							value: '7'
						}
					]
				}
			]
		},
		{
			title: '房型',
			value: '3',
			children: [
				{
					label: '房型',
					value: 'houseType',
					content: [
						{
							label: '一室',
							value: '一室'
						},
						{
							label: '二室',
							value: '二室'
						},
						{
							label: '三室',
							value: '三室'
						},
						{
							label: '四室',
							value: '四室'
						},
						{
							label: '五室',
							value: '五室'
						},
						{
							label: '五室以上',
							value: '五室以上'
						}
					]
				}
			]
		},
		{
			title: '更多',
			value: '4',
			children: [
				{
					label: '建筑面积',
					value: 'coveredArea',
					content: [
						{
							label: '50㎡以下',
							value: '50㎡以下'
						},
						{
							label: '50-70㎡',
							value: '50-70㎡'
						},
						{
							label: '70-90㎡',
							value: '70-90㎡'
						},
						{
							label: '90-110㎡',
							value: '90-110㎡'
						},
						{
							label: '110-130㎡',
							value: '110-130㎡'
						},
						{
							label: '130-150㎡',
							value: '130-150㎡'
						},
						{
							label: '150㎡以上',
							value: '150㎡以上'
						}
					]
				},
				{
					label: '房源特色',
					value: 'housingFeature',
					content: [
						{
							label: '必看好房',
							value: '必看好房'
						},
						{
							label: '满五年',
							value: '满五年'
						},
						{
							label: '满两年',
							value: '满两年'
						},
						{
							label: 'VR房源',
							value: 'VR房源'
						},
						{
							label: '7日新上',
							value: '7日新上'
						},
						{
							label: '随时看房',
							value: '随时看房'
						}
					]
				},
				{
					label: '朝向',
					value: 'orientation',
					content: [
						{
							label: '南北',
							value: '南北'
						},
						{
							label: '朝南',
							value: '朝南'
						},
						{
							label: '朝东',
							value: '朝东'
						},
						{
							label: '朝北',
							value: '朝北'
						},
						{
							label: '朝西',
							value: '朝西'
						},
						{
							label: '随时看房',
							value: '随时看房'
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
					label: '楼龄',
					value: 'floorAge',
					content: [
						{
							label: '5年以内',
							value: '5年以内'
						},
						{
							label: '10年以内',
							value: '10年以内'
						},
						{
							label: '15年以内',
							value: '15年以内'
						},
						{
							label: '20年以内',
							value: '20年以内'
						},
						{
							label: '20年以上',
							value: '20年以上'
						}
					]
				},
				{
					label: '装修',
					value: 'decoration',
					content: [
						{
							label: '精装修',
							value: '精装修'
						},
						{
							label: '普通装修',
							value: '普通装修'
						},
						{
							label: '毛坯房',
							value: '毛坯房'
						}
					]
				},
				{
					label: '用途',
					value: 'use',
					content: [
						{
							label: '普通住宅',
							value: '普通住宅'
						},
						{
							label: '商业类',
							value: '商业类'
						},
						{
							label: '别墅',
							value: '别墅'
						},
						{
							label: '四合院',
							value: '四合院'
						},
						{
							label: '车位',
							value: '车位'
						},
						{
							label: '其他',
							value: '其他'
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
				},
				{
					label: '供暖',
					value: 'heating',
					content: [
						{
							label: '集体供暖',
							value: '集体供暖'
						},
						{
							label: '自供暖',
							value: '自供暖'
						}
					]
				},
				{
					label: '权属',
					value: 'ownership',
					content: [
						{
							label: '商品房',
							value: '商品房'
						},
						{
							label: '公房',
							value: '公房'
						},
						{
							label: '经适房',
							value: '经适房'
						},
						{
							label: '其他',
							value: '其他'
						}
					]
				},
				{
					label: '类型',
					value: 'type',
					content: [
						{
							label: '塔楼',
							value: '塔楼'
						},
						{
							label: '板楼',
							value: '板楼'
						},
						{
							label: '板塔结合',
							value: '板塔结合'
						}
					]
				}
			]
		},
		{
			title: '排序',
			value: '5',
			children: [
				{ title: '默认排序', value: '0' },
				{ title: '最新发布', value: '1' },
				{ title: '总价从低到高', value: '2' },
				{ title: '总价从高到低', value: '3' },
				{ title: '面积从小到大', value: '4' },
				{ title: '面积从大到小', value: '5' }
			]
		}
	]

	useEffect(() => {
		// console.log(props)
	}, [])
	return (
		<Used>
			{/* Nav */}
			<NavBar
				title="宏烨找房"
				leftArrow
				rightText={<Icon name="manager-o" size={24} />}
				onClickLeft={() => props.history.go(-1)}
				onClickRight={() => console.log(111)}
			/>
			{/* Search&Swiper */}
			<div className="ua-header">
				<Search
					placeholder="请输入小区或商圈名称"
					onChange={(e) => {
						console.log(e)
					}}
					onSearch={(val) => {
						ForFilterSearch({ val }).then((res) => {
							// dispatch(GET_RENT_LIST(res.data.arr))

							dispatch(GET_LIST(res.data.arr))
						})
					}}
				/>
				<Swipe className="my-swipe" autoplay={3000}>
					{images.map((item, idx) => {
						return (
							<Swipe.Item key={idx} className="ua-swiper-item">
								<img src={item} alt="" />
							</Swipe.Item>
						)
					})}
				</Swipe>
			</div>
			{/* Recommend */}
			<div className="ua-rec">
				<p>为您推荐</p>
				<div>
					<img src={arsenal} alt="" />
					<img src={barca} alt="" />
				</div>
			</div>
			{/* Filter */}
			<FilterList filterPro={filterPro} tit={props.location.state.tit} />

			{/* List */}
			<List props={props} />
			{/* Footer */}
		</Used>
	)
}

export default UsedApartment
