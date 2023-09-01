<template>
  <div class="register">
    <div class="top">
      <div class="title">
        {{ hospitalStore.hospitalInfo.hospital?.hosname }}
      </div>
      <div class="level">
        <svg
          t="1689937757924"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2278"
          width="16"
          height="16"
        >
          <path
            d="M743.328 985.536l-316.704 0c-12.896 0-23.392-10.368-23.392-23.104s10.496-23.072 23.392-23.072l316.704 0c67.296 0 99.808-36.512 115.168-67.136 0.768-1.856 1.024-3.552 1.408-5.568 2.912-14.624 7.84-39.168 40.192-77.92 23.328-27.968 19.328-57.664 14.624-92.032-1.472-10.912-2.944-21.76-3.552-32.512-2.688-45.856 9.344-65.664 26.048-93.12 3.04-4.928 6.304-10.304 9.792-16.32 15.328-26.432 14.464-59.232-2.304-87.712-20.48-34.816-59.008-55.648-103.008-55.648-77.952 0-167.808 2.656-168.672 2.656-7.776 0.288-13.888-2.72-18.464-8-4.64-5.28-6.528-12.352-5.28-19.2 0.32-1.6 29.664-160.48 29.664-230.304 0-71.616-54.336-79.328-77.632-79.328-36.832 0-66.784 39.2-66.784 87.424 0 59.936 0 80.16-31.68 123.904-43.712 60.352-126.24 161.632-188.416 161.632L275.04 450.176l0 512.224c0 12.768-10.496 23.104-23.392 23.104L117.76 985.504c-49.056 0-88.992-39.392-88.992-87.808L28.768 491.808c0-48.384 39.904-87.776 88.992-87.776l196.704 0c27.84 0 89.696-58.496 150.304-142.272 22.976-31.712 22.976-39.168 22.976-97.088 0-74.944 49.856-133.6 113.536-133.6 57.408 0 124.448 32.896 124.448 125.504 0 56.128-16.8 160.576-25.44 210.656 33.184-0.8 89.856-1.952 141.408-1.952 60.864 0 114.56 29.376 143.488 78.624 25.216 42.88 26.144 92.928 2.464 133.792-3.68 6.336-7.104 11.968-10.272 17.184-15.52 25.472-21.344 35.008-19.488 66.656 0.576 9.568 1.952 19.296 3.232 29.024 5.088 37.408 11.424 83.968-24.896 127.488-24.832 29.792-28.192 46.496-30.432 57.536-1.056 5.28-2.176 10.752-4.928 16.256C870.336 952.544 814.56 985.536 743.328 985.536L743.328 985.536zM117.76 450.208c-23.232 0-42.176 18.656-42.176 41.6l0 405.952c0 22.976 18.944 41.632 42.176 41.632l110.496 0L228.256 450.208 117.76 450.208 117.76 450.208zM117.76 450.208"
            fill="#666666"
            p-id="2279"
          ></path>
        </svg>
        <span>{{
          hospitalStore.hospitalInfo.hospital?.param.hostypeString
        }}</span>
      </div>
    </div>
    <!-- 展示内容区域 -->
    <div class="content">
      <div class="left">
        <img
          :src="
            `data:image/jpeg;base64,` +
            hospitalStore.hospitalInfo.hospital?.logoData
          "
          alt=""
        />
      </div>
      <div class="right">
        <div>挂号规则</div>
        <div class="time">
          预约周期：10天 放号时间：{{
            hospitalStore.hospitalInfo.bookingRule?.releaseTime
          }}
          停挂时间：{{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}
        </div>
        <div class="address">
          具体位置：{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}
        </div>
        <div class="route">
          具体路线：{{ hospitalStore.hospitalInfo.hospital?.route }}
        </div>
        <div class="releaseTime">
          退号时间：就诊前一工作日{{
            hospitalStore.hospitalInfo.bookingRule?.quitTime
          }}前取消
        </div>
        <div class="rule">预约挂号规则</div>
        <div
          class="ruleInfo"
          v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule?.rule"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 放置每一个医院科室的数据 -->
    <div class="department">
      <div class="leftNav">
        <ul>
          <li
            @click="changeIndex(index)"
            :class="{ active: index == currentIndex }"
            v-for="(department, index) in hospitalStore.departmentArr"
            :key="department.depcode"
          >
            {{ department.depname }}
          </li>
        </ul>
      </div>
      <div class="departmentInfo">
        <div
          class="showDepartment"
          v-for="department in hospitalStore.departmentArr"
          :key="department.depcode"
        >
          <h1 class="cur">{{ department.depname }}</h1>
          <!-- 每一个大科室下的小科室 -->
          <ul>
            <li
              @click="showLogin(item)"
              v-for="item in department.children"
              :key="item.depcode"
            >
              {{ item.depname }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useDetailStore from "@/store/modules/hospitalDetail";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let $route = useRoute();
let $router = useRouter();

let hospitalStore = useDetailStore();

//控制科室高亮的响应式数据
let currentIndex = ref<number>(0);

//左侧科室点击事件
const changeIndex = (index: number) => {
  currentIndex.value = index;
  //点击导航获取右侧科室(大的科室H1标题)
  let allH1 = document.querySelectorAll(".cur");
  //滚动到对应科室的位置
  allH1[currentIndex.value].scrollIntoView({
    behavior: "smooth",
  });
};

const showLogin = (item) => {
  $router.push({
    path: "/hospital/register_step1",
    query: { hoscode: $route.query.hoscode, depcode: item.depcode },
  });
};
</script>
<style scoped lang="scss">
.register {
  .top {
    display: flex;
    .title {
      font-size: 26px;
    }
    .level {
      color: #7f7f7f;
      margin-left: 10px;
      display: flex;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
  }
  .content {
    display: flex;
    margin-top: 20px;
    .left {
      width: 80px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right {
      flex: 1;
      font-size: 14px;
      margin-left: 20px;
      .time,
      .address,
      .route,
      .ruleInfo,
      .releaseTime {
        margin-top: 10px;
        color: #7f7f7f;
      }
      .rule {
        margin: 10px 0;
      }
    }
  }
  .department {
    width: 100%;
    height: 500px;
    display: flex;
    margin-top: 20px;
    .leftNav {
      width: 80px;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        background: rgb(248, 248, 248);
        display: flex;
        flex-direction: column;
        li {
          flex: 1;
          text-align: center;
          color: #7f7f7f;
          font-size: 14px;
          line-height: 40px;
          cursor: pointer;
          &.active {
            border-left: 1px solid red;
            color: red;
            background: white;
          }
        }
      }
    }
    .departmentInfo {
      flex: 1;
      margin-left: 20px;
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .showDepartment {
        h1 {
          background: rgb(248, 248, 248);
          color: #7f7f7f;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 33%;
            line-height: 30px;
            color: #7f7f7f;
          }
        }
      }
    }
  }
}
</style>
