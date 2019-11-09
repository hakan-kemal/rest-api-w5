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

app.post("/messages", (request, response, next) => {
  // response.send(`Post response from messages-api.js`);
  // console.log(`Post response from messages-api.js`);
  console.log(request.body);
  response.body(response.json())
  .then(message => {
    message: "Message received loud and clear"

  })
 .catch(next)
});
//   response.json(request.body)
//   .then(message => {
//     response.status(200).send(message);
//   })
//     .catch(next)
// });

const port = 3000;

app.listen(port, () => {
  console.log(`Messages API listening on port :${port}`);
});
