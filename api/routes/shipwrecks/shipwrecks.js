const controller = require("../../controllers/shipwrecks/shipwrecks");

module.exports = function(app) {
  
    app.get("/api/shipwrecks", controller.get);

}