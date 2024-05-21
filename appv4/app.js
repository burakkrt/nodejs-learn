const http = require("http");
const modulSecond = require("./modules/modulSecond");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
    Sender: "Burak",
  });
  res.write("" + modulSecond.getFullName("Burak", "Fullstack"));
  res.end();
});

server.listen(4000, () => {
  console.log("success");
});
