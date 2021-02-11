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

	},

	aggregateDepth: function (req, res, args, callback) {

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
		models[model].aggregate(([
			// Stage 1
			{$group: {_id: "$depth", count: {$sum: 1}}}
			// Stage 2
			// {$count: "depthAndFeatureType"}
		]))
			// .sort({ [sortBy]: sortOrder})
			.sort({ _id: -1})
			// .skip(Number(skipValue) || 0)
			// .limit(Number(limitValue) || 20)
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

	},

	aggregateDepthHistogram: function (req, res, args, callback) {

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
		models[model].aggregate(([
			// Stage 1
			{$group: {_id: "$depth", avgDepth: {$avg: "$depth"}, count: {$sum: 1}}},
			// Stage 2
			{
				// $bucketAuto: {
				// 	groupBy: "$_id",
				// 	buckets: 20
				// }
				$bucket: {
					groupBy: "$_id",
					boundaries: [ -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, Number.POSITIVE_INFINITY ],
					default: Number.NEGATIVE_INFINITY,
					output: { count: { $sum: 1 } } // the number in each category
				}
			}
			// {$count: "depthAndFeatureType"}
		]))
			// .sort({ [sortBy]: sortOrder})
			.sort({ _id: 1})
			// .skip(Number(skipValue) || 0)
			// .limit(Number(limitValue) || 20)
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

	},

	aggregateDepthMatch: function (req, res, args, callback) {

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
		models[model].aggregate(([
			// Stage 1
			{$match: {depth: {$gte: 3}}},
			{$group: {_id: "$depth", avgDepth: {$avg: "$depth"}, count: {$sum: 1}}},
			// Stage 2
			{
				$bucketAuto: {
					groupBy: "$_id",
					buckets: 5
				}
			}
			// {$count: "depthAndFeatureType"}
		]))
			// .sort({ [sortBy]: sortOrder})
			.sort({ count: -1})
			// .skip(Number(skipValue) || 0)
			// .limit(Number(limitValue) || 20)
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

	},

	aggregateDepthArithmetic: function (req, res, args, callback) {

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
		models[model].aggregate(([
			// Stage 1
			{$match: {depth: {$ne: ""}}},
			{$group: {
				_id: null,
				total: {
					$sum: "$depth"
				},
					average_depth: {
					$avg: "$depth"
				},
					min_depth: {
					$min: "$depth"
				},
					max_depth: {
					$max: "$depth"
				}
			}},
			// Stage 2
			// {
			// 	$bucketAuto: {
			// 		groupBy: "$_id",
			// 		buckets: 5
			// 	}
			// }
			// {$count: "depthAndFeatureType"}
		]))
			// .sort({ [sortBy]: sortOrder})
			.sort({ count: -1})
			// .skip(Number(skipValue) || 0)
			// .limit(Number(limitValue) || 20)
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

	},

	aggregateLocationWreckTallies: function (req, res, args, callback) {

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
		models[model].aggregate(([
			// Stage 1
			{ "$group": {
				"_id": {
					"latitude": {$round: ["$latdec", 0]},
					"longitude": {$round: ["$londec", 0]}
				},
				"count": { "$sum": 1 }
			}},
			// Stage 2
			// {
			// 	$bucketAuto: {
			// 		groupBy: "$_id",
			// 		buckets: 9
			// 	}
			// }
			// {$count: "depthAndFeatureType"}
		]))
			// .sort({ [sortBy]: sortOrder})
			.sort({ count: 1})
			// .skip(Number(skipValue) || 0)
			// .limit(Number(limitValue) || 20)
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