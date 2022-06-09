// Return module
module.exports = (db) => {
    const obj = {};

    /**
     * Gets an array of created roles.
     * @returns {Array} Array of roles
     */
    obj.getRoles = async () => {
        var res = await db.roles.find({}, {_id: 0, title: 1}).toArray();
        if(!res) return {};
        const roles = {}
        for(var i = 0; i < res.length; i++) 
            roles[res[i].id] = res[i];
        return roles;
    }

    return obj;
}