const express = require("express");
const server = express();

// by using this only line we can define the static path using express ,
// means when user hit anything at url it will match to this file and directly serve it

server.use(express.static("ui"));

// server.get("/", (req, res) => {
// 	res.send("This is homepage");
// });

// server.get("/product", (req, res) => {
// 	res.send("this is product");
// });

server.listen(8080);

// by using express very easily we can define routes and serve pages
