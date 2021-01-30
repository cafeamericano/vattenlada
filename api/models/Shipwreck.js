var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ShipwreckSchema = new Schema({
    depth: {
        type: Number,
        required: false
    }
});

// Create model using defined schema
var Shipwreck = mongoose.model("Shipwreck", ShipwreckSchema);

module.exports = Shipwreck;