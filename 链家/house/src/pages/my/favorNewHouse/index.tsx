// 我关注的新房
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
const FavorNewHouseContainer = styled.div`
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	overflow-y: auto;
	.container {
		height: 100%;
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
	} /* 有数据 */
	.house {
		background: #fff;
		.house_item {
			display: flex;
			padding: 0.4rem;
			border-bottom: 0.01rem solid #ccc;
			img {
				width: 2.2rem;
				height: 1.6rem;
				margin-right: 0.2rem;
			}
			.con {
				flex: 1;
				& > p:nth-of-type(1) {
					font-size: 0.3rem;
					margin-top: 0.1rem;
				}
				& > p:nth-of-type(2) {
					font-size: 0.22rem;
					margin: 0.18rem 0;
					color: #aaa;
				}
				.price {
					display: flex;
					justify-content: space-between;
					& > p:nth-of-type(1) {
						font-size: 0.22rem;
						color: #aaa;
					}
					& > p:nth-of-type(2) {
						font-size: 0.3rem;
						color: #f93d3b;
						font-weight: bold;
					}
				}
				.tag_box {
					display: flex;
					flex-wrap: wrap;
					margin-top: 0.03rem;
					span {
						font-size: 0.22rem;
						background: #f4f7f9;
						color: #849aae;
						padding: 0.05rem 0.1rem;
						margin: 0.04rem 0.06rem;
					}
				}
			}
		}
	}
`
export const FavorNewHouse: FC<any> = (props: any) => {
	const [favorNewHouseList] = useState<any>([
		{
			title: '浦发东悦城',
			address: '浦东周汇路158弄',
			location: '建面 72-180㎡',
			price: '41000',
			id: 1,
			img: 'https://img1.baidu.com/it/u=290437537,3140866136&fm=26&fmt=auto',
			arr: ['上海楼盘', '低总价', '公交直达', '环线房', '配套齐全']
		},
		{
			title: '龙信御澜天樾',
			address: '金山金山区枫泾镇泾荷路 829 弄',
			location: '建面 75-138㎡',
			price: '22000',
			id: 2,
			img: 'https://img2.baidu.com/it/u=387654729,3280455442&fm=26&fmt=auto',
			arr: ['上海楼盘', '多轨交汇', '公交直达', '菜市场', '亲子乐园']
		}
	])
	return (
		<FavorNewHouseContainer>
			<DownLoad tit="匿名咨询更安心" />
			<HeaderNav {...props} tit={'宏烨找房'} />
			<Dialogue {...props} />
			<div className="container">
				{favorNewHouseList.length ? (
					<div className="house">
						{favorNewHouseList.map((item: any) => {
							return (
								<div className="house_item" key={item.id}>
									<img src={item.img} alt="" />
									<div className="con">
										<p>{item.title}</p>
										<p>{item.address}</p>
										<div className="price">
											<p>{item.location}</p>
											<p>{item.price}/平</p>
										</div>
										<div className="tag_box">
											{item.arr.map((v: any, ind: number) => {
												return <span key={ind}>{v}</span>
											})}
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
		</FavorNewHouseContainer>
	)
}
export default FavorNewHouse
