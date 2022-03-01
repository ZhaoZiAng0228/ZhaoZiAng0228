// 头部导航组件
import { FC, useEffect } from 'react'

// 引入样式
import styled from 'styled-components'
// 引入背景图
import { logoSmall } from 'assets/myImg'

// 引入icon
import { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_zvlwvw36o3.js' // 在 iconfont.cn 上生成
})

// 样式表
const HeaderNavContainer = styled.div`
	display: flex;
	height: 50px !important;
	background: #fff;
	align-items: center;
	padding: 0 0.3rem;
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
		display: flex;
		align-items: center;
		justify-content: center;

		.lianjia {
			width: 0.44rem;
		}
		span {
			font-size: 0.34rem;
			font-weight: bold;
			color: #00b45b;
			margin-left: 0.1rem;
		}
	}
	.left {
		font-size: 0.28rem;
		.pos {
			margin-left: 0.5rem;
			span {
				margin-right: 0.02rem;
			}
			.anticon {
				color: #9b9ea0;
			}
		}
	}
	.right {
		display: flex;
		justify-content: flex-end;
	}
`
export const HeaderNav: FC<any> = (props: any) => {
	useEffect(() => {}, [])
	return (
		<HeaderNavContainer className="headerNav">
			<div className="left">
				<IconFont
					type="icon-zuojiantou1"
					style={{
						fontSize: '.36rem',
						fontWeight: 'bold',
						color: '#04ab60'
					}}
					onClick={() => {
						props.history.go(-1)
					}}
				/>
				<div className="pos">
					<span>上海</span>
					<IconFont type="icon-xiala" />
				</div>
			</div>

			<div
				className="title"
				onClick={() => {
					props.history.push('/basicLayouts/home')
				}}
			>
				<img className="lianjia" src={logoSmall} alt="" />
				<span>{props.tit}</span>
			</div>

			<div className="right">
				<IconFont
					type="icon-yonghu"
					style={{
						fontSize: '.36rem',
						color: '#04ab60',
						fontWeight: 900
					}}
					onClick={() => {
						props.history.push('/basicLayouts/my')
					}}
				/>
			</div>
		</HeaderNavContainer>
	)
}

export default HeaderNav
