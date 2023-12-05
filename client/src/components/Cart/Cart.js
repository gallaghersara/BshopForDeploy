import React, { useState } from "react";
import Product from "../Product";
import { useCart } from "../../StoreContext";

const Cart = ({ title, imageUrl, price, productID }) => {
  const [cart, setCart] = useState(new Map());
// const {toCart} =useCart;
  const addProductToCart = (newAmount) => {
    let currentProduct = cart.get(productID);
    if (currentProduct) {
      setCart((prevCart) => {
        return new Map(prevCart).set(productID, {
          amount: currentProduct.amount + newAmount,
        });
      });
    } else {
      setCart((prevCart) => {
        return new Map(prevCart).set(productID, {
          amount: newAmount,
        });
      });
    }
  };

  const removeProductFromCart = (newAmount) => {
    let currentProduct = cart.get(productID);
    if (currentProduct) {
      if (currentProduct.amount - newAmount > 0) {
        setCart((prevCart) => {
          return new Map(prevCart).set(productID, {
            amount: currentProduct.amount - newAmount,
          });
        });
      } else {
        setCart((prevCart) => {
          prevCart.delete(productID);
          return new Map(prevCart);
        });
      }
    }
  };

  return (
    
    <Product
      title={title}
      imageUrl={imageUrl}
      price={price}
      productID={productID}
      cart={cart}
      addProductToCart={addProductToCart}
      removeProductFromCart={removeProductFromCart}
    />
  );
};

export default Cart;