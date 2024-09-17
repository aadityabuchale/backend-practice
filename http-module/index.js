const http = require("http");
const url = require("url");

const server = http.createServer(function (req, res) {
	const urlInfo = url.parse(req.url, true);
	const queryObj = urlInfo.query;
	// console.log(urlInfo.query);

	// res.write(urlInfo.query.name + " " + urlInfo.query.surname);

	res.writeHead(200, {
		"Content-Type": "text/html",
	});

	for (var query in queryObj) {
		res.write("<h2>" + query + " : 	" + queryObj[query] + "</h2>");
	}

	res.write(urlInfo.pathname);

	res.end();
});

server.listen(8080);

/*
	we use url module for getting more info regarding url. 
	in url we have parse method where first arg is req.url and second arg is true false value, if we give true it will give us an object 
	parse method will return us an object.. info regarding url
	in parese method query is an object. where in key and value pair url will be stored

	rs for recompiling the software
	
*/

// -----------  basic example ----------

// const http = require("http");

// const server = http.createServer(function (req, res) {
// 	// console.log(req);
// 	res.end("Heey AB, You are awesome, lets make the difference");
// });

// server.listen(8080);
