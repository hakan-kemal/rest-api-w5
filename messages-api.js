const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  console.log(`Get response from messages-api.js`);
  response.send(`Get response from messages-api.js`);
});

app.post("/messages", (request, response) => {
  // When a request is sent to the endpoint, it should log the `text` property of the body to the console, and it should respond with a JSON object:
  console.log(request.body);
  if (request.body) {
    return response.status(200).json({
      message: "Message received loud and clear"
    });
  } else if (!request.body) {
    return response.status(400).send({
      message: "Message not received"
    });
  } else {
    return response.status(500).send({
      message: "Something went wrong"
    });
  }
});

// Perform the following validation: if the body does NOT have a `text` property or the string is empty, then send a "Bad Request" HTTP status code to the client.

const port = 3000;

app.listen(port, () => {
  console.log(`Messages API listening on port :${port}`);
});
