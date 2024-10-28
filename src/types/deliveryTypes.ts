export interface IDeliveryProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  addressInfo?: IAddressInfo[];
}

export interface IAddressInfo {
  city?: string;
  region?: string;
  deliveryInfo?: string;
  _id?: string;
}
