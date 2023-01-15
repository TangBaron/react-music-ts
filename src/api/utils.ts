type countFunc = (count: number) => string | number | undefined

export const getCount: countFunc = (count: number) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万';
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
}


export const filterIndex = (rankList: any[]): number => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
  return -1;
}

export const getName = (list: { name: string }[]) => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name;
    return item;
  })
  return str;
}

export const getSongUrl = (id: string) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const formatPlayTime = (interval: number) => {
  interval = Math.floor(interval);
  const minute = Math.floor((interval / 60));
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
}