<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <span class="free">{{ user.isInsure == 1 ? "医保" : "自费" }}</span>
        <span class="username">{{ user.name }}</span>
      </div>
      <div class="right">
        <el-button
          circle
          type="primary"
          size="default"
          :icon="Edit"
          @click="handlerEdit"
        ></el-button>

        <el-popconfirm
          :title="`您确定要删除${user.name}就诊人吗?`"
          width="220"
          @confirm="deleteUser(user.id)"
        >
          <template #reference>
            <el-button
              circle
              type="danger"
              size="default"
              :icon="Delete"
              v-if="$route.path == '/user/patient'"
            ></el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型：{{ user.param.certificatesTyoeString }}</p>
      <p>证件号码：{{ user.certificatesNo }}</p>
      <p>用户性别：{{ user.sex == 0 ? "女士" : "男士" }}</p>
      <p>出生日期：{{ user.birthdate }}}</p>
      <p>手机号码：{{ user.phone }}}</p>
      <p>婚姻状态：{{ user.isMarry == 0 ? "未婚" : "已婚" }}</p>
      <p>当前住址：{{ user.param.cityString }}</p>
      <p>详细地址：{{ user.param.fullAddress }}</p>
      <div class="confirm" v-if="currentIndex === index">已选择</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { deletePatient } from "@/api/user";
import { ElMessage } from "element-plus";

let $route = useRoute();
let $router = useRouter();

const handlerEdit = () => {
  if ($route.path == "/user/patient") {
    $emit("changeScene", props.user);
  } else {
    $emit("changeScene");
    $router.push({
      path: "/user/patient",
      query: { type: "edit", id: props.user.id },
    });
  }
};

const deleteUser = async (id: string) => {
  const result = await deletePatient(id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除就诊人成功",
    });
    $emit("getAllUser");
  }
};

let props = defineProps(["user", "currentIndex", "index"]);
let $emit = defineEmits(["changeScene", "getAllUser"]);
</script>
<style scoped lang="scss">
.visitor {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  .top {
    height: 60px;
    background: #e5e5e5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
      .free {
        background: white;
        padding: 5px;
        font-size: 12px;
        margin-right: 5px;
        border-radius: 10px;
      }
      .username {
        color: #7f7f7f;
      }
    }
  }
  .bottom {
    position: relative;
    padding: 20px;
    p {
      line-height: 40px;
    }
    .confirm {
      position: absolute;
      top: 20%;
      left: 20%;
      width: 200px;
      height: 200px;
      line-height: 200px;
      color: red;
      border-radius: 50%;
      text-align: center;
      transform: rotate(35deg);
      opacity: 0.5;
      font-weight: 900;
      border: 1px dashed red;
    }
    .confirm-enter-from {
      transform: scale(1);
    }
    .confirm-enter-active {
      transition: all 0.3s;
    }
    .confirm-enter-to {
      transform: scale(1.2);
    }
  }
}
</style>
