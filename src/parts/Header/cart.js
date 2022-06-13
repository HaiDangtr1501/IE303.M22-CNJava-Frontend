import { BsCart3 } from "react-icons/bs";
function Cart({ countCartItems }) {
  return  (
    <div className="container-count">
      Giỏ Hàng
      <BsCart3 className="navBar-item_icon cart-icon"/>
      {(countCartItems !==0 ) && <span className="cart-content">{countCartItems}</span>}
      {/* {(currentCartItems === 0) ? countCartItems : ((count === 0) ? countCartItems : currentCartItems)} */}
      {/* {count === 0 ? countCartItems : (count)} */}
    </div>
  );
}
export default Cart;
