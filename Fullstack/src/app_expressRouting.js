let express = require("express");
let app = express();
let Products = require("../data/products.js");
let Category = require("../data/category.js");
let productRouter = express.Router();
let categoryRouter = express.Router();
port = 8622;

app.get("/", (req, res) => {
    res.send("<h1>Hello from Express Routing</h1>");
});

productRouter.route("/").get((req, res) => {
    res.send("<h1>from product Router</h1>");
});

categoryRouter.route("/").get((req, res) => {
    res.send("<h1>from category Router</h1>");
});

productRouter.route("/products").get((req, res) => {
    res.send(Products);
});

categoryRouter.route("/category").get((req, res) => {
    res.send(Category);
});

app.use("/products", productRouter);
app.use("/category", categoryRouter);

app.listen(port, (err) => {
    if (err) throw err;

    console.log("server listening on port", port);
});
