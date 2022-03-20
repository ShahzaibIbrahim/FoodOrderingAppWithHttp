import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const onOrderClickHandler = () => {
    setIsCheckout(true);
  };

  const onCancel = (event) => {
    event.preventDefault();
    setIsCheckout(false);
  }

  const onConfirm = async(userObj) => {
      const response = await fetch(
        "https://react-learning-a77f0-default-rtdb.firebaseio.com/orders.json",
        {
          method: 'POST',
          body: JSON.stringify({
            user: userObj,
            orderedItems: cartCtx.items
          })
        }
      );

      if (!response.ok) {
        throw new Error("Invalid Response");
      }

      cartCtx.clearCart();
  }


  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onOrderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={onConfirm} onCancel={onCancel}/>}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
