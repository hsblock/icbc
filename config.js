export const websocketServer = "ws://211.67.20.171:8081/";
export const httpServer = 'http://211.67.20.171:8081/';

function addPrefix(obj, prefix) {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = prefix + obj[key];
    }
  }
  return obj;
}

const ws = {
  warning: 'warning',
  numQueue: 'numQueue',
  face: 'face',
  offlineImage: 'offlineImage'
}

const http = {
  selectPerson: 'selectPerson'
}

export const server = {
  ws: addPrefix(ws, websocketServer),
  http: addPrefix(http, httpServer)
}
