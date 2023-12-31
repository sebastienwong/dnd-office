const path = require("path");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 6600;

const fs = require('fs');
const e = require("express");
//const database = require('./test.json');

app
.use(express.static(path.join(__dirname, "/public")))
.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})
.get('/dm', (req, res) => {
  res.sendFile(__dirname + '/public/dm/dm.html');
});;

let all_data;
loadData();

io.on('connection', (socket) => {
  console.log('a user connected');

  io.to(socket.id).emit('all_data', all_data);

  socket.on('error', (data) => {
    io.emit('error', data);
  });

  socket.on('email', (data) => {
    console.log(data);
    createEmail(data);
    try {
      string_database = JSON.stringify(all_data, null, 2);
      fs.writeFileSync('./database.json', string_database, "utf8");
      console.log("Email successfully saved");
      io.emit('email', {id: data.id, database: all_data});
    } catch (error) {
      console.log("An error has occurred ", error);
    }
  });

  socket.on('reply', (data) => {
    console.log(data);

    io.emit('reply', data);
  })
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});


function createEmail(data) {
  let new_email = {
    "from": data.from,
    "subject": data.subject,
    "message": data.body
  }

  if(data.id == 'all') {
    let user_ids = Object.keys(all_data.users);
    for(let i = 0; i < user_ids.length; i++) {
      let email_ids = Object.keys(all_data.users[user_ids[i]].emails);
      let new_id = '0';

      if(email_ids.length != 0) {
        let last_id = email_ids[email_ids.length-1];
        new_id = (Number(last_id) + 1).toString();
      }

      all_data.users[user_ids[i]].emails[new_id] = new_email;
    }
  } else {
    let email_ids = Object.keys(all_data.users[data.id].emails);
    let new_id = '0';

    if(email_ids.length != 0) {
      let last_id = email_ids[email_ids.length-1];
      new_id = (Number(last_id) + 1).toString();
    }

    all_data.users[data.id].emails[new_id] = new_email;
  }
}


function loadData() {
  /*
  fs.readFile("./database.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    try {
      const data = JSON.parse(jsonString);
      all_data = data;
      console.log('Database read');

    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
  */

  all_data = JSON.parse(fs.readFileSync('./database.json'));
  console.log('Sync database read');
}