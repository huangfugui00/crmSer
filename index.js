const express = require('express')
const morgan = require('morgan') 
var fs = require('fs')
var path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const DBConnection = require('./config/db')



DBConnection()

const app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(express.static('./'))
app.use(cors())

app.use(express.json())


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message)
})


const port = process.env.PORT || 3001;

app.listen(port,()=>console.log(port))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
})
