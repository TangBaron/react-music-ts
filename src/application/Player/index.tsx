import React, { useEffect, useRef, useState } from "react";
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
import { ISong } from "./constants";
import { getSongUrl } from "../../api/utils";
import { ChangeEventHandler } from "react";

const playList: ISong[] = [
  {
    ftype: 0,
    djId: 0,
    a: null,
    cd: '01',
    crbt: null,
    no: 1,
    st: 0,
    rt: '',
    cf: '',
    alia: [
      '手游《梦幻花园》苏州园林版推广曲'
    ],
    rtUrls: [],
    fee: 0,
    s_id: 0,
    copyright: 0,
    h: {
      br: 320000,
      fid: 0,
      size: 9400365,
      vd: -45814
    },
    mv: 0,
    al: {
      id: 84991301,
      name: '拾梦纪',
      picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
      tns: [],
      pic_str: '109951164627180052',
      pic: 109951164627180050
    },
    name: '拾梦纪',
    l: {
      br: 128000,
      fid: 0,
      size: 3760173,
      vd: -41672
    },
    rtype: 0,
    m: {
      br: 192000,
      fid: 0,
      size: 5640237,
      vd: -43277
    },
    cp: 1416668,
    mark: 0,
    rtUrl: null,
    mst: 9,
    dt: 234947,
    ar: [
      {
        id: 12084589,
        name: '妖扬',
        tns: [],
        alias: []
      },
      {
        id: 12578371,
        name: '金天',
        tns: [],
        alias: []
      }
    ],
    pop: 5,
    pst: 0,
    t: 0,
    v: 3,
    id: 1416767593,
    publishTime: 0,
    rurl: null
  }
];

const Player: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fullScreen, playing, currentIndex, currentSong } = useAppSelector(state => state.player);

  // 目前播放的时间
  const [currentTime, setCurrentTime] = useState<number>(0);
  // 歌曲总时长
  const [duration, setDuration] = useState<number>(0);
  // 歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;


  // 播放标签
  const audioRef = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    if (!currentSong)
      return;
    // currentIndex默认为-1, 先改为0
    dispatch(changeCurrentIndex(0));
    let current = playList[0];
    // 赋值currentSong
    dispatch(changeCurrentSong(current));
    audioRef.current!.src = getSongUrl(current.id);
    //从头开始播放
    setCurrentTime(0);
    //时长
    setDuration(current.dt / 1000 | 0);
  }, [])

  const toggleFullScreen = (data: boolean) => {
    dispatch(changeFullScreen(data));
  }

  const clickPlaying = (e: React.MouseEvent, state: boolean) => {
    e.stopPropagation();
    dispatch(changePlaying(state));
  }

  useEffect(() => {
    playing ? audioRef.current?.play() : audioRef.current?.pause();
  }, [playing]);

  // audio标签会在播放过程中不断触发onTimeUpdate时间，需要更新currentTime变量
  const updateTime: ChangeEventHandler<HTMLAudioElement> = (e) => {
    setCurrentTime(e.target.currentTime);
  }

  const endTime = () => {
    dispatch(changePlaying(false));
  }

  // 修改percent
  const onProgressChange = (curPercent: number) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    //通过这个修改播放时间
    audioRef.current!.currentTime = newTime;
    if (!playing) {
      dispatch(changePlaying(true));
    }
  }

  return (
    <div>
      {
        //防止开始currentSong为空
        Object.keys(currentSong).length ? (
          <MiniPlayer
            percent={percent}
            fullScreen={fullScreen}
            song={currentSong as ISong}
            playing={playing}
            duration={duration}
            currentTime={currentTime}
            toggleFullScreen={toggleFullScreen}
            clickPlaying={clickPlaying}
          ></MiniPlayer>
        ) : null
      }
      {
        Object.keys(currentSong).length ? (
          <NormalPlayer
            percent={percent}
            fullScreen={fullScreen}
            song={currentSong as ISong}
            playing={playing}
            duration={duration}
            currentTime={currentTime}
            toggleFullScreen={toggleFullScreen}
            clickPlaying={clickPlaying}
            onProgressChange={onProgressChange}
          ></NormalPlayer>
        ) : null
      }
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={endTime}></audio>
    </div>
  )
}

export default React.memo(Player);