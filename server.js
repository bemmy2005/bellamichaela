const express = require('express');
const bodyParser = require('body-parser');
const validator = require ('express-validator');
const ejs =require ('ejs');
const http =require('http');
const cookieParser =require ('cookie-parser');
const session = require('express-session');
const MongoStore = require ('connect-mongo')(session);
const mongoose = require ('mongoose');
const flash = require ('connect-flash');
const passport = require('passport');

const container = require('./container');



container.resolve(function(users,_,admin,home){

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/bellamuchaela');
mongoose.connect('mongodb://localhost/bellamuchaela',{useMongoClient: true});
  const app =  SetupExpress();
  function SetupExpress(){
    const app = express();
    const server = http.createServer(app);
    //------------this is replaced by below code
    server.listen(4000, function(){
     console.log('listening on port 4000');
  });
//----------------------------------------------
  //server.listen(3000, (err) => {
  //console.log('server started on port: '+3000);
  // });
    ConfigureExpress(app);
    //Setup router
    const router = require('express-promise-router')();
    users.SetRouting(router);
    admin.SetRouting(router);
    home.SetRouting(router);

    app.use(router);
  }


  function ConfigureExpress(app){
    require('./passport/passport-local');
    app.use(express.static('public'));
    app.use(cookieParser());
    app.set('view engine','ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(validator());
    app.use(session({
      secret:'thisisasecretkey',
      resave:false,
      saveUninitialized:true,
      store:new MongoStore({mongooseConnection:mongoose.connection})
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.locals._=_;
  }

});
