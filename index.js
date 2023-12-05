const express = require('express');
const app =  express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
let logger = require('morgan');
const firebase = require('./firebase/firebase');
const bucket = require('./firebase/cloudstore');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));

app.use(express.static('public'));
app.use(logger('dev'));

const indexRouter = require('./routes/index');
const thesisRouter = require('./routes/thesis');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/thesis',thesisRouter);
app.use('/user', userRouter);


app.listen(3000,()=>{
    console.log('server listen in port 3000');
})
