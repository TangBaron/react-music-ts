import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { reducer as recommendReducer } from '../application/Recommend/feature'
import { reducer as singersReducer } from '../application/Singers/feature';
import { reducer as rankReducer } from '../application/Rank/feature';
import { reducer as albumReducer } from '../application/Album/feature';
import { reducer as singerReducer } from "../application/Singer/feature";
import { reducer as playerReducer } from '../application/Player/feature';

const reducer = {
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singer: singerReducer,
  player: playerReducer
}

export const store = configureStore({
  // 之后开发具体功能模块的时候添加reducer
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
