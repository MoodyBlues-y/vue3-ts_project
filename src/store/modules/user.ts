import { defineStore } from "pinia";
import { reqGetCode, reqUserLogin } from "@/api/hospital/index";
import type { LoginData, UserLoginResponseData } from "@/api/hospital/type";
import type { UserState } from "./interface/index";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/user";

const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      visiable: false,
      code: "",
      userInfo: JSON.parse(GET_TOKEN()) || {},
    };
  },
  actions: {
    //获取验证码的方法
    async getCode(phone: string) {
      let result = await reqGetCode(phone);
      if (result.code == 200) {
        this.code = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //用户手机号码登录方法
    async userLogin(loginData: LoginData) {
      let result: UserLoginResponseData = await reqUserLogin(loginData);
      if (result.code == 200) {
        this.userInfo = result.data;
        //本地存储一份
        SET_TOKEN(JSON.stringify(this.userInfo));
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //退出登录
    logout() {
      this.userInfo = { name: "", token: "" };
      REMOVE_TOKEN();
    },
    queryState() {
      let timer = setInterval(() => {
        if (GET_TOKEN()) {
          this.visiable = false;
          this.userInfo = JSON.parse(GET_TOKEN());

          clearInterval(timer);
        }
      }, 1000);
    },
  },
});

export default useUserStore;
