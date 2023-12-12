const mongoose = require("mongoose");

const trainerSchema = mongoose.Schema({
    "name": String,
    "since": Number,
    "queue": {
        "pokemon": String,
        "ball": String,
        "number": Number
    },
    "bio": String,
    "ign": String,
    "trades": Boolean,
    "email": String,
    "password": String
}, {
    collection: "trainers"
});

module.exports = mongoose.model('Trainer', trainerSchema);