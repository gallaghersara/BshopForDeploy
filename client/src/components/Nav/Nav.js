import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FilterBy from "./FIlterBy";
import CartDrawer from "../Cart/CartDrawer";
import ProductInCart from "../Cart/ProductInCart";
import { useStore } from "../../StoreContext";

const Nav = ({products, categories, onFilterChange, cartValues }) => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, setCart } = useStore();
  const auth = localStorage.getItem("user");

  const logout = async () => {
    await fetch("http://localhost:8000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.clear();
    navigate("/signup");
  };

  const styleObj = {
    height: "25px",
    // fontSize: 14,
    color: "#fff",
    // textAlign: "center",
    // paddingTop: "10px",
}

  return (

    <div>
      {/* <button onClick={() => setCartOpen(!cartOpen)}>Open Cart</button> */}

      
      <CartDrawer cartOpen={cartOpen} setCartOpen={setCartOpen}>
        {Array.from(cart.keys()).map((productId) => (
          <ProductInCart key={productId} productID={productId} />
        ))}
      </CartDrawer>
      <img
        alt="logo"
        className="logo"
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHkAeQMBIgACEQEDEQH/xAAcAAEAAwADAQEAAAAAAAAAAAAABQYHAQMEAgj/xABBEAABAwMBBQYCBAoLAAAAAAABAAIDBAUGEQcSITFRE0FhcYGRFKEiQpLBFRYjMjNSU4LR0ggXJUNUVnJ0k7Lh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANxREQEREBEXDnNaCXOAA5koOUVfuWbYxbHllbfqCORvNgmDnD0GpUQdrWDh27+HG+Yp5dP+qC7oq1QZ9idwe1lNkFCXO5NfJ2ZPo7RWKOWOVgfE9r2nk5p1BQfaIiAiIgIiICIiAuCdBqeSEgc+XVZDkt/u20C+zYrh85p7ZAdLjchycORa0ju8ObiOiCXyfajHHcDZcPoX3y7Elp7HjFH4kjnp7Dqo2PZ7lOUubU5zkk0cL+Jt1CdGgdCeXyPmr3iOJWnE7e2ltNOGkj8rO7jJKepP3clPoKVbNlWGW5ujbPHUO73VTnSE+hOnyUsMJxUN3Rjlp0/2cf8ABT6IKfcdmOG3BhbJYqeEn61PrER9khVeo2XXawympwPJaqjLeIo6p29G89NeXu0+a1hEGW2bafV2q4Ms+0K2OtdWeDKxo/Iy+PgPEEjrotPhlZNG2WF7ZI3gOa9h1Dh1BUfkFhtuRW99Dd6VlRA4cjwLT1aeYKyukq7tsjvEVBc5pK/EquTdgn01dSk9ffiO8DUceCDZ0XXTzR1EMc0D2yRSNDmPadQ4HkQuxAREQERcPIa0lx0AGpKDONr+Q1kUNFithJN2vLuy1B07OI8CfDXr3AOKtOF4xR4nYoLZRtBLRvTS6cZXnm4/d4KibMo3ZTm9/wAyqW70McppLeTxDWjmR+7u/aK1pARFne1fJq+k+BxrHD/bV2duNc08Yo9eLvDXjx6AlB7cs2nWDG6o0O/NX3EHd+Fo2hxaejjyB8OJ8FBjaXlUg7aHZ9cDTcw5z3B2nluKyYJgVrxGjb2cbai5PbrPWyDV7nd+7+q3Xu99VbtEGf49tZsV0rRb7lFU2evJDRFWt3Wk9N7u9dFoAIPeoDLsQtGV0DqW6UwL9D2dQwASRHq0/dyVM2Z3i5WLIKnA8km7Wenbv2+oP97FpyHoNR5EdyDU1H32z0d9tVRbbhEJKeoYWuHeOhHQjmFIDiiDKdl1yrMayGuwC9yF5ptZbdMfrxnjuj0Ovho4dy1YLLtttvno6e2ZdbW6V1oqW77h3xE9/hvaDycVo9rrYbjbaaupjrDURNlYfBw1QepERAVfz+vdbMKvdXGdHspHhp6OI0HzKsCo+2kuGzW87uuukQOnTtWIPvY5bm27Z3aWgfSnYahx6l5JHy0V1UBgAAwewBumn4Pg5f6Ap9APJZVYoxdNut9qajQm2UbIoAeO7qG8R9p3utVKya4TfintuirKkdnQX+lEXangBKNAB7tb9pBrKIiAsq2sMFvzTC71Dwn+NFM4jm5hcP5ne61VZNmEwyja3j1ipPykNoJq6tw5McNHAH2YP3kGsDkuVwOS5QQ+YW5t2xW7UDh+npJGt8HbpIPvoq3sRr3V2zq3B51dTukg9A46fIhXicAwSB3LdOvssw/o7l34lVgOu6LjJu/YjQamiIgKtbSKJ1wwS+U7G7zjSPe0eLfpfcrKviVjZYnxyAFj2lrge8FBU9klcy4bPLLIw6mKHsHeBYS37lb1k+yCd9gv+Q4VVnddS1BqKQH68Z56em4fUrWEBVzO8Uo8wsj7fVO7OVp7SnnA4xPHf5dxX1meW2zELYa25yHecdIYGfnyu6D+JWfU1nzfaSPir7WvsNjk0MdFT/pJW9T3/a+yg6rFtMrMPqjj2dRmd1Po2OvpXiTeZyBeAePLnz6hXdm0/DHw9r+HqYDTXdcHB3tpqvJadkeHW6MNdbDWPA4yVUhcT6DQfJSf9XmH/wCXbf8A8SCkZHtgZcZW2jCIHT1057NtXUaRxs8Rvcz56DzVs2b4WzFaCWaqqBV3auPaVdTrrvHnoCeY1PPvXxcdlWG18ZYbNHTuP16Z7mEfPT5KrVGF5dgY+Mwe6zXGhYdZLXV6EuHfpyB9N08O/kg19FUcCzqgzCle1jDS3KDhU0Un5zDyJHUa/wDqtyCMyeuZbMcuddIdG09LI/1DToqjsKonUmzuje5u6amaWb03t0fJq8m3G6zMsNLj1B9OvvNQ2FsY57gI19zuj1KvthtsVns1FbYNOzpYWxAjv0GmqD3oiICFEQZdtbtNZaq+3Z1Y496qtjgKuNvDtYfHwHEHwOvcrrbsotlwxgZFFO0UAhdLI4njHuj6QPiNCFMzRMnjfFMxr43tLXMcNQ4HuK/Pe0rGL3hNFcorHLI/F7o9pliAJ+GcCDoegOmmveOB7kFnwO0zZ/kM2b5JEXUcchjtdHJxY0N+tp36H3dqe4LXwNFBYVPaJsat7bBURz0MULY2Oj7tBx3hzB6gqeQEREBcEarlEGWbUsZmtdSzOMXb2F0oCH1bIxwqI+8kd/Dn1HkFdbJlNvumKQ5EZWQ0ZgMsxef0Rb+c0+RBCkrpUUVLQzzXKWKKkbGe1fMQGbunHXVfnnC7Dd8ulrLBbKqWHDorg+d85aW9o3X6LRrzJAB07tdT3ILtgMFRnOb1eb3CJzLdTawWuJ/hw3h5cT5u8FrYGgXmtlvpbXQQUNBC2GmgYGRxtHIL1ICIiAiIgLrqIIqiF8M8bJIpAWvY8ahwPMELsRBlF02dXjGrjJeNnFf8MXnWW2TO1ieOg14eh9CF223a7DR1Dbfmlpq7NXDg5/Zl0R8eoHuPFakvLX26iuUBguFLDVQnmyZgcPmg8NryqwXZodbrxQz+DZm7w9OalRLGRqJG6dd4Ki3LZDhlc8vFsfTOP+Gmc0e2unyUSdhOLb2orLsG/q9sz+RBoFxyGy2xhfcLrRU4H7SdoPtqqNeNsNoZUfA41SVd8rncGNgYWs18+Z9AvXQbG8MpHtc+hnqi39vUOIPoNArlarNbLPD2NqoKekj6Qxhuvn1QZjT4TlOdVUddn9b8Jb2neitNMdPR2nLz4nyWp2230lrooqK308dPTRN3Y42DQAL1IgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIP/9k="
      />
      {auth ? (
        <div>
          <div>         </div>
        <ul className="nav-ul">
          <li>

          </li>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <FilterBy onFilterChange={onFilterChange} categories={categories} />
          </li>
          {/* <li> <Link to="/update/:id">Update Product</Link></li> */}
          <li>
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
          
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
          <li  onClick={() => setCartOpen(!cartOpen)}>



        <img src="https://freepngimg.com/thumb/categories/1325.png" alt="Cart"  style={styleObj}></img>


            {/* <Link onClick={CartModal}></Link> */}
          </li>
        </ul>
        </div>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
           
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>

            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
