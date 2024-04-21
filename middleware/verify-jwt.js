const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    if (req.cookies.jwt) { 
        jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, function(err, decoded) {
            if (decoded) {
                req.body.trainer = decoded.trainer;
                next()
            } else {
                res.status(401).send("The token could not be validated.")
            }
        })
    } else {
        res.status(401).send("No token was found.")
    }
}

const softCheck = (req, res, next) => {
    if (req.cookies.jwt) { 
        jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, function(err, decoded) {
            if (decoded) {
                req.body.self = true
                next()
            } else {
                req.body.self = false
                next()
            }
        })
    } else {
        req.body.self = false
        next()
    }
}

// const verifyJWT = (req, res, next) => {
//     next()
// }

module.exports.verifyJWT = verifyJWT
module.exports.softCheck = softCheck