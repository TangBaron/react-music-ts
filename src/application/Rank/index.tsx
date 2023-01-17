import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getRankList } from "./feature";
import { filterIndex } from "../../api/utils";
import { Container, List, ListItem, SongList } from "./style";
import Scroll from "../../baseUI/scroll";
import Loading from "../../baseUI/loading";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";


const Rank: React.FC = () => {
  // list数据
  const { rankList, loading } = useAppSelector(state => state.rank);
  const { playList } = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  // 处理两种数据
  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRankList());
  }, []);

  const displayStyle = loading ? { 'display': 'none' } : { 'display': '' }

  // 渲染tracks
  const renderSongList = (list: { first: any, second: any }[]) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return (
              <li key={index}>{index + 1}. {item.first} - {item.second}</li>
            )
          })
        }
      </SongList>
    ) : null
  }

  // 渲染榜单列表函数，传入global变量来区分不同的布局方式
  const renderRankList = (list: any, global: boolean) => {

    const enterDetail = (detail: { id: string }) => {
      navigate(`/rank/${detail.id}`)
    }
    return (
      <List globalRank={global}>
        {
          list.map((item: any) => {
            return (
              <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="" />
                  <div className="decorate"></div>
                  <span className="update_frequency">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return (
    <Container songCount={playList.length}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}> 官方榜 </h1>
          {renderRankList(officialList, false)}
          <h1 className="global" style={displayStyle}> 全球榜 </h1>
          {renderRankList(globalList, true)}
          {loading ? <Loading></Loading> : null}
        </div>
      </Scroll>
      <Outlet></Outlet>
    </Container>
  )
}

export default React.memo(Rank);