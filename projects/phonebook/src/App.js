import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addNewPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber.trim(),
    };
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the workbook. Do you want to replace the old number with a new one`
        )
      ) {
        return updatePerson(newPerson);
      }
    }
    return phonebookService.addPerson(newPerson).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    });
  };
  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      phonebookService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  const updatePerson = (personToUpdate) => {
    const id = persons.find((person) => person.name === personToUpdate.name).id;
    phonebookService.updatePerson(id, personToUpdate).then((updatedPerson) => {
      return setPersons(
        persons.map((person) =>
          person.id !== updatedPerson.id ? person : updatedPerson
        )
      );
    });
  };
  const onNumberChange = (event) => setNewNumber(event.target.value);
  const onNameChange = (event) => setNewName(event.target.value);
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
      <PersonList persons={personsToDisplay} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
