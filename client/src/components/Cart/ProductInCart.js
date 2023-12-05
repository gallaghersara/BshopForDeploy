import React from "react";
import { useStore } from "../../StoreContext";

const ProductInCart = ({   productID,cartValues }) => {
  const { cart, setCart } = useStore();
  console.log("cart", cart);
  const itemInCart = cart.get(productID);
  const product = cart.get(productID);
  if (!product) {
      return null; 
    }
    const { title, price, amount } = product;
      if (itemInCart && itemInCart.amount > 0) {
  return (
<div>
      <h3>{title}</h3>
      <p>Price: {price}</p>
      <p>Quantity: {amount}</p>
      {/* <p>Quantity: {itemInCart ? itemInCart.amount : 0}</p> */}
    </div>
  );
  }
//   return null; 
}
export default ProductInCart;