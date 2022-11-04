import React, { useEffect } from "react";
import Slider from "../../components/slider/slider";
import RecommendList from "../../components/list/list";
import { Content } from "./style";
import Scroll from "../../baseUI/scroll";
//导入两个hook
import { useAppDispatch, useAppSelector } from "../../store";
// 导入两个action
import { getBanners, getRecommendList } from "./feature";

const Recommand: React.FC = () => {

  const { bannerList, recommendList } = useAppSelector(state => state.recommend);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBanners());
    dispatch(getRecommendList());
  }, [])


  return (
    <Content>
      <Scroll>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

export default React.memo(Recommand);