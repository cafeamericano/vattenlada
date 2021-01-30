let models = require("../models/index");

module.exports = {

	query: function (req, res, args, callback) {

		// Destructure the args object
		let {
			model,
			includeCount
		} = args;

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

		// Prepare a response object
		let response = {};
		
		// Run the query
		models[model].find(findObj)
			.sort({ [sortBy]: sortOrder})
			.skip(Number(skipValue) || 0)
			.limit(Number(limitValue) || 20)
			.then(function(queryResult) {
				response.data = queryResult;
				if (includeCount) {
					models.Shipwreck.find(findObj).count().then((count) => {
						response.count = count;
						return callback(null, response);
					});
				}
				else {
					return callback(null, response);
				}
				
			})
			.catch(function(err) {
				res.json(err, null);
			});

	}
		
}