import React, { useState, useRef, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper } from './style';
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../baseUI/header";
import { PlusOutlined } from "@ant-design/icons";
import Scroll from "../../baseUI/scroll";
import SongList from '../SongList'
import { BScrollConstructor } from "@better-scroll/core/dist/types/BScroll";
import { useAppDispatch, useAppSelector } from "../../store";
import { getSingerInfo } from "./feature";
import Loading from "../../baseUI/loading";


interface IRef {
  refresh: (...rest: any) => any | undefined,
  getBScroll: (...rest: any) => BScrollConstructor | undefined
}

const Singer: React.FC = () => {
  const [showStatus, setShowStatus] = useState<boolean>(true);
  const navigate = useNavigate();

  const collectButton = useRef<HTMLDivElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const songScrollWrapper = useRef<HTMLDivElement>(null);
  const songScroll = useRef<IRef>(null);
  const header = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  // 图片初始高度
  const initialHeight = useRef<number>(0);

  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  // redux相关代码
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { artist, songsOfArtist: songs, loading } = useAppSelector(state => state.singer);

  useEffect(() => {
    dispatch(getSingerInfo(id as string));
  }, []);

  useEffect(() => {
    // 图片组件的高度, 这里使用offsetHeight是因为offsetHeight还会包括水平滚动条等宽度
    let h = imageWrapper.current?.offsetHeight;
    songScrollWrapper!.current!.style.top = `${h as number - OFFSET}px`;
    initialHeight.current = h as number;
    // 把遮罩先放在下面裹住歌曲列表
    layer!.current!.style.top = `${h as number - OFFSET}px`;
    songScroll.current?.refresh();
  }, [])

  // 这里做一个缓存函数的处理
  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback((pos: { x: number, y: number }) => {
    // Header的高度
    const headerHeight = 45;
    let height = initialHeight.current;
    // bs的纵轴坐标
    const newY = pos.y;
    // 拿到元素的DOM对象，方便操作
    const imageDom = imageWrapper.current;
    const buttonDom = collectButton.current;
    const headerDom = header.current;
    const layerDom = layer.current;
    // Scroll移动到header处需要移动的距离
    const minScrollY = -(height - OFFSET - headerHeight);
    //滑动距离占据图片高度的百分比
    const percent = Math.abs(newY / height);

    // 主要有三种逻辑
    // 1. 向下拉，图片放大，按钮跟随偏移
    if (newY > 0) {
      imageDom!.style["transform"] = `scale(${1 + percent})`;
      buttonDom!.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDom!.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      // 2. 往上滑动，但是遮罩还没超过 Header 部分
      layerDom!.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      // 保证遮罩层的优先级比图片高，不至于被挡住
      layerDom!.style.zIndex = '1';
      imageDom!.style.paddingTop = "75%";
      imageDom!.style.height = '0';
      imageDom!.style.zIndex = '-1';
      // 按钮跟着移动且渐渐变透明
      buttonDom!.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDom!.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      // 往上滑动超过了Header部分
      // 往上滑动，但是超过 Header 部分
      layerDom!.style.top = `${headerHeight - OFFSET}px`;
      layerDom!.style.zIndex = '1';
      // 防止溢出的歌单内容遮住 Header
      headerDom!.style.zIndex = '100';
      // 此时图片高度与 Header 一致
      imageDom!.style.height = `${headerHeight}px`;
      imageDom!.style.paddingTop = '0';
      imageDom!.style.zIndex = '99';
    }
  }, [])

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames='fly'
      appear={true}
      unmountOnExit
      onExited={() => { navigate(-1) }}
    >
      <Container play={0}>
        {loading ? <Loading></Loading> : null}
        <Header ref={header} title={artist.name} handleClick={setShowStatusFalse}></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <PlusOutlined className="iconfont"></PlusOutlined>
          <span className="text">收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongList
              showBackground={false}
              songs={songs}
              showCollect={false}
            ></SongList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}

export default Singer;