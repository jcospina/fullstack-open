import React from "react";

const Filter = (props) => {
  return <input value={props.searchTerm} onChange={props.onSearchChange} />;
};

export default Filter;
