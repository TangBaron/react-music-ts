import React, { useRef } from "react";
import { getName } from "../../../api/utils";
import { MiniPlayerContainer } from "./style";
import { PauseOutlined, BarsOutlined } from "@ant-design/icons";
import { IProps } from "../constants";
import { CSSTransition } from "react-transition-group";

const MiniPlayer = (props: IProps) => {
  const { song, fullScreen, toggleFullScreen } = props;
  const miniPlayerRef = useRef<HTMLDivElement>(null);
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
            <img width="40" height="40" src={song.al.picUrl} alt="img" className="play" />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <PauseOutlined className="iconfont" />
        </div>
        <div className="control">
          < BarsOutlined className="iconfont" />
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer);