import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBannerRequest, getRecommendListRequest } from "../../../api/request";

// 定义数据格式
interface RecommendState {
  bannerList: any[],
  recommendList: any[]
}

const initialState = {
  bannerList: [],
  recommendList: []
} as RecommendState;

// 创建thunk
export const getBanners = createAsyncThunk(
  'recommend/getBanners',
  async () => {
    try {
      const response = await getBannerRequest();
      return response.data.banners;
    } catch (err) {
      console.log('轮播图数据传递有问题!');
    }

  }
)

export const getRecommendList = createAsyncThunk(
  'recommend/getRecommendList',
  async () => {
    try {
      const response = await getRecommendListRequest();
      return response.data.result;
    } catch (err) {
      console.log('推荐歌单数据传输错误');
    }
  }
)

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.bannerList = action.payload;
    })
    builder.addCase(getRecommendList.fulfilled, (state, action) => {
      state.recommendList = action.payload;
    })
  }
})

export const reducer = recommendSlice.reducer;