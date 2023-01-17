import React, { useEffect } from "react";
import Slider from "../../components/slider/slider";
import RecommendList from "../../components/list/list";
import { Content } from "./style";
import Scroll from "../../baseUI/scroll";
//导入两个hook
import { useAppDispatch, useAppSelector } from "../../store";
// 导入两个action
import { getBanners, getRecommendList } from "./feature";
import { forceCheck } from 'parm-react-lazyload';
import Loading from '../../baseUI/loading';
import { Outlet } from "react-router-dom";

const Recommand: React.FC = () => {

  const { bannerList, recommendList, enterLoading } = useAppSelector(state => state.recommend);
  const { playList } = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bannerList.length === 0) {
      dispatch(getBanners());
    }
    if (recommendList.length === 0) {
      dispatch(getRecommendList());
    }
  }, [])


  return (
    <Content songCount={playList.length}>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
          {
            enterLoading ? <Loading></Loading> : null
          }
        </div>
      </Scroll>
      <Outlet></Outlet>
    </Content>
  )
}

export default React.memo(Recommand);