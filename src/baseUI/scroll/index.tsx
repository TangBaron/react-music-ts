import React, { useState, useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import styled from 'styled-components';
import Loading from '../loading';
import LoadingV2 from '../loading_v2';
import _ from 'lodash';

BScroll.use(ObserveDOM)
BScroll.use(MouseWheel)
BScroll.use(ScrollBar)
BScroll.use(PullDown)
BScroll.use(Pullup)

//传入参数
interface IProps {
  // 滚动方向
  direction: 'vertical' | 'horizental',
  // 是否支持点击
  click: boolean,
  // 是否刷新
  refresh: boolean,
  //滑动触发的回调函数
  onScroll: (...rest: any) => any,
  //上拉加载逻辑
  pullUp: (...rest: any) => any,
  //下拉加载逻辑
  pullDown: (...rest: any) => any,
  //上拉加载动画
  pullUpLoading: boolean,
  //下拉加载动画
  pullDownLoading: boolean,
  //吸顶效果
  bounceTop: boolean,
  //吸底效果
  bounceBottom: boolean,
  children: any
}

//获得的ref
export interface IRef {
  refresh: (...rest: any) => any | undefined,
  getBScroll: (...rest: any) => BScrollConstructor | undefined
}


// Scroll容器
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

// PullUpLoading
const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`

//PullDownLoading
const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

// es6解构语法提供默认值
const Scroll = forwardRef<IRef, Partial<IProps>>(({
  direction = 'vertical',
  click = true,
  refresh = true,
  onScroll = null,
  pullUp = null,
  pullDown = null,
  pullUpLoading = false,
  pullDownLoading = false,
  bounceTop = true,
  bounceBottom = true,
  children
}, scrollRef) => {
  const [bScroll, setBScroll] = useState<BScrollConstructor | null>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 创建better-scroll
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current as HTMLDivElement, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      //probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
      probetype: 3,
      //  可以使用原生的点击
      click: click,
      //  检测dom变化
      observeDOM: true,
      //  鼠标滚轮设置
      // mouseWheel: {
      //   speed: 20,
      //   invert: false,
      //   easeTime: 300
      // },
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      },
      //  过度动画, 在下载更多的时候滚动条会有个过度动画
      useTransition: true,
      //  下拉刷新
      pullDownRefresh: {
        threshold: 70,
        stop: 0
      },
      //  上拉加载更多
      pullUpLoad: {
        threshold: 90,
        stop: 10
      }
    });
    setBScroll(scroll);
    setTimeout(() => {
      scroll.refresh();
    }, 1000);
    return () => {
      setBScroll(null);
    }
  }, []);

  // children改变后都要刷新一下
  useEffect(() => {
    if (bScroll) {
      bScroll.refresh();
      bScroll?.finishPullDown();
      bScroll?.finishPullUp();
    }
  }, [children])

  //绑定scroll事件
  useEffect(() => {
    if (!bScroll || !onScroll) {
      return;
    }
    bScroll.on('scroll', (scroll: any) => {
      onScroll(scroll);
    })
    return () => {
      bScroll.off('scroll');
    }
  }, [bScroll, onScroll]);

  const pullUpDebounce = useCallback(_.debounce(pullUp !== null ? pullUp : () => { }, 500), [pullUp])

  const pullDownDebounce = useCallback(_.debounce(pullDown !== null ? pullDown : () => { }, 500), [pullDown]);

  //上拉到底调用上拉加载数据的函数
  useEffect(() => {
    if (!bScroll && !pullUp) {
      return;
    }
    if (bScroll && pullUp) {
      bScroll.on('pullingUp', () => {
        pullUpDebounce();
        setTimeout(() => {
          bScroll?.finishPullUp()
          bScroll.refresh();
        }, 500);
      })
    }
    return () => {
      bScroll?.off('pullingUp');
    }
  }, [pullUp, pullUpDebounce, bScroll]);

  //下拉刷新
  useEffect(() => {
    if (!bScroll && !pullDown) {
      return;
    }
    if (bScroll && pullDown) {
      bScroll.on('pullingDown', () => {
        pullDownDebounce();
        setTimeout(() => {
          bScroll?.finishPullDown();
          bScroll.refresh();
        }, 500);
      })
    }
    return () => {
      bScroll?.off('pullingDown');
    }
  }, [pullDown, pullDownDebounce, bScroll]);

  //每次渲染都要刷新实例，防止无法滑动(如果不加依赖项，该函数会在挂载，更新和退出时候都会执行)
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
      bScroll?.finishPullDown();
      bScroll?.finishPullUp();
    }
  })

  // 向外暴露方法
  useImperativeHandle(
    scrollRef,
    () => {
      return {
        refresh() {
          if (bScroll) {
            bScroll.refresh();
            bScroll.scrollTo(0, 0);
          }
        },
        getBScroll() {
          if (bScroll) {
            return bScroll;
          }
        }
      }
    }
  )

  const PullUpdisplayStyle = pullUpLoading ? { display: "" } : { display: "none" };
  const PullDowndisplayStyle = pullDownLoading ? { display: "" } : { display: "none" };
  return (
    <ScrollContainer ref={scrollContainerRef}>
      {children}
      {/* 滑动到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}>
        <LoadingV2></LoadingV2>
      </PullUpLoading>
      <PullDownLoading style={PullDowndisplayStyle}>
        <Loading></Loading>
      </PullDownLoading>
    </ScrollContainer>
  )
})

export default Scroll;
