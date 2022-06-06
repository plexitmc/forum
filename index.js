// Package imports
const express = require('express');
const bodyParser = require('body-parser');

// Local imports
const config = require('./config.json');
const connectToDatabase = require('./utils/database');
const getFileLocations = require('./utils/getFileLocations');

// Creating the app
const app = express();
const http = require('http').Server(app);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Content-Length, X-Requested-Width, Accept, Access-Control-Allow-Credentials');

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
})

connectToDatabase(config.mongodb, async (err, client) => {

    if (err) throw err;

    // Load database collections
    const database = client.db(config.mongodb.database);

    console.log('Database connected! Loading collections');
    var collections = ['users', 'logins']
    var db = {}

    for(let i = 0; i < collections.length; i++){
        console.log(` - ${collections[i]}`)
        db[collections[i]] = database.collection(collections[i]);
    }


    // Load base API routes
    var baseRoutes = await getFileLocations(`${__dirname}/routes/`, ['.js', '.ts']);

    console.log('Loading base routes..');
    for (let i = 0; i < baseRoutes.length; i++) {
        var path = `${baseRoutes[i]}`.replace(__dirname, ''),
            pathArr = path.split('/'),
            baseName = `/`;
        for (let j = 3; j < pathArr.length; j++) {
            if ((j > 1) && (j != (pathArr.length - 1))) baseName += `${pathArr[j]}/`;
            else if (pathArr[j] != 'index.js') baseName += `${`${pathArr[j]}`.replace('.js', '').replace('.ts', '')}/`;
        }
        var route = require(baseRoutes[i])(db);
        app.use(`/api${baseName}`, route);
        console.log(` - /api${baseName}`);
    }


    // Logger
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url} - ${JSON.stringify(req.body)}`);
        next();
    });

    // Start API Server
    http.listen(config.port, () => {
        console.log(`Base API listening on port ${config.port}`);
    });
});


