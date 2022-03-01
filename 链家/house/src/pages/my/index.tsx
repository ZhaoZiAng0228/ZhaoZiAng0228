// 我的
import { FC, useState, useEffect } from 'react'
// 引入styled
import styled from 'styled-components'
// 引入头部组件
import { HeaderNav } from 'components/HeaderNav'
// 引入背景图
import { bg, mine_head, dialogue, list_icon } from 'assets/myImg/index'
// 引入icon
import { createFromIconfontCN } from '@ant-design/icons'
//引入API
import { GetUser } from 'api'

import { Toast } from 'antd-mobile'

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_ep2rnc5e8ad.js' // 在 iconfont.cn 上生成
})

//手机号中间四位****代替
function formatPhone(phone: any) {
	return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
const MyContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.container {
		flex: 1;
		background: #f5f5f5;
	}
	.info {
		width: 100%;
		height: 4rem;
		background: url(${bg}) no-repeat;
		background-size: cover;
		display: flex;
		flex-direction: column;
		.head {
			width: 1.08rem;
			height: 1.08rem;
			background: url(${mine_head}) no-repeat;
			background-size: cover;
			margin: 0.8rem auto 0.38rem;
		}
		/* 登录注册 */
		.btn {
			display: flex;
			justify-content: center;
			span {
				display: inline-block;
				width: 1.74rem;
				height: 0.7rem;
				border: 0.01px solid #fff;
				line-height: 0.7rem;
				font-size: 0.3rem;
				border-radius: 0.02rem;
				text-align: center;
				color: #fff;
			}
			span:nth-child(1) {
				margin-right: 0.3rem;
			}
		}
		.user_box {
			font-size: 0.3rem;
			text-align: center;
			color: #fff;
		}
	}
	/* 列表模块 */
	.my_list {
		background: #fff;
		margin-top: 0.24rem;
		.my-item {
			display: flex;
			align-items: center;
			font-size: 0.3rem;
			height: 1rem;
			line-height: 1rem;
			display: flex;
			align-items: center;

			.item-left {
				width: 0.4rem;
				height: 0.4rem;
				background: url(${list_icon}) no-repeat;
				background-size: 0.4rem 2rem;
				background-position-x: 0;
				margin: 0 0.26rem 0 0.4rem;
			}
			.item-right {
				flex: 1;
				display: flex;
				align-items: center;
				border-bottom: 0.01rem solid #f5f5f5;
				p {
					flex: 1;
					font-size: 0.3rem;
				}
				.anticon {
					margin-right: 0.5rem;
					color: #aaa;
					font-size: 0.34rem;
				}
			}
		}
	}
	/* 退出登录 */
	.log_out {
		padding: 0.58rem 0.2rem 0 0.2rem;

		div {
			height: 0.8rem;
			line-height: 0.8rem;
			text-align: center;
			background-color: #fff;
			border: 0.01rem solid #c5c5c5;
			font-size: 0.3rem;
		}
	}
	/* 定位图标 */
	.dialogue {
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
`

//防抖
export const fun = (fn: Function) => {
	let timer: any = null

	return () => {
		clearTimeout(timer)

		timer = setTimeout(() => {
			fn()
		}, 3000)
	}
}

// 节流
export const fun2 = (fn: Function) => {
	let bool: boolean = true
	return () => {
		if (!bool) return

		bool = false
		setTimeout(() => {
			bool = true
			fn()
		}, 3000)
	}
}

export const My: FC<any> = (props: any) => {
	// 列表数据
	const list = [
		{
			title: '我关注的二手房',
			posY: '0rem',
			id: 1,
			path: '/blankLayouts/favorHouse'
		},
		{
			title: '我关注的小区',
			posY: '-0.4rem',
			id: 2,
			path: '/blankLayouts/favorCommunity'
		},
		{
			title: '我关注的新房',
			posY: '-0.8rem',
			id: 3,
			path: '/blankLayouts/favorNewHouse'
		},
		{
			title: '我关注的租房',
			posY: '-1.2rem',
			id: 4,
			path: '/blankLayouts/houselist'
		},
		{
			title: '免电话营销',
			posY: '-1.6rem',
			id: 5,
			path: '/blankLayouts/miandarao'
		}
	]
	// 保存个人信息
	const [userInfo, setUserInfo] = useState<any>({})
	useEffect(() => {
		console.log(localStorage.getItem('token'))
		if (localStorage.getItem('token')) {
			GetUser().then((res: any) => {
				if (res.data.code === 200) {
					setUserInfo({
						...res.data.user,
						tel: formatPhone(res.data.user.username)
					})
				} else {
					setUserInfo({})
					Toast.show({
						icon: 'fail',
						content: res.data.msg
					})
				}
			})
		}

		//第三方登录

		if (props.location.search) {
			console.log(props.location.search)
			// props.location.search.substring(1, 20)
			const arr1 = props.location.search.split('=')
			console.log(arr1[2])
			console.log(arr1[1])

			const oauth = arr1[1].substring(0, arr1[1].length - 5)
			const name = arr1[2].substring(0, arr1[2].length - 7)
			console.log(oauth, name)

			// const oauth = props.location.search.substring(7, 39)
			// const name = props.location.search.substring()
			localStorage.setItem('oauth', oauth)
			localStorage.setItem('username', name)
			setUserInfo({
				username: localStorage.getItem('username')
			})
		}

		if (localStorage.getItem('username')) {
			setUserInfo({
				username: localStorage.getItem('username')
			})
		}
	}, [])

	const outlogin = () => {
		localStorage.removeItem('token')
		setUserInfo({})
		Toast.show({
			icon: 'success',
			content: '退出登录成功'
		})

		localStorage.removeItem('oauth')
		localStorage.removeItem('username')
	}

	return (
		<MyContainer>
			<HeaderNav {...props} tit="宏烨找房" />
			<div className="container">
				{/* 个人信息模块 */}
				<div className="info">
					{/* 头像 */}
					<div className="head"></div>
					{/* 登录注册 */}
					{userInfo.username || localStorage.getItem('username') ? (
						<div className="user_box">
							欢迎你，{userInfo.tel || userInfo.username}
						</div>
					) : (
						<div className="btn">
							<span
								onClick={() => {
									props.history.push('/basicLayouts/login')
								}}
							>
								登录
							</span>
							<span
								onClick={() => {
									props.history.push('/basicLayouts/register')
								}}
							>
								注册
							</span>
						</div>
					)}
				</div>
				{/* 列表模块 */}
				<div className="my_list">
					{list.length
						? list.map((item: any, index) => {
								return (
									<div className="my-item" key={index}>
										<div
											className="item-left"
											style={{ backgroundPositionY: item.posY }}
										></div>
										<div
											className="item-right"
											onClick={() => {
												props.history.push(item.path)
											}}
										>
											<p>{item.title}</p>
											<IconFont type="icon-youjiantou" />
										</div>
									</div>
								)
						  })
						: ''}
				</div>
				{/* 退出登录 */}

				{userInfo.username ? (
					<div className="log_out">
						<div
							onClick={() => {
								props.history.push('/basicLayouts/update')
							}}
						>
							我要卖房
						</div>
					</div>
				) : (
					''
				)}
				{userInfo.username ? (
					<div className="log_out">
						<div onClick={outlogin}>退出登录</div>
					</div>
				) : (
					''
				)}
			</div>
			{/* 会话 */}
			<div className="dialogue">
				<img src={dialogue} alt="" />
			</div>
		</MyContainer>
	)
}

export default My
