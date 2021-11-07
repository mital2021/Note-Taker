const fs = require('fs');
const notecheck  = require('./db/db.json');
const express = require('express');
const path = require('path');
const app = express();
//const util = require('util');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});



//Get apiNotes
app.get('/api/notes', (req, res) =>{

  res.json(notecheck);
});



function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
      notesArray = [];
  
  if (notesArray.length === 0)
      notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, allNotes);
  res.json(newNote);
});

// // Post apiNotes
// app.post('/api/notes', (req, res) => {
// const id = req.body;
//   req.body.id = id();
// db.push(req.body);
//   fs.writeFileAsy('./db/db.json', JSON.stringify(db), {
      
//   });
//   res.json(db);
// });

  

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });


