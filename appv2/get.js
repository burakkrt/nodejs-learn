const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  if (true) {
    res.status(200).json({
      message: "hello world",
      statusCode: 200,
    });
  } else {
    res.status(404).json({
      message: "Böyle bir sayfa mevcut değil.",
      statusCode: 404,
    });
  }
});

app.listen(port, () => {
  console.log("server start");
});
