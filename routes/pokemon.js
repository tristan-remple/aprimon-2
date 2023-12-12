const express = require('express');
const router = express.Router();

const Pokemon = require('../models/pokemon');

router.get('/', function(req, res) {

  Pokemon.find().exec().then(pkmn => {
          
    if (pkmn) {
      res.send(pkmn);
    } else {
      res.status(504).send();
    }
      
  }).catch(err => {
    res.status(500).send();
  });

});

module.exports = router;