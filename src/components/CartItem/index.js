import React, { useEffect, useState, useRef } from "react";
import { Row, Form, Col } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import SAlert from "react-s-alert";
import NumberFormat from "react-number-format";
import CartApi from "../../api/cart";
import { useStore, actions } from "../../store";

const CartItem = ({ isAuth,data, onChange }) => {
  const [enable, setEnable] = useState(data.enable);
  const [quantity, setQuantity] = useState(data.quantity);
  const [hasUpdate, setHasUpdate] = useState(false);

  const [state, dispatch] = useStore();
  const { countCartItems } = state;

  const dataLocalProduct = useRef(0)
  
  const [quantityLocal, setQuantitylocal] = useState(data.quantity); // Xử lý quantity cho người dùng khách
  const checkEnabledLocal = useRef(data.enable)


  
  useEffect(() => {
    const updateCartItem = async () => {
      try {
        const response = await CartApi.updateItem(
          data.cartId,
          quantity,
          enable
        );
        if (response.status === 200) {
          onChange();
        }
        setHasUpdate(false);
      } catch (error) {
        SAlert.error(error.response.data.message);
        setHasUpdate(false);
      }
    };
    const timer = setTimeout(() => {
      if (hasUpdate) {
        updateCartItem();
      }
    }, 500);
    return () => clearTimeout(timer);
    
  }, [enable, quantity, hasUpdate, onChange, data]);
  useEffect(() => {
    if(!isAuth){
      dataLocalProduct.current = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
      dataLocalProduct.current.map((item)=>{
        if(item.name === data.name){
          item.quantity = parseInt(quantityLocal, 10) ;
          data.quantity = quantityLocal;
          item.enable = checkEnabledLocal.current;
        }
       
        // localStorage.push(item)
        
      })
      localStorage.setItem("products", JSON.stringify(dataLocalProduct.current));
      // if(quantityLocal < data.stock){
      //   data.quantity = quantityLocal;
      // }
      // if(!enableLocal){
      //   data.price = 0
      // }else{
      //   data.price= data.price
      // }
      // setTotalPriceLocal(totalPriceLocal + (Math.round((data.price * (100 - data.discount)) / 100 / 10000) * data.quantity * 10000))
      
    }
  },[quantityLocal, onChange, checkEnabledLocal.current])
  
//xử lý cho khách hàng
  const onChangeQuantity = (e) => {
    setQuantity(e.target.value);
    setHasUpdate(true);
  };

  const onChangeEnable = () => {
    setEnable(!enable);
    setHasUpdate(true);
  };

  const onDelete = async () => {
    try {
      const response = await CartApi.deleteItem(data.cartId);
      if (response.status === 200) {
        SAlert.success(response.data.message);
        onChange();
      }
    } catch (error) {
      SAlert.error(error.response.data.message);
    }
    try {
      const countCartItems = await CartApi.getCart();
      dispatch(actions.addCart(countCartItems.data.length));
    } catch (e) {}
    setHasUpdate(true);
  };

  //Xử lý cho người dùng khách

  const onChangeQuantityLocal = (e) => {
    setQuantitylocal(e.target.value) 
    onChange()  
  }
  const onChangeEnableLocal = () => {

    if(checkEnabledLocal.current == true){
      checkEnabledLocal.current = false
    }else{
      checkEnabledLocal.current = true
    }
    onChange() 
  }
  const onDeleteLocal = () => {
    
    // dataLocalProduct.current.map((item)=>{
    //   if(data.name === item.name){
        
    //   }
    // })
    const newData = [...dataLocalProduct.current]
    const newRecord = newData.filter((e)=> e.key !== data.key)
    for(let i = 0; i < newRecord.length; i++){
      newRecord[i].key = i +1;
    }
    onChange()
    localStorage.setItem("products", JSON.stringify(newRecord));
  }
  
  return (isAuth) ? (
    <Row className="mt-3 mb-3 pt-2 pb-2 border" style={{ borderColor: "#333" }}>
      <Col md="3">
        <img className="img-thumbnail" src={data.productImageUrl} alt="" />
      </Col>
      <Col md="8">
        <div style={{ minHeight: "60px" }}>
          <strong style={{ fontSize: "18px", color: "#f44336" }}>
            {data.productName}
          </strong>
        </div>
        <Form.Group>
          <Form.Label>
            <strong>Số lượng</strong>
          </Form.Label>
          <Form.Control
            style={{ width: "100px" }}
            value={quantity}
            min={1}
            max={data.stock}
            type="number"
            onChange={onChangeQuantity}
          ></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <strong>Thành tiền: </strong>
          <NumberFormat
            value={
              Math.round(
                (data.productPrice * quantity * (100 - data.productDiscount)) /
                  100 /
                  10000
              ) * 10000
            }
            thousandSeparator={true}
            suffix="đ"
            displayType="text"
          />{" "}
          {data.productDiscount > 0 && (
            <NumberFormat
              className="old-price"
              value={data.quantity * data.productPrice}
              thousandSeparator={true}
              suffix="đ"
              displayType="text"
            />
          )}
        </div>
        <Form.Switch
          id={`switch-${data.cartId}`}
          label="Chọn mua"
          checked={enable}
          onChange={onChangeEnable}
        />
      </Col>
      <Col md="1">
        <MdDelete
          role="button"
          fontSize="30px"
          onClick={onDelete}
          onMouseOver={({ target }) => (target.style.color = "red")}
          onMouseOut={({ target }) => (target.style.color = "black")}
        />
      </Col>
    </Row>
  ) : (
    <>
      <Row className="mt-3 mb-3 pt-2 pb-2 border" style={{ borderColor: "#333" }}>
          <Col md="3">
            <img className="img-thumbnail" src={data.images.url} alt="" />
          </Col>
          <Col md="8">
            <div style={{ minHeight: "60px" }}>
              <strong style={{ fontSize: "18px", color: "#f44336" }}>
                {data.name}
              </strong>
            </div>
            <Form.Group>
              <Form.Label>
                <strong>Số lượng</strong>
              </Form.Label>
              <Form.Control
                style={{ width: "100px" }}
                value={quantityLocal}
                min={1}
                type="number"
                max={data.stock}
                onChange={onChangeQuantityLocal}
              ></Form.Control>
            </Form.Group>
            <div className="mb-3">
              <strong>Thành tiền: </strong>
              <NumberFormat
                value={
                  Math.round(
                    (data.price * quantityLocal * (100 - data.discount)) /
                      100 /
                      10000
                  ) * 10000
                }
                thousandSeparator={true}
                suffix="đ"
                displayType="text"
              />{"   "}
              <span className="old-price">
                {data.discount > 0 && (
                  (data.quantity * data.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                )}
              </span>
            </div>
            <Form.Switch
              id={`switch-${data.id}`}
              label="Chọn mua"
              checked={checkEnabledLocal.current}
              onClick={onChangeEnableLocal}
            />
          </Col>
          <Col md="1">
            <MdDelete
              role="button"
              fontSize="30px"
              onClick={onDeleteLocal}
              onMouseOver={({ target }) => (target.style.color = "red")}
              onMouseOut={({ target }) => (target.style.color = "black")}
            />
          </Col>

        </Row>
        
    </>
    
  )
};

export default CartItem;
