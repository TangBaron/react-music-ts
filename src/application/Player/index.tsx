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

const Player: React.FC = () => {
  const dispath = useAppDispatch();
  return (
    <div>Player</div>
  )
}

export default React.memo(Player);