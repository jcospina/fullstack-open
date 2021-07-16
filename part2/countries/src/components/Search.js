import React from "react";

const Search = (props) => {
  return (
    <>
      <label>Find countries: </label>
      <input value={props.searchTerm} onChange={props.onSearchChange} />
    </>
  );
};

export default Search;
