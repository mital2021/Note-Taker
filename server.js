const fs = require('fs');
const db  = require('./db/db.json');
const express = require('express');
const path = require('path');
const { query } = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// app.get('/api/db', (req, res) => {
//   res.send(db);
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public/index.html'));
// });

// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public/notes.html'));
// });


app.get('/api/notes', (req, res) => {
 const result = fs.writeFileSync(path.join(__dirname, '../db/db.json'),
 JSON.stringify({noteTaker}, null, 2))
 
 return res.json(result);
});




app.post('/api/notes', (req, res) => {
console.log(req.body);
res.join(req.body);
});





// function findById(id, noteTaker) {
//   const result = noteTaker.filter(Note => Note.id === id)[0];
//   return result;
// }





app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });


