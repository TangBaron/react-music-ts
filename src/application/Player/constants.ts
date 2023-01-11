export interface IProps {
  fullScreen: boolean,
  toggleFullScreen: (data: boolean) => void
  song: {
    name: string,
    al: {
      picUrl: string
    }
    ar: { name: string }[]
  }
}