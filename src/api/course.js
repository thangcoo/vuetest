import request from '@/utils/request'

export function getCourses(data) {
  return request({
    url: '/course/inquire',
    method: 'post',
    data
  })
}
export function addCourse(data) {
  return request({
    url: '/course/add',
    method: 'post',
    data
  })
}
export function updateCourse(data) {
  return request({
    url: '/course/update',
    method: 'post',
    data
  })
}
export function delCourse(data) {
  return request({
    url: '/course/del',
    method: 'post',
    data
  })
}
