import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

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
    noteService.getAll().then((allNotes) => setNotes(allNotes));
  }, []);
  const addNote = (event) => {
    // submit event reloads the page so preventDefault is to prevent such behaviour
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((newNote) => {
      setNotes(notes.concat(newNote));
      setNewNote("");
    });
  };
  const onNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((updatedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
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
