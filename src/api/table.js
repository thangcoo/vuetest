import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/user/inquire',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: '/user/reg',
    method: 'post',
    data
  })
}



export function delet(data) {
  return request({
    url: '/user/del',
    method: 'post',
    data
  })
}
