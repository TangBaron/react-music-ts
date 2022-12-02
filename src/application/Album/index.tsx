import React, { memo, useState } from "react";
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from "react-router-dom";
import Header from '../../baseUI/header';

const Album: React.FC = () => {

  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState<boolean>(true);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => { navigate(-1) }}
    >
      <Container>
        <Header title={'返回'} handleClick={() => { setShowStatus(false) }}></Header>
      </Container>
    </CSSTransition>

  )
}

export default memo(Album);

