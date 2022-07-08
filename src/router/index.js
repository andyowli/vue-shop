import Vue from 'vue'
import VueRouter from 'vue-router'

const Layout = () => import('../views/Layout/layout');
const login = () => import('../views/Login/login.vue');
const goods = () => import('../views/Good/goods.vue');
const addGoods = () => import('../views/Good/addGoods/addGoods.vue');
const specifications = () => import('../views/Params/paramsInfo/specifications.vue');
const bar = () => import('../views/echarts/bar.vue');
const contract = () => import('../views/Contract/index.vue');


Vue.use(VueRouter)
//Uncaught (in promise) NavigationDuplicated: Avoided
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/Layout',
    name: 'Layout',
    component: Layout,
    redirect:'/bar',
    meta:{
      isLogin:true,
      title:"首页"
    },
    children:[
      {
        path: '/bar',
        name: 'bar',
        meta:{title:"首页"},
        component: bar
      },
      {
        path: '/goods',
        name: 'goods',
        meta:{title:"商品管理"},
        component: goods
      },
      {
        path: '/addGoods',
        name: 'addGoods',
        meta:{title:"添加商品"},
        component: addGoods
      },
      {
        path: '/specifications',
        name: 'specifications',
        meta:{title:"规格包装"},
        component: specifications
      },
      {
        path: '/contract',
        name: 'contract',
        meta:{title:"合同"},
        component: contract
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
