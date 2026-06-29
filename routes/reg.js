var express = require('express');
var router = express.Router();
var regschema=require('./regschema');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    name:'mohan',
    age:18
  });
});
router.post("/",async function (req, res, next) {

  
  try{
    const {Yourname,youremail,password}=req.body;
     const newuser = new regschema({
       Yourname,
       youremail,
       password,
      
     });
    

    const exsitinguser = await regschema.findOne({youremail})

    if (exsitinguser){
      return res.status(200).json({
        success:false,
        massage:"User already exsist"
      });
    }
    else{
      // newuser.save();
      res.status(200).json({
        success:true,
        massage:"data saved successfully"
        
      })
      
    }
  }catch(e){
   console.error(e)
  }

    
  
});




module.exports = router;