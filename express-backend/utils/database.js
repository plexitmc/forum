// imports
const {MongoClient} = require('mongodb');

// Module Export
module.exports = (details, cb) => {
    var databaseHost = `${details.host}:${details.port}`
    var connectOptions = (details.username != '' && encodeURIComponent(details.password) != '') ? `${details.username}:${encodeURIComponent(details.password)}@${databaseHost}` : databaseHost;

    MongoClient.connect(`mongodb://${connectOptions}/admin?retryWrites=true`, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
        cb(err, client)
    });
}