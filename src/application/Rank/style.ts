import styled from "styled-components";
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${(props: { songCount: number }) => props.songCount > 0 ? '60px' : 0};
  width: 100%;
  .offical, .global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${style['font-size-m']};
    color: ${style['font-color-desc']};
  }
`

export const List = styled.ul`
  margin-top: 10px;
  padding: 0 5px;
  /* 传过来的属性globalRank表示是否是全球榜， 全球榜是一行多列布局 */
  display: ${(props: { globalRank: boolean }) => props.globalRank ? 'flex' : ''};
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${style['background-color']};
  &::after {
    content: "";
    display: block;
    width: 32vw;
  }
`

export const ListItem = styled.li`
  /* props.tracks.length也是表示是否是全球榜 */
  display: ${(props: { tracks: any[] }) => props.tracks.length ? 'flex' : ''};
  padding: 3px 0;
  border-bottom: 1px solid ${style['border-color']};
  .img_wrapper {
    width: ${(props: { tracks: any[] }) => props.tracks.length ? '27vw' : '32vw'};
    height: ${(props: { tracks: any[] }) => props.tracks.length ? '27vw' : '32vw'};
    border-radius: 3px;
    position: relative;
    /* 遮罩衬托文字效果 */
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 100%, .0), hsla(0, 0%, 43%, .4));
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update_frequency {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${style['font-size-ss']};
      color: ${style['font-color-light']};
    }
  }
`;

export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  >li {
    font-size: ${style['font-size-s']};
    color: grey;
  }
`

