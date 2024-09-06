const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
	const fileData = fs.readFileSync("./files/resume.pdf");

	res.writeHead(200, {
		"content-type": "application/pdf",
		"content-disposition": 'attachment; filename="resume.pdf"',
		"content-length": fileData.length,
	});

	res.write(fileData);
	res.end();
});

server.listen(8080);

// homework -> make this files as dynamic , read form url query and pass over here
