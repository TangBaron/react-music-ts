// 扩大可点击区域的样式
const extendClick = () => {
  return `
    position: relative;
    &:before {
      content: '';
      position: 'absolute';
      top:-10px;
      bottom: -10px;
      left: -10px;
      right: -10px;
    }
  `
}

// 一行文字溢出用...代替
const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

// 设定needle和CD图片的位置, 把图片放在中间
const bgFull = () => {
  return `
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  `
}

export default {
  'theme-color': '#d44439',
  'theme-color-shadow': 'rgba(212, 68, 57, .5)',
  'font-color-light': '#f1f1f1',
  'font-color-desc': '#2E3030',
  'font-color-desc-v2': '#bba8a8',// 略淡
  'font-size-ss': '10px',
  'font-size-s': '12px',
  'font-size-m': '14px',
  'font-size-l': '16px',
  'font-size-ll': '18px',
  "border-color": '#e4e4e4',
  'background-color': '#f2f3f4',
  'background-color-shadow': 'rgba(0, 0, 0, 0.3)',
  'highlight-background-color': '#fff',
  // 下面的border-color-v2是灰色边框
  "border-color-v2": "rgba(228, 228, 228, 0.1)",
  extendClick,
  noWrap,
  bgFull
}