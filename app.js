const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(expressLayouts);


const models = require('./database/models')
models.sequelize.sync().then(() => {
  console.log("sync worked")
}).catch((err) => {
  throw(err)
})

require("./routes")(app)

app.get('/public/script.js',function(req,res){
    res.sendFile(path.join(__dirname + '/public/script.js')); 
});
app.get('/public/styles.css',function(req,res){
    res.sendFile(path.join(__dirname + '/public/styles.css')); 
});

const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

module.exports = app;