function updateDB(type, charge, amnt, units) {
	//these are for tests
	if(units == 'L') {
		amnt = amnt * 1000; //keep blood in milliliters
	}
	var AWS = require("aws-sdk");
	var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
	AWS.config.update({
		region: "us-east-1",
		endpoint: "http://localhost:8000"
	});

	
	
	//Need this data to go any further
	
	var poolData = {
		userPoolID : "...", //TBD
		clientID: "..." //TBD
	};
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	var currUser = userPool.getCurrentUser();

	if(currUser == null) {
		console.log("Error: No current user");
	} 

	currUser.getUserAttributes(function(err, result) {
		if(err) {
			alert(err);
			return;
		}
		
		//check to see what the atttributes are - use one of these to update the DB
		for(i = 0; i < result.length; i ++) {
			console.log("name:" + result[i].getName() + ", value: " + result[i].getValue()); 
		}
	});
	
	
	var docClient = new AWS.DynamoDB.DocumentClient();

	var table = "bloodBase";

	//var hrrNum = 0; //how to get this num?

	var params = {
		TableName: table,
	};

	console.log("Adding a new item...");

	docClient.put(params, function(err, data) {
		if(err) {
			console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
		} else {
			console.log("Added item:", JSON.stringify(data, null, 2));
		}
	});
}