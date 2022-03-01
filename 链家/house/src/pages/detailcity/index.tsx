import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { createFromIconfontCN } from '@ant-design/icons'
import { Swipe, NavBar, Icon } from 'react-vant'
import axios from 'axios'

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2639567_xnp1bonrhrm.js'
})

const DetailcityWrap = styled.div`
	background: #f7f7f7;
	width: 100%;
	height: 100%;
	.header {
		width: 100%;
		height: 1rem;
		background: #fff;
		display: flex;
	}

	.main {
		flex: 1;
		width: 100%;
		height: 100%;
		background: #ccc;
	}

	.footerbar {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		background: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 0.95rem;

		ul {
			display: flex;
			width: 100%;
			height: 100%;
			align-items: center;
			overflow-x: scroll;
			flex-wrap: nowrap;

			li {
				flex-shrink: 0;
				color: #fff;
				width: 20%;
				text-align: center;

				> span {
					font-size: 0.4rem;
					.anticon {
						padding: 0.05rem 0;
					}
				}

				p {
					font-size: 0.14rem;
				}
			}

			.active {
				color: #6262d3;
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
`
const footerbarmen = [
	{
		name: '地铁',

		icon: 'icon-ditie2'
	},
	{
		name: '公交',

		icon: 'icon-gongjiao'
	},
	{
		name: '学校',

		icon: 'icon-xuexiao'
	},
	{
		name: '医院',

		icon: 'icon-jijiuxiang'
	},
	{
		name: '银行',

		icon: 'icon-Bank'
	},
	{
		name: '餐饮',

		icon: 'icon-canyinfuwu'
	},
	{
		name: '购物',

		icon: 'icon-gouwu'
	}
]
export const Detailcity: FC<any> = (props: any) => {
	const [footerbarIndex, getfooterbarIndex] = useState(0)
	const [footerbarlist, getfooterbarlist]: any = useState([])

	const [cityname, getcityname]: any = useState('地铁')
	let locationcity: string = props.history.location.state.address.toString()

	// 切换
	const vehicle = async (cityname: any) => {
		let res: any = await axios.get(
			`https://restapi.amap.com/v5/place/around?key=2dec3d55509bc53c93825a5fad45b70c&location=${locationcity}&keywords=${cityname}}`
		)

		getfooterbarlist(res.data.pois)
	}
	let a: any = footerbarlist[0]?.location

	let n1, n2
	if (a) {
		n1 = a.slice(0, a.indexOf(',')) * 1

		n2 = a.slice(a.indexOf(',') + 1) * 1
	}

	useEffect(() => {
		vehicle(cityname)
	}, [])

	useEffect(() => {
		Addresscity()
	}, [footerbarlist])

	const b = (c: any) => {
		let b1 = c.slice(0, a.indexOf(',')) * 1

		let b2 = c.slice(a.indexOf(',') + 1) * 1

		return [b1, b2]
	}

	//地图

	// console.log(addressdatalist[0]?.location)
	// 判断是否存在

	const Addresscity = () => {
		let map = new AMap.Map('detailmap', {
			center: props.history.location.state.address,

			zoom: 16,
			// layers: [
			// 	//使用多个图层
			// 	new AMap.TileLayer.Satellite(),
			// 	new AMap.TileLayer.RoadNet()
			// ],
			viewMode: '3D' //使用3D视图
			// zooms: [4, 18], //设置地图级别范围
		})
		let icon = new AMap.Icon({
			size: new AMap.Size(25, 25), // 图标尺寸
			image:
				'//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png' // Icon的图像
			// imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
			// imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
		})

		footerbarlist.forEach((item: any) => {
			let marker = new AMap.Marker({
				icon: footerbarlist.length ? icon : '',
				// position: new AMap.LngLat(116.481181, 39.989792)
				// position: [item.location[0] * 1, item.location[1] * 1]
				cursor: 'cursor',
				position: b(item.location),
				offset: new AMap.Pixel(-13, -50),
				clickable: true
			})

			marker.setLabel({
				offset: new AMap.Pixel(0, 0), //设置文本标注偏移量
				content: `<div class='info'>${item.name}</div>`, //设置文本标注内容
				direction: 'top' //设置文本标注方位
			})

			marker.setMap(map)
		})
	}

	return (
		<DetailcityWrap>
			{/* <div className="header">周边环境</div> */}

			<div className="main">
				<div id="detailmap" style={{ width: '100%', height: '100%' }}></div>

				<div className="footerbar">
					<ul>
						{footerbarmen.length
							? footerbarmen.map((item: any, index: any) => {
									return (
										<li
											className={footerbarIndex == index ? 'active' : ''}
											key={index}
											onClick={() => {
												getfooterbarIndex(index)

												vehicle(item.name)
												getcityname(item.name)
											}}
										>
											<span>
												<IconFont type={item.icon} />
											</span>

											<p>{item.name}</p>
										</li>
									)
							  })
							: ''}
					</ul>
				</div>
			</div>
		</DetailcityWrap>
	)
}

export default Detailcity
