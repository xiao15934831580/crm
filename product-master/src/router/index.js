import { createRouter, createWebHashHistory } from "vue-router";
// import HelloWorld from '../components/HelloWorld.vue';
// import BigScreen from '../components/screen/BigScreen.vue';
import ManageMent from '../components/management.vue';
const routes = [
  {
    path: '/',
    redirect: '/manageMent',
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   meta: {
  //     title: '登录',
  //     requiresAuth: false, // false表示不需要登录
  //     },
  //   component: () => import('../components/frame/src/login/login.vue'),
  // },
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
        component: () => import('../components/frame/src/crm/custominfo/basic/basicinfo.vue'),
      },
      {
        path: '/blacklist',
        name: '黑名单客户信息',
        component: () => import('../components/frame/src/crm/custominfo/blacklist/blacklist.vue'),
      },
      {
        path: '/maintain',
        name: '客户维护与关怀',
        component: () => import('../components/frame/src/crm/custominfo/maintain/maintain.vue'),
      },
      {
        path: '/powerstationinfo',
        name: '客户电站信息',
        component: () => import('../components/frame/src/crm/custominfo/powerstationinfo/powerstationinfo.vue'),
      },
      {
        path: '/insurancelist',
        name: '电站保险与理赔',
        component: () => import('../components/frame/src/crm/powerInsurance/insurancelist/insurancelist.vue'),
      },
      {
        path: '/policyremind',
        name: '保单提醒',
        component: () => import('../components/frame/src/crm/powerInsurance/policyremind/policyremind.vue'),
      },
      {
        path: '/claimsprocess',
        name: '电站理赔流程',
        component: () => import('../components/frame/src/crm/powerInsurance/claimsprocess/claimsprocess.vue'),
      },
      {
        path: '/businessexpansion',
        name: '电商拓展',
        component: () => import('../components/frame/src/crm/businessexpansion/businessexpansion.vue'),
      },
      {
        path: '/unaudited',
        name: '未审核工单',
        component: () => import('../components/frame/src/wokeorder/unaudited/unaudited.vue'),
      },
      {
        path: '/approved',
        name: '已审核工单',
        component: () => import('../components/frame/src/wokeorder/approved/approved.vue'),
      },
      {
        path: '/completed',
        name: '已完成工单',
        component: () => import('../components/frame/src/wokeorder/completed/completed.vue'),
      },
      {
        path: '/agentinfo',
        name: '代理商信息',
        component: () => import('../components/frame/src/crmagent/agentinfo/agentinfo.vue'),
      },
      {
        path: '/ratingmodel',
        name: '评级模型设置',
        component: () => import('../components/frame/src/crmagent/ratingmodel/ratingmodel.vue'),
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