const express = require('express');
const path = require('path');
const userService = require('../services/user');
const user = new userService();


const router = express.Router();


    router.get('/',async(req,res,next)=>{
      
    res.sendFile(path.join(__dirname, '../public/html', 'userlogin.html'));

    });
  
  
   router.post('/new', async(req,res,next)=>{

       const data = req.body;
          
      const newUser = await user.create(data);

      res.json(newUser);

   }) ;

    router.post('/findOne', async(req,res,next)=>{
  
         const data = req.body;

         const oneUser = await user.findOne(data);
          
         console.log(oneUser); 
         res.json(oneUser);

    });





module.exports = router;