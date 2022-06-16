const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const config = require('./config.example.json');

(async () => {
    try{
        console.log("############################################################################");
        await prompt('* Do you want to configure MongoDB? (y/N) ').then(async (answer) => {
            if(answer === 'y'){
                await prompt('* Enter MongoDB port: (27017) ').then(async (answer) => {
                    if(answer) config.mongodb.port = answer;
                })
                await prompt('* Enter MongoDB database: (centox) ').then(async (answer) => {
                    if(answer) config.mongodb.database = answer;
                })


                config.mongodb.host = await prompt('* Enter MongoDB host: ');
                config.mongodb.username = await prompt('* Enter MongoDB username: ');
                config.mongodb.password = await prompt('* Enter MongoDB password: ');

                console.log('* Configuring MongoDB...');
                // Create tables and default collections and create indexes
            }
        })
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
        await prompt('* Enter port: (4200) ').then(async (answer) => {
            if(answer) config.port = answer;
        })
        config.jwt_secret = await prompt('* Enter JWT secret, a long secret key: ');

        var fs = require('fs');
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2), 'utf8');

        rl.close()
    } catch(e){
        console.error("Something went wrong! Oops.", e)
    }
})()

rl.on('close', () => process.exit(0))