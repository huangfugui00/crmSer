require('dotenv').config()
const mongoose = require('mongoose')

//db_url = mongodb+srv://admin:<password>@cluster0.tj20q.mongodb.net/test?retryWrites=true&w=majority

const MONGO_URI=process.env.DB_URL

const DBconnection = async () => {
  const conn = await mongoose
    .connect(MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
    })
    .catch(err => {
      console.log(`For some reasons we couldn't connect to the DB`.red, err)
    })

  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports = DBconnection

