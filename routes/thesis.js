 const express = require('express');
 const path = require('path');
 const Multer = require('multer');
 const {format} = require('util');
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
     
   router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public/html', 'thesis.html'));
  
  
  });  


  router.get('/upload' ,(req,res)=>{
      res.sendFile(path.join(__dirname,'../public/html', 'thesisupload.html' ));
  });




      router.get('/all', async(req,res,next)=>{
           
          const documents  =  await thesis.findAllThesis();
          console.log(documents);
          res.json(documents); 
      });
     

        router.get('/data/:id', async(req,res,next)=>{
          
        const document = await thesis.findOneThesis(req.params.id);

         console.log(document);
         res.json(document);

      })

      ////////// search thesis  by diferent criteria

          router.post('/search', async(req,res, next)=>{
             console.log(req.body);   
             
             const filter  = req.body.filter;
             const data  = req.body.query;
            

            const documents = await thesis.searchThesis( filter, data );
              console.log(documents);
           //   res.json(documents);   

        }); 


      ///////////////////Create new Thesis document /////////////////////////////

      router.post('/new', multer.single('file'), async(req,res,next)=>{
        
         
         if (!req.file) {
          res.status(400).send('No file uploaded.');
          return;
        }

        // Create a new blob in the bucket and upload the file data.
         const blob =  await  bucket.file(`${req.body.lastName}-${req.body.name}-${req.body.year}`);
        

         ///.makePublic();
         const blobStream =   blob.createWriteStream();
      
         blobStream.on('error', err => {
         next(err);
         });     

        

          blobStream.end(req.file.buffer); 

          const   publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}` );
  
          thesis.create({...req.body,...{Url: publicUrl}});  


           });  
     

          router.delete('/delete/:id', async(req,res,next)=>{
               
              const data = req.params.id
              
              
              
              thesis.deleteThesis(data).then( async(docDeleted )=>{
                 
                 console.log(docDeleted.lastName);
                 console.log(docDeleted.Name);
                 console.log(docDeleted.year);

                 bucket.file(`${docDeleted.lastName}-${docDeleted.Name}-${docDeleted.year}`).delete();   

              }); 
             
        
              // await storage.bucket(bucketName).file(fileName).delete(deleteOptions);    
         });


  module.exports = router;