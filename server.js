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

let util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

// app.get('/api/notes', (req, res) => {
//  const result = fs.writeFileSync(path.join(__dirname, '../db/db.json'),
//  JSON.stringify({result})),
 
//  return res.json(result);
// });


// app.post('/api/notes', (req, res) => {
// console.log(req.body);
// res.join(req.body);
// });



// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
  readFileAsync("./db/db.json", "utf8").then(function (data) {
      data = JSON.parse(data)
      // console.log(data)
      return res.json(data);
  })
});

// POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  // create a variable and dump the data you got from the post ajax call in here
  var newNotes = req.body;

  // console.log(newNotes)

  //read the db.json file to grab the arrays of object and return json
  readFileAsync("./db/db.json", "utf8").then(function (data) {
      data = JSON.parse(data)
      // console.log(data);
      //  push the new data into the db.json
      data.push(newNotes);

      // data.push(data[data.length - 1].id=data.length-1) is grabbling the length and appending to the object
      data[data.length - 1].id=data.length-1;

      //once the new note is added to the array from db.json file then write the upated changes
      writeFileAsync("./db/db.json", JSON.stringify(data));
  })
  res.send("created notes!")
})






app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });


