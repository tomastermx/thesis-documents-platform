    const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
    const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
    const key = require('../key.json');
    const fireStoreKeys = require('../key.json');

    
    initializeApp({
        credential: cert(fireStoreKeys)
    
     });
    

        const db = getFirestore();

        module.exports = db;

