var express = require("express");
var router = express.Router();
var messageSchema = require("./messageSchema");

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const messages = await Youremail .find();
    res.json(messages);
  } catch (e) {
    console.log(e)
  }
});

router.post('/', function (req, res, next) {
  try{
    const { Yourname, Youremail, Yourmessage } = req.body;
  const usermessage = new messageSchema({
    Yourname,
    Youremail,
    Yourmessage,
  });
  usermessage.save();
  console.log(usermessage);
  res.status(200).json({
    message: "message received successfully",
  });
  }catch(e){
    console.log(e)
  }
});

module.exports = router;
