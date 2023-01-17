import React, { useEffect, useContext } from "react";
import Horizon from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer, ListContainer, List, ListItem } from "./style";
import Scroll from "../../baseUI/scroll";
import {
  changePageCount,
  changeEnterLoading,
  changePullDownLoading,
  changePullupLoading,
  getHotSingerList,
  getSingerList
} from './feature/index';
import { useAppDispatch, useAppSelector } from "../../store";
import Loading from "../../baseUI/loading";
import LazyLoad, { forceCheck } from "parm-react-lazyload";
import { CategoryDataContext, changeCategory_context, changeAlpha_context } from "./data";
import { Outlet, useNavigate } from "react-router-dom";

const Singers: React.FC = () => {
  const { pageCount, singerList, enterLoading, pullUpLoading, pullDownLoading } = useAppSelector(state => state.singers);
  const { playList } = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  const { data, categoryDispatch } = useContext(CategoryDataContext);
  const { category, alpha } = data;
  const navigate = useNavigate();

  const handleUpdateAlpha = (val: string) => {
    categoryDispatch({ type: changeAlpha_context, payload: val });
    updateDispatch(category, val);
  }

  const handleUpdateCategory = (val: string) => {
    categoryDispatch({ type: changeCategory_context, payload: val })
    updateDispatch(val, alpha);
  }

  // 定义处理函数
  // 默认获得热门歌手列表
  const getHotSingerDispath = () => {
    dispatch(getHotSingerList(0));
  }

  const updateDispatch = (category: any, alpha: any) => {
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(getSingerList({ category, alpha, pageCount: 0 }));
  }

  const pullUpRefreshDispath = (category: any, alpha: any, pageCount: any, hot: boolean) => {
    dispatch(changePullupLoading(true));
    dispatch(changePageCount(pageCount + 1));
    if (hot) {
      dispatch(getHotSingerList(pageCount + 1));
    } else {
      dispatch(getSingerList({ category, alpha, pageCount: pageCount + 1 }));
    }
  }

  const pullDownRefreshDispatch = (category: any, alpha: any) => {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0));
    if (category === '' && alpha === '') {
      dispatch(getHotSingerList(0));
    } else {
      dispatch(getSingerList({ category, alpha, pageCount: 0 }))
    }
  }

  const handlePullUp = () => {
    pullUpRefreshDispath(category, alpha, pageCount, category === '');
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  }

  useEffect(() => {
    if (singerList.length === 0) {
      getHotSingerDispath();
    }
  }, [])

  const enterDetail = (id: string) => {
    navigate(`/singers/${id}`);
  }

  return (
    <div>
      <NavContainer>
        <Horizon oldVal={category} list={categoryTypes} title={'分类:(默认热门):'} handleClick={handleUpdateCategory}></Horizon>
        <Horizon oldVal={alpha} list={alphaTypes} title={'首字母:'} handleClick={handleUpdateAlpha}></Horizon>
      </NavContainer>
      <ListContainer songCount={playList.length}>
        {enterLoading ? <Loading></Loading> : null}
        <Scroll
          onScroll={forceCheck}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
        >
          <List>
            {
              singerList.map((item, index) => {
                return (
                  <ListItem key={item.accountId + "" + index} onClick={() => { enterDetail(item.id) }}>
                    <div className="img_wrapper">
                      <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                      </LazyLoad>
                    </div>
                    <span className="name">{item.name}</span>
                  </ListItem>
                )
              })
            }
          </List>
        </Scroll>
      </ListContainer>
      <Outlet></Outlet>
    </div>
  )
}

export default React.memo(Singers);