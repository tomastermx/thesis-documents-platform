        const {getFirestore, collection ,Filter } = require('firebase-admin/firestore');

        const db = require('../firebase/firebase');
      




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


          /////////////////////Find all thesis function 
           async findAllThesis(){
           const thesisRef = db.collection('thesis');
           const snapshot =  await thesisRef.get();
              return snapshot.docs.map(doc => { 
              return {...{"id":doc.id}, ...doc.data()}

            });
      }
      
    ///////////////////////Find One thesis
      async findOneThesis(data){

        const thesisRef = db.collection('thesis').doc(data);
        const document = await  thesisRef.get();
       
        return { ...{ id: document.id}, ...document.data() }


      }
 
      ///////////////////////////SearchThesis///////////////////////

        async searchThesis( filter, data ){
           
          let thesisRef;
          let snapshot;


           switch(filter){
///////////////////////  //search by title ///////////////// 
            case 'title':
            
               
             let query = data.split(" ");
             
  

               thesisRef = db.collection('thesis');
               snapshot =  await thesisRef.get();
               return  snapshot.docs.map(doc => { 

                  var title =  doc.data().title.split(" ");
                  console.log(title);
                  console.log(query);
                  
                for(let i = 0 ; i < query.length; i++){ 

                       
                    
                    
      if(title.includes(query[i]) || title.includes(modifyString(query[i])) || title.includes(query[i].toLowerCase()) && query[i]!=="" ){
                      
                      return {...{"id":doc.id}, ...doc.data()};   
                           
                     }
               
                  
                     
                  }   
                

                  
                 }); 
              
               break;
 
               /////////////// search by author
             case 'author':
                
              modifyString(data); 

                thesisRef = db.collection('thesis');
                snapshot =  await thesisRef.where(Filter.or(
                Filter.where('lastName', '==',data),
                Filter.where('lastName','==', modifyString(data)),
                Filter.where('Name', '==', data),
                Filter.where('Name','==', modifyString(data))

              )).get();

              return  snapshot.docs.map(doc => { 
              return {...{"id":doc.id}, ...doc.data()} });

              break;
            
            // search by advisor
            case 'advisor':
            thesisRef = db.collection('thesis');
            snapshot =  await thesisRef.where(Filter.or(
              Filter.where('advisor', '==',data),
              Filter.where('advisor', '==',modifyString(data))
            )).get();
                              
             return  snapshot.docs.map(doc => { 
             return {...{"id":doc.id}, ...doc.data()} });             


            
              break;
            
           // search by year
            case 'year':
               thesisRef = db.collection('thesis');
               snapshot =  await thesisRef.where('year','==',data ).get();
              return  snapshot.docs.map(doc => { 
              return {...{"id":doc.id}, ...doc.data()} });

          }
           
         



      
               
          }   

         async updateThesis(data){

         }



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

*/  }

    module.exports = thesisService;