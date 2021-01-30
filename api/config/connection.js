require('dotenv').config();
const mongoose = require("mongoose");

const dbURL = process.env.MONGODB_URI || "mongodb://localhost/sample_geospatial"; // process.env.NODE_ENV == 'production' ? process.env.MONGODB_URI : "mongodb://localhost/sample_geospatial";
const connection = mongoose.connect(dbURL, {
    useNewUrlParser: true
});

module.exports = connection;