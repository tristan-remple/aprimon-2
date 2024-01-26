var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Trainer = require('../models/trainer');
const Aprimon = require('../models/aprimon');

const detailless = ({email, password, ...rest}) => rest;

function checkPassword(val) {
  lengthCheck =  val.length <= 255;
  lowercaseCheck = /.*[a-z]+.*/.test(val);
  uppercaseCheck = /.*[A-Z]+.*/.test(val);
  numberCheck = /.*[0-9]+.*/.test(val);
  otherCheck = /.*[^a-zA-Z0-9]+.*/.test(val);
  return lengthCheck && lowercaseCheck && uppercaseCheck && numberCheck && otherCheck;
}

function catchError(err, res) {
  if (err.name === "CastError") {
    res.status(400).send("Improperly formatted ID.")
  } else if (err.name === "ValidationError") {
    res.status(422).send(err.message);
  } else {
    res.status(500).send("The server has encountered an error. Please come back later.");
  }
}

router.get('/', function(req, res) {
  
  Trainer.find().lean().exec().then(trnr => {

    if (trnr) {
      const publicTrainers = trnr.map(function(trainer){
        return detailless({...trainer});
      });
      res.send(publicTrainers);
    } else {
      res.status(404).send();
    }
  }).catch(err => {
    res.status(500).send();
  });

});

router.get('/:id', function(req, res) {

  Trainer.findOne({name: req.params.user}).lean().exec().then(trnr => {
    if (trnr) {
      res.send(detailless({...trnr}));
    } else {
      res.status(404).send();
    }
  }).catch(err => {
    catchError(err, res);
  });

});

router.post('/register', function(req, res) {

  if (!req.body.email) {
    res.status(401).send("Registration requires input.");
  }

  Trainer.find({ email: req.body.email }).exec().then(result => {

    if (result.length > 0) {
      res.status(401).send("Email is already registered.");
    } else {
      
      if (checkPassword(req.body.password)) {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          req.body.password = hash;
          const newUser = new Trainer(req.body);

          newUser.save().then(result => {
            const token = jwt.sign({ trainer: findres.name }, process.env.JWT_SECRET);
            const cookieOptions = {
              secure: true,
              httpOnly: true,
              path: '/'
            };
            res.cookie("jwt", token, cookieOptions);
            res.status(201).send(result);
          }).catch(err => {
            console.log(err);
            catchError(err, res);
          });

        });

      } else {
        res.status(401).send("Weak password.");
      }
    }
  }).catch(err => {
    res.status(500).send("The server has encountered an error. Please come back later.");
  });

});

router.post('/signin', (req, res) => {

  Trainer.findOne({ email: req.body.email }).exec().then(findres => {
    if (!findres) {
      res.status(401).send("Invalid sign in credentials.");
    } else {

      bcrypt.compare(req.body.password, findres.password, function(err, result) {
        if (result) {
          const token = jwt.sign({ trainer: findres.name }, process.env.JWT_SECRET);
          const cookieOptions = {
            secure: true,
            httpOnly: true,
            path: '/'
          };
            
          res.cookie("jwt", token, cookieOptions);
          res.status(200).send("Welcome");

        } else {
          res.status(401).send("Invalid sign in credentials.");
        }
      });
    }
  }).catch(err => {
    console.log(err);
    catchError(err, res)
  });
  
});

router.post('/signout', (req, res) => {
  res.clearCookie('jwt');
  res.status(204).send();
});

module.exports = router;