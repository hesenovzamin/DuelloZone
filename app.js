const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const User = require('./model/user')
//const User = require('./models/user');


app.set('view engine','pug');
app.set('views','./views');

 const connectString = 'mongodb+srv://zaminhesenov:k25DCx64c8XWQiWG@cluster0.lzbqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const adminRoutes = require('./routes/admin');
 const UserRouter = require('./router/user');
// const { connect } = require('./routes/admin');


let store = new mongoDbStore({
    uri : connectString,
    collection :'mySessions'
})

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./Public/img');
    },
    filename : function(req,file,cb){
        cb(null,req.body.name + Date.now() + 'Logo.jpg');
        console.log('adlandirma');
    }
})

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(multer({storage : storage}).array('File',5))
app.use(express.static(path.join(__dirname,'Public')))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge : 3600000
    },
    store : store
  }))

app.use((req, res, next) => {
    
    if (!req.session.user)
    {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => { console.log(err) });
})

app.use('/',UserRouter);
// app.use('/admin',adminRoutes);
 



app.use('/',(req,res,next) => {
    res.send('<h1>Salam</h1>');

});

 
mongoose.connect(connectString ,{ useNewUrlParser: true ,useCreateIndex : true ,useUnifiedTopology: true })

.then(() => {
    console.log('baglandiq qaqa');
        app.listen(3000,()=>{
    }) 
})
.catch(err => {
    console.log(err);
})

