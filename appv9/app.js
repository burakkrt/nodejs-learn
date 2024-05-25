const express = require("express"); // Express framework'ünü import ediyorum.
const app = express(); // Express uygulaması oluşturuyorum.
const { connectToDb, getDb } = require("./db"); // db.js dosyasından fonksiyonları import ediyorum.

let db; // db adında bir değişken tanımlıyorum.

// db.js 'de eğer db bağlantısı başarılı olursa callback boş döner
// hata varsa callback error döner ve buna göre işlemler yaparız.
// Eğer db bağlantısı başarılı değilse server'ı başlatmaya gerek olmadığı için if kontrolü yaparız.
connectToDb((err) => {
  if (!err) {
    // Eğer hata yoksa
    app.listen(4000, () => {
      // Sunucuyu 4000 portunda başlatıyorum
      console.log("Server is started on 4000 port");
    });
    db = getDb(); // Hata yoksa, dolu db bağlantısını değişkene aktarırız.
  }
});

app.get("/api", (req, res) => {
  const kitaplar = []; // kitaplar adında bir dizi tanımlıyorum.

  // db 'yi mongodb://localhost:27017/kutuphane 'ye bağlamıştık.
  // db içerisinden kitaplar collection'ına erişiyorum.
  db.collection("kitaplar")
    .find() // kitaplar koleksiyonundaki tüm dökümanları buluyorum
    .forEach((kitap) => kitaplar.push(kitap)) // Her bir kitabı kitaplar dizisine ekliyorum
    .then(() => res.status(200).json(kitaplar)) // Başarılı olursa, kitaplar dizisini JSON formatında dönüyorum
    .catch(() => res.status(500).json({ hata: "Error db" })); // Hata olursa, 500 status kodu ve hata mesajı döndürüyorum
});
