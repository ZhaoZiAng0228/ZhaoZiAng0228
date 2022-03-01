import { FC } from 'react'
import { RouterView } from '../router'
import styled from 'styled-components'
export const BlankLayout: FC = (props: any) => {
	const BlankContainer = styled.div`
		background: #f7f7f7;
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		main {
			flex: 1;
			overflow-y: scroll;
		}
	`
	return (
		<BlankContainer className="BlankContainer">
			<RouterView routes={props.routes}></RouterView>
		</BlankContainer>
	)
}

export default BlankLayout
