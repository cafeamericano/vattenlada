const controller = require("../../controllers/shipwrecks/shipwrecks");

module.exports = function(app) {
  
    app.get("/api/shipwrecks", controller.get);
    app.get("/api/aggregate/depth", controller.aggregateDepth);
    app.get("/api/aggregate/depthHistogram", controller.aggregateDepthHistogram);
    app.get("/api/aggregate/depthMatch", controller.aggregateDepthMatch);
    app.get("/api/aggregate/depthArithmetic", controller.aggregateDepthArithmetic);
    app.get("/api/aggregate/locationWreckTallies", controller.aggregateLocationWreckTallies);

}