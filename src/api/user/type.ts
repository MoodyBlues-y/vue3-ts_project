export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface SubmitOrder extends ResponseData {
  data: number;
}

export interface OrderInfo {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    orderStatusString: string;
  };
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  scheduleId: string;
  title: string;
  reserveDate: string;
  reserveTime: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}

export interface OrderInfoResponseData extends ResponseData {
  data: OrderInfo;
}

export interface PayInfo {
  codeUrl: string;
  orderId: number;
  totalFee: number;
  resultCode: string;
}
export interface QrCode extends ResponseData {
  data: PayInfo;
}

export interface PayResult extends ResponseData {
  data: boolean;
}

export interface UserParams {
  certificatesNo: string;
  certificatesType: string;
  certificatesUrl: string;
  name: string;
}

export interface Order {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    orderStatusString: string;
  };
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  scheduleId: number;
  title: string;
  reserveDate: string;
  reserveTime: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}

export type Records = Order[];

export interface UserOrderInfoResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    orders: [];
    hitCount: boolean;
    searchCount: boolean;
    pages: number;
  };
}

export interface OrderStatus {
  comment: string;
  status: number;
}

export interface UserOrderStatusResponseData extends ResponseData {
  data: OrderStatus[];
}

export interface AddOrUpdatePatient {
  name: string;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  isInsure: number;
  addressSelected: [];
  address: string;
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
}
