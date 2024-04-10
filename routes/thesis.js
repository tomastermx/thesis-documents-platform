 const express = require('express');
 const path = require('path');
 const Multer = require('multer');
 const {format} = require('util');
 const boom = require('@hapi/boom');  
 const bucket = require('../firebase/cloudstore');
 const thesisService = require('../services/thesis');
 const thesis = new thesisService();


 const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});


   const router = express.Router();
     
   router.get('/page/:id',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public/html', 'thesis.html'));
  
  
  });  


  router.get('/upload' ,(req,res)=>{
      res.sendFile(path.join(__dirname,'../public/html', 'thesisupload.html' ));
  });




      router.get('/all', async(req,res,next)=>{
           
          const documents  =  await thesis.findAllThesis();
          console.log(documents);
          res.status(200).json(documents); 
      });
     

        router.get('/data/:id', async(req,res,next)=>{
          
        const document = await thesis.findOneThesis(req.params.id);

         console.log(document);
         res.status(200).json(document);

      })

      ////////// search thesis  by diferent criteria

          router.post('/search', async(req, res, next)=>{
             console.log(req.body);   
             
             const filter  = req.body.filter;
             const data  = req.body.query;
            
           try {  
            const documents = await thesis.searchThesis( filter, data );

          filterdocs = documents.filter((doc )=> doc );
          console.log(filterdocs);
          res.status(200).json(filterdocs);

           } catch(error){ next(error); }

        }); 


      ///////////////////Create new Thesis document /////////////////////////////

      router.post('/new', multer.single('file'), async(req,res,next)=>{

     
         console.log(req.body); 
 
        ///////////////////////////////////////////
                 
    

        if (!req.file) {
          res.status(400).send('No file uploaded.');
          return;
        }

        // Create a new blob in the bucket and upload the file data.
          const blob =  await  bucket.file(`${req.body.lastName}-${req.body.name}-${req.body.year}`);
        

         ///.makePublic();
        const blobStream =   blob.createWriteStream();
      
         blobStream.on('error', err => {

         });     

        

          blobStream.end(req.file.buffer); 

          const   publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
  
        
           const newDoc = await  thesis.create({...req.body,...{Url: publicUrl}});
            await res.json(newDoc);
            next();


           } , (req,res)=>{
                     console.log('next middleware')
                
                      } );  
     

   ////////////////////// delete   thesis ////////////////////////////////////////////////
         router.delete('/delete/:id', async(req,res,next)=>{
               
              const data = req.params.id
              
              
              
              thesis.deleteThesis(data).then( async(docDeleted )=>{
                 
                 console.log(docDeleted.lastName);
                 console.log(docDeleted.Name);
                 console.log(docDeleted.year);

                 bucket.file(`${docDeleted.lastName}-${docDeleted.Name}-${docDeleted.year}`).delete();   

              }); 
             
        
               await storage.bucket(bucketName).file(fileName).delete(deleteOptions);    
         });

                   
    

  module.exports = router;