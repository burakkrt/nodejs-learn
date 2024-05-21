const express = require("express");
const app = express();
const url = require("url");

let path = "localhost:4000/sepet.html?siparisTutari=50&siparisAdet=3";
// url cinsine parse editmemiz gerekir. query leri kullanabilmek için.
const parsePath = url.parse(path, true);

app
  .get("/", (req, res) => {
    res.status(200).send({
      port: parsePath.host,
      pathname: parsePath.pathname,
      url: parsePath.href,
      search: parsePath.search,
      protocol: parsePath.protocol,
      siparisTutari: parsePath.query.siparisTutari,
      siparisAdeti: parsePath.query.siparisAdet,
    });
  })
  .listen(4000, () => {
    console.log("server start");
  });
