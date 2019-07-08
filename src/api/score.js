import request from '@/utils/request'

export function getScore(data) {
  return request({
    url: '/score/inquire',
    method: 'post',
    data
  })
}
export function getchartScore(data) {
  return request({
    url: '/chart/getScore',
    method: 'post',
    data
  })
}
export function updateScore(data) {
  return request({
    url: '/score/update',
    method: 'post',
    data
  })
}
