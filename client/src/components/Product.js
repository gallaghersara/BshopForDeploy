import React, { useContext, useEffect, useState } from "react";
// import "./Product.css";
import { useCart, useProducts, useStore } from "../StoreContext";
// import { Button } from "@mui/material";

const Product = ({ imageUrl, title, price, productID}) => {

  const { cart, setCart } = useStore();

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

  const removeProductFromCart = () => {
    setCart((prevCart) => {
      const updatedCart = new Map(prevCart);
      const currentProduct = updatedCart.get(productID);

      if (currentProduct && currentProduct.amount > 0) {
        updatedCart.set(productID, {
          ...currentProduct,
          amount: currentProduct.amount - 1,
        });
      } else {
        updatedCart.delete(productID);
      }

      return updatedCart;
    });
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt="productImg" />
      </div>
      <div className="product-info">
        <h5>{title}</h5>
        <h6>${price}</h6>
      </div>
      <div>
      <button
          onClick={() => removeProductFromCart(1)}
          disabled={!cart.has(productID)}
        >
          -
        </button>
        <span>{cart.get(productID)?.amount ? cart.get(productID).amount : 0}</span>
        <button onClick={() => addProductToCart(1)}>+</button>
      </div>
    </div>
  );
};

export default Product;