import request from '@/utils/request'

export function getHomedata() {
  return request({
    url: '/chart/getHomeData',
    method: 'get',
  })
}
