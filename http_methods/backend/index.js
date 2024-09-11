const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
	const method = req.method.toUpperCase();
	const urlInfo = url.parse(req.url, true);
	const queryObj = urlInfo.query;

	// Set CORS headers for all requests
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);

	// for reading all the directories
	const dirs = fs.readdirSync("../files");

	let filesData = [];

	// Handle CORS preflight (OPTIONS) requests
	if (method === "OPTIONS") {
		res.writeHead(203); // No content for OPTIONS
		res.end();
		return;
	}

	if (method === "GET") {
		// Read all files in the directory
		for (let dir of dirs) {
			const data = fs.readFileSync(`../files/${dir}`, "utf-8");
			filesData.push({ filename: dir, content: data });
		}

		// Return the files data
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.write(JSON.stringify(filesData));
		res.end();
	} else if (method === "POST") {
		let data = "";

		req.on("data", (chunk) => {
			data += chunk;
		});

		req.on("end", () => {
			const parsedData = JSON.parse(data);

			fs.writeFile(
				`../files/${parsedData.filename}`,
				parsedData.content,
				"utf-8",
				(err) => {
					if (err) {
						res.writeHead(500, {
							"Content-Type": "application/json",
						});
						res.write(
							JSON.stringify({ message: "Failed to create file" })
						);
						res.end();
					} else {
						res.writeHead(201, {
							"Content-Type": "application/json",
						});
						res.write(
							JSON.stringify({
								message: "File created successfully",
							})
						);
						res.end();
					}
				}
			);
		});
	} else if (method === "DELETE") {
		const filename = queryObj.filename;

		fs.unlink(`../files/${filename}`, (err) => {
			if (err) {
				res.writeHead(500, {
					"Content-Type": "application/json",
				});
				res.write(JSON.stringify({ message: "File not found" }));
				res.end();
			} else {
				res.writeHead(200, {
					"Content-Type": "application/json",
				});
				res.write(
					JSON.stringify({ message: `File ${filename} deleted` })
				);
				res.end();
			}
		});
	}
});

server.listen(8080, () => {
	console.log("Server listening on port 8080");
});
