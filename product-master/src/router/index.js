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
        path: '/bararchives',
        name: '车辆档案',
        component: () => import('../components/frame/src/bar/bararchives/bararchives.vue'),
      },
      {
        path: '/maintenance',
        name: '车辆保养明细',
        component: () => import('../components/frame/src/bar/maintenance/maintenance.vue'),
      },
      {
        path: '/barbasic',
        name: '车辆保养基础信息',
        component: () => import('../components/frame/src/bar/barbasic/barbasic.vue'),
      },
      //车辆维修管理
      {
        path: '/reportRep',
        name: '车辆报修记录',
        component: () => import('../components/frame/src/barrepair/report/report.vue'),
      },
      {
        path: '/dispatch',
        name: '车辆派修记录',
        component: () => import('../components/frame/src/barrepair/dispatch/dispatch.vue'),
      },
      {
        path: '/carrepair',
        name: '车辆维修记录',
        component: () => import('../components/frame/src/barrepair/carrepair/carrepair.vue'),
      },
      {
        path: '/workhour',
        name: '维修人员工时记录',
        component: () => import('../components/frame/src/barrepair/workhour/workhour.vue'),
      },
      {
        path: '/statistics',
        name: '工时统计表',
        component: () => import('../components/frame/src/barrepair/statistics/statistics.vue'),
      },
      {
        path: '/access',
        name: '车辆进出场明细',
        component: () => import('../components/frame/src/barrepair/access/access.vue'),
      },
      {
        path: '/user',
        name: '用户管理',

        component: () => import('../components/frame/src/system/user/user.vue'),
      },
      {
        path: '/journal',
        name: '系统日志',
        component: () => import('../components/frame/src/system/log/log.vue'),
      },

      {
        path: '/role',
        name: '角色管理',

        component: () => import('../components/frame/src/system/role/role.vue'),
      },

      {
        path: '/outperson',
        name: '外来人员登记记录',
        component: () => import('../components/frame/src/security/outperson/outperson.vue'),
      },
      {
        path: '/violation',
        name: '违规记录',
        component: () => import('../components/frame/src/security/violation/violation.vue'),
      },
      {
        path: '/frequency',
        name: '车辆维修次数排名',
        component: () => import('../components/frame/src/report/frequency/frequency.vue'),
      },
      {
        path: '/failure',
        name: '车辆故障原因汇总',
        component: () => import('../components/frame/src/report/failure/failure.vue'),
      },
      {
        path: '/history',
        name: '维修量历史数据汇总',
        component: () => import('../components/frame/src/report/history/history.vue'),
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