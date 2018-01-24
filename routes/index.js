var express = require('express');
var router = express.Router();
// var db = require('../db-config');

var controller = require('../controllers/teste');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', controller.getData);
router.get('/data/:id', controller.getDataId);
router.post('/data', controller.insertData);
router.put('/data/:id', controller.changeData);
router.delete('/data/:id', controller.deleteData);

module.exports = router;
