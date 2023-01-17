import styled from "styled-components";
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${(props: { songCount: number }) => props.songCount > 0 ? '60px' : 0};
  z-index: 100;
  background: ${style['background-color']};
  //元素变形的原点，比如旋转动画的原点等, 注意css中的旋转遵循的是左手定则
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0,0,0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`

// TopDesc 上面关于该歌单的描述
export const TopDesc = styled.div`
  background-size: 100%;
  padding: 5px 20px;
  padding-bottom: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 275px;
  position: relative;
  .background {
    z-index: -1;
    background: url(${(props: { background: string }) => props.background}) no-repeat;
    //指定背景图片的位置
    background-position: 0 0;
    //指定背景图片的宽高, 父元素的宽的百分比
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    //毛玻璃效果
    filter: blur(20px);
    .filter {
      position: absolute;
      z-index: 10;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba (7, 17, 27, 0.2);
    }
  }
  .img_wrapper {
    width: 120px;
    height: 120px;
    position: relative;
    //我们的老熟人，decorate可以让白色文字更显眼
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
    }
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style['font-size-s']};
      line-height: 15px;
      color: ${style['font-color-light']};
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 3px;
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title {
      max-height: 70px;
      color: ${style['font-color-light']};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${style['font-size-l']};
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${style['font-size-m']};
        color: ${style['font-color-desc-v2']};
      }
    }
  }
`

//Menu 菜单
export const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px 20px 30px;
  margin: -100px 0 0 0;
  >div {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: ${style['font-size-s']};
    color: ${style['font-color-light']};
    z-index: 1000;
    font-weight: 500;
    .icon {
      font-size: 20px;
    }
  }
`