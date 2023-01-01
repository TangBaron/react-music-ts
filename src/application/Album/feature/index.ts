import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAlbumDetailRequest } from "../../../api/request";

interface IState {
  currentAlbum: {
    name: string,
    subscribedCount: number,
    coverImgUrl: string,
    creator: {
      avatarUrl: string,
      nickname: string
    },
    tracks: any[]
  },
  enterLoading: boolean,
}

const initialState: IState = {
  currentAlbum: {
    name: '',
    subscribedCount: 0,
    coverImgUrl: '',
    creator: {
      avatarUrl: '',
      nickname: ''
    },
    tracks: []
  },
  enterLoading: false
}

export const getAlbumDetail = createAsyncThunk('album/albumDetail', async (id: string) => {
  try {
    const response = await getAlbumDetailRequest(id);
    return response.data.playlist;
  } catch (error) {
    console.log('歌单详情获取失败!');
  }
})

const AlbumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    changeEnterLoading: (state, action) => {
      state.enterLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbumDetail.fulfilled, (state, action) => {
      state.currentAlbum = action.payload;
      state.enterLoading = false;
    })
  }
})

export const { changeEnterLoading } = AlbumSlice.actions;
export const reducer = AlbumSlice.reducer;



