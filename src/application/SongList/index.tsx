import React from 'react';
import { SongList, SongItem } from './style';
import { getName } from '../../api/utils';
import { PlayCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { changePlayList, changeCurrentIndex, changeSequencePlayList } from '../Player/feature';
import { useAppDispatch } from '../../store';

type IRef = HTMLElement

interface IProps {
  showBackground: boolean,
  collectCount?: number,
  showCollect: boolean,
  songs: any[],
  musicAnimation: (x: number, y: number) => any
}

const SongListComponent = React.forwardRef<IRef, IProps>((props, ref) => {

  const { collectCount, showCollect, songs, musicAnimation } = props;
  const dispatch = useAppDispatch();

  const totalCount = songs.length;

  const selectItem = (e: any, index: number) => {
    dispatch(changePlayList(songs));
    dispatch(changeSequencePlayList(songs));
    dispatch(changeCurrentIndex(index));
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY)
  }

  const songList = (list: any[]) => {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      res.push(
        <li key={item.id} onClick={(e) => selectItem(e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} - {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      )
    }
    return res;
  }

  const collect = (count: number) => {
    return (
      <div className="add_list">
        <PlusCircleOutlined className="iconfont" />
        <span > 收藏 ({Math.floor(count / 1000) / 10} 万)</span>
      </div>
    )
  }

  return (
    <SongList showBackground={props.showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem(e, 0)}>
          <PlayCircleOutlined className="iconfont" />
          <span > 播放全部 <span className="sum">(共 {totalCount} 首)</span></span>
        </div>
        {showCollect ? collect(collectCount as number) : null}
      </div>
      <SongItem>
        {songList(songs)}
      </SongItem>
    </SongList>
  )
})

export default React.memo(SongListComponent);