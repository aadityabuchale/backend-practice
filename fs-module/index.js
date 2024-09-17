// ----------- dynamic routing kind of concept in node js -----------

const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
	const urlInfo = url.parse(req.url, true);

	const pathName =
		urlInfo.pathname === "/" ? "index" : urlInfo.pathname.slice(1);

	console.log(pathName);

	const completePath = `./ui/${pathName}.html`;

	// fs.readFile(completePath, (err, data) => {
	// 	// console.log(data.toString());

	// 	res.writeHead(200, { "Content-Type": "text/html" });
	// 	res.write(data);
	// 	res.end();
	// });

	try {
		const data = fs.readFileSync(completePath);
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(data);
	} catch (err) {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.write("file not found" + " " + err);
	}

	res.end();
});

server.listen(8080);

/* 
    readfile and readfilesync

*/
