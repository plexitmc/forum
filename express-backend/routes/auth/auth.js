// Imports
const router = require('express').Router();

// Export route
module.exports = (db) => {
    
    // Utils
    const users = require('../../utils/users')(db);
    const auth = require('../../utils/auth')(db);

    // Create rate limiter
    const rateLimiter = require('../../utils/rateLimiter')(60 * 1000, 5, "Too many requests. Try again later.")

    router.get('/', rateLimiter, auth.ensureAuthentication, async (req, res) => {
        // Tutorial: https://circlertech.com/working-with-discord-oauth2
        
    })

    return router;
}