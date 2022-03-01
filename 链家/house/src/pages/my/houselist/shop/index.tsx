// 商店
import { FC, useState } from 'react'
// 引入样式
import styled from 'styled-components'
// 引入背景图
import { bg_empty } from 'assets/myImg'

// 引入icon
import { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_4vimimo7aoc.js' // 在 iconfont.cn 上生成
})

// 样式表
const ShopContainer = styled.div`
	width: 100%;
	height: 100%;
	.box {
		text-align: center;
		img {
			width: 4rem;
			margin-top: 0.5rem;
		}
		h3 {
			font-size: 0.3rem;
			letter-spacing: 0.05rem;
			margin-top: 0.5rem;
		}
		p {
			font-size: 0.24rem;
			margin-top: 0.26rem;
			letter-spacing: 0.02rem;
			color: #aaa;
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
				.icon {
					margin-top: 0.1rem;
					display: flex;
					justify-content: flex-end;
					.anticon {
						font-size: 0.4rem;
					}
				}
			}
		}
	}
`
export const Shop: FC<any> = (props: any) => {
	const [shopList] = useState<any>([
		{
			title: '保利朗悦',
			address: '奉贤区-海湾镇',
			time: '2011',
			price: '6700',
			id: 1,
			img: 'https://img0.baidu.com/it/u=1530324216,846172114&fm=26&fmt=auto'
		},
		{
			title: '万科朗润园',
			address: '松江区',
			time: '2011',
			price: '9876',
			id: 2,
			img: 'https://img1.baidu.com/it/u=1158813336,2300964289&fm=26&fmt=auto'
		}
	])
	return (
		<ShopContainer>
			{shopList.length ? (
				<div className="house">
					{shopList.map((item: any) => {
						return (
							<div className="house-item" key={item.id}>
								<img src={item.img} alt="" />
								<div className="con">
									<p>{item.title}</p>
									<p>{item.address}</p>
									<div className="price">
										<p>{item.time}年建</p>
										<p>{item.price}元/月</p>
									</div>
									<div className="icon">
										<IconFont type="icon-shanchu" />
									</div>
								</div>
							</div>
						)
					})}
				</div>
			) : (
				<div className="box">
					<img src={bg_empty} alt="" />
					<h3>您还没有关注的公寓吧</h3>
					<p>去关注公寓吧～</p>
				</div>
			)}
		</ShopContainer>
	)
}
export default Shop
