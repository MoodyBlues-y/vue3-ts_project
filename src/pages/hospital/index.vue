<template>
  <div class="hospital">
    <!-- 左侧菜单 -->
    <div class="menu">
      <div class="top">
        <el-icon><House /></el-icon>
        <span>&nbsp;/&nbsp;医院详细信息</span>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        router
      >
        <el-menu-item
          index="/hospital/register"
          @click="changeClick('/hospital/register')"
        >
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/detail"
          @click="changeClick('/hospital/detail')"
        >
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/notice"
          @click="changeClick('/hospital/notice')"
        >
          <el-icon><setting /></el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/close"
          @click="changeClick('/hospital/close')"
        >
          <el-icon><Histogram /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/search"
          @click="changeClick('/hospital/search')"
        >
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧内容展示区域 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
//引入element-plus图标
import {
  House,
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Histogram,
  Search,
} from "@element-plus/icons-vue";
import { useRoute, $router, useRouter } from "vue-router";
let $route = useRoute();
let $router = useRouter();
import useDetailStore from "@/store/modules/hospitalDetail";
import { onMounted } from "vue";
const detailStore = useDetailStore();

//组件挂载完毕
onMounted(() => {
  detailStore.getHospitalDetail($route.query.hoscode);
  detailStore.getHospitalDepartment($route.query.hoscode);
});

const changeClick = (path: string) => {
  $router.push({ path, query: { hoscode: $route.query.hoscode } });
};
</script>
<style scoped lang="scss">
.hospital {
  display: flex;
  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      span {
        color: #7f7f7f;
        font-size: 14px;
      }
    }
  }
  .content {
    flex: 8;
  }
}
</style>
