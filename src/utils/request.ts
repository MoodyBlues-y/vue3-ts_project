import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  let userStore = useUserStore();
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let status = error.response.status;
    let message = "";
    switch (status) {
      case 402:
        message = "参数有误";
        break;
      case 404:
        message = "请求失败路径出现问题";
        break;
      case 500 | 501 | 502 | 503 | 504 | 505:
        message = "服务器挂了";
        break;
    }
    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(new Error(error.message));
  }
);

export default request;
