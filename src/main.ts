import { createApp } from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";
import pinia from "@/store";
//引入清除默认样式
import "@/style/reset.scss";
import hospitalTop from "@/components/hospitalTop/index.vue";
import hospitalBottom from "@/components/hospitalBottom/index.vue";
import login from "@/components/login/index.vue";
import countDown from "@/components/countDown/index.vue";
import visitor from "@/components/visitor/visitor.vue";
//引入vue-router核心插件并安装
import router from "./router/index";
import "@/permisstion";
const app = createApp(App);
app.component("HospitalTop", hospitalTop);
app.component("HospitalBottom", hospitalBottom);
app.component("login", login);
app.component("countDown", countDown);
app.component("Visitor", visitor);
//安装vue-router
app.use(router);
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(pinia);
app.mount("#app");
