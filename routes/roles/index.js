// Imports
const router = require('express').Router();

// Export route
module.exports = (db) => {
    
    // Utils
    const roles = require('../../server/roles')(db);

    // Create rate limiter
    const rateLimiter = require('../../server/rateLimiter')(2 * 60 * 1000, 10, "Too many requests. Try again later.")

    router.get('/', rateLimiter, async (req, res) => {
        var _roles = await roles.getRoles();
        res.status(200).json({ roles: _roles });
    })

    return router;
}