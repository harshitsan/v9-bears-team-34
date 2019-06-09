const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
