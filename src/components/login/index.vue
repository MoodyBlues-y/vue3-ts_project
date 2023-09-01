<template>
  <div class="login_container">
    <el-dialog v-model="userStore.visiable" title="用户登录">
      <div class="content">
        <el-row>
          <el-col :span="12">
            <div class="login">
              <div v-show="scene == 0">
                <el-form :model="loginParam" :rules="rules" ref="form">
                  <el-form-item prop="phone">
                    <el-input
                      v-model="loginParam.phone"
                      placeholder="请您输入手机号码"
                      :prefix-icon="User"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input
                      placeholder="请您输入手机验证码"
                      :prefix-icon="Lock"
                      v-model="loginParam.code"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      @click="getCode"
                      :disabled="!isPhone || flag ? true : false"
                      ><span v-if="!flag">获取验证码</span
                      ><countDown v-else :flag="flag" @getFlag="getFlag"
                    /></el-button>
                  </el-form-item>
                </el-form>
                <el-button
                  style="width: 100%"
                  type="primary"
                  size="default"
                  @click="login"
                  :disabled="
                    !isPhone || loginParam.code.length < 6 ? true : false
                  "
                  >用户登录</el-button
                >
                <div class="bottom" @click="changeScene">
                  <p>微信扫码登录</p>
                  <svg
                    t="1690007332775"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2332"
                    width="32"
                    height="32"
                  >
                    <path
                      d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                      fill="#28C445"
                      p-id="2333"
                    ></path>
                    <path
                      d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                      fill="#28C445"
                      p-id="2334"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="webchat" v-show="scene == 1">
                <!-- 微信扫码登录的结构 -->
                <div id="login_container"></div>
                <div class="phone" @click="handler">
                  <p>手机短信验证码登录</p>
                  <svg
                    t="1690165006091"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2341"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                      p-id="2342"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="leftContent">
              <div class="top">
                <div class="item">
                  <img src="../../assets/images/code_app.png" alt="" />
                  <svg
                    t="1690007522622"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2538"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M579.867 511.932c-11.67 0-23.344 10.837-23.344 24.178 0 10.839 11.668 21.678 23.344 21.678 17.514 0 30.020-10.839 30.020-21.678 0-13.34-12.505-24.178-30.020-24.178v0zM503.154 399.36c18.345 0 30.020-11.67 30.020-29.185 0-18.345-11.675-29.183-30.020-29.183-17.51 0-34.188 10.839-34.188 29.183-0.001 17.517 16.678 29.185 34.188 29.185v0zM512.326 0.56c-282.655 0-511.788 229.133-511.788 511.788 0 282.653 229.133 511.786 511.788 511.786 282.653 0 511.786-229.133 511.786-511.786 0.001-282.655-229.132-511.788-511.786-511.788v0zM415.602 642.009c-30.855 0-53.369-4.999-82.553-13.341l-84.218 42.53 24.186-71.715c-59.204-41.689-94.228-94.221-94.228-158.428 0-113.403 106.733-200.123 236.814-200.123 115.069 0 217.633 68.377 237.644 165.106-8.338-1.671-15.844-2.502-22.514-2.502-113.403 0-200.954 85.049-200.954 187.613 0 17.508 2.502 33.351 6.671 50.030-6.671 0.829-14.178 0.829-20.849 0.829v0zM763.314 723.724l16.674 60.041-63.371-35.854c-24.18 4.999-47.529 12.505-71.709 12.505-111.737 0-200.123-76.711-200.123-171.769 0-95.058 88.388-171.771 200.123-171.771 105.895 0 200.954 76.713 200.954 171.771 0 53.362-35.854 100.891-82.548 135.078v0zM338.053 340.992c-17.51 0-35.854 10.839-35.854 29.183 0 17.516 18.343 29.19 35.854 29.19 16.679 0 30.020-11.675 30.020-29.19 0-18.343-13.341-29.183-30.020-29.183v0zM710.783 511.932c-12.51 0-23.349 10.837-23.349 24.178 0 10.839 10.839 21.678 23.349 21.678 16.674 0 29.183-10.839 29.183-21.678 0-13.34-12.509-24.178-29.183-24.178v0zM710.783 511.932z"
                      p-id="2539"
                    ></path>
                  </svg>
                  <p>微信扫一扫关注</p>
                  <p>“快速预约挂号”</p>
                </div>
                <div class="item">
                  <img src="../../assets/images/code_login_wechat.png" alt="" />
                  <svg
                    t="1690007626928"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3607"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M798.723234 174.782745c0-60.576657-49.106418-109.683075-109.683075-109.683075l-354.708628 0c-60.576657 0-109.683075 49.106418-109.683075 109.683075l0 673.980161c0 60.576657 49.106418 109.683075 109.683075 109.683075l354.708628 0c60.576657 0 109.683075-49.106418 109.683075-109.683075L798.723234 174.782745zM264.557398 237.015112l494.256894 0 0 529.049305-494.256894 0L264.557398 237.015112zM334.356091 105.008612 689.016623 105.008612c38.548968 0 69.798692 31.249725 69.798692 69.798692l0 22.298865-494.256894 0 0-22.298865C264.557398 136.25936 295.807123 105.008612 334.356091 105.008612zM689.016623 918.53704 334.356091 918.53704c-38.548968 0-69.798692-31.249725-69.798692-69.798692l0-43.788296 494.256894 0 0 43.788296C758.814292 887.287315 727.564567 918.53704 689.016623 918.53704z"
                      fill="#272636"
                      p-id="3608"
                    ></path>
                    <path
                      d="M513.173732 829.943282c-16.70752 0-30.30112 13.5936-30.30112 30.30112 0 16.70752 13.5936 30.30112 30.30112 30.30112s30.299073-13.5936 30.299073-30.30112C543.472805 843.536882 529.881253 829.943282 513.173732 829.943282z"
                      fill="#272636"
                      p-id="3609"
                    ></path>
                  </svg>
                  <p>扫一扫下载</p>
                  <p>“预约挂号APP”</p>
                </div>
              </div>
            </div>
            <p class="tip">尚医通官方指定平台</p>
            <p class="tip">快速挂号 安全放心</p>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button type="primary" size="default" @click="closeDialog"
          >关闭窗口</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
import { computed, nextTick, reactive, ref, watch } from "vue";
import { reqWxLogin } from "@/api/hospital";
import { WxloginResponseData } from "@/api/hospital/type";
import { useRoute, useRouter } from "vue-router";

let $route = useRoute();
let $router = useRouter();
let userStore = useUserStore();

let scene = ref<number>(0); //0代表手机号码登录 1代表微信扫码登录
let flag = ref<boolean>(false); //true代表当前获取验证码 false则为倒计时
//获取表单组件实例
let form = ref();
//收集手机号码登录表单
let loginParam = reactive({
  phone: "",
  code: "",
});

let isPhone = computed(() => {
  const reg =
    /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  return reg.test(loginParam.phone);
});

//点击微信扫码登录|微信小图标切换为微信登录
const changeScene = async () => {
  scene.value = 1;
  let redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin");
  let result: WxloginResponseData = await reqWxLogin(redirect_URL);

  new WxLogin({
    self_redirect: true, //true手机点击确定授权登录后可以在iframe内跳转到redirect_url
    id: "login_container", //显示二维码容器设置
    appid: result.data.appid, //应用唯一标识
    scope: "snsapi_login", //代表当前微信扫码的页面已经授权
    redirect_uri: result.data.redirectUri,
    state: result.data.state,
    style: "black",
    href: "",
  });
};

//获取验证码
const getCode = async () => {
  if (!isPhone.value || flag.value) return;
  //开启倒计时flag为true
  flag.value = true;
  try {
    await userStore.getCode(loginParam.phone);
    loginParam.code = userStore.code;
  } catch (error) {
    ElMessage({
      type: "error",
      message: error.message,
    });
  }
};

//自定义事件获取flag值
const getFlag = (val: boolean) => {
  flag.value = val;
};

//点击用户登录按钮回调
const login = async () => {
  await form.value.validate();
  try {
    await userStore.userLogin(loginParam);
    userStore.visiable = false;
    ElMessage({
      type: "success",
      message: "登录成功",
    });
    const redirect = $route.query.redirect;

    if (redirect) {
      $router.push(redirect);
    } else {
      $router.push({ path: "/home" });
    }
  } catch (error) {
    ElMessage({
      type: "error",
      message: error.message,
    });
  }
};

//自定义电话号码的回调
const phoneValidator = (rule: any, value: any, callBack: any) => {
  const reg =
    /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的手机号码格式"));
  }
};

//自定义验证码的回调
const codeValidator = (rule: any, value: any, callBack: any) => {
  if (/^\d{6}$/.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的验证码格式"));
  }
};

const rules = {
  phone: [{ required: true, trigger: "blur", validator: phoneValidator }],
  code: [{ required: true, trigger: "blur", validator: codeValidator }],
};

const closeDialog = () => {
  userStore.visiable = false;
};

//点击手机短信验证码盒子的回调
const handler = () => {
  scene.value = 0;
  form.value.resetFields();
};

watch(
  () => scene.value,
  (val: number) => {
    if (val == 1) {
      userStore.queryState();
    }
  }
);
</script>
<style scoped lang="scss">
.login_container {
  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .content {
    .login {
      padding: 20px;
      border: 1px solid #ccc;
      .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          margin: 10px 0;
        }
      }
      .webchat {
        display: flex;
        flex-direction: column;
        align-items: center;
        .phone {
          display: flex;
          flex-direction: column;
          align-items: center;
          p {
            margin: 10px 0;
          }
        }
      }
    }
    .leftContent {
      .top {
        display: flex;
        justify-content: space-around;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 130px;
            height: 130px;
          }
          p {
            margin: 5px 0;
          }
        }
      }
    }
    .tip {
      text-align: center;
      margin: 20px 0;
      font-size: 20px;
      font-weight: 900;
    }
  }
}
</style>
