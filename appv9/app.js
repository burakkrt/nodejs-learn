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

// ## GET ALL DATA
app.get("/api", (req, res) => {
  const kitaplar = [] // kitaplar adında bir dizi tanımlıyorum.

  // db 'yi mongodb://localhost:27017/kutuphane 'ye bağlamıştık.
  // db içerisinden kitaplar collection'ına erişiyorum.
  db.collection("kitaplar")
    .find() // kitaplar koleksiyonundaki tüm dökümanları buluyorum
    .forEach((kitap) => kitaplar.push(kitap)) // Her bir kitabı kitaplar dizisine ekliyorum
    .then(() => res.status(200).json(kitaplar)) // Başarılı olursa, kitaplar dizisini JSON formatında dönüyorum
    .catch(() => res.status(500).json({ message: "Error db" })) // Hata olursa, 500 status kodu ve hata mesajı döndürüyorum
})

// ## ADD OBJECT
// Yeni bir kitap eklemek için POST isteği karşılanır.
// Gelen isteğin gövdesinden (req.body) gelen kitap bilgileri alınır.
// Bu bilgiler MongoDB'deki "kitaplar" koleksiyonuna eklenir.
// İşlem başarılı olursa, HTTP 201 Created durumuyla birlikte eklenen kitabın bilgileri JSON formatında gönderilir.
// Herhangi bir hata oluşursa, HTTP 500 Internal Server Error durumuyla birlikte hata mesajı gönderilir.
app.post("/api", (req, res) => {
  const kitap = req.body

  db.collection("kitaplar")
    .insertOne(kitap)
    .then((sonuc) => res.status(201).json(sonuc))
    .catch((err) => res.status(500).json({ message: "post error" }))
})

// ## DELETE OBJECT
// Bir kitabı silmek için DELETE isteği karşılanır.
// İstekteki id parametresi kullanılarak silinecek kitap MongoDB'den silinir.
// Eğer silme işlemi başarılıysa, HTTP 200 OK durumuyla birlikte silinen kitabın bilgileri gönderilir.
// Eğer istenilen id'ye sahip kitap bulunamazsa, HTTP 404 Not Found durumuyla birlikte bilgilendirme gönderilir.
// Herhangi bir hata oluşursa, HTTP 500 Internal Server Error durumuyla birlikte hata mesajı gönderilir.
app.delete("/api/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const id = new ObjectId(req.params.id)
    db.collection("kitaplar")
      .deleteOne({ _id: id })
      .then((result) => {
        if (result.deletedCount > 0) {
          res.status(200).json(result)
        } else {
          res.status(404).json(result)
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "delete error" })
      })
  } else {
    res.status(500).json({ message: "Id geçerli değil." })
  }
})

// ## FIND ID OBJECT
// Bir kitabın bilgilerini getirmek için GET isteği karşılanır.
// İstekteki id parametresi kullanılarak ilgili kitap MongoDB'den bulunur.
// Eğer istenilen id'ye sahip kitap bulunamazsa, HTTP 404 Not Found durumuyla birlikte bilgilendirme gönderilir.
// Herhangi bir hata oluşursa, HTTP 500 Internal Server Error durumuyla birlikte hata mesajı gönderilir.
app.get("/api/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const id = new ObjectId(req.params.id)

    db.collection("kitaplar")
      .findOne({ _id: id })
      .then((result) => {
        if (result) {
          res.status(200).json(result)
        } else res.status(404).json({ message: "data not found." })
      })
      .catch((err) => res.status(500).json({ message: "No data" }))
  } else {
    res.status(500).json({ message: "Please enter the id correctly." })
  }
})

// ## UPDATE OBJECT
// Bir kitabın bilgilerini güncellemek için PATCH isteği karşılanır.
// İstekteki id parametresi kullanılarak güncellenecek kitap MongoDB'den bulunur.
// Güncelleme işlemi yapıldığında, HTTP 200 OK durumuyla birlikte başarılı bir mesaj gönderilir.
// Eğer istenilen id'ye sahip kitap bulunamazsa, HTTP 404 Not Found durumuyla birlikte bilgilendirme gönderilir.
// Eğer güncelleme işlemi başarısız olursa, HTTP 500 Internal Server Error durumuyla birlikte hata mesajı gönderilir.
app.patch("/api/:id", (req, res) => {
  const updatedBody = req.body

  if (ObjectId.isValid(req.params.id)) {
    const id = new ObjectId(req.params.id)
    db.collection("kitaplar")
      .updateOne({ _id: id }, { $set: updatedBody })
      .then((result) => {
        if (result.matchedCount > 0) {
          if (result.modifiedCount > 0) {
            res.status(200).json({ message: "The data has been changed successfully." })
          } else {
            res.status(500).json({ message: "This data has already been changed." })
          }
        } else {
          res.status(404).json({ message: "data not found." })
        }
      })
      .catch((err) => res.status(500).json({ message: "No data" }))
  } else {
    res.status(500).json({ message: "Please enter the id correctly." })
  }
})
