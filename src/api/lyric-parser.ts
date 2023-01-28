import React from "react";

const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

export default class Lyric {
  //原歌词
  lrc: string;
  //解析后的数组，每一项包含对应的歌词和时间
  lines: any[];
  //回调函数
  handler: (...rest: any) => any;
  //当前播放状态
  state: number;
  //当前播放歌词所在的行数
  curLineIndex: number;
  // 歌曲开始的时间戳
  startStamp: number;
  // 时间戳
  timer: ReturnType<typeof setTimeout> | null;
  /**
   * @params {string} lrc
   * @params {function} handler
  */
  constructor(lrc: string, handler = () => { }) {
    this.lrc = lrc;
    this.lines = [];
    this.handler = handler;
    this.state = STATE_PAUSE;
    this.curLineIndex = 0;
    this.startStamp = 0;
    this.timer = null;

    this._initLines();
  }

  _initLines() {
    // 解析代码
    const lines = this.lrc.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];// 如 "[00:01.997] 作词：薛之谦"
      let result: any[] = timeExp.exec(line) as any[];
      if (!result) continue;
      const txt = line.replace(timeExp, '').trim();// 现在把时间戳去掉，只剩下歌词文本
      if (txt) {
        if (result[3].length === 3) {
          result[3] = result[3] / 10;//[00:01.997] 中匹配到的 997 就会被切成 99
        }
        this.lines.push({
          time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,// 转化具体到毫秒的时间，result [3] * 10 可理解为 (result / 100) * 1000
          txt
        });
      }
    }
    this.lines.sort((a, b) => {
      return a.time - b.time;
    });// 根据时间排序
  }

  // 查询当前播放行在列表中的索引
  _findcurLineIndex(time: number) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i
      }
    }
    return this.lines.length - 1
  }

  // 调用回调函数
  _callHandler(i: number) {
    if (i < 0) {
      return
    }
    this.handler({
      txt: this.lines[i].txt,
      lineNum: i
    })
  }

  //继续播放的方法, isSeek 标志位表示用户是否手动调整进度
  _playRest(isSeek = false) {
    let line = this.lines[this.curLineIndex];
    let delay;
    if (isSeek) {
      delay = line.time - (+new Date() - this.startStamp);
    } else {
      // 拿到上一行的歌词开始时间，算间隔
      let preTime = this.lines[this.curLineIndex - 1] ? this.lines[this.curLineIndex - 1].time : 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this._callHandler(this.curLineIndex++);
      if (this.curLineIndex < this.lines.length && this.state === STATE_PLAYING) {
        //递归调用保证播放完成
        this._playRest();
      }
    }, delay)
  }

  //offset 为时间进度，isSeek 标志位表示用户是否手动调整进度
  play(offset = 0, isSeek = false) {
    if (!this.lines.length) {
      return;
    }
    this.state = STATE_PLAYING;
    // 找到当前所在的行
    this.curLineIndex = this._findcurLineIndex(offset);
    // 现在正处于第 this.curLineIndex-1 行
    // 立即定位，方式是调用传来的回调函数，并把当前歌词信息传给它
    this._callHandler(this.curLineIndex - 1);
    // 根据时间进度判断歌曲开始的时间戳
    this.startStamp = +new Date() - offset;

    if (this.curLineIndex < this.lines.length) {
      clearTimeout(this.timer as ReturnType<typeof setTimeout>);
      // 继续播放
      this._playRest(isSeek);
    }
  }

  //暂停
  stop() {
    this.state = STATE_PAUSE;
    clearTimeout(this.timer as ReturnType<typeof setTimeout>);
  }

  //切换播放方式
  togglePlay(offset: number) {
    if (this.state === STATE_PLAYING) {
      this.stop()
    } else {
      this.state = STATE_PLAYING
      this.play(offset, true)
    }
  }

  seek(offset: number) {
    this.play(offset, true)
  }
}