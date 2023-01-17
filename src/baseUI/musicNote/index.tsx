// @ts-nocheck
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import style from '../../assets/global-style';

const Container = styled.div`
  .icon_wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${style["theme-color"]};
    font-size: 14px;
    display: none;
    transform: translate3d(0, 0, 0); 
    //transition属性 从另一状态回到这种状态的transform要1s
    transition: transform 1s cubic-bezier(.62,-0.1,.86,.57);
    >div{
      //从正常到过渡实现的动画
      transition: transform 1s;
    }
  }
`

interface IRef {
  startAnimation: (...rest: any) => any
}

const MusicNote = forwardRef<IRef, {}>((props, ref) => {
  const iconsRef = useRef<HTMLDivElement>(null);
  // 容器中有3个字符，也就是同时只能有三个音符下落
  const ICON_NUMBER = 3;

  // 原生DOM操作，创建一个DOM节点
  const createNode = (txt: string) => {
    const template = `<div class="icon_wrapper">${txt}</div>`;
    let tempNode = document.createElement('div');
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  }

  useEffect(() => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      let node = createNode(`<div syle="color:'red'">开始播放</div>`)
      iconsRef.current?.appendChild(node as Node);
    }
    // 类数组转化为数组
    let domArray = [].slice.call(iconsRef.current?.children);
    domArray.forEach((item) => {
      item.running = false;
      item.addEventListener('transitionend', function () {
        this.style['display'] = 'none';
        this.style['transform'] = `translate3d(0, 0, 0)`;
        this.running = false;
        let icon = this.querySelector('div');
        icon.style['transform'] = `translate3d(0, 0, 0)`;
      }, false);
    })
  }, []);

  const startAnimation = ({ x, y }) => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      let domArray = [].slice.call(iconsRef.current.children)
      let item = domArray[i]
      // 选择一个空闲的元素来开始动画
      if (item.running === false) {
        item.style.left = x + "px";
        item.style.top = y + "px";
        item.style.display = "inline-block";

        setTimeout(() => {
          item.running = true;
          item.style['transform'] = `translate3d(0, 750px, 0)`;
          let icon = item.querySelector("div");
          icon.style['transform'] = `translate3d(-40px, 0, 0)`;
        }, 20);
        break;
      }
    }
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        startAnimation
      }
    },
  )

  return (
    <Container ref={iconsRef}></Container>
  )
});

export default React.memo(MusicNote);