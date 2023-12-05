import React, { useState } from 'react'
import Products from './components/Products'
import CartDrawer from './components/Cart/CartDrawer'
import ProductInCart from './components/Cart/ProductInCart';
import Nav from './components/Nav/Nav';
// import ShoppingCart from './components/Cart/shoppingCart';

const Home = () => {
    const [cartOpen, setCartOpen] = useState(false);
  return (
    <div>Home
            <CartDrawer  cartOpen={cartOpen} setCartOpen={setCartOpen}>
            <ProductInCart />
            </CartDrawer>
            {/* <ShoppingCartIcon onClick={() => setCartOpen(!cartOpen)} /> */}
            <Nav />
        <Products />
    </div>
  )
}

export default Home