const mongoose = require("mongoose");


const regschema = new mongoose.Schema({
  Yourname: {
    type: String,
  },
  youremail: {
    type: String,
  },
  password: {
    type: String,
  },
  Hash: {
    type: String,
  },
  salt: {
    type: String,
  },
  plan: {
    type: String,
  },
  payDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
});

const regDtails = mongoose.model('users',regschema);

module.exports=regDtails;