import React from "react";
import {
  changeCurrentIndex,
  changeFullScreen,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changePlaying,
  changeSequencePlayList,
  changeShowPlayList
} from './feature';
import { useAppDispatch, useAppSelector } from "../../store";
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";

const currentSong = {
  al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
  name: "木偶人",
  ar: [{ name: "薛之谦" }]
}

const Player: React.FC = () => {
  const dispath = useAppDispatch();
  const { fullScreen } = useAppSelector(state => state.player);
  const toggleFullScreen = (data: boolean) => {
    dispath(changeFullScreen(data));
  }

  return (
    <div>
      <MiniPlayer fullScreen={fullScreen} song={currentSong} toggleFullScreen={toggleFullScreen}></MiniPlayer>
      <NormalPlayer fullScreen={fullScreen} song={currentSong} toggleFullScreen={toggleFullScreen}></NormalPlayer>
    </div>
  )
}

export default React.memo(Player);