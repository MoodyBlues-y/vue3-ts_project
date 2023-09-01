import type { HospitalObj, DepartmentArr, UserInfo } from "@/api/hospital/type";

//定义仓库内部存储数据state的ts类型
export interface DetailState {
  hospitalInfo: HospitalObj;
  departmentArr: DepartmentArr;
}

export interface UserState {
  visiable: boolean;
  code: string;
  userInfo: UserInfo;
}
