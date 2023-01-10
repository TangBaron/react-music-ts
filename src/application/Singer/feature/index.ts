import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingerInfoRequest } from "../../../api/request";

interface IState {
  artist: { name: string, picUrl: string },
  songsOfArtist: any[],
  loading: boolean
}

const initialState: IState = {
  artist: {
    name: '',
    picUrl: ''
  },
  songsOfArtist: [],
  loading: true
}

export const getSingerInfo = createAsyncThunk('singer/singerInfo', async (id: string) => {
  try {
    const response = await getSingerInfoRequest(id);
    return {
      artist: response.data.artist,
      hotSongs: response.data.hotSongs
    }
  } catch (error) {
    console.log('获取歌手信息出错', error);
  }
})

const SingerSlice = createSlice({
  'name': 'singer',
  initialState,
  reducers: {
    changeLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSingerInfo.fulfilled, (state, action) => {
      state.artist = action.payload?.artist;
      state.songsOfArtist = action.payload?.hotSongs;
      state.loading = false;
    })
  }
})

export const { changeLoading } = SingerSlice.actions;
export const reducer = SingerSlice.reducer;


