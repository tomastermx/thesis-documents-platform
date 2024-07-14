        const {getFirestore, collection ,Filter } = require('firebase-admin/firestore');

        const db = require('../firebase/firebase');
      
        const boom = require('@hapi/boom');        
     


        //////////////////////////UpperLower Case function          
          function modifyString(str){

          const str2 = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(); 

          return str2;
         }


         /////////////// thesis class////////////////////////////////////////////////
 
         class thesisService{ 
          constuctor(){
         }
            
         

         //////////////////////////////Create thesis///////////////////////////////
         async create(data){
            const thesisRef = await db.collection('thesis').add(data);   
            const doc = await  thesisRef.get();  
            return {...{"id":doc.id}, ...doc.data()}

            }  


          /////////////////////Find all thesis function ////////////////////////////////////////
           async findAllThesis(limit ,  page){
            const thesisRef = db.collection('thesis');
            let snapshot;

          if(page == 1 ){
             snapshot =  await thesisRef.orderBy('createdOn').limit(limit).get();
             
          } else {
            const  offset = (page -1) * limit         
                      
            const  reference = db.collection('thesis').orderBy('createdOn');
            const document = await reference.get(); 
         
            const last = document.docs[offset];

             snapshot =  await thesisRef.orderBy('createdOn').startAt(last).limit(limit).get(); 
          }

                 
           const count =  await thesisRef.count().get();
             
              

              const docs =  await snapshot.docs.map(doc => { 
              return {...{"id":doc.id}, ...doc.data()}

            });
               
              const pagination = Math.ceil((count.data().count)/limit);
            
              if(docs){
           
               return {...{documents:docs},...{"pagination": pagination}}

              }  else {throw boom.notFound('doc not found');}



      }
       
    
    ///////////////////////Find One thesis/////////////////////////////////////////////77
      async findOneThesis(data){

        const thesisRef = db.collection('thesis').doc(data);
        const document = await  thesisRef.get();
        
         if(document){
        
           return { ...{ id: document.id}, ...document.data() }
 
         } else {  throw boom.notFound('doc not found');} 

      }
 
      ///////////////////////////SearchThesis///////////////////////

     async searchThesis( filter, data ){
         
        let  results


          let thesisRef;
          let snapshot;
          let query = data.split(" "); 

            if(!data || !filter ){
              throw boom.notFound('prueba');
            }


             switch(filter){
         ///////////////////////  //search by title ///////////////// 
            case 'title':
            
               

               thesisRef = db.collection('thesis');
               snapshot =  await thesisRef.get();
               results   = snapshot.docs.map(doc => { 

                  var title =  doc.data().title.split(" ");
                  console.log(title);
                  console.log(query);
                  
                for(let i = 0 ; i < query.length; i++){ 
   
                    
      if(title.includes(query[i]) || title.includes(modifyString(query[i])) || title.includes(query[i].toLowerCase())){
                              
                      return {...{"id":doc.id}, ...doc.data()};   
                        
                        }  
                     
                  }  
    
             
                  
                 }); 

         
              
               break;
 
               /////////////// search by author
             case 'author':



              thesisRef = db.collection('thesis');
              snapshot =  await thesisRef.get();
              results =  snapshot.docs.map(doc => {
              
                let authorName =  doc.data().name.split(" "); 
                let authorLastname = doc.data().lastName.split(" ");
              
               
              for(let i = 0 ; i < query.length; i++)
                  if(authorName.includes(modifyString(query[i]))|| authorLastname.includes(modifyString(query[i])) && query[i] !== "" )
                             
                      
                  return {...{"id":doc.id}, ...doc.data()};  
                    
                

              })

            break;
            
            //// search by advisor
           
           
             case 'advisor':
            
             thesisRef = db.collection('thesis');
             snapshot =  await thesisRef.get();
             results = snapshot.docs.map(doc => {
             
               let advisorName =  doc.data().aName.split(" "); 
               let advisorLastname = doc.data().alastName.split(" ");
             
              
             for(let i = 0 ; i < query.length; i++)
                 if(advisorName.includes(modifyString(query[i]))|| advisorLastname.includes(modifyString(query[i]))){

                   
         
                  return {...{"id":doc.id}, ...doc.data()};  
  
                 
               }


             })
            
              break;
           

           ///////////// search by year
            case 'year': 
            thesisRef = db.collection('thesis');
            snapshot =  await thesisRef.where('year','==', data ).get();
            results =  snapshot.docs.map(doc => { 
            return {...{"id":doc.id}, ...doc.data()} });
             
             
             }
               const documents = results.filter((doc )=> doc);      
             
             if(documents){
        
             return {...{documents:documents},...{"pagination":documents.length}};   
              
             } else {throw boom.notFound('docs not found')}  
       }   

            async updateThesis(data){}



           async deleteThesis(data){
    
         // const thesisRef = db.collection('thesis').doc(data).delete();
         
         const thesisRef = db.collection('thesis').doc(data);
         const document = await  thesisRef.get();
           
        thesisRef.delete();
        return document.data();
  
         
         }
    
      /*
          
     

     const docRef = db.collection('users').doc('alovelace');

       async function  create(){
       
        const docRef = db.collection('users').doc('alovelace');
        
            await docRef.set({
      first: 'Ada',
     last: 'Lovelace',
     born: 1815
         });
    }https://cloud.google.com/nodejs/docs/reference/storage/latest?authuser=0

*/     }

    module.exports = thesisService;