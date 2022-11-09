import React from 'react';
import { GlobalStyle } from './style';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import { store } from './store';
import { Provider } from 'react-redux';
import { Data } from './application/Singers/data';

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle></GlobalStyle>
        <Data>
          <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
        </Data>
      </Provider>
    </>
  );
}
export default App;
