import { createRouter, createWebHashHistory } from "vue-router";
// import HelloWorld from '../components/HelloWorld.vue';
// import BigScreen from '../components/screen/BigScreen.vue';
import ManageMent from '../components/management.vue';
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      requiresAuth: false, // false表示不需要登录
      },
    component: () => import('../components/frame/src/login/login.vue'),
  },
  {
    path: '/manageMent',
    name: 'manageMent',
    redirect: '/home',
    component: ManageMent,
    meta: {
      title: '首页',
      requiresAuth: true, // true表示需要登录
    },
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('../components/frame/src/home/home.vue'),
      },
      {
        path: '/repair',
        name: '维修人员档案',
        icon: 'location',
        component: () => import('../components/frame/src/personfile/personfile.vue'),
      },
      {
        path: '/basicinfo',
        name: '客户基础信息',
        component: () => import('../components/frame/src/custominfo/basic/basicinfo.vue'),
      },
      {
        path: '/blacklist',
        name: '黑名单客户信息',
        component: () => import('../components/frame/src/custominfo/blacklist/blacklist.vue'),
      },
    ]
  },
];
const router = createRouter({
  mode:'history',
  history: createWebHashHistory(),
  routes
});
export default router;