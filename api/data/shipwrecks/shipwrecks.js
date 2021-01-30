let models = require("../../models/index");

module.exports = {

	get: function (req, res, callback) {

		// Define sort, skip, and limit values
		let sortBy = req.query.sortBy;
		let sortOrder = req.query.sortOrder;
		let skipValue = req.query.skipValue;
		let limitValue = req.query.limitValue;

		// Define filter object
		let findObj = req.query;
		delete findObj.sortValue;
		delete findObj.skipValue;
		delete findObj.limitValue;

		models.Shipwreck.find(findObj)
			.sort({ [sortBy]: sortOrder})
			// .populate("comments")
			.skip(Number(skipValue) || 0)
			.limit(Number(limitValue) || 20)
			.then(function(queryResult) {
				if (callback) {
					return callback(queryResult);
				}
			})
			.catch(function(err) {
				res.json(err);
			});

	}
		
}