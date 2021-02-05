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
    },

    aggregateDepth: function(req, res) {
        data.aggregateDepth(req, res, {model: 'Shipwreck', includeCount: true}, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result)
            }
        })
    },

    aggregateDepthHistogram: function(req, res) {
        data.aggregateDepthHistogram(req, res, {model: 'Shipwreck', includeCount: true}, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result)
            }
        })
    },

    aggregateDepthMatch: function(req, res) {
        data.aggregateDepthMatch(req, res, {model: 'Shipwreck', includeCount: true}, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result)
            }
        })
    }
    
}