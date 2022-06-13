// Return module
module.exports = (db) => {
    const obj = {};

    const roles = require('./roles')(db);

    /**
     * Insert empty collection into form collection.
     * @param {Function} callback
     */
    obj.createForm = async (callback) => {
        await db.forms.insertOne({
            name: 'Newly created form',
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        }, async (err, res) => {
            if(err) {
                console.log(err);
                callback({ status: 400, message: 'Form could not be created' });
            } else callback({ status: 200, message: 'New form created' });
        })
    }

    /**
     * Get all forms from database without 'fields' field
     * @param {Function} callback
     */
    obj.getForms = async (callback) => {
        await db.forms.find({}, { fields: 0 }).toArray(async (err, res) => {
            if(err) {
                console.log(err);
                callback({ status: 400, message: 'Forms could not be retrieved' });
            } else callback({ status: 200, message: 'Forms retrieved', data: res });
        })
    }

    return obj;
}