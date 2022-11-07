import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingerListRequest, getHotSingerListRequest } from "../../../api/request";

// 定义数据格式
interface SingersState {
  singerList: any[];
  // 控制进场Loading
  enterLoading: boolean;
  // 控制上拉加载动画
  pullUpLoading: boolean;
  // 控制下拉刷新动画
  pullDownLoading: boolean;
  // 当前页数
  pageCount: number
}

const initialState: SingersState = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0
}

//第一次加载热门歌手
export const getHotSingerList = createAsyncThunk('singers/getHotSingerList', async (pageCount: any) => {
  try {
    const response = await getHotSingerListRequest(pageCount);
    return response.data.artists;
  } catch (err) {
    console.log('热门歌手数据获取失败!');
  }
})

//加载选择类别的歌手
export const getSingerList = createAsyncThunk('singers/getSingerList', async (info: { category: any, alpha: any, pageCount: any }) => {
  try {
    const { category, alpha, pageCount } = info;
    const response = await getSingerListRequest(category, alpha, pageCount);
    return response.data.artists;
  } catch (err) {
    console.log('歌手数据获取失败!');
  }
})

const SingersSlice = createSlice({
  name: 'singers',
  initialState,
  reducers: {
    changePageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    changeEnterLoading: (state, action) => {
      state.enterLoading = action.payload;
    },
    changePullupLoading: (state, action) => {
      state.pullUpLoading = action.payload;
    },
    changePullDownLoading: (state, action) => {
      state.pullDownLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getHotSingerList.fulfilled, (state, action) => {
      if (state.pageCount === 0) {
        state.singerList = action.payload;
        state.enterLoading = false;
        state.pullDownLoading = false;
      } else {
        state.singerList.push(...action.payload);
        state.pullUpLoading = false;
      }
    });
    builder.addCase(getSingerList.fulfilled, (state, action) => {
      if (state.pageCount === 0) {
        state.singerList = action.payload;
        state.enterLoading = false;
        state.pullDownLoading = false;
      } else {
        state.singerList.push(...action.payload);
        state.pullUpLoading = false;
      }
    })
  }
})

export const { changePageCount, changeEnterLoading, changePullDownLoading, changePullupLoading } = SingersSlice.actions;
export const reducer = SingersSlice.reducer;







