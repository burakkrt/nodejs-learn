const express = require("express");
const app = express();
const port = 4000;
const fs = require("fs");

const db = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: req.res.statusCode,
    data: db,
  });
});

app.listen(port, () => {
  console.log("server start");
});
