// Package imports
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const path = require('path');

// Local imports
const config = require('./config.json');
const connectToDatabase = require('./server/database');
const getFileLocations = require('./server/getFileLocations');

// Creating the app
const server = express();
const app = next({ dev: config.dev });
const handle = app.getRequestHandler();
const http = require('http').Server(server);

// Middleware
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());

// CORS
server.use((req, res, next) => {
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

app.prepare().then(() => {
    connectToDatabase(config.mongodb, async (err, client) => {

        if (err) throw err;
    
        // Load database collections
        const database = client.db(config.mongodb.database);
    
        console.log('Connected to --- MongoDB ---');
        var collections = ['users', 'logins']
        var db = {}
    
        for(let i = 0; i < collections.length; i++){
            console.log(` - ${collections[i]}`)
            db[collections[i]] = database.collection(collections[i]);
        }
    
    
        // Load base API routes
        var baseRoutes = await getFileLocations(`${__dirname}/routes/`, ['.js', '.ts']);
    
    
        server.use(express.static(path.join(__dirname, './public')))
        server.use('/_next', express.static(path.join(__dirname, './.next')))
    
        console.log('Loading base routes..');
        for (let i = 0; i < baseRoutes.length; i++) {
            var paths = `${baseRoutes[i]}`.replace(__dirname, ''),
                pathArr = paths.split('/'),
                baseName = `/`;
            for (let j = 3; j < pathArr.length; j++) {
                if ((j > 1) && (j != (pathArr.length - 1))) baseName += `${pathArr[j]}/`;
                else if (pathArr[j] != 'index.js') baseName += `${`${pathArr[j]}`.replace('.js', '').replace('.ts', '')}/`;
            }
            var route = require(baseRoutes[i])(db);
            server.use(`/api${baseName}`, route);
            console.log(` - /api${baseName}`);
        }
    
        
    
        // Logger
        server.use((req, res, next) => {
            console.log(`${req.method} ${req.url} - ${JSON.stringify(req.body)}`);
            next();
        });


        // Handle all other requests (next pages)
        server.get('*', (req, res) => {
            return handle(req, res);
        });

    
        // Start API Server
        const port = config.port || 3000
        http.listen(port, () => {
            console.log(`Server running in --- ${process.env.NODE_ENV || "development"} --- on port ${port}`)
        });
    });
});