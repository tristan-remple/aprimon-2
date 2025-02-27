const dotenv = require('dotenv')
dotenv.config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_CONN)
  .then(() => { console.log("Connected") })
  .catch(err => console.log(err))

const trainersRouter = require('./routes/trainers')
const pokemonRouter = require('./routes/pokemon')
const aprimonRouter = require('./routes/aprimon')

const app = express()

const corsOptions = {
  origin: process.env.APP_ORIGIN,
  methods: [ 'GET', 'POST', 'PATCH', 'PUT' ],
  credentials: true
}
app.use(cors(corsOptions))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))


app.use('/pkmn', pokemonRouter)
app.use('/trainers', trainersRouter)
app.use('/aprimon', aprimonRouter)

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app
