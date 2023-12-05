import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:8000/product/${params.id}`);
    result = await result.json();
    console.warn(result);
    setTitle(result.title);
    setPrice(result.price);
    setCategory(result.category);
    setDescription(result.description);
  };

  const updateProduct = async () => {
    console.warn(title, price, category, description);
    let result = await fetch(`http://localhost:8000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ title, price, category, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
    }

  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="inputBox"
        type="number"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={updateProduct} className="appButton">
        Update product
      </button>
    </div>
  );
};

export default UpdateProduct;
