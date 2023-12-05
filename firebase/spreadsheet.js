
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: '../key.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  });


  