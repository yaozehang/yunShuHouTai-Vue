import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  login : () => import('@/views/login/login'),
  layout: () => import('@/views/layout/layout'),
  index:  () => import('@/views/index/index'),
  users:  () => import('@/views/users/index'),
  addUsers: () => import('@/views/users/addUsers'),
  changeUser: () => import('@/views/users/changeUser'),
  category: () => import('@/views/books/category'),
  cateBooks: () => import('@/views/books/cateBooks'),
  cateChange: () => import('@/views/books/cateChange'),
  cateAdd: () => import('@/views/books/cateAdd')
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
      name:'layout',
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
        },
        {
          path:'category',
          component:components.category,
          meta:{
            title:'图书分类'
          }
        },
        {
          path:'changeUser',
          component:components.changeUser,
          meta:{
            title:'修改信息'
          }
        },
        {
          path:'cateBooks',
          name:'cateBooks',
          component:components.cateBooks,
          meta:{
            title:'分类下图书'
          }
        },
        {
          path:'cateChange',
          name:'cateChange',
          component:components.cateChange,
          meta:{
            title:'修改分类'
          }
        },
        {
          path:'cateAdd',
          component:components.cateAdd,
          meta:{
            title:'添加分类'
          }
        }
      ]
    },
  ]
})
