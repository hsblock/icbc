# icbc

### 调试步骤

1. git项目代码

   ```bash
   git clone https://github.com/hsblock/icbc.git
   ```

2. 切换到 dist 分支

   ```bash
   cd icbc
   git checkout dist
   ```

3. 浏览器打开 index.html 即可调试（使用 Internet Explorer 会出现不兼容的情况）

4. 点击右上角的齿轮按钮，即可配置本地 websocket 和 http url地址及端口号（按照默认形式即可，不需要添加 http 和 ws，点击确定后可以再次点击齿轮查看是否更新成功）

### BUG 调试

BUG 调试主要有以下几个方面：

1. 检查 index.html **页面功能**是否正常；
2. 打开浏览器调试工具 - 控制台，查看对应接口数据**打印信息**及**报错信息**；
3. 打开浏览器调试工具 - **网络**，查看是否与对应后端接口建立连接及通信数据。

### 接口信息

1. websocket 接口

| 接口名称 | 数据格式 | 接口描述 | 备注 |
| ---- | ---- | ---- | ---- |
| warning |      | 统一对项目中的报警进行管理 | :x: |
| numQueue | { 'numberOfQueue': 12 } | 统计当前选定区域排队人数 | :heavy_check_mark: |
| mostStaningTime | { 'mostStaningTime': 123 } | 统计当前区域最久停留时间 | :heavy_check_mark: |
| offlineImage |  | 视频 | :heavy_check_mark: |
| crossRegion | { 'numArea': 3, 'flow': [12, 123] } | 统计人员流动 | :x: |
| genderRate | { 男: 20, 女: 10 } | 统计男女比例 | :heavy_check_mark: |
| ageRate | { 'age': [12, 13, 20, 23] } | 统计年龄比例 | :heavy_check_mark: |
| latestDay | { 'population': [12, 34] } | 统计最近多个小时内人数 | :heavy_check_mark: |
| faceAttr | { 'img': base64, 'age': 13, 'gender': 男 } | 主屏幕上滚动显示 | :heavy_check_mark: |
| abnormal | { 'name': 'knife', 'img': base64 } | 异常物品 | :heavy_check_mark: |
| leftover | { 'name': 'bag', 'img': base64 } | 遗留物品检测 | :heavy_check_mark: |
| managerStatus | { 'status': '在岗/暂离/离岗' } | 大堂经理状态 | :heavy_check_mark: |
| numRegion | { 'infos': [{ 'name': 'region1', 'numPerson': 12, 'avgStayTime': 123 }] } | 区域对应的人数 | :x: |

2. http

| 接口名称        | 数据格式               | 接口描述             | 备注               |
| --------------- | ---------------------- | -------------------- | ------------------ |
| selectPerson    |                        | 人员追踪             | :heavy_check_mark: |
| setQueueSize    |                        |                      | :question:         |
| setEntrySize    | { 'entrySize': 13 }    | 设置最大进入人数     | :x:                |
| setBankCapacity | { 'bankCapacity': 34 } | 设置最大停留人数     | :x:                |
| setWaitTime     | { 'waitTime': 12 }     | 设置最长停留时间     | :heavy_check_mark: |
| setWaitNumber   | { 'waitNumber': 23 }   | 设置最大等待人数     | :heavy_check_mark: |
| setLeaveTime    | { 'leaveTime': 12 }    | 设置最长离岗时间     | :x:                |
| setContactTime  | { 'contactTime': 12 }  | 设置最长两人接触时间 | :heavy_check_mark: |
| getLastWeekNum  |                        | 设置最近七天人数     | :heavy_check_mark: |
| backgroundShot  |                        | 遗留物品检测背景拍摄 | :x:                |

