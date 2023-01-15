export interface ISong {
  al: {
    id: number,
    name: string,
    picUrl: string,
    tns: any[],
    pic_str: string,
    pic: number
  },
  name: string,
  ar: { id: number, name: string, tns: any[], alias: any[] }[],
  [propName: string]: any
}
export interface IProps {
  fullScreen: boolean,
  song: ISong,
  playing: boolean,
  percent: number,
  duration: number, //播放的总时长
  currentTime: number, //当前播放的时间
  toggleFullScreen: (data: boolean) => void
  clickPlaying: (e: any, play: boolean) => any;
  onProgressChange?: (curPercent: number) => void;
}