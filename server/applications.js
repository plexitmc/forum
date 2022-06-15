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
                status: "pending",
                comments: [],
                answers: answers
            }, (err, res) => callback({ status: 200, message: "Application has been created!" }));
        } catch(err) {
            callback({ status: 500, message: 'An internal error occurred.' });
        }
    }

    return obj;
}