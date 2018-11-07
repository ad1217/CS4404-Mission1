'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');

const app = express();

app.use((req, res, next) => {
    res.header('Strict-Transport-Security', 'max-age=31536000');
    next();
});

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
  let vote = req.body.sneaker;
  if (vote === 'writein') vote = req.body.writein;

  let name = req.body.name;
  console.log(`Got a vote from "${name}" for "${vote}"!`);
  // Yes, this is horrible for XSS reasons. No, I don't care for this assignment
  res.send(`Thank you ${name}, your vote for "${vote}" has been recorded`);
});

let httpsServer = https.createServer({
 key: fs.readFileSync('certificates/serverkey.pem'),
 cert: fs.readFileSync('certificates/servercert.pem')
}, app);
httpsServer.listen(443);
