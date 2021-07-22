import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import Notification from "./components/Notification";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  const displayNotification = (notification) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

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
      displayNotification({
        message: `Added ${newPerson.name}`,
        type: "success",
      });
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    });
  };
  const deletePerson = (id) => {
    const deletedPerson = persons.find((person) => person.id === id);
    if (window.confirm("Are you sure you want to delete?")) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          displayNotification({
            message: `Deleted ${deletedPerson.name}`,
            type: "success",
          });
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) =>
          displayNotification({
            message: `Information on ${deletedPerson.name} has already been removed from the server`,
            type: "error",
          })
        );
    }
  };

  const updatePerson = (personToUpdate) => {
    const currentPerson = persons.find(
      (person) => person.name === personToUpdate.name
    );
    phonebookService
      .updatePerson(currentPerson.id, personToUpdate)
      .then((updatedPerson) => {
        displayNotification({
          message: `Updated ${updatedPerson.name}`,
          type: "success",
        });
        return setPersons(
          persons.map((person) =>
            person.id !== updatedPerson.id ? person : updatedPerson
          )
        );
      })
      .catch((error) =>
        displayNotification({
          message: `Information on ${currentPerson.name} has already been removed from the server`,
          type: "error",
        })
      );
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
      <Notification notification={notification}></Notification>
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
