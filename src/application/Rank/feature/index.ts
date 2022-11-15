import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRankListRequest } from '../../../api/request';

interface IState {
  rankList: any[];
  loading: boolean;
}

const initialState: IState = {
  rankList: [],
  loading: true
}

export const getRankList = createAsyncThunk('rank/ranklist', async () => {
  try {
    const response = await getRankListRequest();
    return response.data.list;
  } catch (error) {
    console.log('获取排行榜列表失败!!!');
  }
})

const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    changeLoading(state, action) {
      state.loading = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getRankList.fulfilled, (state, action) => {
      state.rankList = action.payload;
      state.loading = false;
    })
  },
})

export const { changeLoading } = rankSlice.actions;
export const reducer = rankSlice.reducer;

