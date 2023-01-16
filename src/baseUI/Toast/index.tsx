import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import style from '../../assets/global-style';

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 50px;
  &.drop-enter{
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  &.drop-enter-active{
    opacity: 1;
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
  }
  &.drop-exit-active{
    opacity: 0;
    transition: all 0.3s;
    transform: translate3d(0, 100%, 0);
  }
  .text {
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: ${style["font-size-l"]};
  }
`

interface IRef {
  show: (...rest: any) => any
}

interface IProps {
  text: string;
  children?: any
}

const Toast = forwardRef<IRef, IProps>((props, toastref) => {
  const [show, setShow] = useState<boolean>(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const { text } = props;

  // 通过透传ref, 外面组件可以拿到其中方法
  useImperativeHandle(
    toastref,
    () => {
      return {
        show() {
          if (timer) {
            clearTimeout(timer);
          }
          setShow(true);
          setTimer(setTimeout(() => {
            setShow(false);
          }, 300));
        }
      }
    }
  )
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames={'drop'}
      unmountOnExit
    >
      <ToastWrapper>
        <div className="text">{text}</div>
      </ToastWrapper>
    </CSSTransition>
  )
})

export default React.memo(Toast);