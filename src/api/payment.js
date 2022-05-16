import axiosClient from "./axiosClient";

const PaymentApi = {
  addStripePayment: () => {
    return axiosClient.post("/payment/stripe");
  },

  addCodPayment: () => {
    return axiosClient.post("/orders");
  },
};

export default PaymentApi;
