import { defineStore } from "pinia";
import { reqHospitalDepartment, reqHospitalDetail } from "@/api/hospital/index";
import {
  HospitalDetailResponseData,
  DepartmentResponseData,
  DepartmentArr,
} from "@/api/hospital/type";
import type { DetailState } from "./interface/index";

const useDetailStore = defineStore("Detail", {
  state: (): DetailState => {
    return {
      //医院详情的数据
      hospitalInfo: {},
      //存储医院科室的数据
      departmentArr: [],
    };
  },
  actions: {
    async getHospitalDetail(hoscode: string) {
      let result: HospitalDetailResponseData = await reqHospitalDetail(hoscode);
      if (result.code == 200) {
        this.hospitalInfo = result.data;
      }
    },
    //获取医院科室的数据
    async getHospitalDepartment(hoscode: string) {
      let result: DepartmentResponseData = await reqHospitalDepartment(hoscode);
      if (result.code == 200) {
        this.departmentArr = result.data;
      }
    },
  },
});

//对外默认暴露仓库
export default useDetailStore;
