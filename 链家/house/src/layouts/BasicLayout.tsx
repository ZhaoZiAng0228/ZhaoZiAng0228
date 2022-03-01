import { FC } from 'react'
import styled from 'styled-components'
import { RouterView, routes } from 'router/index'
// import { FooterBar } from 'components'

const BasicContainer = styled.div`
	width: 100%;
	height: 100%;
	background: #f7f7f7;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.main {
		flex: 1;
		overflow-y: scroll;
	}
	/* .footer-bar {
		height: 1rem;
		background: #fffffe;
		display: flex;
		align-items: center;
	} */
`

export const BasicLayout: FC = (props: any) => {
	return (
		<BasicContainer className="container">
			<main className="main">
				<RouterView routes={props.routes}></RouterView>
			</main>
			{/* <FooterBar /> */}
		</BasicContainer>
	)
}

export default BasicLayout
