const mongoose = require("mongoose");

const aprimonSchema = mongoose.Schema({
    "pokemon": {
        "name": {
            type: String,
            required: true
        },
        "natdex": {
            type: Number,
            required: true
        },
        "form": String
    },
    "ball": {
        type: String,
        enum: [
            "beast", "dream", "fast", "friend", "heavy", "level", "love", "lure", "luxury", "moon", "safari", "sport"
        ],
        required: true
    },
    "nature": {
        type: String,
        enum: [
            "random", "serious",
            "lonely", "adamant", "naughty", "brave",
            "bold", "impish", "lax", "relaxed",
            "modest", "mild", "rash", "quiet",
            "calm", "gentle", "careful", "sassy",
            "timid", "hasty", "jolly", "naive"
        ],
        required: true
    },
    "eggs": Number,
    "onhand": Number,
    "final": String,
    "ha": Boolean,
    "fiveiv": Boolean,
    "target": Boolean,
    "wishlist": Boolean,
    "eggmoves": [
        String
    ],
    "trainer": {
        type: String,
        required: true
    }
}, {
    collection: "obtained"
});

module.exports = mongoose.model('Aprimon', aprimonSchema);