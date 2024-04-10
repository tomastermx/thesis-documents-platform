const express = require('express');
const path = require('path');



const router = express.Router();


    router.get('/login',async(req,res,next)=>{
      
    res.sendFile(path.join(__dirname, '../public/html', 'userlogin.html'));

    });
  
  
   router.post('/', async(req,res,next)=>{

   }) ;


module.exports = router;