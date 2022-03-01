/*
 * @Author: your name
 * @Date: 2021-10-13 16:34:50
 * @LastEditTime: 2021-10-14 20:25:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \house\src\pages\renting\index.tsx
 */
import { FC, useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { createFromIconfontCN } from '@ant-design/icons'
import { Search, Tag, Button, Toast } from 'antd-mobile'
import { head_bg, fang } from 'assets/index'
import { HeaderNav } from 'components/HeaderNav'
import { Swiper } from 'components/Swiper'
import { FindOne, ForDetail, ForRentDetail, Zhifubao } from 'api'

import axios from 'axios'
import { classMethod } from '@babel/types'
import { removeAllListeners } from 'process'
import { Swipe, NavBar, Icon } from 'react-vant'
const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_dpf4zhjrkyl.js'
})

const Detailcontainer = styled.div`
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
	.detail_header {
		//房源名称
		.item_headr {
			display: flex;
			padding: 0.3rem 0.4rem;
			align-items: center;
			justify-content: space-between;
			.icon {
				display: flex;
				width: 1rem;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				span {
					font-size: 0.4rem;
				}
				.tit {
					font-size: 0.26rem;
				}
			}
		}
		/* 房源信息 */
		.header_info {
			padding: 0 0.4rem;
			ul {
				display: flex;
				justify-content: space-between;
				li {
					display: flex;
					flex-direction: column;
					padding-right: 0.8rem;
					span:nth-child(1) {
						font-size: 0.24rem;
						color: #ccc;
					}
					span:nth-child(2) {
						font-size: 0.32rem;
						color: red;
						font-weight: bold;
						margin-top: 0.2rem;
					}
				}
			}
		}
		//房源标签
		.tag_box {
			margin-top: 0.3rem;
		}
		/* 房源详细列表信息 */
		.house_info_list {
			padding: 0 0.4rem;
			ul {
				display: flex;
				flex-wrap: wrap;
				padding-top: 0.3rem;
				li {
					width: 50%;
					font-size: 0.32rem;
					padding: 0.1rem 0;
					span:nth-child(1) {
						color: #ccc;
						margin-right: 0.2rem;
					}
				}
			}
		}
		//看房
		.rent {
			padding: 0 0.4rem;
			p {
				padding: 0.1rem 0;
				span {
					font-size: 0.32rem;
					color: #ccc;
					margin-right: 0.2rem;
				}
				label {
					font-size: 0.32rem;
				}
			}
		}
		//真房源盒子
		.real {
			margin: 0.4rem 0;
			width: 100%;
			height: 2.4rem;
			background: url(${fang}) 100% 100% no-repeat;
			background-size: cover;
			h1 {
				padding: 1rem;
			}
		}
		/* 位置及周边 */
		.detail_map {
			> h2 {
				font-weight: bold;
				padding-left: 0.4rem;
			}
			/* 地图线路 */
			.map {
				margin-top: 0.2rem;
				height: 4.6rem;
				background: #ccf;
				border-bottom: 1px solid #ccc;
			}
			/* 位置 */
			.map_list {
				padding: 0.2rem 0.4rem;
				margin: 0.2rem 0;
				border-top: 1px solid #e5e5e5;
				border-bottom: 1px solid #e5e5e5;
				p {
					margin-top: 0.4rem;
					font-size: 0.26rem;
					i {
						font-size: 0.16rem;
						border: 1px solid #101d37;
						border-radius: 0.08rem;
						display: inline-block;
						padding: 0.02rem 0.04rem 0.02rem 0.04rem;
						margin-left: 0.1rem;
					}
					label {
						float: right;
					}
				}
			}

			.amap-marker {
				width: 0.1rem;
				height: 0.1rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		/* 费用 */
		.cost {
			padding: 0 0.4rem;
			h2 {
				font-weight: bold;
				b {
					float: right;
					font-size: 0.24rem;
					font-weight: normal;
					color: blue;
				}
			}
			> p {
				margin: 0.2rem 0;
				font-size: 0.26rem;
				span {
					color: #9399a5;
					margin-left: 0.1rem;
				}
			}
		}
		//费用详细
		.cost_item {
			display: flex;
			padding: 0 0.4rem;
			div {
				width: 20%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 0.3rem;
			}
			span:nth-child(2) {
				font-size: 0.2rem;
				color: #9399a5;
				display: inline-block;
				height: 0.12rem;
				margin-top: 0.1rem;
			}
			span:nth-child(3) {
				margin-top: 0.4rem;
			}
			.active {
				color: red;
			}
		}
		//经纪人
		.agent_card {
			padding: 0 0.4rem;
			h2 {
				font-weight: bold;
				margin: 0.5rem 0;
			}
			//经纪人盒子
			.card {
				display: flex;
				justify-content: space-between;
				.agent {
					flex: 1;
					margin-left: 0.3rem;
					p:nth-child(1) {
						span {
							font-size: 0.3rem;
						}
						i {
							font-style: normal;
							color: #9398a5;
							margin-left: 0.2rem;
							margin-right: 0.2rem;
							background: #eff0f2;
							padding: 0.05rem;
						}
					}
					p:nth-child(2) {
						margin: 0.2rem 0;
						color: #000;
					}
					p:nth-child(3) {
						color: #9398a5;
					}
				}
			}
			.icon {
				span {
					font-size: 0.4rem;
					color: #3072f6;
					padding: 0.2rem;
					background-color: rgba(48, 114, 246, 0.1);
					margin-right: 0.2rem;
					border-radius: 50%;
				}
			}
		}
		.placeholder {
			height: 1.5rem;
			margin-top: 0.5rem;
		}
		.fixed_footer {
			border-top: 1px solid #e5e5e5;
			width: 100%;
			height: 1.5rem;
			background: #fff;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.btn1 {
				.adm-button {
					color: #fff;
					padding: 0.28rem 0.6rem;
					background: linear-gradient(90deg, #49d7b3, #29b09c);
				}
			}
			.btn2 {
				.adm-button {
					color: #fff;
					padding: 0.28rem 0.6rem;
					background: linear-gradient(90deg, #6898f8, #2c68e0);
				}
			}
		}
	}
`

let a: any = null
export const Detail: FC<any> = (props) => {
	//轮播图
	const data = [
		{
			img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
			tit: '厨房'
		},
		{
			img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
			tit: '客厅'
		},
		{
			img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
			tit: '卧室'
		},
		{
			img: 'https://img1.baidu.com/it/u=2659514589,2672458380&fm=26&fmt=auto',
			tit: '卫生间'
		}
	]
	// 房源顶部信息
	const DetailInfo = {
		tit: '整租·南宜花苑 2室1厅 南',
		price: '8500元/月',
		other: '2室1厅1卫',
		area: '66.0m²',
		tag: ['新上', '近地铁', '精装', '随时看房']
	}
	// 房源详细
	const houseInfo = {
		area: '66.0m²',
		cx: '南',
		wh: '1天前',
		rz: '随时入住',
		lc: '高楼层/6层',
		dt: '无',
		cw: '暂无数据',
		ys: '民水',
		yd: '民电',
		rq: '有',
		cn: '自采暖',
		zq: '1年以内',
		kf: '需提前预约',
		xq: '南宜花苑',
		fx: '用户风险提示'
	}
	//经济人
	const agent = {
		img: 'https://img2.baidu.com/it/u=3116853475,342592865&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
		broker: '刘诗诗',
		type: '宏烨找房',
		grade: '评分:5.0 | 1次评价', //评分
		leave: '响应快速，擅长把握用户需求' //留言
	}
	const [obj, setObj] = useState<any>(null)

	const [value, setValue] = useState('')
	//关注
	const [isLike, setLike] = useState(false)
	const [istrue, setTrue] = useState(true)
	// let map = new AMap.Map('container')
	// 经度纬度

	const [addressdatalist, setaddressdatalist]: any = useState([
		121.598867, 31.258087
	])

	// 经度纬度
	let n1: any
	let n2: any
	const [AddRessDataList, setAddRessDataList]: any = useState([1111, 1111])

	// 获取详情页数据
	const getDetail = async () => {
		console.log(JSON.parse(localStorage.getItem('item') || ''))

		let ii = JSON.parse(localStorage.getItem('item') || '')

		setObj({ ...ii })

		let resq: any = await axios.get(
			`https://restapi.amap.com/v5/place/text?key=2dec3d55509bc53c93825a5fad45b70c&region=上海&keywords=${ii.xq}`
		)

		setAddRessDataList(resq.data.pois)
	}

	// 获取到经度纬度
	let a = AddRessDataList[0]?.location
	// console.log(AddRessDataList[0]?.location)
	// 判断是否存在  第一个地址
	if (a) {
		n1 = a.slice(0, a.indexOf(',')) * 1

		n2 = a.slice(a.indexOf(',') + 1) * 1
	}

	// 字符串转数组
	const b = (c: any) => {
		let b1 = c.slice(0, c.indexOf(',')) * 1

		let b2 = c.slice(c.indexOf(',') + 1) * 1

		return [b1, b2]
	}

	let map: any = null

	const Address = () => {
		// 引入地图
		map = new AMap.Map('container', {
			zoom: 19, //级别
			center: [n1, n2], //中心点坐标
			viewMode: '3D' //使用3D视图
		})

		let icon = new AMap.Icon({
			size: new AMap.Size(30, 30), // 图标尺寸
			image:
				'//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png' // Icon的图像
			// imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
			// imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
		})

		// 给每个地址绑定定位icon
		AddRessDataList.forEach((item: any) => {
			let marker = new AMap.Marker({
				icon: icon,
				// position: new AMap.LngLat(116.481181, 39.989792)
				// position: [item.location[0] * 1, item.location[1] * 1]
				position: b(item.location)
				// 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
				// offset: new AMap.Pixel(-13, -50),
			})

			marker.setLabel({
				// offset: new AMap.Pixel(0, 0), //设置文本标注偏移量
				content: `<div class='info'>${item.name}</div>`, //设置文本标注内容
				direction: 'top' //设置文本标注方位
			})

			marker.setMap(map)

			let showInfoM = (e: any) => {
				console.log(e)

				console.log(`${e.lnglat.lat},${e.lnglat.lng}`)
				console.log(e.target._position)

				console.log(props)

				props.history.push({
					pathname: '/blankLayouts/detailcity',
					state: { address: [e.lnglat.lng, e.lnglat.lat] }
				})
			}
			// 监听点击事件
			marker.on('click', showInfoM)
		})

		// marker.setTitle('我是marker的title')

		// 设置label标签
		// label默认蓝框白底左上角显示，样式className为：amap-marker-label

		// map.add(marker)
	}
	//   如果a变化代表有新的地址注入重新获取
	const aaa = () => {
		// 因为异步的原因
		// 判断是否存在
		if (a) {
			Address()
		}
	}

	let isUnmounted: Boolean = false
	useEffect(() => {
		// 地图

		if (!isUnmounted) {
			aaa()
		}
	}, [a])

	useEffect(() => {
		// 详情页数据

		isUnmounted = false

		if (!isUnmounted) {
			getDetail()
		}

		return () => {
			isUnmounted = true
		}
	}, [])

	return (
		<Detailcontainer>
			{/* 头部盒子 */}
			{/* <HeaderNav {...props} tit="宏烨找房" /> */}

			<NavBar
				title="宏烨找房"
				leftArrow
				rightText={<Icon name="manager-o" size={24} />}
				onClickLeft={() => {
					props.history.go(-1)
					map = null
				}}
				onClickRight={() => console.log(111)}
			/>
			<div className="rent_min">
				{/* 房源轮播 */}
				<div className="swiper">
					<Swiper data={data} />
				</div>
			</div>
			<div className="detail_header">
				{/* 房源名称 */}
				<div className="item_headr">
					<h2>
						{obj?.name} {obj?.xq}
					</h2>
					<span className="icon">
						{!isLike ? (
							<IconFont
								type="icon-xin"
								onClick={() => {
									setLike(!isLike)
								}}
							/>
						) : (
							<IconFont
								type="icon-xin1"
								onClick={() => {
									setLike(!isLike)
								}}
							/>
						)}
						<span className="tit"> {!isLike ? '关注' : '已关注'}</span>
					</span>
				</div>
				{/* 房源房型信息 */}
				<div className="header_info">
					<ul>
						<li>
							<span>价格</span>
							<span>{obj?.jiage}</span>
						</li>
						<li>
							<span>户型</span>
							<span>{obj?.fangxing}</span>
						</li>
						<li>
							<span>面积</span>
							<span>{obj?.mianji}㎡</span>
						</li>
					</ul>
					{/* 标签 */}
					<div className="tag_box">
						{DetailInfo.tag.map((item) => {
							return (
								<Tag
									key={item}
									style={{
										margin: ' 0.1rem',
										color: '#5680a6',
										backgroundColor: '#e6ecf2',
										border: 'none'
									}}
								>
									{item}
								</Tag>
							)
						})}
					</div>
				</div>
				{/* 房源详细信息列表 */}
				<div className="house_info_list">
					<ul>
						<li>
							<span>面积:</span>
							<span>{obj?.mianji}㎡</span>
						</li>
						<li>
							<span>朝向:</span>
							<span>{obj?.cx}</span>
						</li>
						<li>
							<span>维护:</span>
							<span>一天前</span>
						</li>
						<li>
							<span>入住:</span>
							<span>随时入驻</span>
						</li>
						<li>
							<span>楼层:</span>
							<span>{obj?.ll}层</span>
						</li>
						<li>
							<span>电梯:</span>
							<span>{obj?.dt}</span>
						</li>
						<li>
							<span>车位:</span>
							<span>暂无车位</span>
						</li>
						<li>
							<span>用水:</span>
							<span>民水</span>
						</li>
						<li>
							<span>用电:</span>
							<span>民电</span>
						</li>
						<li>
							<span>燃气:</span>
							<span>{houseInfo.rq}</span>
						</li>
						<li>
							<span>采暖:</span>
							<span>{houseInfo.cn}</span>
						</li>
					</ul>
				</div>
				{/* 房源 */}
				<div className="rent">
					<p>
						<span>看房:</span>
						<label>{houseInfo.kf}</label>
						<b></b>
					</p>
					<p>
						<span>小区:</span>
						<label>{obj?.xq}</label>
					</p>
					<p>
						<span>风险提示:</span>
						<label>{houseInfo.fx}</label>
					</p>
					<p>
						<span>宏烨找房官方投诉电话:</span>
						<label>10106188</label>
					</p>
				</div>
				{/* 真房源盒子 */}
				<div className="real">
					<h1>真房源保障</h1>
				</div>
				{/* 位置及周边 */}
				<div className="detail_map">
					<h2>位置及周边</h2>
					{/* 地图显示 */}
					<div className="map">
						<div id="container" style={{ width: '100%', height: '100%' }}></div>
					</div>
					{/* 周边线路 */}
					<div className="map_list">
						<p>
							<span>金京路</span>
							<i>12号线</i>
							<label>420米</label>
						</p>
						<p>
							<span>杨北高路</span>
							<i>12号线</i>
							<label>1101米</label>
						</p>
					</div>
					{/* 费用详情 */}
					{/* <div className="cost">
						<h2>
							费用详情 <b>资讯更多费用明细</b>
						</h2>
						<p>
							年租价<span>(当租期不足1年时租金可能会上浮，详询管家)</span>
						</p>
					</div> */}
					{/* 费用详细 */}
					{/* <div className="cost_item">
						<div>
							<span>付款方式</span>
							<span></span>
							<span>季付</span>
						</div>

						<div>
							<span>租金</span>
							<span>(元/月)</span>
							<span className="active">5500</span>
						</div>
						<div>
							<span>付款方式</span>
							<span>(元)</span>
							<span>5500</span>
						</div>
						<div>
							<span>付款方式</span>
							<span>(元)</span>
							<span>0</span>
						</div>
						<div>
							<span>中介费</span>
							<span>(元)</span>
							<span>需咨询</span>
						</div>
					</div> */}
					{/* 推荐经济人 */}
					<div className="agent_card">
						<h2>推荐经济人</h2>
						<div className="card">
							<img
								style={{ width: '1rem', height: '1rem', borderRadius: '50%' }}
								src={agent.img}
								alt=""
							/>
							<div className="agent">
								<p>
									<span>{agent.broker}</span>
									<i>{agent.type}</i>
								</p>
								<p>
									<span>{agent.grade}</span>
								</p>
								<p>
									<span>{agent.leave}</span>
								</p>
							</div>
							<div className="icon">
								<IconFont
									type="icon-xiaoxi"
									onClick={() => {
										if (localStorage.getItem('token')) {
											props.history.push('/blankLayouts/callcenter', {
												info: agent
											})
										} else {
											Toast.show({
												icon: 'fail',
												content: '请先登录'
											})
										}
									}}
								/>
								<IconFont type="icon-dianhua" />
							</div>
						</div>
					</div>
				</div>
				{/* 占位 */}
				<div className="placeholder"></div>
				{/* 点击跳转 */}
				<div className="fixed_footer">
					<div className="btn1">
						<Button
							onClick={() => {
								if (localStorage.getItem('token')) {
									props.history.push('/blankLayouts/callcenter', {
										info: agent
									})
								} else {
									Toast.show({
										icon: 'fail',
										content: '请先登录'
									})
								}
							}}
						>
							在线咨询
						</Button>
					</div>
					<div className="btn2">
						<Button
							onClick={() => {
								// console.log(new Date().toDateString())
								props.history.push('/basicLayouts/vr')
							}}
						>
							VR看房
						</Button>
					</div>
					{localStorage.getItem('type') === '租房' ? (
						<div className="btn2">
							<Button
								onClick={() => {
									// console.log(obj.id)
									// console.log(localStorage.getItem('token'))
									Zhifubao({
										id: String(obj.id)
									}).then((res) => {
										console.log(localStorage.getItem('token'))

										if (localStorage.getItem('token')) {
											window.location.href = res.data
										} else {
											Toast.show({
												icon: 'fail',
												content: '请先登录'
											})
										}
									})
								}}
							>
								支付定金
							</Button>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</Detailcontainer>
	)
}

export default Detail
