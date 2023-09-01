<template>
  <div class="top">
    <div class="content">
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="" />
        <p>尚医通 预约大平台</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <p @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUser('/user/certification')"
                >实名认证</el-dropdown-item
              >
              <el-dropdown-item @click="goUser('/user/order')"
                >挂号订单</el-dropdown-item
              >
              <el-dropdown-item @click="goUser('/user/patient')"
                >就诊人管理</el-dropdown-item
              >
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/user";

let userStore = useUserStore();
import { useRouter } from "vue-router";

let $router = useRouter();

const goHome = () => {
  $router.push({ path: "/home" });
};

const login = () => {
  userStore.visiable = true;
};

const logout = () => {
  userStore.logout();
  $router.push({ path: "/home" });
};

const goUser = (path: string) => {
  $router.push({ path });
};
</script>
<style scoped lang="scss">
.top {
  position: fixed;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  background: #fff;
  z-index: 999;
  .content {
    width: 1200px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      p {
        font-size: 20px;
        color: #55a6fe;
      }
    }
    .right {
      display: flex;
      align-items: center;
      font-size: 14px;
      .help {
        margin-right: 10px;
      }
    }
  }
}
</style>
