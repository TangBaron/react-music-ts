import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* 去掉浏览器的默认样式, 浏览器的font-size标准值为16px */
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
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
  /* 适用于旧浏览器的HTML5元素的重置 */
  article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
  /* 默认的行高为1.5倍行高 */
  body {
    line-height: 1.5;
  }
  /* 背景颜色淡蓝 */
  html, body {
    background-color: #f2f3f4;
  }
  /* 去掉有序和无序列表的list-style， 前面的序号或图形 */
  ol, ul{
    list-style: none;
  }
  /* 去掉引用的引号 */
  blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
  /* border-collapse设置表格边框相邻单元格是共享的,  */
  table {
		border-collapse: collapse;
    /* 如果border-spaceing在border-collapse为separate的时候space为0 */
		border-spacing: 0;
	}
  /* 取消链接下划线, 颜色为红色 */
	a {
		text-decoration: none;
		color: #fff;
	}
`