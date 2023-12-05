import React, { useState } from "react";

const AddProduct = () => {
  const [title, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const AddProduct = async () => {
    if (!title || !price || !description || !category){
        setError(true)
        return false
    }
    console.warn(title, price, description, category);
    
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(userId);

    let result = await fetch("http://localhost:8000/add-item", {
        method: "POST",
        body: JSON.stringify({ title, price, category, description, userId }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    result = await result.json();
    console.warn(result);
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Name"
        value={title}
        onChange={(e) => setName(e.target.value)}
      />
      { error && !title && <span className="invalid-input">Enter valid name</span>}
      <input
        className="inputBox"
        type="number"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
            { error && !price && <span className="invalid-input">Enter valid price</span>}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
            { error && !description && <span className="invalid-input">Enter valid description</span>}

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
            { error && !category && <span className="invalid-input">Enter valid category</span>}

      <button onClick={AddProduct} className="appButton">
        Add product
      </button>
    </div>
  );
};

export default AddProduct;
