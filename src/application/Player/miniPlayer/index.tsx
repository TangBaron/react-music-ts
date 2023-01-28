import React, { useRef } from "react";
import { getName } from "../../../api/utils";
import { MiniPlayerContainer } from "./style";
import { PauseOutlined, BarsOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { IProps } from "../constants";
import { CSSTransition } from "react-transition-group";
import ProgressCircle from "../../../baseUI/progress_circle";

const MiniPlayer = (props: IProps) => {
  const {
    song,
    fullScreen,
    playing,
    percent,
    toggleFullScreen,
    togglePlayList,
    clickPlaying,
  } = props;
  const miniPlayerRef = useRef<HTMLDivElement>(null);

  const handleTogglePlayList = (e: React.MouseEvent) => {
    togglePlayList(true);
    e.stopPropagation();
  }

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      // 这里不是用的mountEnter, 用的是钩子实现
      onEnter={() => {
        miniPlayerRef!.current!.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef!.current!.style.display = "none";
      }}
    >
      <MiniPlayerContainer ref={miniPlayerRef} onClick={() => toggleFullScreen(true)}>
        <div className="icon">
          <div className="imgWrapper">
            <img width="40" height="40" src={song.al.picUrl} alt="img" className={`play ${playing ? '' : 'pause'}`} />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            {
              !playing ? (
                <PlayCircleOutlined className="iconfont icon-mini" onClick={e => clickPlaying(e, true)} />
              ) : (
                <PauseOutlined className="iconfont icon-mini" onClick={e => clickPlaying(e, false)} />
              )
            }
          </ProgressCircle>
        </div>
        <div className="control" onClick={handleTogglePlayList}>
          <BarsOutlined className="iconfont" />
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer);