// external dependencies
var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// internal dependencies
const { verifyJWT, softCheck } = require("../middleware/verify-jwt")

// models
const Trainer = require('../models/trainer')

const detailless = ({ password, ...rest }) => rest

function checkPassword(val) {
  lengthCheck =  val.length <= 255;
  lowercaseCheck = /.*[a-z]+.*/.test(val)
  uppercaseCheck = /.*[A-Z]+.*/.test(val)
  numberCheck = /.*[0-9]+.*/.test(val)
  otherCheck = /.*[^a-zA-Z0-9]+.*/.test(val)
  return lengthCheck && lowercaseCheck && uppercaseCheck && numberCheck && otherCheck
}

function catchError(err, res) {
  if (err.name === "CastError") {
    res.status(400).send("Improperly formatted ID.")
  } else if (err.name === "ValidationError") {
    res.status(422).send(err.message)
  } else {
    res.status(500).send("The server has encountered an error. Please come back later.")
  }
}

router.get('/', function(req, res) {
  
  Trainer.find().lean().exec().then(trnr => {

    if (trnr) {
      const publicTrainers = trnr.map(function(trainer){
        return detailless({...trainer})
      })
      res.send(publicTrainers)
    } else {
      res.status(404).send()
    }
  }).catch(err => {
    res.status(500).send()
  })

})

router.get('/check', softCheck, function(req, res) {
  if (req.trainer) {
    res.send({
      trainer: req.trainer
    })
  } else {
    res.status(404).send()
  }
})

router.get('/:user', softCheck, function(req, res) {

  Trainer.findOne({name: req.params.user}).lean().exec().then(trnr => {
    if (trnr) {
      const data = detailless({...trnr})
      data.self = req.trainer === trnr.name
      res.send(data)
    } else {
      res.status(404).send()
    }
  }).catch(err => {
    catchError(err, res)
  })

})

router.patch('/:user', verifyJWT, function(req, res) {
  Trainer.findOne({name: req.params.user}).lean().exec().then(trnr => {
    if (trnr) {

      const newTrainer = req.body
      Trainer.findByIdAndUpdate(trnr._id, newTrainer, {
        runValidators: true,
        returnDocument: "after"
      }).exec().then(result => {
        res.status(201).send(newTrainer)
      }).catch(err => {
        catchError(err, res)
      })
    } else {
      res.status(404).send()
    }
  }).catch(err => {
    catchError(err, res)
  })
})

router.post('/register', function(req, res) {

  if (!req.body.email) {
    res.status(401).send("Registration requires input.")
  }

  Trainer.find({ $or: [
    { name: req.body.username },
    { email: req.body.email }
  ]}).exec().then(result => {

    if (result.length > 0) {
      res.status(401).send("Email or username is already in use.")
    } else {
      
      if (checkPassword(req.body.password)) {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          req.body.password = hash
          const newUser = new Trainer(req.body)

          newUser.queue = {
            pokemon: null,
            form: null,
            ball: null,
            number: 0
          }
          newUser.since = 0
          newUser.bio = ""
          newUser.ign = ""
          newUser.switchCode = ""
          newUser.discord = ""
          newUser.trades = false

          newUser.save().then(result => {
            const token = jwt.sign({ trainer: result.name }, process.env.JWT_SECRET)
            const cookieOptions = {
              secure: true,
              httpOnly: true,
              path: '/'
            }
            res.cookie("jwt", token, cookieOptions)
            res.status(201).send(result)
          }).catch(err => {
            console.log(err)
            catchError(err, res)
          })

        })

      } else {
        res.status(401).send("Weak password.")
      }
    }
  }).catch(err => {
    res.status(500).send("The server has encountered an error. Please come back later.")
  })

})

const cookieOptions = {
  secure: true,
  httpOnly: true,
  path: '/'
}

router.post('/login', (req, res) => {

  Trainer.findOne({ email: req.body.email }).exec().then(findres => {
    if (!findres) {
      res.status(401).send("Invalid sign in credentials.")
    } else {

      bcrypt.compare(req.body.password, findres.password, function(err, result) {
        if (result) {
          const token = jwt.sign({ trainer: findres.name }, process.env.JWT_SECRET)
            
          res.cookie("jwt", token, cookieOptions)
          res.status(200).send({
            loggedTrainer: findres.name
          })

        } else {
          res.status(401).send("Invalid sign in credentials.")
        }
      })
    }
  }).catch(err => {
    console.log(err)
    catchError(err, res)
  });
  
});

router.post('/logout', (req, res) => {
  res.clearCookie('jwt', cookieOptions)
  res.status(204).send()
});

module.exports = router