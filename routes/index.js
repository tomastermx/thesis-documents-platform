const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config()

router.get('/',(req,res)=>{

  
  res.sendFile(path.join(__dirname, '../public/html', 'index.html'));
    
   const payload = { 'project':'computek' }
  
   const token =jwt.sign(payload, '9zhCWS6UtG' ) ;
  
   res.cookie('token', token , {httpOnly: false} );


});



module.exports = router;