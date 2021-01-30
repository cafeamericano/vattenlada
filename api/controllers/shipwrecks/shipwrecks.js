const data = require("../../data/shipwrecks/shipwrecks");

module.exports = {

    get: function(req, res) {
        data.get(req, res, (result) => {
            res.json(result);
        })
    }
    
}