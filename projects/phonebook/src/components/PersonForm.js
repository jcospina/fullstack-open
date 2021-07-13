import React from "react";

const PersonForm = (props) => {
  const onNameChange = (event) => {
    event.preventDefault();
    const nameToAdd = event.target.value;
    if (nameToAdd !== "") {
      props.onNameChange(nameToAdd);
    }
  };
  return (
    <form onSubmit={props.addNewPerson}>
      <div>
        Name: <input value={props.newName} onChange={onNameChange} />
      </div>
      <div>
        Number:
        <input value={props.newNumber} onChange={props.onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
