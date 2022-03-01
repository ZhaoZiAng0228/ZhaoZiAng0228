/*
 * @Author: your name
 * @Date: 2021-09-12 21:03:05
 * @LastEditTime: 2021-10-15 15:57:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \s_1901-a_student\day2\gy_demo\src\compontens\Swiper\Swiper.tsx
 */
import { FC } from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'
export const Swiper: FC<any> = (props: any) => {
	const SwiperContainer = styled.div`
		width: 100%;
		height: 100%;
		.img-item {
			width: 100%;
		}
	`
	return (
		<SwiperContainer>
			<Carousel autoplay infinite>
				{props.data ? props.data.map((item: any, index: number) => {
					return (
						<div className="items" key={index}>
							<img
								className="img-item"
								src={item.img}
								alt=""
								style={{
									height: `${props.size}rem`,
									borderRadius: `${props.radius}rem`
								}}
							/>
						</div>
					)
				}) : ''
				}

			</Carousel>
		</SwiperContainer>
	)
}
export default Swiper
