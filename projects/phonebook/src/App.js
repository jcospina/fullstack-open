import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();
    const nameToAdd = newName.trim();
    if (persons.some((person) => person.name === nameToAdd)) {
      return window.alert(`${nameToAdd} is already added to the workbook`);
    }
    if (nameToAdd !== "") {
      setPersons([
        ...persons,
        {
          name: newName,
          number: newNumber.trim(),
        },
      ]);
      setNewName("");
      setNewNumber("");
    }
  };
  const onNumberChange = (event) => setNewNumber(event.target.value);
  const onNameChange = (name) => setNewName(name);
  const onSearchChange = (event) => setSearchTerm(event.target.value);

  const personsToDisplay = persons.filter((person) => {
    const search = searchTerm.trim().toLocaleLowerCase();
    return person.name.toLocaleLowerCase().indexOf(search) >= 0;
  });
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <h2>Add New</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        onNameChange={onNameChange}
        newNumber={newNumber}
        onNumberChange={onNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList persons={personsToDisplay} />
    </div>
  );
};

export default App;
