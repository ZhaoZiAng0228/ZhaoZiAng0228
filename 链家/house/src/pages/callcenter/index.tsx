// 头部导航组件
import { FC, useState, useEffect } from 'react'
// 引入样式
import styled from 'styled-components'

import io from 'socket.io-client'
// 引入icon
import { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_zvlwvw36o3.js' // 在 iconfont.cn 上生成
})
const socket = io('http://localhost:7001/homeOne')

// 样式表
const CallcenterContainer = styled.div`
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

	.chat {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 999;
		top: 0;
		left: 0;
		background: #fff;
		.container {
			flex: 1;
			overflow: auto;
			.CallCenter-box {
				flex: 1;
				padding: 0 0.3rem;
				.box {
					& > p {
						text-align: center;
						font-size: 0.26rem;
						margin: 0.2rem 0;
						color: #93908c;
					}
					& > div {
						.head {
							width: 0.8rem;
							height: 0.8rem;
						}
					}
				}
				.left,
				.right {
					& > div {
						display: flex;
						align-items: center;
						span {
							padding: 0.15rem 0.2rem;
							font-size: 0.28rem;
							line-height: 0.38rem;
						}
					}
				}
				.left {
					width: 100%;
					display: flex;
					justify-content: flex-start;
					span {
						margin-left: 0.2rem;
						background: #fff;
					}
				}
				.right {
					height: 100%;
					display: flex;
					justify-content: flex-end;
					span {
						margin-right: 0.2rem;
						background: #9eea6a;
					}
				}
			}
		}
		.bottom {
			background: #fff;
			height: 0.8rem;
			width: 100%;
			.bottom-box {
				width: 100%;
				height: 0.8rem;
				input {
					border: none;
					outline: none;
					border-top: 0.01rem solid #ccc;
					width: 100%;
					height: 100%;
					font-size: 0.3rem;
					padding: 0 0.3rem;
				}
			}
		}
	}
`
export const Callcenter: FC<any> = (props: any) => {
	const [val, setVal] = useState('')
	const [arr, setArr] = useState<any>([])
	const [info, setInfo] = useState<any>({})
	useEffect(() => {
		setInfo(props.location.state.info)
	}, [])

	useEffect(() => {
		// 连接服务端
		socket.on('connect', () => {
			console.log('connect!')
			console.log(info)
			socket.emit('online', {
				username: 'lisi',
				img: 'https://img2.baidu.com/it/u=2577225513,2885519982&fm=26&fmt=auto',
				to: props.location.state.info.broker
			})
		})
		// 接收上线通知
		// socket.on('state', (msg: any) => {
		// 	console.log(msg)
		// })

		//接收消息通知
		socket.on('res', (msg: any) => {
			console.log('msg', msg)
			setArr((prev: any) => {
				return [...prev, msg]
			})
		})

		// 接收上线通知
		socket.on('online', (msg: any) => {
			// console.log(msg)
			console.log('online from server: %s!', msg)
		})
	}, [])

	const keyup = (e: any) => {
		if (e.keyCode === 13) {
			socket.emit('chat', {
				role: 'user',
				val,
				userName: 'lisi',
				to: '刘诗诗'
			})
			setVal('')
		}
	}

	return (
		<CallcenterContainer>
			{/* 聊天 */}
			<div className="chat">
				{/* 头部 */}
				<div className="top">
					<div className="left">
						<IconFont
							type="icon-zuojiantou1"
							style={{
								fontSize: '.36rem',
								fontWeight: 'bold',
								color: '#000'
							}}
							onClick={() => {
								props.history.go(-1)
							}}
						/>
					</div>

					<div className="title">{info.broker}</div>
					<div
						className="right"
						onClick={() => {
							props.history.push('/basicLayouts/my')
						}}
					>
						关闭
					</div>
				</div>
				{/* 主体 */}
				<div className="container">
					<div className="CallCenter-box">
						{arr.length
							? arr.map((item: any, index: number) => {
									return (
										<div className="box" key={index}>
											<p>{item.date}</p>
											<div
												className={item.role === 'broker' ? 'left' : 'right'}
											>
												{item.role === 'broker' ? (
													<div>
														<img className="head" src={info.img} alt="" />
														<span>{item.val}</span>
													</div>
												) : (
													<div>
														<span>{item.val}</span>
														<img
															className="head"
															src="https://img1.baidu.com/it/u=2552230459,3344470758&fm=26&fmt=auto"
															alt=""
														/>
													</div>
												)}
											</div>
										</div>
									)
							  })
							: ''}
					</div>
				</div>
				<div className="bottom">
					<div className="bottom-box">
						<input
							className="ipts"
							type="text"
							placeholder="发送消息"
							value={val}
							onKeyUp={(e) => keyup(e)}
							onChange={({ target: { value } }) => {
								setVal(value)
							}}
						/>
					</div>
				</div>
			</div>
			)
		</CallcenterContainer>
	)
}

export default Callcenter
