import { AxiosResponse } from 'axios';
import { axiosInstance } from "./config";

type RequestFun = (...rest: any) => Promise<AxiosResponse<any, any>>

// 获取轮播图的数据
export const getBannerRequest: RequestFun = () => {
  return axiosInstance.get('/banner');
}

// 获取推荐的列表
export const getRecommendListRequest: RequestFun = () => {
  return axiosInstance.get('/personalized');
}
