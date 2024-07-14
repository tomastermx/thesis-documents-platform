const {getFirestore, collection ,Filter } = require('firebase-admin/firestore');

const bcrypt = require('bcrypt');
const db = require('../firebase/firebase');



    class userService{ 
       constuctor(){
        
   }

        async create(data) {
          console.log(data);
        
            
          const password = await  bcrypt.hashSync('chidopass',10);
          
          const  newUser = { password , ... data.email }
           
          data.password = password;
           
        
             
          const userRef = await db.collection('users').add(data);
          const user = await  userRef.get(); 
          return {...{"id":user.id}, ...user.data()}

      } 
     
        async findOne(data){

        
          

        const userRef = db.collection('users');
        const snapshot = await userRef.where('email', '==', data.email).get();

        const document =  snapshot.docs.map(doc => {
               
           
         return {  ...{ id: doc.id}, ...doc.data() } 

        });
    
         return document;

        }

  }

module.exports = userService;