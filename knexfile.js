require('dotenv').config({
    path: ".env"
})
const DBConnection = require('./config/database/connection')
module.exports = new DBConnection().config