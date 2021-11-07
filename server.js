const fs = require('fs');
const db  = require('./db/db.json');
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
 
  res.json(db);
});


app.post('/api/notes', (req, res) => {
const data = req;
req.body.id = (data);
db.push(req.body);
fs.writeFileSync(path.join(__dirname, './db/db.json', JSON.stringify(db)));
  

res.send(db);
});



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });


