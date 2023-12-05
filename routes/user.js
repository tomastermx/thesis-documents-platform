const express = require('express');
const path = require('path');



const router = express.Router();

 router.get('/upload/thesis',async(req,res,next)=>{

    res.sendFile(path.join(__dirname, '../public/html', 'thesisupload.html'));

 });

 router.post('/upload/thesis', async(req,res,netx)=>{});



 router.get('/login',async(req,res,next)=>{

});


module.exports = router;