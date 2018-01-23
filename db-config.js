var conString = "postgres://postgres:91416644@localhost/teste";
var pg = require('pg-promise')()(conString);


module.exports = pg;
