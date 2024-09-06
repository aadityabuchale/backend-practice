let express = require("express");
let app = express();
let Products = require("../data/products.js");
let Category = require("../data/category.js");

let port = 8242;

app.get("/", (req, res) => {
    res.send("<h1>Hello from Express</h1>");
});

app.get("/products", (req, res) => {
    res.send(Products);
});

app.get("/category", (req, res) => {
    res.send(Category);
});

// creating server
app.listen(port, (err) => {
    if (err) throw err;
    console.log("server listening on port " + port);
});
