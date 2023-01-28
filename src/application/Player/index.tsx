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
import { getSongUrl, shuffle, findIndex } from "../../api/utils";
import { ChangeEventHandler } from "react";
import Toast from "../../baseUI/Toast";
import { playMode } from "../../api/config";
import PlayList from "./playList";
import { getLyricRequest } from "../../api/request";

interface IRef {
  show: (...rest: any) => any
}

const Player: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    playing,
    currentSong,
    currentIndex,
    playList,
    mode, //播放模式
    sequencePlayList, //播放列表
    fullScreen
  } = useAppSelector(state => state.player);

  // 目前播放的时间
  const [currentTime, setCurrentTime] = useState<number>(0);
  // 歌曲总时长
  const [duration, setDuration] = useState<number>(0);
  // 记录当前歌曲，下次渲染时对比是否是同一首歌
  const [preSong, setPreSong] = useState<Partial<ISong>>({});
  // 切换模式提示
  const [modeText, setModeText] = useState<string>('');
  const toastRef = useRef<IRef>(null);
  // 歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  // 播放标签
  const audioRef = useRef<HTMLAudioElement>(null);

  // 歌词相关
  const currentLyric = useRef(null);
  const [songReady, setSongReady] = useState<boolean>(true);

  // 获取歌词的方法
  const getLyric = (id: string) => {
    let lyric = "";
    getLyricRequest(id).then(
      (data: { [props: string]: any }) => {
        data = data.data;
        lyric = data.lrc.lyric;
        if (!lyric) {
          currentLyric.current = null;
          return;
        }
      }
    )
  }

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    ) {
      return;
    }
    let current = playList[currentIndex];
    dispatch(changeCurrentSong(current));
    setPreSong(current);
    audioRef!.current!.src = getSongUrl(current.id);
    // 获取歌词
    getLyric(current.id);
    setCurrentTime(0);//从头开始播放
    setDuration((current.dt / 1000) | 0);//时长
    setTimeout(() => {
      if (playing) {
        audioRef!.current!.play();
      }
    })
  }, [playList, currentIndex]);

  const toggleFullScreen = (data: boolean) => {
    dispatch(changeFullScreen(data));
  }

  const toggleShowPlayList = (data: boolean) => {
    dispatch(changeShowPlayList(data));
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
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
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

  // 一首歌循环
  const handleLoop = () => {
    audioRef!.current!.currentTime = 0;
    dispatch(changePlaying(true));
    audioRef!.current!.play();
  }

  // 上一首逻辑
  const handlePrev = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) {
      index = playList.length - 1;
    }
    if (!playing) {
      dispatch(changePlaying(true));
    }
    dispatch(changeCurrentIndex(index));
  }

  // 下一首的逻辑
  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) {
      dispatch(changePlaying(true));
    }
    dispatch(changeCurrentIndex(index));
  }

  // 修改播放模式
  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序播放
      dispatch(changePlayList(sequencePlayList));
      let index = findIndex(currentSong as ISong, sequencePlayList);
      dispatch(changeCurrentIndex(index));
      setModeText('顺序播放');
    } else if (newMode === 1) {
      //单曲循环
      dispatch(changePlayList(sequencePlayList));
      setModeText('单曲循环');
    } else if (newMode === 2) {
      //随机播放
      const newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong as ISong, newList);
      dispatch(changePlayList(newList));
      dispatch(changeCurrentIndex(index));
      setModeText('随机播放');
    }
    dispatch(changePlayMode(newMode));
    toastRef!.current?.show();
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
            togglePlayList={toggleShowPlayList}
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
            togglePlayList={toggleShowPlayList}
            clickPlaying={clickPlaying}
            onProgressChange={onProgressChange}
            handlePrev={handlePrev}
            handleNext={handleNext}
            mode={mode}
            changeMode={changeMode}
          ></NormalPlayer>
        ) : null
      }
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={endTime} onError={() => {
        alert('播放器资源加载错误或切歌过快，请重试!');
      }}></audio>
      <PlayList setPre={() => { setPreSong({}) }}></PlayList>
      <Toast ref={toastRef} text={modeText}></Toast>
    </div>
  )
}

export default React.memo(Player);