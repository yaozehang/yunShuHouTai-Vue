import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  login : () => import('@/views/login/login'),
  layout: () => import('@/views/layout/layout'),
  index:  () => import('@/views/index/index'),
  users:  () => import('@/views/users/index'),
  addUsers: () => import('@/views/users/addUsers')
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      component: components.login
    },
    {
      path:'/layout',
      component: components.layout,
      redirect:'/layout/index',
      meta:{
        title:'首页'
      },
      children:[
        {
          path:'index',
          component:components.index
        },
        {
          path:'users',
          meta:{
            title:'用户管理'
          },
          component:components.users
        },
        {
          path:'addUsers',
          meta:{
            title:'添加新用户'
          },
          component:components.addUsers
        }
      ]
    }
  ]
})
