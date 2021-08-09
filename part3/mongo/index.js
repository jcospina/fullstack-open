const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the pass as an argument: node index.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://juan_fullstack:${password}@fullstack-course.6ymct.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

/* const note = new Note({
  content: "Mongo rocks",
  date: new Date(),
  important: false,
});

note.save().then((result) => {
  console.log("note saved");
  mongoose.connection.close();
}); */

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
