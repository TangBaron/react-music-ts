import React from 'react';
import { GlobalStyle } from './style';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import { store } from './store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle></GlobalStyle>
        <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
      </Provider>
    </>
  );
}
export default App;
