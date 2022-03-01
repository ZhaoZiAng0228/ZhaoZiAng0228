import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	/* font-size: 100%; */
	/* font: inherit; */
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
//加 vw vh
html,body,#root{
    width:100%;
    height: 100%;
	box-sizing: border-box;
}
// rem适配
// 1rem = 100px 2倍图
// 375px图上 看到的字体是50px
// 750px图上 看到的字体是100px
html{
    font-size: calc(100 / 750 * 100vw);
}
body {
	line-height: 1;
	font-size: 0.32rem;

}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
.footer-put {
		display: flex;
		justify-content: space-between;
		.footer-left{
			width: 15%;
			margin-right: 0.1rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			.rv-badge__wrapper,.van-icon,.van-icon-exchange{
				font-size: 0.46rem;
			}
			p{
				width: 100%;
				text-align: center;
			}
		}
	}	
	.price-between {
		display: flex;
		align-items: center;
		input{
			text-align: center;
		}
		input::-ms-input-placeholder{
        text-align: center;
        }
        input::-webkit-input-placeholder{
        text-align: center;
        }
	}
	.price-title{
		margin: 0.3rem;
		font-size: 0.38rem;
		font-weight: bolder;
	}
	.adm-grid{
		font-size:0.2rem;
	}
	.adm-list,.adm-list-default{
		min-height: 4rem;
		max-height: 6.6rem;
		overflow-y: scroll !important;


	}
	.sort-pick{
		display: flex;
		flex-direction: column;
		padding: 0.2rem 0.5rem;
		justify-content: center;
		p{
			height: 0.6rem;
			font-size: 0.3rem;
			display: flex;
			align-items: center;
			&.active{
				color: #1677FF;
			}
		}
	}

`