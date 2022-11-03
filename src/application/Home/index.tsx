import React from "react";
import { Outlet, NavLink } from 'react-router-dom';
import { Top, Tab, TabItem } from "./style";
import { MenuOutlined, SearchOutlined } from '@ant-design/icons'

const Home: React.FC = () => {
  return (
    <>
      <Top>
        <span className="iconfont"><MenuOutlined></MenuOutlined></span>
        <span className="title">Music App</span>
        <span className="iconfont"><SearchOutlined></SearchOutlined></span>
      </Top>
      <Tab>
        <NavLink
          to="recommend"
          className={({ isActive }) =>
            isActive ? 'selected' : undefined
          }
        >
          <TabItem><span>推荐</span></TabItem>
        </NavLink>
        <NavLink
          to="singers"
          className={({ isActive }) =>
            isActive ? 'selected' : undefined
          }
        >
          <TabItem><span>歌手</span></TabItem>
        </NavLink>
        <NavLink
          to="rank"
          className={({ isActive }) =>
            isActive ? 'selected' : undefined
          }
        >
          <TabItem><span>排行榜</span></TabItem>
        </NavLink>
      </Tab>
      <Outlet></Outlet>
    </>
  )
}

export default React.memo(Home);