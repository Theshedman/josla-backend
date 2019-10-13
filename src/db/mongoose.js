// Import required files
const {connect} = require('mongoose');
require('dotenv/config');

// Uri for database connection
const {DB_URI: uri} = process.env;

/**
 * Connect to mongodb database
 * @returns {Promise<void>}
 */
const connectToDb = async () => {
    try {
        await connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection successful!');
    } catch (e) {
        console.log('Error connecting to the Database!');
    }
};

module.exports = connectToDb;
