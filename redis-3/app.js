const express = require("express");
const axios = require("axios");
const redis = require("redis");
const port = 7842;
const app = express();

const client = redis.createClient({
    host: "localhost",
    port: 6379,
});

app.get("/data", (request, response) => {
    // input from the user trimming it and removing spaces
    let userInput = request.query.country.trim();

    // url for getting the country
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

    // check if the data is in redis

    return client.get(userInput, (err, result) => {
        // if data is in the redis
        if (result) {
            const parsedResult = JSON.parse(result);
            response.send(parsedResult);

            // if data is not in the redis then make api call and save it in the redis
        } else {
            axios.get(url).then((res) => {
                let data = res.data;

                // save response data in redis
                client.setex(
                    userInput,
                    36000,
                    JSON.stringify({ source: "redis cache", data })
                );

                // send the api response for the first time
                response.send({ source: "api response", data });
            });
        }
    });
});

app.listen(port, (err) => {
    console.log("listening to port " + port);
});
