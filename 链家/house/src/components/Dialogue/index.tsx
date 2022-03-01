// 头部导航组件
import { FC } from 'react'
// 引入样式
import styled from 'styled-components'
// 引入背景图
import { dialogue } from 'assets/myImg'
import { Toast } from 'antd-mobile'
// 样式表
const DialogueContainer = styled.div`
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
`
export const Dialogue: FC<any> = (props: any) => {
	return (
		<DialogueContainer
			onClick={() => {
				if (localStorage.getItem('token')) {
					props.history.push('/blankLayouts/session')
				} else {
					Toast.show({
						icon: 'fail',
						content: '请先登录'
					})
				}
			}}
		>
			<img src={dialogue} alt="" />
		</DialogueContainer>
	)
}
