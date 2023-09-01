import { createRouter, createWebHistory } from "vue-router";
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("@/pages/home/index.vue"),
      meta: { title: "首页" },
    },
    {
      path: "/hospital",
      component: () => import("@/pages/hospital/index.vue"),
      redirect: "/hospital/register",
      children: [
        {
          path: "register",
          component: () =>
            import("@/pages/hospital/components/register/index.vue"),
          meta: { title: "预约挂号" },
        },
        {
          path: "register_step1",
          component: () =>
            import("@/pages/hospital/components/register/register_step1.vue"),
          meta: { title: "挂号第一步" },
        },
        {
          path: "register_step2",
          component: () =>
            import("@/pages/hospital/components/register/register_step2.vue"),
          meta: { title: "挂号第二步" },
        },
        {
          path: "detail",
          component: () =>
            import("@/pages/hospital/components/detail/index.vue"),
          meta: { title: "医院详情" },
        },
        {
          path: "notice",
          component: () =>
            import("@/pages/hospital/components/notice/index.vue"),
          meta: { title: "预约须知" },
        },
        {
          path: "close",
          component: () =>
            import("@/pages/hospital/components/close/index.vue"),
          meta: { title: "停诊信息" },
        },
        {
          path: "search",
          component: () =>
            import("@/pages/hospital/components/search/index.vue"),
          meta: { title: "查询" },
        },
      ],
    },
    {
      path: "/wxlogin",
      component: () => import("@/pages/wxlogin/index.vue"),
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/user",
      component: () => import("@/pages/user/index.vue"),
      children: [
        {
          path: "certification",
          component: () => import("@/pages/user/certification/index.vue"),
          meta: { title: "实名认证" },
        },
        {
          path: "order",
          component: () => import("@/pages/user/order/index.vue"),
          meta: { title: "挂号订单" },
        },
        {
          path: "patient",
          component: () => import("@/pages/user/patient/index.vue"),
          meta: { title: "就诊人管理" },
        },
        {
          path: "profile",
          component: () => import("@/pages/user/profile/index.vue"),
          meta: { title: "账号信息" },
        },
        {
          path: "feedback",
          component: () => import("@/pages/user/feedback/index.vue"),
          meta: { title: "意见反馈" },
        },
      ],
      redirect: "/user/certification",
    },
  ],
  //滚动行为：控制滚动条位置
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
