export interface Price {
  _id: String;
  total: Number;
  contact: String;
  price: Number;
  prepaidFee: Number;
  licenseFee: Number;
  registryFee: Number;
  transitInsuranceFee: Number;
  publicInsuranceFee: Number;
  carInsuranceFee: Number;
  carRetristrationFee: Number;
}

export interface Province {
  _id: String;
  name: String;
  license: Number;
  percent: Number;
}

export interface Car {
  _id: String;
  name: String;
  color: String;
  version: String;
  price: Number;
  display: String;
}
