/**
 * Created by wangjunkai on 2017/9/15.
 */

import io from 'socket.io-client';
const socketPath = '/chat';
class socketApi {
  socket;

  connect() {
    debugger
    this.socket = io(socketPath);
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => resolve());
      this.socket.on('connect_error', (error) => reject(error));
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      this.socket.disconnect(() => {
        this.socket = null;
        resolve();
      });
    });
  }

  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');

      return this.socket.emit(event, data, (response) => {
        if (response.error) {
          console.error(response.error);
          return reject(response.error);
        }

        return resolve(response);
      });
    });
  }

  on(event, fun) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');

      this.socket.on(event, fun);
      resolve();
    });
  }
}
const socket = new socketApi();
socket.connect();

export default store => next => action => {

  const {promise} = action;

  if (!promise) {
    return next(action);
  }

  return promise(socket)
    .then((result) => {
      return next({...result, type: action.type});
    })
    .catch((error) => {
      debugger
      //return next({...rest, error, type: FAILURE});
    })
};