import React from "react";

const Filter = (props) => {
  return (
    <>
      <label>Search: </label>
      <input value={props.searchTerm} onChange={props.onSearchChange} />
    </>
  );
};

export default Filter;
