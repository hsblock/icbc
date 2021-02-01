export const versionCompare = (v1, v2) => {
  // xx.xx.xx
  const regex = /[a-zA-Z\s]*(([1-9]\d|\d)(.([1-9]\d|\d)){2})/g
  const v1Match = regex.exec(v1)[1];
  regex.lastIndex = 0;
  const v2Match = regex.exec(v2)[1];
  console.log("v1: ", v1Match);
  console.log("v2: ", v2Match);
  const v1Arr = v1Match.split('.');
  const v2Arr = v2Match.split('.');
  for (let i = 0; i < Math.min(v1Arr.length, v2Arr.length); i++) {
    if (+v1Arr[i] > +v2Arr[i]) {
      return 1;
    } else if (+v2Arr[i] > v1Arr[i]) {
      return -1;
    }
  }
  if (v1Arr.length > v2Arr.length) {
    return 1;
  } else if (v2Arr.length > v1Arr.length)  {
    return -1;
  } else {
    return 0;
  }
}
