import React from 'react';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import { RouteObject } from 'react-router';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        index: true,
        element: <Recommend></Recommend>
      },
      {
        path: "recommend",
        element: <Recommend></Recommend>
      },
      {
        path: 'singers',
        element: <Singers></Singers>
      },
      {
        path: 'rank',
        element: <Rank></Rank>
      }
    ]
  }
]

export default routes;