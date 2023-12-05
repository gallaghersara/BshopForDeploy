import React, { useState } from "react";
// import "./FilterBy.css";

const FilterBy = ({ categories, onFilterChange }) => {
  // const [chosenCategory, setChosenCategory] = useState();
  // debugger
  return (
    <div className="collection-sort">
      <label>Filter:</label>
      <select onChange={onFilterChange}>
        {/* <option value="All">All products</option> */}
        <option value="All">All products</option>
        {categories && categories.length > 0 && (
          categories.map((i, index) => (
            <option value={i} key={index}>
              {i}
            </option>
          ))
        )}
        {/* {categories.map((i, index) => (
          <option value={i} key={index}>
            {i}
          </option>
        ))} */}
        {/* <option value="All">All products</option>
        {categories.length > 0 &&
          categories.map((i, index) => (
            <option value={i} key={index}>
              {i}
            </option>
          ))} */}
      </select>
    </div>
  );
};

export default FilterBy;
