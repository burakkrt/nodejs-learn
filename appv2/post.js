const express = require("express");
const port = 4001;
const app = express();

app.post("/postveri", (req, res) => {
  res.send("upload success");
});

app.listen(port, () => {
  console.log("server start");
});
