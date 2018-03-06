const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const path =require('path');

const HOST = process.env.HOST || '127.0.0.1';    
const PORT = process.env.PORT || 3000;

// Create our express app (using the port optionally specified)
const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/static", express.static(path.join(__dirname, "/public/css")));
app.use("/static", express.static(path.join(__dirname, "/public/images")));
app.use("/static", express.static(path.join(__dirname, "/public/fonts")));
app.use("/static", express.static(path.join(__dirname, "/public/ico")));
app.use("/static", express.static(path.join(__dirname, "/../public/js")));
app.use("/static", express.static(path.join(__dirname, "/public/compiled")));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://mygraphql-app.herokuapp.com/graphql');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
   });

app.get('/dummy', (req, res) => {
  res.send('hello, world111!')

})

app.all('*', (req, res, next) => {
     res.sendFile(path.join(__dirname + '/index.html'));
})

// Let's rock
app.listen(PORT, () => {
  console.log(`${HOST} is listening on port ${PORT}`);
});

