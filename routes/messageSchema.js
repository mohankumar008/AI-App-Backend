const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  Yourname: {
    type: String,
  },
  Youremail: {
    type: String,
  },
  Yourmessage: {
    type: String,
  },
});

const messagedetails = mongoose.model("users",messageSchema);
module.exports=messagedetails;