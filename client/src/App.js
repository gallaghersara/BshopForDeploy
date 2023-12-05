import "./App.css";
import Nav from "./components/Nav/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./pages/Login";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateComponent";
import { useEffect, useState } from "react";
import Products from "./components/Products";
import { StoreProvider, useProducts } from "./StoreContext";

function App() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const categories = allProducts
  .map((p) => p.category)
  .filter((value, index, array) => array.indexOf(value) === index);

  function getProducts() {
    // fetch("https://bshopfullprojectversion.onrender.com/items")
    fetch("http://localhost:8000/items")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
    });
  }

  const onFilterChange = (e) => {
    if (e.target.value === "All") {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter((p) => p.category === e.target.value));
    }
    console.log(e.target.value);
  };

  useEffect(() => {
      getProducts();
  }, []);

  return (
    <div className="App">
      <StoreProvider>
      <BrowserRouter>
        <Nav onFilterChange={onFilterChange} categories={categories} products={products}  />
        <Routes>
          <Route element={ <PrivateComponent />}>
            <Route path="/" element={ <Products products={products}  categories={categories}/>} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      </StoreProvider>
      <Footer />
    </div>
  );
}

export default App;
