import React from 'react';
import { ListWrapper, ListItem, List } from './style';
import { IListItem } from './interface';
import { PlayCircleOutlined } from '@ant-design/icons';
import { getCount } from '../../api/utils';
import LazyLoad from 'parm-react-lazyload';
import { useNavigate } from 'react-router-dom';

interface IProps {
  recommendList: IListItem[]
}

const RecommendList: React.FC<IProps> = ({ recommendList }) => {

  const navigate = useNavigate();

  const enterDetail = (id: string): void => {
    navigate(`/recommend/${id}`)
  }

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          recommendList.map((item, index) => {
            return (
              <ListItem key={item.id + index} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  {/* 加此参数可以减小请求的图片资源大小 */}
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music" />}>
                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                  <div className="play_count">
                    <PlayCircleOutlined></PlayCircleOutlined>
                    <span className="count">{getCount(item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default RecommendList;