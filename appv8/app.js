const express = require("express");
const app = express();

app.listen(4000, () => {
  console.log("server is started on 4000 port");
});

app.get("/", (req, res) => {
  res.json({ mesaj: "Welcome to homepage" });
});

app.get("/api", (req, res) => {
  res.json({ mesaj: "Welcome to api page", api: ["api1", "api2"] });
});
