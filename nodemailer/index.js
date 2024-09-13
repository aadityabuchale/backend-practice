const http = require("http");
const nodemailer = require("nodemailer");

const config = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "aadityabuchale15@gmail.com",
		pass: "nmdb gjhl zclh qleq",
	},
});

const server = http.createServer((req, res) => {
	config
		.sendMail({
			from: "aadityabuchale15@gmail.com",
			to: "aadityabuchale1430@gmail.com",
			subject: "TestMail",
			text: "TEST MAIL",
		})

		.then((response) => {
			res.writeHead(200);
			res.write("Mail sent successfully");
		})

		.catch((err) => {
			res.writeHead(500);
			res.write("Error: " + err.message);
		})

		.finally(() => {
			res.end();
		});
});

server.listen(8080);
