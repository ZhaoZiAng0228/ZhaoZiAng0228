//注册
import { FC, useState, useEffect } from 'react'
// 引入styled
import styled from 'styled-components'
// 引入头部组件
import { Button, Input, Toast } from 'antd-mobile'
// 引入ico
import { createFromIconfontCN } from '@ant-design/icons'
//引入API
import { FetchRegister, GetYzm } from 'api'

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_y8imfe6faoc.js' // 在 iconfont.cn 上生成
})

const RegisterContainer = styled.div`
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
		.view-subtitle {
			color: #aaaaaa;
			font-size: 0.28rem;
			margin: 0.3rem 0 0.46rem 0;
		}
		.ipt {
			.adm-input {
				border-bottom: 0.01rem solid #ccc;
				height: 1.2rem;
				font-size: 0.3rem;
			}
		}
		.code {
			display: flex;
			align-items: center;
			border-bottom: 0.01rem solid #ccc;
			height: 1.2rem;
			font-size: 0.3rem;
			p {
				font-size: 0.3rem;
				color: #aaa;
				display: flex;
			}
			.adm-input-wrapper {
				flex: 1;
			}
		}
		.btn {
			margin: 0.44rem 0;
		}
		.account {
			font-size: 0.3rem;
			margin-bottom: 0.48rem;
			text-align: center;
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
export const Register: FC<any> = (props: any) => {
	const [info, setInfo] = useState({
		userName: '',
		userPwd: '',
		code: ''
	})
	const [yzm, setYzm] = useState<any>('')
	// 注册

	useEffect(() => {}, [])

	const getyzm = () => {
		GetYzm().then((res: any) => {
			console.log(res)
			// setYzm(res.data.yzm)
			setYzm(res.data.yzm)
		})
	}
	const regiser = async () => {
		// console.log(info)

		const res = await FetchRegister({
			username: info.userName,
			password: info.userPwd,
			yzm: info.code.toLocaleUpperCase()
		})

		if (res.data.code === 200) {
			Toast.show({
				icon: 'success',
				content: '注册成功'
			})
			localStorage.setItem('token', res.data.token)

			props.history.push('/basicLayouts/my')
		} else {
			alert(res.data.msg)

			Toast.show({
				icon: 'fail',
				content: res.data.msg
			})
		}
		console.log(res)
	}
	return (
		<RegisterContainer>
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
				</div>
				<div className="tit">注册</div>
				<div className="view-subtitle">经纪人不会看到您的手机号</div>
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
						onChange={(val) => {
							setInfo((prev: any) => {
								return {
									...prev,
									userPwd: val
								}
							})
						}}
					/>
				</div>
				<div className="code">
					<Input
						placeholder="请输入验证码"
						onChange={(val) => {
							setInfo((prev: any) => {
								return {
									...prev,
									code: val
								}
							})
						}}
					/>
					<p onClick={getyzm}>{yzm ? yzm : '获取验证码'}</p>
				</div>
				<div className="btn">
					<Button block color="success" size="large" onClick={() => regiser()}>
						注册
					</Button>
				</div>
				<div
					className="account"
					onClick={() => {
						props.history.push('/basicLayouts/login')
					}}
				>
					账号密码登录
				</div>
				<div className="font">
					<input type="checkbox" /> 我已阅读并同意<span>《链家隐私政策》</span>
					及<span>《链家用户使用协议》</span>
				</div>
			</div>
		</RegisterContainer>
	)
}

export default Register
