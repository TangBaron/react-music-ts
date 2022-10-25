import React from 'react';
import { GlobalStyle } from './style';
import { DownloadOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  return (
    <div className='App'>
      <GlobalStyle></GlobalStyle>
      <DownloadOutlined></DownloadOutlined>
    </div>
  );
}
export default App;
