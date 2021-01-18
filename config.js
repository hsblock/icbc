const httpUrl = () => (window.localStorage.getItem('httpUrl') || '127.0.0.1');
const websocketUrl = () => (window.localStorage.getItem('websocketUrl') || '127.0.0.1');
const httpPort = () => (window.localStorage.getItem('httpPort') || '8000');
const websocketPort = () => (window.localStorage.getItem('websocketPort') || '8000');

const websocketServer = () => `ws://${websocketUrl()}:${websocketPort()}/`;
const httpServer = () => `http://${httpUrl()}:${httpPort()}/`;

function addPrefix(obj, prefix) {
  const obj1 = {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj1[key] = prefix + obj[key];
    }
  }
  return obj1;
}

const ws = {
  warning: 'warning', // 统一对项目中的报警进行管理
  numQueue: 'numQueue', // 统计当前选定区域排队人数 { 'numberOfQueue': 12 }
  mostStaningTime: 'mostStaningTime', // 统计当前区域最久停留时间 { 'mostStaningTime': 123 }
  face: 'face',
  offlineImage: 'offlineImage', // video
  crossRegion: 'crossRegion', // 统计人员流动 { 'numArea': 3, 'flow': [12, 123] }
  genderRate: 'genderRate', // 统计男女比例 { 男: 20, 女: 10 }
  ageRate: 'ageRate', // 统计年龄比例 { 'age': [12, 13, 20, 23] }
  latestDay: 'latestDay', // 统计最近多个小时内人数 { 'population': [12, 34] }
  faceAttr: 'faceAttr', // 主屏幕上滚动显示 { 'img': base64, 'age': 13, 'gender': 男 }
  abnormal: 'abnormal', // 异常物品 { 'name': 'knife', 'img': base64 }
  leftover: 'leftover', // 遗留物品检测 { 'name': 'bag', 'img': base64 }
  managerStatus: 'managerStatus', // 大堂经理状态 { 'status': '在岗、暂离、离岗' }
  numRegion: 'numRegion', // 区域对应的人数 { 'infos': [{ 'name': 'region1', 'numPerson': 12, 'avgStayTime': 123 }] }
}

const http = {
  selectPerson: 'selectPerson',
  setQueueSize: 'setQueueSize', // 设置最大等待人数 { 'queueSize': 12 }
  setEntrySize: 'setEntrySize', // 设置最大进入人数 { 'entrySize': 13 }
  setBankCapacity: 'setBankCapacity', // 设置最大停留人数 { 'bankCapacity': 34 }
  setWaitTime: 'setWaitTime', // 设置最长停留时间 { 'waitTime': 12 }
  setWaitNumber: 'setWaitNumber', // 设置最大等待人数 { 'waitNumber': 23 }
  setLeaveTime: 'setLeaveTime', // 设置最长离岗时间 { 'leaveTime': 12 }
  setContactTime: 'setContactTime', // 设置最长两人接触时间 { 'contactTime': 12 }
  getLastWeekNum: 'getLastWeekNum', // 设置最近七天人数
  backgroundShot: 'backgroundShot', // 遗留物品检测背景拍摄
}

export const server = () => {
  return {
    ws: addPrefix(ws, websocketServer()),
    http: addPrefix(http, httpServer())
  }
}