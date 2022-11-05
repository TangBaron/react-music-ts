import React from 'react';
import styled, { keyframes } from 'styled-components';
import style from '../../assets/global-style';

// styled-components编写动画
const loading = keyframes`
  0%, 100%{
    transform: scale(1);
  }
  50%{
    transform: scale(0.5);
  }
`

const LoadingWrapper = styled.div`
  >div{
    position: fixed;
    z-index: 1000;
    /* 这也是一种水平垂直居中的方法 */
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 60px;
    height: 60px;
    opacity: 0.6;
    border-radius: 50%;
    background-color: ${style['theme-color']};
    /* 注意这里keyframes的写法 */
    animation: ${loading} 1.4s infinite ease-in;
  }
  >div:nth-child(2){
    /* 这里的负值让开始第二个小圆从0.7s也就是最大状态开始，然后交替进行 */
    animation-delay: -0.7s;
  }
`

const Loading: React.FC = () => {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  )
}

export default React.memo(Loading);







