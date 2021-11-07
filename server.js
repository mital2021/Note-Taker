const fs = require('fs');
const checknote  = require('./db/db.json');
const express = require('express');
const path = require('path');
const app = express();
const util = require('util');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});



//Get apiNotes
app.get('/api/notes', (req, res) =>{

  res.json(checknote);
});



 // Post apiNotes
app.post('/api/notes', (req, res) => {
const id = req;
  req.body.id = id;
checknote.push(req.body);
  fs.writeFile('./db/db.json', JSON.stringify(checknote), {
      
  });
  res.json(checknote);
});

  

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });


