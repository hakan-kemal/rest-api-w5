const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.status(200).send(`Messages-api.js connected!`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Messages API listening on port :${port}`);
});

let pingCount = 0;

app.post("/messages", (request, response, next) => {
  pingCount++;
  if (request.body.text && pingCount <= 5) {
    const text = "Message received loud and clear";
    return response.status(200).json({
      message: text,
      posted: request.body.text
    });
  } else if (!request.body.text) {
    const text = "Bad Request";
    return response.status(400).json({
      message: text,
      posted: request.body.text
    });
  } else if (request.body.text && pingCount > 5) {
    const text = "Too Many Requests";
    return response.status(429).json({
      message: text,
      posted: request.body.text
    });
  } else {
    return response.status(500).json({
      message: "Something went wrong"
    });
  }
});
