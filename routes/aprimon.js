// external dependencies
const express = require('express')
const router = express.Router()

// internal dependencies
const { verifyJWT } = require("../middleware/verify-jwt")

// models
const Aprimon = require('../models/aprimon')
const Pokemon = require('../models/pokemon')

const otherDetails = ({name, form, natdex, ...rest}) => rest

function catchError(err, res) {
    if (err.name === "CastError") {
        res.status(400).send("Improperly formatted ID.")
    } else if (err.name === "ValidationError") {
        res.status(422).send(err.message)
    } else {
        console.log(err)
        res.status(500).send("The server has encountered an error. Please come back later.")
    }
}

router.get('/', function(req, res) {
    res.send("Welcome to Aprimon")
})

router.get('/:user', function(req, res) {

    Aprimon.find({trainer: req.params.user}).exec().then(pkmn => {
        if (pkmn) {
            res.send(pkmn)
        } else {
            res.status(404).send()
        }
        
    }).catch(err => {
        catchError(err, res)
    })

})

router.get('/:user/:id', function(req, res) {
    
    Aprimon.findById(req.params.id).exec().then(pkmn => {
        if (pkmn) {
            res.send(pkmn)
        } else {
            res.status(404).send()
        }
    }).catch(err => {
        catchError(err, res)
    })

})

router.post('/', verifyJWT, (req, res) => {

    for (const prop in req.body) {
        if (typeof req.body[prop] === 'string' && prop !== "trainer") {
            req.body[prop] = req.body[prop].toLowerCase()
        }
    }
    const newApri = new Aprimon(otherDetails({...req.body}))

    console.log(req.body)
    Pokemon.findOne({name: req.body.pokemon.name}).exec().then(pkmn => {
        if (pkmn) {
            newApri.pokemon.name = req.body.pokemon.name
            newApri.pokemon.natdex = pkmn.natdex
            newApri.pokemon.form = req.body.pokemon.form
            newApri.eggs = 0
            newApri.onhand = 0
            newApri.trainer = req.body.trainer

            newApri.ha = req.body.ha ? true : false
            newApri.fiveiv = req.body.fiveiv ? true : false
            newApri.target = req.body.target ? true : false
            newApri.wishlist = req.body.wishlist ? true : false

            newApri.save().then(result => {
                res.status(201).send(newApri)
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

router.patch('/', verifyJWT, (req, res) => {

    console.log(req.body)

    Aprimon.findOne({pokemon: req.body.pokemon, ball: req.body.ball, trainer: req.body.trainer}).exec().then(pkmn => {
        if (!pkmn) {
            res.status(404).send()
        } else if (pkmn.trainer !== req.body.trainer) {
            res.status(401).send()
        } else {
            for (const prop in req.body) {
                if (typeof req.body[prop] === 'string') {
                    req.body[prop] = req.body[prop].toLowerCase()
                }
            }
        
            const apri = otherDetails({...req.body})
            apri.pokemon = pkmn.pokemon
        
            Aprimon.findByIdAndUpdate(pkmn._id, apri, {
                runValidators: true,
                returnDocument: "after"
            }).exec().then(pkmn => {
                res.status(201).send(apri)
            }).catch(err => {
                catchError(err, res)
            })
        }
    })

})

router.put('/', verifyJWT, (req, res) => {

    Aprimon.findOne({ pokemon: req.body.pokemon, ball: req.body.ball, trainer: req.body.trainer }).exec().then(pkmn => {
        if (!pkmn) {
            res.status(404).send()
        } else if (pkmn.trainer !== req.body.trainer) {
            res.status(401).send()
        } else {
            Aprimon.findByIdAndDelete(pkmn._id).exec().then(response => {
                if (!response) {
                    res.status(404).send()
                } else {
                    res.status(200).send(req.body)
                }
            }).catch(err => {
                catchError(err, res)
            })
        }
    })

})

module.exports = router