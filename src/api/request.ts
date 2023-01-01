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

// 获取热门歌手信息
export const getHotSingerListRequest: RequestFun = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`)
}

// 获取歌手列表
export const getSingerListRequest: RequestFun = (category, alpha, count) => {
  // 因为这里接口改变了，所以需要一个map作一个参数的映射转换
  const categoryMap = new Map([
    ['1001', { type: 1, area: 7 }],
    ['1002', { type: 2, area: 7 }],
    ['1003', { type: 3, area: 7 }],
    ['2001', { type: 1, area: 96 }],
    ['2002', { type: 2, area: 96 }],
    ['2003', { type: 3, area: 96 }],
    ['6001', { type: 1, area: 8 }],
    ['6002', { type: 2, area: 8 }],
    ['6003', { type: 3, area: 8 }],
    ['7001', { type: 1, area: 16 }],
    ['7002', { type: 2, area: 16 }],
    ['7003', { type: 3, area: 16 }],
    ['4001', { type: 1, area: 0 }],
    ['4002', { type: 2, area: 0 }],
    ['4003', { type: 3, area: 0 }],
  ]);
  const { type, area } = !!category ? categoryMap.get(category) as { type: number, area: number } : { type: -1, area: -1 };
  return axiosInstance.get(
    `/artist/list?${type && area ? `type=${type}&area=${area}` : ''
    }&initial=${alpha.toLowerCase()}&offset=${count}`
  );
}

export const getRankListRequest: RequestFun = () => {
  return axiosInstance.get(`/toplist/detail`);
}

export const getAlbumDetailRequest = (id: string) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
}


