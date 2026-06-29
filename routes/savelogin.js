var express = require("express");
var router = express.Router();
var regschema = require("./regschema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cors = require("cors");



router.post("/", async function (req, res, next) {
  try {
    const youremail = req.body.youremail;
    const password = req.body.password;
    console.log(youremail, password);

    const secretkey =
      "eyJhbGciOiJIUzI1NiJ9.ew0KICAic3ViIjogIjEyMzQ1Njc4OTAiLA0KICAibmFtZSI6ICJBbmlzaCBOYXRoIiwNCiAgImlhdCI6IDE1MTYyMzkwMjINCn0.7efGkjJJyX3GrxfY3e8WkM46TQ1y1y3sdAP0l7NwyAI";

    const email = await regschema.findOne({ youremail });

    if (!email) {
      res.status(201).json({
        message: "user not found",
      });
    }
    // res.json({
    //   message: "user found",
    // });

    const pass = email.Hash;
    console.log(pass);

    const passcheck = await bcrypt.compare(password, pass);

    if (!passcheck) {
      res.status(202).json({
        message: "invalid password",
      });
    }

    // res.json({
    //   message:'valid user'
    // })
    const nowDate = new Date();

    const expiryDate = new Date(email.endDate);

    if (expiryDate < nowDate) {
      res.status(203).json({
        message: "Your plan expired,please create new account!",
      });
    }

    // res. status(200).json({
    //   message:'valid user'
    // })

   
    const token = jwt.sign({ youremail }, secretkey, { expiresIn: "2h" });
    res.status(200).json({
      message: "valid user",
      email,
      token,
    });
    
   
  } catch (e) {}
});

router.get("/", function (req, res, next) {
  const youremail = req.body.youremail;
    const password = req.body.password;

  res.json({
    name:"" ,
    age: 18,
  });
});

module.exports = router;
