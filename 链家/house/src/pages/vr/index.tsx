import React, { useEffect } from 'react'
import start from '../../utils/vr'
import styled from 'styled-components'

const VrStyle = styled.div`
	.root {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 0;
		cursor: pointer;

		.content {
			margin-top: 50px;
		}

		.img {
			margin-top: 50px;
			margin-bottom: 50px;
			width: 500px;
		}
	}
`

export const VR: React.FC<any> = () => {
	useEffect(() => {
		start()
	}, [])
	return (
		<VrStyle>
			{/* <div>Next.js VR</div> */}
			<div id="vrApp"></div>
		</VrStyle>
	)
}
export default VR
