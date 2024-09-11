const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
	console.log(req.method);

	const method = req.method.toUpperCase();
	const urlInfo = url.parse(req.url, true);
	const queryObj = urlInfo.query;

	// for reading all the directories

	const dirs = fs.readdirSync("./files");

	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	let filesData = [];

	if (method === "OPTIONS") {
		res.writeHead(204);
		res.end();
		return;
	}

	if (method === "GET") {
		for (let dir of dirs) {
			const data = fs.readFileSync(`./files/${dir}`, "utf-8");
			filesData.push({ filename: dir, content: data });
		}

		res.write(JSON.stringify(filesData));
		res.end();
	} else if (method === "POST") {
		let data = "";

		console.log("here inside post");

		req.on("data", (chunk) => {
			data = data + chunk;
		});

		req.on("close", () => {
			const parsedData = JSON.parse(data);

			fs.writeFile(
				`./files/${parsedData.filename}`,
				parsedData.content,
				"utf-8",
				(err) => {
					console.log(err);
				}
			);
			res.end();
		});
	} else if (method === "DELETE") {
		console.log(queryObj.filename);

		fs.unlink(`./files/${queryObj.filename}`, (err) => {
			if (err) {
				console.log(err);
				res.write(err);
				res.end();
			}
		});
	}
});

server.listen(8080);
