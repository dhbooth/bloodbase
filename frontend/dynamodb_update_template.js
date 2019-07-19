var AWS = require("aws-sdk");

AWS.config.update({
	region: "us-east-1",
	endpoint: "http://localhost:8000"
});
var docClient = new AWS.DynamoDB.DocumentClient();

var table = "donors";
var blah1, blah2, blah3, f, g;

var params = {
	TableName: table,
	Item: {
		"blah1": blah1,
		"blah2": blah2,
		"blah3": {
			"f": f,
			"g": g
		}
	}
};

console.log("Adding a new item...");

docClient.put(params, function(err, data) {
	if(err) {
		console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	} else {
		console.log("Added item:", JSON.stringify(data, null, 2));
	}
});