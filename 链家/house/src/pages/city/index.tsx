import { FC, useState, useCallback, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import styled from 'styled-components'
import { IndexBarRef } from 'antd-mobile/es/components/index-bar'
import { NavBar, Search } from 'antd-mobile'
import { IndexBar, Cell } from 'react-vant'
// import { lorem } from 'demos'
import {
	searchcity,
	clearsearchcity,
	citylocalhost
} from 'store/city/citySlice'
import debounce from 'lodash/debounce'

import {
	SearchOutline,
	MoreOutline,
	CloseOutline,
	LocationFill,
	LoopOutline
} from 'antd-mobile-icons'
import axios from 'axios'

let data: any = [
	{
		index: 'A',
		children: [
			{
				city: '安庆'
			},
			{
				city: '安康'
			},
			{
				city: '安阳'
			}
		]
	},
	{
		index: 'B',
		children: [
			{
				city: '北京'
			},
			{
				city: '北海'
			},
			{
				city: '保定'
			}
		]
	},

	{
		index: 'C',
		children: [
			{
				city: '成都'
			},
			{
				city: '重庆'
			},
			{
				city: '⻓沙'
			}
		]
	},
	{
		index: 'D',
		children: [
			{
				city: '⼤连'
			},
			{
				city: '⼤同'
			},
			{
				city: '德州'
			}
		]
	},
	{
		index: 'E',
		children: [
			{
				city: '鄂州'
			},
			{
				city: '鄂尔多斯'
			}
		]
	},
	{
		index: 'F',
		children: [
			{
				city: '佛⼭'
			},
			{
				city: '福州'
			},
			{
				city: '抚顺'
			},
			{
				city: '福建'
			}
		]
	},
	{
		index: 'G',
		children: [
			{
				city: '⼴州'
			},
			{
				city: '贵阳'
			},
			{
				city: '⼴元'
			}
		]
	},
	{
		index: 'H',
		children: [
			{
				city: '杭州'
			},
			{
				city: '合肥'
			},
			{
				city: '海⼝'
			}
		]
	},
	{
		index: 'J',
		children: [
			{
				city: '济南'
			},
			{
				city: '吉林'
			},
			{
				city: '济宁'
			}
		]
	},
	{
		index: 'K',
		children: [
			{
				city: '开封'
			},
			{
				city: '昆⼭'
			}
		]
	},
	{
		index: 'L',
		children: [
			{
				city: '廊坊'
			},
			{
				city: '洛阳'
			},
			{
				city: '兰芝'
			}
		]
	},

	{
		index: 'M',
		children: [
			{
				city: '绵阳'
			},
			{
				city: '⻢鞍⼭'
			},
			{
				city: '眉⼭'
			}
		]
	},
	{
		index: 'N',
		children: [
			{
				city: '南京'
			},
			{
				city: '宁波'
			},
			{
				city: '南充'
			}
		]
	},
	{
		index: 'P',
		children: [
			{
				city: '濮阳'
			},
			{
				city: '平顶⼭'
			},
			{
				city: '盘锦'
			}
		]
	},
	{
		index: 'Q',
		children: [
			{
				city: '⻘岛'
			},
			{
				city: '泉州'
			},
			{
				city: '庆阳'
			}
		]
	},
	{
		index: 'R',
		children: [
			{
				city: '如莩'
			}
		]
	},

	{
		index: 'S',
		children: [
			{
				city: '上海'
			},
			{
				city: '⽯家庄'
			},
			{
				city: '苏州'
			}
		]
	},
	{
		index: 'T',
		children: [
			{
				city: '天津'
			},
			{
				city: '太原'
			},
			{
				city: '台州'
			}
		]
	},
	{
		index: 'W',
		children: [
			{
				city: '武汉'
			},
			{
				city: '⽆锡'
			},
			{
				city: '乌兰察布'
			}
		]
	},
	{
		index: 'X',
		children: [
			{
				city: '厦⻔'
			},

			{
				city: '徐州'
			},
			{
				city: '襄阳'
			}
		]
	},
	{
		index: 'Y',
		children: [
			{
				city: '烟台'
			},
			{
				city: '阳泉'
			},
			{
				city: '银川'
			}
		]
	},
	{
		index: 'Z',
		children: [
			{
				city: '珠海'
			},
			{
				city: '郑州'
			},
			{
				city: '周⼝'
			}
		]
	}
]
export const CityWrap = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background: #f5f5f5;
	.c-header {
		background: #ffffff;
	}

	.c-container {
		width: 100%;
		height: auto;
		overflow-y: scroll;
		padding: 0.16rem 0.3rem 0rem 0.3rem;
		h6 {
			padding: 0.52rem 0 0.32rem 0;
			color: #a0a1a3;
		}
		/* 搜索 */
		.c-search {
			height: 0.74rem;
			line-height: 0.74rem;
			position: relative;

			ul {
				width: 100%;
				height: auto;
				overflow-y: auto;
				background: #ffff;
				z-index: 9999;
				position: absolute;
				top: 0.8rem;
				left: 0;
			}
		}
		/* 选择城市 */
		.c-group {
			.c-group-geo {
				background: #ffff;
				width: 100%;
				height: 0.7rem;
				line-height: 0.7rem;
				> div {
					padding: 0 0.28rem;
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					height: 0.7rem;
					line-height: 0.7rem;

					overflow: hidden;
					.location {
						flex: 1;
						text-indent: 0.1rem;
						overflow: hidden;
						height: 100%;
						width: 100%;

						font-size: 0.12rem;
					}
				}
			}
		}
		/* 最近访问 */
		.c-city-as-list {
			height: 0.72rem;
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			.c-city-as-list-a {
				flex: 1;
				align-items: center;
				background: #ffff;
				color: #60505d;
				height: 100%;
				line-height: 0.72rem;
				text-align: center;
				margin-right: 0.38rem;
			}

			.c-city-as-list-a:nth-last-of-type(1) {
				margin-right: 0;
			}
		}

		/* 热门城市 */

		.c-group-city-as-hot {
		}

		.rv-index-bar__sidebar {
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			z-index: 0;
			top: 1.5rem;
			left: 0;
			height: auto;
			flex-wrap: wrap;
			/* justify-content: center; */
			background: #ffff;
			margin-bottom: 0.4rem;
			.rv-index-bar__index {
				padding: 0.3rem;
				margin-left: 0px;
				z-index: 0;
				/* height: 0.5rem; */
			}

			.rv-index-anchor :nth-of-type(1) {
				margin-top: 0.3rem !important;
			}
		}
	}
`
// let addresslng1 = 0

// let addresslat1 = 0
const City: FC<any> = (props) => {
	const dispatch = useAppDispatch()
	let {
		citySlice: { searchCitylist }
	} = useAppSelector((state) => state)
	//点击头部返回按钮
	const cityloactionList: any = ['上海', '北京', '深圳']
	const back = () => {
		props.history.push('/basicLayouts/home')
	}

	// 热门城市
	const city: any = JSON.parse(localStorage.getItem('citylist') || '[]')

	//接受的state
	const [userQuery, setUserQuery] = useState('')

	// 防抖

	// onchange事件
	const onChange = (e: any) => {
		setUserQuery(e)
		delayedQuery(e)
	}
	// 缓存防抖
	const delayedQuery = useCallback(
		debounce((q) => sendQuery(q), 1000),
		[]
	)

	// 数据
	const sendQuery = (query: any) => {
		if (query === '') {
			// 数组为空
			dispatch(clearsearchcity())
		} else {
			// 请求axios
			dispatch(searchcity(query))
		}
	}

	// let map = new AMap.Map('container', { zoom: 10 })

	const [addresslng, setaddresslng] = useState(0)
	const [addresslat, setaddresslat] = useState(0)

	const [addresscity, getaddresscity] = useState('')
	//获取地理信息函数
	useEffect(() => {
		// 执行地图.

		// const timer = setTimeout(() => {
		AddressMap()
		// }, 500)

		// return () => {
		// 	clearInterval(timer)
		// }
	}, [addresslng, addresslat])
	const AddressMap = () => {
		AMap.plugin('AMap.Geolocation', function () {
			let geolocation = new AMap.Geolocation({
				// 是否使用高精度定位，默认：true
				enableHighAccuracy: true,
				// 设置定位超时时间，默认：无穷大
				timeout: 10000,
				// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
				buttonOffset: new AMap.Pixel(10, 20),
				//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				zoomToAccuracy: true,
				//  定位按钮的排放位置,  RB表示右下
				buttonPosition: 'RB',
				panToLocation: true //定位成功后将定位到的位置作为地图中心点，默认：true
			})

			// let lnglat = [116.396574, 39.992706]
			// // 逆向地理编码
			// var geocoder = new AMap.Geocoder({
			// 	// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
			// 	// city: '010'
			// })

			// geocoder.getAddress(lnglat, function (status: any, result: any) {
			// 	if (status === 'complete' && result.info === 'OK') {
			// 		// result为对应的地理位置详细信息

			// 		console.log(result)
			// 	}
			// })

			geolocation.getCurrentPosition(function (status: any, result: any) {
				if (status == 'complete') {
					onComplete(result)
				} else {
					onError(result)
				}
			})

			function onComplete(data: any) {
				// data是具体的定位信息

				console.log(data)

				setaddresslng(data.position.lng)
				setaddresslat(data.position.lat)

				console.log('addresslat', addresslat)

				console.log('addresslng', addresslng)

				// addresslng1 = data.position.lng

				// addresslat1 = data.position.lat
				// console.log(addresslat)
				// axios
				// 	.get(
				// 		`https://restapi.amap.com/v3/geocode/regeo?key=2dec3d55509bc53c93825a5fad45b70c&location=${
				// 			addresslat + ',' + addresslng
				// 		}`
				// 	)
				// 	.then((res) => {
				// 		console.log(res)
				// 	})
			}

			function onError(data: any) {
				// 定位出错
				console.log(data)

				alert(data.message)
			}
		})
		// // 逆向地理编码
		let geocoder
		AMap.plugin('AMap.Geocoder', function () {
			geocoder = new AMap.Geocoder()
			let lnglat = [addresslng, addresslat]
			console.log(lnglat)

			geocoder.getAddress(lnglat, function (status: any, result: any) {
				if (status === 'complete' && result.info === 'OK') {
					// result为对应的地理位置详细信息

					// console.log(result.regeocode.formattedAddress)
					// console.log(result)

					getaddresscity(result.regeocode.formattedAddress)
				}
			})
		})
	}
	const indexBarRef = useRef<IndexBarRef>(null)
	useEffect(() => {
		indexBarRef.current?.scrollTo('F')
	}, [])

	return (
		<CityWrap>
			{/* 头部 */}
			<div className="c-header">
				<NavBar onBack={back}>选择城市</NavBar>
			</div>
			<div className="c-container">
				{/* 搜索框 */}
				<div className="c-search">
					<Search
						placeholder="请输入内容"
						onChange={onChange}
						value={userQuery}
						showCancelButton={false}
						style={{
							'--border-radius': '0',
							'--background': '#ffffff'
						}}
					/>
					{searchCitylist.length ? (
						<ul>
							{searchCitylist.length
								? searchCitylist.map((item: any, index: any) => {
										return (
											<li
												onClick={() => {
													console.log(11)
													dispatch(citylocalhost(item))
													dispatch(clearsearchcity())
													console.log(item)

													props.history.push('/basicLayouts/home')
												}}
												key={item.adcode}
											>
												{item.name}
											</li>
										)
								  })
								: ''}
						</ul>
					) : (
						''
					)}
				</div>
				{/* 自动定位 */}

				<div className="c-group">
					<h6>选择城市</h6>

					<div className="c-group-geo">
						<div>
							<div>
								<LocationFill />
							</div>

							<span className="location">
								{addresscity ? addresscity : '定位失败'}
							</span>

							<div onClick={AddressMap}>
								<LoopOutline fontSize={16} color="#03ad65" />
							</div>
						</div>
					</div>
				</div>
				{/* 最近访问 */}
				<div className="c-group-city-as">
					<h6>最近访问</h6>

					<div className="c-city-as-list">
						{city
							? city.map((item: any, index: any) => {
									return (
										<div className="c-city-as-list-a" key={index}>
											<span>{item}</span>
										</div>
									)
							  })
							: ''}
					</div>
				</div>
				{/* 热门城市 */}
				<div className="c-group-city-as-hot">
					<h6>热门城市</h6>
					<div className="c-city-as-list">
						{cityloactionList
							? cityloactionList.map((item: any, index: any) => {
									return (
										<div className="c-city-as-list-a" key={index}>
											<span>{item}</span>
										</div>
									)
							  })
							: ''}
					</div>
				</div>
				{/* 全部城市 */}

				<div className="c-group-city-as-all">
					<h6>全部城市(按首字母顺序)</h6>
					<div>
						<IndexBar sticky={false}>
							{data.map((item: any, idx: any) => {
								return (
									<div key={idx}>
										<IndexBar.Anchor
											index={item.index}
											style={{ margin: '0.2rem 0' }}
										/>
										{item.children.map((val: any, i: any) => {
											return (
												<Cell title={val.city} key={i} onClick={() => {}} />
											)
										})}
									</div>
								)
							})}
						</IndexBar>
					</div>
				</div>
			</div>
		</CityWrap>
	)
}

export default City
