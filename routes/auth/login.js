// Imports
const config = require('../../config.json');
const router = require('express').Router();
const axios = require('axios');
const DiscordOauth2 = require("discord-oauth2");
// Export route
module.exports = (db) => {
    
    // Utils
    const users = require('../../utils/users')(db);
    const auth = require('../../utils/auth')(db);

    // Create rate limiter
    const rateLimiter = require('../../utils/rateLimiter')(2 * 60 * 1000, 5, "Too many requests. Try again later.")

    // Create OAuth2
    const oauth = new DiscordOauth2({
        clientId: config.discord.client_id,
        clientSecret: config.discord.client_secret,
        redirectUri: config.discord.redirect_uri
    })
    

    router.get('/', rateLimiter, auth.forwardAuthentication, async (req, res) => {
        // https://discord.com/oauth2/authorize?client_id=982719567690350633&redirect_uri=http://localhost:80/login&response_type=code&scope=identify&prompt=none
        if(!req.query.code) return res.status(401).json({
            status: 401,
            message: 'No code.'
        });

        oauth.tokenRequest({
            code: req.query.code,
            scope: "identify",
            grantType: 'authorization_code'
        })
        .then((response) => {
            oauth.getUser(response.access_token)
            .then(async (response) => {
                // Check if user exists and create if not.
                if(await users.exists(response.id)){
                    await users.updateDiscord(response.id, {
                        username: `${response.username}#${response.discriminator}`,
                        avatar: `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png`,
                    }).then(async () => await users.loginToUser(response.id, req, (response) => {
                        return res.status(response.status).json({
                            status: response.status,
                            message: response.message,
                            data: response.data
                        });
                    }));
                } else {
                    await users.createNew({
                        id: response.id,
                        username: `${response.username}#${response.discriminator}`,
                        avatar: `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png`,
                    }).then(async () => await users.loginToUser(response.id, req, (response) => {
                        return res.status(response.status).json({
                            status: response.status,
                            message: response.message,
                            data: response.data
                        })        
                    }))
                }
            })
        })
        .catch((err) => {
            return res.status(404).json({
                status: 404,
                message: "Code does not exist",
            })     
        })

    })

    return router;
}