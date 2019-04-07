var express = require('express'),
    bodyParser = require('body-parser'),
    
    app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*if (admin != '') {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://acme-explorer-1176d.firebaseio.com"
    });
}*/

var routesLogin = require('./routes/loginRoutes'),
;

module.exports = app,
    
    routesLogin(app)
  
   