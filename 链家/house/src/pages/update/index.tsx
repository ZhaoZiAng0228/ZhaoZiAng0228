import React, { FC, useState } from 'react'
import { Uploader, Button } from 'react-vant'
import styled from 'styled-components'
import { UpDateImg, DownLoad } from 'api'

const MyUpdate = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	h2 {
		line-height: 40px;
		width: 100%;
		text-align: center;
	}

	.up {
		margin-top: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rv-button {
		margin-top: 30px;
		width: 80%;
	}
`

export const UpDate: FC<any> = (props) => {
	const [list, setList] = useState<any>([])
	const upload = async (file: any) => {
		const formData = new FormData()

		formData.append('file', file.file)
		await UpDateImg(formData).then((res) => {
			if (res.data.code === 1) {
				console.log(res.data)

				setList([...list, res.data.url])
			}
		})
	}

	const [demo, setDemo] = useState([
		{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
		// Uploader 根据文件后缀来判断是否为图片文件
		// 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
		{ url: 'https://cloud-image', isImage: true }
	])
	return (
		<MyUpdate>
			<h2>上传房源图</h2>

			<div style={{}}>
				{list.length
					? list.map((item: any, ind: any) => {
							return (
								<div key={ind}>
									<img
										style={{ width: '100%', height: '100%' }}
										src={item}
										alt=""
									/>
								</div>
							)
					  })
					: ''}
			</div>
			<div className="up">
				<Uploader afterRead={(file) => upload(file)} />
			</div>

			<Button
				type="primary"
				size="large"
				onClick={() => {
					props.history.push('/basicLayouts/my')
				}}
			>
				返回
			</Button>
		</MyUpdate>
	)
}

export default UpDate
