import React, { useRef, useState, useCallback } from "react";
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from "./sytle";
import { useAppSelector, useAppDispatch } from "../../../store";
import {
  changeShowPlayList,
  changeCurrentIndex,
  changePlayMode,
  changePlayList,
  deleteSong,
  changeSequencePlayList,
  changeCurrentSong,
  changePlaying
} from "../feature";
import { CSSTransition } from "react-transition-group";
import { getName } from "../../../api/utils";
import { playMode } from "../../../api/config";
import Scroll from "../../../baseUI/scroll";
import {
  PlaySquareOutlined,
  RetweetOutlined,
  MenuOutlined,
  SwapOutlined,
  DeleteOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { ISong } from "../constants";
import Confirm from "../../../baseUI/confirm";
import { findIndex, shuffle } from "../../../api/utils";

interface IProps {
  setPre: (...res: any) => void
}

interface IRef {
  show: (...res: any) => void
}

const PlayList: React.FC<IProps> = (props) => {

  const { setPre } = props;

  const {
    showPlayList,
    currentIndex,
    currentSong,
    playList,
    sequencePlayList,
    mode,
  } = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();

  const playListRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  // 用来控制playListWrapper的显隐
  const [isShow, setIsShow] = useState<boolean>(false);
  // 用来控制确认框组件的
  const confirmRef = useRef<IRef>(null);

  const togglePlayList = (data: boolean) => {
    dispatch(changeShowPlayList(data));
  }

  // 动画效果
  const onEnter = () => {
    setIsShow(true);
    listWrapperRef!.current!.style['transform'] = `translate3d(0, 100%, 0)`
  }

  const onEnteringCB = () => {
    listWrapperRef!.current!.style['transition'] = "all 0.3s";
    listWrapperRef!.current!.style['transform'] = `translate3d(0, 0, 0)`;
  }

  const onExitingCB = () => {
    listWrapperRef!.current!.style['transition'] = "all 0.3s";
    listWrapperRef!.current!.style['transform'] = `translate3d(0, 100%, 0)`;
  }

  const onExitedCB = () => {
    setIsShow(false);
    listWrapperRef!.current!.style['transform'] = `translate3d(0, 0, 0)`;
  }

  // 正在播放的歌曲前面有图标
  const getCurrentIcon = (item: ISong) => {
    const current = currentSong.id === item.id;
    return (
      current ? <span className="iconfont"><PlaySquareOutlined></PlaySquareOutlined></span> : <span className="iconfont"> </span>
    )
  }

  // 根据mode获取图标
  const getIconByMode = (mode: playMode) => {
    switch (mode) {
      case playMode.loop:
        return (
          <div>
            <RetweetOutlined className="iconfont" onClick={(e) => { changeMode(e) }}></RetweetOutlined>
            <span className="text" onClick={(e) => { changeMode(e) }}>单曲循环</span>
          </div>
        )
      case playMode.sequence:
        return (
          <div>
            <MenuOutlined className="iconfont" onClick={(e) => { changeMode(e) }}></MenuOutlined>
            <span className="text" onClick={(e) => { changeMode(e) }}>顺序播放</span>
          </div>
        )
      case playMode.random:
        return (
          <div>
            <SwapOutlined className="iconfont" onClick={(e) => { changeMode(e) }}></SwapOutlined>
            <span className="text" onClick={(e) => { changeMode(e) }}>随机播放</span>
          </div>
        )
      default:
        return null;
    }
  }

  // 改变模式
  const changeMode = (e: React.MouseEvent) => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序播放
      dispatch(changePlayList(sequencePlayList));
      let index = findIndex(currentSong as ISong, sequencePlayList);
      dispatch(changeCurrentIndex(index));
    } else if (newMode === 1) {
      //单曲循环
      dispatch(changePlayList(sequencePlayList));
    } else if (newMode === 2) {
      //随机播放
      const newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong as ISong, newList);
      dispatch(changePlayList(newList));
      dispatch(changeCurrentIndex(index));
    }
    dispatch(changePlayMode(newMode));
  }

  // 改变currentIndex
  const handleChangeCurrentIndex = (index: number) => {
    if (currentIndex === index) {
      return;
    }
    dispatch(changeCurrentIndex(index));
  }

  // 删除歌曲
  const handleDeleteSong = (e: React.MouseEvent, song: ISong) => {
    e.stopPropagation();
    dispatch(deleteSong(song));
  }

  // 清空歌曲
  const clearDispatch = () => {
    // 1. 清空两个列表
    dispatch(changePlayList([]));
    dispatch(changeSequencePlayList([]));
    // 2. 初始化currentIndex
    dispatch(changeCurrentIndex(-1));
    // 3. 关闭PlayList的显示
    dispatch(changeShowPlayList(false));
    // 4. 当前歌曲置空
    dispatch(changeCurrentSong({}));
    // 5. 重置播放状态
    dispatch(changePlaying(false));
    // 上一首歌曲置空
    setPre();
  }

  // 对于Scroll事件要控制是否允许滑动事件生效(避免下滑的时候列表也跟随下滑)
  const [canTouch, setCanTouch] = useState<boolean>(true);
  const listContentRef = useRef(null);
  // touchStart后记录y的值
  const [startY, setStartY] = useState<number>(0);
  // touchStart事件是否已经触发
  const [initialed, setInitialed] = useState<boolean>(false);
  // 用户下滑的距离
  const [distance, setDistance] = useState<number>(0);

  const handleScroll = (pos: { x: number, y: number }) => {
    setCanTouch(pos.y === 0);
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!canTouch || initialed) {
      return;
    }
    listWrapperRef!.current!.style['transition'] = '';
    //记录当前的pageY
    setStartY(e.nativeEvent.touches[0].pageY);
    setInitialed(true);
    setDistance(0);
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!canTouch || !initialed) {
      return;
    }
    let distance = e.nativeEvent.touches[0].pageY - startY;
    if (distance < 0) {
      return;
    }
    setDistance(distance); //记录下滑距离
    listWrapperRef!.current!.style['transform'] = `translate3d(0, ${distance}px, 0)`;
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setInitialed(false);
    if (distance >= 150) {
      //大于150px则关闭playList
      dispatch(changeShowPlayList(false));
    } else {
      //反弹效果
      listWrapperRef!.current!.style["transition"] = "all 0.3s";
      listWrapperRef!.current!.style["transform"] = "translate3d(0px, 0px, 0px)";
    }
  }


  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnter}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      {/* 这里使用了很巧妙的逻辑，让PlayListWrapper铺满整个屏幕，上面绑定点击事件来模拟点击空白处弹窗消失，而不用在document中绑定事件 */}
      <PlayListWrapper
        ref={playListRef}
        style={isShow === true ? { display: "block" } : { display: "none" }}
        onClick={() => togglePlayList(false)}
      >
        <div
          className="list_wrapper"
          ref={listWrapperRef}
          onClick={(e: React.MouseEvent) => { e.stopPropagation(); }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ListHeader>
            <h1 className="title">
              {getIconByMode(mode)}
              <DeleteOutlined className="iconfont" onClick={() => { confirmRef.current?.show() }}></DeleteOutlined>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll
              ref={listContentRef}
              onScroll={pos => handleScroll(pos)}
              bounceTop={false}
            >
              <ListContent>
                {
                  playList.map((item: ISong, index: number) => {
                    return (
                      <li className="item" key={item.id} onClick={() => { handleChangeCurrentIndex(index) }}>
                        {getCurrentIcon(item)}
                        <span className="text">{item.name} - {getName(item.ar)}</span>
                        <span className="like"><HeartOutlined></HeartOutlined></span>
                        <span className="delete" onClick={(e) => handleDeleteSong(e, item)}><DeleteOutlined></DeleteOutlined></span>
                      </li>
                    )
                  })
                }
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
        <Confirm ref={confirmRef} text={'是否删除全部歌曲?'} cancelBtnText={'取消'} confirmBtnText={'确定'} handleConfirm={() => { clearDispatch() }}></Confirm>
      </PlayListWrapper>
    </CSSTransition>
  )
}

export default React.memo(PlayList);

