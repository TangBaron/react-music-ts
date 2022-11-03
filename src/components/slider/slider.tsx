import React from "react";
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { banner } from './interface'
import { SliderContainer } from "./style";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface IProps {
  bannerList: banner[]
}

const Slider: React.FC<IProps> = ({ bannerList }) => {
  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
        >
          {
            bannerList.map(slider => {
              return (
                <SwiperSlide>
                  <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider);