import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    roles:['0','1','2'],
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'form' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/index',
    roles:['0'],
    children: [{
      path: 'index',
      name: 'User',
      component: () => import('@/views/user/index'),
      meta: { title: '用户管理', icon: 'user' }
    }]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/index',
    roles: ['0'],
    children: [{
      path: 'index',
      name: 'Course',
      component: () => import('@/views/course/index'),
      meta: {title: '课程管理', icon: 'link'}
    }]
  },
  {
    path: '/unsel-course',
    component: Layout,
    redirect: '/index',
    roles:['2'],
    children: [
      {
        path: 'index',
        component: () => import('@/views/course/index'),
        name: 'unselfCourse',
        meta: {title: '我要选课', icon: 'link'},
      }
    ]

  },
  {
    path: '/self-course',
    component: Layout,
    redirect: '/index',
    roles:['1','2'],
    children: [
      {
        path: 'index',
        component: () => import('@/views/course/index'),
        name: 'selfCourse',
        meta: {title: '我的课程', icon: 'example'},
      }
        ]

  },

  {
    path: '/report',
    component: Layout,
    roles:['2'],
    redirect:'/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/report/index'),
        name: 'report',
        meta: {title: '学习报告', icon: 'eye-open'},
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
