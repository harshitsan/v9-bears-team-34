const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
