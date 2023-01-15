import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { playMode } from "../../../api/config";

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
}

const initialState: IState = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {}
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
    }
  }
})

export const { changeCurrentSong, changeFullScreen, changePlaying, changeSequencePlayList, changePlayList, changePlayMode, changeCurrentIndex, changeShowPlayList } = PlayerSlice.actions;
export const reducer = PlayerSlice.reducer;