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
  userMine: () => import('@/views/users/userMine'),
  editPassword: () => import('@/views/users/editPassword'),
  detailsUsers:() => import('@/views/users/detailsUsers'),
  category: () => import('@/views/books/category/category'),
  cateBooks: () => import('@/views/books/category/cateBooks'),
  cateEdit: () => import('@/views/books/category/cateEdit'),
  cateAdd: () => import('@/views/books/category/cateAdd'),
  cateBookAdd: () =>import('@/views/books/category/cateBookAdd'),
  bookDetail: () => import('@/views/books/book/bookDetail'),
  bookEdit: () => import('@/views/books/book/bookEdit'),
  bookAll: () => import('@/views/books/book/bookAll'),
  bookAdd: () => import('@/views/books/book/bookAdd'),
  swiper:  () => import('@/views/swiper/index'),
  addSwiper: () => import('@/views/swiper/addSwiper')
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
          path:'detailsUsers',
          component:components.detailsUsers,
          meta:{
            title:'信息详情'
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
          path:'cateEdit',
          name:'cateEdit',
          component:components.cateEdit,
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
        },
        {
          path:'userMine',
          component:components.userMine,
          meta:{
            title:'个人中心'
          }
        },
        {
          path:'editPassword',
          component:components.editPassword,
          meta:{
            title:'修改密码'
          }
        },
        {
          path:'bookDetail',
          name:'bookDetail',
          component:components.bookDetail,
          meta:{
            title:'分类下书籍'
          }
        },
        {
          path:'bookEdit',
          name:'bookEdit',
          component:components.bookEdit,
          meta:{
            title:'修改图书'
          }
        },
        {
          path:'bookAll',
          component:components.bookAll,
          meta:{
            title:'图书列表'
          }
        },
        {
          path:'bookAdd',
          component:components.bookAdd,
          meta:{
            title:'添加图书'
          }
        },
        {
          path:'cateBookAdd',
          name:'cateBookAdd',
          component:components.cateBookAdd,
          meta:{
            title:'添加图书 '
          }
        },
        {
          path:'swiper',
          name:'swiper',
          component:components.swiper,
          meta:{
            title:'轮播图'
          }
        },
        {
          path:'editSwiper',
          name:'editSwiper',
          component:components.addSwiper,
          meta:{
            title:'修改轮播图'
          }
        },
        {
          path:'addSwiper',
          name:'addSwiper',
          component:components.addSwiper,
          meta:{
            title:'添加轮播图'
          }
        }
      ]
    },
  ]
})
