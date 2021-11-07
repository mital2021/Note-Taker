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


app.get('/api/notes', (req, res) => {
 
  res.json(db);
});


app.post('/api/notes', (req, res) => {
//console.log(req.body);
req.body.id = path();
db.push(req.body);
fs.writeFile('.db/db.json', JSON.stringify(db), err, data) => {
  if (err) throw err;
}
res.json(db);
});









app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });


