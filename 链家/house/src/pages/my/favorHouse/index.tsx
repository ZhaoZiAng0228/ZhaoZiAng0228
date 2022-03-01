// 我关注的二手房
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
		overflow: auto;
		/* background: #fff; */
	}
	.house_none {
		padding-top: 2.3rem;
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
				overflow: hidden;
				& > p:nth-of-type(1) {
					font-size: 0.3rem;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					margin-top: 0.1rem;
				}
				.total-price {
					display: flex;
					justify-content: space-between;
					margin: 0.2rem 0;
					& > p:nth-of-type(1) {
						font-size: 0.22rem;
					}
					& > p:nth-of-type(2) {
						font-size: 0.3rem;
						color: #f93d3b;
						font-weight: bold;
					}
				}

				.con-size {
					display: flex;
					justify-content: space-between;
					p {
						font-size: 0.22rem;
						color: #6f6975;
					}
				}
			}
		}
	}
`
export const FavorHouse: FC<any> = (props: any) => {
	const [favorHouseList] = useState<any>([
		{
			title: '未来城精装两居室，南北通透，户型方正，钥匙房源',
			size: '2室1厅92.66m²  南 北',
			address: '未来城',
			price: '10037',
			id: 1,
			totalPrice: '93',
			img: 'https://img2.baidu.com/it/u=2263757465,1852505824&fm=26&fmt=auto'
		},
		{
			title: '新出房源 海珀兰轩三区 115平 138万 中间楼层 电梯房',
			size: '3室1厅115m²  南 北',
			address: '绿地海珀兰轩三区',
			price: '12000',
			id: 2,
			totalPrice: '138',
			img: 'https://img0.baidu.com/it/u=2568626055,4139516719&fm=26&fmt=auto'
		}
	])
	return (
		<FavorHouseContainer>
			<DownLoad tit="小区新上房源早知道" />
			<HeaderNav {...props} tit={'宏烨找房'} />
			<Dialogue {...props} />
			<div className="container">
				{favorHouseList.length ? (
					<div className="house">
						{favorHouseList.map((item: any) => {
							return (
								<div className="house-item" key={item.id}>
									<img src={item.img} alt="" />
									<div className="con">
										<p>{item.title}</p>
										<div className="total-price">
											<p>{item.size}</p>
											<p>{item.totalPrice}万</p>
										</div>
										<div className="con-size">
											<p>{item.address}</p>
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
						<div className="text">没有关注房源</div>
					</div>
				)}
			</div>
		</FavorHouseContainer>
	)
}
export default FavorHouse
