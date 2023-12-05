
//https://firebase.google.com/docs/storage/gcp-integration?hl=es-419&authuser=0


//https://dev.to/kamalhossain/upload-file-to-google-cloud-storage-from-nodejs-server-5cdg

const {Storage} = require('@google-cloud/storage');


const storage = new Storage({keyFilename: 'key.json'});


const bucket =  storage.bucket('upd-thesis-bucket');

module.exports = bucket;