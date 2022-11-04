import axios, { AxiosInstance } from "axios";

export const baseUrl: string = "http://localhost:3000";

// 创建axios的实例及拦截器配置
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl
})

axiosInstance.interceptors.response.use(
  res => res,
  err => {
    console.log(err, '出错啦!');
    return err;
  }
)

export {
  axiosInstance
}