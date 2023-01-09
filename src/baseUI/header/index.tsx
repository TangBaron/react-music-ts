import React, { forwardRef, memo } from "react";
import styled from "styled-components";
import style from '../../assets/global-style';
import { LeftOutlined } from "@ant-design/icons";

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0px;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style['font-color-light']};
  .back {
    display: flex;
    align-items: center;
    margin-right : 5px;
    font-size: 20px;
    width: 20px;
  }
  >h1 {
    font-size: ${style['font-size-l']};
    font-weight: 700;
  }
`

const Marquee = styled.div`
  width: 100%;
  height: 35px;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  .text {
    position: absolute;
    animation: marquee 10s linear infinite;
  }
  @keyframes marquee {
    from {
      transform: translateX(100%);
    }
    to{
      transform: translateX(-100%);
    }
  }
`

interface IProps {
  handleClick?: (...res: any) => void,
  title?: string,
  isMarquee?: boolean
}

type IRef = HTMLDivElement;

// 这里处理函数组件拿不到ref的问题所以用forwardRef
const Header = forwardRef<IRef, IProps>(({
  handleClick = () => { },
  title = '标题',
  isMarquee = false
}, ref) => {
  return (
    <HeaderContainer ref={ref}>
      <LeftOutlined className="back" onClick={handleClick} />
      {
        isMarquee ? <Marquee><div className="text"><h1>{title}</h1></div></Marquee> : <h1>{title}</h1>
      }
    </HeaderContainer>
  )
})

export default memo(Header);
