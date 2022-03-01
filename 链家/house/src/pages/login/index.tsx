// 我的
import { FC, useState, useCallback } from 'react'
// 引入styled
import styled from 'styled-components'
// 引入头部组件
import { Button, Input, Toast } from 'antd-mobile'
// 引入icon
import { createFromIconfontCN } from '@ant-design/icons'
//引入API
import { FetchLogin } from 'api'
// import { fun, fun2 } from '../my/index'
const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_y8imfe6faoc.js' // 在 iconfont.cn 上生成
})

const LoginContainer = styled.div`
	width: 100%;

	.container {
		flex: 1;
		padding: 0.5rem;
		.top {
			margin-bottom: 0.54rem;
			display: flex;
			justify-content: space-between;
			span {
				color: #aaaaaa;
				font-size: 0.28rem;
			}
		}
		.tit {
			font-size: 0.54rem;
			font-weight: bold;
		}
		.ipt {
			.adm-input {
				border-bottom: 0.01rem solid #ccc;
				height: 1.2rem;
				font-size: 0.3rem;
			}
		}
		.btn {
			margin: 0.44rem 0;
		}
		.font {
			font-size: 0.28rem;
			color: #d1ccce;
			line-height: 0.4rem;
			span {
				color: #3a65f5;
			}
		}
	}
`

export const Login: FC<any> = (props: any) => {
	const [info, setInfo] = useState({
		userName: '',
		userPwd: ''
	})
	const fun = (fn: Function) => {
		let timer: any = null

		return () => {
			clearTimeout(timer)

			timer = setTimeout(() => {
				fn()
			}, 100)
		}
	}

	// 节流
	const fun2 = (fn: Function) => {
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
	// 登录
	const login = async () => {
		console.log(info)
		const res = await FetchLogin({
			username: info.userName,
			password: info.userPwd
		})
		if (res.data.code === 200) {
			Toast.show({
				icon: 'success',
				content: '登录成功'
			})
			localStorage.setItem('token', res.data.token)
			props.history.push('/basicLayouts/my')
		} else {
			Toast.show({
				icon: 'fail',
				content: res.data.msg
			})
		}
		console.log(res)
	}
	const lo = useCallback(fun(login), [info])
	return (
		<LoginContainer>
			<div className="container">
				<div className="top">
					<IconFont
						type="icon-close"
						style={{
							fontSize: '.33rem',
							fontWeight: 'bold',
							color: '#aaaaaa'
						}}
						onClick={() => {
							props.history.push('/basicLayouts/my')
						}}
					/>
					<span
						onClick={() => {
							props.history.push('/basicLayouts/register')
						}}
					>
						注册
					</span>
				</div>
				<div className="tit">账号密码登录</div>
				<div className="ipt">
					<Input
						placeholder="请输入账号"
						value={info.userName}
						onChange={(val) => {
							setInfo((prev: any) => {
								return {
									...prev,
									userName: val
								}
							})
						}}
					/>
					<Input
						placeholder="请输入密码"
						type="password"
						value={info.userPwd}
						onChange={(val) => {
							console.log(val)
							setInfo((prev: any) => {
								return {
									...prev,
									userPwd: val
								}
							})
						}}
					/>
				</div>
				<div className="btn">
					<Button block color="success" size="large" onClick={() => lo()}>
						登录
					</Button>
					<br />
					<Button
						block
						color="success"
						size="large"
						onClick={() => {
							const authorize_uri = 'https://gitee.com/oauth/authorize'
							const redirect_uri = 'http://localhost:7001/api/oauth'
							const client_id =
								'24836ab6506bc32a98a1fdd3e34299e5e063a303911c5c6f353ed84859a41b3b'

							window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`
							console.log(1)
						}}
					>
						第三方登录
					</Button>
				</div>
				<div className="font">
					注册/登录即代表同意<span>《链家隐私政策》</span> 及
					<span>《链家用户使用协议》</span>
				</div>
			</div>
		</LoginContainer>
	)
}

export default Login
