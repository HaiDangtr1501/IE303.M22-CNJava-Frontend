import axiosClient from "./axiosClient";

const OrderApi = {
  getAllByUser: (params) => {
    return axiosClient.get("/orders/user", {
      params: params,
    });
  },

  cancelOrder: (orderId) => {
    return axiosClient.put(`/orders/${orderId}?cancel`);
  },

  getAll: (params) => {
    return axiosClient.get("/orders/admin", {
      params: params,
    });
  },
  updateOrder: (orderId) => {
    const url = `/orders/${orderId}/update`;
    return axiosClient.put(url);
  },

  returnOrder: (orderId) => {
    const url = `/orders/${orderId}/return`;
    return axiosClient.put(url);
  },
};

export default OrderApi;
