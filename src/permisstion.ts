import router from "./router/index";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import useUserStore from "@/store/modules/user";

Nprogress.configure({ showSpinner: false });
router.beforeEach((to, from, next) => {
  Nprogress.start();
  document.title = `尚医通-${to.meta.title}`;
  let routeList = [
    "/home",
    "/hospital/register",
    "/hospital/detail",
    "/hospital/notice",
    "/hospital/close",
    "/hospital/search",
  ];
  if (routeList.includes(to.path)) {
    next();
  } else {
    const userStore = useUserStore();
    if (userStore.userInfo.token) {
      next();
    } else {
      userStore.visiable = true;
      next({ path: "/home", query: { redirect: to.fullPath } });
    }
  }
});

router.afterEach((to, from) => {
  Nprogress.done();
});
