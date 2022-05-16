import axiosClient from "./axiosClient";

const CartApi = {
  getCart: () => {
    const url = "/cart";
    return axiosClient.get(url);
  },

  addProduct: (productId) => {
    const url = "/cart";
    return axiosClient.post(url, productId);
  },

  updateItem: (cartId, quantity, enable) => {
    const url = `/cart/${cartId}`;
    return axiosClient.put(url, {
      enable: enable,
      quantity: quantity,
    });
  },

  deleteItem: (cartId) => {
    const url = `/cart/${cartId}`;
    return axiosClient.delete(url);
  },
};

export default CartApi;
