// Imports
const router = require('express').Router();

// Export route
module.exports = (db) => {
    
    // Utils
    const forms = require('../../server/forms')(db);
    const auth = require('../../server/auth')(db);
    const applications = require('../../server/applications')(db);

    // Create rate limiter
    const rateLimiter = require('../../server/utils/rateLimiter')(2 * 60 * 1000, 10, "Too many requests. Try again later.")


    // Create application
    router.post('/:id', rateLimiter, auth.ensureAuthenticationWithUser, async (req, res) => {
        var form = await forms.getForm(req.params.id);
        if(!form) return res.status(404).json({ message: "Form not found" });

        if(!form.permissions[req.user?.role] || !form.permissions[req.user?.role].create) return res.status(401).json({ message: "You do not have permission to answer this form." });

        var answers = req.body.answers;

        if(!answers) return res.status(400).json({ message: "No answers provided" });

         // loop though the field object and check if they are valid
        for(var key in form.fields)
            if(form.fields[key].required && !answers[form.fields[key].id]) {
                return res.status(400).json({ message: `The field '${form.fields[key].label}' is required.` });
            }
        
        await applications.createApplication(form._id, req.user._id, answers, (response) => {
            return res.status(response.status).json({ message: response.message });
        });

    })

    return router;
}