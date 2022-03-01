// 关注房源
import { FC, useState } from 'react'
// 引入样式
import styled from 'styled-components'
import { Selector } from 'antd-mobile'
// 引入背景图
import { xiazai, xiazai2, logoSmall } from 'assets/myImg'
import { TextArea } from 'antd-mobile'
// 引入icon
import { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2863207_wmt597fhxt.js' // 在 iconfont.cn 上生成
})

// 样式表
const MiandaraoContainer = styled.div`
	width: 100%;
	height: 100%;
	background: #f5f5f5;

	display: flex;
	flex-direction: column;
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 0.88rem;
		background: #fff;
		.left {
			display: flex;
			align-items: center;
			& > img {
				width: 0.44rem;
				height: 0.44rem;
				margin-left: 0.24rem;
			}
			span {
				font-size: 0.34rem;
				font-weight: bold;
				color: #00b45b;
				margin-left: 0.1rem;
			}
		}
		.right {
			display: flex;
			& > div {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 0.2rem;
				span {
					font-size: 0.22rem;
					margin-top: 0.05rem;
				}
				img {
					width: 0.32rem;
					height: 0.32rem;
				}
			}
		}
	}
	.container {
		flex: 1;
		overflow: auto;
		position: relative;
		width: 100%;
		height: 100%;
		.open {
			text-align: center;
			border-top: 0.01rem solid #f5f5f5;
			border-bottom: 0.01rem solid #f5f5f5;
			p:nth-of-type(1) {
				font-size: 0.4rem;
				padding: 0.34rem 0.28rem;
				font-weight: bold;
			}
			p:nth-of-type(2) {
				font-size: 0.26rem;
				padding-bottom: 0.3rem;
				color: #aaa;
			}
		}
		.form_list {
			background: #fff;
			padding-left: 0.3rem;
			& > h3 {
				font-size: 0.3rem;
				height: 0.86rem;
				line-height: 0.86rem;
				font-weight: normal;
				color: #aaa;
			}
			.user_tel {
				width: 100%;
				height: 0.86rem;
				border: none;
				outline: none;
				border-top: 0.01rem solid #f5f5f5;
				font-size: 0.3rem;
			}
			input::-webkit-input-placeholder {
				color: #aaa;
			}
			.user_code {
				width: 100%;
				height: 0.86rem;
				border: none;
				outline: none;
				border-top: 0.01rem solid #f5f5f5;
				border-bottom: 0.01rem solid #f5f5f5;
				display: flex;
				align-items: center;
				font-size: 0.3rem;
				input {
					flex: 1;
					border: none;
					outline: none;
				}
				input::-webkit-input-placeholder {
					color: #aaa;
				}
				span {
					height: 100%;
					color: #33be85;
					line-height: 0.86rem;
					padding: 0 0.3rem;
					font-size: 0.22rem;
					border-left: 0.01rem solid #f5f5f5;
				}
			}
			.cause {
				border-bottom: 0.01rem solid #f5f5f5;
				margin-bottom: 0.2rem;
				h3 {
					font-size: 0.3rem;
					padding: 0.34rem 0;
					font-weight: normal;
				}
				.cause_box {
					padding-bottom: 0.3rem;
					.adm-selector-item {
						font-size: 0.24rem;
					}
					.adm-selector-check-mark-wrapper {
						display: none;
					}
					.adm-selector-item-multiple-active {
						background-color: #e0f5ec;
						color: #33be85;
					}
				}
			}
		}
		/* 电话 */
		.tel {
			padding: 0.3rem;
			p {
				font-size: 0.22rem;
				color: #394043;
				span {
					color: #00ae6a;
				}
			}
		}
		/* 电话营销 */
		.marketing {
			display: flex;
			justify-content: space-between;
			padding: 0.34rem 0.3rem;
			background: #fff;
			p {
				font-size: 0.3rem;
			}
			.anticon {
				font-size: 0.3rem;
				color: #aaa;
			}
		}
		/* 确认提交  */
		.submit {
			padding: 0.3rem 0.2rem 0.3rem 0.2rem;

			div {
				height: 0.8rem;
				line-height: 0.8rem;
				text-align: center;
				background-color: #39ac6a;
				color: #fff;

				font-size: 0.3rem;
			}
		}
	}
	/* 弹框 */
	.mask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);

		.overlayContent {
			width: 6.7rem;
			height: 5.3rem;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: white;
			border-radius: 0.1rem;
			display: flex;
			flex-direction: column;
			.top {
				flex: 1;
				.info {
					margin: 0.4rem;
					font-size: 0.3rem;
					color: #7b8082;
					line-height: 0.38rem;
					letter-spacing: 0.01rem;
				}
			}
			.bottom {
				display: flex;

				border-top: 0.01rem solid #ccc;
				span {
					width: 50%;
					color: #33be85;
					font-size: 0.3rem;
					text-align: center;
					line-height: 1rem;
				}
				span:nth-of-type(1) {
					border-right: 0.01rem solid #ccc;
				}
			}
		}
	}
`
export const Miandarao: FC<any> = (props: any) => {
	const [value, setValue] = useState([])
	// 文本域的值
	const [val, setVal] = useState('')
	// 弹框显示与否
	const [visible, setVisible] = useState(false)
	const ItemList = [
		{
			label: '我不买房',
			value: '我不买房',
			id: 1
		},
		{
			label: '我不卖房',
			value: '我不卖房',
			id: 2
		},
		{
			label: '来电太频繁',
			value: '来电太频繁',
			id: 3
		},
		{
			label: '不想接到电话',
			value: '不想接到电话',
			id: 4
		},
		{
			label: '电话打扰生活',
			value: '电话打扰生活',
			id: 5
		},
		{
			label: '上班时间太多',
			value: '上班时间太多',
			id: 6
		}
	]
	return (
		<MiandaraoContainer>
			<div className="head">
				<div className="left">
					<img
						src={logoSmall}
						alt=""
						onClick={() => {
							props.history.push('/basicLayouts/home')
						}}
					/>
					<span>宏烨找房</span>
				</div>

				<div className="right">
					<div
						onClick={() => {
							props.history.push('/basicLayouts/my')
						}}
					>
						<img src={xiazai} alt="" />
						<span>我的</span>
					</div>
					<div>
						<img src={xiazai2} alt="" />
						<span>下载</span>
					</div>
				</div>
			</div>
			<div className="container">
				{/* 开通电话 */}
				<div className="open">
					<p>开通免电话营销</p>
					<p>我们承诺1年内不会接到北京宏烨经纪人的营销电话</p>
				</div>
				{/* 选择原因 */}
				<div className="form_list">
					<h3>北京</h3>
					<input
						className="user_tel"
						type="text"
						placeholder="请输入您的联系电话"
					/>

					<div className="user_code">
						<input type="text" placeholder="请输入验证码" />
						<span>获取验证码</span>
					</div>
					{/* 原因 */}
					<div className="cause">
						<h3>请选择原因</h3>
						<div className="cause_box">
							<Selector
								options={ItemList}
								value={value}
								multiple={true}
								onChange={(arr: any) => setValue(arr)}
							/>
						</div>
					</div>
					<TextArea
						value={val}
						placeholder="其它原因此输入..."
						rows={5}
						onChange={(e: any) => {
							setVal(e)
						}}
					/>
				</div>
				{/* 电话 */}
				<div className="tel">
					<p>
						如需屏蔽固定电话请拨打<span>10109666</span>，人工客服为您操作设定
					</p>
				</div>
				{/* 电话营销 */}

				<div className="marketing" onClick={() => setVisible(true)}>
					<p>何为免电话营销</p>
					<IconFont type="icon-youjiantou" />
				</div>

				<div className="submit">
					<div>确认提交</div>
				</div>
			</div>
			{/* 弹框 */}

			{visible ? (
				<div className="mask">
					<div className="overlayContent">
						<div className="top">
							<div className="info">
								自2016年12月1日起，北京地区客户可开通“免电话营销”功能，开通成功后1年内，北京宏烨承诺不会通过电话向您询问、介绍、提供房屋出售/出租相关信息。该功能可随时申请取消。在开通“免电话营销”功能期间，若接到了北京宏烨经纪人向您询问、介绍、提供房屋出售/出租相关信息的电话，客户可向宏烨投诉，经宏烨客服确认属实的，每个来电号码赔100元。
							</div>
						</div>
						<div className="bottom">
							<span>查看细则</span>
							<span onClick={() => setVisible(false)}>我知道了</span>
						</div>
					</div>
				</div>
			) : (
				''
			)}
		</MiandaraoContainer>
	)
}
export default Miandarao
