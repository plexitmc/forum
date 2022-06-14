// Imports
const { ObjectId } = require('mongodb');

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
            fields: [],
            permission: {
                admin: {
                    create: true,
                    viewOthers: true,
                    comment: true,
                    changeStatus: true,
                }
            },
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
     * Get form by id.
     * @param {String} id
     */
    obj.getForm = async (formId) => {
        try {
            var form = await db.forms.findOne({ _id: new ObjectId(formId) });
            if(!form) return null;
            return form;
        } catch(err) {
            return null;
        }
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
    
    /** 
     * Update form by id.
     * @param {String} id
     * @param {Object} form
     * @param {Function} callback 
     */
    obj.updateForm = async (formId, form, callback) => {
        try {
            delete form._id
            var dbForm = await obj.getForm(formId);
            if(!dbForm) return callback({ status: 404, message: 'Form not found' });
            await db.forms.replaceOne({ _id: new ObjectId(formId) }, { ...form, updatedAt: new Date().getTime() }, async (err, res) => {
                if(err) {
                    console.log(err);
                    callback({ status: 400, message: 'Form could not be updated' });
                } else callback({ status: 200, message: 'Form updated' });
            })
        } catch(err) {
            console.log(err)
            callback({ status: 400, message: 'Form could not be updated' });
        }
    }

    return obj;
}