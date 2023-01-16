import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { playMode } from "../../../api/config";

const mockPlayList = [
  {
    "name": "偏偏喜欢你",
    "id": 66476,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 2115,
        "name": "陈百强",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "600902000006762857",
    "fee": 1,
    "v": 39,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 6519,
      "name": "偏偏喜欢你",
      "picUrl": "http://p4.music.126.net/eUDl2nMby7PsezK9VYRCtA==/109951163942629932.jpg",
      "tns": [],
      "pic_str": "109951163942629932",
      "pic": 109951163942629940
    },
    "dt": 210506,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 8422966,
      "vd": -36146,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 5053797,
      "vd": -33595,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3369213,
      "vd": -31951,
      "sr": 44100
    },
    "sq": {
      "br": 953583,
      "fid": 0,
      "size": 25091968,
      "vd": -36151,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 1,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 262144,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 39,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7002,
    "mv": 5307398,
    "publishTime": 428515200000
  },
  {
    "name": "月半小夜曲",
    "id": 115162,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 3699,
        "name": "李克勤",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "600902000005371662",
    "fee": 8,
    "v": 300,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 11279,
      "name": "经典金曲",
      "picUrl": "http://p3.music.126.net/SIFuIDfMNbuY9-IQcbTz5w==/109951166890517973.jpg",
      "tns": [],
      "pic_str": "109951166890517973",
      "pic": 109951166890517970
    },
    "dt": 288333,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 11535717,
      "vd": -12885,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 6921448,
      "vd": -10285,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 4614313,
      "vd": -8588,
      "sr": 44100
    },
    "sq": {
      "br": 890764,
      "fid": 0,
      "size": 32104629,
      "vd": -14772,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 25,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 300,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7003,
    "mv": 5354026,
    "publishTime": 786211200000
  },
  {
    "name": "讲不出再见",
    "id": 152392,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 5205,
        "name": "谭咏麟",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "600902000005190949",
    "fee": 8,
    "v": 24,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 15338,
      "name": "二十年白金畅销金曲全记录",
      "picUrl": "http://p4.music.126.net/Rt4pGy3rNL-OQ_3w6CSPmA==/109951165566447762.jpg",
      "tns": [],
      "pic_str": "109951165566447762",
      "pic": 109951165566447760
    },
    "dt": 294000,
    "h": {
      "br": 320001,
      "fid": 0,
      "size": 11762460,
      "vd": -29358,
      "sr": 44100
    },
    "m": {
      "br": 192001,
      "fid": 0,
      "size": 7057493,
      "vd": -26798,
      "sr": 44100
    },
    "l": {
      "br": 128001,
      "fid": 0,
      "size": 4705010,
      "vd": -25209,
      "sr": 44100
    },
    "sq": {
      "br": 916395,
      "fid": 0,
      "size": 33677551,
      "vd": -29352,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "01",
    "no": 5,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 24,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7003,
    "mv": 0,
    "publishTime": 1120147200000
  },
  {
    "name": "沉默是金",
    "id": 188204,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 6457,
        "name": "张国荣",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 8,
    "v": 103,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 19057,
      "name": "Ultimate",
      "picUrl": "http://p3.music.126.net/cmvsHFnVKXO409hZdrbacA==/102254581395221.jpg",
      "tns": [],
      "pic": 102254581395221
    },
    "dt": 246372,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 9857611,
      "vd": 52584,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 5914584,
      "vd": 55024,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3943071,
      "vd": 56387,
      "sr": 44100
    },
    "sq": {
      "br": 833508,
      "fid": 0,
      "size": 25669246,
      "vd": 51212,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 16,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 103,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7003,
    "mv": 0,
    "publishTime": 691516800000
  },
  {
    "name": "一起走过的日子",
    "id": 5245715,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 3691,
        "name": "刘德华",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [
      "电影《至尊无上Ⅱ之永霸天下》主题曲"
    ],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 8,
    "v": 970,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 511509,
      "name": "广东经典101",
      "picUrl": "http://p3.music.126.net/Q8AVab6CHWlOZ32374ZqIw==/109951166004488057.jpg",
      "tns": [],
      "pic_str": "109951166004488057",
      "pic": 109951166004488060
    },
    "dt": 235493,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 9421889,
      "vd": -7205,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 5653151,
      "vd": -4633,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3768782,
      "vd": -3064,
      "sr": 44100
    },
    "sq": {
      "br": 871667,
      "fid": 0,
      "size": 25659000,
      "vd": -7575,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "01",
    "no": 82,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 970,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7003,
    "mv": 0,
    "publishTime": 1230739200000
  },
  {
    "name": "今夜你会不会来(粤)",
    "id": 115391,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 3701,
        "name": "黎明",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 8,
    "v": 38,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 11298,
      "name": "我的感觉",
      "picUrl": "http://p3.music.126.net/FhWR2CFVt7D5w3DTd0kYwA==/109951165592214307.jpg",
      "tns": [],
      "pic_str": "109951165592214307",
      "pic": 109951165592214300
    },
    "dt": 248906,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 9958966,
      "vd": -33966,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 5975397,
      "vd": -31426,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3983613,
      "vd": -29958,
      "sr": 44100
    },
    "sq": {
      "br": 1678292,
      "fid": 0,
      "size": 52217280,
      "vd": -33952,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 3,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 0,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 38,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7003,
    "mv": 5437311,
    "publishTime": 1167580800000
  },
  {
    "name": "等你等到我心痛",
    "id": 190360,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 6460,
        "name": "张学友",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 8,
    "v": 43,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 19237,
      "name": "等你等到我心痛 张学友精选",
      "picUrl": "http://p3.music.126.net/Frx9MSEa-t_QtBLNy2GDew==/109951166860255517.jpg",
      "tns": [],
      "pic_str": "109951166860255517",
      "pic": 109951166860255520
    },
    "dt": 255466,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 10221236,
      "vd": 675,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 6132759,
      "vd": 675,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 4088520,
      "vd": 675,
      "sr": 44100
    },
    "sq": {
      "br": 895840,
      "fid": 0,
      "size": 28607161,
      "vd": 675,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 1,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 0,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 43,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7003,
    "mv": 5343605,
    "publishTime": 752083200000
  },
  {
    "name": "富士山下",
    "id": 65766,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 2116,
        "name": "陈奕迅",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "600902000001108413",
    "fee": 1,
    "v": 167,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 6451,
      "name": "What's Going On…?",
      "picUrl": "http://p3.music.126.net/jzNxBp5DCER2_aKGsXeRww==/109951167435823724.jpg",
      "tns": [],
      "pic_str": "109951167435823724",
      "pic": 109951167435823730
    },
    "dt": 259213,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 10371701,
      "vd": -23454,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 6223038,
      "vd": -20831,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 4148706,
      "vd": -19231,
      "sr": 44100
    },
    "sq": {
      "br": 869387,
      "fid": 0,
      "size": 28169603,
      "vd": -23447,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "01",
    "no": 5,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 167,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7003,
    "mv": 303140,
    "publishTime": 1136044800000
  },
  {
    "name": "红日",
    "id": 115502,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 3699,
        "name": "李克勤",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [
      "原曲《それが大事（最重要的事）》"
    ],
    "pop": 100,
    "st": 0,
    "rt": "600902000007957393",
    "fee": 8,
    "v": 42,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 11307,
      "name": "红日",
      "picUrl": "http://p3.music.126.net/TOsZX8iEymJggFtrNLFY8g==/109951166784613153.jpg",
      "tns": [],
      "pic_str": "109951166784613153",
      "pic": 109951166784613150
    },
    "dt": 287000,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 11489741,
      "vd": -9206,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 6893861,
      "vd": -6739,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 4595922,
      "vd": -5338,
      "sr": 44100
    },
    "sq": {
      "br": 984752,
      "fid": 0,
      "size": 35349342,
      "vd": -9178,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 4,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 42,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7003,
    "mv": 5308823,
    "publishTime": 694195200000
  },
  {
    "name": "爱的故事(上)",
    "id": 147030,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 4947,
        "name": "孙耀威",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 8,
    "v": 295,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 14707,
      "name": "爱的故事(上集)",
      "picUrl": "http://p3.music.126.net/xKKcN1WJZwqKk1VBZhtMvA==/67070209310501.jpg",
      "tns": [],
      "pic": 67070209310501
    },
    "dt": 239413,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 9579668,
      "vd": -49085,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 5747818,
      "vd": -46564,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3831893,
      "vd": -44802,
      "sr": 44100
    },
    "sq": {
      "br": 978675,
      "fid": 0,
      "size": 29288492,
      "vd": -49050,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 1,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 2,
    "s_id": 0,
    "mark": 0,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 295,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7001,
    "mv": 0,
    "publishTime": 780940800000
  },
  {
    "name": "还是觉得你最好",
    "id": 190380,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 6460,
        "name": "张学友",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "600902000005652325",
    "fee": 8,
    "v": 35,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 19237,
      "name": "等你等到我心痛 张学友精选",
      "picUrl": "http://p4.music.126.net/Frx9MSEa-t_QtBLNy2GDew==/109951166860255517.jpg",
      "tns": [],
      "pic_str": "109951166860255517",
      "pic": 109951166860255520
    },
    "dt": 322000,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 12894142,
      "vd": -889,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 7736525,
      "vd": -889,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 5157717,
      "vd": -889,
      "sr": 44100
    },
    "sq": null,
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 9,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 35,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7003,
    "mv": 14365577,
    "publishTime": 752083200000
  },
  {
    "name": "甘心替代你",
    "id": 4878120,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 6491,
        "name": "郑伊健",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [
      "电影《古惑仔》插曲"
    ],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 1,
    "v": 684,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 490105,
      "name": "古惑仔最强精选集",
      "picUrl": "http://p3.music.126.net/xAAkmClhcxhFq_7HENxufw==/109951165958487874.jpg",
      "tns": [],
      "pic_str": "109951165958487874",
      "pic": 109951165958487870
    },
    "dt": 207725,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 8309072,
      "vd": -19579,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 4985461,
      "vd": -16960,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3323655,
      "vd": -15227,
      "sr": 44100
    },
    "sq": null,
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 6,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 684,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7001,
    "mv": 0,
    "publishTime": 984326400000
  },
  {
    "name": "耿耿于怀",
    "id": 135355,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 4483,
        "name": "麦浚龙",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "600902000009152083",
    "fee": 0,
    "v": 33,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 13391,
      "name": "Proto",
      "picUrl": "http://p3.music.126.net/S7F9nAxSCtkkR1vGVRK6xw==/109951165115699732.jpg",
      "tns": [],
      "pic_str": "109951165115699732",
      "pic": 109951165115699730
    },
    "dt": 220933,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 8839880,
      "vd": -65945,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 5303946,
      "vd": -63380,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3535978,
      "vd": -61816,
      "sr": 44100
    },
    "sq": {
      "br": 907684,
      "fid": 0,
      "size": 25067258,
      "vd": -65937,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 9,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 0,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 33,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 522010,
    "mv": 0,
    "publishTime": 1080748800000,
    "tns": [
      "Still Haunting Me"
    ]
  },
  {
    "name": "兴风作浪",
    "id": 192941,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 6491,
        "name": "郑伊健",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 70,
    "st": 0,
    "rt": "",
    "fee": 1,
    "v": 14,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 19464,
      "name": "古惑仔 电影音乐大结局",
      "picUrl": "http://p4.music.126.net/4zbvjEMZ-40xYw_MLE2MNw==/109951166706360448.jpg",
      "tns": [],
      "pic_str": "109951166706360448",
      "pic": 109951166706360450
    },
    "dt": 170000,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 6818062,
      "vd": -56461,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 4090878,
      "vd": -56461,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 2727286,
      "vd": -56461,
      "sr": 44100
    },
    "sq": null,
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 10,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 0,
    "originCoverType": 0,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 14,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7001,
    "mv": 0,
    "publishTime": 966960000000
  },
  {
    "name": "乱世巨星",
    "id": 193373,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 2112,
        "name": "陈小春",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 85,
    "st": 0,
    "rt": "",
    "fee": 1,
    "v": 17,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 19502,
      "name": "97古惑仔战无不胜",
      "picUrl": "http://p3.music.126.net/r1KzyvcZnyZ9ocLnPhsOow==/109951165958453204.jpg",
      "tns": [],
      "pic_str": "109951165958453204",
      "pic": 109951165958453200
    },
    "dt": 199549,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 7982019,
      "vd": -29983,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 4789229,
      "vd": -27399,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3192834,
      "vd": -25649,
      "sr": 44100
    },
    "sq": null,
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 3,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 0,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 17,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7001,
    "mv": 0,
    "publishTime": 871574400000
  },
  {
    "name": "烂泥",
    "id": 5231283,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 5787,
        "name": "许志安",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 1,
    "v": 685,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 510645,
      "name": "大男人情歌",
      "picUrl": "http://p4.music.126.net/fUUsGYXs0-VehFtiS_0qFw==/6658642417871083.jpg",
      "tns": [],
      "pic": 6658642417871083
    },
    "dt": 196253,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 7852452,
      "vd": -51234,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 4711489,
      "vd": -48712,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3141007,
      "vd": -47160,
      "sr": 44100
    },
    "sq": {
      "br": 1009439,
      "fid": 0,
      "size": 24763236,
      "vd": -51211,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "01",
    "no": 14,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 2,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 685,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7002,
    "mv": 0,
    "publishTime": 1331136000000
  },
  {
    "name": "你瞒我瞒",
    "id": 25718007,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 2127,
        "name": "陈柏宇",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 1,
    "v": 130,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 2292012,
      "name": "Can't Be Half",
      "picUrl": "http://p4.music.126.net/_gRzbBbtFUU-FeWv17_RcQ==/109951166599470867.jpg",
      "tns": [],
      "pic_str": "109951166599470867",
      "pic": 109951166599470860
    },
    "dt": 239000,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 9565039,
      "vd": -39076,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 5739040,
      "vd": -36464,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3826041,
      "vd": -34808,
      "sr": 44100
    },
    "sq": {
      "br": 753165,
      "fid": 0,
      "size": 22505845,
      "vd": -39070,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 8,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 130,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7001,
    "mv": 0,
    "publishTime": 1261584000000
  },
  {
    "name": "心跳回忆",
    "id": 86971,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 2849,
        "name": "古巨基",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 90,
    "st": 0,
    "rt": "600902000005653313",
    "fee": 1,
    "v": 38,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 8505,
      "name": "游戏 基",
      "picUrl": "http://p3.music.126.net/uP0o1y8zqPT2P7pbYDZuzw==/109951165264460749.jpg",
      "tns": [],
      "pic_str": "109951165264460749",
      "pic": 109951165264460750
    },
    "dt": 196640,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 7868125,
      "vd": -24260,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 4720893,
      "vd": -21654,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3147276,
      "vd": -19962,
      "sr": 44100
    },
    "sq": {
      "br": 860891,
      "fid": 0,
      "size": 21160707,
      "vd": -23563,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 8,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 38,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7002,
    "mv": 0,
    "publishTime": 1067616000000
  },
  {
    "name": "我恨我痴心",
    "id": 110146,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 3691,
        "name": "刘德华",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "600902000005496868",
    "fee": 8,
    "v": 23,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 10900,
      "name": "经典重现",
      "picUrl": "http://p4.music.126.net/4smbvcWyk16SfSouao2UAA==/109951163031587156.jpg",
      "tns": [],
      "pic_str": "109951163031587156",
      "pic": 109951163031587150
    },
    "dt": 250840,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 10036289,
      "vd": -21640,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 6021791,
      "vd": -19197,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 4014542,
      "vd": -17807,
      "sr": 44100
    },
    "sq": {
      "br": 981457,
      "fid": 0,
      "size": 30773590,
      "vd": -21612,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 7,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 23,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 1416089,
    "mv": 0,
    "publishTime": 1070208000000
  },
  {
    "name": "让一切随风",
    "id": 153286,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 5205,
        "name": "谭咏麟",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 90,
    "st": 0,
    "rt": "",
    "fee": 8,
    "v": 24,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 15413,
      "name": "我们一起唱过的歌",
      "picUrl": "http://p4.music.126.net/qNpDwZGJOq0_JEDE2GEz4Q==/17727425975054299.jpg",
      "tns": [],
      "pic_str": "17727425975054299",
      "pic": 17727425975054300
    },
    "dt": 222533,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 8903619,
      "vd": -20969,
      "sr": 44100
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 5342189,
      "vd": -18343,
      "sr": 44100
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 3561474,
      "vd": -16607,
      "sr": 44100
    },
    "sq": {
      "br": 932283,
      "fid": 0,
      "size": 25933015,
      "vd": -20974,
      "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 5,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 8192,
    "originCoverType": 0,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 24,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 7003,
    "mv": 0,
    "publishTime": 1293811200000
  }
]

interface IState {
  // 播放是否为全屏模式
  fullScreen: boolean,
  // 当前歌曲是否播放
  playing: boolean,
  // 顺序列表
  sequencePlayList: any[],
  playList: any[],
  // 播放模式
  mode: playMode,
  // 当前歌曲在播放列表的索引位置
  currentIndex: number,
  // 是否展示播放列表
  showPlayList: boolean,
  // 当前歌曲信息
  currentSong: {
    [propName: string]: any
  }
}

const initialState: IState = {
  fullScreen: false,
  playing: false,
  sequencePlayList: mockPlayList,
  playList: mockPlayList,
  mode: playMode.sequence,
  currentIndex: 0,
  showPlayList: false,
  currentSong: {}
}

const PlayerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    changeFullScreen: (state, action) => {
      state.fullScreen = action.payload;
    },
    changePlaying: (state, action) => {
      state.playing = action.payload;
    },
    changeSequencePlayList: (state, action) => {
      state.sequencePlayList = action.payload;
    },
    changePlayList: (state, action) => {
      state.playList = action.payload;
    },
    changePlayMode: (state, action) => {
      state.mode = action.payload;
    },
    changeCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    changeShowPlayList: (state, action) => {
      state.showPlayList = action.payload;
    }
  }
})

export const { changeCurrentSong, changeFullScreen, changePlaying, changeSequencePlayList, changePlayList, changePlayMode, changeCurrentIndex, changeShowPlayList } = PlayerSlice.actions;
export const reducer = PlayerSlice.reducer;