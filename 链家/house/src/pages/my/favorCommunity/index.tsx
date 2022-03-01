// 我关注的小区
import { FC, useState } from 'react'
// 引入样式
import styled from 'styled-components'
// 引入背景图
import { house_none } from 'assets/myImg'
// 引入头部导航栏
import { HeaderNav } from 'components/HeaderNav'
// 引入头部APP
import { DownLoad } from 'components/DownLoad'
// 引入会话框
import { Dialogue } from 'components/Dialogue'
// 引入icon
import { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_zvlwvw36o3.js' // 在 iconfont.cn 上生成
})

// 样式表
const FavorHouseContainer = styled.div`
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	overflow-y: auto;
	.container {
		height: 100%;
		/* background: #fff; */
	}
	/* 没有数据 */
	.house_none {
		background: #fff;
		padding: 2.3rem 0;
		img {
			width: 2.8rem;
			display: block;
			margin: 0 auto;
		}
		.text {
			font-size: 0.34rem;
			color: #676768;
			text-align: center;
			font-weight: bold;
		}
	}
	/* 有数据 */
	.house {
		background: #fff;
		.house-item {
			display: flex;
			padding: 0.4rem;
			border-bottom: 0.01rem solid #ccc;
			img {
				width: 2.2rem;
				height: 1.6rem;
				margin-right: 0.4rem;
			}
			.con {
				flex: 1;
				& > p:nth-of-type(1) {
					font-size: 0.3rem;
				}
				& > p:nth-of-type(2) {
					font-size: 0.22rem;
					margin: 0.18rem 0;
				}
				.price {
					display: flex;
					justify-content: space-between;
					& > p:nth-of-type(1) {
						font-size: 0.22rem;
					}
					& > p:nth-of-type(2) {
						font-size: 0.3rem;
						color: #f93d3b;
						font-weight: bold;
					}
				}
			}
		}
	}
`
export const FavorHouse: FC<any> = (props: any) => {
	const [favorHouseList] = useState<any>([
		{
			title: '怡景新城',
			address: '奉贤区-海湾镇',
			time: '2011',
			price: '6789',
			id: 1,
			img: 'https://img0.baidu.com/it/u=723937955,1276424402&fm=26&fmt=auto'
		},
		{
			title: '恒大林语郡',
			address: '松江区',
			time: '2011',
			price: '9876',
			id: 2,
			img: 'https://img2.baidu.com/it/u=3498944444,2401126641&fm=26&fmt=auto'
		}
	])
	return (
		<FavorHouseContainer>
			<DownLoad tit="及时获取房源动态变化" />
			<HeaderNav {...props} tit={'宏烨找房'} />
			<Dialogue />
			<div className="container">
				{favorHouseList.length ? (
					<div className="house">
						{favorHouseList.map((item: any) => {
							return (
								<div className="house-item" key={item.id}>
									<img src={item.img} alt="" />
									<div className="con">
										<p>{item.title}</p>
										<p>{item.address}</p>
										<div className="price">
											<p>{item.time}年建</p>
											<p>{item.price}/平</p>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				) : (
					<div className="house_none">
						<img src={house_none} alt="" />
						<div className="text">没有关注小区</div>
					</div>
				)}
			</div>
		</FavorHouseContainer>
	)
}
export default FavorHouse
