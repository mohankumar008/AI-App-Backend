var express = require("express");
var router = express.Router();
var messageSchema = require("./messageSchema");
var message=require("./messagepage")

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", function (req, res, next) {
  const message = req.body.message;
  const newmes = new messageSchema({
    message: message,
  });
//   const messagepage=messagepage.body
  newmes.save();
  console.log(message);
  res.json({
    message:messagepage.body
  });
});

module.exports = router;
