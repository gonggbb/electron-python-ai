import request from './request';

export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  });
}
