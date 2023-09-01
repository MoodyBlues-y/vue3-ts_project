import request from "@/utils/request";
import {
  HospitalResponseData,
  HospitalLevelAndRegionResponseData,
  HospitalInfo,
} from "./type";

//枚举地址
enum API {
  //获取已有医院数据接口
  HOSPITAL_URL = "/hosp/hospital/",
  //获取医院等级与地区接口
  LEVELANDREGION_URL = "/cmn/dict/findByDictCode/",
  //根据关键字搜索医院接口
  SEARCHHOSPITALBYKEYWORD_URL = "/hosp/hospital/findByHosname/",
}

//获取已有医院数据方法
export const reqHospitalData = (
  page: number,
  limit: number,
  hostype = "",
  districtCode = ""
) =>
  request.get<any, HospitalResponseData>(
    API.HOSPITAL_URL +
      `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`
  );

//获取医院等级与地区方法
export const reqHospitalLevelAndRegion = (dictCode: string) =>
  request.get<any, HospitalLevelAndRegionResponseData>(
    API.LEVELANDREGION_URL + `${dictCode}`
  );

//根据关键字搜索医院方法
export const reqSearchHospital = (hosname: string) =>
  request.get<any, HospitalInfo>(
    API.SEARCHHOSPITALBYKEYWORD_URL + `${hosname}`
  );
