const fs = require('fs');
const db  = require('./db/db.json');
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// app.get('/api/db', (req, res) => {
//   res.send(db);
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});


app.post('/api/db', (req, res) => {
console.log(req.body);
res.join(req.body);
});




function findById(id, noteTaker) {
  const result = noteTaker.filter(Note => Note.id === id)[0];
  return result;
}





app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });


