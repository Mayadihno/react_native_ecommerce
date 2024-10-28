export interface userAddressInfo {
  _id?: string;
  deliveryInfo: string;
  region: string;
  city: string;
}

export interface userModelParams {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  userAddressInfo: userAddressInfo[];
}

export interface userLoginParams {
  email: string;
  password: string;
}

export interface userAddressProp {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  deliveryInfo: string;
  city: string;
  region: string;
  _id?: string;
}

export interface userAddressParams {
  userAddressForm: userAddressProp;
  getUserId: string;
}
