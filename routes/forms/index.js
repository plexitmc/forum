// Imports
const router = require('express').Router();

// Export route
module.exports = (db) => {
    
    // Utils
    const forms = require('../../server/forms')(db);
    const auth = require('../../server/auth')(db);

    // Create rate limiter
    const rateLimiter = require('../../server/utils/rateLimiter')(2 * 60 * 1000, 100, "Too many requests. Try again later.")

    router.get('/', rateLimiter, auth.ensureAuthentication, async (req, res) => {
        await forms.getForms((response) => {
            if(response.status == 200) {
                return res.status(response.status).json({ message: response.message, forms: response.data });
            }
            return res.status(response.status).json({ message: response.message });
        });
    })


    router.get('/:id', rateLimiter, auth.ensureAuthentication, async (req, res) => {
        var form = await forms.getForm(req.params.id);
        if(!form) return res.status(404).json({ message: "Form not found" });
        return res.status(200).json({ form: form });
    })


    router.delete('/:id', rateLimiter, auth.ensureAuthenticationWithUser, async (req, res) => {
        if(req.user.role !== "admin") return res.status(401).json({ message: "Forbidden." });
        await forms.deleteForm(req.params.id, (response) => res.status(response.status).json({ message: response.message }));
    })



    router.post('/:id', rateLimiter, auth.ensureAuthenticationWithUser, async (req, res) => {
        if(req.user.role !== "admin") return res.status(401).json({ message: "Forbidden." });

        const { form } = req.body;
        console.log(form)
        if(!form) return res.status(400).json({ message: "Form not provided." });

        var dbForm = await forms.getForm(req.params.id);
        if(!dbForm) return res.status(404).json({ message: "Form not found" });

        await forms.updateForm(req.params.id, form, (response) => res.status(response.status).json({ message: response.message }));
    })



    return router;
}