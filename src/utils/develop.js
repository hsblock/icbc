export const versionCompare = (v1, v2) => {
  // xx.xx.xx
  const regex = /[a-zA-Z\s]*(([1-9]\d|\d)(.([1-9]\d|\d)){2})/g
  const v1Match = regex.exec(v1)[1];
  regex.lastIndex = 0;
  const v2Match = regex.exec(v2)[1];
  const v1Arr = v1Match.split('.');
  const v2Arr = v2Match.split('.');
  for (let i = 0; i < 3; i++) {
    if (+v1Arr[i] > +v2Arr[i]) {
      // 2: 相差大版本, 1: 相差小版本
      return i === 2 ? 1 : 2;
    } else if (+v2Arr[i] > v1Arr[i]) {
      return -1;
    }
  }
  return 0;
}
