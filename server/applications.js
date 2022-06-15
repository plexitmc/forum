// Imports
const { ObjectId } = require('mongodb');

// Return module
module.exports = (db) => {
    const obj = {};

    /**
     * Create application
     * @param {String} formId - The form _id
     * @param {String} userId - The user _id
     * @param {Object} answers - The answers
     * @param {Function} callback - The callback
     */
    obj.createApplication = async (formId, userId, answers, callback) => {
        try {
            var userObject = new ObjectId(userId);
            var formObject = new ObjectId(formId);

            await db.applications.insertOne({
                form: formObject,
                user: userObject,
                createdAt: new Date().getTime(),
                statusUpdatedAt: new Date().getTime(),
                status: "pending",
                comments: [],
                answers: answers
            }, (err, res) => callback({ status: 200, message: "Application has been created!" }));
        } catch(err) {
            callback({ status: 500, message: 'An internal error occurred.' });
        }
    }

    /**
     * Get the number of total applications with a specific status and formId
     * @param {String} formId - The form _id
     * @param {String} status - The status
     * @param {Function} callback - The callback
     */
    obj.getTotalApplications = async (formId, status, callback) => {

    }


    /**
     * Get a paginated list of all application with a specific status
     * 
     * @param {String} formId - The form _id
     * @param {String} status - The status
     * @param {Number} page - The page
     * @param {Number} limit - The limit
     */
    obj.getAllApplications = async (formId, status, page, limit) => {
        try {
            var formObject = new ObjectId(formId);
            return db.applications.find({ form: formObject, status: status }, { projection: { answers: 0, comments: 0 }, skip: (page - 1) * limit, limit: limit, sort: { createdAt: -1} }).toArray();
        }
        catch(err) {
            return []
        }
    }

    /**
     * Get a list of users applications
     * @param {String} userId - The user _id
     */
    obj.getUserApplications = async (userId) => {
        try {
            var userObject = new ObjectId(userId);
            return db.applications.find({ user: userObject }, { projection: { answers: 0, comments: 0 }}).toArray();
        }
        catch(err) {
            return []
        }
    }

    /**
     * Get a specific application
     * @param {String} applicationId - The application _id
     */
    obj.getApplication = async (applicationId) => {
        try {
            var applicationObject = new ObjectId(applicationId);
            return db.applications.findOne({ _id: applicationObject });
        }
        catch(err) {
            return null
        }
    }

    return obj;
}