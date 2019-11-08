const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send(`Get response from messages-api.js`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Messages API listening on port :${port}`);
});
