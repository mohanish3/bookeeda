import {LOGIN} from './types';

export function storeUserInfo(userInfo) {
  return {
    type: LOGIN,
    payload: userInfo,
  };
}
