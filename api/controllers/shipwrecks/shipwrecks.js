const data = require("../../data/runQuery");

module.exports = {

    get: function(req, res) {
        data.query(req, res, {model: 'Shipwreck', includeCount: true}, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result)
            }
        })
    }
    
}