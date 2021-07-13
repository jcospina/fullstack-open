import React, { useState, useEffect } from "react";
import Note from "./components/Note";

import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("A new note");
  const [showAll, setShowAll] = useState(true);
  // Effects are executed immediately after rendering
  // The second param from the effect indicates the way it is going to run
  // by default it executes after every rende but passing an array as param changes
  // this behaviour. An empty array tells react that the effect should only be executed
  // once. We can also add some props to execute the effect only when the props change
  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((response) => setNotes(response.data));
  }, []);
  const addNote = (event) => {
    // submit event reloads the page so preventDefault is to prevent such behaviour
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    // use concat instead of push since it returns a new array
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };
  const onNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={onNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
