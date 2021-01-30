// DEPENDENCIES ====================================================================

const express = require("express");
const cors = require("cors")
const app = express();
require("dotenv").config();
require('./api/config/connection');
const PORT = process.env.PORT || 7000;

// MIDDLEWARE ====================================================================

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTES ====================================================================

//Import all routes
require("./api/routes/_allroutes")(app);

//Home route
app.get("/", function(req, res) {
    res
    .status(200)
    .send(`
        <h2>Vattenlada API</h2>
        <p>The server is listening for requests.</p>
    `)
});

//Endpoint not found
app.get("*", function(req, res) {
    res
    .status(404)
    .json({error: "The requested endpoint does not exist."})
});

// START SERVER ====================================================================

//Start server
app.listen(PORT, function() {
  console.log("Listening on port " + PORT);
});