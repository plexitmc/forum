const { ObjectId } = require('mongodb');
const { uuid } = require('uuidv4');
const axios = require('axios')

// Return module
module.exports = (db) => {
    const obj = {};

    /**
     * Creates a webhook for a channel
     * @param {string} url - The url to send the webhook to
     * @param {string} name - The name of the webhook
     * @param {string} type - type of the webhook
     * @param {Function} callback - Callback function
     */
    obj.createWebhook = async (url, name, type, callback) => {
        try {
            var secretKey = uuid().toString();

            await db.webhooks.insertOne({
                url: url,
                name: name,
                type: type,
                secret: secretKey
            }, (err, res) => {
                if(err){
                    console.log(err);
                    return callback({ status: 500, message: 'An internal error occurred.' });
                }
                return callback({ status: 200, message: "Webhook has been created.", secret: secretKey })
            });
        } catch(err) {
            console.log(err);
            return callback({ status: 500, message: 'An internal error occurred.' });
        }
    }

    /**
     * Delete a webhook by id
     * @param {string} id - The id of the webhook
     * @param {Function} callback - Callback function
     */
    obj.deleteWebhook = async (id, callback) => {
        try {
            await db.webhooks.deleteOne({ _id: new ObjectId(id) }, (err, res) => {
                if(err){
                    console.log(err);
                    return callback({ status: 500, message: 'An internal error occurred.' });
                }
                return callback({ status: 200, message: "Webhook has been deleted." });
            });
        } catch(err) {
            console.log(err);
            return callback({ status: 500, message: 'An internal error occurred.' });
        }
    }


    /**
     * Gets all webhooks
     * @returns {Array} - Array of webhooks
     */
    obj.getWebhooks = async () => {
        var webhooks = await db.webhooks.find({}).toArray();
        return webhooks;
    }

    /**
     * Gets a webhook by id
     * @param {string} id - The id of the webhook
     * @returns {Object} - The webhook
     */
    obj.getWebhookById = async (id) => {
        try {
            var webhook = await db.webhooks.findOne({ _id: new ObjectId(id) });
            return webhook;
        } catch(err) {
            console.log(err);
            return null;
        }
    }

    /**
     * Send request to webhooks with data
     * @param {string} type - The type of the webhook
     * @param {Object} data - The data to send
     */
    obj.sendWebhook = async (type, data) => {
        try {
            var webhooks = await db.webhooks.find({ type: type }).toArray();
            for(var i = 0; i < webhooks.length; i++){
                var webhook = webhooks[i];
                await axios.post(webhook.url, { type: type, secret: webhook.secretKey, data: data }, { headers: { 'Content-Type': 'application/json' } });
            }
        } catch(err) {
            console.log(err);
        }
    }
    

    /**
     * Send webhook when a comment is created.
     * @param {*} application - The application which the comment was created on
     * @param {*} comment - The comment which was created
     */
    obj.onComment = async (application, comment) => {
        var data = {
            application: application,
            comment: comment
        }
        await obj.sendWebhook('onComment', data);
    }

    return obj;
}