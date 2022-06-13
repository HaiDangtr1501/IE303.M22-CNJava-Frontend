import { ADD_CART,DELETE_CART, SET_CART } from "./constants";

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

export const setCart = (payload) => {
    return {
        type:SET_CART,
        payload,
    };
}