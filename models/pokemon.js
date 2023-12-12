const mongoose = require("mongoose");

const pokemonSchema = mongoose.Schema({
    "name": String,
    "natdex": Number,
    "form": String,
    "evo": [
        String
    ],
    "prevgen": Boolean,
    "swsh": Boolean,
    "scarvi": Boolean,
    "apri": Boolean,
    "cycles": Number,
    "types": [
        String
    ],
    "hidden": String,
    "eggmoves": [
        String
    ]
}, {
    collection: "possible"
});

module.exports = mongoose.model('Pokemon', pokemonSchema);