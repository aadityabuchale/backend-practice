const http = require("http");

const server = http.createServer(function (req, res) {
	const styles = `

        <div style="background-color:grey">

            <h2>headline</h2>

        </div>

    `;

	res.writeHead(200, {
		"Content-Type": "text/plain",
	});

	res.write("<h1>Aaditya Buchale</h1>");

	res.write(styles);
	res.end();
});

server.listen(8080);

/* 
    write() => used to give response to the server , we can give different types of responses
                like html, plain text , audio , video etc
    end => its used to end the stateless protocol like http / https without this server will not end

*/
