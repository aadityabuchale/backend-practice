const express = require("express");
const app = express();

app.listen(8080);

app.get("/", (req, res) => {
	res.send("connected to port");
});

app.get("/product", (req, res) => {
	res.send("get products");
});

app.post("/product", (req, res) => {
	res.send("post products");
});

app.delete("/product", (req, res) => {
	res.json("delete product");
});

app.patch("/product", (req, res) => {
	res.json("patch product");
});

app.put("/product", (req, res) => {
	res.json(res.append);
});
