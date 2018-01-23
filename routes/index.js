var express = require('express');
var router = express.Router();
// var db = require('../db-config');

var controller = require('../controllers/teste');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', controller.getData);
router.post('/data', controller.insertData);
router.put('/data/:id', controller.changeData);

module.exports = router;
