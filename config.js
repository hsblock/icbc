export const websocketServer = "ws://127.0.0.1:8000/";
export const httpServer = 'http://127.0.0.1:8000/';

function addPrefix(obj, prefix) {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = prefix + obj[key];
    }
  }
  return obj;
}

const ws = {
  warning: 'warning', // 统一对项目中的报警进行管理
  numQueue: 'numQueue', // 统计当前选定区域排队人数
  mostStaningTime: 'mostStaningTime', // 统计当前区域最久停留时间
  face: 'face',
  offlineImage: 'offlineImage', // video
  crossRegion: 'crossRegion', // 统计人员流动
  genderRate: 'genderRate', // 统计男女比例
  ageRate: 'ageRate', // 统计年龄比例
  latestDay: 'latestDay', // 统计最近多个小时内人数
  faceAttr: 'faceAttr', // 主屏幕上滚动显示
  abnormal: 'abnormal', // 异常物品
  leftover: 'leftover', // 遗留物品检测
  managerStatus: 'managerStatus', // 大堂经理状态
  numRegion: 'numRegion', // 区域对应的人数
}

const http = {
  selectPerson: 'selectPerson',
  setQueueSize: 'setQueueSize', // 设置最大等待人数
  setEntrySize: 'setEntrySize', // 设置最大进入人数
  setBankCapacity: 'setBankCapacity', // 设置最大停留人数
  setWaitTime: 'setWaitTime', // 设置最长停留时间
  setWaitNumber: 'setWaitNumber', // 设置最大等待人数
  setLeaveTime: 'setLeaveTime', // 设置最长离岗时间
  setContactTime: 'setContactTime', // 设置最长两人接触时间
  getLastWeekNum: 'getLastWeekNum', // 设置最近七天人数
  backgroundShot: 'backgroundShot', // 遗留物品检测背景拍摄
}

export const server = {
  ws: addPrefix(ws, websocketServer),
  http: addPrefix(http, httpServer)
}