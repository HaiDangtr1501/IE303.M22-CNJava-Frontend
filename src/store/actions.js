import { ADD_CART,DELETE_CART } from "./constants";

export const addCart = (payload) => {
    return {
        type:ADD_CART,
        payload,
    };
}

export const deleteCart = (payload) => {
    return {
        type:DELETE_CART,
        payload,
    };
}