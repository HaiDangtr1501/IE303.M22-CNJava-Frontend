import { ADD_CART, DELETE_CART } from "./constants";

const initState = {
    countCartItems: 0,
  };
function reducer(state, action) {
  switch (action.type) {
    case ADD_CART:
      console.log("addcart");
      console.log(action.payload) 
      return {
        countCartItems: action.payload,    
      };
    case DELETE_CART:
      return {
        countCartItems: action.payload,
      };
    default:
      throw new Error("Invalid action!");
  }
}

export { initState };
export default reducer;
