# icbc

### 使用方法

2. 下载 [releases](https://github.com/hsblock/icbc/releases)

   解压后浏览器打开 index.html 即可使用。
   
   点击右上角的齿轮按钮，即可配置本地 websocket 和 http 的 url 地址及端口号（按照默认形式即可，不需要添加 http 和 ws，点击确定后可以再次点击齿轮查看是否更新成功）。

### BUG 调试

BUG 调试主要有以下几个方面：

1. 检查 index.html **页面功能**是否正常；
2. 打开浏览器调试工具 - 控制台，查看对应接口数据**打印信息**及**报错信息**；
3. 打开浏览器调试工具 - **网络**，查看是否与对应后端接口建立连接及通信数据。

### 接口信息

1. websocket 接口

| 接口名称 | 数据格式 | 接口描述 | 备注 |
| ---- | ---- | ---- | ---- |
| warning | { 'message': message } | 统一对项目中的报警进行管理 | :heavy_check_mark: |
| numQueue | { 'numberOfQueue': 12 } | 获取当前选定区域排队人数 | :heavy_check_mark: |
| mostStandingTime | { 'mostStandingTime': 123 } | 获取当前区域最长停留时间 | :heavy_check_mark: |
| mostContactTime | { mostContactTime: 12 } | 获取最长接触时间 | :heavy_check_mark: |
| offlineImage |  | 视频 | :heavy_check_mark: |
| crossRegion | { 'numArea': 3, 'flow': [12, 123] } | 获取人员流动信息 | :x: |
| genderRate | { 男: 20, 女: 10 } | 获取男女比例 | :heavy_check_mark: |
| ageRate | { 'age': [12, 13, 20, 23] } | 获取年龄比例 | :heavy_check_mark: |
| latestDay | { 'population': [12, 34] } | 获取当天客流统计信息 | :heavy_check_mark: |
| faceAttr | { 'img': base64, 'age': 13, 'gender': 男 } | 获取人脸检测信息 | :heavy_check_mark: |
| abnormal | { 'name': 'knife', 'img': base64 } | 异常物品检测 | :heavy_check_mark: |
| leftover | { 'name': 'bag', 'img': base64 } | 遗留物品检测 | :heavy_check_mark: |
| managerStatus | { 'status': '在岗/暂离/离岗' } | 大堂经理状态 | :heavy_check_mark: |
| numRegion | { 'infos': [{ 'name': 'region1', 'numPerson': 12, 'avgStayTime': 123 }] } | 区域对应的人数 | :x: |

2. http

**“xxx上限”接口在页面打开时会从后端获取对应初始数据**

| 接口名称        | 数据格式                                                     | 接口描述                                                     | 备注               |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------ |
| selectPerson    | { 'x': 0.13, 'y': 0.24 }                                     | 人员追踪                                                     | :heavy_check_mark: |
| setEntrySize    | { 'entrySize': 13 }                                          | 设置客流上限                                                 | :heavy_check_mark: |
| setBankCapacity | { 'bankCapacity': 34 }                                       | 设置停留人数上限                                             | :question:         |
| setWaitTime     | { 'waitTime': 12 }                                           | 设置停留时间上限                                             | :heavy_check_mark: |
| setWaitNumber   | { 'waitNumber': 23 }                                         | 设置等待人数上限                                             | :heavy_check_mark: |
| setLeaveTime    | { 'leaveTime': 12 }                                          | 设置离岗时间上限                                             | :heavy_check_mark: |
| setContactTime  | { 'contactTime': 12 }                                        | 设置接触时间上限                                             | :heavy_check_mark: |
| getEntrySize    | { 'entrySize': 13 }                                          | 获取客流上限                                                 | :heavy_check_mark: |
| getBankCapacity | { 'bankCapacity': 34 }                                       | 获取停留人数上限                                             | :question:         |
| getWaitTime     | { 'waitTime': 12 }                                           | 获取停留时间上限                                             | :heavy_check_mark: |
| getWaitNumber   | { 'waitNumber': 23 }                                         | 获取等待人数上限                                             | :heavy_check_mark: |
| getLeaveTime    | { 'leaveTime': 12 }                                          | 获取离岗时间上限                                             | :heavy_check_mark: |
| getContactTime  | { 'contactTime': 12 }                                        | 获取接触时间上限                                             | :heavy_check_mark: |
| getLastWeekNum  |                                                              | 获取历史七天客流                                             | :heavy_check_mark: |
| backgroundShot  |                                                              | 遗留物品检测背景拍摄                                         | :heavy_check_mark: |
| areaHandle      | 1. get 请求<br />{ 'flag': 'get_image', 'topic': '...' }<br />2. post 请求<br />{ 'flag': 'send_area', 'topic': '...', 'area': [[10, 20], [20, 30]], 'size': [800, 600] } | 区域划分<br />1. get 请求选取主题<br />2. post 请求选定区域，area 为区域顶点坐标，size 为图片大小 |                    |

3. m3u8 视频推流接口

| 接口名称  | 接口描述               | 备注 |
| --------- | ---------------------- | ---- |
| face      | 进店视频流接口         |      |
| queue     | 排队视频流接口         |      |
| dangerous | 危险物品检测视频流接口 |      |
| leftover  | 遗留物品检测视频流接口 |      |
| standing  | 停留时间视频流接口     |      |
| offline   | 离岗检测视频流接口     |      |

**注意：前端页面显示“xxx已被设置为xxx”并不代表设置成功，只代表 http 请求成功，需检查后端接口或数据库信息！**

**最好在后端提供该类信息，并在 http response 中返回给前端，数据格式设置为 { 'message': 'xxx已被设置为xxx' }**
