const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const config = require('./config.example.json');

(async () => {
    console.log("############################################################################");
    await prompt('* Enter port: (8080) ').then(async (answer) => {
        if(answer) config.port = answer;
    })
    config.jwt_secret = await prompt('* Enter JWT secret, a long secret key: ');

    console.log("############################################################################");
    await prompt('* Do you want to configure Discord oAuth2? (y/N) ').then(async (answer) => {
        if(answer === 'y'){
            console.log("########################")
            console.log(" * Create an Discord Application at: ")
            console.log(" * https://discordapp.com/developers/applications/")
            console.log(" * and add a redirect uri with this path: ")
            console.log(" * http://localhost/login")
            console.log("########################")
            config.discord.client_id = await prompt('* Enter Discord client ID: ');
            config.discord.client_secret = await prompt('* Enter Discord client secret: ');
            await prompt('* Enter Discord redirect URI: (https://apply.example.com/login) ').then(async (answer) => {
                if(answer) config.discord.redirect_uri = answer;
            })
        }
    })

    console.log("############################################################################");
    const configureMongo = await prompt('* Do you want to configure MongoDB? (y/N) ');
    if(configureMongo === 'y'){
        await prompt('* Enter MongoDB port: (27017) ').then(async (answer) => {
            if(answer) config.mongodb.port = answer;
        })
        await prompt('* Enter MongoDB database: (centox) ').then(async (answer) => {
            if(answer) config.mongodb.database = answer;
        })


        config.mongodb.host = await prompt('* Enter MongoDB host: ');
        config.mongodb.username = await prompt('* Enter MongoDB username: ');
        config.mongodb.password = await prompt('* Enter MongoDB password: ');
    }

    var fs = require('fs');
    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2), 'utf8');


    if(configureMongo === 'y'){
        console.log('* Connecting to MongoDB...');
        // Create tables and default collections and create indexes
        const mongo = require('./server/utils/database');
        await mongo(config.mongodb, async (err, client) => {
            if(err) {
                console.log(' - Error connecting to MongoDB: ' + err);
                rl.close();
                process.exit(0)
            } else {
                console.log('* MongoDB connected successfully!');
                const database = client.db(config.mongodb.database);

                console.log('* Creating indexes...');
                await database.collection('logins').createIndex({ loggedIn: 1 }, { expireAfterSeconds: 3600*24*7 })
                await database.collection('applications').createIndex({ status: 1 });
                await database.collection('applications').createIndex({ user: 1 });
                await database.collection('roles').createIndex({ id: 1 }, { unique: true });

                console.log('* Creating default roles...');
                // Creates default roles
                await database.collection('roles').insertOne({
                    label: 'admin',
                    id: 'admin',
                    color: 'red',
                    deletable: false
                });
                await database.collection('roles').insertOne({
                    label: 'default',
                    id: 'default',
                    color: 'gray',
                    deletable: false
                });


                var firstUserId = await prompt('* Enter your Discord ID: ');
                console.log('* Inserting first user...');
                // Insert first user
                await database.collection('users').insertOne({
                    id: firstUserId,
                    role: 'admin',
                    owner: true,
                    createdAt: new Date().getTime()
                });
                console.log('* MongoDB configured successfully!');
                rl.close();
                process.exit(0)
            }
        })
    } else {
        rl.close()
        process.exit(0)
    }
})()