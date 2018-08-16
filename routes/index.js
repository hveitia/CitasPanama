var express = require('express');
var router = express.Router();



// Import Controllers
var baseController = require('../controllers/controller');


  router.get('/', function(req, res) {
     res.send("RestApi!");
  });

router.route('/scrap')
    .get(baseController.scrap);


module.exports = router;