// import { FC } from 'react'
import { FC, useState, useEffect } from 'react'
import { Uploader } from 'react-vant'
import { FetchRegister, GetYzm, FetchUpload, FetchLogin } from 'api'
// import axios from 'utils/request'

export const Ceshi: FC<any> = () => {
	useEffect(() => {
		GetYzm().then((res: any) => {
			console.log(res)
			setYzm(res.data.yzm)
		})
	}, [])

	const [user, setUser] = useState<any>({
		username: '',
		password: ''
	})
	const [yzm, setYzm] = useState<any>('')
	const [useryzm, setUseryzm] = useState<any>('')
	const [img, setImg] = useState<any>('')

	const login = async () => {
		const res = await FetchLogin({
			...user,
			yzm: useryzm.toLocaleUpperCase()
		})

		console.log(res)
	}

	const reg = async () => {
		const res = await FetchRegister({
			...user,
			yzm: useryzm.toLocaleUpperCase()
		})

		console.log(res)
	}

	const change = (e: any, type: any) => {
		console.log(e)

		setUser({
			...user,
			[type]: e
		})
	}
	const changeyzm = (e: any) => {
		console.log(e)

		setUseryzm(e)
	}

	const upload = async (file: any) => {
		let form = new FormData()
		form.append('file', file.file)
		form.append('fileName', file.file.name)
		console.log(form)
		const res = await FetchUpload(form)

		console.log(res)

		if (res.data.code === 200) {
			setImg(res.data.url)
		}
	}
	return (
		<div>
			账号
			<input
				type="text"
				style={{ border: '1px #000 solid' }}
				value={user.username}
				onChange={(e) => change(e.target.value, 'username')}
			/>
			密码
			<input
				type="password"
				style={{ border: '1px #000 solid' }}
				value={user.password}
				onChange={(e) => change(e.target.value, 'password')}
			/>
			验证码
			<input
				type="text"
				style={{ border: '1px #000 solid' }}
				value={useryzm}
				onChange={(e) => changeyzm(e.target.value)}
			/>
			<span>{yzm}</span>
			<button onClick={reg}>注册</button>
			<button onClick={login}>登录</button>
			<Uploader afterRead={(file) => upload(file)}></Uploader>
			<img src={img} alt="" />
		</div>
	)
}

export default Ceshi
