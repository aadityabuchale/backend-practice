const express = require("express");
const app = express();
const mongo = require("mongodb");

let db = null;

mongo.MongoClient.connect("mongodb://localhost:27017")
	.then((connection) => {
		console.log("database connected");

		db = connection.db("ecommerce-webapp");
		const products = db.collection("products");

		products
			.insertOne({
				name: "sneakers",
				price: 9000,
				available: true,
			})
			.then(() => console.log("data saved"))
			.catch((err) => console.log("unable to store data"));
	})
	.catch((err) => {
		console.log("an error occured", err);
	});

app.listen(8080);
