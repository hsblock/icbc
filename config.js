export const version = 'ICBC v1.4.0';

export const httpUrl = () => (window.localStorage.getItem('httpUrl') || '127.0.0.1');
export const websocketUrl = () => (window.localStorage.getItem('websocketUrl') || '127.0.0.1');
export const httpPort = () => (window.localStorage.getItem('httpPort') || '8000');
export const websocketPort = () => (window.localStorage.getItem('websocketPort') || '8000');

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
  warning: 'warning', // 统一对项目中的报警进行管理 { 'message': message }
  numQueue: 'numQueue', // 获取当前选定区域排队人数 { 'numberOfQueue': 12 }
  mostStaningTime: 'mostStaningTime', // 获取当前区域最长停留时间 { 'mostStaningTime': 123 }
  mostContactTime: 'mostContactTime', // 获取最长接触时间 { mostContactTime: 12 }
  offlineImage: 'offlineImage', // video
  crossRegion: 'crossRegion', // 获取人员流动信息 { 'numArea': 3, 'flow': [12, 123] }
  genderRate: 'genderRate', // 获取男女比例 { 男: 20, 女: 10 }
  ageRate: 'ageRate', // 获取年龄比例 { 'age': [12, 13, 20, 23] }
  latestDay: 'latestDay', // 获取当天客流统计信息 { 'population': [12, 34] }
  faceAttr: 'faceAttr', // 获取人脸检测信息 [ 'infos': { 'img': base64, 'age': 13, 'gender': 男 } ]
  abnormal: 'abnormal', // 异常物品检测 { 'name': 'knife', 'img': base64 }
  leftover: 'leftover', // 遗留物品检测 { 'name': 'bag', 'img': base64 }
  managerStatus: 'managerStatus', // 大堂经理状态 { 'status': '在岗、暂离、离岗' }
  numRegion: 'numRegion', // 区域对应的人数 { 'infos': [{ 'name': 'region1', 'numPerson': 12, 'avgStayTime': 123 }] }
}

const http = {
  selectPerson: 'selectPerson', // 人员追踪 { 'x': 0.13, 'y': 0.24 }
  setEntrySize: 'setEntrySize', // 设置客流上限 { 'entrySize': 13 }
  setBankCapacity: 'setBankCapacity', // 设置停留人数上限 { 'bankCapacity': 34 }
  setWaitTime: 'setWaitTime', // 设置停留时间上限 { 'waitTime': 12 }
  setWaitNumber: 'setWaitNumber', // 设置等待人数上限 { 'waitNumber': 23 }
  setLeaveTime: 'setLeaveTime', // 设置离岗时间上限 { 'leaveTime': 12 }
  setContactTime: 'setContactTime', // 设置接触时间上限 { 'contactTime': 12 }
  getEntrySize: 'getEntrySize', // 获取客流上限 { 'entrySize': 13 }
  getBankCapacity: 'getBankCapacity', // 获取停留人数上限 { 'bankCapacity': 34 }
  getWaitTime: 'getWaitTime', // 获取停留时间上限 { 'waitTime': 12 }
  getWaitNumber: 'getWaitNumber', // 获取等待人数上限 { 'waitNumber': 23 }
  getLeaveTime: 'getLeaveTime', // 获取离岗时间上限 { 'leaveTime': 12 }
  getContactTime: 'getContactTime', // 获取接触时间上限 { 'contactTime': 12 }
  getLastWeekNum: 'getLastWeekNum', // 获取历史七天客流 { 'lastWeekNum': [3, 3, 7, 9, 2, 3, 6] }
  backgroundShot: 'backgroundShot', // 遗留物品检测背景拍摄
  areaHandle: 'areaHandle', // 区域划分
}

export const server = () => {
  return {
    ws: addPrefix(ws, websocketServer()),
    http: addPrefix(http, httpServer())
  }
}