import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { Container, Menu, TopDesc } from './style';
import { CSSTransition } from 'react-transition-group';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../../baseUI/header';
import Scroll from "../../baseUI/scroll";
import { StepForwardOutlined, CommentOutlined, LikeOutlined, PlusOutlined, MoreOutlined } from "@ant-design/icons";
import style from '../../assets/global-style';
import { changeEnterLoading, getAlbumDetail } from "./feature";
import { useAppSelector, useAppDispatch } from "../../store";
import Loading from "../../baseUI/loading";
import SongList from "../SongList";
import MusicNote from "../../baseUI/musicNote";

//定义滚动触发滑动的高度
export const HEADER_HEIGHT = 45;

interface IRef {
  startAnimation: (...rest: any) => any
}

const Album: React.FC = () => {

  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState<boolean>(true);


  const [title, setTitle] = useState<string>('歌单');
  const [isMarquee, setIsMarquee] = useState<boolean>(false);
  const headerEl = useRef<HTMLDivElement>(null);
  const musicNoteRef = useRef<IRef>(null);

  const dispatch = useAppDispatch();
  const { currentAlbum, enterLoading } = useAppSelector(state => state.album);
  const { id } = useParams();
  useEffect(() => {
    dispatch(changeEnterLoading(true))
    dispatch(getAlbumDetail(id as string));
    dispatch(changeEnterLoading(false));
  }, [id]);

  //滚动逻辑
  const handleScroll = useCallback((pos: { x: number, y: number }) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDom = headerEl.current;
    //滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom!.style.backgroundColor = style["theme-color"];
      headerDom!.style.opacity = `${Math.min(1, (percent - 1) / 2)}`;
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom!.style.backgroundColor = "";
      headerDom!.style.opacity = "1";
      setTitle('歌单');
      setIsMarquee(false);
    }
  }, [currentAlbum])

  const renderTopDesc: React.FC = ({ }) => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <StepForwardOutlined />
              <span className="count">{Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万 </span>
            </div>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    )
  }

  const renderMenu: React.FC = ({ }) => {
    return (
      <Menu>
        <div>
          <div className="icon">
            <CommentOutlined />
          </div>
          评论
        </div>
        <div>
          <div className="icon">
            <LikeOutlined />
          </div>
          点赞
        </div>
        <div>
          <div className="icon">
            <PlusOutlined />
          </div>
          收藏
        </div>
        <div>
          <div className="icon">
            <MoreOutlined />
          </div>
          更多
        </div>
      </Menu>
    )
  }

  const renderSongList: React.FC = ({ }) => {
    return (
      <>
        <SongList
          songs={currentAlbum.tracks}
          collectCount={currentAlbum.subscribedCount}
          showCollect={true}
          showBackground={true}
          musicAnimation={musicAnimation}
        ></SongList>
      </>

    )
  }

  // 动画逻辑
  const musicAnimation = (x: number, y: number) => {
    musicNoteRef!.current!.startAnimation({ x, y });
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => { navigate(-1) }}
    >
      <Container>
        {enterLoading ? <Loading></Loading> : null}
        <Header ref={headerEl} title={title} isMarquee={isMarquee} handleClick={() => { setShowStatus(false) }}></Header>
        <Scroll bounceTop={false} onScroll={handleScroll}>
          <div>
            {renderTopDesc({})}
            {renderMenu({})}
            {renderSongList({})}
          </div>
        </Scroll>
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>

  )
}

export default memo(Album);

