import React from "react";

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNewPerson}>
      <div>
        Name: <input value={props.newName} onChange={props.onNameChange} />
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
