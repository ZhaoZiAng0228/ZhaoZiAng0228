// 头部导航组件
import { FC } from 'react'
// 引入样式
import styled from 'styled-components'
// 引入背景图
import { dialogue } from 'assets/myImg'

// 样式表
const SessionContainer = styled.div`
	.photo {
		position: fixed;
		bottom: 3.1rem;
		right: 0.2rem;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		box-shadow: 0 4px 17px 0 rgb(0 0 0 / 15%);
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 50%;
		}
	}
	.top {
		display: flex;
		height: 1rem;
		align-items: center;
		padding: 0 0.3rem;
		background: #fff;
		border-bottom: 0.01rem solid #ccc;
		& > div {
			width: 33%;
		}
		.left,
		.right {
			display: flex;
			align-items: center;
		}
		.title {
			text-align: center;
			font-size: 0.4rem;
		}
		.left {
			font-size: 0.28rem;
		}
		.right {
			font-size: 0.28rem;
			display: flex;
			justify-content: flex-end;
		}
	}
	.session_list {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #f3f3f3;
		.content {
			background: #fff;
			.chat_item {
				display: flex;
				align-items: center;

				img {
					width: 1rem;
					height: 1rem;
					border-radius: 50%;
					margin: 0 0.3rem 0 0.4rem;
				}
				.item_con {
					flex: 1;
					border-bottom: 0.01rem solid #ccc;
					padding: 0.4rem 0;
					.item_top {
						flex: 1;
						height: 100%;
						width: 100%;
						display: flex;
						justify-content: space-between;
						font-size: 0.24rem;
						b {
							font-size: 0.3rem;
							margin-right: 0.2rem;
						}
						span:nth-of-type(1) {
							flex: 1;
							color: #aaa;
						}
						span:nth-of-type(2) {
							margin-right: 0.3rem;
							color: #aaa;
						}
					}
					.item_bottom {
						font-size: 0.24rem;
						color: #aaa;
						margin-top: 0.1rem;
					}
				}
			}
		}
	}
`
export const Session: FC<any> = (props: any) => {
	const list = [
		{
			img: 'https://img2.baidu.com/it/u=3018353879,684918101&fm=26&fmt=auto',
			broker: '刘诗诗',
			content: 'dfajfnjoasnasnjlasldjas d',
			time: '10.16',
			address: '合计辅导费'
		},
		{
			img: 'https://img0.baidu.com/it/u=325863342,1899412258&fm=26&fmt=auto',
			broker: '高圆圆',
			content: '电脑上接电话浓氨水到年底 d',
			time: '7.16',
			address: '就凶多吉少'
		}
	]

	return (
		<SessionContainer>
			{/* 头部 */}
			<div className="photo" onClick={() => {}}>
				<img src={dialogue} alt="" />
			</div>
			<div className="session_list">
				<div className="top">
					<div className="left"></div>
					<div className="title">会话列表</div>
					<div
						className="right"
						onClick={() => {
							props.history.go(-1)
						}}
					>
						关闭
					</div>
				</div>
				<div className="content">
					{list.length
						? list.map((item: any, index) => {
								return (
									<div
										className="chat_item"
										key={index}
										onClick={() => {
											props.history.push('/blankLayouts/callcenter', {
												info: item
											})
										}}
									>
										<img src={item.img} alt="" />
										<div className="item_con">
											<div className="item_top">
												<b>{item.broker}</b>
												<span>{item.address}</span>
												<span>{item.time}</span>
											</div>
											<div className="item_bottom">{item.content}</div>
										</div>
									</div>
								)
						  })
						: ''}
				</div>
			</div>
			)
		</SessionContainer>
	)
}
export default Session
