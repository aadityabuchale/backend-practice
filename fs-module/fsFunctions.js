const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
	fs.writeFile(
		"./files/data.text",
		"Hi AB, Lets Make The Difference",
		(err) => {
			console.log(err);
		}
	);

	fs.readFile("./files/data.text", "utf8", (err, data) => {
		if (err) {
			res.writeHead(404, {
				"Content-Type": "text/plain",
			});
			res.write("File not found" + " : " + err);
			res.end();
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain",
			});
			res.write(data);
			res.end();
		}
	});

	fs.appendFile("./files/data.text", "i am new data", "utf-8", (err) => {
		console.log(err);
	});

	// fs.unlink("./files/data.text", (err) => {
	// 	console.log(err);
	// });
});

server.listen(8080);

/* 

    create file = writeFile ( replaces text if file already exists)
    read file =  readFile(path , type , callback(err))
    update = appendFile( filename , data , (err) => )
    rename file = 
    delete file = unlink( path , callback(err))

*/
