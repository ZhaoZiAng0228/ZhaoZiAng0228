import React from 'react'
import styled from 'styled-components'
import { Selector, Form, Button, Dialog, Input } from 'antd-mobile'
import { Icon } from 'react-vant'
import { forPrice, forRoom } from 'store/second/secondSlice'
import { GET_RENT_LIST } from 'store/rent/rentSlice'
import { FindRentMore, ForMore } from 'api'
import { AppDispatch } from 'store/store'
import { useDispatch } from 'react-redux'

const CardStyle = styled.div``

export const ChoiceCard: React.FC<any> = (props) => {
	const dispatch = useDispatch<AppDispatch>()

	// const state = useAppSelector((state) => state)

	const onFinish = (values: any) => {
		// const res = JSON.stringify(values)
		// console.log(JSON.parse(res))
		// console.log('values===============', values)
		// Dialog.alert({
		// 	content: JSON.stringify(values)
		// })

		console.log(props.topic)

		if (props.topic === '更多') {
			ForMore({ ...JSON.parse(JSON.stringify(values)) }).then((res) => {
				console.log(res)
			})
		}

		if (props.topic === '价格') {
			dispatch(forPrice({ ...JSON.parse(JSON.stringify(values)) }))
		}

		if (props.topic === '房型') {
			dispatch(forRoom({ ...JSON.parse(JSON.stringify(values)) }))
		}

		if (props.topic === '筛选') {
			// dispatch(forRoom({ ...JSON.parse(JSON.stringify(values)) }))

			FindRentMore({
				...JSON.parse(JSON.stringify(values)),
				type: props.topic
			}).then((res) => {
				if (res.data.code === 1) {
					if (res.data.arr.length === 0) {
						alert('没有符合条件的数据')
					} else {
						dispatch(GET_RENT_LIST(res.data.arr))
					}
				} else {
					Dialog.alert({
						content: '筛选条件不足'
					})
				}
			})
		}

		// console.log(JSON.parse(JSON.stringify(values)))
	}

	return (
		<CardStyle>
			<Form
				onFinish={onFinish}
				footer={
					<div className="footer-put">
						<div className="footer-left">
							<Icon name="exchange" />
							<p>重置</p>
						</div>
						<Button block type="submit" color="primary">
							查看房源
						</Button>
					</div>
				}
			>
				{props.children?.length
					? props.children?.map((item: any) => {
							return (
								<div key={item.value}>
									<div className="price-title">{item.label}</div>
									<div className="price-between">
										{props.topic === '价格' ? (
											<>
												<Form.Item name="bottomPrice">
													<Input placeholder="最低价格" type="number" />
												</Form.Item>
												<p>至</p>
												<Form.Item name="peakPrice">
													<Input placeholder="最高价格" type="number" />
												</Form.Item>
											</>
										) : (
											''
										)}
									</div>
									<Form.Item name={item.value}>
										<Selector columns={4} multiple options={item.content} />
									</Form.Item>
								</div>
							)
					  })
					: ''}
			</Form>
		</CardStyle>
	)
}
export default ChoiceCard
