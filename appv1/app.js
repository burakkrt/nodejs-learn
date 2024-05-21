const http = require("http");
const url = require("url");
const fs = require("fs");
const { dirname } = require("path");

const formv1Page = fs.readFileSync(`${__dirname}/index.html`, "utf-8");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  switch (pathName) {
    case "/":
      res.end("Homepage");
      break;
    case "/formv1":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(formv1Page);
  }
});

server.listen(4000, () => {
  console.log("Server 4000 portunda çalışıyor.");
});
