// Imports
const { ObjectId } = require('mongodb');

// Return module
module.exports = (db) => {
    const obj = {};

    const auth = require('./auth')(db);

    /**
     * Check if a user by a specific discord id exists in the database
     * @param {Number} discord id
     * @returns {Boolean} if the user exists or not
     */
    obj.exists = async (id) => {
        var res = await db.users.findOne({ id });
        if(!res) return false;
        return true;
    }

    /**
     * Update discord user information when logging in.
     * @param {Number} id discord if of user
     * @param {*} data object with data to update
     * @returns 
     */

    obj.updateDiscord = async (id, data, callback) => {
        var user = await obj.getUser(id);
        if(user == null) return;
        
        user.username = data.username;
        user.avatar = data.avatar;

        db.users.updateOne({ id }, {$set: user }, (err, res) => {
            if (err) {
                console.error(err);
            }
        });
    }

    /**
     * Creates a new user in the database
     * @param {*} user 
     * @param {Function} callback 
     */
    obj.createNew = async (data, callback) => {
        // DO SOMETHING
        if (!await obj.exists(data.id)){
            const user = {
                id: data.id,
                username: data.username,
                avatar: data.avatar,
                role: null,
                createdAt: new Date().getTime(),
            }
            db.users.insertOne(user, async (err, res) => {
                if (err) console.log(err);
                console.log(res)
            });
        }
    }

    /**
     * Login to user
     * @param {String} id 
     */
     obj.loginToUser = async (id, req, callback) => {
        var user = await db.users.findOne({ id });
        if (!user) callback({status: 404, message: 'User not found.'});
        else {
            var token = auth.generateAccessToken(user._id.toString());
            db.logins.insertOne({
                token: token,
                ipaddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                user: new ObjectId(user._id),
                loggedIn: new Date().getTime()
            }, async (err, res) => {
                if (err) {
                    console.error(err);
                    return callback({status: 404, message: 'Something went wrong.'});
                }
                return callback({status: 200, message: `Logged in successfully.`, data: { token: token }});
            });
        }
    }

    /**
     * Logout
     * @param {String} token 
     */ 
    obj.logout = async (token, callback) => {
        db.logins.updateOne({token: token}, {$unset: {token: 1}}, (err, result) => {
            if (err) {
                console.error(err);
                callback({
                    status: 400,
                    message: 'Something went wrong logging out'
                });
            } else {
                callback({
                    status: 200,
                    message: 'Logged out succesfully.'
                });
            }
        });
    }

    /**
     * Logout all logged in sessions
     * @param {String} userId 
     */ 
    obj.logoutFromAllSessions = async (userId, callback) => {
        db.logins.updateMany({user: new ObjectId(userId)}, {$unset: {token: 1}}, (err, result) => {
            if (err) {
                console.error(err);
                callback({
                    status: 400,
                    message: 'Something went wrong logging out of all sessions.'
                });
            } else {
                callback({
                    status: 200,
                    message: 'Logged out of all sessions succesfully.'
                });
            }
        });
    }

    /**
     * Get user data
     * @param {String} id discord id
     */
    obj.getUser = async (id) => {
        var user = await db.users.findOne({ id: id });
        if (!user) return null;
        return user;
    }

    /**
     * Get user data by user id
     * @param {String} userId 
     */
     obj.getUserById = async (userId) => {
        var user = await db.users.findOne({ _id: new ObjectId(userId) });
        if (!user) return null;
        return user;
    }

    /**
     * Get user data from access token
     * @param {String} accessToken 
     */
    obj.getUserFromAccessToken = async (accessToken) => {
        var login = await db.logins.findOne({token: accessToken});
        if (!login) return null;
        var user = await db.users.findOne({_id: new ObjectId(login._id)});
        if (!user) return null;
        return user;
    }

    return obj;
}