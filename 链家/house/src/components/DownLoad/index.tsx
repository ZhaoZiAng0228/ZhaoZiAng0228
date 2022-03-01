// 头部App组件
import { FC } from 'react'
// 引入样式
import styled from 'styled-components'
// 引入背景图
import { logoSmall } from 'assets/myImg'

// 样式表
const DownLoadContainer = styled.div`
	background: #f5f5f5;
	padding: 0.3rem;
	.box {
		border-radius: 0.3rem;
		background: #fff;
		display: flex;
		align-items: center;
		padding: 0.3rem;
		box-shadow: 0 0.02px 0.2rem rgb(0 0 0 / 15%);
		img {
			width: 1rem;
			height: 1rem;
		}
		.center {
			flex: 1;
			margin-left: 0.28rem;
			p:nth-of-type(1) {
				font-size: 0.3rem;
			}
			p:nth-of-type(2) {
				font-size: 0.24rem;
				margin-top: 0.16rem;
				color: #aaa;
			}
		}
		.btn {
			width: 1.7rem;
			height: 0.62rem;
			font-size: 0.3rem;
			background: #00ae66;
			color: #fff;
			text-align: center;
			line-height: 0.62rem;
			border-radius: 0.08rem;
		}
	}
`
export const DownLoad: FC<any> = (props: any) => {
	return (
		<DownLoadContainer>
			<div className="box">
				<img src={logoSmall} alt="" />
				<div className="center">
					<p>使用宏烨APP</p>
					<p>{props.tit}</p>
				</div>
				<div className="btn">立即打开</div>
			</div>
		</DownLoadContainer>
	)
}

export default DownLoad
