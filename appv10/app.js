const express = require("express") // Express framework'ünü import ediyorum.
const app = express() // Express uygulaması oluşturuyorum.
const { connectToDb, getDb } = require("./db") // db.js dosyasından fonksiyonları import ediyorum.
const { ObjectId } = require("mongodb")

app.use(express.json())

let db // db adında bir değişken tanımlıyorum.

// db.js 'de eğer db bağlantısı başarılı olursa callback boş döner
// hata varsa callback error döner ve buna göre işlemler yaparız.
// Eğer db bağlantısı başarılı değilse server'ı başlatmaya gerek olmadığı için if kontrolü yaparız.
connectToDb((err) => {
  if (!err) {
    // Eğer hata yoksa
    app.listen(4000, () => {
      // Sunucuyu 4000 portunda başlatıyorum
      console.log("Server is started on 4000 port")
    })
    db = getDb() // Hata yoksa, dolu db bağlantısını değişkene aktarırız.
  }
})

app.get("/api", (req, res) => {
  const kitaplar = [] // kitaplar adında bir dizi tanımlıyorum.

  // İstekteki query parametrelerinden pageIndex ve pageSize alınır.
  // Eğer pageIndex belirtilmemişse veya belirtilen değer geçersizse, varsayılan olarak 0 atanır.
  const pageIndex = parseInt(req.query.pageIndex) || 0 // pageIndex'i integer'a dönüştürüyorum
  /* ÖNEMLİ: Aşağıda ?? kullanmak önemlidir çünkü || operatörü solundaki değer
  sıfır olsa bile kabul eder ama ?? operatörü 0 değerini kabul etmez ve sağındakini alır.
  Eğer kullanıcı pageSize belirtmedi ise default olarak 0 değeri atanır ve 0 değeri
  tüm verilerin gösterilmesi anlamı taşır. ...cdn/api istek atan biri tüm verileri
  görmesi gerektiğinden 0 değerini ?? kabul edip tüm verileri göstermesi gerekir.
  */
  // Eğer pageSize belirtilmemişse veya belirtilen değer geçersizse, varsayılan olarak 3 atanır.
  const pageSize = parseInt(req.query.pageSize) ?? 3 // pageSize'i integer'a dönüştürüyorum

  // db 'yi mongodb://localhost:27017/kutuphane 'ye bağlamıştık.
  // db içerisinden kitaplar collection'ına erişiyorum.
  db.collection("kitaplar")
    .find() // kitaplar koleksiyonundaki tüm dökümanları buluyorum
    .skip(pageSize * pageIndex) // Sayfalama işlemi için ilgili sayfadaki kayıtları atlar.
    .limit(pageSize) // İstenen sayıda kayıt getirir.
    .forEach((kitap) => kitaplar.push(kitap)) // Her bir kitabı kitaplar dizisine ekliyorum
    .then(() => res.status(200).json(kitaplar)) // Başarılı olursa, kitaplar dizisini JSON formatında dönüyorum
    .catch(() => res.status(500).json({ message: "Error db" })) // Hata olursa, 500 status kodu ve hata mesajı döndürüyorum
})
