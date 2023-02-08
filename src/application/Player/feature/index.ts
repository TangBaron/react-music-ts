import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { playMode } from "../../../api/config";
import { findIndex } from "../../../api/utils";

interface IState {
  // 播放是否为全屏模式
  fullScreen: boolean,
  // 当前歌曲是否播放
  playing: boolean,
  // 顺序列表
  sequencePlayList: any[],
  playList: any[],
  // 播放模式
  mode: playMode,
  // 当前歌曲在播放列表的索引位置
  currentIndex: number,
  // 是否展示播放列表
  showPlayList: boolean,
  // 当前歌曲信息
  currentSong: {
    [propName: string]: any
  }
  // 播放速度
  speed: number
}

const initialState: IState = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: 0,
  showPlayList: false,
  currentSong: {},
  speed: 1
}

const PlayerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    changeFullScreen: (state, action) => {
      state.fullScreen = action.payload;
    },
    changePlaying: (state, action) => {
      state.playing = action.payload;
    },
    changeSequencePlayList: (state, action) => {
      state.sequencePlayList = action.payload;
    },
    changePlayList: (state, action) => {
      state.playList = action.payload;
    },
    changePlayMode: (state, action) => {
      state.mode = action.payload;
    },
    changeCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    changeShowPlayList: (state, action) => {
      state.showPlayList = action.payload;
    },
    // 删除歌曲的逻辑
    deleteSong: (state, action) => {
      const song = action.payload;
      const playList = state.playList;
      const sequenceList = state.sequencePlayList;
      let currentIndex = state.currentIndex;
      // 找对应歌曲在列表中的索引
      const fpIndex = findIndex(song, playList);
      // 在播放列表中删除
      playList.splice(fpIndex, 1);
      // 如果删除的歌曲排在当前播放歌曲前面，那么currentIndex--
      if (fpIndex < currentIndex) {
        currentIndex--;
      }
      // 在sequencelist中直接删除歌曲
      const fsIndex = findIndex(song, sequenceList);
      sequenceList.splice(fsIndex, 1);
      // 重新赋值
      state.playList = playList;
      state.sequencePlayList = sequenceList;
      state.currentIndex = currentIndex;
    },
    // 修改倍速的逻辑
    changeSpeed: (state, action) => {
      state.speed = action.payload;
    }
  }
})

export const { changeCurrentSong, changeFullScreen, changePlaying, changeSequencePlayList, changePlayList, changePlayMode, changeCurrentIndex, changeShowPlayList, deleteSong, changeSpeed } = PlayerSlice.actions;
export const reducer = PlayerSlice.reducer;