var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ShipwreckSchema = new Schema({
  headline: {
    type: String,
    required: true
  }
});

// Create model using defined schema
var Shipwreck = mongoose.model("Shipwreck", ShipwreckSchema);

module.exports = Shipwreck;