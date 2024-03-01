const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/logindemo')
const userschema =mongoose.Schema({
  firstname : String,
  lastname : String,
  username : String,
  password: String,
})
userschema.plugin(plm)
module.exports = mongoose.model("user",userschema)