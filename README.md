# CS4404 Voting Server #
This is a very basic NodeJS HTTP server for WPI's CS4404 Network Security course, that simply provides a form for a voter to submit, and displays the results. There are also some variants in the branches that provide other features.

## Usage ##
Install dependencies with `npm install`, then run with `nodejs server.js` (or `node server.js`, depending on how node is installed)

## Branches ##
* master - basic server
* attacker - a modified server that steals names, then submits forged requests back to the real server
* ip-count - contains a basic defence that prevents an IP address from voting more than once
* https-hsts - uses HTTPS and HSTS to secure the server
