require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");

// Creates express app
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res) => {
  Note.findById(req.params.id).then((note) => res.json(note));
});

app.delete("/api/notes/:id", (req, res) => {
  const id = +req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false,
  });
  note.save().then((savedNote) => res.json(savedNote));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const generateId = () => {
  const maxId = notes.reduce((prev, current) => {
    return prev > current.id ? prev : current.id;
  }, 0);
  return maxId + 1;
};
