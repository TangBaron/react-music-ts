import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';

interface ItouchInfo {
  initiated?: boolean;
  startX?: number;
  left?: number;
}

interface IProps {
  percent: number;
  percentChange: (curPercent: number) => void
}

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, .3);
    .progress{
      position: absolute;
      height: 100%;
      background: ${style['theme-color']};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style["border-color"]};
        border-radius: 50%;
        background: ${style['theme-color']};
      }
    }
  }
`

const ProgressBar = (props: IProps) => {
  const { percent, percentChange } = props;

  const progressBar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const progressBtn = useRef<HTMLDivElement>(null);
  const [touch, setTouch] = useState<ItouchInfo>({});

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar!.current!.clientWidth;
      const offsetWidth = percent * barWidth;
      progress!.current!.style.width = `${offsetWidth}px`;
      progressBtn!.current!.style['transform'] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  }, [percent]);

  const _changePercent = () => {
    const barWidth = progressBar!.current!.clientWidth;
    const curPercent = progress!.current!.clientWidth / barWidth;
    percentChange(curPercent);
  }

  // 用来处理进度条的偏移
  const _offset = (offsetWidth: number) => {
    progress.current!.style.width = `${offsetWidth}px`;
    progressBtn.current!.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  }

  // 开始接触
  const progressTouchStart = (e: React.TouchEvent) => {
    const startTouch: ItouchInfo = {};
    startTouch.initiated = true;
    startTouch.startX = e.touches[0].pageX; //滑动开始时的横坐标
    startTouch.left = progress.current?.clientWidth;
    setTouch(startTouch);
  }

  const progressTouchMove = (e: React.TouchEvent) => {
    if (!touch.initiated) {
      return;
    }
    if (!touch.startX) {
      return;
    }
    if (!touch.left) {
      return;
    }
    const deltaX = e.touches[0].pageX - touch.startX;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), progressBar.current!.clientWidth);
    _offset(offsetWidth);
  }

  const progressTouchEnd = (e: React.TouchEvent) => {
    const endTouch = { ...touch };
    endTouch.initiated = false;
    setTouch(endTouch);
    _changePercent()
  }

  const progressClick = (e: React.MouseEvent) => {
    const rect = progressBar.current?.getBoundingClientRect();
    const offsetWidth = e.pageX - rect!.left;
    _offset(offsetWidth);
    _changePercent();
  }

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        {/* progress初始值为0, 主要是用来模拟滚动后的颜色的 */}
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}

        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
}

export default React.memo(ProgressBar);