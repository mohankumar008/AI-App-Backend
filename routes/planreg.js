var express = require("express");
var router = express.Router();
var regschema = require("./regschema");
const bcrypt = require("bcrypt");

router.get("/", function (req, res, next) {
  res.json({
    name: "mohan",
    age: 18,
  });
});

router.post("/", async function (req, res, next) {


  const password = req.body.password;
  
 
    
    const salt = await bcrypt.genSalt(10);
    const Hash = await bcrypt.hash(password, salt);
  

  const plan = req.body.plan;

  const payDate = new Date();

  let expirytime;

  switch (plan) {
    case "Free Trial":
      expirytime = 1;
      break;

    case "Pro":
      expirytime = 7;
      break;

    case "Advanced":
      expirytime = 30;
      break;

    default:
      console.log("plan not found");
  }

  const endDate = new Date(
    payDate.getTime() + expirytime * 24 * 60 * 60 * 1000
  );

  try {
    const { Yourname, youremail, password, plan } = req.body;
    const newuserone = new regschema({
      Yourname,
      youremail,
      password,
      Hash,
      salt,
      plan,
      payDate,
      endDate,
    });
    newuserone.save();
    res.json({
      result: "data saved successfully",
    });
   
  } catch (e) {
    console.error(e);
  }
  
});


module.exports = router;
