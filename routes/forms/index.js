// Imports
const router = require('express').Router();

// Export route
module.exports = (db) => {
    
    // Utils
    const forms = require('../../server/forms')(db);
    const auth = require('../../server/auth')(db);

    // Create rate limiter
    const rateLimiter = require('../../server/utils/rateLimiter')(2 * 60 * 1000, 35, "Too many requests. Try again later.")

    router.get('/', rateLimiter, auth.ensureAuthentication, async (req, res) => {
        await forms.getForms((response) => {
            if(response.status == 200) {
                return res.status(response.status).json({ message: response.message, forms: response.data });
            }
            return res.status(response.status).json({ message: response.message });
        });
    })

    return router;
}