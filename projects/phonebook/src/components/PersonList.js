import React from "react";
const PersonList = ({ persons, deletePerson }) => {
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => deletePerson(person.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PersonList;
