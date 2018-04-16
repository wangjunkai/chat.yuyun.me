/**
 * Created by wangjunkai on 2017/9/15.
 */

import * as msg from '../actions/message'
import * as news from '../actions/index'

import io from 'socket.io-client';

const socketPath = 'http://localhost:12302/chat';

class socketApi {
  socket;

  connect() {
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
          return reject(response);
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
  const {sock, after} = promise;

  return sock(socket)
    .then((result) => {
      const _result = {
        _result: result
      }
      after && after(store.dispatch, _result);
      next({..._result, type: action.type});
    })
    .catch((error) => {
      setTimeout(() => {
        store.dispatch(msg.createMessage({message: error.message, class: news.NEWS_ERROR, delay: 2000}));
      }, 0);
    })
};