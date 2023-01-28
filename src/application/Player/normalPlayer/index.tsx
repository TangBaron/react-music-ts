import React, { useRef } from "react";
import { getName, formatPlayTime } from "../../../api/utils";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  CDWrapper,
  Bottom,
  ProgressWrapper,
  Operators,
} from './style';
import {
  LeftOutlined,
  StepForwardOutlined,
  StepBackwardOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  BarsOutlined,
  RetweetOutlined,
  SwapOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { INormalProps } from "../constants";
import { CSSTransition } from "react-transition-group";
import animations from 'create-keyframe-animation';
import ProgressBar from "../../../baseUI/progress_bar";
import { playMode } from "../../../api/config";

const NormalPlayer = (props: INormalProps) => {
  const {
    song,
    fullScreen,
    playing,
    percent,
    duration,
    currentTime,
    toggleFullScreen,
    togglePlayList,
    clickPlaying,
    onProgressChange,
    handlePrev,
    handleNext,
    mode,
    changeMode
  } = props;
  const normalPlayerRef = useRef<HTMLDivElement>(null);
  const cdWrapperRef = useRef<HTMLDivElement>(null);

  // 获取miniPlayer图片中心相对于normalPlayer唱片中心的偏移
  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;

    // 不包含浏览器的工具栏等的宽度
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;

    //两个圆心的横坐标
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;

    return {
      x,
      y,
      scale
    }
  }

  const enter = () => {
    normalPlayerRef.current!.style.display = "block";
    const { x, y, scale } = _getPosAndScale();//获取miniPlayer图片中心相对normalPlayer唱片中心的偏移
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear"
      }
    });
    animations.runAnimation(cdWrapperRef.current as HTMLDivElement, "move");
  };

  const afterEnter = () => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation("move");
    cdWrapperDom!.style.animation = "";
  };

  const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "all 0.4s";
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style['transform'] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }

  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style['transform'] = "";
    // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍 
    // 不置为 none 现在全屏播放器页面还是存在
    normalPlayerRef!.current!.style.display = "none";
  }

  // 根据mode获取图标
  const getIconByMode = (mode: playMode) => {
    switch (mode) {
      case playMode.loop:
        return <RetweetOutlined className="iconfont"></RetweetOutlined>
      case playMode.sequence:
        return <MenuOutlined className="iconfont"></MenuOutlined>
      case playMode.random:
        return <SwapOutlined className="iconfont"></SwapOutlined>
      default:
        return null;
    }
  }

  const handleTogglePlayList = (e: React.MouseEvent) => {
    togglePlayList(true);
    e.stopPropagation();
  }

  return (
    <CSSTransition
      in={fullScreen}
      timeout={400}
      classNames="normal"
      // 只有在in为true的时候才去挂载这个组件, 达到控制组件的效果
      mountOnEnter
      // 下面还有一些钩子
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={song.al.picUrl + "?param=300x300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <LeftOutlined className="iconfont"></LeftOutlined>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className={`image play ${playing ? '' : 'pause'}`}
                src={song.al.picUrl + "?param=400x400"}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar percent={percent} percentChange={onProgressChange!}></ProgressBar>
            </div>
            <div className="time time-r">{formatPlayTime(duration)}</div>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left" onClick={changeMode}>
              {getIconByMode(mode)}
            </div>
            <div className="icon i-left" onClick={handlePrev}>
              <StepBackwardOutlined className="iconfont"></StepBackwardOutlined>
            </div>
            <div className="icon i-center">
              {
                !playing ? (
                  <PlayCircleOutlined className="iconfont" onClick={(e) => { clickPlaying(e, true) }}></PlayCircleOutlined>
                ) : (
                  <PauseCircleOutlined className="iconfont" onClick={(e) => { clickPlaying(e, false) }}></PauseCircleOutlined>
                )
              }
            </div>
            <div className="icon i-right" onClick={handleNext}>
              <StepForwardOutlined className="iconfont"></StepForwardOutlined>
            </div>
            <div className="icon i-right" onClick={handleTogglePlayList}>
              <BarsOutlined className="iconfont"></BarsOutlined>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition >
  )
}

export default React.memo(NormalPlayer);