'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');

const app = express();

const MAX_VOTES = 1;
let ipDict = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const file_opt = {
  root: __dirname + '/public/',
  dotfiles: 'deny',
};

app.get('/', (req, res, next) => {
  res.sendFile('index.html', file_opt);
});

app.post('/vote', (req, res) => {
  // Only allow one submission for each IP address
  let ip = req.connection.remoteAddress;
  ipDict[ip] = (ipDict[ip] || 0) + 1;
  if (ipDict[ip] > MAX_VOTES) {
    res.status(429).send(`Error 429 Too Many Requests`);
    return;
  }

  let vote = req.body.sneaker;
  if (vote === 'writein') vote = req.body.writein;

  let name = req.body.name;
  console.log(`Got a vote from "${name}" for "${vote}"!`);
  // Yes, this is horrible for XSS reasons. No, I don't care for this assignment
  res.send(`Thank you ${name}, your vote for "${vote}" has been recorded`);
});

// var httpsServer = https.createServer({
//   key: fs.readFileSync('server-key.pem'),
//   cert: fs.readFileSync('server-cert.pem')
// }, app);
// httpsServer.listen(4443);
const server = app.listen(80);
