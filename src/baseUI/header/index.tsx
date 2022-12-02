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
  /* color: ${style['font-color-light']}; */
  color: 'black';
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

interface IProps {
  handleClick: (...res: any) => void,
  title: string
}

interface IRef {

}

// 这里处理函数组件拿不到ref的问题所以用forwardRef
const Header = forwardRef<IRef, IProps>(({
  handleClick = () => { },
  title = '标题'
}, ref) => {
  return (
    <HeaderContainer>
      <LeftOutlined className="back" onClick={handleClick} />
      <h1>{title}</h1>
    </HeaderContainer>
  )
})

export default memo(Header);
