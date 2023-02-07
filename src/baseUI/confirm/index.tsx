import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import style from '../../assets/global-style';

// 动画效果
const confirmFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const confirmZoom = keyframes`
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.1);
  }
  100%{
    transform: scale(1);
  }
`

// 外面蒙层
const ConfirmWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style["background-color-shadow"]};
  &.confirm-fade-enter-active{
    animation: ${confirmFadeIn} 0.3s;
    .confirm_content{
      animation: ${confirmZoom} 0.3s
    }
  }
  >div{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 100;
    .confirm_content{
      width: 270px;
      border-radius: 13px;
      background: ${style["highlight-background-color"]};
      .text{
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: ${style["font-size-l"]};
        color: ${style["font-color-desc-v2"]};
      }
      .operate{
        display: flex;
        align-items: center;
        text-align: center;
        font-size: ${style["font-size-l"]};
        .operate_btn{
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid ${style["border-color"]};
          color: ${style["font-color-desc"]};
          &.left{
            border-right: 1px solid ${style["border-color"]};
          }
        }
      }
    }
  }
`

interface IProps {
  text: string,
  cancelBtnText: string,
  confirmBtnText: string,
  handleConfirm: (...res: any) => any
}

interface IRef {
  show: (...res: any) => void
}

const Confirm = forwardRef<IRef, IProps>((props, ref) => {
  const [show, setShow] = useState<boolean>(false);
  const { text, cancelBtnText, confirmBtnText, handleConfirm } = props;

  useImperativeHandle(
    ref,
    () => {
      return {
        show() {
          setShow(true);
        }
      }
    })

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="confirm-fade"
    >
      <ConfirmWrapper
        style={{ display: show ? 'block' : 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="confirm_content">
            <p className="text">{text}</p>
            <div className="operate">
              <div className="operate_btn left" onClick={() => setShow(false)}>{cancelBtnText}</div>
              <div className="operate_btn" onClick={() => { setShow(false); handleConfirm(); }}>{confirmBtnText}</div>
            </div>
          </div>
        </div>
      </ConfirmWrapper>
    </CSSTransition>
  )
})

export default React.memo(Confirm);