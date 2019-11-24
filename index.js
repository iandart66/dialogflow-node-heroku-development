const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("Hello WWWWorld");
});

const port = process.env.PORT || 5000;
app.listen(port);
