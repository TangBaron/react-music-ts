import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Scroll from "../scroll";
import style from '../../assets/global-style';

interface IProps {
  // 要展示的数据
  list: any[];
  // 当前选择项, 通过判断选择项来赋予CSS样式
  oldVal: string;
  // 左边的标题
  title: string;
  // 点击不同item执行的方法
  handleClick: (...rest: any) => any
}

// List样式
const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  padding: 3px 0;
  /* 下面是title样式 */
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style['font-size-m']};
    vertical-align: middle;
  }
`

// ListItem样式
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style['theme-color']};
    border: 1px solid ${style['theme-color']};
    opacity: 0.8;
  }
`

const Horizon: React.FC<Partial<IProps>> = ({
  list = [],
  oldVal = '',
  title = '',
  handleClick = null
}) => {
  const category = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let categoryDOM = category.current as HTMLDivElement;
    let tagElems = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction="horizental">
      <div ref={category}>
        <List>
          <span>{title}</span>
          {
            list.map(item => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => {
                    handleClick && handleClick(item.key);
                  }}
                >
                  {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

export default React.memo(Horizon)